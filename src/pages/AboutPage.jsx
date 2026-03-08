import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/SectionHeading'
import { portfolioData } from '../data/portfolioData'

function AboutPage() {
  const { fullName, about, skillCategories, stats } = portfolioData

  return (
    <>
      <PageHero
        badge="About Me"
        title={`About ${fullName}`}
        description="A closer look at my engineering approach, strengths, and technologies I use to build reliable systems."
      />

      <section className="section-shell py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="soft-card p-8">
            <SectionHeading
              kicker="Profile"
              title="Engineering Mindset"
              description="I focus on clarity, velocity, and maintainability from day one."
            />
            <div className="mt-6 space-y-4 text-slate-600">
              {about.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <article className="soft-card p-8">
            <SectionHeading
              kicker="Statistics"
              title="Quick Highlights"
              description="A concise snapshot of delivery and domain exposure."
            />
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell pb-16 pt-10 md:pb-20 md:pt-12">
        <SectionHeading
          kicker="Skills"
          title="Tools and Technologies"
          description="Capabilities grouped by the way I ship software products."
          align="center"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {skillCategories.map((category) => (
            <article key={category.title} className="soft-card p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary-700">{category.title}</h3>
              <ul className="mt-5 space-y-2 text-sm text-slate-600">
                {category.items.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default AboutPage
