import { useState, useEffect } from 'react'
import PageHero from '../components/layout/PageHero'
import { portfolioData } from '../data/portfolioData'
import { Maximize2, ArrowRight, ExternalLink, X } from 'lucide-react'

function ProjectsPage() {
  const { projects } = portfolioData
  const [projectFilter, setProjectFilter] = useState('all')
  const [lightboxProject, setLightboxProject] = useState(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxProject(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filteredProjects = projects.filter(
    (p) => projectFilter === 'all' || p.filterCategory === projectFilter
  )

  return (
    <>
      <PageHero
        badge="Projects"
        title="My Projects"
        description="A dedicated showcase of product engineering, field software, and IoT systems."
      />

      <section className="bg-white py-16 md:py-24 relative overflow-hidden">
        <div className="section-shell">
          <div className="text-center mb-12 relative">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-blue-100/70 absolute -top-5 left-1/2 -translate-x-1/2 -z-10 blur-xl pointer-events-none" />
              <p className="text-sm md:text-base font-medium text-slate-500 italic mb-2 tracking-wide font-serif">
                Engineering solutions built with precision and passion
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
              Built With Precision
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
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project.title}
                className="group relative bg-white rounded-3xl p-5 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-12px_rgba(37,99,235,0.15)] hover:border-blue-300 hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col h-full"
              >
                {/* Mockup Showcase Container */}
                <div
                  className="relative overflow-hidden rounded-2xl bg-slate-950 aspect-[16/10] mb-5 group/thumb cursor-pointer shadow-inner border border-slate-900/10"
                  onClick={() => setLightboxProject(project)}
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
    </>
  )
}

export default ProjectsPage
