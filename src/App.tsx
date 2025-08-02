import React, { useRef, useState, useEffect } from "react";
import { Mail, Github, Instagram, Phone, Linkedin } from 'lucide-react';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const [technologiesPerPage, setTechnologiesPerPage] = useState(3);
  
  const [pageProjects, setPageProjects] = useState(0);
  const [projectsPerPage, setProjectsPerPage] = useState(3);

  // Ajusta quantidade por página conforme tamanho da tela
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width >= 1024) {
        setTechnologiesPerPage(3);
        setProjectsPerPage(3);
      } else if (width >= 768) {
        setTechnologiesPerPage(2);
        setProjectsPerPage(2);
      } else {
        setTechnologiesPerPage(1);
        setProjectsPerPage(1);
      }
      // Reset page index para evitar páginas inválidas
      setPage(0);
      setPageProjects(0);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const technologies = [
    { title: "Python", image: "images/python.png", description: "Linguagem utilizada em automações, back-end, integração com APIs RESTful, manipulação de dados com Pandas e scripts com Selenium. Já utilizei bibliotecas como Flask, Bcrypt e RapidFuzz, além de lógica aplicada para personalização com IA e geração de conteúdo dinâmico.", rating: 4 },
    { title: "Flask", image: "images/flask.png", description: "Usado para estruturar APIs RESTful robustas, com rotas, middleware, segurança, variáveis de ambiente. Foi a base do sistema principal da startup onde atuei, integrando banco de dados, filas de execução assíncronas e controle de acesso, onde preparei para deploy com Gunicorn e Nginx.", rating: 4 },
    { title: "Selenium", image: "images/selenium.png", description: "Ferramenta central para automações web. Desenvolvi robôs headless com manipulação de sessões, cookies e paginação, aplicando em fluxos reais como geração de eBooks com IA e publicações automatizadas integradas com plataformas externas.", rating: 4 },
    { title: "MySQL", image: "images/mysql.png", description: "Banco relacional adotado em projetos robustos com múltiplas entidades e permissões. Modelei estruturas relacionais com Prisma ORM, controle de migrations, seed automatizado e integração via Docker Compose, com foco em ambientes corporativos.", rating: 3 },
    { title: "Pandas", image: "images/pandas.png", description: "Utilizado em automações e manipulação de dados estruturados, com filtragens condicionais, tratamento de dados nulos/duplicados e transformações para leitura e escrita. Aplicado em pipelines e geração dinâmica de conteúdo com base em entrada de usuários.", rating: 3 },
    { title: "SQLite3", image: "images/sqlite3.png", description: "Primeiro SGBD que utilizei, ainda presente em projetos locais e scripts rápidos. Com ele aprendi sobre modelagem de dados, normalização, persistência local e criptografia de campos sensíveis. Hoje, uso principalmente como alternativa leve em protótipos.", rating: 3 },
    { title: "Docker", image: "images/docker.png", description: "Utilizado para orquestrar múltiplos serviços com Docker Compose, criar ambientes isolados para desenvolvimento e deploy, além de configuração de variáveis e uso de imagens personalizadas. Facilitou modularização e setup ágil dos projetos.", rating: 2 },
    { title: "TypeScript", image: "images/typescript.png", description: "Venho aprimorando em diferentes projetos, desde sites com front-end em React até aplicações full stack. Já utilizei em APIs com Express e Prisma, além de interfaces com tipagem estática, modularização e organização mais segura do código.", rating: 2 },
    { title: "JavaScript", image: "images/javascript.png", description: "Utilizado tanto no desenvolvimento de front-end (em React/Next.js) quanto em automações com n8n. Empregado para manipulação de DOM, validações, funções condicionais e lógica personalizada em fluxos automatizados com integração de APIs.", rating: 2 },
    { title: "HTML", image: "images/html.png", description: "Linguagem de marcação utilizada na estruturação de páginas e formulários em projetos próprios e profissionais. Trabalhei com templates Jinja2, construção de componentes reutilizáveis e integração com CSS e bibliotecas de JavaScript para enriquecer a interação.", rating: 2 },
    { title: "CSS", image: "images/css.png", description: "Aplicado para estilização de interfaces, responsividade e organização visual. Utilizei tanto em estruturas simples com CSS puro quanto com Tailwind CSS, priorizando clareza, acessibilidade e boa experiência do usuário em projetos reais e no portfólio.", rating: 2 },
  ];

  const totalPages = Math.ceil(technologies.length / technologiesPerPage);

  const scrollLeft = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const scrollRight = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  // Seleciona as tecnologias da página atual
  const currentTechnologies = technologies.slice(
    page * technologiesPerPage,
    (page + 1) * technologiesPerPage
  );

  // Função para PopUp
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = () => setIsPopupOpen(false);
  const openPopup = () => setIsPopupOpen(true);

  const scrollContainerProjects = useRef<HTMLDivElement | null>(null);

  const projects = [
    { id:"Niteroi Vazamentos", title: "Niterói Vazamentos", description: "Sistema de denúncias de vazamentos de água criado com o objetivo de beneficiar a comunidade local, com mapa e estatísticas.", image: "images/niteroi_vazamentos.png", repoLink: "https://github.com/vmellozk/sistema-vazamento-niteroi", viewProject: "https://github.com/vmellozk/sistema-vazamento-niteroi" },
    { id: "Sistema Financeiro", title: "Sistema Financeiro", description: "CRUD completo focado na organização de ativos, alocação de investimentos e no controle de clientes", image: "images/sistema_financeiro.png", repoLink: "https://github.com/vmellozk/crud-sistema-financeiro-node", viewProject: "https://github.com/vmellozk/crud-sistema-financeiro-node" },
    { id: "Downloader de Mídia", title: "Downloader Mídia", description: "Aplicativo para baixar vídeos e áudios de plataformas online com suporte a múltiplos formatos.", image: "images/downloader_midia_of.png", repoLink: "https://github.com/vmellozk/downloader-midia", viewProject: "https://youtu.be/5T__ed89DhM" },
    { id: "ChatBot WhatsApp com IA", title: "ChatBot WhatsApp com IA", description: "Automação de atendimento via WhatsApp com IA, integrando n8n, Google Sheets e Google Calendar.", image: "images/chatbot-n8n.jpg", repoLink: "https://github.com/vmellozk/n8n-atendimento-bot", viewProject: "https://github.com/vmellozk/n8n-atendimento-bot" },
    { id: "Criador de Legendas", title: "Criador de Legendas", description: "Ferramenta que gera legendas automaticamente a partir de áudios ou vídeos usando reconhecimento de fala.", image: "images/criador_legendas_of.png", repoLink: "https://github.com/vmellozk/Legendas_Auto", viewProject: "https://youtu.be/VgotVRvI0uw" },
    { id: "Encurtador de URL", title: "Encurtador URL", description: "Sistema que transforma links longos em versões curtas e personalizáveis, com registro de cliques.", image: "images/encurtador_url_of.png", repoLink: "https://github.com/vmellozk/encurtador-url", viewProject: "https://youtu.be/M-yneh7qwiU" },
    { id: "Automação de Certificados", title: "Automação de Certificados", description: "Sistema que gera e envia certificados personalizados automaticamente com base em formulários ou listas de presença.", image: "images/certificados_of.png", repoLink: "https://github.com/vmellozk/Certificados_Auto", viewProject: "https://github.com/vmellozk/Certificados_Auto" }
  ];

  const totalProjects = Math.ceil(projects.length / projectsPerPage);

  const scrollLeftprojects = () => {
    if (pageProjects > 0) {
      setPageProjects(pageProjects - 1);
    }
  };

  const scrollRightprojects = () => {
    if (pageProjects < totalProjects - 1) {
      setPageProjects(pageProjects + 1);
    }
  };

  // Seleciona os projetos da página atual
  const currentProjects = projects.slice(
    pageProjects * projectsPerPage,
    (pageProjects + 1) * projectsPerPage
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#061c30] to-[#093359] text-white font-sans">
    {/* Navbar */}
    <nav className="flex justify-between items-center px-4 md:px-8 py-6 bg-[#061c30]/50 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6213/6213731.png"
          alt="logo"
          className="w-10 h-10 mr-2"
        />
        <span className="text-xl font-bold"></span>
      </div>

      {/* Menu desktop */}
      <ul className="hidden md:flex gap-8 text-lg">
        <li>
          <a href="#hero" className="hover:text-[#1387f1] transition">
            Início
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-[#1387f1] transition">
            Sobre
          </a>
        </li>
        <li>
          <a href="#projects" className="hover:text-[#1387f1] transition">
            Projetos
          </a>
        </li>
        <li>
          <a href="#experience" className="hover:text-[#1387f1] transition">
            Experiência
          </a>
        </li>
        <li>
          <a href="#services" className="hover:text-[#1387f1] transition">
            Stack
          </a>
        </li>
      </ul>

      <a
        href="#contact"
        className="hidden md:inline-block ml-4 md:ml-6 px-5 md:px-6 py-2 rounded-full font-semibold bg-[#1387f1] shadow-lg hover:bg-[#093359] border border-[#1387f1] transition"
      >
        Contato
      </a>

      {/* Botão hamburger mobile */}
      <button
        className="md:hidden ml-4 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </nav>

    {/* Menu mobile */}
    {menuOpen && (
      <ul className="md:hidden flex flex-col items-center gap-6 bg-[#061c30]/90 backdrop-blur-md fixed top-[72px] left-0 right-0 z-40 py-6 text-lg">
        <li>
          <a
            href="#hero"
            className="hover:text-[#1387f1] transition"
            onClick={() => setMenuOpen(false)}
          >
            Início
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="hover:text-[#1387f1] transition"
            onClick={() => setMenuOpen(false)}
          >
            Sobre
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className="hover:text-[#1387f1] transition"
            onClick={() => setMenuOpen(false)}
          >
            Projetos
          </a>
        </li>
        <li>
          <a
            href="#experience"
            className="hover:text-[#1387f1] transition"
            onClick={() => setMenuOpen(false)}
          >
            Experiência
          </a>
        </li>
        <li>
          <a
            href="#services"
            className="hover:text-[#1387f1] transition"
            onClick={() => setMenuOpen(false)}
          >
            Stack
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="hover:text-[#1387f1] transition"
            onClick={() => setMenuOpen(false)}
          >
            Contato
          </a>
        </li>
      </ul>
    )}

      {/* Content sections */}
      <main className="pt-28 space-y-32">
        {/* Hero */}
        <section
          id="hero"
          className="container max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-8 items-center min-h-[70vh] px-4 sm:px-6"
        >
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <p className="uppercase tracking-wide text-sm text-[#4da5d2] mb-2">
              Victor Mello | Desenvolvedor Full Stack
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-2">
              Olá! Eu sou o Victor,
              <br />
              <span className="block text-[#1387f1]">seja bem vindo!</span>
            </h1>

            {/* Imagem SÓ no MOBILE */}
            <div className="flex justify-center items-center mt-6 lg:hidden">
              <img
                src="images/perfil.png"
                alt="Victor"
                className="rounded-2xl shadow-2xl w-56 sm:w-64 md:w-72 h-auto max-h-96 object-cover bg-[#093359]"
              />
            </div>

            <p className="text-[#dbd6d3] max-w-xl mx-auto lg:mx-0 text-sm sm:text-base md:text-lg">
              Aqui você vai encontrar projetos que unem tecnologia e propósito.
              Tenho experiência com Python, Flask, Selenium, TypeScript e Inteligência Artificial, tendo desenvolvido do zero uma plataforma de e-commerce que automatiza a geração e venda de eBooks personalizados.
              Graduado em Análise e Desenvolvimento de Sistemas, atuo como desenvolvedor full stack e atualmente curso uma Pós-Graduação em Engenharia de Dados, com foco em transformar dados em decisões inteligentes e estratégicas.
              Além da tecnologia, trago comigo a disciplina e a determinação de quem assumiu funções de liderança estratégica e execução tática em um dos ambientes mais exigentes do país: o Exército Brasileiro, onde atuei como Oficial R2.
              Nas horas vagas, costumo jogar no computador, pedalar, correr e, às vezes, curtir uma praia ou cachoeira com amigos.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-4">
              <a
                href="docs/Curriculo.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full bg-[#1387f1] hover:bg-[#093359] transition font-medium"
              >
                Currículo
              </a>
            </div>
          </div>

          {/* Imagem SÓ no DESKTOP */}
          <div className="hidden lg:flex flex-1 justify-center items-center mt-10 lg:mt-0">
            <img
              src="images/perfil.png"
              alt="Victor"
              className="rounded-2xl shadow-2xl w-56 sm:w-64 md:w-72 lg:w-80 h-auto max-h-96 object-cover bg-[#093359]"
            />
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="container max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center rounded-3xl p-6 md:p-10 bg-[#061c30]/80 shadow-xl relative"
        >
          <div className="flex justify-center md:justify-start">
            <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full max-w-[500px] aspect-[2/3] md:aspect-auto">
              <img
                src="images/exercito.png"
                alt="Victor"
                className="rounded-xl object-cover w-full h-full"
              />
              <img
                src="images/code.png"
                alt="Victor"
                className="rounded-xl object-cover w-full h-full col-span-2"
              />
              <img
                src="images/bike.jpg"
                alt="Victor"
                className="rounded-xl object-cover w-full h-full row-span-2"
              />
              <img
                src="images/planejamento.png"
                alt="Victor"
                className="rounded-xl object-cover w-full h-full"
              />
              <img
                src="images/bike_sorriso.png"
                alt="Victor"
                className="rounded-xl object-cover w-full h-full"
              />
              <img
                src="images/codigo.png"
                alt="Victor"
                className="rounded-xl object-cover w-full h-full col-span-2"
              />
            </div>
          </div>

          <div className="space-y-5 px-4 md:px-0 text-center md:text-left">
            <h4 className="uppercase tracking-widest text-[#4da5d2] font-semibold"> Sobre mim </h4>

            <h2 className="text-2xl sm:text-3xl md:text-3xl font-extrabold mb-3">
              Desenvolvedor Full Stack e um Aspirante à Engenheiro de Dados.
            </h2>

            <p className="text-[#dbd6d3] text-sm sm:text-base leading-relaxed">
              Sou uma pessoa centrada e comprometida, com uma trajetória marcada por experiências diversas que moldaram minha forma de pensar e atuar. Atuei como Oficial R2 do Exército Brasileiro, trabalhei com atendimento ao público e também na área financeira — vivências que fortaleceram minha disciplina, adaptabilidade e visão sistêmica.
            </p>
            <p className="text-[#dbd6d3] text-sm sm:text-base leading-relaxed">
              Em 2021, decidi direcionar minha carreira para a área de tecnologia, trocando de curso e mergulhando em Análise e Desenvolvimento de Sistemas, graduação concluída em 2023. Atuei como estagiário em uma startup, criei projetos para a comunidade e aprendi que a evolução vem com cada desafio que decidimos enfrentar de verdade.
            </p>
            <p className="text-[#dbd6d3] text-sm sm:text-base leading-relaxed">
              Desde então, venho direcionando meu desenvolvimento para atender às demandas do mercado de tecnologia e dados. Tenho me aprofundado em modelagem, pipelines, integrações com APIs e automações voltadas à eficiência e escalabilidade. Estudo práticas modernas de engenharia de dados — como ETL/ELT, orquestração de fluxos e uso estratégico de bancos relacionais e NoSQL — com foco em construir soluções que gerem valor real aos negócios.
            </p>
            <p className="text-[#dbd6d3] text-sm sm:text-base leading-relaxed">
              Gosto de tecnologia e esportes, e valorizo momentos mais tranquilos estando em contato com a natureza — normalmente sou do tipo que prefere a paz de casa aos agitos do fim de semana. Não bebo, mas tenho dois hobbies dos quais não abro mão: o computador e a bicicleta.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mt-8 justify-center md:justify-start text-center sm:text-left">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1387f1]">Graduação</h3>
                <div className="uppercase text-xs sm:text-sm text-[#dbd6d3]">
                  Anál. Desenv. Sistemas,
                  <br />
                  Anhanguera
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1387f1]">Pós-Grad</h3>
                <div className="uppercase text-xs sm:text-sm text-[#dbd6d3]">
                  Engenharia de Dados,
                  <br />
                  Anhanguera (Cursando)
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1387f1]">1.000.000+</h3>
                <div className="uppercase text-xs sm:text-sm text-[#dbd6d3]">
                  Views - Redes Sociais
                </div>
              </div>
            </div>

            <button
              onClick={openPopup}
              className="inline-block mt-8 px-6 py-2 rounded-full bg-[#1387f1] hover:bg-[#093359] transition font-semibold"
            >
              Cursos e Certificados
            </button>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h4 className="uppercase tracking-widest text-[#4da5d2] font-semibold mb-3 text-center lg:text-left">Meu trabalho</h4>
          <h2 className="text-3xl font-extrabold mb-8 text-center lg:text-left">Projetos Recentes</h2>

          <div className="relative">
            <button
              onClick={scrollLeftprojects}
              className="absolute left-1 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full z-10 hover:bg-[#1387f1] sm:left-0"
              aria-label="Scroll Left"
            >
              ◀
            </button>

            <div
              ref={scrollContainerProjects}
              className="overflow-x-auto scroll-smooth py-4 scrollbar-hide flex gap-4 justify-center"
              style={{ margin: '0 auto' }}
            >
              {currentProjects.map(({ id, title, description, image, repoLink, viewProject }) => (
                <div
                  key={id}
                  className="flex-shrink-0 w-72 sm:w-72 md:w-80 bg-[#093359] rounded-2xl p-6 shadow-lg flex flex-col justify-between gap-4 transition-all duration-300 min-h-[26rem] min-w-[18rem]"
                >
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-40 object-cover rounded-xl mb-3"
                  />
                  <div className="flex flex-col flex-grow">
                    <div className="uppercase text-xs text-[#4da5d2] font-semibold">{title}</div>
                    <div className="mt-1 text-[#dbd6d3] flex-grow">{description}</div>

                    <div className="mt-4 flex gap-2 justify-center">
                      <a
                        href={repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#4da5d2] hover:bg-[#1387f1] text-white text-sm px-4 py-2 rounded-md transition-colors duration-200"
                      >
                        Repositório
                      </a>
                      <a
                        href={viewProject}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent border border-[#4da5d2] hover:bg-[#1387f1] text-white text-sm px-4 py-2 rounded-md transition-colors duration-200"
                      >
                        Ver Projeto
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={scrollRightprojects}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full z-10 hover:bg-[#1387f1] sm:right-0"
              aria-label="Scroll Right"
            >
              ▶
            </button>
          </div>
        </section>

        {/* Stacks */}
        <section id="services" className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h4 className="uppercase tracking-widest text-[#4da5d2] font-semibold mb-3 text-center lg:text-left">Stacks</h4>
          <h2 className="text-3xl font-extrabold mb-8 text-center lg:text-left">
            Algumas <span className="text-[#1387f1]">tecnologias</span> que uso ou já usei
          </h2>

          <div className="relative">
            <button
              onClick={scrollLeft}
              className="absolute left-1 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full z-10 hover:bg-[#1387f1] sm:left-0"
              aria-label="Scroll Left"
            >
              ◀
            </button>

            <div
              ref={scrollContainer}
              className="overflow-x-auto scroll-smooth py-4 scrollbar-hide flex gap-4 justify-center"
              style={{ margin: '0 auto' }}
            >
              {currentTechnologies.map(({ title, image, description, rating }) => (
                <div
                  key={title}
                  className="bg-[#093359] rounded-2xl p-6 shadow-lg flex flex-col items-center text-center w-56 sm:w-64 h-[420px] flex-shrink-0 transition-all duration-300 min-h-[26rem] min-w-[18rem]"
                >
                  <img src={image} alt={title} className="h-20 my-3" />
                  <div className="text-lg font-bold mb-2 text-white">{title}</div>
                  <div className="text-[#dbd6d3] mb-4 mt-4 text-sm overflow-auto max-h-[250px]">{description}</div>

                  <div className="flex gap-1 mt-auto mb-2 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 inline"
                        fill={i < rating ? "#FFD700" : "#444"}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.001 5.789 1.417 8.905L12 18.896l-7.416 4.104 1.417-8.905-6.001-5.789 8.332-1.151z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={scrollRight}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full z-10 hover:bg-[#1387f1] sm:right-0"
              aria-label="Scroll Right"
            >
              ▶
            </button>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h4 className="uppercase tracking-widest text-[#4da5d2] font-semibold mb-3 text-center lg:text-left">
            Experiência
          </h4>
          <h2 className="text-3xl font-extrabold mb-8 text-center lg:text-left">
            Minha experiência profissional como <span className="text-[#1387f1]">Desenvolvedor</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-1">
            {[1].map((i) => (
              <div
                key={i}
                className="bg-[#093359] rounded-2xl p-6 shadow-lg flex flex-col gap-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2 flex-wrap">
                  <span className="bg-[#1387f1] text-xs px-3 py-1 rounded-full font-bold mr-0 sm:mr-2 whitespace-nowrap">
                    Desenvolvedor Full Stack
                  </span>
                  <span className="text-[#4da5d2] whitespace-nowrap">Prática Sênior - Marks Mind</span>
                  <span className="ml-0 sm:ml-auto text-[#dbd6d3] text-xs whitespace-nowrap">
                    Julho 2024 - Janeiro 2025 • Estágio
                  </span>
                </div>
                <div className="text-[#dbd6d3] text-sm max-h-80 overflow-auto leading-relaxed">
                  Plataforma desenvolvida do zero para automatizar a geração e venda de eBooks personalizados a partir de formulários preenchidos por usuários. O sistema inclui controle de fila assíncrono, funcionalidades de afiliados, loja online, integração com IA, suporte multilíngue, envio automatizado de e-mails e publicação automática dos produtos com código de comissão, otimizando a operação e escalabilidade da plataforma.
                </div>

                {/* Principais Responsabilidades */}
                <div>
                  <h3 className="text-[#1387f1] font-semibold text-lg mb-2">Principais Responsabilidades:</h3>
                  <ul className="list-disc pl-5 text-[#dbd6d3] text-sm space-y-2">
                    <li>
                      <strong>Desenvolvimento Full Stack:</strong>
                      <ul className="list-inside list-decimal pl-5 mt-1 space-y-1">
                        <li>
                          <strong>Back-end:</strong> Modelei toda a arquitetura com Python e Flask, estruturando APIs para geração, tradução e publicação de eBooks com IA. Implementei controle assíncrono de filas, integração com SQLite3 e automações com Selenium para publicação automatizada dos produtos na plataforma de vendas com link de afiliado.
                        </li>
                        <li>
                          <strong>Front-end:</strong> Desenvolvi a interface com HTML, CSS e Jinja2, priorizando a usabilidade no preenchimento do formulário e navegação na loja. Adicionei campo de busca inteligente com correção automática usando RapidFuzz.
                        </li>
                        <li>
                          <strong>Infraestrutura:</strong> Estruturei o deploy com organização modular, variáveis de ambiente (.env) centralizadas e preparo da aplicação para produção com Gunicorn e Nginx.
                        </li>
                        <li>
                          <strong>Segurança e Integrações:</strong> Configurei hashing de senhas com Bcrypt, envio automático de e-mails via SMTP, integração com a Google Translate API para conteúdo multilíngue e sistema de comissão por afiliados com Kiwify.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                {/* Resultados e Impacto */}
                <div>
                  <h3 className="text-[#1387f1] font-semibold text-lg mb-2">Resultados e Impacto:</h3>
                  <ul className="list-disc pl-5 text-[#dbd6d3] text-sm space-y-2">
                    <li>Reduzi em mais de 80% o tempo total necessário para gerar, personalizar e publicar eBooks com IA.</li>
                    <li>Eliminei tarefas manuais, automatizando geração, tradução e publicação, aumentando a escalabilidade do negócio.</li>
                    <li>Ampliei o alcance da plataforma para públicos internacionais com suporte multilíngue dinâmico.</li>
                    <li>Melhorei a experiência de navegação e busca na loja com correção automática de palavras digitadas incorretamente.</li>
                    <li>Gerei renda passiva para os usuários com sistema de comissionamento automático via link de afiliado.</li>
                  </ul>
                </div>

                {/* Soft Skills Adquiridas */}
                <div>
                  <h3 className="text-[#1387f1] font-semibold text-lg mb-2">Soft Skills Adquiridas:</h3>
                  <ul className="list-disc pl-5 text-[#dbd6d3] text-sm space-y-2">
                    <li><strong>Comunicação com Stakeholders:</strong> Mantive alinhamento constante com o gestor do projeto, garantindo clareza nas entregas e prioridades.</li>
                    <li><strong>Autonomia Técnica:</strong> Assumi a liderança técnica da arquitetura e desenvolvimento, desde a concepção até o deploy.</li>
                    <li><strong>Trabalho em Equipe:</strong> Colaborei em equipe enxuta com versionamento, controle de tarefas e testes contínuos em ambiente ágil.</li>
                    <li><strong>Organização e Documentação:</strong> Documentei todo o sistema para facilitar manutenções futuras e expansão da plataforma.</li>
                  </ul>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 px-6 md:px-8 py-10 md:py-12 bg-[#061c30]/90 rounded-3xl shadow-2xl items-center"
        >
          <div className="flex flex-col items-center text-center md:text-left">
            <img
              src="images/codando.png"
              alt="Victor"
              className="rounded-2xl w-56 h-64 sm:w-72 sm:h-80 object-cover mb-6"
            />
            <div className="text-lg font-bold mb-3">Entre em contato</div>
            <div className="text-[#dbd6d3] text-sm max-w-md">
              Construo soluções escaláveis com foco no problema, não só no código.
              Me chama e vamos conversar sobre seu projeto.
            </div>
            <div className="mt-8 flex justify-center md:justify-start gap-6 text-[#1387f1]">
              <a
                href="mailto:contato.devictormello@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-600 transition-colors" />
              </a>
              <a
                href="https://github.com/vmellozk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-600 transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/vxctormello/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-600 transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/vmellozk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-600 transition-colors" />
              </a>
              <a
                href="https://wa.me/5521970975762"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-600 transition-colors" />
              </a>
            </div>
          </div>

          <form
            action="https://formsubmit.co/contato.devictormello@gmail.com"
            method="POST"
            target="_blank"
            className="flex flex-col gap-4 max-w-md mx-auto md:mx-0 min-w-[18rem]"
          >
            <input
              type="text"
              placeholder="Nome"
              name="name"
              required
              className="bg-[#093359] p-4 rounded-xl outline-none placeholder:text-[#4da5d2] focus:ring-2 ring-[#1387f1] transition"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              className="bg-[#093359] p-4 rounded-xl outline-none placeholder:text-[#4da5d2] focus:ring-2 ring-[#1387f1] transition"
            />
            <input
              type="text"
              placeholder="Assunto"
              className="bg-[#093359] p-4 rounded-xl outline-none placeholder:text-[#4da5d2] focus:ring-2 ring-[#1387f1] transition"
            />
            <textarea
              placeholder="Mensagem"
              rows={4}
              className="bg-[#093359] p-4 rounded-xl outline-none placeholder:text-[#4da5d2] focus:ring-2 ring-[#1387f1] resize-none transition"
            />
            <button
              type="submit"
              className="mt-2 px-6 py-3 bg-[#1387f1] rounded-full text-lg font-semibold hover:bg-[#093359] border border-[#1387f1] transition"
            >
              Enviar
            </button>
          </form>
        </section>
      </main>

      {/* PopUp - Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-[#061c30] text-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative border border-[#1387f1]">
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-[#1387f1] hover:text-white transition text-3xl sm:text-2xl p-1 sm:p-0 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1387f1]"
              aria-label="Fechar modal"
            >
              ✕
            </button>

            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#4da5d2]"></h3>
            <ul className="list-disc list-inside space-y-2 text-[#dbd6d3] text-xs sm:text-sm text-left">
              <li>Cloud Foundations | AWS Academy</li>
              <li>Python - Análise e Estrutura de Dados | Anhanguera</li>
              <li>Data Warehouse ELT com Python, SQL e DBT-CORE | Jornada de Dados</li>
              <li>Pipeline ETL com Python | Jornada de Dados</li>
              <li>Banco de Dados e SQL | Udemy</li>
              <li>Engenharia de Dados | Udemy</li>
              <li>Inglês | Udemy</li>
              <li>Power BI - Análise e Modelagem de Dados | Fundação Bradesco</li>
              <li>Microsoft Excel | Fundação Bradesco</li>
              <br></br>
            </ul>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="pt-8 pb-6 text-center text-xs sm:text-sm text-[#4da5d2] select-none">
        Se você não mudar, nada muda!
      </footer>

    </div>
  );
}
