import React from "react"
import { Car, Bike, Wrench, ShieldAlert, Truck, Disc, CheckCircle, ArrowRight } from "lucide-react"
import { SERVICES, getWhatsAppUrl, trackContact } from "../data/company"

export const Services: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    carro: <Car className="w-6 h-6 text-[#7B2FBE]" />,
    moto: <Bike className="w-6 h-6 text-[#7B2FBE]" />,
    pane: <Wrench className="w-6 h-6 text-[#7B2FBE]" />,
    acidente: <ShieldAlert className="w-6 h-6 text-[#7B2FBE]" />,
    utilitarios: <Truck className="w-6 h-6 text-[#7B2FBE]" />,
    pneu: <Disc className="w-6 h-6 text-[#7B2FBE]" />
  }

  return (
    <section id="servicos" className="py-16 sm:py-24 bg-white border-b border-[#E5DEF0]">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#7B2FBE] bg-[#7B2FBE]/10 px-3 py-1 rounded-full mb-3">
            Serviços em São Bernardo do Campo
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-[#3A1060] tracking-wide mb-4">
            GUINCHO PARA CARRO, MOTO E UTILITÁRIO
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Atendemos pane mecânica, elétrica, colisão, acidente e remoção agendada em qualquer ponto de São Bernardo do Campo — do Centro ao Riacho Grande, além das rodovias.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((srv) => {
            const icon = iconMap[srv.id] || <Car className="w-6 h-6 text-[#7B2FBE]" />
            return (
              <div
                key={srv.id}
                className="group bg-[#F8F7FB] rounded-2xl p-6 sm:p-7 border border-[#E5DEF0] hover:border-[#7B2FBE]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Icon badge */}
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-5 group-hover:bg-[#F0B429]/20 transition-colors">
                    {icon}
                  </div>

                  <h3 className="font-display text-2xl text-[#3A1060] mb-2.5 tracking-wide group-hover:text-[#7B2FBE] transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    {srv.description}
                  </p>

                  {/* Feature bullet points */}
                  <ul className="space-y-2 mb-6">
                    {srv.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-[#1FAF55] flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Action Link */}
                <a
                  href={getWhatsAppUrl(`Olá! Preciso de serviço de ${srv.title} em São Bernardo do Campo. Vi pelo site.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("whatsapp", `card_servico_${srv.id}`)}
                  data-rdg="whatsapp"
                  data-pos={`servico_${srv.id}`}
                  className="inline-flex items-center justify-between text-xs font-bold text-[#5A1F90] hover:text-[#1FAF55] pt-3 border-t border-gray-200 group-hover:border-purple-200 transition-colors"
                >
                  <span>Chamar para este serviço</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
