interface AboutSectionProps {
  onOpenCertificates: () => void;
}

export function AboutSection({ onOpenCertificates }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="about-glass-panel container max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center rounded-3xl p-6 md:p-10 shadow-xl relative"
    >
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-3 w-fit">
          <div className="rounded-xl overflow-hidden shadow-lg w-50 h-50">
            <img src="images/evento.png" alt="Victor" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg w-50 h-50">
            <img src="images/code.png" alt="Victor" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg w-50 h-50">
            <img src="images/codigo.png" alt="Victor" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg w-50 h-50">
            <img src="images/evento_dois.png" alt="Victor" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="space-y-5 px-4 md:px-0 text-center md:text-left">
        <h4 className="page-contrast-text uppercase tracking-widest text-[#4da5d2] font-semibold"> Sobre:</h4>

        <h2 className="text-2xl sm:text-3xl md:text-3xl font-extrabold mb-3">
          Curiosidade, disciplina e construção bem feita
        </h2>

        <p className="text-[#dbd6d3] text-sm sm:text-base leading-relaxed">
          A real é que eu sou uma pessoa bem curiosa! Gosto de entender como as coisas funcionam, desmontar problemas, testar caminhos e encontrar formas mais inteligentes de resolver processos que ainda dependem de muito esforço manual.
        </p>
        <p className="text-[#dbd6d3] text-sm sm:text-base leading-relaxed">
          O lado bom é que isso me levou a unir todas as minha experiências para entender cada etapa do que crio. Em cada projeto, busco entender o contexto antes de sair construindo: quais dados existem, quais regras precisam ser respeitadas, quais fluxos fazem sentido e como aquela solução será usada no dia a dia.
        </p>
        <p className="text-[#dbd6d3] text-sm sm:text-base leading-relaxed">
          Também sou uma pessoa bastante ligada à rotina. Gosto de um bom café pela manhã, ter sempre a minha magrela me acompanhando nas estradas e estar sempre antenado nas últimas tecnologias. São coisas simples, mas que combinam com meu jeito de trabalhar: consistência, paciência para evoluir e cuidado para construir algo que funcione bem de verdade.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mt-8 justify-center md:justify-start text-center sm:text-left">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1387f1]">Graduação</h3>
            <div className="uppercase text-xs sm:text-sm text-[#dbd6d3]">
              Anál. Desenv. Sistemas
              <br />
            </div>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1387f1]">Pós-Grad</h3>
            <div className="uppercase text-xs sm:text-sm text-[#dbd6d3]">
              Engenharia de Dados
              <br />
            </div>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1387f1]">MBA</h3>
            <div className="uppercase text-xs sm:text-sm text-[#dbd6d3]">
              Inteligência Artificial e Big Data
              <br />
            </div>
          </div>
        </div>

        <button
          onClick={onOpenCertificates}
          className="site-action-button mt-8"
        >
          Cursos e Certificados
        </button>
      </div>
    </section>
  );
}
