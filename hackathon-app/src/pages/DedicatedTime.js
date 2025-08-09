
import { useNavigate } from 'react-router-dom';

const DedicatedTime = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/add_goals/goal_summary'); 
  };

  return (
    <div className="home">
      <h2>How Much Time Can You Dedicate?</h2>
      <button onClick={handleClick}>
        Continue to Goal Summary
      </button>
    </div>
  );
};

export default DedicatedTime;
