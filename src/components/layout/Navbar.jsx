import { NavLink } from 'react-router-dom'
import { portfolioData } from '../../data/portfolioData'

function navClass({ isActive }) {
  return isActive
    ? 'rounded-full bg-primary-100 px-4 py-2 text-primary-700'
    : 'rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-primary-700'
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav className="section-shell flex h-20 items-center justify-between">
        <NavLink to="/" className="font-display text-2xl font-bold tracking-[0.18em] text-slate-900">
          {portfolioData.brand}
        </NavLink>

        <ul className="hidden items-center gap-3 text-sm font-medium md:flex">
          {portfolioData.navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={navClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="section-shell pb-3 md:hidden">
        <div className="flex gap-2 overflow-x-auto whitespace-nowrap text-xs">
          {portfolioData.navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Navbar
