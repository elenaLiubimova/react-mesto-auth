import { useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";

const Header = ({ currentPath }) => {
  const navigate = useNavigate();
  let onClickCallback;

  function signOut(){
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
  }

  function signIn(){
    navigate('/sign-in', { replace: true });
  }

  function register(){
    navigate('/sign-up', { replace: true });
  }

  function navigateToPaths() {
    if (currentPath === "/") {
      onClickCallback = signOut;
      return "Выйти";
    } else if (currentPath === "/sign-up") {
      onClickCallback = signIn;
      return "Войти";
    } else if (currentPath === "/sign-in") {
      onClickCallback = register;
      return "Регистрация";
    }
  }

  const headerNavigation = navigateToPaths();

  return (
    <header className="header header-container">
      <img className="logo" src={logo} alt="Лого сервиса Mesto" />
      <p onClick={onClickCallback}>{headerNavigation}</p>
    </header>
  );
}

export default Header;
