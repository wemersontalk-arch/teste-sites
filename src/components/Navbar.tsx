import React from "react"
import { Phone, MessageCircle } from "lucide-react"
import { COMPANY, trackContact, getWhatsAppUrl } from "../data/company"

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-[#3A1060]/95 backdrop-blur-md border-b border-[#5A1F90] shadow-lg shadow-black/20">
      <div className="max-w-6xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none flex-shrink-0">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-white/10 p-1 border border-[#F0B429]/40 shadow-inner group-hover:scale-105 transition-transform flex-shrink-0">
            <img
              src="./logo-original.png"
              alt="Logo Rainha do Guincho"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl sm:text-3xl text-white tracking-wider leading-none">
              RAINHA DO <span className="text-[#F0B429]">GUINCHO</span>
            </span>
            <span className="text-[10px] sm:text-xs text-purple-200 uppercase tracking-widest font-semibold hidden xs:inline">
              Guincho 24h em SBC
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-purple-100">
          <a href="#servicos" className="hover:text-[#F0B429] transition-colors">Serviços</a>
          <a href="#cobertura" className="hover:text-[#F0B429] transition-colors">Bairros & Vias</a>
          <a href="#frota" className="hover:text-[#F0B429] transition-colors">Nossa Frota</a>
          <a href="#calculadora" className="hover:text-[#F0B429] transition-colors">Solicitar Guincho</a>
          <a href="#avaliacoes" className="hover:text-[#F0B429] transition-colors">Avaliações</a>
          <a href="#faq" className="hover:text-[#F0B429] transition-colors">Dúvidas</a>
        </nav>

        {/* Action Buttons: WhatsApp & Non-Breaking Phone Button */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          
          {/* WhatsApp CTA */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("whatsapp", "navbar")}
            data-rdg="whatsapp"
            data-pos="header"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#1FAF55] hover:bg-[#188F45] text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow-md transition-all hover:scale-102"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp</span>
          </a>

          {/* Call Direct Button (Fixed non-breaking layout) */}
          <a
            href={COMPANY.phoneHref}
            onClick={() => trackContact("telefone", "header")}
            data-rdg="telefone"
            data-pos="header"
            className="inline-flex items-center gap-2 bg-[#F0B429] hover:bg-[#D99F1E] text-[#111118] px-3.5 sm:px-4 py-2 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all hover:scale-102 whitespace-nowrap flex-shrink-0"
          >
            <Phone className="w-3.5 h-3.5 fill-current flex-shrink-0" />
            <span className="whitespace-nowrap">(11) 94518-9393</span>
          </a>
        </div>

      </div>
    </header>
  )
}
