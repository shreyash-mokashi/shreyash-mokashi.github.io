import { contact, meta, metrics, footer, sections } from '@/content/profile'
import Reveal from './Reveal'
import styles from './hero.module.css'

/**
 * The hero renders statically — no scroll-reveal wrappers.
 *
 * Everything above the fold must paint from HTML and CSS alone. When this
 * content was wrapped in Reveal it started at opacity 0 and only appeared
 * once the bundle had downloaded, parsed and hydrated: measured at 2.9s of
 * blank screen on Slow 4G with 4x CPU throttling, and permanently blank if
 * the bundle failed. Only the metrics strip below the fold animates.
 */
export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <div className={`shell ${styles.inner}`}>
        <div>
          {meta.availability ? (
            <p className={styles.availability}>
              <span className={styles.pulse} aria-hidden="true" />
              {meta.availability}
            </p>
          ) : null}

          <h1 className={styles.name}>{meta.name}</h1>

          <p className={styles.role}>
            {meta.role}
            <span className={styles.sep} aria-hidden="true">
              /
            </span>
            <span className={styles.roleAlt}>{meta.tagline}</span>
          </p>

          <p className={styles.intro}>{meta.intro}</p>

          <div className={styles.actions}>
            <a className={styles.primary} href="#work">
              {sections.hero.seeWork}
            </a>
            {contact.resumeHref ? (
              <a className={styles.secondary} href={contact.resumeHref} download>
                {sections.hero.resume}
              </a>
            ) : null}
            {contact.email ? (
              <a className={styles.secondary} href={`mailto:${contact.email}`}>
                {sections.hero.emailMe}
              </a>
            ) : null}
            <a
              className={styles.secondary}
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer noopener"
            >
              {sections.hero.linkedin}
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </a>
            {contact.github ? (
              <a
                className={styles.secondary}
                href={contact.github}
                target="_blank"
                rel="noreferrer noopener"
              >
                {sections.hero.github}
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            ) : null}
          </div>
        </div>

        <div className={styles.portraitWrap}>
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
        </div>
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
