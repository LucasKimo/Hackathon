import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/add_goals'); 
  };

  return (
    <div className="home">
      <h2>Home Page</h2>
      <button onClick={handleClick}>
        Start My Journey
      </button>
    </div>
  );
};

export default Home;
