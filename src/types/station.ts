export type Station = {
  id: number;
  name: string;
  status: 'IDLE' | 'CHARGING' | 'FAULT';
  address: string;
  distanceKm: number;
};
