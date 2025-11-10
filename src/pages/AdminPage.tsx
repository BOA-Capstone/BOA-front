import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminMonitorPanel from "../components/admin/AdminMonitorPanel";
import IoTSimulator from "../components/admin/IoTSimulator";
import CostCompare from "../components/admin/CostCompare";

type Tab = "live" | "iot" | "cost";

const AdminPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>("live");

  const Content = useMemo(() => {
    switch (tab) {
      case "live": return <AdminMonitorPanel />;
      case "iot": return <IoTSimulator />;
      case "cost": return <CostCompare />;
      default: return null;
    }
  }, [tab]);

  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-b from-[#0a0b14] to-[#111325] text-white">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <span className="text-purple-400">OptiEV</span> 관리자
          </h1>
          <nav className="flex gap-2 items-center">
            <button onClick={() => setTab("live")} className={`px-3 py-2 rounded-xl ${tab === 'live' ? 'bg-purple-600/80' : 'bg-white/10 hover:bg-white/20'}`}>운영 대시보드</button>
            <button onClick={() => setTab("iot")} className={`px-3 py-2 rounded-xl ${tab === 'iot' ? 'bg-purple-600/80' : 'bg-white/10 hover:bg-white/20'}`}>IoT 시뮬레이터</button>
            <button onClick={() => setTab("cost")} className={`px-3 py-2 rounded-xl ${tab === 'cost' ? 'bg-purple-600/80' : 'bg-white/10 hover:bg-white/20'}`}>요금/최적화 비교</button>
            <button onClick={() => navigate('/')} className="ml-4 px-3 py-2 rounded-xl bg-cyan-600/80 hover:bg-cyan-400/90 text-white font-bold transition-all">처음으로</button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {Content}
      </main>
    </div>
  );
};

export default AdminPage;
