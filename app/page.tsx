import Hero from '@/components/sections/Hero'
import Manifesto from '@/components/sections/Manifesto'
import Organs from '@/components/sections/Organs'
import Lifecycle from '@/components/sections/Lifecycle'
import DnaStack from '@/components/sections/DnaStack'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Organs />
      <Lifecycle />
      <DnaStack />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
