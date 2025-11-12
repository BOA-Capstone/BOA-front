import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { useStationStore } from "../../store/stationStore";
import type { Charger } from "../../types/charger";
import { scheduleTableByPort } from "../../constants/scheduleTable";

type ChargerStatus = "IDLE" | "CHARGING" | "FAULT";

type ChargerView = {
    id: number;
    name: string;
    status: ChargerStatus;
    powerKw: number;
    volt: number;
    amp: number;
    soc: number;
    updatedAt: string;
};

interface AdminChargerGridProps {
    stationId: number;
    onBack?: () => void;
}

const badge = (s: ChargerStatus) =>
    s === "CHARGING"
        ? "bg-green-500/20 text-green-300"
        : s === "FAULT"
            ? "bg-red-500/20 text-red-300"
            : "bg-white/10 text-white/70";

const AdminChargerGrid: React.FC<AdminChargerGridProps> = ({ stationId, onBack }) => {
    const stations = useStationStore((s) => s.stations);
    const chargersByStation = useStationStore((s) => s.chargersByStation);

    const stationName = stations.find((s) => s.id === stationId)?.name ?? `충전소 #${stationId}`;
    const chargers = chargersByStation[stationId] || [];

    // 내부 표시용 상태(실데이터가 단순해도 카드에 필요한 값들 보강)
    const [rows, setRows] = useState<ChargerView[]>(() =>
        chargers.map((c: Charger, i: number) => {
            let status: ChargerStatus = "IDLE";
            if (c.id === 1 || c.id === 4) status = "CHARGING";
            return {
                id: c.id ?? i + 1,
                name: c.name ?? `충전기 ${i + 1}`,
                status,
                powerKw: Number(c.powerKw ?? 0),
                volt: Number(c.volt ?? 0),
                amp: Number(c.amp ?? 0),
                soc: Number.isFinite(c.soc) ? Number(c.soc) : Math.round(Math.random() * 20),
                updatedAt: c.updatedAt ?? new Date().toISOString(),
            };
        })
    );
    // 각 포트별 info-modal 오픈 상태 관리
    const [openInfoModalId, setOpenInfoModalId] = useState<number | null>(null);

    // 선택된 충전소가 바뀌거나, 3초마다 자동 갱신
    useEffect(() => {
        const updateRows = () => {
            const next = (chargersByStation[stationId] || []).map((c: Charger, i: number) => {
                let status: ChargerStatus = "IDLE";
                if (c.id === 1 || c.id === 4) status = "CHARGING";
                // 1번, 4번 포트는 전력/전압/전류를 랜덤 갱신
                let powerKw = Number(c.powerKw ?? 0);
                let volt = Number(c.volt ?? 0);
                let amp = Number(c.amp ?? 0);
                if (c.id === 1) {
                  powerKw = Math.round((40 + Math.random() * 20) * 10) / 10; // 40~60 kW
                  volt = Math.round((350 + Math.random() * 50)); // 350~400 V
                  amp = Math.round((15 + Math.random() * 10)); // 15~25 A
                }
                if (c.id === 4) {
                  powerKw = Math.round((80 + Math.random() * 40) * 10) / 10; // 80~120 kW
                  volt = Math.round((380 + Math.random() * 40)); // 380~420 V
                  amp = Math.round((25 + Math.random() * 10)); // 25~35 A
                }
                return {
                    id: c.id ?? i + 1,
                    name: c.name ?? `충전기 ${i + 1}`,
                    status,
                    powerKw,
                    volt,
                    amp,
                    soc: Number.isFinite(c.soc) ? Number(c.soc) : Math.round(Math.random() * 20),
                    updatedAt: c.updatedAt ?? new Date().toISOString(),
                };
            });
            setRows(next);
        };
        updateRows();
        const interval = setInterval(updateRows, 3000);
        return () => clearInterval(interval);
    }, [stationId, chargersByStation]);


    const online = useMemo(() => rows.filter((r) => r.status !== "FAULT").length, [rows]);

    return (
        <section className="w-full">
            <div className="mb-4 flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white">충전기 현황</h1>
                <div className="text-lg text-purple-600/80 font-semibold">{stationName}</div>
                <div className="text-sm text-white/70">온라인: {online}/{rows.length}</div>
                {onBack && (
                    <div className="ml-auto">
                        <Button
                            className=" hover:border-purple-600/100 hover:text-purple-600/100 border border-white/10 text-white transition-colors"
                            size="lg"
                            onClick={onBack}
                        >
                            뒤로가기
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {rows.map((r) => (
                    <div key={r.id} className="rounded-2xl p-4 bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between">
                            <div className="font-semibold">{r.name}</div>
                            <span className={`text-xs px-2 py-1 rounded-full ${badge(r.status)}`}>{r.status}</span>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                            <div className="bg-white/5 rounded-xl p-3">전력<div className="text-lg font-bold">{r.powerKw} kW</div></div>
                            <div className="bg-white/5 rounded-xl p-3">전압<div className="text-lg font-bold">{r.volt} V</div></div>
                            <div className="bg-white/5 rounded-xl p-3">전류<div className="text-lg font-bold">{r.amp} A</div></div>
                            <div className="bg-white/5 rounded-xl p-3">SoC<div className="text-lg font-bold">{r.soc.toFixed(0)}%</div></div>
                        </div>

                        {r.status === 'CHARGING' && (
                            <>
                                <Button
                                    className="mt-4 w-full hover:border-purple-600/100 hover:text-purple-600/100 border border-white/10 text-white transition-colors"
                                    size="lg"
                                    type="button"
                                    onClick={() => setOpenInfoModalId(r.id)}
                                >
                                    스케줄링 계획
                                </Button>
                                <Modal open={openInfoModalId === r.id} onClose={() => setOpenInfoModalId(null)}>
                                    <div className="flex flex-col items-center gap-4 text-white p-6">
                                        <h3 className="text-xl font-bold mb-2">스케줄링 계획 안내 (15분 단위)</h3>
                                        {scheduleTableByPort[r.id] ? (
                                            <div className="w-full max-h-72 overflow-y-auto">
                                                <table className="w-full text-sm border-separate border-spacing-y-1">
                                                    <thead>
                                                        <tr className="sticky top-0 bg-black">
                                                            <th className="px-2 py-1 border-b border-white/30 text-left">시간</th>
                                                            <th className="px-2 py-1 border-b border-white/30 text-left">전략</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {scheduleTableByPort[r.id].map(([time, plan], idx) => (
                                                            <tr key={idx} className="odd:bg-white/5 even:bg-white/10">
                                                                <td className="px-2 py-1 whitespace-nowrap">{time}</td>
                                                                <td className="px-2 py-1 whitespace-nowrap">{plan}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <div className="text-base text-center">이 포트의 스케줄링 계획/정보를 여기에 표시할 수 있습니다.</div>
                                        )}
                                        <Button
                                            className="mt-4 w-full hover:border-purple-600/100 hover:text-purple-600/100 text-white border-white transition-colors"
                                            size="lg"
                                            type="button"
                                            onClick={() => setOpenInfoModalId(null)}
                                        >
                                            닫기
                                        </Button>
                                    </div>
                                </Modal>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AdminChargerGrid;
