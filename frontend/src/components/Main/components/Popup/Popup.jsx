import { cloneElement, useEffect, useState } from "react";
import FormValidator from "../../../../utils/FormValidator";

export default function Popup(props) {
  const { title, onClose, popupType } = props;
  const [displayPopup, setDisplayPopup] = useState("");
  const [formValidator, setFormValidator] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    link: "",
  });
  const [buttonDisabled, setbuttonDisabled] = useState(false); // ativa/desativa o botão do children.
  const [isSubmitting, setIsSubmitting] = useState(false); // altera o texto do botão do children.

  useEffect(() => {
    // Instancia a classe FormValidator somente uma vez no useEfect() ao montar o componente.
    const formValidator = new FormValidator({
      classObj: {
        formSelector: ".popup__form",
        fieldsetSelector: ".popup__fieldset",
        inputSelector: ".input",
      },
      handleFormErrorState: ({ name, errorMessage }) => {
        // Atualiza o estado da mensagem de erro de forma dinamica de acordo com o nome do input.
        setErrorMsg((prev) => ({
          ...prev,
          [name]: errorMessage,
        }));
      },
      // Atualiza o estado do botão habiltando/desabilitando de acordo com a validação do formulário.
      handleFormButtonState: (isDisabled) => {
        setbuttonDisabled(isDisabled);
      },
    });
    // Armazena a instancia no estado para chamar os métodos nos manipuladores do onChange().
    setFormValidator(formValidator);
    // Ativa a validação do formulário somente uma vez no useEfect() ao montar o componente.
    formValidator.enableValidation();
  }, []);

  useEffect(() => {
    // Muda o estado para adicionar a classe e ativar animação de fade in.
    setDisplayPopup(true);
    // Manipula o ouvinte de eventos "keydown" para fechar a popop na tecla "Escape".
    function handleEsc(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    // adiciona o event listener ao montar.
    window.addEventListener("keydown", handleEsc);
    return () => {
      // remove o event listener ao desmontar.
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const children = cloneElement(props.children, {
    // Clona o componente children para os props adicionais de validação.
    formValidator,
    errorMsg,
    buttonDisabled,
    isSubmitting,
    onButtonLoading: setButtonLoading,
  });

  // Manipula o clique no elemento de background da popup para fechar ao clicar fora da popup.
  function handleClickOutside(evt) {
    if (evt.target.classList.contains("popup")) {
      onClose();
    }
  }

  // Manipula o estado para alterar o botão do children.
  function setButtonLoading() {
    setIsSubmitting(!isSubmitting);
    setbuttonDisabled(!buttonDisabled);
  }

  return (
    <div
      onClick={handleClickOutside} // manipulador para fechar ao clicar no elemento.
      className={`popup${displayPopup ? " popup_opened" : ""} `} //
    >
      <div
        className={`popup__container ${
          popupType === "image" ? "popup__container_image" : ""
        }`} // Alterna a classe ao mudar o estado para exibir a popup com fade in.
      >
        <button
          type="button"
          aria-label="Close modal"
          className="button button_close"
          onClick={onClose}
        ></button>
        {title && <h2 className="popup__title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
