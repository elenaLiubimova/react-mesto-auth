import { useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";

const Header = () => {
  const navigate = useNavigate();
  function signOut(){
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
  }
  return (
    <header className="header header-container">
      <img className="logo" src={logo} alt="Лого сервиса Mesto" />
      <p onClick={signOut}>Выйти</p>
    </header>
  );
}

export default Header;
