import React from "react"
import { Topbar } from "./components/Topbar"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { UrgentStrip } from "./components/UrgentStrip"
import { FleetShowcase } from "./components/FleetShowcase"
import { InteractiveCalculator } from "./components/InteractiveCalculator"
import { Services } from "./components/Services"
import { Coverage } from "./components/Coverage"
import { Steps } from "./components/Steps"
import { Differentials } from "./components/Differentials"
import { GoogleReviews } from "./components/GoogleReviews"
import { Faq } from "./components/Faq"
import { FinalCta } from "./components/FinalCta"
import { Footer } from "./components/Footer"
import { MobileFloatingBar } from "./components/MobileFloatingBar"

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FB] text-[#111118]">
      {/* 1. Top Bar de Plantão com Live Status */}
      <Topbar />

      {/* 2. Cabeçalho com Logo Oficial, Rastreamento UB Prestador e Ligar Agora */}
      <Navbar />

      <main className="flex-1">
        {/* 3. Hero com Vitrine Visual, Mascote e CTAs de Alta Conversão */}
        <Hero />

        {/* 4. Faixa de Urgência */}
        <UrgentStrip />

        {/* 5. Vitrine da Frota e Tecnologia Integrada UB Prestador */}
        <FleetShowcase />

        {/* 6. Simulador Interativo com Disparo para API UB Prestador e WhatsApp */}
        <InteractiveCalculator />

        {/* 7. Grade de Serviços Especializados */}
        <Services />

        {/* 8. Mapa de Cobertura e Bairros de SBC */}
        <Coverage />

        {/* 9. 3 Passos: Como Funciona */}
        <Steps />

        {/* 10. Diferenciais da Rainha */}
        <Differentials />

        {/* 11. Depoimentos e Avaliações Google */}
        <GoogleReviews />

        {/* 12. Dúvidas Frequentes (FAQ) */}
        <Faq />

        {/* 13. CTA Final de Emergência */}
        <FinalCta />
      </main>

      {/* 14. Rodapé Institucional */}
      <Footer />

      {/* 15. Barra Fixa Mobile */}
      <MobileFloatingBar />
    </div>
  )
}

export default App
