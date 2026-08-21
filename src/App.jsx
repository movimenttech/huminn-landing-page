import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Brands from './components/Brands'
import ContactForm from './components/ContactForm'
import SocialSection from './components/SocialSection'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

export default function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Brands />
      <ContactForm />
      <SocialSection />
      <Footer />
      <ChatWidget />
    </div>
  )
}
