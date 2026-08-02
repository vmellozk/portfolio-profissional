import { useState } from "react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="site-glass-navbar flex justify-between items-center px-4 md:px-8 py-6 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
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
            <a href="#hero" className="hover:text-[#1387f1] transition">Início</a>
          </li>
          <li>
            <a href="#about" className="hover:text-[#1387f1] transition">Sobre</a>
          </li>
          <li>
            <a href="#projects" className="hover:text-[#1387f1] transition">Projetos</a>
          </li>
          <li>
            <a href="#services" className="hover:text-[#1387f1] transition">Stack</a>
          </li>
          <li>
            <a href="#experience" className="hover:text-[#1387f1] transition">Experiência</a>
          </li>
        </ul>

        <div className="ml-4 hidden md:ml-6 md:block">
          <a href="#contact" className="site-action-button site-action-button--compact">
            Contato
          </a>
        </div>

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

      {menuOpen && (
        <ul className="site-glass-mobile-nav md:hidden flex flex-col items-center gap-6 backdrop-blur-md fixed top-[72px] left-0 right-0 z-40 py-6 text-lg">
          <li>
            <a href="#hero" className="hover:text-[#1387f1] transition" onClick={() => setMenuOpen(false)}>Início</a>
          </li>
          <li>
            <a href="#about" className="hover:text-[#1387f1] transition" onClick={() => setMenuOpen(false)}>Sobre</a>
          </li>
          <li>
            <a href="#projects" className="hover:text-[#1387f1] transition" onClick={() => setMenuOpen(false)}>Projetos</a>
          </li>
          <li>
            <a href="#experience" className="hover:text-[#1387f1] transition" onClick={() => setMenuOpen(false)}>Experiência</a>
          </li>
          <li>
            <a href="#services" className="hover:text-[#1387f1] transition" onClick={() => setMenuOpen(false)}>Stack</a>
          </li>
          <li>
            <a
              href="#contact"
              className="site-action-button site-action-button--compact"
              onClick={() => setMenuOpen(false)}
            >
              Contato
            </a>
          </li>
        </ul>
      )}
    </>
  );
}
