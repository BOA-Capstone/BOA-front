import React, { useState } from "react";
import AdminStationSelectCard from "./AdminStationSelectCard";
import AdminChargerGrid from "./AdminChargerGrid";

const AdminMonitorPanel: React.FC = () => {
    const [selectedStationId, setSelectedStationId] = useState<number | null>(null);

    if (selectedStationId == null) {
        return (
            <AdminStationSelectCard
                selectedId={selectedStationId}
                onSelect={(id) => setSelectedStationId(id)}
            />
        );
    }

    return (
        <AdminChargerGrid
            stationId={selectedStationId}
            onBack={() => setSelectedStationId(null)}
        />
    );
};

export default AdminMonitorPanel;
