import React from "react"
import { Phone, MessageCircle } from "lucide-react"
import { COMPANY, trackContact, getWhatsAppUrl } from "../data/company"

export const MobileFloatingBar: React.FC = () => {
  return (
    <nav
      aria-label="Contato Rápido de Emergência"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 shadow-[0_-4px_25px_rgba(0,0,0,0.4)] border-t border-black/10"
    >
      {/* Call Button (Gold) */}
      <a
        href={COMPANY.phoneHref}
        onClick={() => trackContact("telefone", "barra_fixa")}
        data-rdg="telefone"
        data-pos="barra_fixa"
        className="flex items-center justify-center gap-2 bg-[#F0B429] hover:bg-[#D99F1E] text-[#111118] font-black py-4 px-2 text-sm sm:text-base transition-colors active:scale-98 whitespace-nowrap"
      >
        <Phone className="w-5 h-5 fill-current flex-shrink-0" />
        <span className="whitespace-nowrap">Ligar Agora</span>
      </a>

      {/* WhatsApp Button (Green) */}
      <a
        href={getWhatsAppUrl("Olá! Preciso de guincho em São Bernardo do Campo com urgência. Vi pelo site.")}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackContact("whatsapp", "barra_fixa")}
        data-rdg="whatsapp"
        data-pos="barra_fixa"
        className="flex items-center justify-center gap-2 bg-[#1FAF55] hover:bg-[#188F45] text-white font-black py-4 px-2 text-sm sm:text-base transition-colors active:scale-98 whitespace-nowrap"
      >
        <MessageCircle className="w-5 h-5 fill-white flex-shrink-0" />
        <span className="whitespace-nowrap">WhatsApp</span>
      </a>
    </nav>
  )
}
