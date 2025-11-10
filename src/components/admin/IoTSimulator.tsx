// src/components/admin/IoTSimulator.tsx
import React, { useEffect, useRef, useState } from "react";

type PortState = {
    on: boolean;
    volt: number;   // V
    amp: number;    // A
    powerKw: number;// kW
    updatedAt: string;
};

const makeInit = (): PortState[] =>
    Array.from({ length: 5 }).map(() => ({
        on: false, volt: 0, amp: 0, powerKw: 0, updatedAt: new Date().toISOString()
    }));

/**
 * IoT 시뮬레이터(표시용)
 * - 5포트 고정
 * - 전압/전류/전력은 **표시만** (슬라이더/입력 제거)
 * - "시뮬레이션 시작/중지" 버튼으로 더미 데이터만 흘려보냄
 *   -> 나중에 mqtt.js 구독 데이터로 교체
 */
const IoTSimulator: React.FC = () => {
    const [brokerUp, setBrokerUp] = useState(true);
    const [running, setRunning] = useState(false);      // 로컬 모의 시뮬레이션 on/off
    const [ports, setPorts] = useState<PortState[]>(makeInit());
    const timerRef = useRef<number | null>(null);

    // ---- 로컬 모의 시뮬레이션 (표시값만 갱신) ----
    useEffect(() => {
        if (!running) {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }
            return;
        }
        timerRef.current = window.setInterval(() => {
            setPorts(prev =>
                prev.map(() => {
                    const on = Math.random() > 0.3; // 임의 on/off
                    const amp = on ? +(10 + Math.random() * 60).toFixed(1) : 0;
                    const volt = on ? 360 + Math.round(Math.random() * 40) : 0;
                    const powerKw = +((amp * volt) / 1000).toFixed(2);
                    return {
                        on,
                        amp,
                        volt,
                        powerKw,
                        updatedAt: new Date().toISOString(),
                    };
                })
            );
        }, 1200);
        return () => {
            if (timerRef.current) window.clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, [running]);

    return (
        <section>
            <div className="mb-4 flex items-center gap-3">
                <h2 className="text-xl font-semibold">IoT 시뮬레이터</h2>


                <div className="ml-auto flex gap-2">
                    <button
                        onClick={() => setRunning(true)}
                        className={`px-3 py-2 rounded-xl ${running ? "bg-white/10" : "bg-purple-600/80"}`}
                        disabled={running}
                    >
                        시뮬레이션 시작
                    </button>
                    <button
                        onClick={() => setRunning(false)}
                        className={`px-3 py-2 rounded-xl ${running ? "bg-white/10 hover:bg-white/20" : "bg-white/10"}`}
                        disabled={!running}
                    >
                        시뮬레이션 중지
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ports.map((p, i) => (
                    <div key={i} className="rounded-2xl p-4 bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between">
                            <div className="font-semibold">Port #{i + 1}</div>
                            <span
                                className={`text-xs px-2 py-1 rounded-full ${p.on ? "bg-green-500/20 text-green-300" : "bg-white/10 text-white/70"
                                    }`}
                            >
                                {p.on ? "ON" : "OFF"}
                            </span>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                            <div className="bg-white/5 rounded-xl p-3">
                                전압
                                <div className="text-lg font-bold">{p.volt} V</div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3">
                                전류
                                <div className="text-lg font-bold">{p.amp} A</div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3 col-span-2">
                                전력
                                <div className="text-lg font-bold">{p.powerKw} kW</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default IoTSimulator;
