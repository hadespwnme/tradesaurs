import { promises as fs } from "node:fs";
import path from "node:path";
import { generateIndonesianSummary, generateSmcSummary } from "./content";

export type ScrapedHeading = { level: number; text: string };
export type ScrapedImage = { src: string; alt: string };
export type ScrapedPdf = { url: string; label: string };
export type ScrapedBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "image"; src: string; alt: string };
export type ScrapedStructure = {
  headings: ScrapedHeading[];
  images: ScrapedImage[];
  blocks?: ScrapedBlock[];
  pdfs?: ScrapedPdf[];
};
export type IctArticleRaw = {
  title: string;
  url: string;
  image: string;
  slug: string;
  page: number;
  structure: ScrapedStructure;
};
export type SmcRaw = {
  title: string;
  url: string;
  hero: string;
  structure: ScrapedStructure;
};

async function loadJson<T>(file: string): Promise<T> {
  const p = path.join(process.cwd(), "data", file);
  const raw = await fs.readFile(p, "utf-8");
  return JSON.parse(raw) as T;
}

export async function getIctArticles(): Promise<IctArticleRaw[]> {
  try {
    return await loadJson<IctArticleRaw[]>("ict.json");
  } catch {
    return [];
  }
}

export async function getIctBySlug(slug: string) {
  const all = await getIctArticles();
  const raw = all.find((a) => a.slug === slug);
  if (!raw) return null;
  const summary = generateIndonesianSummary(raw);
  return { raw, summary };
}

export async function getIctByPage(page: number, perPage = 8) {
  const all = await getIctArticles();
  const start = (page - 1) * perPage;
  return {
    items: all.slice(start, start + perPage),
    total: all.length,
    page,
    perPage,
    totalPages: Math.max(1, Math.ceil(all.length / perPage)),
  };
}

export async function getSmc() {
  let raw: SmcRaw;
  try {
    raw = await loadJson<SmcRaw>("smc.json");
  } catch {
    raw = {
      title: "Smart Money Concepts",
      url: "https://dailypriceaction.com/blog/smart-money-concepts/",
      hero: "",
      structure: { headings: [], images: [] },
    };
  }
  const summary = generateSmcSummary(raw);
  return { raw, summary };
}
