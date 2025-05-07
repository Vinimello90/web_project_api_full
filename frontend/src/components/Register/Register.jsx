import { useState } from "react";
import { useNavigate } from "react-router";
import Popup from "../Main/components/Popup/Popup";

export default function Register(props) {
  const { onClosePopup, onSignUp, popup, isProcessing } = props;

  const navigate = useNavigate();

  const [data, setData] = useState({ password: "", email: "" });

  function handleSignUpClick() {
    navigate("/signin", { replace: true });
  }

  function handleOnChange(evt) {
    const { name, value } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmitClick(evt) {
    evt.preventDefault();
    onSignUp(data);
  }

  return (
    <main className="main">
      <section className="register">
        <h1 className="register__title">Inscreva-se</h1>
        <form
          onSubmit={handleSubmitClick}
          action="get"
          className="register__form"
        >
          <fieldset className="register__fieldset">
            <label className="register__form-field">
              <input
                onChange={handleOnChange}
                type="email"
                name="email"
                id="email"
                className="input input_auth"
                placeholder="E-mail"
                spellCheck={false}
                autoComplete="new-email"
                required
              />
            </label>
            <label className="register__form-field">
              <input
                onChange={handleOnChange}
                type="password"
                name="password"
                id="password"
                className="input input_auth"
                placeholder="Senha"
                minLength={8}
                spellCheck={false}
                autoComplete="new-password"
                required
              />
            </label>
            <button
              type="submit"
              className="button button_auth-submit"
              disabled={isProcessing}
            >
              {!isProcessing ? "Inscrever-se" : "Criando conta..."}
            </button>
          </fieldset>
        </form>
        <p className="register__signin-text">
          Já é um membro?
          <button
            type="button"
            onClick={handleSignUpClick}
            to="/signup"
            className="button button_goto"
          >
            Faça o login!
          </button>
        </p>
      </section>
      {popup && <Popup onClose={onClosePopup}>{popup.children}</Popup>}
    </main>
  );
}
