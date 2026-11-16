// Configurações Globais da Empresa Rainha do Guincho

export const COMPANY = {
  name: "Rainha do Guincho",
  subname: "Guincho 24h em São Bernardo do Campo e Grande ABC",
  phoneDisplay: "(11) 94518-9393",
  phoneRaw: "+5511945189393",
  phoneHref: "tel:+5511945189393",
  email: "contato@rainhadoguincho.com.br",
  emailHref: "mailto:contato@rainhadoguincho.com.br",
  city: "São Bernardo do Campo",
  state: "SP",
  region: "Grande ABC",
  hours: "Atendimento 24 Horas — 7 Dias por Semana",
  paymentMethods: "Pix, Cartão de Crédito, Débito e Dinheiro",
  googleRating: 5.0,
  googleReviewCount: 148,
  googleSearchUrl: "https://share.google/NxUm8JJw2QuY4RJ8i",
  baseNotice: "Base Operacional com saída direta de São Bernardo do Campo",
  logoUrl: "./logo-original.png",
  faviconUrl: "./favicon-192.png",
}

/**
 * Função para gerar o link do WhatsApp com texto personalizado e rastreamento
 */
export function getWhatsAppUrl(customText?: string): string {
  const defaultText = "Olá! Preciso de guincho em São Bernardo do Campo. Vi pelo site."
  const text = customText || defaultText
  return `https://wa.me/5511945189393?text=${encodeURIComponent(text)}`
}

/**
 * Disparo de evento para o Google Tag Manager / dataLayer
 * Preserva exatamente o padrão do site original: event: 'rdg_contato'
 */
export function trackContact(canal: "telefone" | "whatsapp" | "cotador", posicao: string) {
  if (typeof window !== "undefined") {
    const w = window as any
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({
      event: "rdg_contato",
      rdg_canal: canal,
      rdg_posicao: posicao,
      timestamp: new Date().toISOString()
    })
  }
}

export const NEIGHBORHOODS = [
  "Centro",
  "Rudge Ramos",
  "Baeta Neves",
  "Assunção",
  "Nova Petrópolis",
  "Jardim do Mar",
  "Planalto",
  "Demarchi",
  "Ferrazópolis",
  "Taboão",
  "Paulicéia",
  "Anchieta",
  "Independência",
  "Jordanópolis",
  "Santa Terezinha",
  "Cooperativa",
  "Montanhão",
  "Alvarenga",
  "Batistini",
  "Riacho Grande"
]

export const HIGHWAYS = [
  {
    name: "Via Anchieta (SP-150)",
    desc: "Atendimento rápido nos trechos do km 10 ao km 31, pista norte e sul."
  },
  {
    name: "Rodovia dos Imigrantes (SP-160)",
    desc: "Socorro emergencial no trecho de São Bernardo do Campo e serra."
  },
  {
    name: "Rodoanel Mário Covas (SP-021)",
    desc: "Trecho Sul com acesso imediato para resgate seguro em acostamento."
  },
  {
    name: "Principais Avenidas de SBC",
    desc: "Av. Senador Vergueiro, Av. Kennedy, Av. Lucas Nogueira Garcez, Av. Pereira Barreto e Estrada dos Alvarengas."
  }
]

export const SERVICES = [
  {
    id: "carro",
    title: "Guincho para Carros",
    description: "Carros de passeio, SUVs, minivans e carros rebaixados transportados com plataforma hidráulica moderna e cinta reforçada até a oficina ou residência.",
    features: ["Plataforma Hidráulica", "Sem arrasto ou danos", "Reboque para concessionária ou oficina"]
  },
  {
    id: "moto",
    title: "Guincho para Motos",
    description: "De scooters a motos de alta cilindrada. Fixação especial com travas de roda e cintas macias de alta segurança sem risco para a carenagem.",
    features: ["Equipamento próprio para moto", "Travamento profissional", "Qualquer cilindrada"]
  },
  {
    id: "pane",
    title: "Pane Mecânica e Elétrica",
    description: "Carro não dá partida? Bateria descarregou ou superaqueceu? Enviamos socorro para recarga (chupeta) ou remoção imediata para local seguro.",
    features: ["Recarga de bateria 12v/24v", "Auxílio na pista", "Remoção técnica com guincho"]
  },
  {
    id: "acidente",
    title: "Colisão e Acidente",
    description: "Resgate e destombamento em vias urbanas, Anchieta, Imigrantes e Rodoanel. Operação com sinalização de segurança e equipe experiente.",
    features: ["Atendimento com sinalização", "Guincho com asa delta e lança", "Equipe treinada para resgate"]
  },
  {
    id: "utilitarios",
    title: "Utilitários e Vans",
    description: "Transporte e reboque de vans, furgões, pickups e veículos de carga leve com capacidade reforçada na plataforma.",
    features: ["Vans escolares e comerciais", "Pickups pesadas e 4x4", "Agilidade para frotas"]
  },
  {
    id: "pneu",
    title: "Troca de Pneu & Pane Seca",
    description: "Ficou sem estepe na via rápida ou acabou o combustível? Nosso auto socorro vai até o seu ponto em São Bernardo prestar apoio.",
    features: ["Apoio no acostamento", "Ferramental adequado", "Deslocamento imediato"]
  }
]

