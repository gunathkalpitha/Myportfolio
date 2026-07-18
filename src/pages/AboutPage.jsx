import PageHero from '../components/layout/PageHero'
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

      {/* Profile + Bio */}
      <section className="bg-white">
        <div className="section-shell py-14 md:py-18">
          <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
            {/* Profile card */}
            <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-gray-50 p-8 lg:w-64 shadow-sm">
              <div className="relative mb-4">
                <div className="absolute inset-[-3px] rounded-full bg-gradient-to-br from-blue-400 via-violet-500 to-blue-600" />
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src="/profile.png"
                    alt={fullName}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 5%' }}
                  />
                </div>
              </div>
              <h2 className="font-display text-xl font-bold text-gray-900 text-center">{fullName}</h2>
              <p className="text-sm text-blue-600 font-semibold text-center mt-1">Computer Engineering</p>
              <p className="text-xs text-gray-500 text-center mt-1">University of Ruhuna, Sri Lanka</p>
              <div className="mt-6 w-full space-y-3">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-xl bg-white border border-gray-100 p-3 text-center shadow-sm">
                    <p className="font-display text-2xl font-black text-blue-600">{item.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Text content */}
            <div>
              <p className="kicker mb-2">Profile</p>
              <h3 className="font-display text-3xl font-bold text-gray-900 mb-2">Engineering Mindset</h3>
              <div className="w-10 h-1 bg-green-500 rounded mb-6" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-gray-50">
        <div className="section-shell py-14 md:py-18">
          <div className="text-center mb-12">
            <p className="kicker mb-2 justify-center">Skills</p>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">Tools & Technologies</h2>
            <p className="mt-3 text-gray-500 max-w-lg mx-auto">Capabilities grouped by the way I ship software products.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((cat, i) => {
              const accents = ['bg-blue-500', 'bg-violet-500', 'bg-emerald-500', 'bg-orange-500', 'bg-pink-500', 'bg-cyan-500']
              return (
                <article key={cat.title} className="soft-card p-6">
                  <div className={`w-8 h-1 ${accents[i % accents.length]} rounded mb-4`} />
                  <h3 className="font-display text-sm font-bold uppercase tracking-widest text-gray-800 mb-4">{cat.title}</h3>
                  <ul className="space-y-1.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutPage
