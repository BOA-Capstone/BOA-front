import React, { useMemo, useState } from "react";

type Period = "yesterday" | "today" | "week" | "month";
type Scenario = "rapid" | "optimal";

const CostCompare: React.FC = () => {
    const [period, setPeriod] = useState<Period>("today");
    const [scenario, setScenario] = useState<Scenario>("optimal");

    // 더미 계산: TOU vs 우리 최적화(절감 약 20~30%)
    const result = useMemo(() => {
        const base = period === "today" ? 12000 : period === "yesterday" ? 11500 : period === "week" ? 84000 : 360000;
        const tou = base;
        const optimal = Math.round(base * 0.78);
        const rapid = Math.round(base * 1.05);
        const chosen = scenario === "optimal" ? optimal : rapid;
        const peakTou = 62;
        const peakChosen = scenario === "optimal" ? 41 : 70;
        const co2Tou = 100; // 더미 index
        const co2Chosen = scenario === "optimal" ? 85 : 110;
        return {
            tou,
            chosen,
            saving: tou - chosen,
            peak: { tou: peakTou, chosen: peakChosen },
            co2: { tou: co2Tou, chosen: co2Chosen }
        };
    }, [period, scenario]);

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">요금 / 최적화 비교</h2>

            <div className="flex flex-wrap gap-2 mb-3">
                {(["yesterday", "today", "week", "month"] as Period[]).map(p => (
                    <button key={p}
                        onClick={() => setPeriod(p)}
                        className={`px-3 py-2 rounded-xl ${period === p ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'}`}>
                        {p === "yesterday" ? "어제" : p === "today" ? "오늘" : p === "week" ? "이번주" : "이번달"}
                    </button>
                ))}
                <div className="w-px h-6 bg-white/10 mx-1" />
                <button onClick={() => setScenario("rapid")}
                    className={`px-3 py-2 rounded-xl ${scenario === 'rapid' ? 'bg-fuchsia-600/70' : 'bg-white/10 hover:bg-white/20'}`}>
                    급속
                </button>
                <button onClick={() => setScenario("optimal")}
                    className={`px-3 py-2 rounded-xl ${scenario === 'optimal' ? 'bg-purple-600/70' : 'bg-white/10 hover:bg-white/20'}`}>
                    최적
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                    <div className="text-sm text-white/70 mb-1">TOU 기준 비용</div>
                    <div className="text-2xl font-bold">{result.tou.toLocaleString()} 원</div>
                </div>
                <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                    <div className="text-sm text-white/70 mb-1">{scenario === 'optimal' ? '최적화' : '급속'} 비용</div>
                    <div className="text-2xl font-bold">{result.chosen.toLocaleString()} 원</div>
                </div>
                <div className="rounded-2xl p-4 bg-gradient-to-br from-purple-600/40 to-fuchsia-600/40 border border-purple-300/20">
                    <div className="text-sm text-white/80 mb-1">절감액</div>
                    <div className="text-2xl font-extrabold">{result.saving.toLocaleString()} 원</div>
                </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                    <div className="text-sm text-white/70 mb-2">피크 kW</div>
                    <div>TOU: <b>{result.peak.tou} kW</b> → {scenario === 'optimal' ? '최적' : '급속'}: <b className="text-green-300">{result.peak.chosen} kW</b></div>
                </div>
                <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                    <div className="text-sm text-white/70 mb-2">CO₂ 지표</div>
                    <div>TOU: <b>{result.co2.tou}</b> → {scenario === 'optimal' ? '최적' : '급속'}: <b className={`${result.co2.chosen < result.co2.tou ? 'text-green-300' : 'text-rose-300'}`}>{result.co2.chosen}</b></div>
                </div>
            </div>
        </section>
    );
};

export default CostCompare;
