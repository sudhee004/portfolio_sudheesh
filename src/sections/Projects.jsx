import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './Projects.css'

const PROJECTS = [
  {
    id: 'fashionshop',
    name: 'FashionShop',
    tagline: 'Full-stack e-commerce platform for fashion retail',
    status: 'complete',
    year: '2025',
    hash: 'a3f2c1d',
    stack: ['Java', 'JSP', 'Servlets', 'JDBC', 'MySQL', 'HTML/CSS'],
    github: 'https://github.com/sudheesh004',
    demo: null,
    tabs: {
      problem: {
        heading: 'What problem does it solve?',
        content: `Traditional fashion retail lacks a seamless digital shopping experience. FashionShop addresses the need for a full-featured e-commerce platform where customers can browse products by category, manage a cart, and complete purchases — all within a responsive web interface.

The challenge was designing a multi-tier architecture that keeps business logic in Servlets, presentation in JSP pages, and persistence in a normalized MySQL schema — without a modern framework to abstract these layers.`,
      },
      approach: {
        heading: 'How was it built?',
        content: `Built using the classic Java EE stack: Apache Tomcat as the servlet container, JSP for server-side rendering, JDBC for all database interactions, and MySQL for storage.

The architecture separates concerns cleanly: Servlets handle HTTP requests and orchestrate business logic; JSP templates render HTML with JSTL expressions; a DAO layer wraps all JDBC calls. Session management handles cart persistence and user authentication. No ORM — all SQL was written by hand, which deepened understanding of query optimization and schema design.`,
      },
      stack: {
        heading: 'Technologies used',
        items: [
          { name: 'Java', cat: 'language', node: 'java' },
          { name: 'JSP', cat: 'frontend', node: 'jsp' },
          { name: 'Servlets', cat: 'backend', node: 'servlets' },
          { name: 'JDBC', cat: 'database', node: 'jdbc' },
          { name: 'MySQL', cat: 'database', node: 'mysql' },
          { name: 'HTML/CSS', cat: 'frontend', node: 'html_css' },
        ],
      },
      result: {
        heading: 'Outcome & learnings',
        content: `Delivered a working end-to-end shopping application with product listing, cart management, user authentication, and order flow.

Key takeaways: understanding how frameworks abstract the servlet lifecycle, the importance of connection pooling for JDBC performance, and how to structure a multi-page web app without a JS frontend framework. This project was the foundation for understanding full-stack architecture from the HTTP request all the way to the database row.`,
      },
    },
  },
  {
    id: 'blockchain-sc',
    name: 'Blockchain Supply Chain',
    tagline: 'Decentralized supply chain transparency on Ethereum',
    status: 'complete',
    year: '2025',
    hash: 'b8e1f4a',
    stack: ['Solidity', 'Hardhat', 'React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/sudheesh004',
    demo: null,
    tabs: {
      problem: {
        heading: 'What problem does it solve?',
        content: `Supply chains suffer from opacity — goods change hands multiple times with no tamper-proof record. This means counterfeit products, disputes over delivery, and no single source of truth for all participants.

The system addresses this by recording every supply chain event (manufacture, shipment, delivery) as an immutable transaction on a local Ethereum blockchain, readable by any authorized party without a central database that any single party controls.`,
      },
      approach: {
        heading: 'How was it built?',
        content: `Smart contracts written in Solidity and compiled/tested with Hardhat define the on-chain data model — each product has a unique ID and an append-only event log. The React frontend interacts with contracts via ethers.js, reading chain state and submitting transactions.

A Node.js/Express API layer bridges off-chain data (product metadata, media) stored in MongoDB with on-chain identifiers. This hybrid model keeps gas costs low while still providing rich product information.

Hardhat's local node was used for development, with tests written in JavaScript exercising the core contract logic.`,
      },
      stack: {
        heading: 'Technologies used',
        items: [
          { name: 'Solidity', cat: 'language', node: 'solidity' },
          { name: 'Hardhat', cat: 'backend', node: 'hardhat' },
          { name: 'React', cat: 'frontend', node: 'react' },
          { name: 'Node.js', cat: 'backend', node: 'nodejs' },
          { name: 'MongoDB', cat: 'database', node: 'mongodb' },
        ],
      },
      result: {
        heading: 'Outcome & learnings',
        content: `Successfully demonstrated end-to-end tracking of a product through manufacture, warehouse, and delivery stages with all events verifiable on-chain.

Key learnings: the cost model of smart contract storage (why you minimize on-chain data), the event-driven pattern for emitting logs from contracts, and the challenge of keeping a React UI synchronized with blockchain state. Placed in the Top 10 at the HackVyuha hackathon with this project.`,
      },
    },
  },
  {
    id: 'mini-projects',
    name: 'Mini Projects',
    tagline: 'Collection — Weather App, Portfolio, Python data tools',
    status: 'ongoing',
    year: '2024–25',
    hash: 'c2d9a7b',
    stack: ['Python', 'JavaScript', 'HTML/CSS', 'REST API'],
    github: 'https://github.com/sudheesh004',
    demo: null,
    tabs: {
      problem: {
        heading: 'What problems do they solve?',
        content: `A collection of focused tools built to learn specific technologies:

— **Weather App**: Real-time weather data via OpenWeather API, demonstrating async JS, fetch, and DOM manipulation without a framework.

— **Portfolio Site**: An earlier static portfolio, exploring layout design and CSS animation techniques.

— **Python Data Tools**: Scripts for data cleaning, CSV processing, and basic analysis — built during Python certification coursework to apply concepts practically.`,
      },
      approach: {
        heading: 'How were they built?',
        content: `Each project was a deliberate learning exercise with a minimal, focused scope:

The Weather App uses vanilla JavaScript and the Fetch API to query OpenWeatherMap, then updates the DOM with current conditions and a 5-day forecast. No build tools — plain HTML, CSS, JS.

The Python tools use pandas and the csv module for data manipulation, with scripts designed to be run from the command line on arbitrary CSV files.

Each was kept simple intentionally — the goal was to isolate and master one concept at a time rather than reach for frameworks.`,
      },
      stack: {
        heading: 'Technologies used',
        items: [
          { name: 'Python', cat: 'language', node: 'python' },
          { name: 'JavaScript', cat: 'language', node: 'javascript' },
          { name: 'HTML/CSS', cat: 'frontend', node: 'html_css' },
          { name: 'REST API', cat: 'backend', node: 'rest_api' },
        ],
      },
      result: {
        heading: 'Outcome & learnings',
        content: `These projects collectively built the foundation for everything else. The Weather App taught API integration and async patterns. The Python tools gave hands-on practice with data structures and file I/O that directly supported Python certification work.

Most importantly, keeping them scope-limited taught the discipline of finishing things: defining what "done" means, shipping it, and moving on — rather than endlessly adding features.`,
      },
    },
  },
]

const TABS = ['problem', 'approach', 'stack', 'result']

const CAT_COLORS = {
  language: '#7DD3FC',
  frontend: '#FCA5A5',
  backend:  '#FCD34D',
  database: '#86EFAC',
  tools:    '#C4B5FD',
}

function ProjectModal({ project, onClose }) {
  const [tab, setTab] = useState('problem')

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const tabData = project.tabs[tab]

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      <motion.div
        className="modal-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="modal-hash mono">{project.hash}</span>
            <h3 className="modal-title">{project.name}</h3>
            <span className="modal-year mono">{project.year}</span>
          </div>
          <div className="modal-header-right">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary modal-link" aria-label={`View live demo of ${project.name}`}>
                Live Demo ↗
              </a>
            )}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary modal-link" aria-label={`View ${project.name} on GitHub`}>
              GitHub ↗
            </a>
            <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
          </div>
        </div>

        <div className="modal-tabs" role="tablist" aria-label="Case study sections">
          {TABS.map(t => (
            <button
              key={t}
              className={`modal-tab mono ${tab === t ? 'modal-tab--active' : ''}`}
              onClick={() => setTab(t)}
              role="tab"
              aria-selected={tab === t}
              aria-controls={`tab-panel-${t}`}
              id={`tab-${t}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div
          className="modal-body"
          role="tabpanel"
          id={`tab-panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16 }}
            >
              <h4 className="modal-body-heading">{tabData.heading}</h4>

              {tab === 'stack' ? (
                <div className="modal-stack-grid">
                  {tabData.items.map(item => (
                    <div key={item.name} className="modal-stack-item">
                      <span
                        className="modal-stack-dot"
                        style={{ background: CAT_COLORS[item.cat] }}
                        aria-hidden="true"
                      />
                      <span className="modal-stack-name mono">{item.name}</span>
                      <span className="modal-stack-cat mono">{item.cat}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="modal-body-content">
                  {tabData.content.split('\n\n').map((para, i) => (
                    <p key={i} dangerouslySetInnerHTML={{
                      __html: para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/^— /, '→ ')
                    }} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card card" aria-label={project.name}>
      <div className="project-card-header">
        <div className="project-card-meta">
          <span className="project-hash mono">{project.hash}</span>
          <span className={`project-status-badge mono status-${project.status}`}>
            <span className="project-status-dot" aria-hidden="true" />
            {project.status}
          </span>
        </div>
        <span className="project-year mono">{project.year}</span>
      </div>

      <h3 className="project-name">{project.name}</h3>
      <p className="project-tagline">{project.tagline}</p>

      <div className="project-stack" aria-label="Tech stack">
        {project.stack.map(tag => (
          <span key={tag} className="mono-tag">{tag}</span>
        ))}
      </div>

      <div className="project-card-footer">
        <button
          className="btn btn-secondary project-detail-btn"
          onClick={() => onOpen(project)}
          aria-label={`View case study for ${project.name}`}
        >
          View Case Study →
        </button>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-gh-link mono"
          aria-label={`View ${project.name} on GitHub`}
        >
          GitHub ↗
        </a>
      </div>
    </article>
  )
}

export default function Projects() {
  const [openProject, setOpenProject] = useState(null)

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-label mono"># projects</div>
        <h2 className="section-title">Case Studies</h2>
        <p className="section-desc">
          Selected builds — click any card to explore the problem, approach, stack, and outcome.
        </p>

        <div className="projects-grid">
          {PROJECTS.map(p => (
            <ProjectCard key={p.id} project={p} onOpen={setOpenProject} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openProject && (
          <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
