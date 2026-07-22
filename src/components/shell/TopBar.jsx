import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import './TopBar.css'

const NAV_ITEMS = [
  { id: 'hero', label: 'hero.jsx' },
  { id: 'skills', label: 'skills.jsx' },
  { id: 'projects', label: 'projects.jsx' },
  { id: 'timeline', label: 'timeline.jsx' },
  { id: 'activity', label: 'activity.jsx' },
  { id: 'contact', label: 'contact.jsx' },
]

export default function TopBar({ activeSection, onOpenPalette }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const activeLabel = NAV_ITEMS.find(n => n.id === activeSection)?.label ?? 'portfolio.log'

  return (
    <header className="topbar" role="banner">
      <div className="topbar-left">
        <span className="topbar-filename mono">
          <span className="topbar-dir">sudheesh-s /</span>
          <span className="topbar-file">&nbsp;{activeLabel}</span>
        </span>
      </div>

      <div className="topbar-center">
        <span className="status-badge" aria-label="Status: available for opportunities">
          <span className="status-dot" aria-hidden="true" />
          <span className="mono">status: available for opportunities</span>
        </span>
      </div>

      <div className="topbar-right">
        <time className="topbar-clock mono" dateTime={time.toISOString()} aria-label={`Current time: ${format(time, 'HH:mm:ss')}`}>
          {format(time, 'HH:mm:ss')}
        </time>
        <button
          className="topbar-palette-btn"
          onClick={onOpenPalette}
          aria-label="Open command palette (press / to open)"
          title="Command palette — press /"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span className="mono topbar-cmd-hint">⌘K</span>
        </button>
      </div>
    </header>
  )
}
