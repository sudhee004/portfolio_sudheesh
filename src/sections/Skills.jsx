import { useState, useEffect, useRef, useCallback } from 'react'
import './Skills.css'

const CATEGORIES = {
  language: { label: 'Languages',  color: '#7DD3FC' },
  frontend: { label: 'Frontend',   color: '#FCA5A5' },
  backend:  { label: 'Backend',    color: '#FCD34D' },
  database: { label: 'Databases',  color: '#86EFAC' },
  tools:    { label: 'Tools',      color: '#C4B5FD' },
  project:  { label: 'Projects',   color: '#FB923C' },
}

const NODES = [
  // Languages
  { id: 'java',       label: 'Java',         cat: 'language', r: 28 },
  { id: 'python',     label: 'Python',       cat: 'language', r: 26 },
  { id: 'javascript', label: 'JavaScript',   cat: 'language', r: 26 },
  { id: 'solidity',   label: 'Solidity',     cat: 'language', r: 20 },
  // Frontend
  { id: 'react',      label: 'React',        cat: 'frontend', r: 26 },
  { id: 'html_css',   label: 'HTML/CSS',     cat: 'frontend', r: 22 },
  { id: 'jsp',        label: 'JSP',          cat: 'frontend', r: 20 },
  // Backend
  { id: 'nodejs',     label: 'Node.js',      cat: 'backend',  r: 24 },
  { id: 'servlets',   label: 'Servlets',     cat: 'backend',  r: 20 },
  { id: 'rest_api',   label: 'REST API',     cat: 'backend',  r: 22 },
  { id: 'hardhat',    label: 'Hardhat',      cat: 'backend',  r: 18 },
  // Databases
  { id: 'mysql',      label: 'MySQL',        cat: 'database', r: 24 },
  { id: 'mongodb',    label: 'MongoDB',      cat: 'database', r: 24 },
  { id: 'jdbc',       label: 'JDBC',         cat: 'database', r: 18 },
  // Tools
  { id: 'git',        label: 'Git',          cat: 'tools',    r: 22 },
  { id: 'postman',    label: 'Postman',      cat: 'tools',    r: 20 },
  // Projects
  { id: 'p_fashion',  label: 'FashionShop',      cat: 'project',  r: 30 },
  { id: 'p_blockchain', label: 'BlockchainSC',   cat: 'project',  r: 30 },
  { id: 'p_mini',     label: 'MiniProjects',     cat: 'project',  r: 26 },
]

const EDGES = [
  // FashionShop
  { source: 'java',       target: 'p_fashion' },
  { source: 'jsp',        target: 'p_fashion' },
  { source: 'servlets',   target: 'p_fashion' },
  { source: 'jdbc',       target: 'p_fashion' },
  { source: 'mysql',      target: 'p_fashion' },
  { source: 'html_css',   target: 'p_fashion' },
  // BlockchainSC
  { source: 'solidity',   target: 'p_blockchain' },
  { source: 'hardhat',    target: 'p_blockchain' },
  { source: 'react',      target: 'p_blockchain' },
  { source: 'nodejs',     target: 'p_blockchain' },
  { source: 'mongodb',    target: 'p_blockchain' },
  // MiniProjects
  { source: 'python',     target: 'p_mini' },
  { source: 'javascript', target: 'p_mini' },
  { source: 'html_css',   target: 'p_mini' },
  { source: 'rest_api',   target: 'p_mini' },
  // Tech relationships
  { source: 'java',       target: 'rest_api' },
  { source: 'nodejs',     target: 'rest_api' },
  { source: 'react',      target: 'nodejs' },
  { source: 'java',       target: 'jdbc' },
  { source: 'jdbc',       target: 'mysql' },
  { source: 'git',        target: 'p_fashion' },
  { source: 'git',        target: 'p_blockchain' },
  { source: 'postman',    target: 'rest_api' },
]

