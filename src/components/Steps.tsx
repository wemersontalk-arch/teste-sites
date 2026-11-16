import React from "react"
import { PhoneCall, Calculator, Truck, Check } from "lucide-react"
import { STEPS } from "../data/company"

export const Steps: React.FC = () => {
  const iconList = [
    <PhoneCall className="w-5 h-5 text-[#3A1060]" />,
    <Calculator className="w-5 h-5 text-[#3A1060]" />,
    <Truck className="w-5 h-5 text-[#3A1060]" />
  ]

  return (
    <section id="como-funciona" className="py-16 sm:py-24 bg-white border-b border-[#E5DEF0]">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#7B2FBE] bg-[#7B2FBE]/10 px-3 py-1 rounded-full mb-3">
            Como Funciona
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-[#3A1060] tracking-wide mb-3">
            DO CHAMADO À ENTREGA EM 3 PASSOS
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Processo ágil, sem burocracia e com total clareza do valor do início ao fim.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-[#F8F7FB] rounded-3xl p-8 border border-[#E5DEF0] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Step number badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#F0B429] text-[#111118] font-black text-xl flex items-center justify-center shadow-md">
                  {step.step}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A1F90] bg-purple-100 px-3 py-1 rounded-full">
                  {step.badge}
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl text-[#3A1060] mb-3 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center gap-2 text-xs text-[#1FAF55] font-semibold">
                <Check className="w-4 h-4" />
                <span>Etapa simples e transparente</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
