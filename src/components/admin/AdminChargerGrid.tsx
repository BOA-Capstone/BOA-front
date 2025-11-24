import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { useStationStore } from "../../store/stationStore";
import type { Charger } from "../../types/charger";
import { scheduleTableByPort } from "../../constants/scheduleTable";
import { useWebSocket } from "../../hooks/useWebSocket";
import type { ChargerStatusMessage } from "../../services/websocketService";

type ChargerStatus = "IDLE" | "CHARGING" | "FAULT";

type ChargerView = {
    id: number;
    name: string;
    status: ChargerStatus;
    powerW: number;
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

    // 내부 표시용 상태 (WebSocket 실시간 데이터)
    const [rows, setRows] = useState<ChargerView[]>(() =>
        chargers.map((c: Charger, i: number) => ({
            id: c.id ?? i + 1,
            name: c.name ?? `충전기 ${i + 1}`,
            status: "IDLE" as ChargerStatus,
            powerW: 0,
            volt: 0,
            amp: 0,
            soc: 0,
            updatedAt: new Date().toISOString(),
        }))
    );
    // 각 포트별 info-modal 오픈 상태 관리
    const [openInfoModalId, setOpenInfoModalId] = useState<number | null>(null);

    // WebSocket 연결
    const { isConnected, subscribe, unsubscribe } = useWebSocket({
        url: import.meta.env.VITE_WEBSOCKET_SERVER_URL || '',
        autoConnect: true,
    });

    // WebSocket 구독 (충전소 EV001의 1~5번 충전기)
    useEffect(() => {
        if (!isConnected) return;

        const stationIdStr = 'EV001'; // 실제 충전소 ID
        const chargerNos = [1, 2, 3, 4, 5];

        chargerNos.forEach((chargerNo) => {
            const topic = `/topic/chargers/status/${stationIdStr}/${chargerNo}`;

            subscribe(topic, (data: ChargerStatusMessage) => {
                // 받은 데이터로 해당 충전기 상태 업데이트
                setRows((prevRows) => {
                    // 임시: power가 800W 이상이면 충전 중으로 간주
                    const isCharging = data.power >= 800;

                    // 임시: 1번과 5번의 실제 데이터를 결정 (서로 바꿈)
                    let targetId = data.chargerNo;
                    if (data.chargerNo === 1) targetId = 5;
                    else if (data.chargerNo === 5) targetId = 1;

                    return prevRows.map((row) => {
                        // 임시: 1번 데이터는 5번에, 5번 데이터는 1번에 적용
                        if (row.id === targetId) {
                            return {
                                ...row,
                                powerW: Math.round(data.power),
                                volt: Number(data.voltage.toFixed(2)),
                                amp: Number(data.current.toFixed(1)),
                                status: isCharging ? 'CHARGING' : 'IDLE',
                                updatedAt: new Date(data.timeStamp * 1000).toISOString(),
                            };
                        }
                        return row;
                    });
                });
            });
        });

        // 컴포넌트 언마운트 시 구독 해제
        return () => {
            chargerNos.forEach((chargerNo) => {
                const topic = `/topic/chargers/status/${stationIdStr}/${chargerNo}`;
                unsubscribe(topic);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected]);


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
                            <div className="bg-white/5 rounded-xl p-3">전력<div className="text-lg font-bold">{r.powerW} W</div></div>
                            <div className="bg-white/5 rounded-xl p-3">전압<div className="text-lg font-bold">{r.volt} V</div></div>
                            <div className="bg-white/5 rounded-xl p-3">전류<div className="text-lg font-bold">{r.amp} A</div></div>
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
