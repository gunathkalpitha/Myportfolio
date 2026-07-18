import { portfolioData } from '../../data/portfolioData'
import { FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa'

function Footer() {
  const { contact, fullName, navItems } = portfolioData
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#f0f0ec]">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p className="font-bold text-2xl tracking-tight text-slate-800 mb-4">GUNATH</p>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Computer Engineering undergraduate building secure full-stack systems and scalable mobile applications.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:text-rose-500 hover:border-rose-400 transition-all duration-200">
                <FaInstagram className="w-3.5 h-3.5" />
              </a>
              <a href={contact.links.find(l => l.label === 'LinkedIn')?.url} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-400 transition-all duration-200">
                <FaLinkedinIn className="w-3.5 h-3.5" />
              </a>
              <a href={contact.links.find(l => l.label === 'GitHub')?.url} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-500 transition-all duration-200">
                <FaGithub className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">Navigation</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.to}>
                  <a href={item.to} className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">Stay in the loop</h4>
            <div className="space-y-3">
              <a href={`mailto:${contact.email}`} className="block text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200">
                {contact.email}
              </a>
              <p className="text-sm text-slate-600">{contact.phone}</p>
              <p className="text-sm text-slate-600">{contact.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">© {year} {fullName}. All rights reserved.</p>
          <p className="text-xs text-slate-400">Built with React · Vite · Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
