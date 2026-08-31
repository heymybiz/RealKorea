import type { Neighborhood } from "@/lib/content/types";

import { SAMPLE_BASE } from "./shared";

/**
 * PRD 02 §7 — the twelve v1 neighborhoods, with the slugs, names, and regions
 * exactly as the PRD lists them. Incheon sits under "Capital region" because
 * arrivals reality matters more than administrative tidiness.
 *
 * `dek` and `hero` stay null: PRD 02 §3.8 wants 120–160 words of real editorial
 * voice and documentary photography, neither of which a build step should
 * invent.
 */
export const SEED_NEIGHBORHOODS: readonly Neighborhood[] = (
  [
    ["jongno", "Jongno–Gwanghwamun", "종로·광화문", "Seoul"],
    ["ikseon-bukchon", "Ikseon–Bukchon", "익선·북촌", "Seoul"],
    ["myeongdong", "Myeongdong–Namdaemun", "명동·남대문", "Seoul"],
    ["hongdae-yeonnam", "Hongdae–Yeonnam–Mangwon", "홍대·연남·망원", "Seoul"],
    ["itaewon-hannam", "Itaewon–Hannam", "이태원·한남", "Seoul"],
    ["euljiro", "Euljiro", "을지로", "Seoul"],
    ["seongsu", "Seongsu", "성수", "Seoul"],
    ["gangnam-sinsa", "Gangnam–Sinsa", "강남·신사", "Seoul"],
    ["jamsil", "Jamsil", "잠실", "Seoul"],
    ["suwon", "Suwon", "수원", "Gyeonggi"],
    ["paju", "Paju (Heyri)", "파주", "Gyeonggi"],
    ["icn-songdo", "ICN–Songdo", "인천공항·송도", "Capital region"],
  ] as const
).map(([slug, nameEn, nameKo, region]) => ({
  ...SAMPLE_BASE,
  id: `neighborhood-${slug}`,
  slug,
  nameEn,
  nameKo,
  region,
  dek: null,
  hero: null,
}));
