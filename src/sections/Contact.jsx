import { useState } from 'react'
import './Contact.css'

const LINKS = [
  {
    id: 'email',
    label: 'email',
    value: 'sudhee2004s@gmail.com',
    href: 'mailto:sudhee2004s@gmail.com',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'github',
    value: 'github.com/sudhee004',
    href: 'https://github.com/sudhee004',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'linkedin',
    value: 'linkedin.com/in/sudheesh-sura-09a28627a',
    href: 'https://www.linkedin.com/in/sudheesh-sura-09a28627a/',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

function FormField({ label, id, type = 'text', value, onChange, required, ...props }) {
  return (
    <div className="form-field">
      <label className="form-label mono" htmlFor={id}>
        {label}
        {required && <span className="form-required" aria-hidden="true"> *</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          className="form-input form-textarea"
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required}
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          className="form-input"
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required}
          {...props}
        />
      )}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // mailto fallback — opens visitor's email client with pre-filled content
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:sudhee2004s@gmail.com?subject=${subject}&body=${body}`
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    }, 500)
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-label mono"># contact</div>
        <h2 className="section-title">Open a Conversation</h2>
        <p className="section-desc">
          Have an opportunity, collaboration, or question? Reach out directly — I respond promptly.
        </p>

        <div className="contact-grid">
          {/* Left: direct links */}
          <div className="contact-links-col">
            <div className="contact-links-label mono">Direct links</div>
            <ul className="contact-links-list" aria-label="Direct contact links">
              {LINKS.map(link => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target={link.id !== 'email' ? '_blank' : undefined}
                    rel={link.id !== 'email' ? 'noopener noreferrer' : undefined}
                    className="contact-link"
                    aria-label={`Contact via ${link.label}: ${link.value}`}
                  >
                    <span className="contact-link-icon">{link.icon}</span>
                    <div className="contact-link-info">
                      <span className="contact-link-label mono">{link.label}</span>
                      <span className="contact-link-value mono">{link.value}</span>
                    </div>
                    <span className="contact-link-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="contact-availability">
              <div className="status-badge">
                <span className="status-dot" aria-hidden="true" />
                <span className="mono">Available for full-time & freelance roles</span>
              </div>
              <p className="contact-avail-detail mono">
                Response time: typically within 24h
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-form-col">
            <form
              className="contact-form card"
              onSubmit={handleSubmit}
              aria-label="Contact form"
              noValidate
            >
              <div className="contact-form-header mono">
                <span className="contact-form-title">Send a message</span>
              </div>

              <div className="contact-form-body">
                <div className="contact-form-row">
                  <FormField
                    label="name"
                    id="contact-name"
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Your name"
                    required
                    autoComplete="name"
                  />
                  <FormField
                    label="email"
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                  />
                </div>
                <FormField
                  label="message"
                  id="contact-message"
                  type="textarea"
                  value={form.message}
                  onChange={set('message')}
                  placeholder="What's on your mind?"
                  required
                  rows={5}
                />

                <button
                  type="submit"
                  className="btn btn-primary contact-submit"
                  disabled={status === 'sending' || status === 'sent'}
                  aria-label="Send message"
                >
                  {status === 'sent' ? (
                    <>✓ Message sent</>
                  ) : status === 'sending' ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="contact-footer">
        <div className="container">
          <div className="contact-footer-inner">
            <span className="mono contact-footer-name">Sudheesh S</span>
            <span className="mono contact-footer-copy">
              Built with React · {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
