import { useMemo, useState } from 'react'
import PageHero from '../components/layout/PageHero'
import { portfolioData } from '../data/portfolioData'

function PublicationsPage() {
  const { credentials } = portfolioData
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(
    () => ['All', ...new Set(credentials.map((item) => item.category))],
    [credentials],
  )
  const filtered = useMemo(
    () => (activeCategory === 'All' ? credentials : credentials.filter((item) => item.category === activeCategory)),
    [activeCategory, credentials],
  )

  return (
    <>
      <PageHero
        badge="Certifications & Activities"
        title="Credentials"
        description="A curated view of certifications, leadership, and volunteering activities that complement my technical profile."
      />

      <section className="bg-white">
        <div className="section-shell py-14 md:py-18">
          <div className="text-center mb-10">
            <p className="kicker mb-2 justify-center">Professional Growth</p>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">Certificates, Leadership & Volunteering</h2>
          </div>

          {/* Category filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-card'
                    : 'border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <article key={item.title} className="soft-card p-6 flex flex-col">
                <span className={`inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold mb-4 ${item.categoryClass}`}>
                  {item.category}
                </span>
                <h3 className="font-display text-base font-bold text-gray-900 leading-snug mb-2 flex-1">{item.title}</h3>
                <p className="text-xs leading-relaxed text-gray-500 mb-4">{item.note}</p>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">{item.issuer}</p>
                  <p className="text-xs font-bold text-blue-600 mt-0.5">{item.year}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default PublicationsPage
