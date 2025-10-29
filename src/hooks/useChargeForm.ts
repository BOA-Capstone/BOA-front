import { useState } from 'react';
import { validateChargeForm } from '../utils/validation';

export function useChargeForm() {
  const [currentSoc, setCurrentSoc] = useState('');
  const [targetSoc, setTargetSoc] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setCurrentSoc('');
    setTargetSoc('');
    setArrivalTime('');
    setDepartureTime('');
    setError(null);
  };

  const validate = () => {
    const err = validateChargeForm({
      currentSoc,
      targetSoc,
      arrivalTime,
      departureTime,
    });
    setError(err);
    return !err;
  };

  return {
    currentSoc,
    setCurrentSoc,
    targetSoc,
    setTargetSoc,
    arrivalTime,
    setArrivalTime,
    departureTime,
    setDepartureTime,
    error,
    setError,
    resetForm,
    validate,
  };
}
