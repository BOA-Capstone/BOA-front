import React, { useEffect, useMemo, useState } from "react";

type ChargerRow = {
    id: number;
    name: string;
    status: "IDLE" | "CHARGING" | "FAULT";
    powerKw: number;
    volt: number;
    amp: number;
    soc: number;
    updatedAt: string;
};

function makeRows(n: number): ChargerRow[] {
    return Array.from({ length: n }).map((_, i) => ({
        id: i + 1,
        name: `충전기 ${i + 1}`,
        status: "IDLE",
        powerKw: 0,
        volt: 0,
        amp: 0,
        soc: Math.round(Math.random() * 20),
        updatedAt: new Date().toISOString(),
    }));
}

/** 실제 연동된 충전소라고 가정 (수량 가변) */
const LiveMonitor: React.FC<{ initialCount?: number }> = ({ initialCount = 12 }) => {
    const [count, setCount] = useState(initialCount);
    const [rows, setRows] = useState<ChargerRow[]>(() => makeRows(initialCount));

    // 더미 라이브 업데이트 (나중에 MQTT 수신으로 교체)
    useEffect(() => {
        const t = setInterval(() => {
            setRows(prev =>
                prev.map(r => {
                    const charging = Math.random() > 0.4;
                    const amp = charging ? +(10 + Math.random() * 60).toFixed(1) : 0;
                    const volt = charging ? 360 + Math.round(Math.random() * 40) : 0;
                    const powerKw = +((amp * volt) / 1000).toFixed(2);
                    const soc = Math.min(100, r.soc + (charging ? Math.random() * 1.5 : 0));
                    const status: ChargerRow["status"] = charging ? "CHARGING" : (Math.random() < 0.02 ? "FAULT" : "IDLE");
                    return { ...r, amp, volt, powerKw, soc, status, updatedAt: new Date().toISOString() };
                })
            );
        }, 1500);
        return () => clearInterval(t);
    }, []);

    // 수량 변경(운영 충전기 수 바뀌는 상황 가정)
    const applyCount = () => setRows(makeRows(count));

    const online = useMemo(
        () => rows.filter(r => r.status !== "FAULT").length,
        [rows]
    );

    return (
        <section>
            <div className="mb-4 flex items-center gap-3">
                <h2 className="text-xl font-semibold">라이브 모니터</h2>
                <div className="text-sm text-white/70">온라인: {online}/{rows.length}</div>
                <div className="ml-auto flex items-center gap-2">
                    <input
                        type="number" min={1} max={64}
                        className="px-3 py-2 rounded-xl bg-white/10 w-24"
                        value={count}
                        onChange={e => setCount(+e.target.value)}
                    />
                    <button onClick={applyCount} className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20">수량 적용</button>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {rows.map(r => (
                    <div key={r.id} className="rounded-2xl p-4 bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between">
                            <div className="font-semibold">{r.name}</div>
                            <span className={`text-xs px-2 py-1 rounded-full ${r.status === "CHARGING" ? "bg-green-500/20 text-green-300"
                                    : r.status === "FAULT" ? "bg-red-500/20 text-red-300"
                                        : "bg-white/10 text-white/70"
                                }`}>{r.status}</span>
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

export default LiveMonitor;
