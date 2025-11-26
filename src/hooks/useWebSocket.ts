import { useEffect, useRef, useState, useCallback } from 'react';
import {
  type ChargerStatusMessage,
  type StompMessageHandler,
  type StompErrorHandler,
} from '../services/websocketService';
import { websocketManager } from '../services/websocketManager';

interface UseWebSocketOptions {
  url: string;
  autoConnect?: boolean;
  onError?: (error: Error) => void;
}

interface UseWebSocketReturn {
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  subscribe: (
    topic: string,
    handler: StompMessageHandler,
    errorHandler?: StompErrorHandler
  ) => void;
  unsubscribe: (topic: string) => void;
  subscriptionCount: number;
}

/**
 * WebSocket 연결 및 구독을 관리하는 React Hook
 *
 * @example
 * ```tsx
 * const { isConnected, subscribe, unsubscribe } = useWebSocket({
 *   url: 'http://localhost:8080/ws',
 *   autoConnect: true,
 * });
 *
 * useEffect(() => {
 *   if (isConnected) {
 *     subscribe('/topic/chargers/status/STATION_001/1', (data) => {
 *       console.log('받은 데이터:', data);
 *     });
 *   }
 *
 *   return () => {
 *     unsubscribe('/topic/chargers/status/STATION_001/1');
 *   };
 * }, [isConnected]);
 * ```
 */
export function useWebSocket(options: UseWebSocketOptions): UseWebSocketReturn {
  const { url, autoConnect = false, onError } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const unsubscribersRef = useRef<Map<string, () => void>>(new Map());

  // WebSocket 매니저 초기화
  useEffect(() => {
    websocketManager.initialize(url);
  }, [url]);

  // 연결 함수
  const connect = useCallback(async () => {
    try {
      const service = websocketManager.getService();
      await service.connect();
      setIsConnected(true);
      setSubscriptionCount(service.getSubscriptionCount());
    } catch (error) {
      const err = error instanceof Error ? error : new Error('WebSocket 연결 실패');
      console.error('[useWebSocket] 연결 오류:', err);
      if (onError) {
        onError(err);
      }
    }
  }, [onError]);

  // 연결 해제 함수 (실제로는 구독만 해제, 연결은 유지)
  const disconnect = useCallback(async () => {
    try {
      // 이 컴포넌트의 구독만 해제
      unsubscribersRef.current.forEach((unsubscribe) => {
        unsubscribe();
      });
      unsubscribersRef.current.clear();

      const service = websocketManager.getService();
      setSubscriptionCount(service.getSubscriptionCount());
    } catch (error) {
      console.error('[useWebSocket] 구독 해제 오류:', error);
    }
  }, []);

  // 구독 함수
  const subscribe = useCallback(
    (topic: string, handler: StompMessageHandler, errorHandler?: StompErrorHandler) => {
      try {
        const service = websocketManager.getService();

        // 이미 구독 중이면 기존 구독 해제
        if (unsubscribersRef.current.has(topic)) {
          const existingUnsubscribe = unsubscribersRef.current.get(topic);
          existingUnsubscribe?.();
        }

        const unsubscribe = service.subscribe(topic, handler, errorHandler);
        unsubscribersRef.current.set(topic, unsubscribe);
        setSubscriptionCount(service.getSubscriptionCount());
      } catch (error) {
        const err = error instanceof Error ? error : new Error('구독 실패');
        console.error('[useWebSocket] 구독 오류:', err);
        if (onError) {
          onError(err);
        }
      }
    },
    [onError]
  );

  // 구독 해제 함수
  const unsubscribe = useCallback((topic: string) => {
    const unsubscribeFunc = unsubscribersRef.current.get(topic);
    if (unsubscribeFunc) {
      unsubscribeFunc();
      unsubscribersRef.current.delete(topic);
      try {
        const service = websocketManager.getService();
        setSubscriptionCount(service.getSubscriptionCount());
      } catch (error) {
        console.error('[useWebSocket] 구독 개수 업데이트 오류:', error);
      }
    }
  }, []);

  // 자동 연결
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    // cleanup에서 ref 값을 변수로 복사해서 사용
    const unsubscribers = unsubscribersRef.current;
    return () => {
      unsubscribers.forEach((unsubscribe) => {
        unsubscribe();
      });
      unsubscribers.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoConnect]);

  return {
    isConnected,
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    subscriptionCount,
  };
}

/**
 * 특정 충전기 상태를 구독하는 Hook
 *
 * @example
 * ```tsx
 * const { data, error, isConnected } = useChargerStatus({
 *   url: 'http://localhost:8080/ws',
 *   stationId: 'STATION_001',
 *   chargerNo: 1,
 * });
 *
 * if (data) {
 *   console.log(`전력: ${data.power}kW, 전압: ${data.voltage}V`);
 * }
 * ```
 */
export function useChargerStatus(options: {
  url: string;
  stationId: string;
  chargerNo: number;
  enabled?: boolean;
}) {
  const { url, stationId, chargerNo, enabled = true } = options;
  const [data, setData] = useState<ChargerStatusMessage | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const topic = `/topic/chargers/status/${stationId}/${chargerNo}`;

  const { isConnected, subscribe, unsubscribe } = useWebSocket({
    url,
    autoConnect: enabled,
    onError: setError,
  });

  useEffect(() => {
    if (isConnected && enabled) {
      subscribe(
        topic,
        (message) => {
          setData(message);
          setError(null);
        },
        (err) => {
          setError(err);
        }
      );

      return () => {
        unsubscribe(topic);
      };
    }
  }, [isConnected, enabled, topic, subscribe, unsubscribe]);

  return {
    data,
    error,
    isConnected,
  };
}
