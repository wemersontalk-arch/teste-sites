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

export interface EnderecoItem {
  display_name: string
  endereco_principal: string
  endereco_secundario: string
  principal: string
  secundario: string
  cidade?: string
  estado?: string
  cep?: string
  is_cep?: boolean
  lat?: number
  lng?: number
  tipo?: string
}

/**
 * Busca inteligente de endereços com ViaCEP + Photon Geocoder direto no navegador + Fallback
 * Padrão idêntico ao Projeto UB Prestador / GK Prestador (SEM &lang=pt para evitar HTTP 400!)
 */
export async function buscarEnderecosInteligente(termo: string, estado: string = '', cidade: string = ''): Promise<EnderecoItem[]> {
  if (!termo || termo.trim().length < 3) return []
  const q = termo.trim()

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
          const city = data.localidade || ''
          const uf = data.uf || ''
          const principal = logradouro || `CEP ${data.cep}`
          const secundario = bairro ? `${bairro}, ${city} - ${uf}` : `${city} - ${uf}`
          return [{
            display_name: `${principal} - ${secundario}`,
            endereco_principal: principal,
            endereco_secundario: secundario,
            principal: principal,
            secundario: secundario,
            cidade: city,
            estado: uf,
            cep: data.cep,
            is_cep: true,
            lat: -23.6914,
            lng: -46.5646,
            tipo: "cep"
          }]
        }
      }
    } catch (e) {}
  }

  // 2. Extrai número predial se presente (ex: 'Rua Maria Adelaide 776' -> 776)
  const numMatch = q.match(/\b(\d+)\b/)
  const housenumber = numMatch ? numMatch[1] : ''
  const qSemNum = housenumber ? q.replace(new RegExp(`\\b${housenumber}\\b`, 'g'), '').replace(/\s+/g, ' ').trim() : q

  // Detecta se há sigla de UF no texto digitado (ex: SP, MG, RJ, etc.)
  const ufsRegex = /\b(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)\b/i
  const ufDigitadaMatch = q.match(ufsRegex)
  const ufEfetiva = estado || (ufDigitadaMatch ? ufDigitadaMatch[1].toUpperCase() : 'SP')

  // 3. Busca por logradouro/bairro via Photon Geocoder (SEM &lang=pt que quebra a API com HTTP 400!)
  try {
    const queryParts = [qSemNum || q]
    if (cidade) queryParts.push(cidade)
    else if (!q.toLowerCase().includes('são bernardo') && !q.toLowerCase().includes('sbc') && !q.toLowerCase().includes('santo andré') && !q.toLowerCase().includes('sp')) {
      queryParts.push('São Bernardo do Campo')
    }
    if (ufEfetiva) queryParts.push(ufEfetiva)
    queryParts.push('Brasil')
    const fullQuery = queryParts.join(', ')

    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(fullQuery)}&limit=8`
    const res = await fetch(url)
    if (res.ok) {
      const data = await res.json()
      if (data.features && data.features.length > 0) {
        return data.features.map((f: any) => {
          const p = f.properties || {}
          const street = p.street || p.name || qSemNum
          const num = housenumber ? `, ${housenumber}` : (p.housenumber ? `, ${p.housenumber}` : '')
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
            principal: principal,
            secundario: secundario,
            cidade: city,
            estado: state,
            lat: coords[1],
            lng: coords[0],
            tipo: "rua"
          }
        })
      }
    }
  } catch (e) {
    console.error("Erro na busca Photon com filtro:", e)
  }

  // Se a busca com filtro não retornou resultados, busca direta
  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=8`
    const res = await fetch(url)
    if (res.ok) {
      const data = await res.json()
      if (data.features && data.features.length > 0) {
        return data.features.map((f: any) => {
          const p = f.properties || {}
          const street = p.street || p.name || q
          const num = housenumber ? `, ${housenumber}` : (p.housenumber ? `, ${p.housenumber}` : '')
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
            principal: principal,
            secundario: secundario,
            cidade: city,
            estado: state,
            lat: coords[1],
            lng: coords[0],
            tipo: "rua"
          }
        })
      }
    }
  } catch (e) {}

  // 4. Fallback padrão da Grande São Paulo / ABC
  const suf = [cidade || 'São Bernardo do Campo', ufEfetiva || 'SP'].filter(Boolean).join(' - ')
  return [
    { 
      display_name: `${q}, ${suf}`, 
      endereco_principal: q, 
      endereco_secundario: suf, 
      principal: q,
      secundario: suf,
      cidade: cidade || 'São Bernardo do Campo',
      estado: ufEfetiva || 'SP',
      lat: -23.6914, 
      lng: -46.5646 
    }
  ]
}

export const buscarEnderecos = buscarEnderecosInteligente

/**
 * Geocodificação reversa de GPS para detectar rua e número exatos via Photon
 */
export async function geocodificarReverso(lat: number, lng: number): Promise<EnderecoItem> {
  try {
    const res = await fetch(`https://photon.komoot.io/reverse?lon=${lng}&lat=${lat}`)
    if (res.ok) {
      const data = await res.json()
      if (data.features && data.features.length > 0) {
        const p = data.features[0].properties || {}
        const street = p.street || p.name || ''
        const num = p.housenumber ? `, ${p.housenumber}` : ''
        const district = p.district || p.locality || ''
        const city = p.city || p.town || ''
        const state = p.state || ''
        const principal = street ? `${street}${num}` : (district || city || 'Localização GPS')
        const sec = [district, city, state].filter(Boolean).join(', ')
        const full = sec ? `${principal} - ${sec}` : principal

        return {
          display_name: full,
          endereco_principal: principal,
          endereco_secundario: sec,
          principal,
          secundario: sec,
          cidade: city,
          estado: state,
          lat,
          lng
        }
      }
    }
  } catch (e) {
    console.error("Erro na geocodificação reversa:", e)
  }

  const coordsStr = `GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)} (São Bernardo do Campo - SP)`
  return {
    display_name: coordsStr,
    endereco_principal: coordsStr,
    endereco_secundario: "Coordenadas GPS",
    principal: coordsStr,
    secundario: "Coordenadas GPS",
    lat,
    lng
  }
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