// Simple force-directed layout using iterative simulation
function useForceLayout(width, height) {
  const [positions, setPositions] = useState(() => {
    // Initial positions spread in clusters by category
    const pos = {}
    const cx = width / 2, cy = height / 2
    const categoryAngles = { language: 0, frontend: Math.PI * 0.4, backend: Math.PI * 0.8, database: Math.PI * 1.3, tools: Math.PI * 1.7, project: Math.PI * 1.05 }
    const categoryRadii = { language: 190, frontend: 160, backend: 170, database: 160, tools: 180, project: 90 }

    NODES.forEach((node, i) => {
      const samecat = NODES.filter(n => n.cat === node.cat)
      const idx = samecat.indexOf(node)
      const total = samecat.length
      const baseAngle = categoryAngles[node.cat] || 0
      const spread = (Math.PI * 0.3) / Math.max(total, 1)
      const angle = baseAngle + (idx - (total - 1) / 2) * spread + (Math.random() - 0.5) * 0.1
      const r = categoryRadii[node.cat] + (Math.random() - 0.5) * 30
      pos[node.id] = {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: 0,
        vy: 0,
      }
    })
    return pos
  })

  useEffect(() => {
    let animId
    let pos = { ...positions }
    NODES.forEach(n => {
      pos[n.id] = { ...pos[n.id] }
    })

    const simulate = () => {
      const newPos = {}
      NODES.forEach(n => { newPos[n.id] = { ...pos[n.id] } })

      // Repulsion between all nodes
      NODES.forEach((a, i) => {
        NODES.slice(i + 1).forEach(b => {
          const dx = newPos[b.id].x - newPos[a.id].x
          const dy = newPos[b.id].y - newPos[a.id].y
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1)
          const minDist = a.r + b.r + 35
          if (dist < minDist) {
            const force = (minDist - dist) / dist * 0.25
            newPos[a.id].vx -= dx * force
            newPos[a.id].vy -= dy * force
            newPos[b.id].vx += dx * force
            newPos[b.id].vy += dy * force
          }
        })
      })

      // Attraction along edges
      EDGES.forEach(e => {
        const a = newPos[e.source], b = newPos[e.target]
        if (!a || !b) return
        const dx = b.x - a.x, dy = b.y - a.y
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1)
        const ideal = 130
        const force = (dist - ideal) / dist * 0.04
        a.vx += dx * force; a.vy += dy * force
        b.vx -= dx * force; b.vy -= dy * force
      })

      // Center gravity
      NODES.forEach(n => {
        const cx = width / 2, cy = height / 2
        newPos[n.id].vx += (cx - newPos[n.id].x) * 0.005
        newPos[n.id].vy += (cy - newPos[n.id].y) * 0.005
      })

      // Apply velocity with damping and bounds
      NODES.forEach(n => {
        newPos[n.id].vx *= 0.75
        newPos[n.id].vy *= 0.75
        newPos[n.id].x = Math.max(n.r + 10, Math.min(width - n.r - 10, newPos[n.id].x + newPos[n.id].vx))
        newPos[n.id].y = Math.max(n.r + 10, Math.min(height - n.r - 10, newPos[n.id].y + newPos[n.id].vy))
      })

      pos = newPos
    }

    let iter = 0
    const MAX_ITER = 120

    const tick = () => {
      if (iter < MAX_ITER) {
        simulate()
        iter++
        animId = requestAnimationFrame(tick)
      } else {
        setPositions({ ...pos })
      }
    }
    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height])

  return positions
}

