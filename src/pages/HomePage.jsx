import { useState, useEffect, useRef } from 'react'
import { portfolioData } from '../data/portfolioData'
import { FaInstagram, FaFacebook, FaLinkedinIn, FaGithub, FaStar } from 'react-icons/fa'
import {
  Code2,
  Layers,
  Bug,
  CalendarDays,
  Link2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
} from 'lucide-react'

// ─── Intersection Observer hook for reveal animations ───
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

// ─── Icon map for "What I Offer" ───
const offerIcons = [
  <Code2 key="1" className="w-6 h-6" />,
  <Layers key="2" className="w-6 h-6" />,
  <Bug key="3" className="w-6 h-6" />,
  <CalendarDays key="4" className="w-6 h-6" />,
  <Link2 key="5" className="w-6 h-6" />,
]

function FadeUp({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function FadeLeft({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function FadeRight({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ─── Skills marquee row ───
const skillRow1 = [
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Flutter', icon: '🐦' },
  { name: 'Supabase', icon: '⚡' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'PostgreSQL', icon: '🐘' },
]
const skillRow2 = [
  { name: 'Figma', icon: '🎨' },
  { name: 'Docker', icon: '🐳' },
  { name: 'GitHub', icon: '🐙' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'Tailwind CSS', icon: '💨' },
  { name: 'Express.js', icon: '🚂' },
  { name: 'Java', icon: '☕' },
  { name: 'Dart', icon: '🎯' },
]

function SkillMarquee({ items, direction = 'left' }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden py-3">
      <div
        className={`flex gap-4 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 whitespace-nowrap shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
          >
            <span>{s.icon}</span>
            <span>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function HomePage() {
  const { hero, about, features, testimonials, contact, fullName } = portfolioData

  // ── Hero slider ──
  const [slide, setSlide] = useState(0)
  const [playing, setPlaying] = useState(true)
  const slideCount = hero.slides.length

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setSlide((c) => (c + 1) % slideCount), 5000)
    return () => clearInterval(id)
  }, [playing, slideCount])

  const prevSlide = () => setSlide((c) => (c - 1 + slideCount) % slideCount)
  const nextSlide = () => setSlide((c) => (c + 1) % slideCount)

  // ── Typing effect for hero title ──
  const [displayText, setDisplayText] = useState('')
  const [typing, setTyping] = useState(true)
  const currentTitle = hero.slides[slide]?.caption || ''
  const titleRef = useRef(currentTitle)
  const charRef = useRef(0)

  useEffect(() => {
    titleRef.current = currentTitle
    charRef.current = 0
    setDisplayText('')
    setTyping(true)
  }, [slide])

  useEffect(() => {
    if (!typing) return
    if (charRef.current >= titleRef.current.length) { setTyping(false); return }
    const id = setTimeout(() => {
      charRef.current++
      setDisplayText(titleRef.current.slice(0, charRef.current))
    }, 35)
    return () => clearTimeout(id)
  }, [typing, displayText])

  return (
    <div className="bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══════════════════════════════════
          HERO — full-screen dark slider
      ══════════════════════════════════ */}
      <section id="home" className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Slides */}
        {hero.slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === slide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={s.imageUrl} alt={s.caption} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
          </div>
        ))}

        {/* Centre content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          {/* Slide counter */}
          <p className="text-white/60 text-sm tracking-[0.25em] mb-8 font-medium">
            0{slide + 1} / 0{slideCount}
          </p>

          {/* Typing title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-5 drop-shadow-xl leading-tight min-h-[1.2em]">
            {displayText}
            <span className="animate-blink text-white/70">|</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl">
            {hero.slides[slide]?.subtitle || hero.description}
          </p>

          {/* Dots */}
          <div className="flex gap-3 mt-12">
            {hero.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`rounded-full transition-all duration-300 focus:outline-none ${
                  i === slide ? 'w-8 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70 hover:scale-125'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/15 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm hover:bg-white/25 transition-all duration-200"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/15 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm hover:bg-white/25 transition-all duration-200"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Play/Pause bottom-left */}
        <button
          onClick={() => setPlaying((p) => !p)}
          className="absolute bottom-6 left-6 z-10 w-10 h-10 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/70 transition-all"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </section>

      {/* ══════════════════════════════════
          INTRO STRIP — Quote + Social + Experience Card
      ══════════════════════════════════ */}
      <section className="bg-[#f5f5f0] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
            {/* Quote text */}
            <FadeLeft className="max-w-2xl">
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
                I am driven by <strong className="text-gray-900">new technologies</strong>, inspiring people
                and motivating teams as a leader to achieve goals. I believe that if we can{' '}
                <strong className="text-gray-900">change the way we see the world</strong>, we can{' '}
                <strong className="text-gray-900">change the world we see</strong>.
              </p>
              {/* Follow row */}
              <div className="flex items-center gap-5">
                <span className="text-sm text-gray-500 font-medium">Follow Me on</span>
                <div className="h-[1px] w-14 bg-gray-300" />
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-rose-500 hover:border-rose-400 hover:bg-rose-50 transition-all duration-200">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
                    <FaFacebook className="w-4 h-4" />
                  </a>
                  <a href={contact.links.find(l => l.label === 'LinkedIn')?.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-blue-700 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                  <a href={contact.links.find(l => l.label === 'GitHub')?.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-800 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                    <FaGithub className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </FadeLeft>

            {/* Purple experience card */}
            <FadeRight>
              <div className="relative bg-violet-600 rounded-3xl p-10 text-white text-center shadow-2xl w-52 h-52 flex flex-col items-center justify-center overflow-hidden flex-shrink-0">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <p className="text-6xl font-extrabold leading-none">2+</p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] mt-3 opacity-90 leading-snug">
                  Years of<br />Experience
                </p>
                <Sparkles className="w-5 h-5 mt-4 opacity-75" />
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ABOUT — large photo left, text right
      ══════════════════════════════════ */}
      <section id="about" className="bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Left — full-bleed photo */}
            <FadeLeft className="h-[500px] lg:h-auto">
              <img
                src="/profile.png"
                alt={fullName}
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 10%' }}
              />
            </FadeLeft>

            {/* Right — text content */}
            <FadeRight className="flex flex-col justify-center px-10 md:px-16 py-16">
              <p className="text-xs font-bold tracking-[0.22em] text-gray-500 uppercase mb-5">About</p>
              <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-3 leading-tight">
                Gunath <span className="text-amber-500 font-normal">K</span>
              </h2>
              <p className="text-gray-500 text-lg mb-8 pb-8 border-b border-gray-200">
                Software Engineer · Lifelong Learner
              </p>
              <p className="text-gray-600 leading-loose mb-4 text-[15px]">
                I want to inspire student communities as much as possible with all my skills and capabilities — a
                purpose-driven community, globally, instead of everyone going with the flow.
              </p>
              <p className="text-gray-600 leading-loose mb-6 text-[15px]">
                I am a Computer Engineering undergraduate at the Faculty of Engineering, University of Ruhuna,
                building secure full-stack systems and scalable mobile applications.
              </p>
              <p className="text-gray-400 italic text-sm font-light">
                "If we can change the way we see the world, we can change the world we see."
              </p>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SKILLS — split bg, marquee rows
      ══════════════════════════════════ */}
      <section id="skills" className="py-20 relative">
        {/* Split background */}
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="w-1/2 bg-white" />
          <div className="w-1/2 bg-slate-900" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-start">
          {/* Left — text */}
          <FadeLeft>
            <p className="text-xs font-bold tracking-[0.22em] text-green-600 uppercase mb-4">Capabilities</p>
            <h2 className="text-5xl font-light text-gray-900 mb-3">
              My <span className="text-amber-500 font-normal">Skills</span>
            </h2>
            <p className="text-gray-500 mb-12">Tools and technologies I work with to build amazing things.</p>

            {/* Marquee skill rows */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 p-4 space-y-3">
              <SkillMarquee items={skillRow1} direction="left" />
              <SkillMarquee items={skillRow2} direction="right" />
            </div>
          </FadeLeft>

          {/* Right — decorative cloud element on dark bg */}
          <FadeRight className="flex items-center justify-center py-12">
            <div className="relative">
              {/* Abstract cloud */}
              <div className="relative w-56 h-44 text-white">
                <svg viewBox="0 0 220 160" className="w-full h-full drop-shadow-2xl fill-white">
                  <path d="M170 65 A55 55 0 0 0 65 65 A45 45 0 0 0 65 155 L170 155 A45 45 0 0 0 170 65 Z" />
                </svg>
              </div>
              {/* Lines extending left */}
              <div className="absolute top-1/3 right-full flex flex-col gap-3 pr-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                  <div className="h-0.5 w-28 bg-blue-400/60 rounded-full" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-white/80 animate-pulse" style={{ animationDelay: '0.7s' }} />
                  <div className="h-0.5 w-40 bg-white/30 rounded-full" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded bg-blue-300/80 animate-pulse" style={{ animationDelay: '1.3s' }} />
                  <div className="h-0.5 w-20 bg-blue-300/40 rounded-full" />
                </div>
              </div>
              {/* Square accents */}
              <div className="absolute -top-6 right-0 w-5 h-5 bg-blue-500/60 rounded-sm" />
              <div className="absolute -bottom-4 left-4 w-4 h-4 bg-blue-400/40 rounded-sm" />
            </div>
          </FadeRight>
        </div>
      </section>

      {/* ══════════════════════════════════
          WHAT I OFFER — top tag rows + grid cards
      ══════════════════════════════════ */}
      <section id="offerings" className="bg-white">
        {/* Tag rows — split dark/light */}
        <div className="flex">
          {/* Light side tags */}
          <div className="w-1/2 bg-white py-8 pr-8 pl-6 space-y-3 overflow-hidden">
            <div className="flex flex-wrap gap-3">
              {['Branding', 'Creative Design', 'Motion Design'].map(t => (
                <span key={t} className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 bg-gray-50 hover:border-gray-400 transition-colors">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {['Product Design', 'Web Design', 'UI/UX Audits', '+ More'].map(t => (
                <span key={t} className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 bg-gray-50 hover:border-gray-400 transition-colors">{t}</span>
              ))}
            </div>
          </div>
          {/* Dark side tags */}
          <div className="w-1/2 bg-slate-900 py-8 pl-8 pr-6 space-y-3 overflow-hidden">
            <div className="flex flex-wrap gap-3">
              {['Growth Strategy', 'Lead Nurturing', 'SEO'].map(t => (
                <span key={t} className="px-4 py-2 rounded-full border border-white/15 text-sm font-medium text-gray-200 hover:bg-white/10 transition-colors">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {['Performance Marketing', 'Go To Market', '+ More'].map(t => (
                <span key={t} className="px-4 py-2 rounded-full border border-white/15 text-sm font-medium text-gray-200 hover:bg-white/10 transition-colors">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <FadeUp className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">What I Offer</h2>
            <p className="text-gray-400 text-lg">What I think I'm good at...</p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-0 border border-gray-200">
            {features.map((feature, i) => (
              <FadeUp key={feature.id} delay={i * 80}>
                <div className="group relative border border-gray-100 bg-white p-8 h-[260px] flex flex-col justify-between hover:bg-gray-50 transition-all duration-300 overflow-hidden">
                  {/* Blue top border on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div>
                    <h3 className="text-[17px] font-semibold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                      {feature.description}
                    </p>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="text-gray-300 group-hover:text-blue-500 transition-colors duration-300">
                      {offerIcons[i % offerIcons.length]}
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* "Ready to collaborate?" pill */}
          <FadeUp className="mt-12 flex justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-gray-600 text-sm font-medium hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              Ready to collaborate? <Code2 className="w-4 h-4" />
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════ */}
      <section id="testimonials" className="bg-[#f5f5f0] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl overflow-hidden" style={{ borderTop: '6px solid #22c55e' }}>
            <div className="px-10 md:px-16 pt-14 pb-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div>
                  <p className="text-orange-500 font-bold text-sm mb-3 uppercase tracking-wider">My Testimonials</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    What They're Talking About{' '}
                    <span className="text-green-500">{fullName.split(' ')[0]}</span>
                  </h2>
                  <p className="text-gray-400 mt-3 text-base">
                    Authentic stories and endorsements from satisfied clients. Click any card to read the full recommendation.
                  </p>
                </div>
                <button className="shrink-0 flex items-center gap-2 px-6 py-3 bg-blue-500 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-500/20">
                  + Your Feedback
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {testimonials.map((t, i) => (
                  <FadeUp key={i} delay={i * 100}>
                    <div className="bg-gray-50 rounded-2xl p-7 hover:bg-white hover:shadow-lg border border-transparent hover:border-gray-100 transition-all duration-300 flex flex-col h-full cursor-pointer">
                      <div className="flex items-start gap-3 mb-5">
                        <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow" />
                        <div>
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                            {t.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{t.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5 mb-4">
                        {[...Array(t.rating)].map((_, k) => <FaStar key={k} className="w-4 h-4 text-yellow-400" />)}
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5 line-clamp-5">{t.text}</p>
                      <a href="#" className="text-green-600 text-sm font-semibold hover:text-green-700 inline-flex items-center gap-1 transition-colors">
                        Read full recommendation <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          PROJECTS — featured cards
      ══════════════════════════════════ */}
      <section id="projects" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.22em] text-green-600 uppercase mb-3">Portfolio</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Featured Projects</h2>
            <p className="text-gray-400 text-lg">Engineering solutions built with precision.</p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolioData.projects.map((project, i) => {
              const accents = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500']
              return (
                <FadeUp key={project.title} delay={i * 100}>
                  <div className="group border border-gray-100 rounded-2xl p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                    <div className={`h-1 w-12 rounded-full ${accents[i]} mb-6`} />
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{project.category}</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">{project.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">{tag}</span>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CONTACT — dark freelance section + huge quote
      ══════════════════════════════════ */}
      <section id="contact">
        {/* Dark freelance strip */}
        <div className="bg-slate-900 py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <FadeUp>
              <p className="text-white/50 text-sm uppercase tracking-widest mb-4 font-medium">Available for opportunities</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Want to work together!<br />
                <span className="text-white/70 font-light text-2xl md:text-3xl">Open to internships, collaborations &amp; engineering opportunities.</span>
              </h2>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full text-sm hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-xl mt-4"
              >
                Contact Me
              </a>
            </FadeUp>
          </div>
        </div>

        {/* Giant quote */}
        <div className="bg-[#f0f0ec] py-28 text-center">
          <FadeUp>
            <p className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-700 max-w-4xl mx-auto leading-tight px-6">
              "Powering An Extraordinary Future<br />With Infinite Possibilities"
            </p>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}

export default HomePage
