// export default function GoalSummary() {
//   return (
//     <>
//       {/* <Header /> */}
//       <h2>Goal Summary Page</h2>
//     </>
//   )
// }

import { useNavigate } from 'react-router-dom';

const GoalSummary = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/main_dashboard'); 
  };

  return (
    <div className="home">
      <h2>Almost There! Here’s Your
Goal Summary & Roadmap</h2>
      <button onClick={handleClick}>
        View My Dashboard
      </button>
    </div>
  );
};

export default GoalSummary;
