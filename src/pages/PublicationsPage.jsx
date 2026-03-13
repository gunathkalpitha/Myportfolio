import { useMemo, useState } from 'react'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/SectionHeading'
import { portfolioData } from '../data/portfolioData'

function PublicationsPage() {
  const { credentials } = portfolioData
  const [activeCategory, setActiveCategory] = useState('All Categories')

  const categories = useMemo(() => ['All Categories', ...new Set(credentials.map((item) => item.category))], [credentials])
  const filtered = useMemo(
    () =>
      activeCategory === 'All Categories'
        ? credentials
        : credentials.filter((item) => item.category === activeCategory),
    [activeCategory, credentials],
  )

  return (
    <>
      <PageHero
        badge="Certifications and Activities"
        title="Credentials and Community Involvement"
        description="A curated view of certifications, leadership, and volunteering activities that complement my technical profile."
      />

      <section className="section-shell pb-16 pt-8 md:pb-20 md:pt-10">
        <SectionHeading
          kicker="Professional Growth"
          title="Certificates, Leadership, and Volunteering"
          description="Track learning milestones and extracurricular contributions by category."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'border border-slate-300 bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <article key={item.title} className="soft-card p-6 transition hover:-translate-y-1">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.categoryClass}`}>
                {item.category}
              </span>
              <h3 className="mt-4 text-2xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.note}</p>
              <div className="mt-6 text-sm text-slate-500">
                <p>{item.issuer}</p>
                <p className="text-primary-700">{item.year}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default PublicationsPage
