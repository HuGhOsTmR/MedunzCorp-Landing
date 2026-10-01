import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight } from 'lucide-react';
import './styles.css';
import './hero-approved.css';

// Imagen corporativa aprobada para la portada de Medunz Corp.
const corporateHero = '/medunz-corp-hero.webp';
const medunzEmblem = '/medunz-medusa.svg';

const companies = [
  { name: 'Medunz Pharma', category: 'SALUD · FARMACÉUTICA', text: 'Salud que impulsa vidas.', logo: '/medunz-pharma-brand.jpg', accent: 'pharma' },
  { name: 'Medunz Jardines', category: 'NATURALEZA · ESPACIOS', text: 'Naturaleza que inspira.', logo: '/medunz-jardines-logo.jpg', accent: 'jardines' },
  { name: 'HUPI Baby Gym', category: 'FAMILIAS · DESARROLLO', text: 'Infancia que desarrolla.', logo: '/hupi-baby-gym.jpg', accent: 'hupi' },
  { name: 'Ghost Web & Software Designer', category: 'TECNOLOGÍA · DIGITAL', text: 'Tecnología que construye.', logo: '/ghost-logo.jpg', accent: 'ghost' },
  { name: 'MEDRIV Bienes Raíces', category: 'PATRIMONIO · INVERSIÓN', text: 'Patrimonio que crece.', logo: '/medriv.svg', accent: 'medriv' },
  { name: 'M&R Catering', category: 'GASTRONOMÍA · EVENTOS', text: 'Experiencias que conectan.', logo: '/mr-catering.svg', accent: 'catering' },
];

function Logo({ compact = false }) {
  return (
    <a className={`brand ${compact ? 'brand-compact' : ''}`} href="#inicio" aria-label="Medunz Corp. inicio">
      <span className="brand-word">MED<span>U</span>NZ</span>
      <span className="brand-corp">CORP.</span>
    </a>
  );
}

function App() {
  React.useEffect(() => {
    document.title = 'Medunz Corp. | Una mirada que transforma';
  }, []);

  return (
    <div className="site">
      <header className="nav">
        <Logo compact />
        <nav aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#grupo">Nuestro grupo</a>
          <a href="#empresas">Nuestras empresas</a>
          <a href="#vision">Visión</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="nav-cta" href="#contacto">Contáctanos <ArrowUpRight size={15} /></a>
      </header>

      <main>
        <section id="inicio" className="hero-approved" aria-label="Medunz Corp. — Una mirada que transforma">
          <img
            src={corporateHero}
            className="corporate-hero-image"
            alt="Medunz Corp. — Una mirada que transforma"
          />

          <div className="hero-mobile-copy">
            <span className="eyebrow">MEDUNZ CORP. · BOLIVIA</span>
            <Logo />
            <div className="slogan">UNA MIRADA QUE TRANSFORMA</div>
            <p>
              Un holding que integra empresas en tecnología, salud, naturaleza,
              educación, gastronomía y patrimonio para generar un impacto positivo y sostenible.
            </p>
            <a className="hero-button" href="#grupo">Conoce nuestro grupo <ArrowUpRight size={18} /></a>
          </div>

          <a className="hero-image-hotspot" href="#grupo" aria-label="Conocer nuestro grupo"></a>
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
            <div><div className="section-kicker">02 · NUESTRO ECOSISTEMA</div><h2>Nuestras<br /><em>empresas.</em></h2></div>
            <p>Seis unidades de negocio que comparten un mismo propósito, cada una con una personalidad propia.</p>
          </div>

          <div className="company-grid">
            {companies.map((company, index) => (
              <article className={`company-card ${company.accent}`} key={company.name}>
                <span className="card-number">0{index + 1}</span>
                <div className="company-logo-wrap"><img src={company.logo} alt={`${company.name} logo`} /></div>
                <div className="company-card-body">
                  <span className="company-category">{company.category}</span>
                  <h3>{company.name}</h3>
                  <p>{company.text}</p>
                  <a href="#contacto">Conocer <ArrowUpRight size={15} /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="vision" className="vision">
          <div className="vision-art"><img src={medunzEmblem} alt="" /></div>
          <div className="vision-copy">
            <div className="section-kicker">03 · VISIÓN</div>
            <h2>Miramos<br /><em>más allá.</em></h2>
            <p>Una mirada que transforma ideas, oportunidades y realidades.</p>
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
        <Logo compact />
        <span>UNA MIRADA QUE TRANSFORMA</span>
        <span>© {new Date().getFullYear()} Medunz Corp.</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
