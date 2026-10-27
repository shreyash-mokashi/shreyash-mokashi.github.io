import { contact, footer, meta, sections } from '@/content/profile'
import Reveal from './Reveal'
import styles from './contact.module.css'

type Channel = { label: string; value: string; href: string; external?: boolean }

export default function Contact() {
  // Only render channels that have a real value — an empty one is omitted
  // rather than shown as a dead link.
  const channels: Channel[] = [
    contact.email && {
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    contact.linkedin && {
      label: 'LinkedIn',
      value: contact.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
      href: contact.linkedin,
      external: true,
    },
    contact.github && {
      label: 'GitHub',
      value: contact.github.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
      href: contact.github,
      external: true,
    },
    contact.phone && {
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, '')}`,
    },
  ].filter(Boolean) as Channel[]

  return (
    <section id="contact" className="section">
      <div className="shell">
        <Reveal className={styles.panel}>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.content}>
            <p className="sectionLabel">{contact.heading}</p>
            <h2 className={styles.headline}>{sections.contact.headline}</h2>
            <p className={styles.blurb}>{contact.blurb}</p>

            <ul className={styles.channels}>
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                  >
                    <span className={styles.channelLabel}>{c.label}</span>
                    <span className={styles.channelValue}>{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>

            {contact.resumeHref ? (
              <a className={styles.resume} href={contact.resumeHref} download>
                {sections.contact.resumeLabel}
              </a>
            ) : null}
          </div>
        </Reveal>

        <footer className={styles.footer}>
          <p>
            © {new Date().getFullYear()} {meta.name}
          </p>
          <p className={styles.colophon}>{footer.note}</p>
        </footer>
      </div>
    </section>
  )
}
