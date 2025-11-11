import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useStationStore } from "../../store/stationStore";
import type { Charger } from "../../types/charger";

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

    // 선택된 충전소가 바뀌면 초기화
    useEffect(() => {
        const next = (chargersByStation[stationId] || []).map((c: Charger, i: number) => {
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
        });
        setRows(next);
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

                        <div className="mt-2 text-xs text-white/50">갱신: {new Date(r.updatedAt).toLocaleTimeString()}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AdminChargerGrid;
