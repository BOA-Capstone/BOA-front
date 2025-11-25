## 실행 가이드

1. 의존성 설치
```bash
npm install
```

2. 개발 서버 실행 (localhost:5173)
```bash
npm run dev
```

3. 환경변수 설정 
`.env` 파일에 아래와 같이 웹소켓 세팅을 해주세요
```
VITE_WEBSOCKET_SERVER_URL=http://서버주소:8080/ws-iot
```
