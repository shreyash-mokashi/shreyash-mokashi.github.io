import Link from 'next/link'
import { meta, notFound } from '@/content/profile'
import styles from '@/components/notfound.module.css'

/**
 * Replaces the stock Next.js 404, which is a white page with no branding and
 * no way back. A stale link is exactly the moment a visitor needs a route
 * home, not a dead end.
 */
export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <p className={styles.code}>{notFound.code}</p>
        <h1 className={styles.title}>{notFound.title}</h1>
        <p className={styles.body}>{notFound.body}</p>
        <Link className={styles.action} href="/">
          {notFound.action}
        </Link>
        <p className={styles.sig}>{meta.name}</p>
      </div>
    </main>
  )
}
