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

export const projects: Project[] = [
  {
    slug: "learning-copilot",
    category: "Desktop / AI learning",
    year: "2026",
    title: "Learning Copilot",
    description:
      "Desktop AI learning app for Windows that positions AI as a personal tutor orchestrating study over time.",
    summary:
      "A guided learning workflow designed to move beyond a chat interface: plan, study, practice and review inside a focused desktop experience.",
    tags: ["Next.js", "TailwindCSS", "shadcn/ui", "CodeMirror"],
    role: "Product concept & build",
    outcomeShort: "Installable app",
    outcome:
      "Created a demo-ready desktop learning product concept with a clear workflow, study surfaces and an installable Windows build.",
    highlights: [
      "Turned a learning assistant idea into a structured product experience.",
      "Explored desktop packaging and offline-friendly distribution.",
      "Used AI-assisted development to iterate on UX, code and QA."
    ],
    thumbnail: "/images/projects/learning-copilot-thumbnail.svg",
    presentationPath: "/presentations/learning-copilot.html",
    downloadName: "learning-copilot-presentation.html",
    sourceUrl: "https://github.com/fland94/learning-copilot"
  },
  {
    slug: "personal-portfolio",
    category: "Web / AI-assisted",
    year: "2026",
    title: "Personal Portfolio Site",
    description:
      "A responsive personal portfolio and live CV rebuilt as an editorial, data-driven web experience.",
    summary:
      "The portfolio itself: redesigned to better reflect current positioning in project management, digital transformation and AI-assisted delivery.",
    tags: ["Next.js", "Vercel", "TypeScript", "AI agents"],
    role: "Design direction & build",
    outcomeShort: "Rebuilt system",
    outcome:
      "Replaced a multi-page static site with a modern, maintainable portfolio system ready for project decks and future updates.",
    highlights: [
      "Moved project content into a structured data model.",
      "Added daily deterministic quote behavior and a real contact endpoint.",
      "Kept the visual system aligned with the approved redesign prototype."
    ],
    thumbnail: "/images/projects/portfolio-thumbnail.svg",
    presentationPath: "/presentations/personal-portfolio.html",
    downloadName: "personal-portfolio-presentation.html",
    liveUrl: "https://federico-landozzi-live-cv.vercel.app/"
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
