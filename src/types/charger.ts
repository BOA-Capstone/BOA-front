export type Charger = {
  id: number;
  name: string;
  status: 'IDLE' | 'CHARGING' | 'FAULT';
  type: 'AC' | 'DC';
  powerKw: number;
};
