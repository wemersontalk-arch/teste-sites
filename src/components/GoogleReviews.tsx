import React from "react"
import { Star, CheckCircle, ExternalLink, ShieldCheck } from "lucide-react"
import { REVIEWS, COMPANY } from "../data/company"

export const GoogleReviews: React.FC = () => {
  return (
    <section id="avaliacoes" className="py-16 sm:py-24 bg-white border-b border-[#E5DEF0]">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header with Google Rating Badge */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-14 pb-8 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-yellow-50 text-yellow-800 border border-yellow-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-[#F0B429] text-[#F0B429]" />
              Presença e Avaliação Orgânica no Google
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-[#3A1060] tracking-wide">
              O QUE NOSSOS CLIENTES DIZEM
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              Atendimento ágil e motoristas dedicados em São Bernardo do Campo e Rodovias.
            </p>
          </div>

          {/* Google Score Box */}
          <div className="flex items-center gap-4 bg-[#F8F7FB] p-4 sm:p-5 rounded-2xl border border-[#E5DEF0]">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-xs border border-gray-200">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-2xl text-gray-900">5.0</span>
                <div className="flex text-[#F0B429]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Avaliação máxima nas buscas do Google
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#F8F7FB] rounded-2xl p-6 border border-[#E5DEF0] flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Stars & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#F0B429]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium">{rev.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed italic mb-5">
                  "{rev.text}"
                </p>
              </div>

              {/* Author & Vehicle Details */}
              <div className="pt-3 border-t border-gray-200/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 flex items-center gap-1">
                      <span>{rev.author}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-[#1FAF55] fill-green-100" />
                    </h4>
                    <p className="text-[11px] text-purple-700 font-semibold">{rev.vehicle}</p>
                  </div>
                  <span className="text-[10px] bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-md">
                    {rev.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Organic Search Citation Link */}
        <div className="mt-10 text-center">
          <a
            href={COMPANY.googleSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5A1F90] hover:text-[#7B2FBE] underline underline-offset-4"
          >
            <span>Ver perfil e menções da Rainha do Guincho no Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  )
}
