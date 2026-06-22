import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/src/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found | Federico Landozzi"
    };
  }

  return {
    title: `${project.title} | Federico Landozzi`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Federico Landozzi`,
      description: project.description,
      images: [{ url: project.thumbnail }]
    }
  };
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="project-detail">
      <section className="detail-hero">
        <Link className="back-link" href="/#work">
          Back to projects
        </Link>
        <div className="detail-bar">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
      </section>

      <section className="detail-grid">
        <div className="presentation-panel">
          <div className="browser-bar">
            <span />
            <span />
            <span />
            <strong>{project.downloadName}</strong>
          </div>
          <iframe
            src={project.presentationPath}
            title={`${project.title} HTML presentation`}
            className="presentation-frame"
          />
          <div className="presentation-actions">
            <a className="btn btn-secondary" href={project.presentationPath} target="_blank">
              Open HTML
            </a>
            <a className="btn btn-primary" href={project.presentationPath} download={project.downloadName}>
              Download HTML
            </a>
          </div>
        </div>

        <aside className="detail-side">
          <div className="detail-card">
            <div>
              <span>Role</span>
              <strong>{project.role}</strong>
            </div>
            <div>
              <span>Outcome</span>
              <strong>{project.outcome}</strong>
            </div>
            <div>
              <span>Stack & tools</span>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="highlights">
            <span>Highlights</span>
            {project.highlights.map((highlight) => (
              <p key={highlight}>{highlight}</p>
            ))}
          </div>

          <div className="detail-links">
            {project.sourceUrl ? (
              <a href={project.sourceUrl} target="_blank">
                View source
              </a>
            ) : null}
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank">
                View live
              </a>
            ) : null}
            <Link href="/#contact">Discuss a similar project</Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
