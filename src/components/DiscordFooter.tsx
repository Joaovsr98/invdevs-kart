import Reveal from "./Reveal";
import InvDevsLogo from "./InvDevsLogo";
import { wa } from "../wa";

const COMUNIDADE_CTA = wa("Olá! Vi o site demonstrativo INV Racing e quero saber mais sobre a INV Devs.");

export default function DiscordFooter() {
  return (
    <>
      <section id="comunidade" className="relative bg-[#080b14] py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 checker-bg opacity-[0.05]" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,87,255,0.20), transparent 70%)" }}
        />
        <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-electric-blue mb-4">COMUNIDADE OFICIAL</p>
            <h2 className="font-display font-semibold uppercase text-3xl md:text-5xl text-ivory leading-tight">
              Uma comunidade que <span className="text-electric-blue">corre junto</span>.
            </h2>
            <p className="text-steel mt-5 max-w-lg mx-auto">
              Avisos de treino, resultado de corrida, discussão de setup e a sala onde os campeonatos realmente
              acontecem. Antes de correr, é aqui que você entra.
            </p>
            <a
              href={COMUNIDADE_CTA}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fbb59] text-[#062b16] font-display tracking-wide px-8 py-4 text-sm md:text-base transition-colors"
            >
              FALAR NO WHATSAPP
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="relative bg-asphalt border-t border-steel-line pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 md:gap-6">
            <div>
              <InvDevsLogo className="text-lg" />
              <p className="text-steel text-sm mt-4 max-w-xs">
                Não criamos pilotos. Criamos vencedores. INV Racing é uma marca fictícia: este site é um projeto demonstrativo da INV Devs.
              </p>
            </div>

            <div>
              <h5 className="font-mono text-xs tracking-widest text-steel mb-4">REDES</h5>
              <ul className="space-y-2 text-sm text-steel">
                <li>
                  <a href="https://www.instagram.com/inv.devs" target="_blank" rel="noopener noreferrer" className="hover:text-ivory transition-colors">
                    Instagram · @inv.devs
                  </a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@inv.devs" target="_blank" rel="noopener noreferrer" className="hover:text-ivory transition-colors">
                    TikTok · @inv.devs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-mono text-xs tracking-widest text-steel mb-4">CAMPEONATO</h5>
              <ul className="space-y-2 text-sm text-steel">
                <li><a href="#calendario" className="hover:text-ivory transition-colors">Calendário</a></li>
                <li><a href="#ranking" className="hover:text-ivory transition-colors">Ranking</a></li>
                <li><a href="#comunidade" className="hover:text-ivory transition-colors">Comunidade</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-mono text-xs tracking-widest text-steel mb-4">CONTATO</h5>
              <ul className="space-y-2 text-sm text-steel">
                <li><a href={COMUNIDADE_CTA} target="_blank" rel="noopener noreferrer" className="hover:text-ivory transition-colors">WhatsApp · (11) 92527-2694</a></li>
                <li><a href="https://www.instagram.com/inv.devs" target="_blank" rel="noopener noreferrer" className="hover:text-ivory transition-colors">@inv.devs</a></li>
              </ul>
            </div>
          </div>

          {/* Última linha: copyright · crédito INV Devs · aviso de demonstração.
              Cartão no padrão INV Devs (modelo Bueno's House): cores de terceiro, permitidas pelo §4. */}
          <div className="mt-16 pt-6 border-t border-steel-line grid gap-6 items-center justify-items-center text-center md:grid-cols-[1fr_auto_1fr] md:justify-items-stretch md:text-left text-xs text-steel font-mono">
            <span>© 2026 INV RACING · MARCA FICTÍCIA.</span>
            <a
              href="https://www.instagram.com/inv.devs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Site feito por INV Devs (abre o Instagram @inv.devs)"
              className="group inline-flex items-center gap-4 rounded-2xl border border-cyan-400/25 bg-[#0b0f17] px-5 py-3 shadow-[0_0_28px_rgba(56,189,248,.12)] transition hover:border-cyan-400/50 hover:shadow-[0_0_34px_rgba(168,85,247,.25)]"
            >
              <img
                src="/inv-devs.webp"
                alt=""
                width={56}
                height={56}
                loading="lazy"
                className="h-14 w-14 rounded-full shadow-[0_0_24px_rgba(56,189,248,.35)] transition group-hover:scale-110 group-hover:shadow-[0_0_32px_rgba(168,85,247,.55)] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <span className="text-left leading-tight">
                <span className="block font-body text-[11px] uppercase tracking-[0.2em] text-neutral-400">Site feito por</span>
                <span className="block font-body text-lg font-bold normal-case text-neutral-100 group-hover:text-white">INV Devs</span>
                <span className="block font-body text-xs text-cyan-300/90 group-hover:text-cyan-200 transition-colors">@inv.devs no Instagram →</span>
              </span>
            </a>
            <span className="md:text-right">PROJETO FICTÍCIO · CONTEÚDO DE DEMONSTRAÇÃO</span>
          </div>
        </div>
      </footer>
    </>
  );
}
