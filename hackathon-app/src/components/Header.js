import icon from './icon.png';

export default function Header() {
  return (
    <header className="app-header">
      <div className="brand">
        <img src={icon} alt="FutureScope" className="logo" />
        <span>FutureScope</span>
      </div>
    </header>
  );
}
