import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChargeForm from '../components/charge/ChargeForm';
import ChargeConfirmModal from '../components/charge/ChargeConfirmModal';
import { useChargeForm } from '../hooks/useChargeForm';
import UserPageLayout from '../components/user/UserPageLayout';
import ChargerSelectCard from '../components/user/ChargerSelectCard';
import ChargeModeSelectCard from '../components/user/ChargeModeSelectCard';
import ModeDescription from '../components/user/ModeDescription';
import StationSelectCard from '../components/user/StationSelectCard';
import { useChargeStore } from '../store/chargeStore';
import { useStationStore } from '../store/stationStore';

const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(0); // 0: station, 1: charger, 2: mode
  const [hovered, setHovered] = React.useState<'normal' | 'optimized' | 'chargerSelect' | null>(null);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const mode = useChargeStore(state => state.mode);
  const setMode = useChargeStore(state => state.setMode);
  const selectedStationId = useChargeStore(state => state.selectedStationId);
  const setStation = useChargeStore(state => state.setStation);
  const selectedChargerId = useChargeStore(state => state.selectedChargerId);
  const setCharger = useChargeStore(state => state.setCharger);

  const stations = useStationStore(state => state.stations);
  const chargersByStation = useStationStore(state => state.chargersByStation);
  const setChargerStatus = useStationStore(state => state.setChargerStatus);

// ...existing code...
  
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
    setStation(null);
    setCharger(null);
    setMode(null);
    setStep(0);
    resetForm();
    navigate('/');
  };

  return (
    <UserPageLayout onHome={handleHome}>
      {/* Step 1: 충전소 선택 */}
      {step === 0 && (
        <StationSelectCard onBack={handleHome} onSelect={() => setStep(1)} />
      )}
      {/* Step 2: 충전기 선택 */}
      {step === 1 && (
        <ChargerSelectCard onBack={() => setStep(0)} onSelect={() => setStep(2)} />
      )}
      {/* Step 3: 충전 방식 선택 */}
      {step === 2 && (
        <>
          <ChargeModeSelectCard
            onSelect={mode => {
              setMode(mode);
              setStep(3);
            }}
            onBack={() => setStep(1)}
            setHovered={setHovered}
          />
          <ModeDescription hovered={hovered} />
        </>
      )}
      {/* Step 4: 충전 정보 입력 및 확인 */}
      {step === 3 && (
        <ChargeForm
          currentSoc={currentSoc}
          targetSoc={targetSoc}
          arrivalTime={arrivalTime}
          departureTime={departureTime}
          error={error}
          mode={mode as 'normal' | 'optimized' | null}
          onChange={(field, value) => {
            if (field === 'currentSoc') setCurrentSoc(value);
            if (field === 'targetSoc') setTargetSoc(value);
            if (field === 'arrivalTime') setArrivalTime(value);
            if (field === 'departureTime') setDepartureTime(value);
          }}
          onBack={() => {
            setMode(null);
            setStep(2);
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
      {/* Confirm Modal */}
      <ChargeConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          // 충전기 상태를 CHARGING으로 변경
          if (selectedStationId && selectedChargerId) {
            setChargerStatus(selectedStationId, selectedChargerId, 'CHARGING');
          }
          setShowConfirm(false);
          navigate('/charge-ai-loading', {
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
          setStation(null);
          setCharger(null);
          setStep(0);
        }}
        currentSoc={currentSoc}
        targetSoc={targetSoc}
        arrivalTime={arrivalTime}
        departureTime={departureTime}
        mode={mode as 'normal' | 'optimized'}
      />
    </UserPageLayout>
  );
};

export default UserPage;
