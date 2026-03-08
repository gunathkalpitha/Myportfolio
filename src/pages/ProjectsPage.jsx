import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/SectionHeading'
import { portfolioData } from '../data/portfolioData'

function ProjectsPage() {
  const { projects } = portfolioData

  return (
    <>
      <PageHero
        badge="Projects"
        title="Projects"
        description="A dedicated page for product work, architecture quality, and modern technology stacks."
      />

      <section className="section-shell pb-16 pt-8 md:pb-20 md:pt-10">
        <SectionHeading
          kicker="Selected Work"
          title="Built With Precision"
          description="Each project focuses on practical outcomes, scalability, and maintainable engineering decisions."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className={`soft-card bg-gradient-to-br p-7 ${project.toneClass}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">{project.category}</p>
              <h3 className="mt-3 font-display text-3xl font-semibold text-slate-900">{project.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-700">{project.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default ProjectsPage
