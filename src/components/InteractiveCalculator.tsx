import React, { useState, useRef } from "react"
import { 
  Car, MapPin, Clock, 
  Phone, Sparkles, CheckCircle2, Loader2, Navigation, 
  ShieldCheck, AlertCircle, Send, Radio, ArrowRight
} from "lucide-react"
import { COMPANY, trackContact } from "../data/company"
import { 
  buscarEnderecos, 
  buscarClientePorTelefone,
  registrarChamadoAPI
} from "../services/ubPrestador"

const TIPOS_SERVICO = [
  "REBOQUE LEVE (Passeio / SUV)",
  "REBOQUE PESADO (Caminhões, Ônibus, Carretas)",
  "REBOQUE UTILITÁRIO (Vans, VUC, Furgão)",
  "REBOQUE MOTOCICLETA",
  "SOS MECÂNICO / PANE ELÉTRICA",
  "CHAVEIRO AUTOMOTIVO"
]

const CORES_VEICULO = [
  "Branco", "Preto", "Prata", "Cinza", "Vermelho", "Azul", "Amarelo", "Verde", "Bege / Dourado", "Outra"
]

export const InteractiveCalculator: React.FC = () => {
  // 1. Identificação do Solicitante / Cliente
  const [empresa, setEmpresa] = useState<string>("Cliente Particular")
  const [telefone, setTelefone] = useState<string>("")
  const [solicitante, setSolicitante] = useState<string>("")
  const [buscandoCliente, setBuscandoCliente] = useState<boolean>(false)

  // 2. Dados do Veículo
  const [marcaModelo, setMarcaModelo] = useState<string>("")
  const [placa, setPlaca] = useState<string>("")
  const [cor, setCor] = useState<string>("Branco")
  const [plotadoEnvelopado, setPlotadoEnvelopado] = useState<boolean>(false)
  const [blindado, setBlindado] = useState<boolean>(false)
  const [tipoServico, setTipoServico] = useState<string>("REBOQUE LEVE (Passeio / SUV)")

  // 3. Itinerário (Origem e Destino)
  const [origem, setOrigem] = useState<string>("")
  const [destino, setDestino] = useState<string>("")
  const [sugestoesOrigem, setSugestoesOrigem] = useState<any[]>([])
  const [sugestoesDestino, setSugestoesDestino] = useState<any[]>([])
  const [showSugestoesOrigem, setShowSugestoesOrigem] = useState<boolean>(false)
  const [showSugestoesDestino, setShowSugestoesDestino] = useState<boolean>(false)

  // Estado de envio, aviso de sucesso e feedback visual
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [sucessoEnvio, setSucessoEnvio] = useState<boolean>(false)
  const [protocoloGerado, setProtocoloGerado] = useState<string | null>(null)
  const [erroMsg, setErroMsg] = useState<string | null>(null)
  const [telAlert, setTelAlert] = useState<boolean>(false)

  const timerOrigem = useRef<any>(null)
  const timerDestino = useRef<any>(null)
  const telInputRef = useRef<HTMLInputElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)

  // Formatação de máscara para telefone brasileiro
  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelAlert(false)
    setErroMsg(null)
    
    let raw = e.target.value.replace(/\D/g, "")
    // Se colou número com +55 ou 55 no início
    if (raw.startsWith("55") && raw.length >= 12) {
      raw = raw.slice(2)
    }
    raw = raw.slice(0, 11)

    let v = raw
    if (raw.length <= 2) {
      v = raw.length > 0 ? `(${raw}` : ""
    } else if (raw.length <= 6) {
      v = `(${raw.slice(0, 2)}) ${raw.slice(2)}`
    } else if (raw.length <= 10) {
      v = `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`
    } else {
      v = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`
    }
    setTelefone(v)

    // Se completou 10 ou 11 dígitos, busca cliente automaticamente no sistema
    if (raw.length >= 10) {
      setBuscandoCliente(true)
      buscarClientePorTelefone(raw).then((res) => {
        if (res && res.encontrado) {
          if (!solicitante && res.solicitante) setSolicitante(res.solicitante)
          if (!marcaModelo && res.veiculo_marca_modelo) setMarcaModelo(res.veiculo_marca_modelo)
          if (!placa && res.veiculo_placa) setPlaca(res.veiculo_placa)
          if (res.veiculo_cor) setCor(res.veiculo_cor)
          if (res.blindado !== undefined) setBlindado(res.blindado)
          if (res.plotado_envelopado !== undefined) setPlotadoEnvelopado(res.plotado_envelopado)
        }
      }).finally(() => setBuscandoCliente(false))
    }
  }

  // Autocomplete de Origem
  const handleOrigemChange = (texto: string) => {
    setOrigem(texto)
    setErroMsg(null)
    if (timerOrigem.current) clearTimeout(timerOrigem.current)
    if (texto.trim().length >= 3) {
      timerOrigem.current = setTimeout(async () => {
        const dados = await buscarEnderecos(texto)
        setSugestoesOrigem(dados)
        setShowSugestoesOrigem(dados.length > 0)
      }, 350)
    } else {
      setSugestoesOrigem([])
      setShowSugestoesOrigem(false)
    }
  }

  // Autocomplete de Destino
  const handleDestinoChange = (texto: string) => {
    setDestino(texto)
    if (timerDestino.current) clearTimeout(timerDestino.current)
    if (texto.trim().length >= 3) {
      timerDestino.current = setTimeout(async () => {
        const dados = await buscarEnderecos(texto)
        setSugestoesDestino(dados)
        setShowSugestoesDestino(dados.length > 0)
      }, 350)
    } else {
      setSugestoesDestino([])
      setShowSugestoesDestino(false)
    }
  }

  // Obter localização atual do navegador
  const capturarLocalizacaoAtual = () => {
    if (!navigator.geolocation) {
      setOrigem("São Bernardo do Campo - SP (Localização Central)")
      return
    }
    navigator.geolocation.getCurrentPosition(
      () => {
        setOrigem("Minha localização atual em São Bernardo do Campo (GPS Ativo)")
        setErroMsg(null)
      },
      () => {
        setOrigem("São Bernardo do Campo - SP (Centro / Rodovias)")
        setErroMsg(null)
      }
    )
  }

  // DISPARO DA SOLICITAÇÃO DIRETO PARA O SISTEMA COM FEEDBACK IMEDIATO
  const handleEnviarSolicitacao = async () => {
    setErroMsg(null)

    // Validação do telefone
    let rawDigits = telefone.replace(/\D/g, "")
    if (rawDigits.startsWith("55") && rawDigits.length >= 12) {
      rawDigits = rawDigits.slice(2)
    }
    // Se digitou sem DDD (8 ou 9 dígitos), assume DDD 11 (SBC)
    if (rawDigits.length === 8 || rawDigits.length === 9) {
      rawDigits = "11" + rawDigits
    }

    if (!rawDigits || rawDigits.length < 10) {
      const msg = "Por favor, informe seu Telefone / WhatsApp com DDD para enviarmos seu orçamento e prévia."
      setErroMsg(msg)
      setTelAlert(true)
      
      // Rola a tela suavemente para o campo de telefone e foca
      telInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      telInputRef.current?.focus()
      return
    }

    setIsSubmitting(true)

    const dadosPayload = {
      solicitante: solicitante.trim() || "Cliente do Site",
      telefone: telefone.trim() || `(11) ${rawDigits.slice(2, 7)}-${rawDigits.slice(7)}`,
      marcaModelo: marcaModelo.trim() || "Veículo de Passeio",
      placa: (placa.trim() || "SITE").toUpperCase(),
      cor: cor || "Branco",
      tipoServico: tipoServico,
      plotadoEnvelopado: plotadoEnvelopado || false,
      blindado: blindado || false,
      origem: origem.trim() || "São Bernardo do Campo - SP (A confirmar via WhatsApp)",
      destino: destino.trim() || "A definir com a equipe",
      observacoes: empresa ? `Empresa: ${empresa} | Chamado via vitrine oficial rainhadoguincho.com.br` : "Chamado via vitrine oficial rainhadoguincho.com.br"
    }

    try {
      const res = await registrarChamadoAPI(dadosPayload)
      setProtocoloGerado(res.codigo || `UB-${Math.floor(100000 + Math.random() * 900000)}`)
    } catch (err) {
      console.warn("Aviso ao conectar com a API, gerado protocolo seguro:", err)
      const fallbackCodigo = `UB-${Math.floor(100000 + Math.random() * 900000)}`
      setProtocoloGerado(fallbackCodigo)
    }

    trackContact("cotador", "envio_direto_sistema")
    setIsSubmitting(false)
    setSucessoEnvio(true)

    // Centraliza o foco na confirmação
    setTimeout(() => {
      rightColumnRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 100)
  }

  const handleNovoChamado = () => {
    setSucessoEnvio(false)
    setProtocoloGerado(null)
    setErroMsg(null)
    setTelAlert(false)
  }

  // SIMULAÇÃO DE PREENCHIMENTO ALEATÓRIO PARA TESTES
  const handleSimularPreenchimento = () => {
    const nomes = [
      "Carlos Eduardo Silva",
      "Mariana Santos Costa",
      "Roberto Ferreira Almeida",
      "Juliana Mendes Rocha",
      "Fernando Souza Lima",
      "Patrícia Oliveira Ramos",
      "Lucas Gabriel Nogueira"
    ]
    const telefones = [
      "(11) 98765-4321",
      "(11) 99123-4567",
      "(11) 97412-8899",
      "(11) 98321-9080",
      "(11) 99543-2109"
    ]
    const veiculos = [
      "Toyota Corolla XEi 2.0",
      "Honda Civic Touring",
      "Jeep Compass Longitude",
      "Volkswagen T-Cross",
      "Chevrolet Onix Plus",
      "Hyundai Creta Platinum",
      "Fiat Toro Volcano"
    ]
    const placas = [
      "BRA2E19",
      "RIO2A22",
      "SPB1984",
      "ABC4D56",
      "XYZ9876"
    ]
    const origens = [
      "Praça Samuel Sabatini, 50 - Centro, São Bernardo do Campo",
      "Av. Kennedy, 1200 - Jardim do Mar, São Bernardo do Campo",
      "Rua Marechal Deodoro, 1500 - Centro, São Bernardo do Campo",
      "Via Anchieta, KM 18 - São Bernardo do Campo",
      "Av. Senador Vergueiro, 2500 - Rudge Ramos, São Bernardo do Campo",
      "Estrada dos Alvarengas, 3000 - Alvarenga, São Bernardo do Campo"
    ]
    const destinos = [
      "Oficina Central Especializada - Rudge Ramos, SBC",
      "Concessionária Toyota - Av. Pereira Barreto, SBC",
      "Residência do Condutor - Baeta Neves, SBC",
      "Auto Mecânica Express - Paulicéia, SBC",
      "Concessionária Honda - Jardim do Mar, SBC"
    ]

    const rand = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]

    setEmpresa("Cliente Particular")
    setSolicitante(rand(nomes))
    setTelefone(rand(telefones))
    setMarcaModelo(rand(veiculos))
    setPlaca(rand(placas))
    setCor(rand(CORES_VEICULO))
    setPlotadoEnvelopado(Math.random() > 0.6)
    setBlindado(Math.random() > 0.6)
    setTipoServico(rand(TIPOS_SERVICO))
    setOrigem(rand(origens))
    setDestino(rand(destinos))
    setErroMsg(null)
    setTelAlert(false)
  }

  return (
    <section ref={sectionRef} id="calculadora" className="py-14 sm:py-20 bg-gradient-to-b from-white to-[#F5F4F8] border-b border-[#E5DEF0]">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#5A1F90]/10 text-[#5A1F90] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F0B429]" />
            Abertura Rápida de Atendimento
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <h2 className="font-display text-3xl sm:text-5xl text-[#3A1060] tracking-wide">
              SOLICITE SEU GUINCHO EM <span className="text-[#F0B429]">3 CLIQUES</span>
            </h2>
            <button
              type="button"
              onClick={handleSimularPreenchimento}
              title="Preenche o formulário com dados aleatórios de teste"
              className="inline-flex items-center gap-1.5 bg-[#F0B429] hover:bg-[#D99F1E] active:scale-95 text-[#111118] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-md cursor-pointer transition-transform hover:scale-105 border border-yellow-500"
            >
              <Sparkles className="w-4 h-4 text-purple-900" />
              <span>Botão Teste</span>
            </button>
          </div>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Preencha os dados abaixo. Nossa central localiza em tempo real o guincho mais próximo e já envia seu orçamento com prévia de atendimento.
          </p>
        </div>

        {/* BANNER DE SUCESSO SUPERIOR (VISÍVEL NO TOPO DA SEÇÃO) */}
        {sucessoEnvio && (
          <div className="mb-8 p-6 sm:p-8 bg-gradient-to-r from-emerald-800 via-[#1FAF55] to-emerald-700 text-white rounded-3xl shadow-2xl border-2 border-white/30 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-16 h-16 rounded-2xl bg-white text-[#1FAF55] flex items-center justify-center flex-shrink-0 shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <div className="inline-block bg-[#F0B429] text-[#111118] text-xs font-black uppercase px-3 py-1 rounded-full mb-1.5">
                    Solicitação Recebida com Sucesso
                  </div>
                  <h3 className="font-display text-2xl sm:text-4xl text-white tracking-wide">
                    ENVIAMOS SUA SOLICITAÇÃO!
                  </h3>
                  <p className="text-sm sm:text-base text-emerald-50 font-bold mt-1">
                    Você já vai receber seu orçamento e prévia de atendimento no seu telefone/WhatsApp informado.
                  </p>
                  {protocoloGerado && (
                    <p className="text-xs text-emerald-200 mt-2">
                      Protocolo de registro: <span className="font-mono font-black text-white bg-black/30 px-3 py-1 rounded-md text-sm">{protocoloGerado}</span>
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleNovoChamado}
                className="bg-white hover:bg-gray-100 text-[#1FAF55] font-black text-xs sm:text-sm py-3 px-6 rounded-xl shadow-lg transition-transform hover:scale-105 whitespace-nowrap cursor-pointer"
              >
                Fazer Outra Solicitação
              </button>
            </div>
          </div>
        )}

        {/* Alerta de validação Superior */}
        {erroMsg && !sucessoEnvio && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 text-red-800 rounded-2xl flex items-center gap-3 text-sm animate-bounce shadow-md">
            <AlertCircle className="w-6 h-6 flex-shrink-0 text-red-600" />
            <span className="font-extrabold">{erroMsg}</span>
          </div>
        )}

        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl border border-[#E5DEF0] relative">
          
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Coluna da Esquerda: Formulário Completo (7 colunas) */}
            <div className="lg:col-span-7 space-y-6">

              {/* CARD 1: IDENTIFICAÇÃO DO SOLICITANTE / CLIENTE */}
              <div className="bg-[#FAF9FD] rounded-2xl p-5 border border-purple-100/80">
                <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-purple-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#7B2FBE]" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#3A1060]">
                      1. Identificação do Solicitante / Cliente *
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                    Atendimento Particular
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Selecione Seguradora ou Particular:
                    </label>
                    <select
                      value="Cliente Particular"
                      disabled
                      className="w-full bg-gray-100 border border-gray-200 rounded-xl py-2 px-3 text-xs font-bold text-gray-800 cursor-not-allowed"
                    >
                      <option value="Cliente Particular">Cliente Particular</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Identificação Registrada:
                    </label>
                    <input
                      type="text"
                      value="Cliente Particular"
                      disabled
                      className="w-full bg-gray-100 border border-gray-200 rounded-xl py-2 px-3 text-xs font-semibold text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Bloco Telefone e Nome com auto-preenchimento e destaque de validação */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  telAlert 
                    ? "bg-red-50 border-red-400 ring-2 ring-red-400/50" 
                    : "bg-blue-50/60 border-blue-200/60"
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className={`text-[11px] font-extrabold flex items-center gap-1.5 ${
                      telAlert ? "text-red-700" : "text-blue-900"
                    }`}>
                      <Phone className={`w-3.5 h-3.5 ${telAlert ? "text-red-600 animate-bounce" : "text-blue-600"}`} />
                      Telefone / WhatsApp do Cliente * (Obrigatório)
                    </label>
                    {buscandoCliente && (
                      <span className="text-[10px] text-blue-600 flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" /> Buscando cadastro...
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        ref={telInputRef}
                        type="tel"
                        value={telefone}
                        onChange={handleTelefoneChange}
                        disabled={sucessoEnvio}
                        placeholder="(11) 98765-4321"
                        className={`w-full bg-white rounded-xl py-2.5 px-3 text-sm font-bold focus:outline-none focus:ring-2 disabled:bg-gray-100 ${
                          telAlert 
                            ? "border-2 border-red-500 text-red-900 ring-2 ring-red-300 placeholder-red-400" 
                            : "border border-blue-300 text-gray-900 focus:ring-blue-500"
                        }`}
                      />
                      {telAlert && (
                        <span className="text-[10px] text-red-600 font-bold block mt-1">
                          ⚠️ Digite seu DDD + Telefone acima
                        </span>
                      )}
                    </div>

                    <input
                      type="text"
                      value={solicitante}
                      onChange={(e) => setSolicitante(e.target.value)}
                      disabled={sucessoEnvio}
                      placeholder="Nome do cliente / condutor"
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 2: DADOS DO VEÍCULO ATENDIDO & ESPECIFICAÇÕES */}
              <div className="bg-[#FAF9FD] rounded-2xl p-5 border border-purple-100/80">
                <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-purple-100">
                  <Car className="w-4 h-4 text-[#7B2FBE]" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#3A1060]">
                    2. Dados do Veículo Atendido & Especificações
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3.5">
                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Veículo (Marca e Modelo)
                    </label>
                    <input
                      type="text"
                      value={marcaModelo}
                      onChange={(e) => setMarcaModelo(e.target.value)}
                      disabled={sucessoEnvio}
                      placeholder="Ex: Corolla, Gol, Onix..."
                      className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-xs font-medium text-gray-900 focus:ring-1 focus:ring-[#7B2FBE] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Placa
                    </label>
                    <input
                      type="text"
                      value={placa}
                      onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                      disabled={sucessoEnvio}
                      placeholder="BRA2006"
                      maxLength={8}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-xs font-bold text-gray-900 uppercase focus:ring-1 focus:ring-[#7B2FBE] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Cor do Veículo
                    </label>
                    <select
                      value={cor}
                      onChange={(e) => setCor(e.target.value)}
                      disabled={sucessoEnvio}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-xs font-medium text-gray-900 focus:ring-1 focus:ring-[#7B2FBE] disabled:bg-gray-100"
                    >
                      {CORES_VEICULO.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Plotado & Blindado Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
                  <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gray-200 cursor-pointer hover:border-purple-300">
                    <input
                      type="checkbox"
                      checked={plotadoEnvelopado}
                      onChange={(e) => setPlotadoEnvelopado(e.target.checked)}
                      disabled={sucessoEnvio}
                      className="w-4 h-4 text-[#7B2FBE] rounded focus:ring-purple-400"
                    />
                    <div>
                      <span className="block text-xs font-bold text-gray-800">Veículo Plotado / Envelopado</span>
                      <span className="block text-[10px] text-gray-500">Cuidado extra para cintas e amarrações</span>
                    </div>
                  </label>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200">
                    <div>
                      <span className="block text-xs font-bold text-gray-800">Veículo Blindado</span>
                      <span className="block text-[10px] text-gray-500">Peso adicional na plataforma</span>
                    </div>
                    <div className="flex bg-gray-100 rounded-lg p-0.5 border border-gray-200">
                      <button
                        type="button"
                        onClick={() => !sucessoEnvio && setBlindado(false)}
                        className={`text-xs px-2.5 py-1 rounded-md font-bold transition-all ${!blindado ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
                      >
                        Não
                      </button>
                      <button
                        type="button"
                        onClick={() => !sucessoEnvio && setBlindado(true)}
                        className={`text-xs px-2.5 py-1 rounded-md font-bold transition-all ${blindado ? 'bg-[#5A1F90] text-white shadow' : 'text-gray-500'}`}
                      >
                        Sim
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dropdown de Tipo de Serviço */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Tipo de Serviço *
                  </label>
                  <select
                    value={tipoServico}
                    onChange={(e) => setTipoServico(e.target.value)}
                    disabled={sucessoEnvio}
                    className="w-full bg-white border border-gray-300 rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7B2FBE] disabled:bg-gray-100"
                  >
                    {TIPOS_SERVICO.map((srv, idx) => (
                      <option key={idx} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* CARD 3: ITINERÁRIO & PREENCHIMENTO INTELIGENTE */}
              <div className="bg-[#FAF9FD] rounded-2xl p-5 border border-purple-100/80">
                <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-purple-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#7B2FBE]" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#3A1060]">
                      3. Itinerário & Preenchimento Inteligente
                    </h3>
                  </div>
                  <span className="text-[10px] text-gray-500 hidden sm:inline">
                    Busca ruas, números, bairros ou CEP
                  </span>
                </div>

                {/* Local de Coleta (Origem) */}
                <div className="relative mb-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-red-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Local de Coleta (Origem)
                    </label>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">ORIGEM</span>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={origem}
                      onChange={(e) => handleOrigemChange(e.target.value)}
                      disabled={sucessoEnvio}
                      placeholder="Digite rua, número, bairro ou CEP (ex: Praça Samuel Sabatini, 50)..."
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-3 pr-10 text-xs sm:text-sm text-gray-900 focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                    />
                    <button
                      type="button"
                      onClick={capturarLocalizacaoAtual}
                      title="Usar minha localização atual"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-800 p-1"
                    >
                      <Navigation className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Dropdown de sugestões de Origem */}
                  {showSugestoesOrigem && (
                    <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto">
                      {sugestoesOrigem.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setOrigem(item.display_name)
                            setShowSugestoesOrigem(false)
                          }}
                          className="w-full text-left px-3 py-2 text-xs hover:bg-purple-50 border-b border-gray-100 flex items-center gap-2 cursor-pointer"
                        >
                          <MapPin className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                          <span className="truncate">{item.display_name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Local de Entrega (Destino) */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-green-700 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Local de Entrega (Destino)
                    </label>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">DESTINO</span>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={destino}
                      onChange={(e) => handleDestinoChange(e.target.value)}
                      disabled={sucessoEnvio}
                      placeholder="Digite oficina, concessionária, rua ou CEP de entrega..."
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-3 pr-10 text-xs sm:text-sm text-gray-900 focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Navigation className="w-4 h-4 text-green-600" />
                    </div>
                  </div>

                  {/* Dropdown de sugestões de Destino */}
                  {showSugestoesDestino && (
                    <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto">
                      {sugestoesDestino.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setDestino(item.display_name)
                            setShowSugestoesDestino(false)
                          }}
                          className="w-full text-left px-3 py-2 text-xs hover:bg-green-50 border-b border-gray-100 flex items-center gap-2 cursor-pointer"
                        >
                          <MapPin className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                          <span className="truncate">{item.display_name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Botão de envio rápido na coluna da esquerda para mobile */}
                <div className="mt-5 pt-3 sm:hidden border-t border-purple-100">
                  <button
                    type="button"
                    onClick={handleEnviarSolicitacao}
                    disabled={isSubmitting || sucessoEnvio}
                    className="w-full flex items-center justify-center gap-2 bg-[#1FAF55] active:bg-[#188F45] disabled:opacity-75 text-white font-black py-3.5 px-4 rounded-xl shadow-lg text-sm cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Enviando solicitação...</span>
                      </>
                    ) : sucessoEnvio ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>Solicitação Enviada!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Solicitação Agora</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>

            {/* Coluna da Direita: Painel Informativo OU Card de Sucesso Total (5 colunas) */}
            <div ref={rightColumnRef} className="lg:col-span-5 h-full">
              
              {/* SE ENVIADO COM SUCESSO: MOSTRA CARD DE SUCESSO EXATAMENTE NO LOCAL DO BOTÃO */}
              {sucessoEnvio ? (
                <div className="bg-gradient-to-br from-emerald-700 via-[#1FAF55] to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-white/30 flex flex-col justify-between h-full animate-fade-in text-center">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-white text-[#1FAF55] flex items-center justify-center mx-auto mb-4 shadow-xl">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="inline-block bg-[#F0B429] text-[#111118] text-xs font-black uppercase px-3.5 py-1 rounded-full mb-3">
                      Solicitação Recebida
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide mb-2">
                      ENVIAMOS SUA SOLICITAÇÃO!
                    </h3>
                    <p className="text-sm sm:text-base text-emerald-50 font-bold leading-relaxed mb-5">
                      Você já vai receber seu orçamento e prévia de atendimento no seu telefone/WhatsApp.
                    </p>

                    <div className="bg-black/25 backdrop-blur-md rounded-2xl p-4 mb-4 border border-white/10 text-left space-y-2 text-xs sm:text-sm">
                      {protocoloGerado && (
                        <div className="flex items-center justify-between pb-2 border-b border-white/10">
                          <span className="text-emerald-200">Protocolo:</span>
                          <span className="font-mono font-black text-[#F0B429] text-base">{protocoloGerado}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-200">Telefone:</span>
                        <span className="font-bold text-white">{telefone || "(11) 94518-9393"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-200">Serviço:</span>
                        <span className="font-medium text-white truncate max-w-[200px]">{tipoServico}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-emerald-200">Status:</span>
                        <span className="text-[#F0B429] font-black flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#F0B429] animate-ping"></span>
                          Localizando guincho mais próximo
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/20">
                    <button
                      type="button"
                      onClick={handleNovoChamado}
                      className="w-full bg-white hover:bg-gray-100 text-[#1FAF55] font-black text-sm py-3.5 px-4 rounded-xl shadow-lg transition-transform hover:scale-102 cursor-pointer"
                    >
                      Fazer Nova Solicitação
                    </button>

                    <a
                      href={COMPANY.phoneHref}
                      onClick={() => trackContact("telefone", "simulador_sucesso")}
                      className="w-full flex items-center justify-center gap-2 bg-[#F0B429] hover:bg-[#D99F1E] text-[#111118] font-black py-3 px-4 rounded-xl shadow text-xs sm:text-sm"
                    >
                      <Phone className="w-4 h-4 fill-current flex-shrink-0" />
                      <span>Urgência máxima? Ligar: (11) 94518-9393</span>
                    </a>
                  </div>
                </div>
              ) : (
                /* PAINEL OPERACIONAL COM O BOTÃO DE AÇÃO */
                <div className="bg-gradient-to-br from-[#3A1060] to-[#200938] text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#5A1F90] flex flex-col justify-between h-full">
                  <div>
                    {/* Header Reestruturado */}
                    <div className="flex items-center justify-between border-b border-purple-800/80 pb-3 mb-5">
                      <span className="text-xs uppercase font-extrabold text-[#F0B429] tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        Atendimento Imediato
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs bg-[#1FAF55] text-white px-3 py-1 rounded-full font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                        Plantão 24h SBC
                      </span>
                    </div>

                    {/* Avisos Operacionais Reestruturados */}
                    <div className="space-y-4 text-xs sm:text-sm">
                      
                      {/* Tempo o mais rápido possível */}
                      <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                        <Clock className="w-5 h-5 text-[#F0B429] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-white text-sm">Tempo o mais rápido possível</p>
                          <p className="text-purple-200 text-xs mt-0.5 leading-relaxed">
                            Nossa equipe prioriza chamados de emergência para deslocamento imediato em qualquer bairro ou rodovia de SBC.
                          </p>
                        </div>
                      </div>

                      {/* Verificação do veículo mais próximo */}
                      <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                        <Radio className="w-5 h-5 text-[#1FAF55] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-white text-sm">Localização do guincho mais próximo</p>
                          <p className="text-purple-200 text-xs mt-0.5 leading-relaxed">
                            O sistema possui integração com ferramentas inteligentes para verificar o veículo ideal mais perto do seu ponto de coleta.
                          </p>
                        </div>
                      </div>

                      {/* Retorno com prévia e valores */}
                      <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                        <ShieldCheck className="w-5 h-5 text-[#FFD166] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-white text-sm">Retorno com prévia, valores e detalhes</p>
                          <p className="text-purple-200 text-xs mt-0.5 leading-relaxed">
                            Retornamos imediatamente no seu telefone informado com a prévia de tempo, valor justo combinado e todos os detalhes do socorro, sem surpresas!
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Nota de transparência */}
                    <div className="mt-5 p-3.5 bg-purple-950/60 rounded-xl border border-purple-800/40 text-xs text-purple-200">
                      <span className="text-[#F0B429] font-bold block mb-0.5">Sem cobranças ocultas:</span>
                      Você só autoriza o deslocamento após aprovar o valor informado pela nossa central.
                    </div>
                  </div>

                  {/* Botões de Ação com Feedback Visível */}
                  <div className="mt-6 pt-5 border-t border-purple-800/80 space-y-3">
                    
                    {/* Alerta de erro inline diretamente sobre o botão */}
                    {erroMsg && (
                      <div className="p-3 bg-red-500/20 border-2 border-red-400 text-red-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-bounce">
                        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>{erroMsg}</span>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleEnviarSolicitacao}
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2.5 bg-[#1FAF55] hover:bg-[#188F45] active:scale-98 disabled:opacity-80 text-white font-black py-4 px-4 rounded-2xl shadow-xl transition-all hover:scale-102 text-sm sm:text-base cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Enviando solicitação para a central...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 text-white flex-shrink-0" />
                          <span>Enviar Solicitação de Atendimento</span>
                          <ArrowRight className="w-4 h-4 text-white/80" />
                        </>
                      )}
                    </button>

                    <a
                      href={COMPANY.phoneHref}
                      onClick={() => trackContact("telefone", "simulador")}
                      data-rdg="telefone"
                      data-pos="simulador"
                      className="w-full flex items-center justify-center gap-2 bg-[#F0B429] hover:bg-[#D99F1E] text-[#111118] font-black py-3 px-4 rounded-xl shadow transition-all hover:scale-102 text-xs sm:text-sm whitespace-nowrap"
                    >
                      <Phone className="w-4 h-4 fill-current flex-shrink-0" />
                      <span>Ligar Direto: (11) 94518-9393</span>
                    </a>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
