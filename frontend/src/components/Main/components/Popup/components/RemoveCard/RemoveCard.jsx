export default function RemoveCard(props) {
  const {
    onCardDelete,
    cardId,
    onButtonLoading,
    buttonDisabled,
    isSubmitting,
  } = props;

  // Alterna o estado do botão de submit para indicar o processo de remoção,
  // bloqueando e alterando o texto de acordo com o estado verdadeiro e falso.
  function handleDeleteClick() {
    // Manipula os estados do botão para indicar que o processo de salvamento esta em andamento.
    onButtonLoading();
    onCardDelete(cardId);
    onButtonLoading();
  }

  return (
    <>
      <button
        onClick={handleDeleteClick}
        type="button"
        className={
          // Alterna a classe para manter o estilo do botão de submit durante o processo de salvamento com base nos estados do botão.
          `button button_popup-submit${
            buttonDisabled ? " button_popup-submit_disabled" : ""
          }`
        }
        disabled={buttonDisabled} // Desativa/Habilida o botão de submit com base no estado do botão.
      >
        {
          !isSubmitting ? "Sim" : "Excluindo..." // Alterna o o texto do botão com base no estado do botão durante o processo de salvamento.
        }
      </button>
    </>
  );
}
