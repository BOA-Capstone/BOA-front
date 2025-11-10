import { create } from 'zustand';

export type ChargeMode = 'normal' | 'optimized' | null;

interface ChargeState {
  selectedStationId: number | null;
  selectedChargerId: number | null;
  mode: ChargeMode;
  currentSoc: string;
  targetSoc: string;
  arrivalTime: string;
  departureTime: string;
  setStation: (id: number | null) => void;
  setCharger: (id: number | null) => void;
  setMode: (mode: ChargeMode) => void;
  setCurrentSoc: (v: string) => void;
  setTargetSoc: (v: string) => void;
  setArrivalTime: (v: string) => void;
  setDepartureTime: (v: string) => void;
  reset: () => void;
}

export const useChargeStore = create<ChargeState>((set) => ({
  selectedStationId: null,
  selectedChargerId: null,
  mode: null,
  currentSoc: '',
  targetSoc: '',
  arrivalTime: '',
  departureTime: '',
  setStation: (id) => set({ selectedStationId: id, selectedChargerId: null, mode: null }),
  setCharger: (id) => set({ selectedChargerId: id, mode: null }),
  setMode: (mode) => set({ mode }),
  setCurrentSoc: (v) => set({ currentSoc: v }),
  setTargetSoc: (v) => set({ targetSoc: v }),
  setArrivalTime: (v) => set({ arrivalTime: v }),
  setDepartureTime: (v) => set({ departureTime: v }),
  reset: () => set({
    selectedStationId: null,
    selectedChargerId: null,
    mode: null,
    currentSoc: '',
    targetSoc: '',
    arrivalTime: '',
    departureTime: '',
  }),
}));
