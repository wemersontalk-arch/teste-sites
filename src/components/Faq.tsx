import React, { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { FAQS } from "../data/company"

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F8F7FB] border-b border-[#E5DEF0]">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#7B2FBE] bg-[#7B2FBE]/10 px-3 py-1 rounded-full mb-3">
            Dúvidas Frequentes
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-[#3A1060] tracking-wide mb-3">
            PERGUNTAS SOBRE GUINCHO EM SÃO BERNARDO
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Tire suas dúvidas sobre tempo de chegada, valores, formas de pagamento e cobertura.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E5DEF0] overflow-hidden shadow-xs transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 text-sm sm:text-base hover:text-[#7B2FBE] transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <HelpCircle className="w-5 h-5 text-[#7B2FBE] flex-shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-700 flex-shrink-0 transform transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-purple-50/20">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
