// IncidentDashboard.tsx
import React, { useState } from "react";
import { Incident, Severity } from "./types";
import { mockIncidents } from "./mockIncidents";
import IncidentList from "./IncidentList";
import IncidentForm from "./IncidentForm";

const IncidentDashboard: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [filter, setFilter] = useState<Severity | "All">("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const handleAddIncident = (incident: Omit<Incident, "id" | "reported_at">) => {
    const newIncident: Incident = {
      id: Math.max(...incidents.map(i => i.id)) + 1,
      reported_at: new Date().toISOString(),
      ...incident
    };
    setIncidents([newIncident, ...incidents]);
  };

  const filtered = incidents.filter(
    i => filter === "All" || i.severity === filter
  );

  const sorted = filtered.sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime();
    } else {
      return new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime();
    }
  });

  return (
    <div className="dashboard-container">
      <h1>AI Safety Incident Dashboard</h1>
      <div className="controls">
        <label>
          Severity:
          <select value={filter} onChange={e => setFilter(e.target.value as Severity | "All")}>
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <label>
          Sort by Date:
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value as "newest" | "oldest")}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </label>
      </div>
      <IncidentList incidents={sorted} />
      <IncidentForm onSubmit={handleAddIncident} />
    </div>
  );
};

export default IncidentDashboard;
