import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ChargeAiLoadingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/charge-result", { state: location.state });
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <div className="mb-8">
          <div className="w-20 h-20 border-8 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="text-white text-2xl font-bold mb-2">Loading...</div>
        <div className="text-cyan-400 text-base">예상 충전 요금을 계산하고 있습니다...</div>
      </div>
    </div>
  );
};

export default ChargeAiLoadingPage;
