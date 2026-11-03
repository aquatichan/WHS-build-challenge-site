import { Background } from './components/Background.jsx';
import { AnnouncementBar } from './components/AnnouncementBar.jsx';
import { Nav } from './components/Nav.jsx';
import { Hero } from './components/Hero.jsx';
import { Highlights } from './components/Highlights.jsx';
import { Theme } from './components/Theme.jsx';
import { Rules } from './components/Rules.jsx';
import { Judging } from './components/Judging.jsx';
import { Prizes } from './components/Prizes.jsx';
import { Supporters } from './components/Supporters.jsx';
import { FAQ } from './components/FAQ.jsx';
import { SubmitCta } from './components/SubmitCta.jsx';
import { Footer } from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Background />
      <AnnouncementBar />
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Highlights />
        <Prizes />
        <Theme />
        <Rules />
        <Judging />
        <Supporters />
        <FAQ />
        <SubmitCta />
      </main>
      <Footer />
    </>
  );
}
