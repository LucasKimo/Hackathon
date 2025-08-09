import { useEffect, useState } from "react";
import { createGoal,listMyGoals, updateGoal, deleteGoal } from "./goals";

export default function GoalsDemo(){
    const [form, setForm] = useState({title: "", description: "",hours_pw: 0});
    const [goals, setGoals] = useState([]);

    async function refresh(){
        const res = await listMyGoals();
        setGoals(res.documents);
    }

    useEffect(() => {refresh();},[] );

    return (
        <div style={{ maxWidth: 720, margin: "2rem auto", fontFamily: "system-ui" }}>
        <h2>My Goals</h2>

        <form onSubmit={async e => {
            e.preventDefault();
            await createGoal(form);
            setForm({ title: "", description: "", deadline: "", hours_pw: 6 });
            await refresh();
        }} style={{ display: "grid", gap: 8 }}>
            <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})}/>
            <input type="number" min="1" value={form.hours_pw} onChange={e=>setForm({...form, hours_pw: Number(e.target.value)})}/>
            <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description: e.target.value})}/>
            <button>Add goal</button>
        </form>

        <ul style={{ marginTop: 16 }}>
            {goals.map(g => (
            <li key={g.$id} style={{ marginBottom: 10 }}>
                <b>{g.title}</b> — due {g.deadline} — {g.status}
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <button onClick={async ()=>{
                    await updateGoal(g.$id, { status: g.status === "active" ? "done" : "active" });
                    await refresh();
                }}>
                    Toggle Done
                </button>
                <button onClick={async ()=>{ await deleteGoal(g.$id); await refresh(); }}>
                    Delete
                </button>
                </div>
            </li>
            ))}
        </ul>
        </div>
  );

}