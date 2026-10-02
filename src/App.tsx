import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Journey from "./components/Journey";
import Philosophy from "./components/Philosophy";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { BackgroundElements } from "./components/3d/BackgroundElements";

export default function App() {
  return (
        <div className="relative min-h-screen bg-paper text-ink antialiased">
      <BackgroundElements />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Journey />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
