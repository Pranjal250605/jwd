import { LangProvider } from './i18n.jsx';
import { VideoProvider } from './videos.jsx';
import { useSmoothScroll } from './smoothScroll.jsx';
import { UtilBar, Header, ContactForm, Footer } from './components/Chrome.jsx';
import { Hero, VideoPromo, QuickTiles, StatBand, Question } from './components/Hero.jsx';
import { Simulator } from './components/Simulator.jsx';
import { President, License, GenerationalWealth, WhoWeServe, Services, Journey } from './components/Sections.jsx';
import { Strategies, Compare, Cases, Ecosystem, HeartOfEurope, Insights, EcosystemFlower } from './components/Proof.jsx';
import { ChatWidget } from './components/advisor/ChatWidget.jsx';

export default function App() {
  useSmoothScroll();
  return (
    <LangProvider>
      <VideoProvider>
      <UtilBar />
      <Header />
      <main>
        <Hero />
        <VideoPromo />
        <QuickTiles />
        <Simulator />
        <StatBand />
        <Question />
        <President />
        <License />
        <GenerationalWealth />
        <WhoWeServe />
        <Services />
        <Journey />
        <Strategies />
        <Compare />
        <Cases />
        <Ecosystem />
        <HeartOfEurope />
        <Insights />
        <EcosystemFlower />
        <ContactForm />
      </main>
      <Footer />
      <ChatWidget />
      </VideoProvider>
    </LangProvider>
  );
}
