import React from "react"
import { Phone, MessageCircle, CheckCircle2, Clock, Zap, MapPin, Star, ShieldCheck } from "lucide-react"
import { COMPANY, trackContact, getWhatsAppUrl } from "../data/company"

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-hero-radial text-white pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-[#5A1F90]/50">
      {/* Decorative ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-300 via-purple-600 to-transparent blur-2xl"></div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Dual Primary CTAs (7 columns) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Live Status Pill com ferramentas inteligentes */}
            <div className="inline-flex flex-wrap items-center gap-2 bg-[#F0B429] text-[#111118] font-black text-xs sm:text-sm tracking-wider uppercase px-4 py-1.5 rounded-full shadow-lg mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1FAF55] animate-pulse-dot"></span>
              <span>Base SBC Ativa • Despacho Imediato</span>
              <span className="hidden sm:inline opacity-40">|</span>
              <span className="hidden sm:inline text-[11px] font-bold text-purple-950">
                Ferramentas Inteligentes de Localização
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.03] tracking-wide mb-5 text-white">
              GUINCHO EM <span className="text-[#F0B429] drop-shadow-sm">SÃO BERNARDO</span><br className="hidden sm:inline" /> DO CAMPO 24 HORAS
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-purple-100/90 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
              Carro, moto ou utilitário parado em São Bernardo? Saímos direto da nossa base em SBC e 
              <strong className="text-[#FFD166] font-bold"> informamos o valor exato antes de sair</strong>. Atendimento ágil em todos os bairros, na Anchieta, Imigrantes e Rodoanel.
            </p>

            {/* High-Conversion Dual Action Buttons (Corrected non-breaking layout) */}
            <div className="flex flex-col sm:flex-row gap-3.5 max-w-xl mx-auto lg:mx-0 mb-8">
              {/* Call Button (Never breaks, AAA contrast) */}
              <a
                href={COMPANY.phoneHref}
                onClick={() => trackContact("telefone", "hero")}
                data-rdg="telefone"
                data-pos="hero"
                className="flex-1 inline-flex items-center justify-center sm:justify-start gap-3 bg-[#F0B429] hover:bg-[#D99F1E] text-[#111118] py-3.5 px-5 rounded-2xl shadow-xl shadow-yellow-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:ring-4 focus:ring-yellow-400 group"
              >
                <div className="w-11 h-11 rounded-xl bg-black/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 fill-current" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[11px] uppercase font-extrabold tracking-wider text-black/75">
                    Ligar Agora (Plantão 24h)
                  </span>
                  <span className="text-base sm:text-lg font-black tracking-tight whitespace-nowrap">
                    (11) 94518-9393
                  </span>
                </div>
              </a>

              {/* WhatsApp Button */}
              <a
                href={getWhatsAppUrl("Olá! Preciso de guincho em São Bernardo do Campo com urgência. Vi pelo site.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact("whatsapp", "hero")}
                data-rdg="whatsapp"
                data-pos="hero"
                className="flex-1 inline-flex items-center justify-center sm:justify-start gap-3 bg-[#1FAF55] hover:bg-[#188F45] text-white py-3.5 px-5 rounded-2xl shadow-xl shadow-green-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:ring-4 focus:ring-green-400 group"
              >
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5 fill-white" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[11px] uppercase font-extrabold tracking-wider text-green-100">
                    Chamar no WhatsApp
                  </span>
                  <span className="text-base sm:text-lg font-black tracking-tight whitespace-nowrap">
                    Resposta Imediata
                  </span>
                </div>
              </a>
            </div>

            {/* Trust Checks Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl mx-auto lg:mx-0 text-xs sm:text-sm text-purple-100">
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-white/10 backdrop-blur-xs py-2 px-3 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#F0B429] flex-shrink-0" />
                <span className="font-semibold whitespace-nowrap">Base em SBC</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-white/10 backdrop-blur-xs py-2 px-3 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#F0B429] flex-shrink-0" />
                <span className="font-semibold whitespace-nowrap">Preço antes</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-white/10 backdrop-blur-xs py-2 px-3 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#F0B429] flex-shrink-0" />
                <span className="font-semibold whitespace-nowrap">Pix e Cartão</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-white/10 backdrop-blur-xs py-2 px-3 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#F0B429] flex-shrink-0" />
                <span className="font-semibold whitespace-nowrap">24h e Feriados</span>
              </div>
            </div>
          </div>

          {/* Right Column: Foto Michelelogo.png sem moldura ou quadro (fundo transparente) */}
          <div className="lg:col-span-5 flex items-center justify-center relative mt-4 lg:mt-0">
            <div className="relative w-full flex items-center justify-center">
              {/* Soft atmospheric ambient glow behind transparent character */}
              <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-[#F0B429]/15 rounded-full blur-3xl pointer-events-none"></div>

              <img
                src="./Michelelogo.png"
                alt="Rainha do Guincho — Atendimento 24h em São Bernardo do Campo"
                className="relative z-10 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[440px] h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] transform hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
