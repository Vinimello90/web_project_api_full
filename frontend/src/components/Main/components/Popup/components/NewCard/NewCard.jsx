import { useState } from "react";

export default function NewCard(props) {
  const {
    formValidator,
    errorMsg,
    buttonDisabled,
    isSubmitting,
    onButtonLoading,
    onAddPlaceSubmit,
  } = props;
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  function handleTitleChange(evt) {
    const inputElement = evt.target;
    setTitle(evt.target.value);
    // Ativa a validação do input passado como parâmetro, e do formulário.
    formValidator.enableValidation(inputElement);
  }

  function handleUrlChange(evt) {
    const inputElement = evt.target;
    setUrl(evt.target.value);
    formValidator.enableValidation(inputElement);
  }

  // Alterna o estado do botão de submit para indicar o processo de salvamento,
  // bloqueando e alterando o texto de acordo com o estado verdadeiro e falso.

  function handleSubmit(evt) {
    evt.preventDefault();
    // Chama a função que altera o estado para alterar o botão de submit, desativando e indicando processo de solicitação da API
    onButtonLoading();
    onAddPlaceSubmit({ name: title, link: url }); // Envia os da para atualizar API e o estado dos cards
    onButtonLoading(); // habilita e volta o texto padrão do botão
  }

  return (
    <form onSubmit={handleSubmit} className="popup__form" name="add" noValidate>
      <fieldset className="popup__fieldset">
        <label className="popup__form-field">
          <input
            onChange={handleTitleChange}
            type="text"
            className={`input input_popup-title ${
              errorMsg.title ? "input__popup_type_error" : "" // Alterna a classe para sublinhar o input com erro com base no estado do nome do input.
            }`}
            placeholder="Título"
            name="title"
            id="title"
            minLength="2"
            maxLength="30"
            value={title}
            required
          />
          <span
            className={
              // Alterna a classe para exibir a mensagem de erro com base no estado do nome do input.
              `popup__error${errorMsg.title ? " popup__error_visible" : ""}`
            }
          >
            {errorMsg.title}
          </span>
        </label>
        <label className="popup__form-field">
          <input
            onChange={handleUrlChange}
            type="url"
            className={`input input_popup-link ${
              errorMsg.link ? "input__popup_type_error" : "" // Alterna a classe para sublinhar o input com erro com base no estado do nome do input.
            }`}
            placeholder="Link de imagem"
            name="link"
            id="link"
            value={url}
            required
          />
          <span
            className={
              // Alterna a classe para exibir a mensagem de erro com base no estado do nome do input.
              `popup__error${errorMsg.link ? " popup__error_visible" : ""}`
            }
          >
            {errorMsg.link}
          </span>
        </label>
        <button
          type="submit"
          className={
            // Alterna a classe para manter o estilo do botão de submit durante o processo de salvamento com base nos estados do botão.
            `button button_popup-submit${
              buttonDisabled && isSubmitting
                ? " button_popup-submit_disabled"
                : ""
            }`
          }
          disabled={buttonDisabled} // Desativa/Habilida o botão de submit com base no estado do botão.
        >
          {
            !isSubmitting ? "Criar" : "Salvando..." // Alterna o o texto do botão com base no estado do botão durante o processo de salvamento.
          }
        </button>
      </fieldset>
    </form>
  );
}
