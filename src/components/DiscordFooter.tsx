import Reveal from "./Reveal";
import Logo from "./Logo";

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
              Somos mais de <span className="text-electric-blue">200 pilotos</span> na comunidade.
            </h2>
            <p className="text-steel mt-5 max-w-lg mx-auto">
              Avisos de treino, resultado de corrida, discussão de setup e a sala onde os campeonatos realmente
              acontecem. Antes de correr, é aqui que você entra.
            </p>
            <a
              href="#"
              className="mt-9 inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4a54d6] text-ivory font-display tracking-wide px-8 py-4 text-sm md:text-base transition-colors"
            >
              ENTRAR NO DISCORD AGORA
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="relative bg-asphalt border-t border-steel-line pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 md:gap-6">
            <div>
              <Logo className="text-lg" />
              <p className="text-steel text-sm mt-4 max-w-xs">
                Não criamos pilotos. Criamos vencedores. Campeonatos oficiais de sim racing.
              </p>
            </div>

            <div>
              <h5 className="font-mono text-xs tracking-widest text-steel mb-4">REDES</h5>
              <ul className="space-y-2 text-sm text-steel">
                <li>
                  <a href="https://instagram.com/paddock.22" target="_blank" rel="noopener noreferrer" className="hover:text-ivory transition-colors">
                    Instagram · @paddock.22
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@paddock22tv" target="_blank" rel="noopener noreferrer" className="hover:text-ivory transition-colors">
                    YouTube · @paddock22tv
                  </a>
                </li>
                <li><a href="#comunidade" className="hover:text-ivory transition-colors">Discord</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-mono text-xs tracking-widest text-steel mb-4">CAMPEONATO</h5>
              <ul className="space-y-2 text-sm text-steel">
                <li><a href="#calendario" className="hover:text-ivory transition-colors">Calendário</a></li>
                <li><a href="#ranking" className="hover:text-ivory transition-colors">Ranking</a></li>
                <li><a href="#" className="hover:text-ivory transition-colors">Regulamento</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-mono text-xs tracking-widest text-steel mb-4">CONTATO</h5>
              <ul className="space-y-2 text-sm text-steel">
                <li><a href="mailto:paddock22.oficial@gmail.com" className="hover:text-ivory transition-colors">paddock22.oficial@gmail.com</a></li>
                <li><a href="https://instagram.com/paddock.22" target="_blank" rel="noopener noreferrer" className="hover:text-ivory transition-colors">@paddock.22</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-6 border-t border-steel-line flex flex-col md:flex-row justify-between gap-2 text-xs text-steel font-mono">
            <span>© 2026 PADDOCK 22. TODOS OS DIREITOS RESERVADOS.</span>
            <span>PROJETO FICTÍCIO · CONTEÚDO DE DEMONSTRAÇÃO</span>
          </div>
        </div>
      </footer>
    </>
  );
}
