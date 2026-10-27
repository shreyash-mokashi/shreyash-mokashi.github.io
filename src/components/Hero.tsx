import { contact, meta, metrics, footer } from '@/content/profile'
import Reveal from './Reveal'
import styles from './hero.module.css'

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <div className={`shell ${styles.inner}`}>
        <div className={styles.copy}>
          <Reveal>
            <p className={styles.availability}>
              <span className={styles.pulse} aria-hidden="true" />
              {meta.availability}
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className={styles.name}>{meta.name}</h1>
          </Reveal>

          <Reveal delay={140}>
            <p className={styles.role}>
              {meta.role}
              <span className={styles.sep} aria-hidden="true">
                /
              </span>
              <span className={styles.roleAlt}>{meta.tagline}</span>
            </p>
          </Reveal>

          <Reveal delay={210}>
            <p className={styles.intro}>{meta.intro}</p>
          </Reveal>

          <Reveal delay={280}>
            <div className={styles.actions}>
              <a className={styles.primary} href="#work">
                See the work
              </a>
              {contact.email ? (
                <a className={styles.secondary} href={`mailto:${contact.email}`}>
                  Email me
                </a>
              ) : null}
              <a
                className={styles.secondary}
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                LinkedIn
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className={styles.portraitWrap}>
          <div className={styles.portrait}>
            <picture>
              <source srcSet="/shreyash.webp" type="image/webp" />
              <img
                src="/shreyash.jpg"
                alt={`${meta.name}, ${meta.role}`}
                width={720}
                height={720}
                fetchPriority="high"
              />
            </picture>
          </div>
          <p className={styles.locationTag}>{meta.location}</p>
        </Reveal>
      </div>

      <div className={`shell ${styles.metricsShell}`}>
        <ul className={styles.metrics}>
          {metrics.map((m, i) => (
            <Reveal as="li" key={m.label} delay={i * 80} className={styles.metric}>
              <span className={styles.metricValue}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
              <span className={styles.metricDetail}>{m.detail}</span>
            </Reveal>
          ))}
        </ul>
        <p className={styles.metricsNote}>{footer.metricsNote}</p>
      </div>
    </section>
  )
}
