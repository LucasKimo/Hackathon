// import { useState, useMemo } from 'react';
// import { getRoadmap } from '../services/roadmapApi';
// import RoadmapChecklist from '../components/RoadmapChecklist';
// import { useNavigate } from 'react-router-dom';
// import Steps from '../components/Steps';

// export default function AddGoals(){
//   const navigate = useNavigate();
//   const [goal, setGoal] = useState('Develop AI-powered interactive storytelling platform');

//   const handleContinue = () => {
//     // pass goal forward to the next step
//     navigate('/add_goals/previous_knowledge', { state: { goal } });
//   };

//   return (
//     <div className="gs-page">
//       <main className="gs-container">
//         {/* Steps progress (Your Goal active) */}
//         <Steps active={1} />

//         {/* Title & subtitle */}
//         <header className="gs-hero">
//           <h1>What’s Your <span style={{color:'var(--brand)'}}>Visionary Goal</span>?</h1>
//           <p className="gs-sub">Tell us your visionary goal — where do you want your story or career to be in the future?</p>
//           <p className="gs-sub" style={{marginTop:4}}>Dream big! We’ll help you create a personalized roadmap to turn your vision into reality.</p>
//         </header>

//         {/* Goal input card */}
//         <section className="gs-card" style={{maxWidth:940}}>
//           <label style={{display:'block', fontSize:13, fontWeight:700, marginBottom:8}}>Your Main Goal</label>
//           <textarea
//             value={goal}
//             onChange={(e)=> setGoal(e.target.value)}
//             rows={3}
//             placeholder="Describe your main goal here..."
//             style={{
//               width:'100%', padding:'14px 12px', border:'1px solid var(--border)', borderRadius:12,
//               background:'#fff', fontSize:14, resize:'vertical'
//             }}
//           />
//         </section>

//         {/* Actions */}
//         <div className="gs-actions" style={{marginTop:24}}>
//           <button type="button" className="btn-outline">Save Draft</button>
//           <button type="button" className="btn-primary" onClick={handleContinue}>
//             Continue to Knowledge
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

// import { useState, useMemo } from 'react';
// import { getRoadmap } from '../services/roadmapApi';
// import RoadmapChecklist from '../components/RoadmapChecklist';
// import { useNavigate } from 'react-router-dom';
// import Steps from '../components/Steps';

// export default function AddGoals() {
//   const navigate = useNavigate();

//   // Goal 입력
//   const [goal, setGoal] = useState('Develop AI-powered interactive storytelling platform');

//   // AI Checklist 상태
//   const [loading, setLoading] = useState(false);
//   const [roadmap, setRoadmap] = useState(null);
//   const [checked, setChecked] = useState({});

//   // 로컬 스토리지 키 생성
//   function hashGoal(s) {
//     let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
//     return String(h);
//   }
//   const storageKey = useMemo(() => `roadmapChecks::${hashGoal(goal.trim())}`, [goal]);

//   const loadChecks = () => {
//     try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
//     catch { return {}; }
//   };
//   const saveChecks = (obj) => {
//     localStorage.setItem(storageKey, JSON.stringify(obj));
//   };

//   // AI Checklist 생성
//   const onGenerate = async () => {
//     if (!goal.trim()) return;
//     setLoading(true);
//     try {
//       const data = await getRoadmap(goal.trim());
//       setRoadmap(data);
//       setChecked(loadChecks());
//     } catch (e) {
//       alert(e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 체크 상태 토글
//   const onToggle = (id) => {
//     const next = { ...checked, [id]: !checked[id] };
//     setChecked(next);
//     saveChecks(next);
//   };

//   // Export / Import
//   const onExport = () => {
//     const blob = new Blob([JSON.stringify({ goal, roadmap, checked }, null, 2)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.download = `roadmap-${hashGoal(goal.trim())}.json`;
//     a.href = url;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const onImport = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const text = await file.text();
//     try {
//       const data = JSON.parse(text);
//       if (!data.roadmap || !data.checked) throw new Error('Invalid file');
//       setGoal(data.goal || '');
//       setRoadmap(data.roadmap);
//       setChecked(data.checked);
//     } catch {
//       alert('Invalid JSON file.');
//     }
//   };

  
//   const handleContinue = () => {
//     navigate('/add_goals/previous_knowledge', {
//       state: { goal, roadmap, checked }
//      });
//   };

//   return (
//     <div className="gs-page">
//       <main className="gs-container">
//         {/* Steps progress (Your Goal active) */}
//         <Steps active={1} />

