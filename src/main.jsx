import React from 'react';
import { ArrowDown, ArrowUpRight, Compass, Lightbulb, ShieldCheck, TrendingUp, Globe2 } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import logo from './assets/medunz-logo.png';
import hero from './assets/medunz-hero.png';

const companies = [
  { name: 'Medunz Jardines', tag: 'Espacios · Naturaleza', text: 'Una unidad orientada a la creación y desarrollo de espacios con identidad propia.' },
  { name: 'HUPI Baby Gym', tag: 'Familias · Desarrollo', text: 'Experiencias y propuestas centradas en el desarrollo infantil y las familias.' },
  { name: 'Ghost Web & Software Designer', tag: 'Tecnología · Digital', text: 'Diseño, software y soluciones digitales para transformar ideas en productos.' },
  { name: 'RIHU Bienes Raíces', tag: 'Inversión · Inmobiliario', text: 'Una visión de oportunidades inmobiliarias, inversión y desarrollo.' },
  { name: 'Medunz Pharma', tag: 'Farmacéutica · Gestión', text: 'Soluciones y capacidades vinculadas al sector farmacéutico y su cadena de valor.' }
];

function App() {
  return (
    <div className="site">
      <header className="nav">
        <a href="#inicio" className="brand"><img src={logo} alt="Medunz Corp." /></a>
        <nav>
          <a href="#grupo">El grupo</a>
          <a href="#vision">Visión</a>
          <a href="#empresas">Empresas</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="nav-cta" href="#empresas">Explorar <ArrowUpRight size={16}/></a>
      </header>

      <main>
        <section id="inicio" className="hero" style={{ backgroundImage: `url(${hero})` }}>
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="eyebrow">MEDUNZ CORP. · BOLIVIA</div>
            <h1>Una mirada<br/><span>que transforma.</span></h1>
            <p className="hero-copy">Estrategia · Innovación · Resultados</p>
            <p className="quote">Tecnología, visión y propósito para transformar oportunidades en futuro.</p>
            <a href="#grupo" className="hero-button">Conocer nuestro grupo <ArrowDown size={18}/></a>
          </div>
          <div className="hero-bottom"><span>01</span><div className="line"/><span>05</span></div>
        </section>

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
            {[[Compass,'Estrategia'],[Lightbulb,'Innovación'],[TrendingUp,'Crecimiento'],[ShieldCheck,'Confianza'],[Globe2,'Visión global']].map(([Icon,label]) => <div className="value" key={label}><Icon size={25}/><span>{label}</span></div>)}
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
          <div className="section-heading"><h2>Cinco caminos.<br/><em>Una visión.</em></h2><p>Conoce las empresas que forman parte del ecosistema Medunz Corp.</p></div>
          <div className="company-grid">
            {companies.map((company, i) => <article className={`company-card card-${i+1}`} key={company.name}><div className="card-number">0{i+1}</div><div className="card-content"><span>{company.tag}</span><h3>{company.name}</h3><p>{company.text}</p><a href="#contacto">Conocer más <ArrowUpRight size={16}/></a></div></article>)}
          </div>
        </section>

        <section className="closing section-black">
          <div className="closing-art" style={{ backgroundImage: `url(${hero})` }} />
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
