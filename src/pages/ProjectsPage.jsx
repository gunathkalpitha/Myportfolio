import PageHero from '../components/layout/PageHero'
import { portfolioData } from '../data/portfolioData'

function ProjectsPage() {
  const { projects } = portfolioData

  const accentColors = ['bg-blue-500', 'bg-emerald-500', 'bg-violet-500']

  return (
    <>
      <PageHero
        badge="Projects"
        title="My Projects"
        description="A dedicated page for product work, architecture quality, and modern technology stacks."
      />

      <section className="bg-white">
        <div className="section-shell py-14 md:py-18">
          <div className="text-center mb-12">
            <p className="kicker mb-2 justify-center">Selected Work</p>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">Built With Precision</h2>
            <p className="mt-3 text-gray-500 max-w-lg mx-auto">
              Each project focuses on practical outcomes, scalability, and maintainable engineering decisions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <article key={project.title} className="project-card flex flex-col">
                <div className={`h-1.5 w-full rounded-full mb-5 ${accentColors[i % accentColors.length]}`} />
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">{project.category}</p>
                <h3 className="font-display text-lg font-bold text-gray-900 mb-3 leading-snug">{project.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500 flex-1 mb-5">{project.summary}</p>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ProjectsPage
