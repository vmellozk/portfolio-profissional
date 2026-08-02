export function HeroSection() {
  return (
    <section
      id="hero"
      className="container max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-8 items-center min-h-[45vh] px-4 pt-10 sm:px-6"
    >
      <div className="flex-1 space-y-6 text-center lg:text-left">
        <p className="page-contrast-text uppercase tracking-wide text-sm text-[#4da5d2] mb-2">
          Business Intelligence | Data Engineer | Developer
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-2">
          Victor Mello
          <br />
        </h1>

        <div className="flex justify-center items-center mt-6 lg:hidden">
          <img
            src="images/new_perfil.png"
            alt="Victor"
            className="rounded-2xl shadow-2xl w-56 sm:w-64 md:w-72 h-auto max-h-96 object-cover bg-[#093359]"
          />
        </div>

        <p className="text-[#dbd6d3] max-w-xl mx-auto lg:mx-0 text-sm sm:text-base md:text-lg">
          Ajudo empresas a ganhar eficiência, controle e inteligência operacional por meio de soluções que unem dados, automação, desenvolvimento e IA aplicada. Crio sistemas e agentes de IA conectados ao WhatsApp para automatizar atendimentos, qualificar e transformar conversas em insights valiosos e também estruturo a arquitetura de dados, fluxos e automações por trás dessas soluções, conectando Engenharia de Dados, Programação e Business Intelligence para reduzir retrabalho, organizar informações e apoiar decisões com mais clareza.
        </p>
        <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-4">
          <a
            href="docs/Currículo - Victor Mello - Português.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="site-action-button"
          >
            Currículo
          </a>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 justify-center items-center mt-10 lg:mt-0">
        <img
          src="images/new_perfil.png"
          alt="Victor"
          className="rounded-2xl shadow-2xl w-56 sm:w-64 md:w-72 lg:w-80 h-auto max-h-96 object-cover bg-[#093359]"
        />
      </div>
    </section>
  );
}
