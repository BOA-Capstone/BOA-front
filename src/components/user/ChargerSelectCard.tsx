import React from 'react';
import { FaPlug } from 'react-icons/fa';
import { Button } from '../ui/button';
import { useStationStore } from '../../store/stationStore';
import { useChargeStore } from '../../store/chargeStore';
import { useWebSocket } from '../../hooks/useWebSocket';
import type { ChargerStatusMessage } from '../../services/websocketService';
import { Modal } from '../ui/modal';
interface ChargerSelectCardProps {
  onBack?: () => void;
  onSelect?: () => void;
}

const statusColor = {
  IDLE: 'bg-white/10 text-white/70',
  CHARGING: 'bg-green-500/20 text-green-300',
  FAULT: 'bg-red-500/20 text-red-300',
};

const ChargerSelectCard: React.FC<ChargerSelectCardProps> = ({ onBack, onSelect }) => {
  const chargersByStation = useStationStore(state => state.chargersByStation);
  const stations = useStationStore(state => state.stations);
  const setChargerStatus = useStationStore(state => state.setChargerStatus);
  const selectedStationId = useChargeStore(state => state.selectedStationId);
  const selectedId = useChargeStore(state => state.selectedChargerId);
  const setCharger = useChargeStore(state => state.setCharger);
  const selectedStation = stations.find(s => s.id === selectedStationId);
  const stationName = selectedStation?.name;
  const chargers = chargersByStation[selectedStationId || 0] || [];

  // 웹소켓 훅 선언
  const { isConnected, subscribe, unsubscribe } = useWebSocket({
    url: import.meta.env.VITE_WEBSOCKET_SERVER_URL || '',
    autoConnect: true,
  });

  // 실시간 충전기 상태 변경 (웹소켓)
  React.useEffect(() => {
    if (!isConnected || !selectedStationId) return;

    const stationIdStr = 'EV001'; // 실제 충전소 ID (고정)
    const chargers = chargersByStation[selectedStationId] || [];
    const chargerNos = chargers.map((c: { id: number }) => c.id);

    chargerNos.forEach((chargerNo: number) => {
      const topic = `/topic/chargers/status/${stationIdStr}/${chargerNo}`;
      subscribe(topic, (data: ChargerStatusMessage) => {
        // 임시: power가 800W 이상이면 충전 중으로 간주
        const isCharging = data.power >= 800;

        // 임시: 1번과 5번의 데이터를 서로 바꿈
        let targetChargerNo = data.chargerNo;
        if (data.chargerNo === 1) targetChargerNo = 5;
        else if (data.chargerNo === 5) targetChargerNo = 1;
        else if (data.chargerNo === 2) targetChargerNo = 4;
        else if (data.chargerNo === 4) targetChargerNo = 2;

        setChargerStatus(selectedStationId, targetChargerNo, isCharging ? 'CHARGING' : 'IDLE');
      });
    });

    return () => {
      chargerNos.forEach((chargerNo: number) => {
        const topic = `/topic/chargers/status/${stationIdStr}/${chargerNo}`;
        unsubscribe(topic);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, selectedStationId]);

  // 나머지 상태 및 핸들러
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [infoType, setInfoType] = React.useState<'power' | 'inuse' | null>(null);
  const isBoa1 = stationName === '세종대 BOA 충전소' || selectedStationId === 1;
  const chargingCount = isBoa1 ? chargers.filter(c => c.status === 'CHARGING').length : 0;
  const [pendingCharger, setPendingCharger] = React.useState<number | null>(null);

  const handleChargerClick = (chargerId: number) => {
    const charger = chargers.find((c: { id: number; status: string }) => c.id === chargerId);
    if (charger?.status === 'CHARGING') {
      setInfoType('inuse');
      setInfoOpen(true);
      return;
    }
    if (chargingCount >= 2) {
      setPendingCharger(chargerId);
      setInfoType('power');
      setInfoOpen(true);
      return;
    }
    setCharger(chargerId);
    if (onSelect) onSelect();
  };

  const handleInfoClose = () => {
    setInfoOpen(false);
    if (infoType === 'power' && pendingCharger !== null) {
      setCharger(pendingCharger);
      if (onSelect) onSelect();
      setPendingCharger(null);
    }
    setInfoType(null);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-3xl font-bold text-white">충전기 선택</h1>
        <FaPlug className="text-cyan-400 text-2xl" />
      </div>
      {stationName && (
        <>
          <div className="mb-1 text-lg text-cyan-400 font-semibold text-center">{stationName}</div>
          {selectedStation?.address && (
            <div className="text-sm text-white/70 text-center mb-1">{selectedStation.address}</div>
          )}
          {selectedStation?.desc && !(isBoa1 && chargingCount >= 2) && (
            <div className="mb-6 text-xs text-cyan-400 text-center whitespace-pre-line">{selectedStation.desc}</div>
          )}
          {(!selectedStation?.desc || (isBoa1 && chargingCount >= 2)) && <div className="mb-6" />}
        </>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {chargers.map(charger => (
            <div
              key={charger.id}
              className={`rounded-2xl p-4 bg-white/5 border transition-all cursor-pointer select-none
                ${selectedId === charger.id ? 'border-[var(--cyan)] ring-2 ring-[var(--cyan)] bg-black/60' : 'border-white/10 hover:border-[var(--cyan)] hover:bg-black/40'}
                ${charger.status === 'FAULT' ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={() => handleChargerClick(charger.id)}
            >
              <div className="flex flex-col items-center mb-2 gap-1">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <FaPlug className="text-cyan-400 text-lg" />
                  {charger.name}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full mt-1 ${statusColor[charger.status]}`}>{charger.status}</span>
              </div>
            </div>
        ))}
      </div>
      {onBack && (
        <div className="flex justify-end mt-2">
          <Button variant="secondary" size="lg" onClick={onBack}>
            뒤로가기
          </Button>
        </div>
      )}
      <Modal open={infoOpen} onClose={handleInfoClose} className="bg-black">
        <div className="flex flex-col items-center gap-4 text-white">
          <h3 className="text-xl font-bold mb-2">충전 안내</h3>
          {infoType === 'inuse' ? (
            <div className="w-full flex flex-col gap-2 text-base text-center">
              <div><span className="font-semibold">현재 사용중인 충전기입니다.</span><br/>다른 충전소를 이용해 주십시오.</div>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-2 text-base text-center">
              <div><span className="font-semibold">계약 전력 한도로 인해</span><br/>충전 효율이 하락합니다.</div>
              <div className="text-white/80">3시간 뒤 약 20% 절감 가능할 예정입니다.<br/>혹은 다른 충전소를 이용해 주십시오.</div>
            </div>
          )}
          <div className="flex gap-4 mt-4">
            <Button variant="secondary" onClick={handleInfoClose}>닫기</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChargerSelectCard;
