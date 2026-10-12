import { useState, useEffect, useRef } from 'react'
import { portfolioData } from '../../data/portfolioData'
import logoImg from '../../assets/images/logo.jpg'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active section for underline effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Blogs', href: '#blogs' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#1c1c1c]/95 backdrop-blur-md shadow-2xl border-b border-white/10'
          : 'bg-[#1c1c1c]/80 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex h-[68px] items-center justify-between">
        {/* Brand Lockup (Logo + Spaced Typography like reference site) */}
        <a
          href="#home"
          className="flex items-center gap-3.5 group py-1 transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            src={logoImg}
            alt="Gunath Kalpitha Logo"
            className="w-10 h-10 object-cover rounded-xl border border-white/20 shadow-md group-hover:border-amber-400 group-hover:shadow-amber-500/20 transition-all duration-300"
          />
          <div className="flex flex-col leading-none">
            <span
              className="text-[15px] font-bold tracking-[0.24em] text-white uppercase group-hover:text-amber-400 transition-colors font-display"
            >
              GUNATH
            </span>
            <span className="text-[10px] font-medium tracking-[0.34em] text-gray-400 uppercase mt-1 group-hover:text-amber-300/80 transition-colors">
              KALPITHA
            </span>
          </div>
        </a>

        {/* Desktop Nav with Animated Underline (like reference site) */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const id = item.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`group relative text-[15px] font-medium transition-colors duration-300 py-2 ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {/* Underline expanding on hover and staying active */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 ease-out ${
                      isActive
                        ? 'w-full bg-blue-500 shadow-sm shadow-blue-500/50'
                        : 'w-0 group-hover:w-full bg-blue-400/80'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>
        

        {/* CTA */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg"
          >
            Talk to me
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1c1c1c]/98 border-t border-white/10 px-6 pb-4">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium text-gray-300 hover:text-white border-b border-white/10 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 block text-center py-3 bg-white text-black text-sm font-bold rounded-full"
          >
            Talk to me
          </a>
        </div>
      )}
    </header>
  )
}

export default Navbar
