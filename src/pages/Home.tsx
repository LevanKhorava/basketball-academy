import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/home/Hero";
import AcademyIntro from "../components/home/AcademyIntro";
import Opportunities from "../components/home/Opportunities";
import RegistrationSection from "../components/home/RegistrationSection";
import { content } from "../data/content";

const Home = () => (
  <>
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-court-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-charcoal-950"
    >
      {content.nav.skipToContent}
    </a>
    <Navbar />
    <main id="main">
      <Hero />
      <AcademyIntro />
      <Opportunities />
      <RegistrationSection />
    </main>
    <Footer />
  </>
);

export default Home;
