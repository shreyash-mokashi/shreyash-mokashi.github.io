import { roles } from '@/content/profile'
import Reveal from './Reveal'
import styles from './experience.module.css'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="shell">
        <Reveal>
          <p className="sectionLabel">Experience</p>
          <h2 className="sectionTitle">Where the work happened</h2>
        </Reveal>

        <div className={styles.timeline}>
          {roles.map((role, i) => (
            <Reveal key={role.company} delay={i * 90} className={styles.row}>
              <div className={styles.when}>
                <span className={styles.dot} aria-hidden="true" />
                <p className={styles.period}>{role.period}</p>
                <p className={styles.location}>{role.location}</p>
              </div>

              <div className={styles.what}>
                <h3 className={styles.title}>{role.title}</h3>
                <p className={styles.company}>{role.company}</p>
                <p className={styles.summary}>{role.summary}</p>
                <ul className={styles.highlights}>
                  {role.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
