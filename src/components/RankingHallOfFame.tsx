import Reveal from "./Reveal";
import { ranking, hallOfFame } from "../data";

export default function RankingHallOfFame() {
  return (
    <>
      <section id="ranking" className="relative bg-carbon py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-electric-blue mb-4">TIMING TOWER</p>
            <h2 className="font-display font-semibold uppercase text-2xl md:text-4xl text-ivory mb-12 max-w-xl">
              Ranking geral · Temporada 2026
            </h2>
          </Reveal>

          <Reveal className="overflow-x-auto border border-steel-line">
            <table className="w-full font-mono text-xs md:text-sm min-w-[560px]">
              <thead>
                <tr className="bg-carbon-2 text-steel text-left">
                  <th className="px-4 py-3 font-normal">POS</th>
                  <th className="px-4 py-3 font-normal">PILOTO</th>
                  <th className="px-4 py-3 font-normal">VITÓRIAS</th>
                  <th className="px-4 py-3 font-normal">POLES</th>
                  <th className="px-4 py-3 font-normal">PÓDIOS</th>
                  <th className="px-4 py-3 font-normal">VOLTA RÁPIDA</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((r) => (
                  <tr key={r.pos} className="border-t border-steel-line hover:bg-asphalt/40 transition-colors">
                    <td className={`px-4 py-3 ${r.pos <= 3 ? "text-electric-blue" : "text-steel"}`}>
                      {String(r.pos).padStart(2, "0")}
                    </td>
                    <td className="px-4 py-3 text-ivory tracking-normal font-body">{r.name}</td>
                    <td className="px-4 py-3 text-steel">{r.wins}</td>
                    <td className="px-4 py-3 text-steel">{r.poles}</td>
                    <td className="px-4 py-3 text-steel">{r.podiums}</td>
                    <td className="px-4 py-3 text-race-red">{r.fastLap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section id="hall-da-fama" className="relative bg-asphalt py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-race-red mb-4">HALL OF CHAMPIONS</p>
            <h2 className="font-display font-semibold uppercase text-2xl md:text-4xl text-ivory mb-14 max-w-xl">
              Grandes campeões da INV Racing.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {hallOfFame.map((h, i) => (
              <Reveal key={h.name} delay={i * 0.08}>
                <div className="bg-carbon border border-steel-line p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-carbon-2 border border-steel-line mx-auto mb-5 flex items-center justify-center font-display text-xl text-steel">
                    {h.name.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <h4 className="font-display uppercase text-lg text-ivory">{h.name}</h4>
                  <p className="text-steel text-xs mt-1">{h.team}</p>
                  <p className="text-electric-blue font-mono text-sm mt-4">
                    {"🏆".repeat(h.titles)} {h.titles} título{h.titles > 1 ? "s" : ""}
                  </p>
                  <p className="text-steel text-xs mt-1 font-mono">{h.years}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
