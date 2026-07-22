import './Timeline.css'

const ENTRIES = [
  {
    id: 'edu-start',
    hash: 'c8a2f11',
    date: 'Aug 2022',
    type: 'education',
    title: 'Started B.E. Computer Science',
    detail: 'Navodaya Institute of Technology, Raichur',
  },
  {
    id: 'cert-python',
    hash: 'd1e3b42',
    date: 'Jan 2025',
    type: 'certification',
    title: 'Python for Beginners — Infosys Springboard',
    detail: 'Certification · Infosys Springboard',
  },
  {
    id: 'cert-java',
    hash: 'a7c9e53',
    date: 'Mar 2025',
    type: 'certification',
    title: 'Introduction to Java — SkillUp by Simplilearn',
    detail: 'Certification · SkillUp',
  },
  {
    id: 'cert-mongo',
    hash: 'f4b8d61',
    date: 'Apr 2025',
    type: 'certification',
    title: 'MongoDB for Students — Simplilearn',
    detail: 'Certification · Simplilearn',
  },
  {
    id: 'hackathon',
    hash: 'e2a5c78',
    date: 'May 2025',
    type: 'achievement',
    title: 'Top 10 Finalist — HackVyuha Hackathon',
    detail: 'Achievement · Blockchain Supply Chain project',
  },
  {
    id: 'internship',
    hash: 'b9f1d34',
    date: 'Feb 2026',
    type: 'work',
    title: 'Full Stack Web Dev Intern @ Tap Academy',
    detail: 'Internship · Feb 2026 – May 2026',
  },
  {
    id: 'edu-grad',
    hash: '7a3c2e9',
    date: 'Jun 2026',
    type: 'education',
    title: 'Graduated — B.E. Computer Science, CGPA 8.42/10',
    detail: 'Navodaya Institute of Technology · Class of 2026',
  },
]

const TYPE_META = {
  education:    { color: '#7DD3FC', label: 'edu' },
  certification:{ color: '#C4B5FD', label: 'cert' },
  achievement:  { color: '#FCD34D', label: 'win' },
  work:         { color: '#86EFAC', label: 'work' },
}

export default function Timeline() {
  return (
    <section id="timeline" className="section">
      <div className="container">
        <div className="section-label mono"># timeline</div>
        <h2 className="section-title">Log of Growth</h2>
        <p className="section-desc">
          Education, certifications, and milestones — in chronological order.
        </p>

        <div className="timeline-wrap" aria-label="Career and education timeline">
          <div className="timeline-header mono">
            <span className="timeline-header-hash">hash</span>
            <span className="timeline-header-date">date</span>
            <span className="timeline-header-msg">message</span>
          </div>

          <ol className="timeline-list">
            {ENTRIES.map((entry, idx) => {
              const meta = TYPE_META[entry.type]
              return (
                <li
                  key={entry.id}
                  className="timeline-entry"
                  style={{ '--delay': `${idx * 0.06}s` }}
                >
                  <span className="timeline-hash mono">{entry.hash}</span>

                  <span className="timeline-date mono">{entry.date}</span>

                  <div className="timeline-node-col" aria-hidden="true">
                    <div className="timeline-dot" style={{ background: meta.color }} />
                    {idx < ENTRIES.length - 1 && <div className="timeline-line" />}
                  </div>

                  <div className="timeline-body">
                    <div className="timeline-title-row">
                      <span className="timeline-title">{entry.title}</span>
                      <span
                        className="timeline-type-tag mono"
                        style={{ color: meta.color, borderColor: `${meta.color}33` }}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <span className="timeline-detail mono">{entry.detail}</span>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
