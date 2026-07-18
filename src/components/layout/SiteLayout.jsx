import { Outlet } from 'react-router-dom'
import ChatBotWidget from '../chat/ChatBotWidget'
import Footer from './Footer'
import Navbar from './Navbar'

function SiteLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatBotWidget />
    </div>
  )
}

export default SiteLayout
