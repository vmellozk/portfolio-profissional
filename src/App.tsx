import React, { useRef, useState } from "react";
import { Mail, Github, Instagram, Phone, Linkedin } from 'lucide-react';

export default function App() {
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);

  const technologies = [
    { title: "Python", image: "images/python.png", description: "Linguagem principal utilizada para automação, desenvolvimento de bots e testes automatizados, com forte aplicação em back-end e scripts com APIs RESTful. Também uso Scikit Learn e Spark, para Machine Learning e BigData.", rating: 4 },
    { title: "SQLite3", image: "images/sqlite3.png", description: "Banco de dados relacional onde já fiz: estrutura de dados, modelagem de tabelas, consultas, filtros, persistência de dados, criptografia de dados sensíveis e boas práticas de normalização e otimização de desempenho. ", rating: 4 },
    { title: "Selenium", image: "images/selenium.png", description: "Ferramenta de automação utilizada para testes end-to-end e criação de robôs. Já implementei paginação, gerenciamento de cookies e sessões, modo headless com suporte a Xvfb e integração Docker.", rating: 4 },
    { title: "Flask", image: "images/flask.png", description: "Microframework em Python para construir APIs RESTful e aplicações web. Já fiz rotas com métodos HTTP, middleware de segurança, integração com banco de dados, controle de fila e configurei ambientes de produção com Gunicorn e Nginx.", rating: 4 },
    { title: "Pandas", image: "images/pandas.png", description: "Biblioteca para análise, tratamento e manipulação de dados em estruturas DataFrames, usada em projetos de automação e Data Science. Já usei para leitura, escrita, tratamento de dados nulos ou duplicados e filtragens condicionais.", rating: 3 },
    { title: "Docker", image: "images/docker.png", description: "Plataforma de contêineres para empacotar aplicações e seus ambientes, garantindo portabilidade, isolamento e facilidade de deploy. Criei imagem personalizada com Dockerfile, defini ambientes e orquestrei aplicações.", rating: 2 },
    { title: "MySQL", image: "images/mysql.png", description: "Sistema de gerenciamento de banco de dados relacional robusto. Apesar de ter maior domínio com outro SGBD, venho me aperfeiçoando aqui. Utilizado em projetos pessoais para criação e modelagem de tabelas relacionais.", rating: 2 },
    { title: "TypeScript", image: "images/typescript.png", description: "Superset do JavaScript que adiciona tipagem estática ao código, sendo mais confiável e robusto. Tive contato durante a construção deste portfólio, aplicando conceitos básicos e estruturação de componentes. Ainda em aprendizado contínuo.", rating: 2 },
    { title: "JavaScript", image: "images/javascript.png", description: "Linguagem para o desenvolvimento web para tornar interfaces mais dinâmicas e interativas. Já apliquei funcionalidades básicas de formulários, manipulação de DOM e integração de APIs. Ainda em aprendizado contínuo.", rating: 2 },
    { title: "C#", image: "images/csharp.png", description: "Linguagem orientada a objetos utilizada em aplicações desktop e web. Estou em processo contínuo de aprendizado e sigo explorando suas aplicações em diferentes contextos de desenvolvimento.", rating: 1 },
    { title: "Java", image: "images/java.png", description: "Linguagem versátil usada para aplicações multiplataforma. Estou em processo contínuo de aprendizado e sigo explorando suas aplicações em diferentes contextos de desenvolvimento.", rating: 1 },
    { title: "React Native", image: "images/reactnative.png", description: "Framework para desenvolvimento mobile, utilizado para criar aplicações nativas para Android e iOS. Estou em processo contínuo de aprendizado e sigo explorando suas aplicações em diferentes contextos de desenvolvimento.", rating: 1 },
    { title: "HTML", image: "images/html.png", description: "Linguagem de marcação estruturante das páginas web. Apesar de não ser o meu foco, possuo conhecimentos básicos, já tendo utilizado em projetos estruturando páginas, criando formulários, tabelas e integrado CSS e JavaScript.", rating: 3 },
    { title: "CSS", image: "images/css.png", description: "Linguagem de estilo para personalizar o layout e a aparência visual das páginas web. Apesar de não ser o meu foco, possuo conhecimentos básicos, já tendo utilizado em projetos estilizando páginas, ajustando layouts e interações visuais.", rating: 3 },
  ];

  const technologiesPerPage = 3;
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
  const [pageProjects, setPageProjects] = useState(0);

  const projects = [
    { id: "Downloader de Mídia", title: "Downloader de Mídia", description: "Aplicativo para baixar vídeos e áudios de plataformas online com suporte a múltiplos formatos.", image: "images/downloader_midia_of.png", repoLink: "https://github.com/vmellozk/downloader-midia", viewProject: "https://" },
    { id: "Criador de Legendas", title: "Criador de Legendas", description: "Ferramenta que gera legendas automaticamente a partir de áudios ou vídeos usando reconhecimento de fala.", image: "images/criador_legendas_of.png", repoLink: "https://github.com/vmellozk/Legendas_Auto", viewProject: "https://" },
    { id: "Encurtador de URL", title: "Encurtador URL", description: "Sistema que transforma links longos em versões curtas e personalizáveis, com registro de cliques.", image: "images/encurtador_url_of.png", repoLink: "https://github.com/vmellozk/encurtador-url", viewProject: "https://" },
    { id: "Automação de Certificados", title: "Automação de Certificados", description: "Sistema que gera e envia certificados personalizados automaticamente com base em formulários ou listas de presença.", image: "images/certificados_of.png", repoLink: "https://github.com/vmellozk/Certificados_Auto", viewProject: "https://" },
    { id: "Bot Discord", title: "Bot Discord (Em Desenvolvimento)", description: "Bot automatizado para Discord com comandos personalizados e integração com APIs externas.", image: "images/bot_discord_of.png", repoLink: "https://github.com/vmellozk/Bot_Discord", viewProject: "https://" }
  ];

  const projectsPerPage = 3;
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
      <nav className="flex justify-between items-center px-8 py-6 bg-[#061c30]/50 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6213/6213731.png"
            alt="logo"
            className="w-10 h-10 mr-2"
          />
          <span className="text-xl font-bold"></span>
        </div>
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
          className="ml-6 px-6 py-2 rounded-full font-semibold bg-[#1387f1] shadow-lg hover:bg-[#093359] border border-[#1387f1] transition"
        >
          Contato
        </a>
      </nav>

      {/* Content sections */}
      <main className="pt-28 space-y-32">
        {/* Hero */}
        <section
          id="hero"
          className="container max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-8 items-center min-h-[70vh]"
        >
          <div className="flex-1 space-y-6">
            <p className="uppercase tracking-wide text-sm text-[#4da5d2] mb-2">
              Victor Mello | Desenvolvedor Backend
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-2">
              Olá! Eu sou o Victor,
              <br />
              <span className="block text-[#1387f1]">Desenvolvedor Backend Jr.</span>
            </h1>
            <p className="text-[#dbd6d3] max-w-xl">
            Tenho 24 anos e 1 ano de experiência atuando com Python, Flask e Selenium, desenvolvendo sistemas eficientes e escaláveis, com foco em dados e backend. Sou Graduado e Pós-Graduado, e atualmente estudo outras tecnologias para expandir minha base como desenvolvedor backend — sempre mantendo meu foco principal em dados e infraestrutura. Sou apaixonado por inovação e tenho como objetivo me tornar Engenheiro de Dados.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="files/Curriculo.pdf" target="_blank" className="px-6 py-2 rounded-full bg-[#1387f1] hover:bg-[#093359] transition font-medium">Currículo</a>

              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full">
                <img src="images/python.png" alt="Python"/>
              </a>
              <a href="#" className="w-9 h-10 flex items-center justify-center rounded-full">
                <img src="images/database.png" alt="SQL"/>
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full">
                <img src="images/selenium.png" alt="CSS"/>
              </a>
              <a href="#" className="w-11 h-10 flex items-center justify-center rounded-full">
                <img src="images/flask.png" alt="HTML"/>
              </a>
            </div>
            
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img
              src="images/perfil.png"
              alt="Victor"
              className="rounded-2xl shadow-2xl w-80 h-96 object-cover bg-[#093359]"
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container max-w-6xl mx-auto grid md:grid-cols-2 gap-2 items-center rounded-3xl p-10 bg-[#061c30]/80 shadow-xl relative">
        <div className="flex gap-6">
          <div className="grid grid-cols-3 grid-rows-3 gap-2 w-[500px] h-[750px]">
            <img src="images/exercito.png" alt="Victor" className="rounded-xl object-cover w-full h-full" />
            <img src="images/code.png" alt="Victor" className="rounded-xl object-cover w-full h-full col-span-2" />
            <img src="images/bike.jpg" alt="Victor" className="rounded-xl object-cover w-full h-full row-span-2" />
            <img src="images/planejamento.png" alt="Victor" className="rounded-xl object-cover w-full h-full" />
            <img src="images/bike_sorriso.png" alt="Victor" className="rounded-xl object-cover w-full h-full" />
            <img src="images/codigo.png" alt="Victor" className="rounded-xl object-cover w-full h-full col-span-2" />
          </div>
          </div>

          <div className="space-y-5">
            <h4 className="uppercase tracking-widest text-[#4da5d2] font-semibold"> Sobre mim </h4>
            
            <h2 className="text-3xl font-extrabold mb-3">
              Desenvolvedor Backend e um Aspirante à Engenheiro de Dados.
            </h2>

            <p className="text-[#dbd6d3]">
            Sou uma pessoa centrada e comprometida, com uma trajetória marcada por experiências diversas que moldaram minha forma de pensar e atuar. Atuei como Oficial R2 do Exército Brasileiro, trabalhei com atendimento ao público e também na área financeira — vivências que fortaleceram minha disciplina, adaptabilidade e visão sistêmica.
            </p>
            <p className="text-[#dbd6d3]">
            Em 2021, decidi direcionar minha carreira para a área de tecnologia, trocando de curso e mergulhando em Análise e Desenvolvimento de Sistemas, graduação concluída em 2023. Na sequência, iniciei uma pós-graduação em Gestão de Dados - Big Data e dei os primeiros passos na área como estagiário em Desenvolvimento FullStack.
            </p>
            <p className="text-[#dbd6d3]">
            Desde então, venho consolidando minha base técnica e ampliando meu repertório com foco em backend e engenharia de dados. Sigo em constante evolução, sempre em busca de desafios que me permitam criar soluções robustas, eficientes e alinhadas às necessidades reais dos projetos.
            </p>
            <p className="text-[#dbd6d3]">
            Gosto de tecnologia e esportes, e valorizo momentos mais tranquilos estando em contato com a natureza — normalmente sou do tipo que prefere a paz de casa aos agitos do fim de semana. Não bebo, mas tenho dois hobbies dos quais não abro mão: o computador e a bicicleta.
            </p>

            <div className="flex gap-8 mt-8">
               <div>
                 <h3 className="text-xl font-bold text-[#1387f1]">Graduação</h3>
                 <div className="uppercase text-xs text-[#dbd6d3]">Anál. Desenv. Sistemas,<br></br>Anhanguera</div>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-[#1387f1]">Pós-Graduação</h3>
                 <div className="uppercase text-xs text-[#dbd6d3]">Gestão de Dados - BigData,<br></br>Estácio</div>
               </div>
               <div>
                 <h3 className="text-xl font-bold text-[#1387f1]">1.000.000+</h3>
                 <div className="uppercase text-xs text-[#dbd6d3]"> Views - Redes Sociais,<br></br>Nicho Gamer</div>
               </div>

            </div>
            <button onClick={openPopup} className="inline-block mt-8 px-6 py-2 rounded-full bg-[#1387f1] hover:bg-[#093359] transition font-semibold">Cursos e Certificados</button>
          </div>

         </section>

        {/* Projects */}
        <section id="projects" className="container max-w-6xl mx-auto">
          <h4 className="uppercase tracking-widest text-[#4da5d2] font-semibold mb-3">Meu trabalho</h4>
          <h2 className="text-3xl font-extrabold mb-8">
            Projetos Recentes
            </h2>

          <div className="relative">
            <button onClick={scrollLeftprojects} className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full z-10 hover:bg-[#1387f1]">◀</button>
          
            <div
              ref={scrollContainerProjects}
              className="overflow-x-auto scroll-smooth px-14 py-4 scrollbar-hide"
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '0 auto',}}
            >
            {currentProjects.map(({id, title, description, image, repoLink, viewProject }) => (
              <div className="w-[300px] bg-[#093359] rounded-2xl p-6 shadow-lg flex flex-col justify-between gap-4 transtition-all duration-300">
                <img
                  src={`${image}`}
                  alt={`${id}`}
                  className="w-full h-40 object-cover rounded-xl mb-3" 
                />
                <div className="flex flex-col flex-grow">
                  <div className="uppercase text-xs text-[#4da5d2] font-semibold">{title}</div>
                  <div className="mt-1 text-[#dbd6d3] flex-grow">{description}</div>

                  <div className="mt-4 flex gap-2 justify-center">
                    <a href={repoLink} target="_blank" className="bg-[#4da5d2] hover:bg-[#1387f1] text-white text-sm px-4 py-2 rounded-md transition-colors duration-200">Repositório</a>
                    <a href={viewProject} target="_blank" className="bg-transparent border border-[#4da5d2] hover:bg-[#1387f1] text-white text-sm px-4 py-2 rounded-md transition-colors duration-200">Ver Projeto</a>
                  </div>
                </div>
              </div>
            ))}
            </div>
            <button onClick={scrollRightprojects} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full z-10 hover:bg-[#1387f1]">▶</button>
          </div>
        </section>

        {/* Stacks */}
        <section id="services" className="container max-w-6xl mx-auto">
          <h4 className="uppercase tracking-widest text-[#4da5d2] font-semibold mb-3">Stacks</h4>
          <h2 className="text-3xl font-extrabold mb-8">
            Algumas <span className="text-[#1387f1]">tecnologias</span> que uso ou já usei
          </h2>

          <div className="relative">
            <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full z-10 hover:bg-[#1387f1]">◀</button>

            <div
              ref={scrollContainer}
              className="overflow-x-auto scroll-smooth px-14 py-4 scrollbar-hide"
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '0 auto',}}
            >
              {currentTechnologies.map(({ title, image, description, rating }) => (
                <div
                  key={title}
                  className="bg-[#093359] rounded-2xl p-6 shadow-lg flex flex-col items-center text-center w-64 h-[420px] flex-shrink-0 transition-all duration-300"
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
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.001 5.789 1.417 8.905L12 18.896l-7.416 4.104 1.417-8.905-6.001-5.789 8.332-1.151z"/>
                        </svg>
                    ))}
                  </div>
                  
                </div>
              ))}
            </div>

            <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full z-10 hover:bg-[#1387f1]">▶</button>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="container max-w-6xl mx-auto">
          <h4 className="uppercase tracking-widest text-[#4da5d2] font-semibold mb-3">
            Experiência
          </h4>
          <h2 className="text-3xl font-extrabold mb-8">
            Minha experiência profissional como <span className="text-[#1387f1]">Desenvolvedor</span>
          </h2>
          <div className="grid md:grid-cols-1 gap-8">
            {[1].map((i) => (
              <div
                key={i}
                className="bg-[#093359] rounded-2xl p-6 shadow-lg flex flex-col gap-2"
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="bg-[#1387f1] text-xs px-3 py-1 rounded-full font-bold mr-2">
                    Desenvolvedor Full Stack
                  </span>
                  <span className="text-[#4da5d2]">Prática Sênior - Marks Mind</span>
                  <span className="ml-auto text-[#dbd6d3] text-xs">
                    Julho 2024 - Janeiro 2025 • Estágio
                  </span>
                </div>
                <div className="text-[#dbd6d3] text-sm pb-1">
                Desenvolvimento de uma plataforma inovadora para geração e comercialização de eBooks personalizados com base em formulários interativos preenchidos por profissionais. O sistema utiliza Inteligência Artificial para gerar conteúdo único e personalizado, oferecendo uma experiência de compra e venda automatizada. A plataforma inclui funcionalidades avançadas, como sistema de afiliados, cadastro de usuários, loja online, e suporte a múltiplos idiomas.
                </div>

                {/* Principais Responsabilidades */}
                <div className="mt-4">
                  <h3 className="text-[#1387f1] font-semibold text-lg">Principais Responsabilidades:</h3>
                  <ul className="list-disc pl-5 text-[#dbd6d3] text-sm">
                    <div className="mt-2"></div>
                      <li><strong>Desenvolvimento Full Stack:</strong>

                      <ul className="list-inside list-decimal">
                        <div className="mt-2"></div>
                          <li><strong>Back-end:</strong> Estruturei a lógica do servidor usando Python e Flask, criando APIs robustas para gerenciar a interação entre os dados dos usuários, a geração de eBooks e o processamento de vendas. Implementei integração com o banco de dados SQLite3, modelando as tabelas para gerenciar dados de usuários, respostas, eBooks e transações de vendas. Além disso, configurei o processo de cadastro automatizado de produtos na plataforma de vendas, integrando com o sistema de e-commerce, fiz integração de IAs, processamento de filas e envio de emails automatizados.</li>
                        
                        <div className="mt-2"></div>
                          <li><strong>Front-end:</strong> Estruturei junto com outro Desenvolvedor interfaces responsivas com HTML, CSS e JavaScript, com foco na experiência do usuário, otimizando a navegação para personalização dos eBooks e melhorando a jornada de compra.</li>
                      </ul>
                    </li>
                  </ul>
                </div>

                {/* Resultados e Impacto */}
                <div className="mt-4" >
                  <h3 className="text-[#1387f1] font-semibold text-lg">Resultados e Impacto:</h3>
                  <ul className="list-disc pl-5 text-[#dbd6d3] text-sm">
                    <div className="mt-2"></div>
                    <li>Otimizei a criação e distribuição de eBooks, economizando tempo dos usuários e oferecendo um produto altamente personalizável e automatizado.</li>
                    <div className="mt-2"></div>
                    <li>A automação com Selenium melhorou a eficiência da geração de eBooks, reduzindo a carga de trabalho manual e aumentando a escalabilidade da plataforma.</li>
                    <div className="mt-2"></div>
                    <li>A adição de suporte a múltiplos idiomas permitiu a expansão da plataforma para novos mercados, aumentando a diversidade de usuários.</li>
                  </ul>
                </div>
                
                {/* Soft Skills Adquiridas */}
                <div className="mt-4">
                  <h3 className="text-[#1387f1] font-semibold text-lg">Soft Skills Adquiridas:</h3>
                  <ul className="list-disc pl-5 text-[#dbd6d3] text-sm">
                  <div className="mt-2"></div>
                    <li><strong>Trabalho em Equipe:</strong> Colaborei de forma eficaz com outros desenvolvedores e membros da equipe para entregar uma plataforma de alta qualidade.</li>
                    <div className="mt-2"></div>
                    <li><strong>Gestão de Tempo:</strong> Aprimorei minhas habilidades de gerenciamento de tempo para lidar com múltiplas tarefas e cumprir prazos apertados.</li>
                    <div className="mt-2"></div>
                    <li><strong>Comunicação Eficaz:</strong> Melhorei a comunicação com equipes interdisciplinares, facilitando a implementação de funcionalidades e garantindo que todos estivessem alinhados com os objetivos do projeto.</li>
                    <div className="mt-2"></div>
                    <li><strong>Resolução de Problemas:</strong> Desenvolvi uma abordagem analítica para diagnosticar e resolver problemas técnicos de forma eficiente, especialmente durante a automação e integração de IA.</li>
                  </ul>
                </div>

                <div className="flex justify-center">
                  <a href="https://www.youtube.com" target="_blank" className="inline-block mt-8 px-6 py-2 rounded-full bg-[#1387f1] hover:bg-[#093359] transition font-semibold w-fit">Visualização do Projeto</a>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="container max-w-5xl mx-auto grid md:grid-cols-2 gap-14 px-8 py-12 bg-[#061c30]/90 rounded-3xl shadow-2xl items-center">
          <div>
            <img src="images/codando.png"
              alt="Victor"
              className="rounded-2xl w-72 h-80 object-cover mx-auto mb-4"
            />
            <div className="text-center text-lg mb-4 font-bold">
              Entre em contato
            </div>
            <div className="text-center text-[#dbd6d3] text-sm">
              Construo soluções escaláveis com foco no problema, não só no código. Me chama e vamos conversar sobre seu projeto.
            </div>
            <div className="mt-8 flex justify-center gap-6 text-[#1387f1]">
              <a href="mailto:contato.devictormello@gmail.com" target="_blank" rel="noopener noreferrer">
                <Mail className="w-6 h-6 hover:text-blue-600 transition-colors" />
              </a>
              <a href="https://github.com/vmellozk" target="_blank" rel="noopener noreferrer">
                <Github className="w-6 h-6 hover:text-blue-600 transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/victor-mello-b9686a2b9/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6 hover:text-blue-600 transition-colors" />
              </a>
              <a href="https://www.instagram.com/vmellozk" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6 hover:text-blue-600 transition-colors" />
              </a>
              <a href="https://wa.me/5521970975762" target="_blank" rel="noopener noreferrer">
                <Phone className="w-6 h-6 hover:text-blue-600 transition-colors" />
              </a>
            </div>
          </div>

          <form action="https://formsubmit.co/contato.devictormello@gmail.com" method="POST" target="_blank" className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nome"
              className="bg-[#093359] p-4 rounded-xl outline-none placeholder:text-[#4da5d2] focus:ring-2 ring-[#1387f1]"
              name="name" required
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-[#093359] p-4 rounded-xl outline-none placeholder:text-[#4da5d2] focus:ring-2 ring-[#1387f1]"
              name="email" required
            />
            <input
              type="text"
              placeholder="Assunto"
              className="bg-[#093359] p-4 rounded-xl outline-none placeholder:text-[#4da5d2] focus:ring-2 ring-[#1387f1]"
            />
            <textarea
              placeholder="Mensagem"
              rows={4}
              className="bg-[#093359] p-4 rounded-xl outline-none placeholder:text-[#4da5d2] focus:ring-2 ring-[#1387f1] resize-none"
            />
            <button type="submit" className="mt-2 px-6 py-3 bg-[#1387f1] rounded-full text-lg font-semibold hover:bg-[#093359] border border-[#1387f1] transition">Enviar</button>
          </form>
        </section>
      </main>

      {/* PopUp - Modal */}
      {isPopupOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#061c30] text-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative border border-[#1387f1]">
              <button onClick={closePopup} className="absolute top-3 right-3 text-[#1387f1] hover:text-white transition text-2xl"> ✕ </button>

              <h3 className="text-xl font-bold mb-4 text-[#4da5d2]">Concluídos</h3>
              <ul className="list-disc list-inside space-y-2 text-[#dbd6d3] text-sm text-left">
                <li>Cloud Foundations | AWS Academy</li>
                <li>Análise e Estrutura de Dados com Python | Anhanguera</li>
                <li>Data Warehouse ELT com Python, SQL e DBT-CORE | Jornada de Dados</li>
                <li>Pipeline ETL com Python | Jornada de Dados</li>
              </ul>

              <h3 className="text-xl font-bold mb-4 mt-8 text-[#4da5d2]">Em Andamento</h3>
              <ul className="list-disc list-inside space-y-2 text-[#dbd6d3] text-sm text-left">
                <li>Formação Engenharia de Dados: Big Data</li>
                <li>Curso de Inglês, Paulo Andrade</li>
              </ul>
              
            </div>
          </div>
        )}

      {/* Footer */}
      <footer className="pt-12 pb-6 text-center text-sm text-[#4da5d2]">
        Se você não mudar, nada muda!
      </footer>

    </div>
  );
}
