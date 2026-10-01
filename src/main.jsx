import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import './styles.css';

const medunzBrand = '/medunz-corp-emblem.jpg';
const medunzCorporateIdentity = '/medunz-corp-identity.svg';

const companies = [
  { name: 'Medunz Pharma', tag: 'Farmacéutica · Gestión', text: 'Soluciones y capacidades vinculadas al sector farmacéutico y su cadena de valor.', logo: '/medunz-pharma-brand.jpg', accent: 'pharma' },
  { name: 'Medunz Jardines', tag: 'Espacios · Naturaleza', text: 'Una unidad orientada a la creación y desarrollo de espacios con identidad propia.', logo: '/medunz-jardines-logo.jpg', accent: 'jardines' },
  { name: 'HUPI Baby Gym', tag: 'Familias · Desarrollo', text: 'Experiencias y propuestas centradas en el desarrollo infantil y las familias.', logo: '/hupi-baby-gym.jpg', accent: 'hupi' },
  { name: 'Ghost Web & Software Designer', tag: 'Tecnología · Digital', text: 'Diseño, software y soluciones digitales para transformar ideas en productos.', logo: '/ghost-logo.jpg', accent: 'ghost' },
  { name: 'MEDRIV Bienes Raíces', tag: 'Inversión · Patrimonio', text: 'Espacios, oportunidades y patrimonio para construir valor a largo plazo.', logo: '/medriv.svg', accent: 'medriv' },
  { name: 'M&R Catering', tag: 'Gastronomía · Eventos', text: 'Catering y experiencias gastronómicas para celebrar, compartir y crear momentos memorables.', logo: '/mr-catering.svg', accent: 'catering' }
];

const valueItems = [
  ['strategy', 'Estrategia'],
  ['innovation', 'Innovación'],
  ['growth', 'Crecimiento'],
  ['trust', 'Confianza'],
  ['global', 'Visión global']
];

