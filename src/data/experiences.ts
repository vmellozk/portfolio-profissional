import type { Experience } from "../types/portfolio";

export const experiences: Experience[] = [
  {
    id: "agencia-f2f-business-intelligence",
    role: "Analista de Business Intelligence Pleno",
    company: "Agência F2F · Remoto, PJ",
    period: "Mai 2026 - Atual",
    highlights: [
      "Automatizei fluxos de coleta em Python com Jupyter para download, tratamento e consolidação de dados por meio de scripts e processos ETL, reduzindo atividades manuais de alimentar bases, retrabalho e inconsistências nas entregas analíticas.",
      "Estruturei bases e datasets no BigQuery/GCP utilizando SQL, integrando e tratando diferentes fontes para alimentar dashboards no Looker Studio e análises de performance para Brasil e LATAM.",
      "Desenvolvi queries em SQL, classificações e dashboards de Social Listening no Brandwatch, analisando Share of Voice, sentimento, alcance, engajamento, concorrentes, produtos e campanhas para identificar tendências, riscos e oportunidades de mercado.",
      "Reestruturei dashboards, bases e processos de governança, seguindo boas práticas de BI, modelagem e Data Quality, revisando fontes, cálculos, KPIs, Data Quality e segurança da informação, além de desenvolver auditorias de visibilidade de marcas em modelos de IA generativa para identificar oportunidades de melhorias.",
      "Desenvolvi relatório executivo H1 LATAM com cerca de 95 slides e análises de quatro mercados, definindo metodologias, garantindo Data Quality, taxonomias e critérios comparativos para avaliar performance, reputação e posicionamento competitivo.",
      "Estruturei soluções de BI e Marketing para clientes multinacionais, integrando várias frentes de dados em uma visão unificada de KPIs, aumentando a confiabilidade das análises e acelerando a geração de insights para decisões no Brasil e na América Latina.",
    ],
  },
  {
    id: "grupo-aguas-do-brasil",
    role: "Analista de Dados Pleno",
    company: "Grupo Águas do Brasil · Híbrido",
    period: "Ago 2025 - Mai 2026",
    highlightColumns: 2,
    highlights: [
      "Criei scripts Python, seguindo práticas de engenharia de dados, para automatizar a coleta de bases de fornecedores diferentes, fazendo o tratamento, validação e a atualização de dados em fluxos ETL/ELT, integrando APIs REST e automações web com Requests, Playwright e Selenium para alimentar dashboards e monitoramentos operacionais com dados confiáveis e atualizados.",
      "Criei dashboards corporativos do zero em Power BI, seguindo boas práticas de BI, conectados ao SQL Server por consultas SQL, utilizando DAX, Power Query e modelagem de dados para estruturar regras de negócio, indicadores e metas das concessionárias, apoiando a identificação de desvios e a tomada de decisão.",
      "Estruturei os scripts seguindo boas práticas de Clean Code e arquitetura, com backups, logs de execução, tratamento de exceções e alertas automáticos por e-mail, permitindo troubleshooting, análise de causa raiz e correção ágil de falhas nos processos de dados.",
      "Desenvolvi um BI de telemetria para monitorar o consumo de grandes clientes, comparando dados atuais com padrões históricos e integrando visão geográfica, status de comunicação e exibição em telão corporativo. Também criei scripts agendados para detectar anomalias, falhas de transmissão e desvios de consumo, com alertas automáticos por e-mail para tomada de decisão rápida.",
      "Reduzi em mais de 90% o tempo de geração dos reports mensais ao desenvolver uma automação em Python com Pandas, NumPy, Matplotlib e SMTP, tudo passando pelos cálculos e regra de negócio, cobrindo consolidação, validação, geração dos documentos por concessionária e envio automático.",
      "Realizei validações e cruzamentos entre relatórios, dashboards e sistemas internos, além de criar documentações de fluxos complexos, premissas e regras de negócio para apresentar análises à liderança, garantindo integridade das informações e direcionamentos estratégicos.",
      "Conduzi a padronização corporativa dos tipos de execução de serviços e o mapeamento das atividades de campo, em conjunto com especialista da área, consolidando as diretrizes em um Manual de Execução e fortalecendo a governança operacional.",
    ],
  },
  {
    id: "marks-mind-desenvolvedor-full-stack",
    role: "Desenvolvedor Full Stack",
    company: "Marks Mind (Startup) · Remoto",
    period: "Jul 2024 - Jan 2025",
    highlights: [
      "Modelei e desenvolvi de ponta a ponta, seguindo práticas de engenharia de software, uma plataforma de criação e comercialização de eBooks personalizados, utilizando Flask, banco de dados relacional e front-end com HTML, CSS e Jinja2, estruturados em uma arquitetura modular e preparada para evolução.",
      "Implementei o fluxo de processamento dos dados preenchidos pelos usuários para geração dinâmica dos eBooks e desenvolvi um sistema assíncrono de filas, reduzindo em até 60% o tempo médio de produção dos conteúdos e eliminando etapas manuais.",
      "Desenvolvi automações com Selenium para geração e publicação dos eBooks e integrei a plataforma à Kiwify, viabilizando o comissionamento automático por código de afiliado e a monetização dos usuários.",
      "Estruturei recursos de autenticação e segurança com hashing de senhas via Bcrypt, gerenciamento centralizado de variáveis de ambiente e disparos automáticos de e-mails por SMTP conforme os eventos da aplicação.",
      "Ampliei a experiência e o alcance da plataforma ao integrar a API do Google Translate para conteúdos multilíngues e o RapidFuzz para sugestões de busca e correção de erros de digitação na loja.",
      "Documentei a arquitetura, os módulos e os fluxos da aplicação, preparei o ambiente para deploy e atuei com versionamento, testes e ciclos rápidos de entrega, mantendo alinhamento direto com o gestor em uma equipe enxuta e de alta autonomia.",
    ],
  },
  {
    id: "exercito-brasileiro-oficial-r2",
    role: "Oficial R2",
    company: "Exército Brasileiro · RJ",
    period: "Jan 2020 - Jan 2021",
    highlights: [
      "Assumi funções de liderança estratégica e execução tática em um dos ambientes mais exigentes do país.",
      "Desenvolvi tomada de decisão sob pressão constante em ambientes com recursos limitados e alta responsabilidade, com foco em resultado, segurança e cumprimento de missão.",
      "Planejei e conduzi operações logísticas e administrativas com disciplina e foco em eficiência.",
      "Gerenciei equipes, recursos e comunicações, fortalecendo o trabalho em equipe sob cenários adversos.",
    ],
  },
];
