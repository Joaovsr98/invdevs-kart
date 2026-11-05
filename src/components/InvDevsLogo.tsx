/**
 * Logo INV Devs para o cabeçalho: símbolo oficial (PNG transparente) + nome.
 * Gradiente ciano → violeta é a identidade da INV Devs (cor de terceiro, §4).
 */
export default function InvDevsLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src="/inv-devs-simbolo.png" alt="" width={240} height={87} className="h-7 w-auto shrink-0" />
      <span className="font-display font-bold tracking-[0.06em] text-ivory text-[1.35em] leading-none">
        INV{" "}
        <span className="bg-[linear-gradient(100deg,#22d3ee,#3b82f6_45%,#8b5cf6)] bg-clip-text text-transparent">
          DEVS
        </span>
      </span>
    </span>
  );
}
