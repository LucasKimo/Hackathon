// import icon from './icon.png';

// export default function Header() {
//   return (
//     <header className="app-header">
//       <div className="brand">
//         <img src={icon} alt="FutureScope" className="logo" />
//         <span>FutureScope</span>
//       </div>
//     </header>
//   );
// }

import { Link } from 'react-router-dom';
import icon from './icon.png';

export default function Header() {
  return (
    <header className="app-header">
      <div className="brand">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <img src={icon} alt="FutureScope" className="logo" />
          <span>FutureScope</span>
        </Link>
      </div>
    </header>
  );
}
