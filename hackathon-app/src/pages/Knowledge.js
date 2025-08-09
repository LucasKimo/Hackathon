// export default function Knowledge() {
//   return (
//     <>
//       <h2>Previous Knowlege Page</h2>
//     </>
//   )
// }

// export default function SetDate() {
//   return (
//     <>
//       {/* <Header /> */}
//       <h2>Set Date Page</h2>
//     </>
//   )
// }

import { useNavigate } from 'react-router-dom';
import Steps from '../components/Steps';

export default function Knowledge(){
  const navigate = useNavigate();

  // # Milestone sections for the knowledge review
  const sections = [
    {
      level: 6,
      title: 'Platform MVP Completion',
      items: [
        'Final QA pass & bug triage',
        'Creator tool polish (usability fixes)',
        'Demo scenario packaging & docs',
      ],
    },
    {
      level: 5,
      title: 'Core Engine & Model Integration',
      items: [
        'Narrative state machine & scene graph runtime',
        'LLM orchestration (prompt templates, safeguards)',
        'Real-time inference pipeline (streaming · fallbacks)',
      ],
    },
    {
      level: 4,
      title: 'Adaptive Narrative Design',
      items: [
        'Branch logic schema (beats, goals, fail states)',
        'Tone/voice control · style guides · few-shot examples',
        'Memory system (character/plot continuity)',
      ],
    },
    {
      level: 3,
      title: 'Prototyping & User Testing',
      items: [
        'Playtest loop (5 users): task flows & retention notes',
        'Safety & bias review on model outputs',
        'Telemetry events (choices, dead-ends, session time)',
      ],
    },
    {
      level: 2,
      title: 'Story Toolkit & Creator UI',
      items: [
        'Scene editor (nodes, edges, variables)',
        'Prompt block library (intents, constraints, style)',
        'Versioning & preview (A/B branches)',
      ],
    },
    {
      level: 1,
      title: 'Research & Technical Planning',
      items: [
        'Model selection (hosted vs local, latency & cost)',
        'Content policy & safety guardrails plan',
        'Scope, milestones, and success metrics',
      ],
    },
  ];

  return (
    <div className="gs-page">
      <main className="gs-container">
        {/* # Steps (Knowledge active) */}
        <Steps active={2} />

        {/* # Page title + subtitle */}
        <header className="gs-hero">
          <h1>
            What’s Your <span style={{color:'var(--brand)'}}>Previous Knowledge</span>?
          </h1>
          <p className="gs-sub">Tell us about your current skills and experience related to your goal.</p>
          <p className="gs-sub" style={{marginTop:4}}>Review and customize your milestones.</p>
        </header>

        {/* # Goal summary header bar */}
        <section className="gs-card" style={{maxWidth:940}}>
          {/* Top line: goal + tiny progress */}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,marginBottom:10}}>
            <div>
              <div style={{fontSize:12, color:'#6B7280', fontWeight:700, marginBottom:6}}>Your Goal</div>
              <div style={{fontWeight:700}}>Create AI-Powered Interactive Storytelling Platform</div>
              <div style={{fontSize:12, color:'#6B7280'}}>March 15, 2024 — September 15, 2024 (6 months)</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontWeight:800}}>0%</div>
              <div style={{fontSize:12, color:'#6B7280'}}>Complete</div>
            </div>
          </div>

          {/* # Milestone sections list */}
          <div style={{display:'grid', gap:12}}>
            {sections.map((sec)=> (
              <div key={sec.level} style={{border:'1px solid var(--border)', borderRadius:12, padding:12}}>
                <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:8}}>
                  <div style={{
                    width:28, height:28, borderRadius:999, background:'#EEF2FF',
                    color:'var(--brand)', display:'grid', placeItems:'center', fontWeight:700
                  }}>{sec.level}</div>
                  <div style={{fontWeight:700}}>{sec.title}</div>
                </div>
                <ul style={{listStyle:'none', margin:0, padding:0, display:'grid', gap:6}}>
                  {sec.items.map((it, i)=> (
                    <li key={i} style={{display:'flex', alignItems:'center', gap:8, fontSize:13}}>
                      <input type="checkbox" aria-label={`mark ${it}`} />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* # Footer actions */}
        <div className="gs-actions" style={{marginTop:24}}>
          <button className="btn-outline" type="button">Save Draft</button>
          <button className="btn-primary" type="button" onClick={()=> navigate('/add_goals/dedicated_time')}>
            Continue to Commitment
          </button>
        </div>
      </main>
    </div>
  );
}
