import { useEffect, useRef, useState, useCallback } from 'react';
import {
  StompWebSocketService,
  type ChargerStatusMessage,
  type StompMessageHandler,
  type StompErrorHandler,
} from '@/services/websocketService';

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

  const serviceRef = useRef<StompWebSocketService | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const unsubscribersRef = useRef<Map<string, () => void>>(new Map());

  // WebSocket 서비스 초기화
  useEffect(() => {
    if (!serviceRef.current) {
      serviceRef.current = new StompWebSocketService(url);
    }
  }, [url]);

  // 연결 함수
  const connect = useCallback(async () => {
    if (!serviceRef.current) return;

    try {
      await serviceRef.current.connect();
      setIsConnected(true);
      setSubscriptionCount(serviceRef.current.getSubscriptionCount());
    } catch (error) {
      const err = error instanceof Error ? error : new Error('WebSocket 연결 실패');
      console.error('[useWebSocket] 연결 오류:', err);
      if (onError) {
        onError(err);
      }
    }
  }, [onError]);

  // 연결 해제 함수
  const disconnect = useCallback(async () => {
    if (!serviceRef.current) return;

    try {
      // 모든 구독 해제
      unsubscribersRef.current.forEach((unsubscribe) => {
        unsubscribe();
      });
      unsubscribersRef.current.clear();

      await serviceRef.current.disconnect();
      setIsConnected(false);
      setSubscriptionCount(0);
    } catch (error) {
      console.error('[useWebSocket] 연결 해제 오류:', error);
    }
  }, []);

  // 구독 함수
  const subscribe = useCallback(
    (topic: string, handler: StompMessageHandler, errorHandler?: StompErrorHandler) => {
      if (!serviceRef.current) {
        console.warn('[useWebSocket] 서비스가 초기화되지 않았습니다.');
        return;
      }

      try {
        // 이미 구독 중이면 기존 구독 해제
        if (unsubscribersRef.current.has(topic)) {
          const existingUnsubscribe = unsubscribersRef.current.get(topic);
          existingUnsubscribe?.();
        }

        const unsubscribe = serviceRef.current.subscribe(topic, handler, errorHandler);
        unsubscribersRef.current.set(topic, unsubscribe);
        setSubscriptionCount(serviceRef.current.getSubscriptionCount());
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
      if (serviceRef.current) {
        setSubscriptionCount(serviceRef.current.getSubscriptionCount());
      }
    }
  }, []);

  // 자동 연결
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

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
