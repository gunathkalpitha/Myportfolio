function PageHero({ badge, title, description }) {
  return (
    <section className="section-shell py-14 md:py-20">
      <div className="soft-card bg-gradient-to-r from-sky-100/70 via-white to-rose-100/70 p-8 md:p-12">
        <span className="kicker">{badge}</span>
        <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-slate-900 md:text-6xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">{description}</p>
      </div>
    </section>
  )
}

export default PageHero
