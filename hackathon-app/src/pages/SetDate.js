import { useNavigate } from 'react-router-dom';

const SetDate = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/add_goals/previous_knowledge'); 
  };

  return (
    <div className="home">
      <h2>When Do You Want to Start & Finish?</h2>
      <button onClick={handleClick}>
        Continue to Knowledge
      </button>
    </div>
  );
};

export default SetDate;
