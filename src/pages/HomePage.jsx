import { useState, useEffect, useRef } from 'react'
import { portfolioData } from '../data/portfolioData'
import { trackEvent } from '../analytics'
import profileImg from '../assets/images/profile.png'
import TechShowcase from '../components/home/TechShowcase'
import { FaInstagram, FaFacebook, FaLinkedinIn, FaGithub, FaStar, FaMedium } from 'react-icons/fa'
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
  Mail,
  Phone,
  MapPin,
  Send,
  Maximize2,
  ExternalLink,
  X,
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
  const { hero, about, features, blogs, contact, fullName, testimonials } = portfolioData
  const [loading, setLoading] = useState(true)
  const [liveTestimonials, setLiveTestimonials] = useState(testimonials || [])
  const [mediumPosts, setMediumPosts] = useState([])
  const [loadingMedium, setLoadingMedium] = useState(true)
  const [projectFilter, setProjectFilter] = useState('all')
  const [lightboxProject, setLightboxProject] = useState(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxProject(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    // Fetch live Medium articles via RSS feed
    const fetchMediumArticles = async () => {
      try {
        const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@gbgunathkalpitha18')
        const data = await res.json()
        if (data?.status === 'ok' && Array.isArray(data.items)) {
          const parsed = data.items.map((item, idx) => ({
            id: item.guid || idx,
            title: item.title,
            link: item.link,
            date: new Date(item.pubDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            category: item.categories?.[0] || 'Software Engineering',
            image: item.thumbnail || (item.description && item.description.match(/<img[^>]+src="([^">]+)"/)?.[1]) || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
          }))
          setMediumPosts(parsed)
        }
      } catch (err) {
        console.error('Failed to fetch Medium articles:', err)
      } finally {
        setLoadingMedium(false)
      }
    }
    fetchMediumArticles()
  }, [])

  useEffect(() => {
    // Fetch live testimonials from Google Sheets CSV
    const fetchRecommendations = async () => {
      try {
        const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRI4CJMeBLT1FGpZ1CW95HLcPEzWvZuTQYa9J0qSRCe8iO2MSZPHUJOJBxRAreSRrTDQaIpBXHhIhvz/pub?output=csv')
        const text = await res.text()
        
        const rows = []
        let currentRow = []
        let currentCell = ''
        let inQuotes = false
        
        for (let i = 0; i < text.length; i++) {
          const c = text[i]
          if (c === '"') {
            if (inQuotes && text[i+1] === '"') { currentCell += '"'; i++; }
            else inQuotes = !inQuotes
          } else if (c === ',' && !inQuotes) {
            currentRow.push(currentCell)
            currentCell = ''
          } else if ((c === '\n' || c === '\r') && !inQuotes) {
            if (c === '\r' && text[i+1] === '\n') i++ 
            currentRow.push(currentCell)
            rows.push(currentRow)
            currentRow = []
            currentCell = ''
          } else {
            currentCell += c
          }
        }
        if (currentCell || currentRow.length > 0) {
          currentRow.push(currentCell)
          rows.push(currentRow)
        }
        
        const parsed = rows.slice(1).filter(row => row.length >= 5).map(row => ({
          email: row[1] || '',
          name: row[2] || 'Anonymous',
          role: row[3] || '',
          text: row[4] || '',
          rating: parseInt(row[5]) || 5
        })).filter(t => t.text.trim() !== '')
        
        if (parsed.length > 0) {
          setLiveTestimonials(parsed)
        }
      } catch (err) {
        console.error("Failed to fetch recommendations:", err)
      }
    }
    fetchRecommendations()
  }, [])

  useEffect(() => {
    // Simple fast preloader to ensure smooth initial paint and nice effect
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

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

      {/* Preloader */}
      <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900 transition-opacity duration-1000 pointer-events-none ${loading ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>

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
            <img 
              src={s.imageUrl} 
              alt={s.caption} 
              loading={i === 0 ? "eager" : "lazy"} 
              fetchPriority={i === 0 ? "high" : "auto"}
              className="w-full h-full object-cover" 
            />
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
              {/* Follow row — expandable animated social pill buttons like reference site */}
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm text-gray-500 font-medium">Follow Me on</span>
                <div className="h-[1px] w-12 bg-gray-300 hidden sm:block" />
                <div className="flex flex-wrap gap-2.5">
                  {/* Instagram */}
                  <a
                    href={contact.links.find(l => l.label === 'Instagram')?.url || 'https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=22x9wt9'}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center h-[46px] px-3.5 rounded-xl border border-gray-200 bg-white hover:border-rose-400 hover:bg-rose-50/50 hover:shadow-md transition-all duration-300 ease-out overflow-hidden"
                  >
                    <FaInstagram className="w-4 h-4 text-rose-500 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap text-xs font-semibold text-rose-600 transition-all duration-300 ease-out group-hover:max-w-[200px] group-hover:opacity-100 group-hover:ml-2.5">
                      Follow on Instagram
                    </span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={contact.links.find(l => l.label === 'Facebook')?.url || 'https://www.facebook.com/share/1d3jijfBY9/'}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center h-[46px] px-3.5 rounded-xl border border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-md transition-all duration-300 ease-out overflow-hidden"
                  >
                    <FaFacebook className="w-4 h-4 text-blue-600 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap text-xs font-semibold text-blue-600 transition-all duration-300 ease-out group-hover:max-w-[200px] group-hover:opacity-100 group-hover:ml-2.5">
                      Add on Facebook
                    </span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={contact.links.find(l => l.label === 'LinkedIn')?.url || 'https://www.linkedin.com/in/gunath-kalpitha/'}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center h-[46px] px-3.5 rounded-xl border border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50/50 hover:shadow-md transition-all duration-300 ease-out overflow-hidden"
                  >
                    <FaLinkedinIn className="w-4 h-4 text-blue-700 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap text-xs font-semibold text-blue-700 transition-all duration-300 ease-out group-hover:max-w-[200px] group-hover:opacity-100 group-hover:ml-2.5">
                      View My Profile
                    </span>
                  </a>

                  {/* GitHub */}
                  <a
                    href={contact.links.find(l => l.label === 'GitHub')?.url || 'https://github.com/gunathkalpitha'}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center h-[46px] px-3.5 rounded-xl border border-gray-200 bg-white hover:border-gray-800 hover:bg-gray-50 hover:shadow-md transition-all duration-300 ease-out overflow-hidden"
                  >
                    <FaGithub className="w-4 h-4 text-gray-800 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap text-xs font-semibold text-gray-800 transition-all duration-300 ease-out group-hover:max-w-[200px] group-hover:opacity-100 group-hover:ml-2.5">
                      Explore on GitHub
                    </span>
                  </a>
                </div>
              </div>
            </FadeLeft>

            {/* Purple experience card */}
            {/* <FadeRight>
              <div className="relative bg-violet-600 rounded-3xl p-10 text-white text-center shadow-2xl w-52 h-52 flex flex-col items-center justify-center overflow-hidden flex-shrink-0">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <p className="text-6xl font-extrabold leading-none">2+</p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] mt-3 opacity-90 leading-snug">
                  Years of<br />Experience
                </p>
                <Sparkles className="w-5 h-5 mt-4 opacity-75" />
              </div>
            </FadeRight> */}
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
                src={profileImg}
                alt={fullName}
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 10%' }}
              />
            </FadeLeft>

            {/* Right — text content */}
            <FadeRight className="flex flex-col justify-center px-10 md:px-16 py-16">
              <p className="text-xs font-bold tracking-[0.22em] text-gray-500 uppercase mb-5">About</p>
              <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-3 leading-tight">
                Gunath <span className="text-amber-500 font-normal">Kalpitha</span>
              </h2>
              <p className="text-gray-500 text-lg mb-8 pb-8 border-b border-gray-200">
                Computer Engineer · Lifelong Learner
              </p>
              {about.map((text, i) => (
                <p key={i} className={`text-gray-600 leading-loose mb-4 text-[15px] ${i === about.length - 1 ? 'italic font-light text-gray-400' : ''}`}>
                  {i === about.length - 1 ? `"${text}"` : text}
                </p>
              ))}
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

          {/* Right — interactive tech architecture & skills console on dark bg */}
          <FadeRight className="flex items-center justify-center w-full">
            <TechShowcase />
          </FadeRight>
        </div>
      </section>

      {/* ══════════════════════════════════
          WHAT I OFFER — top tag rows + grid cards
      ══════════════════════════════════ */}
      <section id="offerings" className="bg-white">
        {/* Tag rows — split dark/light */}
       

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
          BLOGS
      ══════════════════════════════════ */}
      <section id="blogs" className="bg-[#f5f5f0] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl overflow-hidden" style={{ borderTop: '6px solid #3b82f6' }}>
            <div className="px-10 md:px-16 pt-14 pb-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-blue-500 font-bold text-xs uppercase tracking-wider">
                      Medium Publication · @gbgunathkalpitha18
                    </p>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display">
                    Latest <span className="text-blue-500">Articles</span>
                  </h2>
                  <p className="text-gray-400 mt-2 text-base">
                    Thoughts, learnings, and technical deep-dives on Software Engineering & Architecture.
                  </p>
                </div>

                <a
                  href="https://medium.com/@gbgunathkalpitha18/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
                >
                  <FaMedium className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Read on Medium</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {mediumPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {mediumPosts.map((blog, i) => (
                    <FadeUp key={blog.id || i} delay={i * 100}>
                      <a
                        href={blog.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackEvent('blog_click', { event_category: 'outbound', event_label: blog.title, link_url: blog.link })}
                        className="block group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300"
                      >
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                            <FaMedium className="w-3 h-3 text-amber-400" />
                            {blog.category}
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-center text-xs text-gray-400 mb-3 font-medium">
                            <span>{blog.date}</span>
                            <span>by {fullName.split(' ')[0]}</span>
                          </div>
                          <h4 className="font-bold text-gray-900 text-lg mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {blog.title}
                          </h4>
                          <span className="text-blue-600 text-sm font-semibold inline-flex items-center gap-1">
                            Read on Medium <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </a>
                    </FadeUp>
                  ))}
                </div>
              ) : (
                /* Connected Medium Profile Showcase when no posts yet */
                <FadeUp>
                  <div className="rounded-2xl border border-gray-200/80 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-8 md:p-12 text-center max-w-3xl mx-auto shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto mb-6 shadow-md shadow-slate-900/20 group hover:scale-105 transition-transform">
                      <FaMedium className="w-8 h-8" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-4 border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Feed Connected · @gbgunathkalpitha18
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-display">
                      Writing on Software Engineering & Architecture
                    </h3>
                    <p className="text-gray-600 max-w-xl mx-auto mb-6 text-[15px] leading-relaxed">
                      Articles and deep-dives on Full-Stack Development, Flutter Systems, Clean Code, and Scalable APIs will synchronize here automatically as they are published.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                      {['Full-Stack Engineering', 'Flutter & Mobile', 'API Design', 'System Architecture', 'Clean Code'].map((topic) => (
                        <span key={topic} className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-700 shadow-2xs">
                          #{topic}
                        </span>
                      ))}
                    </div>
                    <a
                      href="https://medium.com/@gbgunathkalpitha18/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-slate-900 hover:bg-black text-white text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <FaMedium className="w-4 h-4" />
                      <span>Follow @gbgunathkalpitha18 on Medium</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </FadeUp>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          PROJECTS — Januda J Kodithuwakku style
      ══════════════════════════════════ */}
      <section id="projects" className="bg-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header with ambient glow, subtitle, and title */}
          <FadeUp className="text-center mb-12 relative">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-blue-100/70 absolute -top-5 left-1/2 -translate-x-1/2 -z-10 blur-xl pointer-events-none" />
              <p className="text-sm md:text-base font-medium text-slate-500 italic mb-2 tracking-wide font-serif">
                Engineering solutions built with precision and passion
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-8">
              Projects
            </h2>

            {/* Filter Tabs with active underline animation */}
            <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap">
              {[
                { id: 'all', label: 'All Work' },
                { id: 'mobile', label: 'Mobile & Web Platforms' },
                { id: 'iot', label: 'IoT & Embedded Systems' },
              ].map((tab) => {
                const isActive = projectFilter === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setProjectFilter(tab.id)}
                    className={`relative pb-2 px-3 text-sm md:text-base font-semibold transition-colors duration-200 ${
                      isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300" />
                    )}
                  </button>
                )
              })}
            </div>
          </FadeUp>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects
              .filter((p) => projectFilter === 'all' || p.filterCategory === projectFilter)
              .map((project, i) => (
                <FadeUp key={project.title} delay={i * 100}>
                  <div className="group relative bg-white rounded-3xl p-5 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-12px_rgba(37,99,235,0.15)] hover:border-blue-300 hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col h-full">
                    {/* Mockup Showcase Container */}
                    <div
                      className="relative overflow-hidden rounded-2xl bg-slate-950 aspect-[16/10] mb-5 group/thumb cursor-pointer shadow-inner border border-slate-900/10"
                      onClick={() => { trackEvent('project_click', { event_category: 'engagement', event_label: project.title }); setLightboxProject(project) }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      {/* Badge pill on image */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/75 backdrop-blur-md text-[11px] font-semibold text-white tracking-wide border border-white/10 shadow-sm flex items-center gap-1.5 z-10">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            project.id === 'nbro'
                              ? 'bg-sky-400 animate-pulse'
                              : project.id === 'sentry'
                              ? 'bg-emerald-400 animate-pulse'
                              : 'bg-amber-400 animate-pulse'
                          }`}
                        />
                        {project.badge}
                      </div>
                      {/* Hover overlay with zoom and live link icons */}
                      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-20">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setLightboxProject(project)
                          }}
                          className="w-12 h-12 rounded-full bg-white text-slate-900 hover:bg-blue-600 hover:text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-200"
                          title="Inspect Architecture Diagram"
                        >
                          <Maximize2 className="w-5 h-5" />
                        </button>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-12 h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-200"
                            title="Open Live Project"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content details */}
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                      {project.category}
                    </p>
                    <h3
                      onClick={() => setLightboxProject(project)}
                      className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 mb-2.5 cursor-pointer line-clamp-2 min-h-[3.5rem] flex items-start"
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1 line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Tag pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 text-[11px] font-medium text-slate-600 border border-slate-200/60 group-hover:border-blue-100 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Card bottom action */}
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setLightboxProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 uppercase tracking-wider group/link transition-colors"
                      >
                        <span>View Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" />
                      </button>
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white text-xs font-bold transition-all shadow-sm"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">Click to inspect</span>
                      )}
                    </div>
                  </div>
                </FadeUp>
              ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxProject && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxProject(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/20 relative max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    {lightboxProject.badge}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-medium text-slate-500">{lightboxProject.category}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxProject(null)}
                  className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center transition-colors"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto p-6 md:p-8 space-y-6">
                <div className="rounded-2xl overflow-hidden bg-slate-950 shadow-inner border border-slate-800">
                  <img
                    src={lightboxProject.image}
                    alt={lightboxProject.title}
                    className="w-full h-auto object-contain max-h-[58vh] mx-auto"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{lightboxProject.title}</h3>
                  <p className="text-base text-slate-600 leading-relaxed mb-5">{lightboxProject.summary}</p>
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <div className="flex flex-wrap gap-2">
                      {lightboxProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-blue-50 text-xs font-semibold text-blue-700 border border-blue-200/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {lightboxProject.liveUrl && (
                      <a
                        href={lightboxProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all ml-auto"
                      >
                        <span>Visit Live Project</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════
          RECOMMENDATIONS
      ══════════════════════════════════ */}
      <section className="py-24 bg-[#f8f9fa] border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <FadeUp className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-blue-600 uppercase mb-3">Testimonials</p>
              <h2 className="text-4xl font-bold text-gray-900">What People Say</h2>
            </div>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSdTu-4bdi3fGaBMREnURcWl7PYGRr6rufeUEPRNU0URwX2rnA/viewform?usp=dialog" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-full hover:border-blue-500 hover:text-blue-600 shadow-sm hover:shadow transition-all"
              title="Sign in to your Google Account to submit a recommendation"
            >
              Leave a recommendation <ArrowRight className="w-4 h-4" />
            </a>
          </FadeUp>
        </div>
        
        {/* Full Width Marquee */}
        <div className="w-full pb-8">
          <div className="flex gap-6 animate-marquee-left" style={{ width: 'max-content' }}>
            {liveTestimonials && liveTestimonials.length > 0 ? (
              [...liveTestimonials, ...liveTestimonials, ...liveTestimonials, ...liveTestimonials].slice(0, 10).map((item, i) => (
                <div key={i} className="w-[450px] bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col whitespace-normal">
                  <div className="flex gap-1 mb-4 text-yellow-400">
                    {[...Array(item.rating || 5)].map((_, k) => <FaStar key={k} className="w-4 h-4" />)}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-8 flex-1 text-lg">"{item.text}"</p>
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-50 mt-auto">
                    <img 
                      src={item.email ? `https://unavatar.io/${item.email}?fallback=https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random` : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random`} 
                      alt={item.name} 
                      className="w-12 h-12 rounded-full object-cover bg-gray-200 border border-gray-200 shadow-sm"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-base">{item.name}</p>
                      {item.role && <p className="text-sm text-gray-500">{item.role}</p>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-screen px-6">
                <div className="max-w-7xl mx-auto bg-white border border-gray-100 rounded-3xl p-10 shadow-sm text-center">
                  <p className="text-gray-600 text-lg">No recommendations yet. Be the first to leave one!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CONTACT
      ══════════════════════════════════ */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Left side - Contact Info */}
            <FadeLeft className="flex flex-col justify-center">
              <p className="text-xs font-bold tracking-[0.22em] text-blue-600 uppercase mb-3">Get in Touch</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's work together!</h2>
              <p className="text-gray-500 mb-10 leading-relaxed text-lg">
                I'm open to internships, collaborations & engineering opportunities. Fill out the form or reach out via email.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Email</p>
                    <p className="text-gray-500">{contact.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-500">{contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Location</p>
                    <p className="text-gray-500">{contact.location}</p>
                  </div>
                </div>
              </div>
            </FadeLeft>

            {/* Right side - Formspree form */}
            <FadeRight>
              <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-2xl shadow-blue-900/5">
                <form action="https://formspree.io/f/mjygrrlq" method="POST" className="space-y-6" onSubmit={() => trackEvent('contact_form_submit', { event_category: 'engagement', event_label: 'Home Page Form' })}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" name="name" id="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" name="email" id="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50" placeholder="youremail@example.com" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea name="message" id="message" rows="4" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 resize-none" placeholder="Tell me about your project..."></textarea>
                  </div>
                  <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </FadeRight>

          </div>
        </div>

        {/* Giant quote */}
        <div className="bg-[#f0f0ec] py-28 text-center mt-24">
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
