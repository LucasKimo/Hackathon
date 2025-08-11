import { useMemo } from 'react';
import './roadmap-checklist.css';

function calcProgress(checked, categories) {
  const items = categories.flatMap(c => c.items);
  const total = items.length;
  const done = items.filter(it => checked[it.id]).length;
  return { total, done, pct: Math.round((done / (total || 1)) * 100) };
}

export default function RoadmapChecklist({ roadmap, checked, onToggle, onExport, onImport }) {
  const categories = roadmap?.categories ?? [];
  const { total, done, pct } = useMemo(
    () => calcProgress(checked, categories),
    [checked, categories]
  );

  // 예시처럼 큰 레벨 숫자(6,5,4...)가 필요하므로, 배열 길이 기준으로 역순 번호 부여
  const numbered = useMemo(() => {
    const n = categories.length;
    return categories.map((c, i) => ({
      ...c,
      level: n - i, // 6,5,4...
    }));
  }, [categories]);

  return (
    <div className="rc-wrap">
      {/* 상단 우측에 진행률(예: 0% Complete) — 필요 시 노출 */}
      <div className="rc-head">
        <div />
        <div className="rc-progress">
          {/* <div className="rc-progress-num">{pct}%</div>
          <div className="rc-progress-sub">Complete</div> */}
        </div>
      </div>

      <div className="rc-grid">
        {numbered.map((cat) => (
          // <section key={cat.name} className="gs-card rc-card">
          <div key={cat.name} className="rc-card">
            <div className="rc-card-head">
              <div className="rc-level">{cat.level}</div>
              <div className="rc-title">{cat.name}</div>
            </div>

            <ul className="rc-list">
              {cat.items.map((it) => (
                <li key={it.id} className="rc-item">
                  <label className="rc-check">
                    <input
                      type="checkbox"
                      checked={!!checked[it.id]}
                      onChange={() => onToggle(it.id)}
                    />
                    <span className="rc-box" aria-hidden="true" />
                    <span className="rc-label">{it.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// import React from 'react';

// export default function RoadmapChecklist({ roadmap, checked, onToggle }) {
//   return (
//     <div>
//       {(roadmap?.categories || []).map((category, idx) => (
//         <section
//           key={idx}
//           style={{
//             border: '1px solid #E5E7EB',
//             borderRadius: 12,
//             padding: 16,
//             marginBottom: 16
//           }}
//         >
//           {/* 카테고리 제목 (퍼센티지/버튼 없음) */}
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: 12
//             }}
//           >
//             <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>
//               {category.title}
//             </h3>
//           </div>

//           {/* 체크리스트 아이템 */}
//           <div>
//             {(category.items || []).map((item) => (
//               <label
//                 key={item.id}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 12,
//                   padding: '8px 4px'
//                 }}
//               >
//                 <input
//                   type="checkbox"
//                   checked={!!checked[item.id]}
//                   onChange={() => onToggle(item.id)}
//                   style={{ width: 18, height: 18 }}
//                 />
//                 <span>
//                   {item.text}
//                   {typeof item.estimatedHours === 'number' && (
//                     <span style={{ marginLeft: 8, opacity: 0.6, fontSize: 12 }}>
//                       ({item.estimatedHours}h)
//                     </span>
//                   )}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// }
