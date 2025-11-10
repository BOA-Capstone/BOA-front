import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChargeForm from '../components/charge/ChargeForm';
import ChargeConfirmModal from '../components/charge/ChargeConfirmModal';
import { useChargeForm } from '../hooks/useChargeForm';
import { useUserPageState } from '../hooks/useUserPageState';
import UserPageLayout from '../components/user/UserPageLayout';
import ChargerSelectCard from '../components/user/ChargerSelectCard';
import ChargeModeSelectCard from '../components/user/ChargeModeSelectCard';
import ModeDescription from '../components/user/ModeDescription';
import StationSelectCard from '../components/user/StationSelectCard';
import type { Station } from '../types/station';
import type { Charger } from '../types/charger';


const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    mode,
    setMode,
    hovered,
    setHovered,
    showConfirm,
    setShowConfirm,
  } = useUserPageState();

  // 충전소/충전기 선택 상태 추가
  const [selectedStationId, setSelectedStationId] = React.useState<number | null>(null);
  const [selectedChargerId, setSelectedChargerId] = React.useState<number | null>(null);

  // 샘플 충전소 데이터
  const stations: Station[] = [
    { id: 1, name: 'BOA 충전소 1', status: 'IDLE', address: '서울 강남구 테헤란로 1', distanceKm: 0.3 },
    { id: 2, name: 'BOA 충전소 2', status: 'IDLE', address: '서울 강남구 테헤란로 2', distanceKm: 1.1 },
    { id: 3, name: 'BOA 충전소 3', status: 'IDLE', address: '서울 강남구 테헤란로 3', distanceKm: 2.7 },
    { id: 4, name: 'BOA 충전소 4', status: 'IDLE', address: '서울 강남구 테헤란로 4', distanceKm: 3.2 },
    { id: 5, name: 'BOA 충전소 5', status: 'IDLE', address: '서울 강남구 테헤란로 5', distanceKm: 4.8 },
  ];

  // 샘플 충전기 데이터(충전소별로 다르게 할 수도 있음)
  const chargersByStation: Record<number, Charger[]> = {
    1: [
      { id: 1, name: '1번 포트', status: 'IDLE', type: 'AC', powerKw: 7 },
      { id: 2, name: '2번 포트', status: 'IDLE', type: 'DC', powerKw: 50 },
      { id: 3, name: '3번 포트', status: 'CHARGING', type: 'DC', powerKw: 100 },
    ],
    2: [
      { id: 4, name: '1번 포트', status: 'IDLE', type: 'AC', powerKw: 7 },
      { id: 5, name: '2번 포트', status: 'FAULT', type: 'DC', powerKw: 50 },
    ],
    3: [
      { id: 6, name: '1번 포트', status: 'IDLE', type: 'AC', powerKw: 7 },
    ],
    4: [
      { id: 7, name: '1번 포트', status: 'IDLE', type: 'DC', powerKw: 100 },
      { id: 8, name: '2번 포트', status: 'IDLE', type: 'AC', powerKw: 7 },
    ],
    5: [
      { id: 9, name: '1번 포트', status: 'IDLE', type: 'AC', powerKw: 7 },
    ],
  };
  
  const {
    currentSoc,
    setCurrentSoc,
    targetSoc,
    setTargetSoc,
    arrivalTime,
    setArrivalTime,
    departureTime,
    setDepartureTime,
    error,
    resetForm,
    validate,
  } = useChargeForm();

  // '처음으로' 버튼 클릭 시 모든 상태 초기화
  const handleHome = () => {
    setSelectedStationId(null);
    setSelectedChargerId(null);
    setMode(null);
    setHovered(null);
    resetForm();
    setShowConfirm(false);
    navigate('/');
  };

  return (
    <UserPageLayout onHome={handleHome}>
      {/* 1단계: 충전소 선택 */}
      {selectedStationId === null && (
          <div className="w-full flex flex-col items-center">
            <StationSelectCard
              stations={stations}
              selectedId={selectedStationId}
              onSelect={setSelectedStationId}
              onBack={() => navigate('/')}
            />
          </div>
      )}
      {/* 2단계: 충전기(포트) 선택 */}
      {selectedStationId !== null && selectedChargerId === null && (
          <div className="w-full flex flex-col items-center">
            <ChargerSelectCard
              chargers={chargersByStation[selectedStationId] || []}
              selectedId={selectedChargerId}
              onSelect={setSelectedChargerId}
              onBack={() => setSelectedStationId(null)}
            />
          </div>
      )}
      {/* 3단계: 충전 방식 선택 (충전기 선택 후) */}
      {selectedStationId !== null && selectedChargerId !== null && mode === null && (
        <>
          <ChargeModeSelectCard
            onSelect={setMode}
            onHome={() => {
              setSelectedChargerId(null);
              setMode(null);
            }}
            hovered={hovered}
            setHovered={setHovered}
          />
          <ModeDescription hovered={hovered} />
        </>
      )}
      <ChargeConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          navigate('/charge-result', {
            state: {
              currentSoc,
              targetSoc,
              arrivalTime,
              departureTime,
              mode,
              station: stations.find(s => s.id === selectedStationId) || null,
              charger: (chargersByStation[selectedStationId || 0] || []).find(c => c.id === selectedChargerId) || null,
            },
          });
          resetForm();
          setMode(null);
          setSelectedStationId(null);
          setSelectedChargerId(null);
        }}
        currentSoc={currentSoc}
        targetSoc={targetSoc}
        arrivalTime={arrivalTime}
        departureTime={departureTime}
        mode={mode as 'normal' | 'optimized'}
      />
      {(selectedStationId !== null && selectedChargerId !== null && (mode === 'normal' || mode === 'optimized')) && (
        <ChargeForm
          currentSoc={currentSoc}
          targetSoc={targetSoc}
          arrivalTime={arrivalTime}
          departureTime={departureTime}
          error={error}
          mode={mode}
          onChange={(field, value) => {
            if (field === 'currentSoc') setCurrentSoc(value);
            if (field === 'targetSoc') setTargetSoc(value);
            if (field === 'arrivalTime') setArrivalTime(value);
            if (field === 'departureTime') setDepartureTime(value);
          }}
          onBack={() => {
            setMode(null);
            resetForm();
          }}
          onSubmit={e => {
            e.preventDefault();
            if (validate()) {
              setShowConfirm(true);
            }
          }}
        />
      )}
    </UserPageLayout>
  );
};

export default UserPage;
