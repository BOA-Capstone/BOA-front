// SockJS & STOMP 기반 WebSocket 서비스
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import type { IMessage, StompSubscription } from '@stomp/stompjs';

export interface ChargerStatusMessage {
  stationId: string;
  chargerNo: number;
  charging: boolean;
  power: number;      // 와트(W) 단위
  voltage: number;
  current: number;
  timeStamp: number;  // Unix timestamp (초)
}

export type StompMessageHandler = (data: ChargerStatusMessage) => void;
export type StompErrorHandler = (error: Error) => void;

interface SubscriptionInfo {
  topic: string;
  handler: StompMessageHandler;
  errorHandler?: StompErrorHandler;
  subscription: StompSubscription | null;
}

export class StompWebSocketService {
  private client: Client | null = null;
  private connected = false;
  private url: string;
  private subscriptions: Map<string, SubscriptionInfo> = new Map();
  private connectPromise: Promise<void> | null = null;

  constructor(url: string) {
    this.url = url;
  }

  /**
   * WebSocket 연결 (Promise 기반)
   * @returns 연결 완료 시 resolve되는 Promise
   */
  connect(): Promise<void> {
    // 이미 연결 중이면 기존 Promise 반환
    if (this.connectPromise) {
      return this.connectPromise;
    }

    // 이미 연결되어 있으면 즉시 resolve
    if (this.client && this.connected) {
      return Promise.resolve();
    }

    this.connectPromise = new Promise((resolve, reject) => {
      this.client = new Client({
        webSocketFactory: () => new SockJS(this.url),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,

        onConnect: () => {
          this.connected = true;
          this.connectPromise = null;
          console.log('[WebSocket] 연결 성공');

          // 재연결 시 기존 구독 복구
          this.resubscribeAll();

          resolve();
        },

        onStompError: (frame) => {
          this.connected = false;
          this.connectPromise = null;
          const error = new Error(`STOMP 오류: ${frame.headers['message'] || '알 수 없는 오류'}`);
          console.error('[WebSocket] STOMP 오류:', error);
          reject(error);
        },

        onWebSocketError: (event) => {
          this.connected = false;
          this.connectPromise = null;
          const error = new Error('WebSocket 연결 오류');
          console.error('[WebSocket] 연결 오류:', event);
          reject(error);
        },

        onDisconnect: () => {
          this.connected = false;
          console.log('[WebSocket] 연결 해제됨');
        },
      });

      this.client.activate();
    });

    return this.connectPromise;
  }

  /**
   * WebSocket 연결 해제
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      // 모든 구독 정리
      this.subscriptions.forEach((info) => {
        if (info.subscription) {
          info.subscription.unsubscribe();
        }
      });
      this.subscriptions.clear();

      await this.client.deactivate();
      this.client = null;
      this.connected = false;
      this.connectPromise = null;
      console.log('[WebSocket] 연결 종료');
    }
  }

  /**
   * 토픽 구독 (자동 재연결 지원)
   * @param topic 구독할 토픽
   * @param handler 메시지 핸들러
   * @param errorHandler 에러 핸들러 (선택)
   * @returns 구독 해제 함수
   */
  subscribe(
    topic: string,
    handler: StompMessageHandler,
    errorHandler?: StompErrorHandler
  ): () => void {
    if (!this.client) {
      throw new Error('WebSocket이 초기화되지 않았습니다. connect()를 먼저 호출하세요.');
    }

    // 구독 정보 저장 (재연결 시 자동 복구용)
    const subscriptionInfo: SubscriptionInfo = {
      topic,
      handler,
      errorHandler,
      subscription: null,
    };

    // 연결되어 있으면 즉시 구독
    if (this.connected) {
      subscriptionInfo.subscription = this.doSubscribe(topic, handler, errorHandler);
    }

    this.subscriptions.set(topic, subscriptionInfo);

    // 구독 해제 함수 반환
    return () => {
      const info = this.subscriptions.get(topic);
      if (info?.subscription) {
        info.subscription.unsubscribe();
      }
      this.subscriptions.delete(topic);
    };
  }

  /**
   * 실제 구독 수행 (내부 메서드)
   */
  private doSubscribe(
    topic: string,
    handler: StompMessageHandler,
    errorHandler?: StompErrorHandler
  ): StompSubscription {
    if (!this.client) {
      throw new Error('Client가 초기화되지 않았습니다.');
    }

    return this.client.subscribe(topic, (message: IMessage) => {
      try {
        const data: ChargerStatusMessage = JSON.parse(message.body);
        handler(data);
      } catch (error) {
        const parseError = new Error(`메시지 파싱 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
        console.error('[WebSocket] 파싱 오류:', parseError);
        console.error('[WebSocket] 파싱 실패한 메시지:', message.body);

        if (errorHandler) {
          errorHandler(parseError);
        }
      }
    });
  }

  /**
   * 재연결 시 모든 구독 복구
   */
  private resubscribeAll(): void {
    console.log(`[WebSocket] ${this.subscriptions.size}개 구독 복구 중...`);

    this.subscriptions.forEach((info, topic) => {
      if (info.subscription) {
        info.subscription.unsubscribe();
      }
      info.subscription = this.doSubscribe(topic, info.handler, info.errorHandler);
    });

    console.log('[WebSocket] 모든 구독 복구 완료');
  }

  /**
   * 연결 상태 확인
   */
  isConnected(): boolean {
    return this.connected;
  }

  /**
   * 활성 구독 개수 반환
   */
  getSubscriptionCount(): number {
    return this.subscriptions.size;
  }
}
