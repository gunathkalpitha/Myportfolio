import { portfolioData } from '../../data/portfolioData'
import logoImg from '../../assets/images/logo.jpg'
import { FaLinkedinIn, FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa'

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
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoImg}
                alt={fullName}
                className="w-10 h-10 object-cover rounded-xl border border-slate-300 shadow-sm"
              />
              <div className="flex flex-col leading-none">
                <span className="font-bold text-lg tracking-[0.2em] text-slate-800 uppercase font-display">
                  GUNATH
                </span>
                <span className="text-[9px] font-semibold tracking-[0.3em] text-slate-400 uppercase mt-1">
                  KALPITHA
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Computer Engineering undergraduate building secure full-stack systems and scalable mobile applications.
            </p>
            <div className="flex flex-wrap gap-2.5 mt-6">
              <a
                href={contact.links.find(l => l.label === 'Instagram')?.url || 'https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=22x9wt9'}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center h-10 px-3 rounded-xl border border-slate-300 bg-white hover:border-rose-400 hover:bg-rose-50/50 hover:shadow-sm transition-all duration-300 ease-out overflow-hidden"
              >
                <FaInstagram className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap text-xs font-semibold text-rose-600 transition-all duration-300 ease-out group-hover:max-w-[160px] group-hover:opacity-100 group-hover:ml-2">
                  Instagram
                </span>
              </a>
              <a
                href={contact.links.find(l => l.label === 'Facebook')?.url || 'https://www.facebook.com/share/1d3jijfBY9/'}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center h-10 px-3 rounded-xl border border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-sm transition-all duration-300 ease-out overflow-hidden"
              >
                <FaFacebook className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap text-xs font-semibold text-blue-600 transition-all duration-300 ease-out group-hover:max-w-[160px] group-hover:opacity-100 group-hover:ml-2">
                  Facebook
                </span>
              </a>
              <a
                href={contact.links.find(l => l.label === 'LinkedIn')?.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center h-10 px-3 rounded-xl border border-slate-300 bg-white hover:border-blue-500 hover:bg-blue-50/50 hover:shadow-sm transition-all duration-300 ease-out overflow-hidden"
              >
                <FaLinkedinIn className="w-3.5 h-3.5 text-blue-700 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap text-xs font-semibold text-blue-700 transition-all duration-300 ease-out group-hover:max-w-[160px] group-hover:opacity-100 group-hover:ml-2">
                  LinkedIn
                </span>
              </a>
              <a
                href={contact.links.find(l => l.label === 'GitHub')?.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center h-10 px-3 rounded-xl border border-slate-300 bg-white hover:border-slate-800 hover:bg-slate-50 hover:shadow-sm transition-all duration-300 ease-out overflow-hidden"
              >
                <FaGithub className="w-3.5 h-3.5 text-slate-800 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap text-xs font-semibold text-slate-800 transition-all duration-300 ease-out group-hover:max-w-[160px] group-hover:opacity-100 group-hover:ml-2">
                  GitHub
                </span>
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
