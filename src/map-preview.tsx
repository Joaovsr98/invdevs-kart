import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import InterlagosMap from "./components/InterlagosMap";

/**
 * Página isolada só para validar o mapa (geometria + interação).
 * Não faz parte do site — servida em /map.html. Remover após a aprovação.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div style={{ minHeight: "100vh", background: "#0B0D10", padding: 32 }}>
      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "#8B94A3",
          marginBottom: 24,
        }}
      >
        VALIDAÇÃO · MAPA ISOLADO — passe o mouse nas curvas e nos setores · Tab + ← →
      </p>
      <div style={{ height: "72vh", maxWidth: 720, margin: "0 auto" }}>
        <InterlagosMap />
      </div>
    </div>
  </StrictMode>
);
