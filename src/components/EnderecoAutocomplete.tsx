import React, { useState, useEffect, useRef } from "react"
import { MapPin, Loader2, X, Navigation, AlertCircle } from "lucide-react"
import { 
  buscarEnderecosInteligente, 
  geocodificarReverso, 
  EnderecoItem 
} from "../services/ubPrestador"

export interface EnderecoAutocompleteProps {
  label?: string
  value: string
  onChange: (texto: string) => void
  onSelect?: (item: EnderecoItem) => void
  placeholder?: string
  required?: boolean
  hasError?: boolean
  errorMessage?: string
  badgeLabel?: string
  iconColor?: string
  badgeColor?: string
  inputRef?: React.RefObject<HTMLInputElement | null>
  disabled?: boolean
  cidade?: string
  estado?: string
}

export const EnderecoAutocomplete: React.FC<EnderecoAutocompleteProps> = ({
  label,
  value,
  onChange,
  onSelect,
  placeholder = "Digite rua, número, bairro ou CEP...",
  required = false,
  hasError = false,
  errorMessage,
  badgeLabel,
  iconColor = "text-[#7B2FBE]",
  badgeColor = "text-purple-600 bg-purple-50",
  inputRef,
  disabled = false,
  cidade = "São Bernardo do Campo",
  estado = "SP"
}) => {
  const [sugestoes, setSugestoes] = useState<EnderecoItem[]>([])
  const [carregando, setCarregando] = useState<boolean>(false)
  const [aberto, setAberto] = useState<boolean>(false)
  const [geolocalizando, setGeolocalizando] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<any>(null)

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setAberto(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Busca sugestões estilo Google Maps (ViaCEP + Photon sem &lang=pt)
  const buscarSugestoes = async (termo: string) => {
    if (!termo || termo.trim().length < 3) {
      setSugestoes([])
      setAberto(false)
      return
    }

    try {
      setCarregando(true)
      const dados = await buscarEnderecosInteligente(termo, estado, cidade)
      setSugestoes(dados || [])
      setAberto(dados && dados.length > 0)
    } catch (err) {
      console.error("Erro ao buscar endereço autocomplete:", err)
    } finally {
      setCarregando(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const texto = e.target.value
    onChange(texto)

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      buscarSugestoes(texto)
    }, 300)
  }

  const handleSelecionar = (item: EnderecoItem) => {
    onChange(item.display_name)
    if (onSelect) {
      onSelect(item)
    }
    setAberto(false)
  }

  // Capturar localização do GPS com Geocodificação Reversa real
  const handleUsarGps = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada pelo seu navegador.")
      return
    }

    setGeolocalizando(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        try {
          const item = await geocodificarReverso(lat, lng)
          onChange(item.display_name)
          if (onSelect) {
            onSelect(item)
          }
        } catch (e) {
          const coordsStr = `GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)} (São Bernardo do Campo - SP)`
          onChange(coordsStr)
          if (onSelect) {
            onSelect({
              display_name: coordsStr,
              endereco_principal: coordsStr,
              endereco_secundario: "Coordenadas GPS",
              principal: coordsStr,
              secundario: "Coordenadas GPS",
              lat,
              lng
            })
          }
        } finally {
          setGeolocalizando(false)
          setAberto(false)
        }
      },
      () => {
        setGeolocalizando(false)
        alert("Não foi possível obter a sua localização GPS.")
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label className={`block font-bold text-xs flex items-center gap-1.5 ${hasError ? "text-red-700" : iconColor}`}>
            <MapPin className={`w-3.5 h-3.5 shrink-0 ${hasError ? "text-red-600 animate-bounce" : ""}`} />
            <span>{label}</span>
            {required && <span className="text-red-600 font-extrabold">*</span>}
          </label>
          {badgeLabel && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${badgeColor}`}>
              {badgeLabel}
            </span>
          )}
        </div>
      )}

      {/* Input de Busca estilo Google Maps */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={value}
          disabled={disabled}
          onChange={handleInputChange}
          onFocus={() => {
            if (sugestoes.length > 0) setAberto(true)
            else if (value && value.length >= 3) buscarSugestoes(value)
          }}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full pl-3.5 pr-20 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition font-medium disabled:bg-gray-100 ${
            hasError
              ? "bg-red-50/50 border-2 border-red-500 text-red-900 ring-2 ring-red-300 placeholder-red-400"
              : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#7B2FBE] focus:ring-2 focus:ring-purple-400/40"
          }`}
        />

        {/* Botões de Ação na Direita do Input */}
        <div className="absolute right-2 flex items-center gap-1">
          {carregando && (
            <Loader2 className="w-4 h-4 text-purple-600 animate-spin mr-1" />
          )}

          {value && !disabled && (
            <button
              type="button"
              onClick={() => {
                onChange("")
                setSugestoes([])
                setAberto(false)
              }}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              title="Limpar endereço"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={handleUsarGps}
            disabled={geolocalizando || disabled}
            className="p-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 transition cursor-pointer disabled:opacity-50"
            title="Usar minha localização GPS atual"
          >
            {geolocalizando ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-700" />
            ) : (
              <Navigation className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Alerta de erro inline */}
      {hasError && errorMessage && (
        <span className="text-[11px] text-red-600 font-bold flex items-center gap-1 mt-1 animate-fade-in">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {errorMessage}
        </span>
      )}

      {/* Menu Flutuante de Sugestões estilo Google Maps */}
      {aberto && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-2xl shadow-2xl border border-gray-200 bg-white text-gray-900 divide-y divide-gray-100 overflow-hidden animate-fade-in">
          {/* Opção Rápida de GPS no topo */}
          <button
            type="button"
            onClick={handleUsarGps}
            className="w-full px-4 py-2.5 text-left text-xs font-bold flex items-center gap-2.5 hover:bg-purple-50 text-purple-700 transition cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
              <Navigation className="w-4 h-4 text-purple-700" />
            </div>
            <div>
              <span className="block leading-tight font-black">Preencher com minha localização atual (GPS)</span>
              <span className="text-[10px] text-gray-500 font-normal">Detecta rua, número e bairro automaticamente</span>
            </div>
          </button>

          {/* Lista de Sugestões Encontradas */}
          <div className="max-h-60 overflow-y-auto">
            {sugestoes.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelecionar(item)}
                className="w-full px-4 py-2.5 text-left text-xs flex items-start gap-2.5 hover:bg-purple-50 transition cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-gray-900 truncate block">
                      {item.principal || item.endereco_principal || item.display_name}
                    </span>
                    {item.is_cep && (
                      <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-mono text-[9px] font-black uppercase">
                        CEP
                      </span>
                    )}
                  </div>
                  {(item.secundario || item.endereco_secundario) && (
                    <span className="text-[11px] text-gray-500 block truncate">
                      {item.secundario || item.endereco_secundario}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="px-3 py-1.5 bg-gray-50 text-[10px] text-gray-400 flex items-center justify-between font-medium">
            <span>🔍 Digite rua, número, bairro ou CEP</span>
            <span className="font-mono text-purple-700 font-bold">Google Maps Style</span>
          </div>
        </div>
      )}
    </div>
  )
}
