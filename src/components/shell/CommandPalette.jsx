import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './CommandPalette.css'

const ACTIONS = [
  { id: 'nav-hero', type: 'nav', icon: '§', label: 'Go to Hero', desc: 'section / hero', section: 'hero' },
  { id: 'nav-skills', type: 'nav', icon: '§', label: 'Go to Skills', desc: 'section / skills', section: 'skills' },
  { id: 'nav-projects', type: 'nav', icon: '§', label: 'Go to Projects', desc: 'section / projects', section: 'projects' },
  { id: 'nav-timeline', type: 'nav', icon: '§', label: 'Go to Timeline', desc: 'section / timeline', section: 'timeline' },
  { id: 'nav-activity', type: 'nav', icon: '§', label: 'Go to Activity', desc: 'section / activity', section: 'activity' },
  { id: 'nav-contact', type: 'nav', icon: '§', label: 'Go to Contact', desc: 'section / contact', section: 'contact' },
  { id: 'act-resume', type: 'action', icon: '↓', label: 'Download Resume', desc: 'action / download', action: 'resume' },
  { id: 'act-email', type: 'action', icon: '✉', label: 'Copy Email', desc: 'action / clipboard', action: 'email' },
  { id: 'act-github', type: 'action', icon: '⌥', label: 'Open GitHub', desc: 'action / external', action: 'github' },
  { id: 'act-linkedin', type: 'action', icon: '⌥', label: 'Open LinkedIn', desc: 'action / external', action: 'linkedin' },
]

function fuzzyMatch(query, text) {
  if (!query) return true
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  return t.includes(q)
}

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const filtered = ACTIONS.filter(a => fuzzyMatch(query, a.label) || fuzzyMatch(query, a.desc))

  useEffect(() => {
    setSelectedIdx(0)
  }, [query])

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIdx(0)
      setFeedback(null)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  const executeAction = useCallback((action) => {
    if (action.type === 'nav') {
      const el = document.getElementById(action.section)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      onClose()
    } else {
      switch (action.action) {
        case 'resume':
          window.open('/resume.pdf', '_blank')
          onClose()
          break
        case 'email':
          navigator.clipboard.writeText('sudhee2004s@gmail.com').then(() => {
            setFeedback('Email copied!')
            setTimeout(onClose, 900)
          })
          break
        case 'github':
          window.open('https://github.com/sudhee004', '_blank')
          onClose()
          break
        case 'linkedin':
          window.open('https://linkedin.com/in/sudheesh-sura', '_blank')
          onClose()
          break
      }
    }
  }, [onClose])

  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIdx(i => Math.min(i + 1, filtered.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIdx(i => Math.max(i - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (filtered[selectedIdx]) executeAction(filtered[selectedIdx])
        break
      case 'Escape':
        onClose()
        break
    }
  }, [isOpen, filtered, selectedIdx, executeAction, onClose])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return
    const el = listRef.current.querySelector(`[data-idx="${selectedIdx}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [selectedIdx])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cp-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            className="cp-panel"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className="cp-input-row">
              <svg className="cp-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="cp-input mono"
                placeholder="Type a command or search..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                aria-label="Command search"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="cp-esc mono">esc</kbd>
            </div>

            {feedback ? (
              <div className="cp-feedback mono">{feedback}</div>
            ) : (
              <>
                <div className="cp-section-label mono">
                  {query ? `results for "${query}"` : 'all commands'}
                </div>
                <ul className="cp-list" ref={listRef} role="listbox" aria-label="Command options">
                  {filtered.length === 0 && (
                    <li className="cp-empty mono">No commands found</li>
                  )}
                  {filtered.map((action, idx) => (
                    <li
                      key={action.id}
                      data-idx={idx}
                      className={`cp-item ${idx === selectedIdx ? 'cp-item--active' : ''}`}
                      onClick={() => executeAction(action)}
                      onMouseEnter={() => setSelectedIdx(idx)}
                      role="option"
                      aria-selected={idx === selectedIdx}
                    >
                      <span className={`cp-item-icon ${action.type}`} aria-hidden="true">{action.icon}</span>
                      <span className="cp-item-label">{action.label}</span>
                      <span className="cp-item-desc mono">{action.desc}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="cp-footer mono">
              <span><kbd>↑↓</kbd> navigate</span>
              <span><kbd>↵</kbd> select</span>
              <span><kbd>esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
