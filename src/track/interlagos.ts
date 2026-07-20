/**
 * Geometria do Autódromo José Carlos Pace (Interlagos).
 *
 * FONTE: extraído do arquivo vetorial de referência aprovado. O `d` abaixo é o
 * path original, sem redesenho, suavização ou curvas inventadas.
 *
 * ⚠️ FIDELIDADE: é fiel ao diagrama vetorial de referência — não é cartografia.
 * Precisão oficial exigiria KML/GeoJSON ou dados do circuito. Não apresentar
 * como planta técnica.
 *
 * Fonte única de verdade: tanto o render SVG quanto as medições em JS
 * (getPointAtLength) usam esta constante. Não duplicar o path em outro arquivo.
 */

export const TRACK_D =
  "M92.9234 135.537L119.987 249.016C121.487 255.253 123.035 260.079 126.195 264.735C127.381 266.686 129.067 268.284 131.078 269.363C133.224 270.343 135.627 270.61 137.935 270.125C139.678 269.601 141.241 268.604 142.451 267.246C144.738 264.629 147.179 262.151 149.761 259.824C150.994 258.687 152.536 257.941 154.192 257.679C156.471 257.468 158.759 257.971 160.739 259.118C162.402 259.972 163.856 260.794 165.462 261.718C168.947 263.726 171.795 265.49 175.81 266.426C180.269 267.47 185.01 267.132 189.525 266.539C192.986 266.098 196.362 265.147 199.545 263.717C203.185 262.23 206.515 260.076 209.365 257.367C214.219 252.344 217.013 246.982 220.118 239.446C221.232 236.646 222.175 233.781 222.941 230.867L260.559 91.6219C261.942 86.4569 260.277 76.8339 252.659 74.5219C252.066 74.3529 250.091 73.7319 248.172 73.3649L234.654 70.7649C231.808 70.1131 228.908 69.7258 225.99 69.608C223.372 69.6628 220.772 70.0611 218.257 70.7929C215.686 71.467 213.244 72.5636 211.032 74.0379C208.351 75.7029 204.541 78.5249 202.425 81.6009C202.425 81.6009 173.978 120.011 155.013 145.974C153.376 148.232 150.131 151.788 147.393 153.368C141.128 156.952 126.538 157.432 117.704 150.207C113.697 146.907 111.128 140.696 110.395 137.62C108.334 129.125 107.009 122.634 106.67 119.869C106.303 116.769 106.02 110.584 106.782 107.569C107.258 105.627 108.408 103.916 110.027 102.743C111.172 102.103 112.459 101.76 113.77 101.746C115.081 101.731 116.375 102.044 117.534 102.658C122.501 105.593 122.672 106.609 126.002 108.838C128.231 110.338 131.363 110.475 133.987 109.938C136.197 109.399 138.2 108.221 139.744 106.551C141.008 105.279 141.907 103.69 142.344 101.951C142.825 99.8398 142.737 97.6391 142.09 95.5729C141.341 93.5378 140.2 91.6692 138.732 90.0729C133.906 85.3319 132.381 83.7799 128.487 79.6589C124.564 75.5389 120.303 67.4669 119.372 62.1049L117.65 52.3119C117.18 50.4399 117.189 48.4792 117.678 46.6119C118.008 45.3806 118.744 44.2969 119.766 43.5359C120.855 42.6845 122.228 42.2807 123.605 42.4069C125.714 42.8456 127.591 44.0398 128.881 45.7649L142.061 61.2869C145.447 65.2659 149.145 68.2299 153.774 69.6119C164.921 72.9119 177.959 68.1119 184.673 57.3359L205.754 23.4978C207.137 21.2688 207.786 18.6159 206.798 16.2729C205.816 14.3879 204.238 12.88 202.311 11.983C202.311 11.983 196.639 9.41492 194.07 8.42692C189.752 6.73392 185.999 5.29386 181.37 3.88286C179.283 3.30973 177.129 3.01551 174.964 3.00786C172.666 2.98407 170.37 3.17296 168.107 3.57194C162.529 4.34574 157.006 5.46717 151.568 6.92985C147.702 8.05885 144.006 9.80892 140.337 11.2759C136.858 12.6932 133.465 14.3141 130.176 16.1299C127.881 17.3128 125.675 18.6617 123.576 20.1659C120.241 22.577 117.218 25.3924 114.576 28.5479C110.991 33.1984 108.293 38.4698 106.618 44.0979C101.482 64.7279 96.7972 84.0879 94.9342 92.3569C93.4672 98.9039 91.4635 107.343 91.0685 114.003C90.5804 121.234 91.2086 128.496 92.9312 135.536L92.9234 135.537Z";

/** Enquadramento do traçado com margem para o glow. */
export const TRACK_VIEWBOX = "80 -8 192 289";

/** Comprimento aproximado (unidades do viewBox). Medido em runtime também. */
export const TRACK_LENGTH = 1098;

export type Poi = {
  id: string;
  name: string;
  /** Posição ao longo da volta, 0..1 — projetada sobre o traçado real. */
  t: number;
  desc: string;
};

/**
 * Pontos de interesse. Apenas as curvas **rotuladas na referência** — Descida
 * do Lago, Ferradura e Junção não constam no arquivo original e por isso NÃO
 * foram incluídas (não inventar).
 * Ordem = sentido da volta.
 */
export const POIS: Poi[] = [
  { id: "largada", name: "Reta de Largada", t: 0.0769, desc: "Onde a volta começa e termina. Ponto de largada da prova." },
  { id: "senna", name: "S do Senna", t: 0.1334, desc: "Curva mais importante da pista e principal ponto de ultrapassagem." },
  { id: "sol", name: "Curva do Sol", t: 0.1867, desc: "Aceleração total rumo à reta oposta." },
  { id: "oposta", name: "Reta Oposta", t: 0.2709, desc: "Trecho de maior velocidade, decisivo para o tempo de volta." },
  { id: "laranjinha", name: "Laranjinha", t: 0.5231, desc: "Curva de apoio que prepara a entrada do miolo." },
  { id: "pinheirinho", name: "Pinheirinho", t: 0.6196, desc: "Freada forte no fim do trecho interno." },
  { id: "bico", name: "Bico de Pato", t: 0.6925, desc: "Mudança de direção que exige confiança no carro." },
  { id: "mergulho", name: "Mergulho", t: 0.7426, desc: "Descida rápida com freada pesada." },
  { id: "boxes", name: "Subida aos Boxes", t: 0.9465, desc: "Último esforço antes de cruzar a linha." },
];

export type Sector = { id: string; name: string; from: number; to: number; color: string };

/**
 * ⚠️ Setores APROXIMADOS (terços da volta). Os limites oficiais de cronometragem
 * de Interlagos não constam na referência — não rotular como oficiais.
 */
export const SECTORS: Sector[] = [
  { id: "s1", name: "Setor 1", from: 0, to: 1 / 3, color: "#E10600" },
  { id: "s2", name: "Setor 2", from: 1 / 3, to: 2 / 3, color: "#0057FF" },
  { id: "s3", name: "Setor 3", from: 2 / 3, to: 1, color: "#E7E7EA" },
];
