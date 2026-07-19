import Reveal from "./Reveal";
import { CloudRain, Gauge, Trophy, Wrench, Flag, Users } from "lucide-react";
import { galleryImages, partners, testimonials } from "../data";

// Enquanto não há fotos reais, cada quadro vira um tile gráfico de marca:
// gradiente vermelho/azul, ícone temático em marca-d'água e índice.
const tiles = [
  { grad: "linear-gradient(135deg, #1b2740, #0B0D10)", Icon: CloudRain, accent: "#0057FF" },
  { grad: "linear-gradient(135deg, #2A0A08, #0B0D10)", Icon: Gauge, accent: "#E10600" },
  { grad: "linear-gradient(135deg, #10203a, #0B0D10)", Icon: Trophy, accent: "#0057FF" },
  { grad: "linear-gradient(135deg, #2A0A08, #10151c)", Icon: Wrench, accent: "#E10600" },
  { grad: "linear-gradient(135deg, #131a2e, #0B0D10)", Icon: Flag, accent: "#0057FF" },
  { grad: "linear-gradient(135deg, #1D2126, #0B0D10)", Icon: Users, accent: "#E10600" },
];

export default function GalleryPartnersTestimonials() {
  return (
    <>
      <section className="relative bg-carbon py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-electric-blue mb-4">GALERIA</p>
            <h2 className="font-display font-semibold uppercase text-2xl md:text-4xl text-ivory mb-12 max-w-xl">
              Ultrapassagens, bastidores e o dia de corrida.
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((g, i) => {
              const t = tiles[i % tiles.length];
              const big = i === 0;
              const Icon = t.Icon;
              return (
                <Reveal key={g.alt} delay={i * 0.05} className={big ? "col-span-2 row-span-2" : ""}>
                  <div
                    className="relative aspect-square md:aspect-auto md:h-full min-h-[160px] flex items-end p-5 overflow-hidden group border border-steel-line/60"
                    style={{ background: t.grad }}
                  >
                    <div className="checker-bg absolute inset-0 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity" />
                    {/* faixa diagonal de marca no hover */}
                    <div className="speed-stripes absolute inset-0 opacity-0 group-hover:opacity-[0.12] transition-opacity duration-500" />
                    {/* ícone temático em marca-d'água */}
                    <Icon
                      className="absolute -right-4 -top-4 transition-transform duration-500 group-hover:scale-110"
                      style={{ color: t.accent, opacity: big ? 0.22 : 0.16 }}
                      size={big ? 180 : 108}
                      strokeWidth={1}
                    />
                    <span
                      className="absolute top-4 left-5 font-display font-bold leading-none text-ivory/15"
                      style={{ fontSize: big ? 64 : 40 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="relative font-mono text-[11px] text-steel group-hover:text-ivory transition-colors tracking-wide">
                      {g.alt}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-asphalt py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-race-red mb-8 text-center">PARCEIROS OFICIAIS</p>
          </Reveal>
          <Reveal className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {partners.map((p) => (
              <span key={p} className="font-display uppercase tracking-widest text-steel text-sm md:text-base opacity-70">
                {p}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="depoimentos" className="relative bg-carbon py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-electric-blue mb-4">DEPOIMENTOS</p>
            <h2 className="font-display font-semibold uppercase text-2xl md:text-4xl text-ivory mb-14 max-w-xl">
              Quem correu, conta.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className="h-full bg-asphalt border border-steel-line p-8 flex flex-col">
                  <p className="text-ivory text-base leading-relaxed flex-1">"{t.quote}"</p>
                  <div className="mt-6 pt-6 border-t border-steel-line">
                    <p className="font-display uppercase text-sm text-ivory">{t.name}</p>
                    <p className="text-steel text-xs mt-1">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
