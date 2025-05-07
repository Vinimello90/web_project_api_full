import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile(props) {
  const {
    formValidator,
    errorMsg,
    buttonDisabled,
    isSubmitting,
    onButtonLoading,
  } = props;
  const { currentUser, onUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  function handleNameChange(evt) {
    const inputElement = evt.target;
    setName(evt.target.value);
    // Ativa a validação do input passado como parâmetro, e do formulário.
    formValidator.enableValidation(inputElement);
  }

  function handleDescriptionChange(evt) {
    const inputElement = evt.target;
    setDescription(evt.target.value);
    formValidator.enableValidation(inputElement);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // Chama a função que altera o estado para alterar o botão de submit, desativando e indicando processo de solicitação da API
    onButtonLoading();
    onUpdateUser({ name, about: description });
    onButtonLoading(); // habilita e volta o texto padrão do botão
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="popup__form"
      name="profile"
      noValidate
    >
      <fieldset className="popup__fieldset">
        <label className="popup__form-field">
          <input
            type="text"
            className={`input input_popup-name ${
              errorMsg.name ? "input__popup_type_error" : "" // Alterna a classe para sublinhar o input com erro com base no estado do nome do input.
            }`}
            placeholder="Nome"
            name="name"
            id="name"
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleNameChange}
            required
          />
          <span
            className={
              // Alterna a classe para exibir a mensagem de erro com base no estado do nome do input.
              `popup__error${errorMsg.name ? " popup__error_visible" : ""}`
            }
          >
            {errorMsg.name}
          </span>
        </label>
        <label className="popup__form-field">
          <input
            type="text"
            className={`input input_popup-job ${
              errorMsg.job ? "input__popup_type_error" : "" // Alterna a classe para sublinhar o input com erro com base no estado do nome do input.
            }`}
            placeholder="Sobre mim"
            name="job"
            id="job"
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          <span
            className={
              // Alterna a classe para exibir a mensagem de erro com base no estado do nome do input.
              `popup__error${errorMsg.job ? " popup__error_visible" : ""}`
            }
          >
            {errorMsg.job}
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
            !isSubmitting ? "Salvar" : "Salvando..." // Alterna o o texto do botão com base no estado do botão durante o processo de salvamento.
          }
        </button>
      </fieldset>
    </form>
  );
}
