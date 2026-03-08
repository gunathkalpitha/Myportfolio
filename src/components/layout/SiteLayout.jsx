import { Outlet } from 'react-router-dom'
import ChatBotWidget from '../chat/ChatBotWidget'
import Footer from './Footer'
import Navbar from './Navbar'

function SiteLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-white to-rose-50 text-slate-800">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-20 top-20 h-72 w-72 animate-drift rounded-full bg-sky-300/35 blur-3xl" />
        <div className="absolute right-[-120px] top-64 h-96 w-96 animate-float-slow rounded-full bg-violet-300/30 blur-3xl" />
        <div className="absolute bottom-[-80px] left-1/3 h-72 w-72 animate-drift rounded-full bg-orange-300/25 blur-3xl" />
      </div>

      <Navbar />
      <main className="pb-6">
        <Outlet />
      </main>
      <Footer />
      <ChatBotWidget />
    </div>
  )
}

export default SiteLayout
