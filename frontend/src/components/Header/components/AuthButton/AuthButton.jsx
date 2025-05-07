import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export default function AuthButton({ formRef, isMenuOpen, isMobile = false }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn, onSignOut, currentUser } = useContext(CurrentUserContext);

  const [displayMenu, setDisplayMenu] = useState(false);

  useEffect(() => {
    if (isMenuOpen && isMobile) {
      setDisplayMenu(true);
      return;
    }
    if (!isMenuOpen && isMobile) {
      setDisplayMenu(false);
    }
  }, [isMenuOpen, isMobile]);

  function handleSignOutClick() {
    onSignOut();
  }

  function handleFormFocusClick() {
    formRef.current.requestSubmit();
  }

  if (isLoggedIn) {
    return (
      <div
        className={`header__user${isMobile ? " header__user-mobile" : ""}${
          displayMenu ? " header__user-mobile_show" : ""
        }`}
      >
        <p className="header__e-mail">{currentUser.email}</p>
        <button
          onClick={handleSignOutClick}
          type="button"
          className="button button_auth button_auth_logged-in"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <>
      {location.pathname === "/signup" ? (
        <button
          onClick={() => navigate("/signin")}
          className="button button_auth"
        >
          Faça o Login
        </button>
      ) : (
        <button onClick={handleFormFocusClick} className="button button_auth">
          Entrar
        </button>
      )}
    </>
  );
}
