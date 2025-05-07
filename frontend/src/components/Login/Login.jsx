import { useState } from "react";
import { useNavigate } from "react-router";
import Popup from "../Main/components/Popup/Popup";

export default function Login(props) {
  const { formRef, onClosePopup, onSignIn, popup, isProcessing } = props;

  const navigate = useNavigate();

  const [data, setData] = useState({ password: "", email: "" });

  function handleSignUpClick() {
    navigate("/signup", { replace: true });
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
    onSignIn(data);
  }

  return (
    <main className="main">
      <section className="login">
        <h1 className="login__title">Entrar</h1>
        <form
          onSubmit={handleSubmitClick}
          ref={formRef}
          action="get"
          className="login__form"
        >
          <fieldset className="login__fieldset">
            <label className="login__form-field">
              <input
                onChange={handleOnChange}
                type="email"
                name="email"
                id="email"
                className="input input_auth"
                placeholder="E-mail"
                spellCheck={false}
                value={data.email}
                required
              />
            </label>
            <label className="login__form-field">
              <input
                onChange={handleOnChange}
                type="password"
                name="password"
                id="password"
                className="input input_auth"
                placeholder="Senha"
                spellCheck={false}
                value={data.password}
                required
              />
            </label>
            <button
              type="submit"
              className="button button_auth-submit"
              disabled={isProcessing}
            >
              {!isProcessing ? "Entrar" : "Entrando..."}
            </button>
          </fieldset>
        </form>
        <p className="login__signup-text">
          Ainda não é membro?
          <button
            type="button"
            onClick={handleSignUpClick}
            to="/signup"
            className="button button_goto"
          >
            Inscreva-se aqui!
          </button>
        </p>
      </section>
      {popup && <Popup onClose={onClosePopup}>{popup.children}</Popup>}
    </main>
  );
}
