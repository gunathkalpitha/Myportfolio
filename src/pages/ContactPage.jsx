import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/SectionHeading'
import { portfolioData } from '../data/portfolioData'

function ContactPage() {
  const { contact } = portfolioData

  return (
    <>
      <PageHero
        badge="Contact Me"
        title="Get in Touch"
        description="Tell me about your project or collaboration idea. I am happy to discuss how we can build it right."
      />

      <section className="section-shell pb-16 pt-8 md:pb-20 md:pt-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="soft-card p-8">
            <SectionHeading
              kicker="Contact Details"
              title="Let's Connect"
              description={contact.subtitle}
            />
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              {contact.details.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {contact.links?.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="chip text-primary-700 transition hover:bg-primary-50"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </article>

          <article className="glass-panel p-8">
            <SectionHeading
              kicker="Message"
              title="Send a Message"
              description="This form is ready for your backend or email service integration."
            />

            <form className="mt-6 grid gap-4" onSubmit={(event) => event.preventDefault()}>
              <input
                type="text"
                placeholder="Full name"
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-primary-300 transition focus:ring-2"
              />
              <input
                type="email"
                placeholder="Email address"
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-primary-300 transition focus:ring-2"
              />
              <input
                type="text"
                placeholder="Project type"
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-primary-300 transition focus:ring-2"
              />
              <textarea
                rows={5}
                placeholder="Tell me about your project"
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-primary-300 transition focus:ring-2"
              />
              <button
                type="submit"
                className="rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
              >
                Submit
              </button>
            </form>
          </article>
        </div>
      </section>
    </>
  )
}

export default ContactPage
