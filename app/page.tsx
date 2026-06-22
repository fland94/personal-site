import Link from "next/link";
import { ContactForm } from "@/src/components/ContactForm";
import { DailyQuote } from "@/src/components/DailyQuote";
import { projects } from "@/src/data/projects";

const expertise = [
  {
    n: "/01",
    title: "Digital Transformation",
    body:
      "Modernizing internal processes and operating models: governance, delivery standards and smarter workflows that scale across teams."
  },
  {
    n: "/02",
    title: "Project Management",
    body:
      "Roadmaps, backlog coordination, planning and reporting across multi-stream initiatives, with stakeholder management in hybrid contexts."
  },
  {
    n: "/03",
    title: "Digital Marketing",
    body:
      "CRM and DEM campaign delivery, web operations and digital asset production coordinated end to end with QA and standardization."
  },
  {
    n: "/04",
    title: "Data Science / ML",
    body:
      "Comfortable with analysis and ML concepts to structure problems, support decisions and turn operational data into clearer direction."
  },
  {
    n: "/05",
    title: "Front-End Prototyping",
    body:
      "Turning ideas into working interfaces with AI-assisted coding: fast, testable prototypes that make decisions easier before build."
  }
];

export default function Home() {
  return (
    <main id="top">
      <section className="section hero-section">
        <div className="hero-inner">
          <img className="avatar" src="/images/avatar.png" alt="Federico Landozzi" />
          <p className="eyebrow">Portfolio & CV - Project Manager, Digital Transformation</p>
          <h1 className="hero-title">
            Project management for digital transformation, where strategy, delivery, data and{" "}
            <em>AI</em> meet.
          </h1>
          <div className="title-rule" />
          <p className="hero-copy">
            I am Federico, a Project Manager working in consulting on digital transformation
            and process modernization. This site is a showcase of how I work and what I have
            built: from delivery governance to hands-on, AI-assisted prototyping.
          </p>
          <div className="button-row centered">
            <a className="btn btn-primary" href="#work">
              View Projects
            </a>
            <a className="btn btn-secondary" href="#about">
              More about me
            </a>
          </div>
        </div>
        <DailyQuote />
      </section>

      <section id="about" className="section split-section">
        <div className="split-grid">
          <div>
            <p className="eyebrow">01 - About</p>
            <img className="about-image" src="/images/profile.jpg" alt="Federico Landozzi portrait" />
            <div className="fact-list">
              <div>
                <span>Based</span>
                <strong>Rome, Italy</strong>
              </div>
              <div>
                <span>Languages</span>
                <strong>IT native / EN C1</strong>
              </div>
              <div>
                <span>Education</span>
                <strong>
                  <span>MSc Marketing / LUISS</span>
                  <span>Digital Marketing & Big Data / LUISS BS</span>
                </strong>
              </div>
              <div>
                <span>Status</span>
                <strong>PM @ Publicis Sapient</strong>
              </div>
            </div>
          </div>
          <div>
            <h2 className="section-title">
              I help organizations modernize how they plan, deliver and govern digital work.
            </h2>
            <p className="body-copy">
              My background is rooted in marketing, data and analytics. I earned my Master&apos;s
              degree (Laurea Magistrale) in Marketing at LUISS Guido Carli with a final grade of{" "}
              <strong>110/110 cum laude</strong>, then completed a Master in Digital Marketing and
              Big Data Analytics at LUISS Business School — building a solid foundation in customer
              analytics, digital strategy and data-driven decision-making.
            </p>
            <p className="body-copy">
              Today I&apos;m a <strong>Project Manager</strong> working in consulting for large
              international clients, focused on digital transformation, process modernization and
              operational governance — coordinating cross-functional teams across web operations,
              CRM campaign delivery and digital production.
            </p>
            <p className="body-copy">
              My edge is the blend: strategy, execution, technology and data in one place. I bring
              hands-on <strong>AI-assisted delivery</strong> — coding agents, prototyping,
              automation and QA — to accelerate documentation, testing and problem-solving, without
              losing governance or clarity.
            </p>
          </div>
        </div>
      </section>

      <section id="expertise" className="section expertise-section">
        <div className="section-head">
          <h2>Expertise</h2>
          <p className="eyebrow">02 - What I do</p>
        </div>
        <div className="expertise-grid">
          {expertise.map((item) => (
            <article className="expertise-card" key={item.n}>
              <span>{item.n}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="section work-section">
        <div className="section-head compact">
          <h2>Selected Work</h2>
          <p className="eyebrow">03 - Personal projects</p>
        </div>
        <p className="section-intro">
          Personal builds and experiments. Each project includes an HTML presentation that can be
          viewed in-browser or downloaded.
        </p>
        <div className="project-grid">
          {projects.map((project, index) => (
            <Link className="project-card" href={`/projects/${project.slug}`} key={project.slug}>
              <div className="project-meta">
                <span>
                  {String(index + 1).padStart(2, "0")} / {project.category}
                </span>
                <span>{project.year}</span>
              </div>
              <img src={project.thumbnail} alt="" className="project-thumb" />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-stats">
                <div>
                  <span>Role</span>
                  <strong>{project.role}</strong>
                </div>
                <div>
                  <span>Outcome</span>
                  <strong>{project.outcomeShort}</strong>
                </div>
              </div>
              <span className="project-link">View case & HTML deck</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="contact-grid">
          <div>
            <p className="eyebrow">04 - Contact</p>
            <h2 className="section-title">Let&apos;s build something deliberate.</h2>
            <p className="body-copy">
              Open to consulting conversations on digital transformation, delivery and
              AI-assisted ways of working. Tell me about the problem and I will reply as soon as I
              can.
            </p>
            <div className="contact-links">
              <a href="https://www.linkedin.com/in/federico-landozzi-771b32206/" target="_blank">
                LinkedIn
              </a>
              <a href="https://github.com/fland94" target="_blank">
                GitHub
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
