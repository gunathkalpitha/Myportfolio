import { useState } from 'react'
import {
  Terminal,
  Code2,
  Cpu,
  Sparkles,
  Check,
  Copy,
  Zap,
  Activity,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react'

export default function TechShowcase() {
  const [activeTab, setActiveTab] = useState('architecture') // 'architecture' | 'proficiency' | 'terminal'
  const [copied, setCopied] = useState(false)
  const [terminalLogs, setTerminalLogs] = useState([
    { text: '$ gunath --inspect-capabilities', type: 'cmd' },
    { text: '✓ Core Engine: Node.js 22 · Flutter 3.x · React 19', type: 'success' },
    { text: '✓ Databases: PostgreSQL & Supabase synchronized', type: 'success' },
    { text: '✓ Architecture: Clean, modular, production-ready', type: 'success' },
    { text: '✓ University of Ruhuna · Computer Engineering', type: 'info' },
    { text: '$ git status: 0 issues · Ready to build solutions 🚀', type: 'cmd' },
  ])
  const [isRunningDiag, setIsRunningDiag] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')

  const codeSnippet = `// Gunath Kalpitha · System Architecture
export const engineer = {
  name: "Gunath Kalpitha",
  title: "Computer Engineer & Full-Stack Builder",
  institution: "University of Ruhuna",
  coreStack: {
    frontend: ["React", "Next.js", "Tailwind CSS"],
    mobile:   ["Flutter", "Dart", "Cross-Platform UX"],
    backend:  ["Node.js", "Express.js", "Spring Boot"],
    cloud_db: ["PostgreSQL", "Supabase", "Docker", "AWS"],
  },
  mission: "Crafting resilient software with delightful UX",
  status:  "Available for high-impact engineering ⚡",
};`

  const handleCopy = () => {
    navigator.clipboard?.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const runDiagnostics = () => {
    if (isRunningDiag) return
    setIsRunningDiag(true)
    setTerminalLogs(prev => [
      ...prev,
      { text: '$ gunath --run-system-diagnostics', type: 'cmd' },
      { text: '⚙️ Running test suites & latency benchmarks...', type: 'info' },
    ])

    setTimeout(() => {
      setTerminalLogs(prev => [
        ...prev,
        { text: '✓ 42/42 tests passed with 0 warnings (142ms)', type: 'success' },
        { text: '✓ Performance score: 99/100 · Clean code verified', type: 'success' },
      ])
      setIsRunningDiag(false)
    }, 1100)
  }

  const proficiencyData = [
    { name: 'Full-Stack Web (React, Next.js, Node)', level: 94, color: 'from-blue-500 to-cyan-400' },
    { name: 'Mobile Systems (Flutter, Dart, Native APIs)', level: 90, color: 'from-sky-400 to-blue-600' },
    { name: 'Backend & APIs (Express, Spring Boot, REST)', level: 88, color: 'from-emerald-400 to-teal-500' },
    { name: 'Cloud & Database (PostgreSQL, Supabase, Docker)', level: 85, color: 'from-amber-400 to-orange-500' },
  ]

  const categoryChips = [
    { label: 'All', items: ['React', 'Flutter', 'Node.js', 'PostgreSQL', 'Supabase', 'Docker', 'TypeScript', 'Tailwind'] },
    { label: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Angular', 'TypeScript', 'Responsive UI'] },
    { label: 'Mobile', items: ['Flutter', 'Dart', 'Cross-Platform', 'Real-Time Sync', 'Mobile UX'] },
    { label: 'Backend/DB', items: ['Node.js', 'Express.js', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Supabase'] },
    { label: 'DevOps/Tools', items: ['Docker', 'Git', 'GitHub', 'CI/CD', 'AWS', 'Linux'] },
  ]

  return (
    <div className="relative w-full max-w-xl mx-auto py-4">
      {/* Background ambient lighting glows */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Accent Badge 1: Top-Right */}
      <div className="absolute -top-4 -right-2 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/95 border border-amber-500/30 text-amber-300 text-xs font-medium shadow-xl backdrop-blur-md animate-float">
        <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Clean Architecture</span>
      </div>

      {/* Floating Accent Badge 2: Bottom-Left */}
      <div className="absolute -bottom-4 -left-3 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/95 border border-emerald-500/30 text-emerald-300 text-xs font-medium shadow-xl backdrop-blur-md">
        <Cpu className="w-3.5 h-3.5 text-emerald-400" />
        <span>Full-Stack & Mobile</span>
      </div>

      {/* Terminal Card */}
      <div className="relative rounded-2xl border border-slate-700/70 bg-slate-950/85 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/40">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 hover:opacity-80 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-amber-500/90 hover:opacity-80 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 hover:opacity-80 transition-opacity" />
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950/70 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-200 ${
                activeTab === 'architecture'
                  ? 'bg-blue-600/30 text-blue-300 font-semibold border border-blue-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Stack.tsx</span>
            </button>

            <button
              onClick={() => setActiveTab('proficiency')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-200 ${
                activeTab === 'proficiency'
                  ? 'bg-blue-600/30 text-blue-300 font-semibold border border-blue-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Metrics.json</span>
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-200 ${
                activeTab === 'terminal'
                  ? 'bg-blue-600/30 text-blue-300 font-semibold border border-blue-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Console.sh</span>
            </button>
          </div>

          {/* Quick Copy / Action Icon */}
          <div className="flex items-center">
            {activeTab === 'architecture' && (
              <button
                onClick={handleCopy}
                title="Copy config"
                className="flex items-center gap-1 text-[11px] px-2 py-1 rounded border border-slate-700/60 bg-slate-800/60 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
            {activeTab === 'terminal' && (
              <button
                onClick={runDiagnostics}
                disabled={isRunningDiag}
                title="Run diagnostics"
                className="flex items-center gap-1 text-[11px] px-2 py-1 rounded border border-slate-700/60 bg-slate-800/60 text-slate-300 hover:text-white hover:border-blue-500 transition-colors"
              >
                <RefreshCw className={`w-3 h-3 text-blue-400 ${isRunningDiag ? 'animate-spin' : ''}`} />
                <span>Test</span>
              </button>
            )}
            {activeTab === 'proficiency' && (
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Live</span>
              </div>
            )}
          </div>
        </div>

        {/* Tab Content Window */}
        <div className="p-4 sm:p-5 font-mono text-[13px] leading-relaxed min-h-[300px] flex flex-col justify-between">
          {/* TAB 1: Code Architecture */}
          {activeTab === 'architecture' && (
            <div className="space-y-1.5 overflow-x-auto text-slate-300">
              <div className="text-slate-500 italic mb-2 select-none">
                // System Architecture & Engineering Profile
              </div>
              <p>
                <span className="text-purple-400 font-semibold">export const</span>{' '}
                <span className="text-amber-300">engineer</span> = &#123;
              </p>
              <p className="pl-4">
                <span className="text-blue-300">name</span>:{' '}
                <span className="text-emerald-300">"Gunath Kalpitha"</span>,
              </p>
              <p className="pl-4">
                <span className="text-blue-300">role</span>:{' '}
                <span className="text-emerald-300">"Computer Engineer · Full-Stack"</span>,
              </p>
              <p className="pl-4">
                <span className="text-blue-300">architecture</span>: [
                <span className="text-emerald-300">"React"</span>,{' '}
                <span className="text-emerald-300">"Flutter"</span>,{' '}
                <span className="text-emerald-300">"Node"</span>,{' '}
                <span className="text-emerald-300">"Supabase"</span>],
              </p>
              <p className="pl-4">
                <span className="text-blue-300">capabilities</span>: [
                <span className="text-sky-300">"Clean Code"</span>,{' '}
                <span className="text-sky-300">"Mobile UX"</span>,{' '}
                <span className="text-sky-300">"Scalable APIs"</span>],
              </p>
              <p className="pl-4">
                <span className="text-blue-300">education</span>:{' '}
                <span className="text-emerald-300">"University of Ruhuna (Eng)"</span>,
              </p>
              <p className="pl-4">
                <span className="text-blue-300">status</span>:{' '}
                <span className="text-amber-300 font-medium">"Ready to Build High-Impact Systems 🚀"</span>,
              </p>
              <p>
                &#125;;
                <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse align-middle ml-1" />
              </p>
            </div>
          )}

          {/* TAB 2: Proficiency Gauges & Category Filter */}
          {activeTab === 'proficiency' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-slate-800">
                <span>Core Competencies & Mastery</span>
                <span className="text-blue-400 font-sans font-medium">Production Experience</span>
              </div>

              {/* Progress Bars */}
              <div className="space-y-3 font-sans">
                {proficiencyData.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-200 font-medium">{item.name}</span>
                      <span className="text-blue-400 font-bold">{item.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-700 shadow-sm`}
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Category Pills Filter */}
              <div className="pt-2">
                <div className="flex items-center gap-1.5 flex-wrap mb-2 font-sans">
                  {categoryChips.map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => setActiveCategory(cat.label)}
                      className={`text-[11px] px-2.5 py-0.5 rounded-full transition-all duration-150 ${
                        activeCategory === cat.label
                          ? 'bg-blue-600 text-white font-semibold shadow-sm'
                          : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Filtered Skill Tags */}
                <div className="flex flex-wrap gap-1.5 font-sans">
                  {(categoryChips.find((c) => c.label === activeCategory)?.items || []).map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/70 text-slate-300 font-medium hover:border-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Terminal Console */}
          {activeTab === 'terminal' && (
            <div className="space-y-2 flex flex-col justify-between h-full">
              <div className="space-y-1.5 overflow-y-auto max-h-[220px] pr-1">
                {terminalLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`${
                      log.type === 'cmd'
                        ? 'text-blue-300 font-medium'
                        : log.type === 'success'
                        ? 'text-emerald-400'
                        : 'text-amber-300'
                    }`}
                  >
                    {log.text}
                  </div>
                ))}
                <div className="flex items-center text-slate-400 pt-1">
                  <span>$ ping gunath@dev:~#</span>
                  <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-1.5" />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-sans text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  All services healthy
                </span>
                <button
                  onClick={runDiagnostics}
                  disabled={isRunningDiag}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  Run Diagnostics
                </button>
              </div>
            </div>
          )}

          {/* Bottom Bar: System Status indicator */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-sans text-slate-400">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-300 font-medium">Available for Opportunities</span>
            </div>
            <div className="text-slate-500 hidden sm:block">
              TypeScript · Flutter · React 19
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
