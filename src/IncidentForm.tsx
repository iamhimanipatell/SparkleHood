// IncidentForm.tsx
import React, { useState } from "react";
import { Severity } from "./types";

interface IncidentFormProps {
  onSubmit: (incident: { title: string; description: string; severity: Severity }) => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("Low");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Title and Description are required.");
      return;
    }
    setError(null);
    onSubmit({ title, description, severity });
    setTitle("");
    setDescription("");
    setSeverity("Low");
  };

  return (
    <form className="incident-form" onSubmit={handleSubmit}>
      <h2>Report New Incident</h2>
      {error && <div className="form-error">{error}</div>}
      <div>
        <label>
          Title:
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Severity:
          <select value={severity} onChange={e => setSeverity(e.target.value as Severity)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
      </div>
      <button type="submit">Submit Incident</button>
    </form>
  );
};

export default IncidentForm;
