import successImg from "../../../../../../images/success.svg";
import errorImg from "../../../../../../images/error.svg";
import { useEffect, useState } from "react";

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const CONFLICT_ERROR = 409;

export default function InfoTooltip({ error, signIn = false, signUpSuccess }) {
  const [message, setMessage] = useState("");
  const [imageSrc, setImageSrc] = useState();

  useEffect(() => {
    if (signUpSuccess) {
      setMessage("Parabéns! Agora é só fazer o login.");
    } else if (error?.status === BAD_REQUEST) {
      setMessage("O endereço de e-mail informado é inválido!");
    } else if (error?.status === CONFLICT_ERROR) {
      setMessage("O endereço de e-mail já está cadastrado!");
    } else if (error?.status === UNAUTHORIZED && signIn) {
      setMessage("E-mail ou senha inválida! Verifique e tente novamente.");
    } else if (error?.status === UNAUTHORIZED && !signIn) {
      setMessage(
        "Sua sessão expirou! Por favor, faça login novamente para continuar."
      );
    } else {
      setMessage("Desculpe, algo deu errado! Tente novamente mais tarde.");
    }
    setImageSrc(error ? errorImg : successImg);
  }, [error, signIn, signUpSuccess]);

  return (
    <div className="info-tooltip">
      <img src={imageSrc} alt="" className="info-tooltip__image" />
      <h2 className="info-tooltip__message">{message}</h2>
    </div>
  );
}
