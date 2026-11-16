import React from "react"
import { Phone, Mail, MapPin, ShieldCheck, Heart } from "lucide-react"
import { COMPANY, trackContact, getWhatsAppUrl } from "../data/company"

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0D0A14] text-gray-400 text-xs sm:text-sm pt-12 pb-24 sm:pb-12 border-t border-purple-950">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-gray-800">
          
          {/* Brand Presentation */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-900/40 p-1 border border-[#F0B429]/30">
                <img
                  src="./logo-original.png"
                  alt="Rainha do Guincho"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-display text-2xl text-white tracking-wider">
                RAINHA DO <span className="text-[#F0B429]">GUINCHO</span>
              </span>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Serviço especializado de guincho plataforma, reboque e auto socorro mecânico 24 horas em São Bernardo do Campo e rodovias da região do Grande ABC.
            </p>

            <div className="flex items-center gap-2 text-xs text-purple-300">
              <ShieldCheck className="w-4 h-4 text-[#F0B429]" />
              <span>Base própria local em SBC • Saída imediata</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-2 text-[#F0B429]">
              Canais Oficiais
            </h4>
            <div className="space-y-2.5">
              <a
                href={COMPANY.phoneHref}
                onClick={() => trackContact("telefone", "rodape")}
                data-rdg="telefone"
                data-pos="rodape"
                className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#F0B429]" />
                <span className="font-bold">{COMPANY.phoneDisplay} (Plantão 24h)</span>
              </a>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact("whatsapp", "rodape")}
                data-rdg="whatsapp"
                data-pos="rodape"
                className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors"
              >
                <div className="w-4 h-4 rounded-full bg-[#1FAF55] flex items-center justify-center text-[10px] text-white font-bold">W</div>
                <span>WhatsApp: {COMPANY.phoneDisplay}</span>
              </a>

              <a
                href={COMPANY.emailHref}
                className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#F0B429]" />
                <span>{COMPANY.email}</span>
              </a>

              <div className="flex items-start gap-2.5 text-gray-400 text-xs pt-1">
                <MapPin className="w-4 h-4 text-[#F0B429] flex-shrink-0 mt-0.5" />
                <span>Atendimento em todos os bairros de São Bernardo do Campo / SP e Rodovias Anchieta, Imigrantes e Rodoanel.</span>
              </div>
            </div>
          </div>

          {/* Payment & Security */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-2 text-[#F0B429]">
              Formas de Pagamento
            </h4>
            <p className="text-xs text-gray-400">
              Aceitamos cartões de crédito, débito, Pix e dinheiro no local da entrega.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="bg-gray-800 text-gray-300 text-[11px] font-semibold px-2.5 py-1 rounded-md">Pix</span>
              <span className="bg-gray-800 text-gray-300 text-[11px] font-semibold px-2.5 py-1 rounded-md">Visa</span>
              <span className="bg-gray-800 text-gray-300 text-[11px] font-semibold px-2.5 py-1 rounded-md">Mastercard</span>
              <span className="bg-gray-800 text-gray-300 text-[11px] font-semibold px-2.5 py-1 rounded-md">Elo</span>
              <span className="bg-gray-800 text-gray-300 text-[11px] font-semibold px-2.5 py-1 rounded-md">Dinheiro</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Rainha do Guincho. Todos os direitos reservados.
          </p>
          <p className="flex items-center justify-center gap-1">
            <span>Desenvolvido com excelência técnica e foco em alta conversão</span>
          </p>
        </div>

      </div>
    </footer>
  )
}
