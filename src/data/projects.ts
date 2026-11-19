export type Project = {
  slug: string;
  category: string;
  year: string;
  title: string;
  description: string;
  summary: string;
  tags: string[];
  role: string;
  outcomeShort: string;
  outcome: string;
  highlights: string[];
  thumbnail: string;
  presentationPath: string;
  downloadName: string;
  sourceUrl?: string;
  liveUrl?: string;
};

import data from "./projects.json";

export const projects: Project[] = data;

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
