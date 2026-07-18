function PageHero({ badge, title, description }) {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=80)',
        minHeight: '340px',
      }}
    >
      <div className="absolute inset-0 page-hero-overlay" />
      <div className="relative section-shell py-20 md:py-28">
        <p className="text-green-400 text-sm font-bold uppercase tracking-[0.15em] mb-2">{badge}</p>
        <div className="w-12 h-1 bg-green-400 rounded mb-5" />
        <h1 className="font-display text-5xl font-bold text-white md:text-6xl leading-tight animate-fade-up">
          {title}
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl animate-fade-up-d1">{description}</p>
      </div>
    </section>
  )
}

export default PageHero
