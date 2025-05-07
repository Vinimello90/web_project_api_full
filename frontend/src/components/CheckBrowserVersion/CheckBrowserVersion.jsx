import InfoTooltip from "../Main/components/Popup/components/InfoTooltip/InfoTooltip";

export default function CheckBrowserVersion() {
  const userAgent = navigator.userAgent;
  const browser = userAgent.match(/(chrome|firefox|version|edg)/gi)[0];
  const version = parseFloat(
    userAgent.match(new RegExp(`(?<=${browser}/)([\\d]+.\\d+)`))
  );

  const errorMessage =
    "Atualize seu navegador para a versão mais recente para garantir sua segurança e a melhor experiência.";

  if (
    (browser === "Chrome" && version < 118) ||
    (browser === "Firefox" && version < 120) ||
    (browser === "Edg" && version < 118) ||
    (browser === "Version" && version < 16.5)
  ) {
    return { children: <InfoTooltip error={{ message: errorMessage }} /> };
  }
}
