import { useContext, useEffect, useState } from "react";
import aroundLogo from "../../images/logo_around.svg";
import AuthButton from "./components/AuthButton/AuthButton";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Header({ formRef }) {
  const [isMobile, setIsMobile] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useContext(CurrentUserContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 590);
      if (isMenuOpen && window.innerWidth > 590) {
        setIsMenuOpen(false);
      }
    };
    if (isLoggedIn) {
      setIsMobile(window.innerWidth <= 590);
      window.addEventListener("resize", handleResize);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, isLoggedIn]);

  function handleBurgerMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <header className="header">
        <div className="header__container">
          <img
            src={aroundLogo}
            alt="logotipo EUA Afora"
            className="header__logo"
          />

          {isMobile && isLoggedIn && (
            <button
              onClick={handleBurgerMenuClick}
              type="button"
              className={`button button_burger-menu${
                isMenuOpen ? " button_burger-menu_opened" : ""
              }`}
            >
              <div className="button__burger-line"></div>
              <div className="button__burger-line"></div>
              <div className="button__burger-line"></div>
            </button>
          )}

          {!isLoggedIn && <AuthButton formRef={formRef} />}
          {!isMobile && isLoggedIn && <AuthButton />}
        </div>
      </header>

      {isMobile && isLoggedIn && (
        <AuthButton isMenuOpen={isMenuOpen} isMobile />
      )}
    </>
  );
}
