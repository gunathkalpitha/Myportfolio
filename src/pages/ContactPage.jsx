import PageHero from '../components/layout/PageHero'
import { portfolioData } from '../data/portfolioData'
import { trackEvent } from '../analytics'

function ContactPage() {
  const { contact } = portfolioData

  return (
    <>
      <PageHero
        badge="Contact Me"
        title="Get in Touch"
        description="Tell me about your project or collaboration idea. I am happy to discuss how we can build it right."
      />

      <section className="bg-white">
        <div className="section-shell py-14 md:py-18">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* Contact Details */}
            <div>
              <p className="kicker mb-2">Contact Details</p>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">Let's Connect</h2>
              <div className="w-10 h-1 bg-green-500 rounded mb-6" />
              <p className="text-gray-500 mb-8">{contact.subtitle}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email</p>
                    <a href={`mailto:${contact.email}`} className="text-sm text-gray-900 hover:text-blue-600 transition-colors font-medium">{contact.email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</p>
                    <p className="text-sm text-gray-900 font-medium">{contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Location</p>
                    <p className="text-sm text-gray-900 font-medium">{contact.location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {contact.links?.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('social_link_click', { event_category: 'outbound', event_label: link.label, link_url: link.url })}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-all hover:-translate-y-0.5 shadow-sm"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
              <h3 className="font-display text-xl font-bold text-gray-900 mb-6">Send a Message</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); trackEvent('contact_form_submit', { event_category: 'engagement', event_label: 'Contact Page Form' }) }}>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    placeholder="Project type or topic"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-card hover:-translate-y-0.5"
                >
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage
