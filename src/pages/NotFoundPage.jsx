import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="section-shell py-24 md:py-32">
      <div className="soft-card mx-auto max-w-2xl p-10 text-center">
        <p className="kicker">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-slate-900">Page Not Found</h1>
        <p className="mt-4 text-slate-600">The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="mt-7 inline-flex rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700"
        >
          Back to Home
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage
