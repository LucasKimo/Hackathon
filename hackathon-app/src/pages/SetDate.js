import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Steps from '../components/Steps';

export default function SetDate() {
  const navigate = useNavigate();
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  // # simple validation: require both and start <= end
  const isValid = start && end && new Date(start) <= new Date(end);

  return (
    <div className="gs-page">

      <main className="gs-container">
        {/* # Step progress */}
        <Steps active={2} />

        {/* # Title + subtitle */}
        <header className="gs-hero">
          <h1>
            When Do You Want to <span style={{color:'var(--brand)'}}>Start &amp; Finish</span>?
          </h1>
          <p className="gs-sub">Select your goal start and end dates to help us create your personalized timeline?</p>
          <p className="gs-sub" style={{marginTop:4}}>Choose realistic dates to help us plan your timeline effectively.</p>
        </header>

        {/* # Card with two inputs */}
        <section className="gs-card" style={{maxWidth:940}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
            <div>
              <label style={{display:'block', fontSize:13, fontWeight:700, marginBottom:8}}>Start Date</label>
              <input
                type="date"
                value={start}
                onChange={(e)=>setStart(e.target.value)}
                aria-label="Start date"
                style={{
                  width:'100%', padding:'14px 12px', border:'1px solid var(--border)', borderRadius:12,
                  background:'#fff', fontSize:14
                }}
              />
            </div>
            <div>
              <label style={{display:'block', fontSize:13, fontWeight:700, marginBottom:8}}>End Date</label>
              <input
                type="date"
                value={end}
                min={start || undefined}
                onChange={(e)=>setEnd(e.target.value)}
                aria-label="End date"
                style={{
                  width:'100%', padding:'14px 12px', border:'1px solid var(--border)', borderRadius:12,
                  background:'#fff', fontSize:14
                }}
              />
            </div>
          </div>
        </section>

        {/* # Actions */}
        <div className="gs-actions" style={{marginTop:24}}>
          <button className="btn-outline" type="button" onClick={()=>console.log('draft saved', {start, end})}>
            Save Draft
          </button>
          <button
            className="btn-primary"
            type="button"
            disabled={!isValid}
            onClick={()=> navigate('/add_goals/previous_knowledge', { state: { start, end } })}
            style={!isValid ? {opacity:.6, cursor:'not-allowed'} : undefined}
          >
            Continue to Knowledge
          </button>
        </div>

        {/* # Validation hint */}
        {!isValid && (start || end) && (
          <p className="gs-sub" style={{textAlign:'center', marginTop:8, color:'#b91c1c'}}>
            Please pick both dates and ensure the end date is after the start date.
          </p>
        )}
      </main>
    </div>
  );
}
