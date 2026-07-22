import './Hero.css'

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="hero" className="hero section" aria-label="Introduction">
      <div className="container hero-container">

        <div className="hero-log-line" aria-label="Log entry">
          <span className="hero-log-prefix mono">[INFO]</span>
          <span className="hero-log-text mono">
            Sudheesh S — building full-stack apps with Java, Python &amp; React
          </span>
        </div>

        <div className="hero-content">
          <div className="hero-name-block">
            <h1 className="hero-name">Sudheesh S</h1>
            <div className="hero-title-row">
              <span className="hero-title-tag mono">&lt;</span>
              <span className="hero-title">Full-Stack Developer</span>
              <span className="hero-title-tag mono">/&gt;</span>
            </div>
          </div>

          <p className="hero-summary">
            Full-stack developer with internship experience at Tap Academy,
            skilled in Java, Python, and modern web technologies. Experienced building
            scalable web applications and data-driven platforms, with a strong
            foundation in full-stack development, database design, and REST API integration.
          </p>

          <div className="hero-meta mono">
            <span className="hero-meta-item">
              <span className="hero-meta-key">location:</span>
              <span className="hero-meta-val">India</span>
            </span>
            <span className="hero-meta-sep">·</span>
            <span className="hero-meta-item">
              <span className="hero-meta-key">status:</span>
              <span className="hero-meta-val hero-meta-accent">open to opportunities</span>
            </span>
            <span className="hero-meta-sep">·</span>
            <span className="hero-meta-item">
              <span className="hero-meta-key">focus:</span>
              <span className="hero-meta-val">web · backend · data</span>
            </span>
          </div>

          <div className="hero-ctas">
            <button
              className="btn btn-primary"
              onClick={() => scrollTo('projects')}
              aria-label="Scroll to projects section"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 3h6l3 3 3-3h6v18H3z" /><path d="M9 17v-8l3 3 3-3v8" />
              </svg>
              View Projects
            </button>
            <a
              href="/resume.pdf"
              download="Sudheesh_S_Resume.pdf"
              className="btn btn-secondary"
              aria-label="Download Sudheesh S resume PDF"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        <div className="hero-grid" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="hero-grid-line" style={{ '--i': i }} />
          ))}
        </div>
      </div>
    </section>
  )
}
