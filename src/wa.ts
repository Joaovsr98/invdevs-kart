// Contato oficial da Paddock 22 (número do WhatsApp).
// Trocar aqui caso o número de inscrição mude.
export const WHATSAPP_PHONE = "5511920144069";

/** Monta um link wa.me com a mensagem já preenchida e codificada. */
export function wa(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
