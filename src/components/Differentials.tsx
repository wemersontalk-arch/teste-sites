import React from "react"
import { Building2, Clock, DollarSign, CreditCard, ShieldCheck } from "lucide-react"
import { DIFFERENTIALS } from "../data/company"

export const Differentials: React.FC = () => {
  const icons = [
    <Building2 className="w-6 h-6 text-[#7B2FBE]" />,
    <Clock className="w-6 h-6 text-[#7B2FBE]" />,
    <DollarSign className="w-6 h-6 text-[#7B2FBE]" />,
    <CreditCard className="w-6 h-6 text-[#7B2FBE]" />
  ]

  return (
    <section className="py-16 sm:py-24 bg-[#F8F7FB] border-b border-[#E5DEF0]">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#7B2FBE] bg-[#7B2FBE]/10 px-3 py-1 rounded-full mb-3">
            Por que a Rainha do Guincho
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-[#3A1060] tracking-wide mb-3">
            GUINCHO LOCAL, PREÇO COMBINADO
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Diferenciais pensados para você que precisa de socorro com pontualidade, respeito e sem surpresas na cobrança.
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENTIALS.map((diff, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DEF0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
                    {icons[idx]}
                  </div>
                  <div className="text-right">
                    <span className="block font-black text-lg text-[#5A1F90]">{diff.stat}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">{diff.label}</span>
                  </div>
                </div>

                <h3 className="font-display text-2xl text-[#3A1060] mb-2.5 tracking-wide">
                  {diff.title}
                </h3>

                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {diff.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-[#1FAF55] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Compromisso Rainha</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
