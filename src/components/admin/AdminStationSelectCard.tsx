import React from "react";
import { Button } from "../ui/button";
import { useStationStore } from "../../store/stationStore";

interface AdminStationSelectCardProps {
    onBack?: () => void;
    onSelect?: (stationId: number) => void;
    selectedId?: number | null;
}

const AdminStationSelectCard: React.FC<AdminStationSelectCardProps> = ({
    onBack,
    onSelect,
    selectedId,
}) => {
    const stations = useStationStore((s) => s.stations);

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-8 text-white">충전소 선택 (관리자)</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {stations.map((st) => (
                    <div
                        key={st.id}
                        role="button"
                        tabIndex={0}
                        className={[
                            "rounded-2xl p-4 bg-white/5 border transition-all cursor-pointer select-none",
                            selectedId === st.id
                                ? "border-[var(--cyan)] ring-2 ring-[var(--cyan)] bg-black/60"
                                : "border-white/10 hover:border-[var(--cyan)] hover:bg-black/40",
                        ].join(" ")}
                        onClick={() => onSelect?.(st.id)}
                    >
                        <div className="flex items-center mb-2">
                            <div className="font-semibold text-white">{st.name}</div>
                        </div>
                        <div className="text-sm text-white/70 mb-1">{st.address}</div>
                        {typeof st.distanceKm === "number" && (
                            <div className="text-xs text-[var(--cyan)]">
                                {st.distanceKm.toFixed(1)} km 거리
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {onBack && (
                <div className="flex justify-end mt-2">
                    <Button variant="secondary" size="lg" onClick={onBack}>
                        뒤로가기
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AdminStationSelectCard;