//         {/* Title & subtitle */}
//         <header className="gs-hero">
//           <h1>What’s Your <span style={{color:'var(--brand)'}}>Visionary Goal</span>?</h1>
//           <p className="gs-sub">Tell us your visionary goal — where do you want your story or career to be in the future?</p>
//           <p className="gs-sub" style={{marginTop:4}}>Dream big! We’ll help you create a personalized roadmap to turn your vision into reality.</p>
//         </header>

//         {/* Goal input card */}
//         <section className="gs-card" style={{maxWidth:940}}>
//           <label style={{display:'block', fontSize:13, fontWeight:700, marginBottom:8}}>Your Main Goal</label>
//           <textarea
//             value={goal}
//             onChange={(e)=> setGoal(e.target.value)}
//             rows={3}
//             placeholder="Describe your main goal here..."
//             style={{
//               width:'100%', padding:'14px 12px', border:'1px solid var(--border)', borderRadius:12,
//               background:'#fff', fontSize:14, resize:'vertical'
//             }}
//           />
//         </section>

//         {/* AI Checklist Actions */}
//         <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
//           <button type="button" className="btn-outline" onClick={onGenerate} disabled={loading}>
//             {loading ? 'Generating…' : 'Generate Checklist'}
//           </button>
//         </div>

//         {roadmap && (
//           <RoadmapChecklist
//             roadmap={roadmap}
//             checked={checked}
//             onToggle={onToggle}
//             onExport={onExport}
//             onImport={onImport}
//           />
//         )}

//         {/* Actions */}
//         <div className="gs-actions" style={{marginTop:24}}>
//           <button type="button" className="btn-outline">Save Draft</button>
//           <button type="button" className="btn-primary" onClick={handleContinue}>
//             Continue to Knowledge
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

import { useState, useMemo } from 'react';
import { getRoadmap } from '../services/roadmapApi';
import { useNavigate } from 'react-router-dom';
import Steps from '../components/Steps';

export default function AddGoals() {
  const navigate = useNavigate();

  const [goal, setGoal] = useState('Develop AI-powered interactive storytelling platform');
  const [loading, setLoading] = useState(false);   // 생성/이동 중 버튼 비활성화용

  // goal 기반 로컬 스토리지 키 (체크 상태 저장용)
  function hashGoal(s) {
    let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return String(h);
  }
  const storageKey = useMemo(() => `roadmapChecks::${hashGoal(goal.trim())}`, [goal]);

  const loadChecks = () => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
    catch { return {}; }
  };

  // ✅ Continue 클릭 시: 자동 생성 → localStorage 저장 → Knowledge로 이동
  const handleContinue = async () => {
    const g = goal.trim();
    if (!g) {
      alert('Please enter your goal.');
      return;
    }
    setLoading(true);
    try {
      // AI로 체크리스트 생성
      const roadmap = await getRoadmap(g);
      const checked = loadChecks(); // 같은 목표로 이전 체크 내역이 있으면 복원

      // Knowledge 페이지에서 사용할 데이터 저장
      localStorage.setItem('lastRoadmap', JSON.stringify({ goal: g, roadmap, checked }));

      // 다음 페이지로 이동
      navigate('/add_goals/previous_knowledge');
    } catch (e) {
      alert(e.message || 'Failed to generate checklist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gs-page">
      <main className="gs-container">
        <Steps active={1} />

        <header className="gs-hero">
          <h1>What’s Your <span style={{color:'var(--brand)'}}>Visionary Goal</span>?</h1>
          <p className="gs-sub">Tell us your visionary goal — where do you want your story or career to be in the future?</p>
          <p className="gs-sub" style={{marginTop:4}}>Dream big! We’ll help you create a personalized roadmap to turn your vision into reality.</p>
        </header>

        <section className="gs-card" style={{maxWidth:940}}>
          <label style={{display:'block', fontSize:13, fontWeight:700, marginBottom:8}}>Your Main Goal</label>
          <textarea
            value={goal}
            onChange={(e)=> setGoal(e.target.value)}
            rows={3}
            placeholder="Describe your main goal here..."
            style={{
              width:'100%', padding:'14px 12px', border:'1px solid var(--border)', borderRadius:12,
              background:'#fff', fontSize:14, resize:'vertical'
            }}
          />
        </section>

        {/* Generate 버튼/체크리스트 렌더링은 제거됨 */}

        <div className="gs-actions" style={{marginTop:24}}>
          <button type="button" className="btn-outline" disabled={loading}>Save Draft</button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleContinue}
            disabled={loading}
            title={loading ? 'Generating checklist…' : 'Go to Knowledge'}
          >
            {loading ? 'Preparing…' : 'Continue to Knowledge'}
          </button>
        </div>
      </main>
    </div>
  );
}
