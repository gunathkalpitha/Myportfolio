import { useMemo, useState } from 'react'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/SectionHeading'
import { portfolioData } from '../data/portfolioData'

function PublicationsPage() {
  const { publications } = portfolioData
  const [activeCategory, setActiveCategory] = useState('All Topics')

  const categories = useMemo(() => ['All Topics', ...new Set(publications.map((post) => post.category))], [publications])
  const filtered = useMemo(
    () =>
      activeCategory === 'All Topics'
        ? publications
        : publications.filter((post) => post.category === activeCategory),
    [activeCategory, publications],
  )

  return (
    <>
      <PageHero
        badge="Publications"
        title="Blogs and Publications"
        description="A separate space for technical articles, applied insights, and practical ideas across software domains."
      />

      <section className="section-shell pb-16 pt-8 md:pb-20 md:pt-10">
        <SectionHeading
          kicker="Knowledge"
          title="Latest Articles"
          description="Browse by topic and explore articles that are practical, readable, and implementation-focused."
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
          {filtered.map((post) => (
            <article key={post.title} className="soft-card p-6 transition hover:-translate-y-1">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${post.categoryClass}`}>
                {post.category}
              </span>
              <h3 className="mt-4 text-2xl font-semibold text-slate-900">{post.title}</h3>
              <div className="mt-6 text-sm text-slate-500">
                <p>{post.date}</p>
                <p className="text-primary-700">{post.readTime}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default PublicationsPage
