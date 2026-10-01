import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import './styles.css';
import GhostLanding from './GhostLanding';

const corporateHero = '/medunz-corp-hero.webp';

import pharmaLogo from './assets/medunz-pharma-logo.svg';
import jardinesLogo from './assets/medunz-jardines-logo.svg';
import hupiLogo from './assets/hupi-baby-gym-logo.svg';
import ghostLogo from './assets/ghost-logo.svg';
import medrivLogo from './assets/medriv-logo.svg';
import cateringLogo from './assets/mr-catering-logo.svg';

const companies = [
  { name: 'Ghost Web & Software', text: 'Tecnología que construye', logo: ghostLogo, image: '/ghost-card.webp', href: 'https://ghost.medunzcorp.com', accent: 'ghost' },
  { name: 'HUPI Baby Gym', text: 'Infancia que desarrolla', logo: hupiLogo, accent: 'hupi' },
  { name: 'Medunz Pharma', text: 'Salud que impulsa vidas', logo: pharmaLogo, accent: 'pharma' },
  { name: 'Medunz Jardines', text: 'Naturaleza que inspira', logo: jardinesLogo, accent: 'jardines' },
  { name: 'MEDRIV Bienes Raíces', text: 'Patrimonio que crece', logo: medrivLogo, accent: 'medriv' },
  { name: 'M&R Catering', text: 'Experiencias que conectan', logo: cateringLogo, accent: 'catering' },
];

function Logo() {
  return (
    <a className="brand" href="#inicio" aria-label="Medunz Corp. inicio">
      <span className="brand-word">MED<span>U</span>NZ</span>
      <span className="brand-corp">CORP.</span>
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    document.title = 'Medunz Corp. | Una mirada que transforma';
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site">
      <header className="nav">
        <Logo />
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Navegación principal">
          <a href="#inicio" onClick={closeMenu}>Inicio</a>
          <a href="#grupo" onClick={closeMenu}>Nuestro grupo</a>
          <a href="#empresas" onClick={closeMenu}>Nuestras empresas</a>
          <a href="#vision" onClick={closeMenu}>Visión</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
        </nav>
        <a className="nav-cta" href="#contacto">Contáctanos <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        <section id="inicio" className="hero" aria-label="Medunz Corp. — Una mirada que transforma">
          <a className="hero-link" href="#empresas" aria-label="Conocer nuestro grupo">
            <img
              className="hero-image"
              src={corporateHero}
              alt="Medunz Corp. — Una mirada que transforma"
            />
          </a>
        </section>

        <section id="grupo" className="intro section-light">
          <div className="section-kicker">01 · NUESTRO GRUPO</div>
          <div className="intro-grid">
            <div><h2>Seis empresas.<br /><em>Una misma mirada.</em></h2></div>
            <div className="intro-copy">
              <p>Medunz Corp. es un holding boliviano que reúne seis unidades de negocio con identidades propias y capacidades complementarias.</p>
              <p>La diversidad de nuestras empresas nos permite transformar oportunidades en proyectos con visión de largo plazo.</p>
            </div>
          </div>
        </section>

        <section id="empresas" className="companies">
          <div className="companies-heading">
            <div>
              <div className="section-kicker">02 · NUESTRAS EMPRESAS</div>
              <h2>Nuestro<br /><em>ecosistema.</em></h2>
            </div>
            <p>Seis unidades de negocio que comparten un mismo propósito, cada una con una personalidad y especialidad propia.</p>
          </div>

          <div className="company-strip">
            {companies.map((company) => (
              company.image ? (
                <a
                  className={`company-item ${company.accent} company-feature-link`}
                  key={company.name}
                  href={company.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visitar ${company.name}`}
                >
                  <img className="company-feature-image" src={company.image} alt={`${company.name} — ${company.text}`} />
                </a>
              ) : (
                <article className={`company-item ${company.accent}`} key={company.name}>
                  <div className="company-logo-wrap"><img src={company.logo} alt={`${company.name} logo`} /></div>
                  <h3>{company.name}</h3>
                  <p>{company.text}</p>
                  <a href="#contacto">Conocer <ArrowUpRight size={14} /></a>
                </article>
              )
            ))}
          </div>
        </section>

        <section id="vision" className="vision">
          <div className="vision-media">
            <img src="/medunz-vision-profile.webp" alt="Medunz Corp. — Una mirada que transforma" />
          </div>
          <div className="vision-copy">
            <div className="section-kicker">03 · VISIÓN</div>
            <h2>Una mirada<br /><em>que transforma.</em></h2>
            <p>Integramos capacidades distintas para crear empresas, experiencias y proyectos con propósito, visión de largo plazo y capacidad de transformación.</p>
          </div>
        </section>

        <section id="contacto" className="contact section-light">
          <div className="section-kicker">04 · CONTACTO</div>
          <div className="contact-grid">
            <h2>Construyamos<br /><em>lo que sigue.</em></h2>
            <div><p>Medunz Corp.<br />Bolivia</p><a className="contact-link" href="mailto:contacto@medunzcorp.com">contacto@medunzcorp.com <ArrowUpRight size={18} /></a></div>
          </div>
        </section>
      </main>

      <footer>
        <Logo />
        <span>UNA MIRADA QUE TRANSFORMA</span>
        <span>© {new Date().getFullYear()} Medunz Corp.</span>
      </footer>
    </div>
  );
}

const isGhostHost = window.location.hostname === 'ghost.medunzcorp.com' || window.location.hostname === 'www.ghost.medunzcorp.com';
createRoot(document.getElementById('root')).render(isGhostHost ? <GhostLanding /> : <App />);
