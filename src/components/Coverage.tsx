import React, { useState } from "react"
import { MapPin, Navigation, Shield, Compass, ArrowUpRight } from "lucide-react"
import { NEIGHBORHOODS, HIGHWAYS, getWhatsAppUrl, trackContact } from "../data/company"

export const Coverage: React.FC = () => {
  const [activeBairro, setActiveBairro] = useState<string>("Centro")

  return (
    <section id="cobertura" className="py-16 sm:py-24 bg-[#F8F7FB] border-b border-[#E5DEF0]">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#7B2FBE] bg-[#7B2FBE]/10 px-3 py-1 rounded-full mb-3">
            Área de Atendimento
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-[#3A1060] tracking-wide mb-4">
            ATENDEMOS TODA SÃO BERNARDO DO CAMPO
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Nossa base fica em São Bernardo. Por isso chegamos rápido aos bairros e às principais rodovias e avenidas da cidade sem cobrar taxa de deslocamento externa.
          </p>
        </div>

        {/* Neighborhood Chips */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E5DEF0] mb-8">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#7B2FBE]" />
              <span className="text-sm font-bold text-gray-800">
                Selecione seu bairro para acionar o guincho mais próximo:
              </span>
            </div>
            <span className="text-xs text-purple-600 font-semibold bg-purple-50 px-2.5 py-1 rounded-full">
              20 Bairros Cobertos 24h
            </span>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-2.5 justify-center">
            {NEIGHBORHOODS.map((bairro, idx) => {
              const isSelected = activeBairro === bairro
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveBairro(bairro)}
                  className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? "bg-[#3A1060] text-white shadow-md scale-105 ring-2 ring-[#F0B429]"
                      : "bg-[#F8F7FB] text-[#3A1060] border border-[#E5DEF0] hover:bg-purple-50 hover:border-purple-300"
                  }`}
                >
                  {bairro}
                </button>
              )
            })}
          </div>

          {/* Dynamic Action Trigger for Selected Neighborhood */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-purple-50/70 p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#1FAF55] animate-ping"></div>
              <p className="text-xs sm:text-sm text-gray-700">
                Guincho de plantão na região do bairro <strong className="text-[#3A1060] font-bold">{activeBairro}</strong> com previsão de 20 a 35 min.
              </p>
            </div>
            <a
              href={getWhatsAppUrl(`Olá! Preciso de guincho no bairro ${activeBairro} em São Bernardo do Campo. Qual o valor?`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("whatsapp", `chip_bairro_${activeBairro}`)}
              data-rdg="whatsapp"
              data-pos={`bairro_${activeBairro}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#1FAF55] hover:bg-[#188F45] text-white px-4 py-2 rounded-xl shadow transition-transform hover:scale-105 whitespace-nowrap"
            >
              <span>Chamar para {activeBairro}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Highways & Strategic Corridors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HIGHWAYS.map((hw, idx) => (
            <div
              key={idx}
              className="bg-[#3A1060] text-white rounded-2xl p-5 border border-[#5A1F90] shadow-md flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#F0B429] block mb-1.5 flex items-center gap-1">
                  <Navigation className="w-3 h-3" />
                  Corredor Estratégico
                </span>
                <h4 className="font-bold text-base text-white mb-2">
                  {hw.name}
                </h4>
                <p className="text-xs text-purple-200 leading-relaxed">
                  {hw.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-800/60 flex items-center justify-between text-[11px] text-[#FFD166] font-semibold">
                <span>Atendimento Prioritário</span>
                <Shield className="w-3.5 h-3.5 text-[#F0B429]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
