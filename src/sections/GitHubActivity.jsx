import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './GitHubActivity.css'

const GH_USER = 'sudheesh004'

function EventRow({ event }) {
  const getEventMeta = (e) => {
    switch (e.type) {
      case 'PushEvent': {
        const msg = e.payload?.commits?.[0]?.message ?? 'pushed commit'
        return { icon: '↑', label: 'push', desc: msg.split('\n')[0].slice(0, 72) }
      }
      case 'CreateEvent':
        return { icon: '+', label: 'create', desc: `created ${e.payload?.ref_type ?? 'repo'} ${e.payload?.ref ?? ''}`.trim() }
      case 'WatchEvent':
        return { icon: '★', label: 'star', desc: `starred ${e.repo?.name}` }
      case 'ForkEvent':
        return { icon: '⑂', label: 'fork', desc: `forked ${e.repo?.name}` }
      case 'IssuesEvent':
        return { icon: '!', label: 'issue', desc: `${e.payload?.action} issue: ${e.payload?.issue?.title?.slice(0, 60)}` }
      case 'PullRequestEvent':
        return { icon: '↔', label: 'pr', desc: `${e.payload?.action} PR: ${e.payload?.pull_request?.title?.slice(0, 60)}` }
      default:
        return { icon: '·', label: e.type.replace('Event', '').toLowerCase(), desc: '' }
    }
  }

  const { icon, label, desc } = getEventMeta(event)
  const repo = event.repo?.name?.replace(`${GH_USER}/`, '') ?? ''
  const time = event.created_at
    ? formatDistanceToNow(new Date(event.created_at), { addSuffix: true })
    : ''

  return (
    <li className="gh-event">
      <span className="gh-event-icon mono">{icon}</span>
      <span className="gh-event-type mono">{label}</span>
      <span className="gh-event-repo mono">{repo}</span>
      <span className="gh-event-desc">{desc}</span>
      <span className="gh-event-time mono">{time}</span>
    </li>
  )
}

export default function GitHubActivity() {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading') // loading | ok | error | empty

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    fetch(`https://api.github.com/users/${GH_USER}/events/public?per_page=10`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(data => {
        if (cancelled) return
        const filtered = data.filter(e =>
          ['PushEvent', 'CreateEvent', 'WatchEvent', 'ForkEvent', 'IssuesEvent', 'PullRequestEvent'].includes(e.type)
        ).slice(0, 7)
        setEvents(filtered)
        setStatus(filtered.length > 0 ? 'ok' : 'empty')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => { cancelled = true }
  }, [])

  return (
    <section id="activity" className="section">
      <div className="container">
        <div className="section-label mono"># activity</div>
        <h2 className="section-title">Live Activity</h2>
        <p className="section-desc">
          Recent public GitHub events from{' '}
          <a
            href={`https://github.com/${GH_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="gh-profile-link mono"
            aria-label={`Visit GitHub profile of ${GH_USER}`}
          >
            @{GH_USER}
          </a>
        </p>

        <div className="gh-panel card" aria-label="GitHub activity feed" aria-live="polite" aria-busy={status === 'loading'}>
          <div className="gh-panel-header">
            <div className="gh-panel-title-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="gh-icon">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="mono">github.com/{GH_USER}</span>
            </div>
            <a
              href={`https://github.com/${GH_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gh-view-all mono"
              aria-label="View all GitHub activity"
            >
              view profile ↗
            </a>
          </div>

          {status === 'loading' && (
            <div className="gh-state mono">
              <span className="gh-loading-dots">
                <span /><span /><span />
              </span>
              fetching activity...
            </div>
          )}

          {status === 'error' && (
            <div className="gh-state mono gh-state--muted">
              ⚠ GitHub API rate limit reached — visit{' '}
              <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noopener noreferrer">
                github.com/{GH_USER}
              </a>{' '}
              directly.
            </div>
          )}

          {status === 'empty' && (
            <div className="gh-state mono gh-state--muted">
              No recent public activity found.
            </div>
          )}

          {status === 'ok' && (
            <ul className="gh-events-list" aria-label="Recent GitHub events">
              {events.map(e => <EventRow key={e.id} event={e} />)}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
