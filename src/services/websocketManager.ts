// WebSocket 싱글톤 관리자
import { StompWebSocketService } from './websocketService';

class WebSocketManager {
  private static instance: WebSocketManager | null = null;
  private service: StompWebSocketService | null = null;
  private url: string = '';

  private constructor() {}

  static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  /**
   * WebSocket 서비스 초기화 (앱 시작 시 한 번만 호출)
   */
  initialize(url: string): void {
    if (this.service && this.url === url) {
      return; // 이미 초기화됨
    }

    this.url = url;
    this.service = new StompWebSocketService(url);
  }

  /**
   * WebSocket 서비스 가져오기
   */
  getService(): StompWebSocketService {
    if (!this.service) {
      throw new Error('WebSocket Manager가 초기화되지 않았습니다. initialize()를 먼저 호출하세요.');
    }
    return this.service;
  }

  /**
   * 연결 여부 확인
   */
  isInitialized(): boolean {
    return this.service !== null;
  }
}

export const websocketManager = WebSocketManager.getInstance();