function MedusaIcon({ type, size = 42 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 64 64',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true
  };

  if (type === 'strategy') {
    return (
      <svg {...common}>
        <circle cx="32" cy="32" r="25" stroke="currentColor" strokeWidth="1.5" opacity=".35"/>
        <circle cx="32" cy="32" r="13" stroke="currentColor" strokeWidth="2"/>
        <path d="M32 8v10M32 46v10M8 32h10M46 32h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M25 38c3-8 7-12 14-16-2 7-6 12-14 16Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M30 38c1-3 3-5 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }

  if (type === 'innovation') {
    return (
      <svg {...common}>
        <circle cx="32" cy="32" r="25" stroke="currentColor" strokeWidth="1.5" opacity=".35"/>
        <path d="M22 29c0-6 4-11 10-11s10 5 10 11c0 4-2 7-5 9-2 1-3 3-3 5h-4c0-2-1-4-3-5-3-2-5-5-5-9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M28 47h8M28.5 51h7M18 19c-2-2-3-4-3-6M46 19c2-2 3-4 3-6M32 12v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }

  if (type === 'growth') {
    return (
      <svg {...common}>
        <circle cx="32" cy="32" r="25" stroke="currentColor" strokeWidth="1.5" opacity=".35"/>
        <path d="M17 43h30M20 39V27M30 39V21M40 39V16" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <path d="M18 20c6 2 11 0 15-5 4 4 8 5 14 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="m43 15 4 2-2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  if (type === 'trust') {
    return (
      <svg {...common}>
        <path d="M32 7 49 13v14c0 12-7 23-17 29C22 50 15 39 15 27V13l17-6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="m22 31 6 6 14-15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 13c3 2 6 3 8 3s5-1 8-3" stroke="currentColor" strokeWidth="1.5" opacity=".7"/>
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="32" cy="32" r="25" stroke="currentColor" strokeWidth="1.5" opacity=".35"/>
      <ellipse cx="32" cy="32" rx="10" ry="22" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 32h44M13 21h38M13 43h38" stroke="currentColor" strokeWidth="1.25" opacity=".8"/>
      <path d="M18 17c5 5 10 7 14 7s9-2 14-7M18 47c5-5 10-7 14-7s9 2 14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
    </svg>
  );
}

function App() {
  React.useEffect(() => {
    const oldFavicons = document.querySelectorAll('link[data-medunz-favicon="true"]');
    oldFavicons.forEach((node) => node.remove());
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/jpeg';
    favicon.href = medunzBrand;
    favicon.dataset.medunzFavicon = 'true';
    document.head.appendChild(favicon);
    return () => favicon.remove();
  }, []);

  return (
    <div className="site">
      <header className="nav">
        <a href="#inicio" className="brand"><img src={medunzBrand} alt="Medunz Corp." /></a>
        <nav>
          <a href="#grupo">El grupo</a>
          <a href="#vision">Visión</a>
          <a href="#empresas">Empresas</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="nav-cta" href="#empresas">Explorar <ArrowUpRight size={16}/></a>
      </header>

      <main>
        <section
          id="inicio"
          className="hero"
          style={{ backgroundImage: `url(${medunzCorporateIdentity})` }}
          aria-label="Medunz Corp. — Una mirada que transforma"
        />

        <section id="grupo" className="manifesto section-dark">
          <div className="section-label">01 / EL GRUPO</div>
          <div className="manifesto-grid">
            <h2>Una visión.<br/><em>Diferentes industrias.</em></h2>
            <div className="manifesto-copy">
              <p>Medunz Corp. articula y desarrolla empresas con una visión de largo plazo, conectando oportunidades, talento e innovación.</p>
              <p>Creemos en la diversificación con propósito: diferentes negocios, capacidades complementarias y una misma visión de transformación.</p>
            </div>
          </div>
          <div className="values">
            {valueItems.map(([type, label]) => (
              <div className="value" key={label}>
                <MedusaIcon type={type} size={42}/>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="vision" className="vision section-black">
          <div className="section-label">02 / VISIÓN</div>
          <div className="vision-center">
            <div className="halo" />
            <p className="small-caps">EL FUTURO SE CONSTRUYE</p>
            <h2>Miramos<br/><span>más allá.</span></h2>
            <p>Transformamos lo que vemos.</p>
          </div>
        </section>

        <section id="empresas" className="companies section-dark">
          <div className="section-label">03 / NUESTRO ECOSISTEMA</div>
          <div className="section-heading"><h2>Seis caminos.<br/><em>Una visión.</em></h2><p>Seis unidades de negocio que comparten un mismo propósito, cada una con identidad propia.</p></div>
          <div className="company-grid">
            {companies.map((company, i) => (
              <article className={"company-card card-" + (i + 1) + " " + company.accent + "-card"} key={company.name}>
                <div className="card-number">0{i+1}</div>
                <div className="company-visual"><img src={company.logo} alt={`${company.name} logo`} /></div>
                <div className="card-content">
                  <span>{company.tag}</span>
                  <h3>{company.name}</h3>
                  <p>{company.text}</p>
                  <a href="#contacto">Conocer más <ArrowUpRight size={16}/></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="closing section-black">
          <div className="closing-art"><img src="/medunz-medusa.svg" alt="" /></div>
          <div className="closing-overlay" />
          <div className="closing-content"><span className="small-caps">MEDUNZ CORP.</span><h2>El siguiente<br/><em>capítulo.</em></h2><p>Estamos construyendo nuevas oportunidades.</p><a href="#contacto" className="hero-button">Hablar con nosotros <ArrowUpRight size={18}/></a></div>
        </section>

        <section id="contacto" className="contact section-dark">
          <div className="section-label">04 / CONTACTO</div>
          <div className="contact-grid"><div><h2>Hablemos de<br/><em>lo que sigue.</em></h2></div><div><p>Medunz Corp.<br/>Cochabamba · Bolivia</p><a className="contact-link" href="mailto:contacto@medunzcorp.com">contacto@medunzcorp.com <ArrowUpRight size={18}/></a></div></div>
        </section>
      </main>

      <footer><div className="footer-brand">MEDUNZ <span>CORP.</span></div><p>ESTRATEGIA · INNOVACIÓN · RESULTADOS</p><span>© {new Date().getFullYear()} Medunz Corp.</span></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
