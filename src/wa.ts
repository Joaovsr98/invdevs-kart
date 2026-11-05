// WhatsApp da INV Devs (este site é um projeto demonstrativo).
export const WHATSAPP_PHONE = "5511925272694";

/** Monta um link wa.me com a mensagem já preenchida e codificada. */
export function wa(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
