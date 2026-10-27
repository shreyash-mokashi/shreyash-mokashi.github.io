import { about, education } from '@/content/profile'
import Reveal from './Reveal'
import styles from './about.module.css'

export default function About() {
  // Education entries that have not been filled in yet are left out rather
  // than rendered as a placeholder a recruiter would see.
  const confirmed = education.items.filter(
    (e) => e.institution && e.institution !== 'To be confirmed',
  )

  return (
    <section id="about" className="section">
      <div className="shell">
        <div className={styles.split} data-aside={confirmed.length > 0}>
          <Reveal className={styles.main}>
            <p className="sectionLabel">{about.heading}</p>
            <h2 className="sectionTitle">How I work</h2>
            <div className={styles.prose}>
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </Reveal>

          {confirmed.length > 0 ? (
            <Reveal delay={120} className={styles.aside}>
              <h3 className={styles.asideTitle}>{education.heading}</h3>
              <ul className={styles.eduList}>
                {confirmed.map((e) => (
                  <li key={e.qualification}>
                    <p className={styles.qualification}>{e.qualification}</p>
                    <p className={styles.institution}>{e.institution}</p>
                    {e.period ? <p className={styles.period}>{e.period}</p> : null}
                    {e.note ? <p className={styles.eduNote}>{e.note}</p> : null}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}