export default function Skills() {
  const containerRef = useRef(null)
  const [dims, setDims] = useState({ w: 700, h: 480 })
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      for (const e of entries) {
        const { width } = e.contentRect
        const h = Math.max(380, Math.min(520, width * 0.65))
        setDims({ w: width, h })
      }
    })
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  const positions = useForceLayout(dims.w, dims.h)

  const active = selected || hovered

  const getConnectedIds = useCallback((nodeId) => {
    const ids = new Set()
    EDGES.forEach(e => {
      if (e.source === nodeId) ids.add(e.target)
      if (e.target === nodeId) ids.add(e.source)
    })
    return ids
  }, [])

  const connected = active ? getConnectedIds(active) : new Set()

  const isHighlighted = (id) => {
    if (!active) return true
    return id === active || connected.has(id)
  }

  const handleNodeClick = (id) => {
    setSelected(prev => prev === id ? null : id)
  }

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-label mono"># skills</div>
        <h2 className="section-title">Technology Stack</h2>
        <p className="section-desc">
          Hover or click any node to explore connections between technologies and projects.
        </p>

        <div className="skills-graph-wrap" ref={containerRef} aria-label="Interactive skills dependency graph">
          <svg
            className="skills-svg"
            width={dims.w}
            height={dims.h}
            aria-hidden="true"
          >
            <defs>
              <filter id="node-glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Edges */}
            {EDGES.map((e, i) => {
              const a = positions[e.source], b = positions[e.target]
              if (!a || !b) return null
              const highlighted = !active || (isHighlighted(e.source) && isHighlighted(e.target))
              return (
                <line
                  key={i}
                  x1={a.x} y1={a.y}
                  x2={b.x} y2={b.y}
                  stroke={highlighted ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)'}
                  strokeWidth={highlighted ? 1.5 : 1}
                  style={{ transition: 'stroke 0.2s, opacity 0.2s' }}
                />
              )
            })}

            {/* Nodes */}
            {NODES.map(node => {
              const pos = positions[node.id]
              if (!pos) return null
              const cat = CATEGORIES[node.cat]
              const highlight = isHighlighted(node.id)
              const isActive = node.id === active

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x},${pos.y})`}
                  className="skill-node"
                  onClick={() => handleNodeClick(node.id)}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  aria-label={`${node.label} — ${cat.label}`}
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleNodeClick(node.id) }}
                >
                  {/* Glow ring for active */}
                  {isActive && (
                    <circle
                      r={node.r + 6}
                      fill="none"
                      stroke={cat.color}
                      strokeWidth={1}
                      opacity={0.4}
                      filter="url(#node-glow)"
                    />
                  )}
                  <circle
                    r={node.r}
                    fill={`${cat.color}${highlight ? '22' : '08'}`}
                    stroke={cat.color}
                    strokeWidth={isActive ? 2 : 1}
                    opacity={highlight ? 1 : 0.25}
                    style={{ transition: 'all 0.2s' }}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={highlight ? cat.color : 'rgba(255,255,255,0.2)'}
                    fontSize={node.cat === 'project' ? 8.5 : 9}
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="500"
                    style={{ transition: 'fill 0.2s', userSelect: 'none', pointerEvents: 'none' }}
                  >
                    {node.label}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Info panel when node selected */}
          {active && (
            <div className="skills-info-panel">
              {(() => {
                const node = NODES.find(n => n.id === active)
                const cat = CATEGORIES[node.cat]
                const connectedNodes = Array.from(connected).map(id => NODES.find(n => n.id === id)).filter(Boolean)
                return (
                  <>
                    <div className="skills-info-header">
                      <span className="skills-info-dot" style={{ background: cat.color }} />
                      <span className="skills-info-name mono">{node.label}</span>
                      <span className="skills-info-cat mono">{cat.label}</span>
                    </div>
                    <div className="skills-info-connected mono">
                      {connectedNodes.map(n => (
                        <span key={n.id} className="skills-info-tag" style={{ borderColor: CATEGORIES[n.cat].color + '44', color: CATEGORIES[n.cat].color }}>
                          {n.label}
                        </span>
                      ))}
                    </div>
                  </>
                )
              })()}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="skills-legend" aria-label="Node category legend">
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <div key={key} className="skills-legend-item">
              <span className="skills-legend-dot" style={{ background: cat.color }} aria-hidden="true" />
              <span className="mono">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
