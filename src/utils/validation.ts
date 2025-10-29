export interface ChargeFormValues {
  currentSoc: string;
  targetSoc: string;
  arrivalTime: string;
  departureTime: string;
}

export function validateChargeForm({ currentSoc, targetSoc, arrivalTime, departureTime }: ChargeFormValues): string | null {
  const cur = Number(currentSoc);
  const tar = Number(targetSoc);
  if (isNaN(cur) || isNaN(tar)) return 'SoC 값을 입력해 주세요.';
  if (cur < 0 || cur > 100 || tar < 0 || tar > 100) return 'SoC는 0~100 사이여야 합니다.';
  if (cur >= tar) return '목표 SoC는 현재 SoC보다 커야 합니다.';
  if (!arrivalTime || !departureTime) return '차량 도착 시간과 출차 희망 시간을 모두 입력해 주세요.';
  if (arrivalTime >= departureTime) return '출차 희망 시간은 차량 도착 시간보다 늦어야 합니다.';
  return null;
}
