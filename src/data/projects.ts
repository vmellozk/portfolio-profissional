import type { Project } from "../types/portfolio";

// Defina o link de cada repositório no `repoLink` do respectivo projeto.
export const projects: Project[] = [
  {
    id: "SaaS CRM Barbearia",
    title: "SaaS CRM Barbearia",
    description: "Desenvolvi uma plataforma completa para gestão de barbearias, centralizando agendamentos, clientes, profissionais, cadeiras, pagamentos, despesas e indicadores. Possui controle de permissões, autenticação e criptografia de dados sensíveis.",
    image: ["images/saas_barbearia.png"],
    repoLink: "",
    shine: { primary: "56, 181, 255", secondary: "126, 112, 255", angle: "205deg" },
  },
  {
    id: "Pipeline Bitcoin Agente IA",
    title: "Pipeline Bitcoin Agente IA",
    description: "Desenvolvi uma pipeline com Docker e Python com Streamlit para monitorar o Bitcoin, automatizando a coleta e o tratamento de dados da Coinbase, o armazenamento em PostgreSQL e consultas com agentes de IA.",
    image: ["images/pipeline_bitcoin.png"],
    repoLink: "",
    shine: { primary: "72, 218, 183", secondary: "64, 148, 255", angle: "235deg" },
  },
  {
    id: "Niteroi Vazamentos",
    title: "Niterói Vazamentos",
    description: "Desenvolvi um protótipo de plataforma colaborativa para registrar e monitorar vazamentos de água em Niterói, com mapa interativo, filtros por bairro, status e data, além de indicadores para acompanhar as ocorrências.",
    image: ["images/niteroi_vazamentos.png"],
    repoLink: "",
    shine: { primary: "68, 195, 255", secondary: "65, 220, 211", angle: "175deg" },
  },
  {
    id: "App Multiferramentas",
    title: "App Multiferramentas",
    description: "Desenvolvi um aplicativo desktop open source para Windows que centraliza o download, o processamento e a conversão de arquivos e mídias em uma única interface modular, com expansão prevista para upscale com IA e transcrição.",
    image: ["images/app_centralizador.png"],
    repoLink: "",
    shine: { primary: "188, 126, 255", secondary: "92, 161, 255", angle: "255deg" },
  },
  {
    id: "ChatBot WhatsApp com IA",
    title: "ChatBot WhatsApp com IA",
    description: "Desenvolvi um agente de IA integrado ao WhatsApp para automatizar atendimentos, captar leads e agendar reuniões, com validação de dados, controle de duplicidades, tratamento de erros e direcionamento inteligente das conversas.",
    image: ["images/chatbot-n8n.jpg"],
    repoLink: "",
    shine: { primary: "255, 165, 79", secondary: "235, 102, 173", angle: "195deg" },
  },
];
