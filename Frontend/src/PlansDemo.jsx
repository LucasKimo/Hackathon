// src/MakePlan.jsx
import { useState } from "react";
import { makePlan } from "./api.plan";

export default function MakePlan() {
  const [goal, setGoal] = useState("");
  const [hours, setHours] = useState(6);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e){
    e.preventDefault();
    setLoading(true);
    const p = await makePlan(goal);
    setPlan(p);
    setLoading(false);
  }

    return (
    <div style={{ maxWidth: 900, margin: "2rem auto" }}>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
        <input
          placeholder="Describe your goal…"
          value={goal}
          onChange={e => setGoal(e.target.value)}
        />
        <button disabled={loading}>
          {loading ? "Generating…" : "Generate Levels"}
        </button>
      </form>

      {plan && (
        <>
          <h2 style={{ marginTop: 24 }}>{plan.goal_title}</h2>
          <p style={{ color: "#666" }}>{plan.goal_input}</p>

          <ol style={{ marginTop: 16 }}>
            {plan.levels.map((lvl, i) => (
              <li key={i} style={{ marginBottom: 16 }}>
                <b>{lvl.label}: {lvl.name}</b>
                {lvl.description && <div style={{ margin: "4px 0" }}>{lvl.description}</div>}
                {Array.isArray(lvl.example_tasks) && lvl.example_tasks.length > 0 && (
                  <ul style={{ marginTop: 6 }}>
                    {lvl.example_tasks.map((t, k) => <li key={k}>{t}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

