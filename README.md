# 👑 Rainha do Guincho — Site Institucional Moderno & Auto Socorro 24h

Projeto de alta performance desenvolvido para a **Rainha do Guincho**, serviço de guincho plataforma e auto socorro 24 horas em **São Bernardo do Campo (SP)** e rodovias da região (Via Anchieta, Rodovia dos Imigrantes e Rodoanel Mário Covas).

Este projeto é uma reconstrução e modernização completa do site original ([rainhadoguincho.com.br](https://rainhadoguincho.com.br)), utilizando o método e as ferramentas de engenharia reversa do repositório `G:\Projetos\Agente ER`.

---

## 🚀 Tecnologias Utilizadas

- **Framework / UI:** React 19 + TypeScript + Vite 6
- **Estilização:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Ícones:** Lucide React
- **Tipografia:** Bebas Neue (títulos e marca) + Inter (interface e legibilidade)
- **Rastreamento:** Google Tag Manager (`GTM-54LPPZQB`) + Google Ads Tag (`AW-338555353`) + Disparos `dataLayer` (`rdg_contato`)
- **SEO Local:** Dados estruturados Schema.org `AutomotiveBusiness` com geolocalização e área de cobertura em São Bernardo do Campo

---

## 🎨 Identidade Visual e Paleta de Cores (Cores Originais da Marca)

| Cor / Papel | Código Hex | Aplicação |
| :--- | :--- | :--- |
| **Roxo Imperial** | `#7B2FBE` | Cor principal da marca, gradientes e cabeçalhos |
| **Roxo Escuro** | `#5A1F90` | Barra de navegação e bordas estruturais |
| **Roxo Profundo** | `#3A1060` | Fundo de contraste, rodapé e hero |
| **Dourado Rainha** | `#F0B429` | Acentos, botões de ligação rápida e destaque |
| **Dourado Claro** | `#FFD166` | Topbar de plantão e badges |
| **Verde Emergência** | `#1FAF55` | Botões de WhatsApp e indicadores de status online |
| **Superfície Suave** | `#F8F7FB` | Fundo dos cards e seções alternadas |

> **Acessibilidade WCAG 2.2:** Verificada via script `contrast.py` do Agente ER com 100% de aprovação (todos os pares com índice AAA ou AA, incluindo texto `#111118` sobre dourado `#F0B429` com contraste 10.08:1).

---

## 📞 Links e Direcionamentos Preservados

Todos os canais de contato mantêm integridade com o site original e campanhas:

- **Telefone Direto:** `tel:+5511945189393`
- **WhatsApp Oficial:** `https://wa.me/5511945189393` (com mensagem contextualizada de socorro)
- **E-mail:** `contato@rainhadoguincho.com.br`
- **Presença Google / Busca Orgânica:** Integrada com selo 5.0 estrelas e citações reais de clientes atendidos na região.

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- Node.js (v18+)
- npm ou yarn

### 1. Iniciar em Modo de Desenvolvimento
```bash
npm run dev
```
O servidor iniciará em `http://localhost:3000` com Hot Module Replacement (HMR).

### 2. Gerar Versão de Produção
```bash
npm run build
```
Os arquivos estáticos otimizados serão gerados na pasta `dist/`, prontos para serem publicados em qualquer hospedagem (Hostinger, Apache, cPanel, Nginx, Vercel, etc.).

### 3. Visualizar Build de Produção
```bash
npm run preview
```

---

## 📂 Estrutura de Pastas

```
Projeto Rainha do Guincho/
├── dist/                      # Arquivos finais compilados para produção
├── public/
│   ├── favicon-192.png        # Ícone do caminhão com coroa (192x192)
│   └── logo-original.png      # Mascote oficial em alta definição
├── replica/                   # Artefatos da metodologia Agente ER
│   ├── recon.md               # Mapeamento reverso completo de telas e fluxos
│   ├── features.csv           # Matriz de paridade de recursos (100% atingido)
│   └── design/
│       └── tokens.json        # Tokens de design validados por contraste
├── src/
│   ├── components/
│   │   ├── Topbar.tsx         # Barra superior de plantão com indicador pulsante
│   │   ├── Navbar.tsx         # Cabeçalho com logo, navegação e botão de ligação
│   │   ├── Hero.tsx           # Seção principal com CTAs duplos e selos
│   │   ├── UrgentStrip.tsx    # Faixa de alerta de chamada imediata
│   │   ├── InteractiveCalculator.tsx # Simulador interativo de socorro e tempo
│   │   ├── Services.tsx       # Grade de 6 serviços com acionamento WhatsApp
│   │   ├── Coverage.tsx       # Bairros de SBC (20 chips) e rodovias
│   │   ├── Steps.tsx          # 3 passos do chamado à entrega
│   │   ├── Differentials.tsx  # Vantagens da base local em SBC
│   │   ├── GoogleReviews.tsx  # Avaliações do Google e nota 5.0
│   │   ├── Faq.tsx            # Acordeão interativo de dúvidas
│   │   ├── FinalCta.tsx       # Chamada final de conversão
│   │   ├── Footer.tsx         # Rodapé institucional e formas de pagamento
│   │   └── MobileFloatingBar.tsx # Barra fixa inferior para mobile
│   ├── data/
│   │   └── company.ts         # Central de dados, constantes e tracking
│   ├── App.tsx                # Composição da aplicação
│   ├── index.css              # Tailwind v4 e utilitários de animação
│   └── main.tsx               # Ponto de entrada React 19
├── index.html                 # HTML com GTM, Google Ads e Schema.org
├── package.json
├── tsconfig.json
└── vite.config.ts
```
