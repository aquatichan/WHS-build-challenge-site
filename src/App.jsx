import { Background } from './components/Background.jsx';
import { Nav } from './components/Nav.jsx';
import { Hero } from './components/Hero.jsx';
import { Highlights } from './components/Highlights.jsx';
import { About } from './components/About.jsx';
import { Theme } from './components/Theme.jsx';
import { Timeline } from './components/Timeline.jsx';
import { Rules } from './components/Rules.jsx';
import { Submit } from './components/Submit.jsx';
import { Judging } from './components/Judging.jsx';
import { Prizes } from './components/Prizes.jsx';
import { Supporters } from './components/Supporters.jsx';
import { FAQ } from './components/FAQ.jsx';
import { Footer } from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Background />
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Highlights />
        <About />
        <Theme />
        <Timeline />
        <Rules />
        <Submit />
        <Judging />
        <Prizes />
        <Supporters />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
