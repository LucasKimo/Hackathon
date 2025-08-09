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

const Knowledge = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/add_goals/dedicated_time'); 
  };

  return (
    <div className="home">
      <h2>What's Your Previous Knowledge?</h2>
      <button onClick={handleClick}>
        Continue to Commitment
      </button>
    </div>
  );
};

export default Knowledge;
