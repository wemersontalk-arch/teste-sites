import React from "react"
import { Phone, MessageCircle, Clock, ShieldCheck } from "lucide-react"
import { COMPANY, trackContact, getWhatsAppUrl } from "../data/company"

export const FinalCta: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#7B2FBE] via-[#5A1F90] to-[#200938] text-white py-16 sm:py-24">
      {/* Decorative ambient ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F0B429]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-[#F0B429] text-[#111118] font-black text-xs uppercase tracking-wider px-3.5 py-1 rounded-full mb-5">
          <Clock className="w-3.5 h-3.5" />
          Plantão 24 Horas em São Bernardo do Campo
        </div>

        <h2 className="font-display text-4xl sm:text-6xl text-white tracking-wide mb-4">
          VEÍCULO PARADO EM <span className="text-[#F0B429]">SÃO BERNARDO</span>?
        </h2>

        <p className="text-purple-100/90 text-base sm:text-lg max-w-xl mx-auto mb-8 font-normal leading-relaxed">
          Ligue ou mande mensagem agora mesmo. Informamos o valor justo e o tempo exato de chegada antes de sair da base.
        </p>

        {/* Dual Primary CTAs with non-breaking layout */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto justify-center mb-8">
          
          {/* Ligar Agora */}
          <a
            href={COMPANY.phoneHref}
            onClick={() => trackContact("telefone", "final")}
            data-rdg="telefone"
            data-pos="final"
            className="flex-1 flex items-center justify-center gap-3 bg-[#F0B429] hover:bg-[#D99F1E] text-[#111118] py-4 px-6 rounded-2xl shadow-xl shadow-yellow-500/25 transition-all hover:scale-103"
          >
            <Phone className="w-5 h-5 fill-current flex-shrink-0" />
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[11px] uppercase font-extrabold tracking-wider text-black/75">
                Ligar Agora (24h)
              </span>
              <span className="text-base sm:text-lg font-black tracking-tight whitespace-nowrap">
                (11) 94518-9393
              </span>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={getWhatsAppUrl("Olá! Meu veículo parou em São Bernardo do Campo e preciso de guincho com urgência.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("whatsapp", "final")}
            data-rdg="whatsapp"
            data-pos="final"
            className="flex-1 flex items-center justify-center gap-3 bg-[#1FAF55] hover:bg-[#188F45] text-white py-4 px-6 rounded-2xl shadow-xl shadow-green-600/30 transition-all hover:scale-103"
          >
            <MessageCircle className="w-5 h-5 fill-white flex-shrink-0" />
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[11px] uppercase font-extrabold tracking-wider text-green-100">
                Chamar no WhatsApp
              </span>
              <span className="text-base sm:text-lg font-black tracking-tight whitespace-nowrap">
                Atendimento Rápido
              </span>
            </div>
          </a>
        </div>

        {/* Reassurance pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-purple-200">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#F0B429]" />
            Sem taxa extra de horário
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#F0B429]" />
            Aceitamos Pix e Cartões
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#F0B429]" />
            Despacho Inteligente em SBC
          </span>
        </div>
      </div>
    </section>
  )
}
