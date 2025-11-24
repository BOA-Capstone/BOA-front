// WebSocket 연결 테스트 파일
import { StompWebSocketService } from './websocketService';

const WS_URL = import.meta.env.VITE_WEBSOCKET_SERVER_URL;

if (WS_URL) {
  console.log('[WS TEST] 환경변수 확인:', WS_URL);
  console.log('[WS TEST] WebSocket 연결 시도 중...');

  const wsService = new StompWebSocketService(WS_URL);

  wsService
    .connect()
    .then(() => {
      console.log('[WS TEST] ✅ 연결 성공!');
      console.log('[WS TEST] 연결 상태:', wsService.isConnected());

      // 테스트 구독 (충전소 EV001의 1~5번 충전기)
      const stationId = 'EV001';
      const chargerNos = [1, 2, 3, 4, 5];
      const unsubscribers: (() => void)[] = [];

      console.log(`[WS TEST] ${chargerNos.length}개 충전기 구독 시작...`);

      chargerNos.forEach((chargerNo) => {
        const topic = `/topic/chargers/status/${stationId}/${chargerNo}`;
        console.log(`[WS TEST] 토픽 구독: ${topic}`);

        const unsubscribe = wsService.subscribe(
          topic,
          (data) => {
            console.log(`[WS TEST] 📩 충전기 #${data.chargerNo} 메시지 수신:`);
            console.table({
              '충전소 ID': data.stationId,
              '충전기 번호': data.chargerNo,
              '시간': new Date(data.timeStamp * 1000).toLocaleString('ko-KR'),
              '전압(V)': data.voltage,
              '전류(A)': data.current,
              '전력(W)': data.power,
              '전력(kW)': (data.power / 1000).toFixed(2),
              '충전 중': data.charging ? '🔋 예' : '⏸️ 아니오',
            });
          },
          (error) => {
            console.error(`[WS TEST] ❌ 충전기 #${chargerNo} 에러:`, error.message);
          }
        );

        unsubscribers.push(unsubscribe);
      });

      console.log('[WS TEST] 구독 개수:', wsService.getSubscriptionCount());
      console.log('[WS TEST] 메시지를 기다리는 중... (60초 후 자동 종료)');

      // 60초 후 연결 종료
      setTimeout(() => {
        console.log('[WS TEST] 60초 경과, 연결 종료 시작...');
        unsubscribers.forEach((unsubscribe) => unsubscribe());
        wsService.disconnect();
        console.log('[WS TEST] 🔌 연결 종료됨');
      }, 60000);
    })
    .catch((error) => {
      console.error('[WS TEST] ❌ 연결 실패:', error);
      console.error('[WS TEST] 에러 상세:', {
        메시지: error.message,
        타입: error.name,
        스택: error.stack,
      });
    });
} else {
  console.error('[WS TEST] ❌ VITE_WEBSOCKET_SERVER_URL 환경변수가 설정되지 않았습니다.');
  console.log('[WS TEST] .env 파일에 다음을 추가하세요:');
  console.log('[WS TEST] VITE_WEBSOCKET_SERVER_URL=http://your-server-url/ws');
}
