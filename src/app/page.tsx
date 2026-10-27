import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Work from '@/components/Work'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import About from '@/components/About'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
    </>
  )
}
