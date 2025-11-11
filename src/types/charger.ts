export type Charger = {
  id: number;
  name: string;
  status: 'IDLE' | 'CHARGING' | 'FAULT';
  powerKw?: number;
  volt?: number;
  amp?: number;
  soc?: number;
  updatedAt?: string;
};
