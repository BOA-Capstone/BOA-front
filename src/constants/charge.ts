// 충전 비용 등 더미/상수 데이터
export const BASE_COST = 5000; // 일반 충전(즉시)
export const RAPID_COST = 4200; // 급속 충전
export const AI_COST = 3800; // AI 최적화

export const getSave = (base: number, compare: number) => base - compare;
export const getSaveRate = (base: number, compare: number) => Math.round(((base - compare) / base) * 100);
// 포트별 더미 결과 데이터 (1번, 4번만 특별, 나머지는 기본)
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
	1: {
		baseCost: 6792,
		rapidCost: 18000,
		aiCost: 5192,
		rapidSave: 6000,
		rapidSaveRate: 33,
		aiSave: 1600,
		aiSaveRate: 24.5,
		infoList: [
			'[에너지 소스] 그리드: 8.41 kWh (22.4%) 태양광: 12.27 kWh (32.7%) ESS: 16.82 kWh (44.8%) 총합: 37.50 kWh',
			'[ESS 상태] 초기: 32.0 kWh (40%)  최종: 36.0 kWh (45%)  사용량: -4.0 kWh',
			'SoC 목표 달성',
		],
	},
	4: {
		baseCost: 6692,
		rapidCost: 20000,
		aiCost: 4810,
		rapidSave: 5000,
		rapidSaveRate: 25,
		aiSave: 1882,
		aiSaveRate: 28.1,
		infoList: [
			'[에너지 소스] 그리드: 13.62 kWh (33.9%) 태양광: 11.64 kWh (28.9%) ESS: 14.96 kWh (37.2%) 총합: 40.22 kWh',
			'[ESS 상태] 초기: 40.0 kWh (40%)  최종: 38.8 kWh (39%)  사용량: 1.2 kWh',
			'SoC 목표 달성',
		],
	},
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
		'AI가 추천한 시간대 충전으로 약간의 절감 효과',
		'실제 절감액은 상황에 따라 달라질 수 있습니다',
	],
};
