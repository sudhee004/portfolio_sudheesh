import { useState, useEffect, lazy, Suspense } from 'react'
import TopBar from './components/shell/TopBar'
import CommandPalette from './components/shell/CommandPalette'
import Hero from './sections/Hero'
import Timeline from './sections/Timeline'
import Contact from './sections/Contact'
import Projects from './sections/Projects'
import './App.css'

// Lazy-load heavy sections
const Skills = lazy(() => import('./sections/Skills'))
const GitHubActivity = lazy(() => import('./sections/GitHubActivity'))

const SECTIONS = ['hero', 'skills', 'projects', 'timeline', 'activity', 'contact']

function SectionFallback({ height = 300 }) {
  return (
    <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
        loading...
      </span>
    </div>
  )
}

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  // Open command palette on "/" key
  useEffect(() => {
    const handler = (e) => {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) &&
        !paletteOpen
      ) {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [paletteOpen])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = []

    SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <>
      <TopBar
        activeSection={activeSection}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />

      <main id="main-content">
        <Hero />

        <div className="section-divider" aria-hidden="true" />

        <Suspense fallback={<SectionFallback height={520} />}>
          <Skills />
        </Suspense>

        <div className="section-divider" aria-hidden="true" />

        <Projects />

        <div className="section-divider" aria-hidden="true" />

        <Timeline />

        <div className="section-divider" aria-hidden="true" />

        <Suspense fallback={<SectionFallback height={300} />}>
          <GitHubActivity />
        </Suspense>

        <div className="section-divider" aria-hidden="true" />

        <Contact />
      </main>
    </>
  )
}