export const STEPS = [
  {
    step: "01",
    title: "Você Liga ou Chama no WhatsApp",
    desc: "Informe onde você está em São Bernardo do Campo ou rodovia e qual é o veículo.",
    badge: "Contato Direto"
  },
  {
    step: "02",
    title: "Valor e Tempo Combinados Antes",
    desc: "Antes do guincho sair da base, você já sabe exatamente o valor justo e o tempo estimado de chegada.",
    badge: "Sem Surpresas"
  },
  {
    step: "03",
    title: "Resgate e Transporte Seguro",
    desc: "O caminhão chega ao local, embarca seu veículo com total cuidado e leva ao destino desejado.",
    badge: "Entrega Garantida"
  }
]

export const DIFFERENTIALS = [
  {
    title: "Base Própria em SBC",
    desc: "Nossos caminhões partem de São Bernardo. Você não paga frete absurdo de deslocamento vindo de São Paulo ou outras cidades.",
    stat: "20 a 40 min",
    label: "tempo médio de chegada"
  },
  {
    title: "Plantão 24h / 7 Dias",
    desc: "Atendimento ininterrupto de madrugada, domingos e feriados. Sem taxa extra surpresa por horário.",
    stat: "24/7",
    label: "cobertura contínua"
  },
  {
    title: "Preço Justo e Transparente",
    desc: "Valor fechado antes do deslocamento. Você tem clareza e segurança financeira desde a primeira mensagem.",
    stat: "100%",
    label: "orçamento prévio"
  },
  {
    title: "Pagamento Facilitado",
    desc: "Aceitamos Pix imediato, cartão de débito, crédito parcelado e dinheiro na entrega ou no embarque.",
    stat: "Flexível",
    label: "Pix & Cartões"
  }
]

export const REVIEWS = [
  {
    author: "Marcio Silveira",
    vehicle: "Jeep Compass",
    location: "Via Anchieta, km 18",
    rating: 5,
    date: "Há 1 semana",
    text: "Meu carro parou na Anchieta na chuva à noite. Liguei para a Rainha do Guincho e em menos de 25 minutos o caminhão estava lá. Motorista muito educado, preço justo e sem enrolação."
  },
  {
    author: "Juliana Mendes",
    vehicle: "Honda HR-V",
    location: "Rudge Ramos, SBC",
    rating: 5,
    date: "Há 2 semanas",
    text: "Excelente atendimento! Bateria arriou saindo da faculdade. Chamei no WhatsApp, passaram o valor na hora e chegaram rapidinho. Super recomendo o serviço."
  },
  {
    author: "Rodrigo Toledo",
    vehicle: "Yamaha MT-07",
    location: "Centro de São Bernardo",
    rating: 5,
    date: "Há 3 semanas",
    text: "Poucos guinchos sabem amarrar moto esportiva com o cuidado necessário. O rapaz da Rainha usou cinta própria com proteção de guidão. 10 de 10!"
  },
  {
    author: "Carlos Eduardo B.",
    vehicle: "Renault Master",
    location: "Estrada dos Alvarengas",
    rating: 5,
    date: "Há 1 mês",
    text: "Furgão de entrega quebrou a embreagem carregado. Preço passado antes de sair, nota fiscal emitida na hora e entrega pontual na mecânica. Prestadores de confiança."
  }
]

export const FAQS = [
  {
    q: "Quanto tempo o guincho leva para chegar em São Bernardo do Campo?",
    a: "Em média, nosso caminhão chega entre 20 e 40 minutos em qualquer bairro de São Bernardo do Campo. Como nossa base fica na cidade, o deslocamento é direto. Ao nos ligar ou chamar no WhatsApp, informamos a estimativa exata de acordo com o trânsito do momento."
  },
  {
    q: "Vocês atendem na Via Anchieta, Rodovia dos Imigrantes e no Rodoanel?",
    a: "Sim! Cobrimos todos os trechos das rodovias que passam por São Bernardo do Campo e região do Grande ABC (Anchieta do km 10 ao 31, Imigrantes e Rodoanel Sul). Caso seu veículo esteja em local de risco ou faixa de rolamento, avise imediatamente no telefone para priorizarmos o envio."
  },
  {
    q: "Vocês transportam motos com segurança?",
    a: "Com certeza. Nossas plataformas contam com suporte e cintas catracas emborrachadas especiais para motos (desde 50cc até motos de alta cilindrada esportivas ou custom), sem riscar pintura, escapamento ou guidão."
  },
  {
    q: "O valor é informado antes do guincho sair?",
    a: "Sim, isso é um princípio fundamental da Rainha do Guincho. Passamos o valor final exato antes de o caminhão ser despachado, sem nenhuma cobrança oculta na chegada."
  },
  {
    q: "Quais são as formas de pagamento aceitas?",
    a: "Aceitamos Pix, cartões de crédito e débito das principais bandeiras (Visa, Master, Elo, Hipercard) e dinheiro. É possível parcelar no cartão mediante consulta."
  },
  {
    q: "O atendimento funciona de madrugada, sábados, domingos e feriados?",
    a: "Sim, operamos em regime de plantão 24 horas por dia, 365 dias no ano. Pode ligar a qualquer hora que haverá um operador pronto para lhe atender."
  }
]
