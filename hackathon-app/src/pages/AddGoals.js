import { useNavigate } from 'react-router-dom';

const AddGoals = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/add_goals/timeline'); 
  };

  return (
    <div className="home">
      <h2>What's Your Visionary Goal?</h2>
      <button onClick={handleClick}>
        Continue to Timeline
      </button>
    </div>
  );
};

export default AddGoals;
