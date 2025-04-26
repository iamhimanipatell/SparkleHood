// IncidentList.tsx
import React, { useState } from "react";
import { Incident } from "./types";

interface IncidentListProps {
  incidents: Incident[];
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents }) => {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setExpanded(prev => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  if (incidents.length === 0) return <p>No incidents to display.</p>;

  return (
    <ul className="incident-list">
      {incidents.map(incident => (
        <li key={incident.id} className="incident-item">
          <div className="incident-summary">
            <span className={`severity severity-${incident.severity.toLowerCase()}`}>{incident.severity}</span>
            <span className="title">{incident.title}</span>
            <span className="date">{new Date(incident.reported_at).toLocaleString()}</span>
            <button
              className="details-btn"
              onClick={() => toggle(incident.id)}
            >
              {expanded.has(incident.id) ? "Hide Details" : "View Details"}
            </button>
          </div>
          {expanded.has(incident.id) && (
            <div className="incident-details">
              <p>{incident.description}</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default IncidentList;
