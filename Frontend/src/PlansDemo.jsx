// src/MakePlan.jsx
import { useState } from "react";             // React hook for component state
import { makePlan } from "./api.plan";        // calls your Appwrite function to generate a plan
import { createGoal, updateGoal } from "./goals"; // DB helpers to create/update goal docs

export default function MakePlan() {          // React component
  const [goal, setGoal] = useState("");       // controlled input value (what the user types)
  const [plan, setPlan] = useState(null);     // holds the plan returned by makePlan()
  const [goalId, setGoalId] = useState(null); // stores the created goal document ID
  const [loading, setLoading] = useState(false);      // UI state for "Generating…" button
  const [selectedIdx, setSelectedIdx] = useState(null); // which level the user picked
  const [savingLevel, setSavingLevel] = useState(false); // UI state while saving a picked level

  async function onSubmit(e){                 // form submit handler
    e.preventDefault();                       // stop the browser from reloading the page
    setLoading(true);                         // show "Generating…"
    setSelectedIdx(null);                     // reset any previously chosen level
    setGoalId(null);                          // reset the previously created goal ID

    // 1) Generate plan from the function
    const p = await makePlan(goal);           // call backend to build the levels JSON
    setPlan(p);                               // stash result in state so UI can render it

    // 2) Create goal doc using plan.goal_title and store the original input
    const created = await createGoal({        // write a new goal document to Appwrite
      title: p.goal_title || goal,            // prefer model’s concise title; fallback to user input
      goal_input: p.goal_input || goal,       // keep the original full text too
      // plan: p                               // (optional) if your collection has an object attr
    });
    setGoalId(created.$id);                   // remember the new document’s ID for later

    setLoading(false);                        // turn off "Generating…" UI
  }

  async function onPickLevel(idx) {           // when user clicks a specific level
    if (!plan || goalId == null) return;      // guard: need both plan + created doc
    const lvl = plan.levels[idx];             // pick the chosen level’s data
    setSavingLevel(true);                     // disable the button while saving
    try {
      await updateGoal(goalId, {              // persist the choice into the goal doc
        previous_knowledge: lvl.description || "", // example field to store
        // experience_level: lvl.label || lvl.name || "", // (optional) if you added the attr
      });
      setSelectedIdx(idx);                    // mark this level as selected in the UI
    } finally {
      setSavingLevel(false);                  // re-enable the button
    }
  }

  return (                                    // render
    <div style={{ maxWidth: 900, margin: "2rem auto" }}>  {/* centered container */}
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
        <input                                       // controlled text input
          placeholder="Describe your goal…"
          value={goal}
          onChange={e => setGoal(e.target.value)}     // update state on type
        />
        <button disabled={loading}>                   {/* submit button */}
          {loading ? "Generating…" : "Generate Levels"}
        </button>
      </form>

      {plan && (                                      // render plan only after it exists
        <>
          <h2 style={{ marginTop: 24 }}>{plan.goal_title}</h2>  {/* model’s concise title */}
          <p style={{ color: "#666" }}>{plan.goal_input}</p>    {/* original input text */}

          <ol style={{ marginTop: 16, paddingLeft: 18 }}>       {/* numbered list of levels */}
            {plan.levels.map((lvl, i) => {                      // iterate each level
              const picked = i === selectedIdx;                 // is this one selected?
              return (
                <li key={i} style={{ marginBottom: 16 }}>       {/* list item for a level */}
                  <div style={{ marginBottom: 6 }}>
                    <b>{lvl.label}: {lvl.name}</b>              {/* e.g., "Level 1: Beginner" */}
                  </div>

                  {lvl.description && (                         // optional description
                    <div style={{ margin: "4px 0" }}>{lvl.description}</div>
                  )}

                  {Array.isArray(lvl.example_tasks) && lvl.example_tasks.length > 0 && (
                    <ul style={{ marginTop: 6 }}>               {/* sample tasks list */}
                      {lvl.example_tasks.map((t, k) => <li key={k}>{t}</li>)}
                    </ul>
                  )}

                  <div style={{ marginTop: 8 }}>
                    <button
                      type="button"                              // avoid submitting the form
                      onClick={() => onPickLevel(i)}             // save this level
                      disabled={savingLevel}
                      style={{
                        padding: "6px 10px",
                        borderRadius: 8,
                        border: "1px solid #333",
                        background: picked ? "#e6ffe6" : "transparent", // highlight if picked
                        cursor: savingLevel ? "not-allowed" : "pointer"
                      }}
                    >
                      {picked ? "Selected" : "Use this as my previous knowledge"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>

          {goalId && (                                          // show DB doc ID if created
            <p style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
              Goal saved as document: <code>{goalId}</code>
            </p>
          )}
        </>
      )}
    </div>
  );
}
