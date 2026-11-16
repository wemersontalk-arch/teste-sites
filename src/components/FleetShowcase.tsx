import React from "react"
import { Truck, ShieldCheck, Sparkles, Gauge, MessageCircle } from "lucide-react"
import { getWhatsAppUrl } from "../data/company"

export const FleetShowcase: React.FC = () => {
  return (
    <section id="frota" className="py-16 sm:py-24 bg-white border-b border-[#E5DEF0] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-[#7B2FBE]/10 text-[#7B2FBE] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F0B429]" />
            Vitrine da Frota & Tecnologia Própria
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-[#3A1060] tracking-wide mb-4">
            FROTA MODERNA COM DESPACHO EM TEMPO REAL
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Não somos intermediários. Contamos com <strong>caminhões novos e plataformas próprias</strong> operando em São Bernardo do Campo, todos integrados com <span className="text-[#7B2FBE] font-bold">ferramentas inteligentes</span> para localização e envio ágil da equipe.
          </p>
        </div>

        {/* Big Modern Showcase Frame */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#200938] to-[#3A1060] border border-[#F0B429]/40 shadow-2xl p-4 sm:p-8 mb-12">
          
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Illustration with modern floating glass pills */}
            <div className="lg:col-span-7 relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <img
                  src="./banner-rainha.jpg"
                  alt="Rainha do Guincho — Frota Moderna e Equipe"
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-700"
                />

                {/* Gradient shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                {/* Overlaid fleet badges */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-white">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs">
                    <Truck className="w-4 h-4 text-[#F0B429]" />
                    <span className="font-bold">VW Delivery • Scania • Mercedes-Benz</span>
                  </div>
                  <span className="bg-[#1FAF55] text-white text-[11px] font-black px-3 py-1 rounded-lg">
                    100% Própria
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Technical Highlights & Integration Card */}
            <div className="lg:col-span-5 text-white space-y-6">
              <div>
                <span className="text-[#F0B429] font-black text-xs uppercase tracking-widest block mb-2">
                  Padrão de Atendimento
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide">
                  EQUIPAMENTOS PREPARADOS PARA QUALQUER RESGATE
                </h3>
              </div>

              {/* Feature items */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-[#F0B429] text-[#111118] flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Plataformas Hidráulicas Sem Arrasto</h4>
                    <p className="text-purple-200 mt-0.5">
                      Ângulo suave de subida para não raspar para-choques de carros baixos, SUVs e esportivos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-[#1FAF55] text-white flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Fixação Especial para Motos</h4>
                    <p className="text-purple-200 mt-0.5">
                      Travamento de roda dianteira e cintas catracas com proteção emborrachada.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-[#7B2FBE] text-white flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Integração com Ferramentas Inteligentes</h4>
                    <p className="text-purple-200 mt-0.5">
                      Chamados sincronizados com a central de despacho para alocação imediata do caminhão mais próximo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons inside showcase without driver link */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="#calculadora"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#F0B429] hover:bg-[#D99F1E] text-[#111118] font-black py-3 px-4 rounded-xl shadow transition-transform hover:scale-102 text-xs sm:text-sm"
                >
                  <Gauge className="w-4 h-4" />
                  <span>Solicitar Atendimento</span>
                </a>

                <a
                  href={getWhatsAppUrl("Olá! Preciso de guincho em São Bernardo do Campo com a frota da Rainha.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1FAF55] hover:bg-[#188F45] text-white font-black py-3 px-4 rounded-xl shadow transition-transform hover:scale-102 text-xs sm:text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chamar no WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
