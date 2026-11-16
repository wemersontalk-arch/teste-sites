import React from "react"
import { PhoneCall, AlertCircle, ArrowRight } from "lucide-react"
import { COMPANY, trackContact } from "../data/company"

export const UrgentStrip: React.FC = () => {
  return (
    <div className="bg-[#F0B429] text-[#111118] py-3 px-4 shadow-md font-semibold text-xs sm:text-sm border-y border-[#D99F1E]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
        <div className="flex items-center justify-center gap-2 font-bold">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#3A1060]" />
          <span>Veículo quebrado em São Bernardo do Campo ou Rodovia?</span>
          <span className="hidden md:inline font-normal text-black/80">
            Ligue agora e saiba o valor e tempo exato de chegada.
          </span>
        </div>

        <a
          href={COMPANY.phoneHref}
          onClick={() => trackContact("telefone", "faixa_urgencia")}
          data-rdg="telefone"
          data-pos="faixa"
          className="inline-flex items-center gap-2 bg-[#3A1060] hover:bg-[#5A1F90] text-white text-xs sm:text-sm font-black px-4 py-2 rounded-full shadow transition-all hover:scale-105 whitespace-nowrap flex-shrink-0"
        >
          <PhoneCall className="w-3.5 h-3.5 text-[#F0B429] flex-shrink-0" />
          <span className="whitespace-nowrap">Ligar Imediato: (11) 94518-9393</span>
          <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
        </a>
      </div>
    </div>
  )
}
