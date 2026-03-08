import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import { portfolioData } from '../data/portfolioData'

function HomePage() {
  const { fullName, hero, stats, highlightTags, features, projects, publications, testimonials } = portfolioData
  const featuredProjects = projects.slice(0, 3)
  const recentPublications = publications.slice(0, 3)

  return (
    <>
      <section className="section-shell py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="animate-fade-up">
            <span className="kicker">{hero.badge}</span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{hero.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={hero.ctaPrimary.to}
                className="rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
              >
                {hero.ctaPrimary.label}
              </Link>
              <Link
                to={hero.ctaSecondary.to}
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                {hero.ctaSecondary.label}
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {highlightTags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel p-7 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Snapshot</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {stats.map((stat, index) => (
                <article
                  key={stat.label}
                  className={`rounded-2xl border border-slate-200 bg-white p-4 ${index === 2 ? 'sm:col-span-2' : ''}`}
                >
                  <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <SectionHeading
          kicker="What I Offer"
          title="Core Features"
          description="A clear overview of what you can expect when working with me."
          align="center"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.id} className="soft-card p-6 transition duration-300 hover:-translate-y-1">
              <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${feature.accentClass}`}>
                {feature.id}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            kicker="Featured Projects"
            title="Builds with Real Impact"
            description="Selected products that combine usability, reliability, and strong architecture."
          />
          <Link to="/projects" className="chip text-primary-700">
            View all projects
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <article
              key={project.title}
              className={`soft-card bg-gradient-to-br p-6 ${project.toneClass}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">{project.category}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-slate-900">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
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

      <section className="section-shell py-12 md:py-16">
        <div className="soft-card p-8 md:p-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              kicker="Publications"
              title="Fresh Insights"
              description="Recent articles and technical writing across AI, cloud, and software engineering."
            />
            <Link to="/publications" className="chip text-primary-700">
              View all publications
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {recentPublications.map((post) => (
              <article key={post.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${post.categoryClass}`}>
                  {post.category}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{post.title}</h3>
                <p className="mt-4 text-sm text-slate-500">{post.date}</p>
                <p className="text-sm text-primary-700">{post.readTime}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-16 pt-12 md:pb-20 md:pt-16">
        <SectionHeading
          kicker="Testimonials"
          title={`What People Say About ${fullName}`}
          description="Real feedback from peers and collaborators."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item) => (
            <article key={item.name} className="soft-card p-7">
              <p className="text-sm leading-relaxed text-slate-700">"{item.quote}"</p>
              <p className="mt-4 font-display text-xl font-semibold text-slate-900">{item.name}</p>
              <p className="text-sm text-primary-700">{item.role}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default HomePage
