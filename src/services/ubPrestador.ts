// Serviço de Integração com a API de Atendimentos UB Prestador & Despacho 24h

export interface AtendimentoPayload {
  solicitante: string
  telefone: string
  marcaModelo: string
  placa: string
  cor: string
  tipoServico: string
  plotadoEnvelopado: boolean
  blindado: boolean
  origem: string
  destino: string
  observacoes?: string
}

export interface AtendimentoResponse {
  success: boolean
  codigo?: string
  id?: number
  error?: string
}

const CLOUD_API_BASE = "https://ubprestador.universobits.com.br/api/atendimentos"
const LOCAL_API_BASE = "http://localhost:8000/api/atendimentos"

/**
 * Cria um chamado em tempo real no sistema integrado via ferramentas inteligentes
 * Sincroniza simultaneamente com a nuvem (Hostinger) e ambiente local de desenvolvimento
 */
export async function registrarChamadoAPI(dados: AtendimentoPayload): Promise<AtendimentoResponse> {
  const payload = {
    seguradora: "Rainha do Guincho (Site)",
    cliente_nome: "Rainha do Guincho (Site)",
    solicitante: dados.solicitante.trim() || "Cliente do Site",
    telefone_contato: dados.telefone.trim(),
    veiculo_marca_modelo: dados.marcaModelo.trim() || "Não especificado",
    veiculo_placa: (dados.placa.trim() || "SITE").toUpperCase(),
    veiculo_cor: dados.cor || "Branco",
    plotado_envelopado: dados.plotadoEnvelopado || false,
    blindado: dados.blindado || false,
    tipo_servico: dados.tipoServico,
    tipo_cliente_categoria: "PARTICULAR",
    forma_pagamento: "Pagamento a Vista direto com motorista",
    endereco_base: "Base Central - São Bernardo do Campo / SP",
    lat_base: -23.6914,
    lng_base: -46.5646,
    endereco_origem: dados.origem.trim(),
    endereco_destino: dados.destino.trim(),
    observacoes: dados.observacoes || "Chamado gerado via vitrine oficial rainhadoguincho.com.br",
    status: "PENDENTE"
  }

  // Se estiver rodando localmente (localhost ou 127.0.0.1), notifica também o backend local em background
  const isLocal = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

  if (isLocal) {
    try {
      const localCtrl = new AbortController()
      const localTimeout = setTimeout(() => localCtrl.abort(), 1200)
      fetch(LOCAL_API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: localCtrl.signal
      }).then(() => clearTimeout(localTimeout)).catch(() => clearTimeout(localTimeout))
    } catch (e) {}
  }

  // Envio principal para a nuvem da Hostinger (base unificada em produção)
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4500)

    const response = await fetch(CLOUD_API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Status ${response.status}`)
    }

    const data = await response.json()
    const codigo = data.codigo_atendimento || data.codigo || `UB-${Math.floor(100000 + Math.random() * 900000)}`

    return {
      success: true,
      codigo,
      id: data.id
    }
  } catch (err: any) {
    console.warn("Aviso na API de despacho cloud, gerando protocolo local seguro:", err)
    const fallbackCodigo = `UB-${Math.floor(100000 + Math.random() * 900000)}`
    return {
      success: false,
      codigo: fallbackCodigo,
      error: err.message
    }
  }
}

/**
 * Busca inteligente de endereços com ViaCEP + Photon Geocoder direto no navegador + Fallback Cloud
 */
export async function buscarEnderecos(query: string) {
  if (!query || query.trim().length < 3) return []
  const q = query.trim()

  // 1. Se for CEP (8 dígitos)
  const cepDigits = q.replace(/\D/g, '')
  if (cepDigits.length === 8) {
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`)
      if (res.ok) {
        const data = await res.json()
        if (!data.erro) {
          const logradouro = data.logradouro || ''
          const bairro = data.bairro || ''
          const cidade = data.localidade || ''
          const uf = data.uf || ''
          const principal = logradouro || `CEP ${data.cep}`
          const secundario = bairro ? `${bairro}, ${cidade} - ${uf}` : `${cidade} - ${uf}`
          return [{
            display_name: `${principal} - ${secundario}`,
            endereco_principal: principal,
            endereco_secundario: secundario,
            cidade: cidade,
            estado: uf,
            lat: -23.6914,
            lng: -46.5646
          }]
        }
      }
    } catch (e) {}
  }

  // 2. Photon Geocoder (OpenStreetMap / Komoot com HTTPS nativo)
  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=6&lang=pt`
    const res = await fetch(url)
    if (res.ok) {
      const data = await res.json()
      if (data.features && data.features.length > 0) {
        return data.features.map((f: any) => {
          const p = f.properties || {}
          const street = p.street || p.name || q
          const num = p.housenumber ? `, ${p.housenumber}` : ''
          const district = p.district || p.locality || ''
          const city = p.city || p.town || ''
          const state = p.state || ''
          const coords = f.geometry && f.geometry.coordinates ? f.geometry.coordinates : [-46.5646, -23.6914]

          const principal = `${street}${num}`
          const secundario = [district, city, state].filter(Boolean).join(' - ')

          return {
            display_name: secundario ? `${principal}, ${secundario}` : principal,
            endereco_principal: principal,
            endereco_secundario: secundario,
            cidade: city,
            estado: state,
            lat: coords[1],
            lng: coords[0]
          }
        })
      }
    }
  } catch (e) {}

  // 3. Fallback na API da Hostinger
  try {
    const res = await fetch(`${CLOUD_API_BASE}/busca-endereco?q=${encodeURIComponent(q)}`)
    if (res.ok) {
      return await res.json()
    }
  } catch (e) {}

  // 4. Fallback padrão da Grande São Paulo / ABC
  return [
    { display_name: `${q}, São Bernardo do Campo - SP`, endereco_principal: q, endereco_secundario: "São Bernardo do Campo - SP", lat: -23.6914, lng: -46.5646 },
    { display_name: `${q}, Santo André - SP`, endereco_principal: q, endereco_secundario: "Santo André - SP", lat: -23.6639, lng: -46.5383 },
    { display_name: `${q}, São Paulo - SP`, endereco_principal: q, endereco_secundario: "São Paulo - SP", lat: -23.5505, lng: -46.6333 }
  ]
}

/**
 * Busca de cliente cadastrado por telefone
 */
export async function buscarClientePorTelefone(telefone: string) {
  const digits = telefone.replace(/\D/g, "")
  if (digits.length < 8) return { encontrado: false }
  try {
    const res = await fetch(`${CLOUD_API_BASE}/busca-cliente-telefone?telefone=${digits}`)
    if (res.ok) {
      return await res.json()
    }
  } catch (e) {
    console.error("Erro na busca por telefone:", e)
  }
  return { encontrado: false }
}

/**
 * Formata mensagem completa para o WhatsApp com o protocolo gerado
 */
export function buildWhatsAppLinkComProtocolo(codigo: string, dados: AtendimentoPayload): string {
  const lines = [
    `👑 *RAINHA DO GUINCHO — SOLICITAÇÃO DE ATENDIMENTO*`,
    `📋 *Protocolo:* ${codigo}`,
    `👤 *Cliente:* ${dados.solicitante}`,
    `📱 *Contato:* ${dados.telefone}`,
    `🚗 *Veículo:* ${dados.marcaModelo} (${dados.cor})`,
    `🔢 *Placa:* ${dados.placa.toUpperCase()}`,
    `⚙️ *Serviço:* ${dados.tipoServico}`,
    `🛡️ *Blindado:* ${dados.blindado ? "SIM" : "NÃO"} | *Plotado:* ${dados.plotadoEnvelopado ? "SIM" : "NÃO"}`,
    `📍 *Origem (Coleta):* ${dados.origem}`,
    `🏁 *Destino (Entrega):* ${dados.destino}`,
    ``,
    `_Olá! Enviei esses dados pelo site da Rainha do Guincho. Aguardo a confirmação do valor e tempo estimado de chegada!_`
  ]

  return `https://wa.me/5511945189393?text=${encodeURIComponent(lines.join("\n"))}`
}
