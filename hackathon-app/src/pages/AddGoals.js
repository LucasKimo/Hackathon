// import { useNavigate } from 'react-router-dom';

// const AddGoals = () => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/add_goals/timeline'); 
//   };

//   return (
//     <div className="home">
//       <h2>What's Your Visionary Goal?</h2>
//       <button onClick={handleClick}>
//         Continue to Timeline
//       </button>
//     </div>
//   );
// };

// export default AddGoals;

import { useNavigate } from 'react-router-dom';

const AddGoals = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/add_goals/timeline'); 
  };

  return (
    <div className="add-goals-page">
      <h2 className="page-title">What's Your Visionary Goal?</h2>
      <p className="page-subtitle">
        Tell us your visionary goal — where do you want your story or career to be in the future?<br />
        Dream big! We’ll help you create a personalized roadmap to turn your vision into reality.
      </p>

      <div className="goal-input-container">
        <label>Your Main Goal</label>
        <textarea
          placeholder="Describe your main goal here..."
          rows="3"
        ></textarea>
      </div>

      <div className="button-container">
        <button className="continue-btn" onClick={handleClick}>
          Continue to Timeline
        </button>
      </div>
    </div>
  );
};

export default AddGoals;
