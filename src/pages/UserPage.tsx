import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChargeForm from '../components/charge/ChargeForm';
import ChargeConfirmModal from '../components/charge/ChargeConfirmModal';
import { useChargeForm } from '../hooks/useChargeForm';
import { useUserPageState } from '../hooks/useUserPageState';
import UserPageLayout from '../components/user/UserPageLayout';
import ChargeModeSelectCard from '../components/user/ChargeModeSelectCard';
import ModeDescription from '../components/user/ModeDescription';


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

  return (
    <UserPageLayout>
      {mode === null && (
        <>
          <ChargeModeSelectCard
            onSelect={setMode}
            onHome={() => navigate('/')}
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
            },
          });
          resetForm();
          setMode(null);
        }}
        currentSoc={currentSoc}
        targetSoc={targetSoc}
        arrivalTime={arrivalTime}
        departureTime={departureTime}
        mode={mode as 'normal' | 'optimized'}
      />
      {(mode === 'normal' || mode === 'optimized') && (
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
