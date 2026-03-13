import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import { portfolioData } from '../data/portfolioData'

function HomePage() {
  const { fullName, hero, stats, highlightTags, features, projects, credentials, achievements } = portfolioData
  const featuredProjects = projects.slice(0, 3)
  const featuredCredentials = credentials.slice(0, 3)
  const heroSlides = useMemo(() => {
    if (hero.slides?.length) {
      return hero.slides
    }

    return [
      {
        id: 'default-slide',
        caption: hero.description,
        imageUrl:
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2200&q=80',
      },
    ]
  }, [hero.description, hero.slides])

  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (heroSlides.length < 2) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 5000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [heroSlides.length])

  const currentSlide = heroSlides[activeSlide] ?? heroSlides[0]

  return (
    <>
      <section className="relative isolate min-h-[500px] overflow-hidden md:min-h-[620px]">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === activeSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />
          ))}
          <div className="absolute inset-0 bg-slate-900/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-slate-900/20" />
        </div>

        <div className="section-shell relative z-10 flex min-h-[500px] items-center py-14 md:min-h-[620px] md:py-20">
          <div className="max-w-3xl animate-fade-up text-white">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100">
              {hero.badge}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-7xl">{hero.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-100">{hero.description}</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-200">{currentSlide.caption}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={hero.ctaPrimary.to}
                className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-600"
              >
                {hero.ctaPrimary.label}
              </Link>
              <Link
                to={hero.ctaSecondary.to}
                className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                {hero.ctaSecondary.label}
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {highlightTags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-slate-100">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-left">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                  <p className="font-display text-2xl font-bold text-white">{item.value}</p>
                  <p className="text-xs text-slate-100">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section-shell absolute inset-x-0 bottom-6 z-10">
          <div className="flex justify-center gap-2 md:justify-start">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition-all ${
                  activeSlide === index ? 'w-8 bg-white' : 'w-2.5 bg-white/60 hover:bg-white/85'
                }`}
              />
            ))}
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
              kicker="Certifications and Leadership"
              title="Credentials Snapshot"
              description="Professional learning milestones and community roles that support my engineering growth."
            />
            <Link to="/publications" className="chip text-primary-700">
              View all credentials
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {featuredCredentials.map((credential) => (
              <article key={credential.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${credential.categoryClass}`}>
                  {credential.category}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{credential.title}</h3>
                <p className="mt-3 text-sm text-slate-500">{credential.issuer}</p>
                <p className="text-sm text-primary-700">{credential.year}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-16 pt-12 md:pb-20 md:pt-16">
        <SectionHeading
          kicker="Highlights"
          title={`Professional Milestones of ${fullName}`}
          description="A concise view of education, competition performance, and end-to-end project strengths."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {achievements.map((item) => (
            <article key={item.title} className="soft-card p-7">
              <h3 className="font-display text-2xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-primary-700">{item.meta}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default HomePage
