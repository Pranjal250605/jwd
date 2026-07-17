import { LangProvider } from './i18n.jsx';
import { UtilBar, Header, CtaBand, Footer } from './components/Chrome.jsx';
import { Hero, VideoPromo, QuickTiles, StatBand, Question } from './components/Hero.jsx';
import { Simulator } from './components/Simulator.jsx';
import { License, GenerationalWealth, WhoWeServe, Services, Journey } from './components/Sections.jsx';
import { Strategies, Compare, Cases, Ecosystem, Insights } from './components/Proof.jsx';

export default function App() {
  return (
    <LangProvider>
      <UtilBar />
      <Header />
      <main>
        <Hero />
        <VideoPromo />
        <QuickTiles />
        <Simulator />
        <StatBand />
        <Question />
        <License />
        <GenerationalWealth />
        <WhoWeServe />
        <Services />
        <Journey />
        <Strategies />
        <Compare />
        <Cases />
        <Ecosystem />
        <Insights />
        <CtaBand />
      </main>
      <Footer />
    </LangProvider>
  );
}
