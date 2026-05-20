export type TradersFamilySession = {
  id: string;
  title: string;
  videoId: string;
};

export type TradersFamilyModule = {
  id: string;
  title: string;
  sessions: TradersFamilySession[];
};

export type TradersFamilySessionEntry = TradersFamilySession & {
  moduleId: string;
  moduleTitle: string;
  moduleIndex: number;
  sessionIndex: number;
  orderIndex: number;
};

export const tradersFamilyModules: TradersFamilyModule[] = [
  {
    id: "metode-trading-johnpaul77",
    title: "Metode Trading Johnpaul77",
    sessions: [
      {
        id: "metode-trading-johnpaul77-sesi-1",
        title: "Metode Trading Johnpaul77 (Sesi 1)",
        videoId: "Fj_TdF59d3w",
      },
      {
        id: "metode-trading-johnpaul77-sesi-2",
        title: "Metode Trading Johnpaul77 (Sesi 2)",
        videoId: "f-gvCqc1BtU",
      },
      {
        id: "metode-trading-johnpaul77-sesi-3",
        title: "Metode Trading Johnpaul77 (Sesi 3)",
        videoId: "hXz3NBaVX9g",
      },
      {
        id: "metode-trading-johnpaul77-sesi-4",
        title: "Metode Trading Johnpaul77 (Sesi 4)",
        videoId: "r28SESkand0",
      },
    ],
  },
  {
    id: "major-trend-trading-plan",
    title: "Major Trend Trading Plan",
    sessions: [
      {
        id: "major-trend-trading-plan-sesi-1",
        title: "Major Trend Trading Plan (Sesi 1)",
        videoId: "37IzS9Q1XXI",
      },
      {
        id: "major-trend-trading-plan-sesi-2",
        title: "Major Trend Trading Plan (Sesi 2)",
        videoId: "eZ41goJIymc",
      },
      {
        id: "major-trend-trading-plan-sesi-3",
        title: "Major Trend Trading Plan (Sesi 3)",
        videoId: "pHnfAgcGSr0",
      },
      {
        id: "major-trend-trading-plan-update-live-trade",
        title: "Update Live Trade",
        videoId: "qR9pPlMZhpY",
      },
    ],
  },
  {
    id: "cara-backtest-metode",
    title: "Cara Backtest Metode",
    sessions: [
      {
        id: "cara-backtest-metode-sesi-1",
        title: "Sesi 1: Mengapa Backtest Penting",
        videoId: "QXogzDBF_Mw",
      },
      {
        id: "cara-backtest-metode-sesi-2",
        title: "Sesi 2: Langkah Melakukan Backtest",
        videoId: "4KirlAep_p4",
      },
      {
        id: "cara-backtest-metode-sesi-3",
        title: "Sesi 3: Praktik Cara Backtest",
        videoId: "hiBLsyIgkcc",
      },
      {
        id: "cara-backtest-metode-sesi-4",
        title: "Sesi 4: Arti Data Backtest",
        videoId: "oICqq1l6xCo",
      },
      {
        id: "cara-backtest-metode-sesi-5",
        title: "Sesi 5: Tips Untuk Backtest",
        videoId: "hQJV_npNCYY",
      },
    ],
  },
  {
    id: "praktik-langsung-bikin-metode",
    title: "Praktik Langsung Bikin Metode",
    sessions: [
      {
        id: "praktik-langsung-bikin-metode-sesi-1",
        title: "Sesi 1: Praktik Langsung Bikin Metode",
        videoId: "zhNVhkvOEXk",
      },
      {
        id: "praktik-langsung-bikin-metode-sesi-2",
        title: "Sesi 2: Praktik Langsung Bikin Metode",
        videoId: "K7opPvEL-KE",
      },
      {
        id: "praktik-langsung-bikin-metode-sesi-3",
        title: "Sesi 3: Praktik Langsung Bikin Metode",
        videoId: "c-33MwOXQIA",
      },
    ],
  },
];

const sessionEntries: TradersFamilySessionEntry[] = [];

for (const [moduleIndex, module] of tradersFamilyModules.entries()) {
  for (const [sessionIndex, session] of module.sessions.entries()) {
    sessionEntries.push({
      ...session,
      moduleId: module.id,
      moduleTitle: module.title,
      moduleIndex,
      sessionIndex,
      orderIndex: sessionEntries.length,
    });
  }
}

export const tradersFamilySessionEntries = sessionEntries;

export function getTradersFamilyEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}?rel=0`;
}

export function getTradersFamilyWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
