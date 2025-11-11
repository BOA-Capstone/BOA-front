// 충전 비용 등 더미/상수 데이터
export const BASE_COST = 5000; // 일반 충전(즉시)
export const RAPID_COST = 4200; // 급속 충전
export const AI_COST = 3800; // AI 최적화

export const getSave = (base: number, compare: number) => base - compare;
export const getSaveRate = (base: number, compare: number) => Math.round(((base - compare) / base) * 100);
export const CHARGER_RESULT_MAP: Record<number, {
	baseCost: number;
	rapidCost: number;
	aiCost: number;
	rapidSave: number;
	rapidSaveRate: number;
	aiSave: number;
	aiSaveRate: number;
	infoList: string[];
}> = {
};

// 기본값 (1, 4번 외)
export const DEFAULT_CHARGER_RESULT = {
	baseCost: 10000,
	rapidCost: 12000,
	aiCost: 9500,
	rapidSave: 2000,
	rapidSaveRate: 17,
	aiSave: 500,
	aiSaveRate: 5,
	 infoList: [
	 '일반 충전은 즉시 충전을 시작하지만, 스케줄링 충전은 AI가 전기 요금이 저렴한 시간대를 자동으로 찾아 충전 일정을 분산합니다.',
	 '이로 인해 불필요한 비용을 줄이고, 사용자의 목표 배터리 잔량에 맞춰 효율적으로 충전이 진행됩니다.',
	 '실제 절감액과 충전 시간은 사용자의 선택과 충전소 상황에 따라 달라질 수 있습니다.',
	 ],
};
