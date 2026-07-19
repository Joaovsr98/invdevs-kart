// ============================================================
// DEMO CONTENT — Paddock 22
// Todo o conteúdo abaixo (números, calendário, ranking, pilotos,
// depoimentos, parceiros, telemetria) é FICTÍCIO, criado apenas
// para fins de demonstração visual. Substituir por dados reais
// antes de publicar o site.
// ============================================================

// DEMO — painel de telemetria do hero. Edite aqui, nada está
// hardcoded dentro dos componentes.
export const demoTelemetry = {
  temperature: "27°C",
  tracks: 7,
  activeDrivers: "120+",
  nextRaceDate: "2026-11-28",
};

export const series = [
  {
    icon: "🏆",
    name: "Paddock Championship",
    tag: "Principal",
    desc: "O campeonato-título do ano. Temporada longa, pontos corridos, coroa no fim da temporada.",
    color: "var(--color-race-red)",
  },
  {
    icon: "⚡",
    name: "Sprint Series",
    tag: "Semanal",
    desc: "Corridas curtas e intensas, todo fim de semana. Formato direto: classificação e prova, sem desculpa.",
    color: "var(--color-electric-blue)",
  },
  {
    icon: "🌙",
    name: "Night Series",
    tag: "Noturna",
    desc: "Etapas sob luz artificial, pistas técnicas, atmosfera diferente. Para quem gosta de correr no limite da visibilidade.",
    color: "#5B7FFF",
  },
  {
    icon: "🎯",
    name: "Rookie Academy",
    tag: "Iniciante",
    desc: "Sua entrada na Paddock 22. Regras de proteção, telemetria explicada, mentoria de pilotos veteranos.",
    color: "#3DDC97",
  },
  {
    icon: "👑",
    name: "Masters League",
    tag: "Elite",
    desc: "Convite apenas para os pilotos mais consistentes do ranking. O nível mais alto da casa.",
    color: "var(--color-electric-blue)",
  },
  {
    icon: "🛡️",
    name: "Endurance Series",
    tag: "Equipes",
    desc: "Provas longas, troca de pilotos, estratégia de pit stop real. Testa carro, equipe e cabeça.",
    color: "#8B94A3",
  },
];

export const stats = [
  { value: 1240, suffix: "+", label: "pilotos cadastrados" },
  { value: 18, suffix: "", label: "campeonatos realizados" },
  { value: 2300, suffix: "+", label: "horas de transmissão" },
  { value: 96000, suffix: "+", label: "espectadores acumulados" },
  { value: 74, suffix: "", label: "equipes ativas" },
];

export const steps = [
  { n: "01", title: "Inscrição", desc: "Preencha seus dados e escolha a série de entrada." },
  { n: "02", title: "Discord oficial", desc: "Entre no servidor. É lá que tudo acontece: avisos, treinos, resultado." },
  { n: "03", title: "Treinos oficiais", desc: "Sessões cronometradas para ajuste de setup e reconhecimento de pista." },
  { n: "04", title: "Classificação", desc: "Grid definido por tempo de volta. Sem sorteio, sem favoritismo." },
  { n: "05", title: "Campeonato", desc: "Etapas pontuadas ao longo da temporada, com transmissão ao vivo." },
  { n: "06", title: "Pódio", desc: "Premiação, entrevista e um lugar no Hall da Fama se a temporada for boa." },
];

// Calendário 100% nacional — autódromos brasileiros.
export const calendar = [
  { round: "01", track: "Interlagos", country: "SP", date: "08 Mar", series: "Paddock Championship" },
  { round: "02", track: "Velocitta", country: "SP", date: "22 Mar", series: "Paddock Championship" },
  { round: "03", track: "Goiânia", country: "GO", date: "05 Abr", series: "Night Series" },
  { round: "04", track: "Curitiba", country: "PR", date: "19 Abr", series: "Paddock Championship" },
  { round: "05", track: "Cascavel", country: "PR", date: "03 Mai", series: "Endurance Series" },
  { round: "06", track: "Tarumã", country: "RS", date: "17 Mai", series: "Paddock Championship" },
  { round: "07", track: "Santa Cruz do Sul", country: "RS", date: "31 Mai", series: "Endurance Series" },
];

export const ranking = [
  { pos: 1, name: "L. Kadosh", wins: 11, poles: 9, podiums: 15, fastLap: "1:38.221" },
  { pos: 2, name: "R. Munhoz", wins: 9, poles: 7, podiums: 14, fastLap: "1:38.402" },
  { pos: 3, name: "T. Andrade", wins: 8, poles: 10, podiums: 13, fastLap: "1:38.556" },
  { pos: 4, name: "G. Petry", wins: 6, poles: 4, podiums: 12, fastLap: "1:38.901" },
  { pos: 5, name: "F. Yamazaki", wins: 5, poles: 5, podiums: 10, fastLap: "1:39.044" },
  { pos: 6, name: "B. Salume", wins: 4, poles: 3, podiums: 9, fastLap: "1:39.187" },
  { pos: 7, name: "C. Vellozo", wins: 3, poles: 2, podiums: 8, fastLap: "1:39.320" },
  { pos: 8, name: "D. Marchetti", wins: 2, poles: 3, podiums: 7, fastLap: "1:39.455" },
];

export const hallOfFame = [
  { name: "L. Kadosh", team: "Voltage Racing", titles: 3, years: "2023 · 2024 · 2025" },
  { name: "R. Munhoz", team: "Preta Motorsport", titles: 2, years: "2021 · 2022" },
  { name: "T. Andrade", team: "Grafeno GT", titles: 1, years: "2020" },
];

export const testimonials = [
  {
    quote: "Entrei sem saber nem o que era stint. Hoje corro o Endurance Series com a minha própria equipe.",
    name: "Bruno Salume",
    role: "Rookie Academy → Endurance Series",
  },
  {
    quote: "É a comunidade mais séria que já corri. Ninguém vira o carro no primeiro pit e finge que foi lag.",
    name: "Fernanda Yamazaki",
    role: "Masters League",
  },
  {
    quote: "Meu primeiro campeonato foi pelo Paddock 22. Hoje é o único lugar que eu levo tão a sério quanto um trabalho.",
    name: "Diego Marchetti",
    role: "Piloto, 3ª temporada",
  },
];

export const partners = [
  "APEX SIMWHEEL", "GRAFENO GT", "PRETA MOTORSPORT", "VOLTAGE RACING", "CIRCUITO DIGITAL", "PIT LANE CO.",
];

export const galleryImages = [
  { query: "GT3 race car night racing wet track", alt: "Corrida noturna sob chuva" },
  { query: "sim racing rig cockpit triple monitor setup", alt: "Cockpit de simulador" },
  { query: "motorsport podium champagne celebration", alt: "Pódio de campeonato" },
  { query: "racing pit stop crew action", alt: "Troca de pneus no pit stop" },
  { query: "race cars side by side overtake corner", alt: "Ultrapassagem em curva" },
  { query: "esports racing team paddock garage", alt: "Box da equipe no paddock" },
];
