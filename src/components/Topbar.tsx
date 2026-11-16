import React from "react"
import { Phone, Clock, ShieldCheck } from "lucide-react"
import { COMPANY, trackContact } from "../data/company"

export const Topbar: React.FC = () => {
  return (
    <div className="bg-[#200938] text-[#FFD166] text-xs sm:text-sm py-2 px-4 border-b border-[#3A1060] transition-colors">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FAF55] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1FAF55]"></span>
          </span>
          <span className="text-white font-semibold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#F0B429]" />
            Plantão 24h Ativo em SBC
          </span>
          <span className="hidden md:inline text-purple-300">|</span>
          <span className="hidden md:inline-flex items-center gap-1 text-purple-200">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F0B429]" />
            Base local com chegada em 20-40 min
          </span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-purple-200 hidden sm:inline">Precisa de reboque agora?</span>
          <a
            href={COMPANY.phoneHref}
            onClick={() => trackContact("telefone", "topo")}
            data-rdg="telefone"
            data-pos="topo"
            className="inline-flex items-center gap-1.5 font-bold text-[#F0B429] hover:text-white transition-colors bg-[#3A1060]/70 px-2.5 py-0.5 rounded-full border border-[#7B2FBE]/50"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{COMPANY.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
