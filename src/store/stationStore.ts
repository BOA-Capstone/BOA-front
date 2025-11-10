
import { create } from 'zustand';
import type { Station } from '../types/station';
import type { Charger } from '../types/charger';

interface StationState {
  stations: Station[];
  chargersByStation: Record<number, Charger[]>;
  setChargerStatus: (stationId: number, chargerId: number, status: 'IDLE' | 'CHARGING' | 'FAULT') => void;
  chargerMessageById: Record<number, string>;
  setChargerMessage: (chargerId: number, message: string) => void;
}


export const useStationStore = create<StationState>((set) => ({
  stations: [
    { id: 1, name: 'OptiEV 충전소 1', address: '서울 광진구', distanceKm: 0.1 },
    { id: 2, name: 'OptiEV 충전소 2', address: '서울 광진구', distanceKm: 1.1 },
    { id: 3, name: 'OptiEV 충전소 3', address: '서울 광진구', distanceKm: 2.7 },
  ],
  chargersByStation: {
    1: [
      { id: 1, name: '1번 포트', status: 'IDLE', powerKw: 7 },
      { id: 2, name: '2번 포트', status: 'IDLE', powerKw: 50 },
      { id: 3, name: '3번 포트', status: 'IDLE', powerKw: 100 },
      { id: 4, name: '4번 포트', status: 'IDLE', powerKw: 100 },
      { id: 5, name: '5번 포트', status: 'IDLE', powerKw: 100 },
    ],
    2: [
      { id: 4, name: '1번 포트', status: 'IDLE', powerKw: 7 },
    ],
    3: [
      { id: 6, name: '1번 포트', status: 'IDLE', powerKw: 7 },
    ],
  },
  setChargerStatus: (stationId, chargerId, status) => {
    set(state => {
      const chargers = state.chargersByStation[stationId]?.map(charger =>
        charger.id === chargerId ? { ...charger, status } : charger
      ) || [];
      return {
        chargersByStation: {
          ...state.chargersByStation,
          [stationId]: chargers,
        },
      };
    });
  },
  chargerMessageById: {
    1: '1번 포트 절감 메시지 예시입니다.',
    4: '4번 포트 절감 메시지 예시입니다.',
  },
  setChargerMessage: (chargerId, message) => {
    set(state => ({
      chargerMessageById: {
        ...state.chargerMessageById,
        [chargerId]: message,
      },
    }));
  },
}));