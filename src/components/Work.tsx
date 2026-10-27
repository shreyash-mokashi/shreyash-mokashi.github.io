import { projects, sections } from '@/content/profile'
import Reveal from './Reveal'
import styles from './work.module.css'

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="shell">
        <Reveal>
          <p className="sectionLabel">{sections.work.label}</p>
          <h2 className="sectionTitle">{sections.work.title}</h2>
          <p className="lede">{sections.work.lede}</p>
        </Reveal>

        <ol className={styles.list}>
          {projects.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 2) * 90} className={styles.card}>
              <div className={styles.head}>
                <span className={styles.index} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className={styles.title}>{p.title}</h3>
                  <p className={styles.context}>{p.context}</p>
                </div>
              </div>

              <p className={styles.summary}>{p.summary}</p>

              <ul className={styles.contributions}>
                {p.contributions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>

              <div className={styles.foot}>
                <ul className={styles.stack}>
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                {p.scale ? <p className={styles.scale}>{p.scale}</p> : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
