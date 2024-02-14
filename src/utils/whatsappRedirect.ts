export const whatsappRedirect = (phoneNumber: string, message?: string, link?: string) => {
  let whatsappLink = `https://api.whatsapp.com/send?phone=55${phoneNumber}`;

  if (message || link) {
    let encodedMessage = '';

    if (message) {
      encodedMessage += encodeURIComponent(message);
    }

    if (link) {
      if (encodedMessage) {
        encodedMessage += '%0A'; // Adiciona uma nova linha antes do link
      }
      encodedMessage += encodeURIComponent(link);
    }

    whatsappLink += `&text=${encodedMessage}`;
  }

  window.open(whatsappLink, '_blank');
};
