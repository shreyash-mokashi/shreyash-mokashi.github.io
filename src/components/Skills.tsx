import { skills } from '@/content/profile'
import Reveal from './Reveal'
import styles from './skills.module.css'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="shell">
        <Reveal>
          <p className="sectionLabel">Skills</p>
          <h2 className="sectionTitle">Sorted by how well I know them</h2>
          <p className="lede">
            Grouped honestly rather than alphabetically. If it is in the first
            group, ask me anything about it.
          </p>
        </Reveal>

        <div className={styles.groups}>
          {skills.map((group, i) => (
            <Reveal key={group.level} delay={i * 90} className={styles.group}>
              <div className={styles.groupHead}>
                <h3 className={styles.level}>{group.level}</h3>
                <p className={styles.note}>{group.note}</p>
              </div>
              <ul className={styles.items}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
