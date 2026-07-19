import { useEffect, useState } from "react";
import Logo from "./Logo";
import { wa } from "../wa";

const VAGA_CTA = wa("Olá! Quero garantir minha vaga na Paddock 22. Pode me passar os próximos passos?");

const links = [
  { href: "#campeonato", label: "Campeonato" },
  { href: "#calendario", label: "Calendário" },
  { href: "#ranking", label: "Ranking" },
  { href: "#hall-da-fama", label: "Hall da Fama" },
  { href: "#comunidade", label: "Comunidade" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // section highlight — marca a seção visível no topo do viewport
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-asphalt/70 backdrop-blur-md border-b border-steel-line/80 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.9)]"
          : "bg-gradient-to-b from-asphalt/70 to-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-16">
        <a href="#" className="group flex items-center transition-transform duration-300 hover:scale-[1.02]">
          <Logo className="text-lg" />
        </a>

        <ul className="hidden md:flex items-center gap-1 font-body text-sm">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative px-3.5 py-2 transition-colors duration-200 ${
                    isActive ? "text-ivory" : "text-steel hover:text-ivory"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute left-3.5 right-3.5 -bottom-0.5 h-0.5 bg-race-red origin-left transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={VAGA_CTA}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative hidden md:inline-flex items-center gap-2 bg-race-red text-ivory font-display text-sm tracking-wide px-5 py-2.5 overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <span className="relative">GARANTA SUA VAGA</span>
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-ivory w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          aria-label="Abrir menu"
        >
          <span className={`block h-0.5 w-6 bg-ivory transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-ivory transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-ivory transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-carbon/95 backdrop-blur-md border-t border-steel-line px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-body transition-colors ${active === l.href ? "text-ivory" : "text-steel hover:text-ivory"}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={VAGA_CTA}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="text-center bg-race-red text-ivory font-display tracking-wide px-5 py-3"
          >
            GARANTA SUA VAGA
          </a>
        </div>
      )}
    </header>
  );
}
