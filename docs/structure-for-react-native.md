# BOA-FRONT 프로젝트 구조 (React Native 이식 가이드)

이 문서는 기존 BOA-FRONT(React + Vite + Tailwind) 프로젝트를 React Native로 이식할 때 참고할 수 있는 구조와 주요 변경 포인트를 정리합니다.

---

## 1. 폴더 구조 비교

| 기존 웹 프로젝트(src) | RN 이식 시 추천 구조 |
|----------------------|---------------------|
| assets/              | assets/             |
| components/          | components/         |
| constants/           | constants/          |
| hooks/               | hooks/              |
| layouts/             | screens/ 또는 layouts/ |
| pages/               | screens/            |
| services/            | services/           |
| styles/              | styles/             |
| types/               | types/              |
| utils/               | utils/              |

- **pages/** → **screens/**로 변경 (React Native는 페이지 대신 스크린 용어 사용)
- **layouts/**는 필요에 따라 screens/로 통합하거나 별도 유지

---

## 2. 주요 변경 포인트

- **스타일링**  
  Tailwind CSS 대신 `StyleSheet` 또는 [tailwind-rn](https://github.com/vadimdemedes/tailwind-rn) 등 사용
- **HTML 태그**  
  `div`, `section` 등 → `View`, `Text`, `ScrollView` 등으로 변경
- **이미지/배경**  
  `img`, CSS 배경 → `Image`, `ImageBackground` 컴포넌트 사용
- **라우팅**  
  React Router → [react-navigation](https://reactnavigation.org/) 사용
- **Intersection Observer**  
  [`useInView`](../src/hooks/useInView.ts) → RN에서는 `onLayout`, `react-native-intersection-observer` 등으로 대체
- **웹 전용 API**  
  DOM 관련 API, 브라우저 이벤트 등은 RN에서 지원하지 않으므로 대체 필요

---

## 3. 컴포넌트/스크린 매핑 예시

| 웹 컴포넌트/페이지                | RN 스크린/컴포넌트            |
|-----------------------------------|-------------------------------|
| `HomeScreen.tsx`                  | `HomeScreen.tsx`              |
| `MainScreen.tsx`                  | `MainScreen.tsx`              |
| `IntroSection.tsx`                | `IntroSection.tsx`            |
| `VisualizationSection.tsx`        | `VisualizationSection.tsx`    |
| `DetailSection.tsx`               | `DetailSection.tsx`           |
| `DashboardSection.tsx`            | `DashboardSection.tsx`        |
| `Sidebar.tsx`                     | `Sidebar.tsx` (Drawer/Tab)    |
| `SettingsModal.tsx`               | `SettingsModal.tsx` (Modal)   |

---

## 4. 이식 시 참고 사항

- **상태 관리, props 구조, 비즈니스 로직**은 거의 그대로 재사용 가능
- **스타일/레이아웃**만 RN 방식으로 변환 필요
- **이미지 경로**는 RN의 asset 관리 방식에 맞게 수정
- **스크롤/스냅** 등은 RN의 `ScrollView`, `FlatList` 등으로 구현

---

## 5. 추가 참고 링크

- [React Native 공식 문서](https://reactnative.dev/docs/getting-started)
- [react-navigation](https://reactnavigation.org/)
- [tailwind-rn](https://github.com/vadimdemedes/tailwind-rn)

---

이 문서를 참고하여 폴더 구조와 컴포넌트 매핑, 주요 변경 포인트를 정리하면 이식 작업이 훨씬 수월해집니다.
