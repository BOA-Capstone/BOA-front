// 충전 비용 등 더미/상수 데이터
export const BASE_COST = 5000; // 일반 충전(즉시)
export const RAPID_COST = 4200; // 급속 충전
export const AI_COST = 3800; // AI 최적화

export const getSave = (base: number, compare: number) => base - compare;
export const getSaveRate = (base: number, compare: number) => Math.round(((base - compare) / base) * 100);
