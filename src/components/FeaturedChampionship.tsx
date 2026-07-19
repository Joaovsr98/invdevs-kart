import Reveal from "./Reveal";
import { series } from "../data";
import { wa } from "../wa";

const CHAMP_CTA = wa("Olá! Quero garantir minha vaga no Paddock Championship 2026 (GT3). Como faço a inscrição?");

export default function FeaturedChampionship() {
  return (
    <section id="campeonato" className="relative bg-asphalt py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-electric-blue mb-4">CAMPEONATO EM DESTAQUE</p>
        </Reveal>

        <Reveal delay={0.05} className="relative bg-carbon border border-steel-line overflow-hidden">
          <div className="checker-bg absolute top-0 right-0 w-40 h-40 opacity-[0.15]" />
          <div className="relative grid md:grid-cols-5 gap-0">
            <div className="md:col-span-3 p-8 md:p-14">
              <span className="inline-block font-mono text-xs tracking-widest text-race-red border border-race-red/40 px-3 py-1 mb-6">
                PADDOCK CHAMPIONSHIP · TEMPORADA 2026
              </span>
              <h3 className="font-display font-semibold uppercase text-3xl md:text-5xl text-ivory leading-none">
                Sete rodadas.
                <br />
                Um campeão.
              </h3>
              <p className="text-steel mt-6 max-w-md">
                A temporada principal da Paddock 22. Sete circuitos icônicos, GT3 de última geração e
                transmissão completa com narração e telemetria ao vivo.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 font-mono text-sm">
                <div>
                  <div className="text-steel text-xs mb-1">CATEGORIA</div>
                  <div className="text-ivory">GT3</div>
                </div>
                <div>
                  <div className="text-steel text-xs mb-1">RODADAS</div>
                  <div className="text-ivory">07</div>
                </div>
                <div>
                  <div className="text-steel text-xs mb-1">LARGADA</div>
                  <div className="text-ivory">08 MAR</div>
                </div>
                <div>
                  <div className="text-steel text-xs mb-1">VAGAS RESTANTES</div>
                  <div className="text-electric-blue">32 / 40</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="h-1.5 w-full bg-steel-line">
                  <div className="h-1.5 bg-race-red" style={{ width: "80%" }} />
                </div>
                <p className="text-steel text-xs mt-2 font-mono">80% DO GRID PREENCHIDO</p>
              </div>

              <a
                href={CHAMP_CTA}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 bg-race-red hover:bg-race-red/90 text-ivory font-display tracking-wide px-8 py-4 text-sm md:text-base transition-colors"
              >
                GARANTA SUA VAGA
              </a>
            </div>

            <div className="md:col-span-2 glass-panel p-8 md:p-14 border-t md:border-t-0 md:border-l border-steel-line">
              <h4 className="font-display uppercase tracking-wide text-ivory text-sm mb-6">Premiação & regulamento</h4>
              <ul className="space-y-4 text-steel text-sm">
                <li className="flex gap-3"><span className="text-electric-blue">🥇</span> Troféu oficial + kit de equipamento de simulação</li>
                <li className="flex gap-3"><span className="text-electric-blue">🥈</span> Vaga garantida na Masters League 2027</li>
                <li className="flex gap-3"><span className="text-electric-blue">🥉</span> Destaque no Hall da Fama e nas redes oficiais</li>
                <li className="flex gap-3"><span className="text-electric-blue">📋</span> Peso mínimo, balanço de performance e penalidades revisadas por comissários</li>
                <li className="flex gap-3"><span className="text-electric-blue">📡</span> Transmissão completa ao vivo, com replay disponível em até 24h</li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* series ecosystem */}
        <div className="mt-20 md:mt-28">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-race-red mb-4">O ECOSSISTEMA PADDOCK 22</p>
            <h3 className="font-display font-semibold uppercase text-2xl md:text-4xl text-ivory mb-12 max-w-2xl">
              Cada competição tem sua própria identidade. Todas correm sob a mesma bandeira.
            </h3>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {series.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.06}>
                <div
                  className="h-full bg-carbon border border-steel-line p-7 hover:border-steel transition-colors"
                  style={{ borderTop: `3px solid ${s.color}` }}
                >
                  <div className="text-2xl mb-4">{s.icon}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-display uppercase text-lg text-ivory">{s.name}</h4>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-steel">{s.tag.toUpperCase()}</span>
                  <p className="text-steel text-sm mt-3 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
