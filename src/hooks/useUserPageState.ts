import { useState } from 'react';

export function useUserPageState() {
  const [mode, setMode] = useState<'normal' | 'optimized' | null>(null);
  const [hovered, setHovered] = useState<'normal' | 'optimized' | 'chargerSelect' | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  return {
    mode,
    setMode,
    hovered,
    setHovered,
    showConfirm,
    setShowConfirm,
  };
}
