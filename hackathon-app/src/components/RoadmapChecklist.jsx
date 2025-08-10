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
