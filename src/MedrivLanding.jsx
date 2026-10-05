import React from 'react';
import { ArrowUpRight, Building2, CheckCircle2, Handshake, KeyRound, MapPin, Menu, TrendingUp, X } from 'lucide-react';
import medrivLogo from './assets/medriv-logo.svg';
import './medriv.css';
import BrandSwitcher from './BrandSwitcher';

const services = [
  { icon: Building2, title: 'Compra y venta', text: 'Acompañamiento en operaciones de compra y venta de inmuebles.' },
  { icon: Handshake, title: 'Asesoría inmobiliaria', text: 'Orientación para tomar decisiones con mayor claridad y respaldo.' },
  { icon: Building2, title: 'Proyectos y desarrollos', text: 'Espacios y oportunidades con visión de largo plazo.' },
  { icon: KeyRound, title: 'Alquileres y administración', text: 'Gestión orientada a propietarios e inquilinos.' },
  { icon: MapPin, title: 'Terrenos y lotes', text: 'Alternativas para quienes buscan ubicación y potencial.' },
  { icon: TrendingUp, title: 'Inversiones inmobiliarias', text: 'Oportunidades patrimoniales pensadas para crecer.' },
];

export default function MedrivLanding() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const closeMenu = () => setMenuOpen(false);

  React.useEffect(() => {
    document.title = 'MedRiv Bienes Raíces | Espacios para tu futuro';
  }, []);

  return (
    <div className="medriv-site">
      <header className="medriv-nav">
        <a className="medriv-brand" href="#inicio" aria-label="MedRiv Bienes Raíces inicio">
          <img src={medrivLogo} alt="MedRiv Bienes Raíces" />
        </a>

        <BrandSwitcher current="MedRiv Bienes Raíces" />
        <nav className={menuOpen ? 'medriv-nav-links open' : 'medriv-nav-links'} aria-label="Navegación principal">
          <a href="#inicio" onClick={closeMenu}>Inicio</a>
          <a href="#propuesta" onClick={closeMenu}>Propuesta</a>
          <a href="#servicios" onClick={closeMenu}>Servicios</a>
          <a href="#respaldo" onClick={closeMenu}>Respaldo</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
        </nav>

        <a className="medriv-nav-cta" href="#contacto">Contáctanos <ArrowUpRight size={15} /></a>
        <button className="medriv-menu-toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        <section id="inicio" className="medriv-hero">
          <div className="medriv-hero-copy">
            <div className="medriv-kicker">MEDRIV · BIENES RAÍCES</div>
            <h1>
              Espacios<br />
              <em>para tu futuro.</em>
            </h1>
            <p className="medriv-hero-lead">
              Compra, venta y asesoría inmobiliaria con confianza, respaldo y una mirada enfocada en el valor de cada espacio.
            </p>
            <div className="medriv-actions">
              <a className="medriv-button" href="#servicios">Conocer nuestros servicios <ArrowUpRight size={16} /></a>
              <a className="medriv-text-link" href="#contacto">Solicitar información</a>
            </div>
            <div className="medriv-hero-trust">
              <span><CheckCircle2 size={17} /> Confianza</span>
              <span><CheckCircle2 size={17} /> Respaldo</span>
              <span><CheckCircle2 size={17} /> Visión</span>
            </div>
          </div>

          <div className="medriv-hero-visual">
            <div className="medriv-red-orbit" aria-hidden="true" />
            <div className="medriv-building-mark" aria-hidden="true"><Building2 size={180} strokeWidth={1.1} /></div>
            <div className="medriv-hero-image">
              <img src="/medriv-card.webp" alt="MedRiv Bienes Raíces" />
            </div>
          </div>
        </section>

        <section id="propuesta" className="medriv-section medriv-proposal">
          <div className="medriv-kicker">01 · NUESTRA PROPUESTA</div>
          <div className="medriv-section-grid">
            <div>
              <h2>Una decisión inmobiliaria<br /><em>merece una buena mirada.</em></h2>
            </div>
            <div className="medriv-copy">
              <p>
                MedRiv Bienes Raíces busca conectar personas con espacios que respondan a sus necesidades, proyectos y objetivos patrimoniales.
              </p>
              <p>
                Nuestra propuesta integra operación inmobiliaria, asesoría y acompañamiento para convertir una decisión compleja en un proceso más claro.
              </p>
            </div>
          </div>

          <div className="medriv-value-grid">
            <article><span>01</span><strong>Claridad</strong><p>Información y orientación para decidir mejor.</p></article>
            <article><span>02</span><strong>Respaldo</strong><p>Un acompañamiento enfocado en cada operación.</p></article>
            <article><span>03</span><strong>Patrimonio</strong><p>Miramos cada espacio también como una oportunidad.</p></article>
          </div>
        </section>

        <section id="servicios" className="medriv-section medriv-services">
          <div className="medriv-heading-centered">
            <div className="medriv-kicker">02 · SERVICIOS</div>
            <h2>Del espacio que imaginas<br /><em>a la decisión que tomas.</em></h2>
            <p>Una propuesta integral alrededor de seis áreas de servicio.</p>
          </div>

          <div className="medriv-service-grid">
            {services.map(({ icon: Icon, title, text }, index) => (
              <article className="medriv-service-card" key={title}>
                <div className="medriv-service-top"><span>0{index + 1}</span><Icon size={25} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="respaldo" className="medriv-respaldo">
          <div className="medriv-respaldo-image">
            <img src="/medriv-card.webp" alt="" />
          </div>
          <div className="medriv-respaldo-copy">
            <div className="medriv-kicker light">03 · RESPALDO</div>
            <h2>El patrimonio<br /><em>también se construye.</em></h2>
            <p>
              Desde un primer terreno hasta una nueva inversión, acompañamos cada etapa con una mirada práctica sobre el espacio, la operación y el futuro.
            </p>
            <div className="medriv-checks">
              <span><CheckCircle2 size={19} /> Atención personalizada</span>
              <span><CheckCircle2 size={19} /> Información clara</span>
              <span><CheckCircle2 size={19} /> Visión de largo plazo</span>
            </div>
          </div>
        </section>

        <section id="contacto" className="medriv-contact medriv-section">
          <div className="medriv-kicker">04 · CONTACTO</div>
          <div className="medriv-contact-grid">
            <div><h2>Encuentra el espacio<br /><em>para lo que sigue.</em></h2></div>
            <div className="medriv-contact-card">
              <p>Conversemos sobre compra, venta, alquileres, terrenos o inversiones inmobiliarias.</p>
              <a className="medriv-contact-link" href="mailto:contacto@medunzcorp.com">contacto@medunzcorp.com <ArrowUpRight size={18} /></a>
              <div className="medriv-contact-note"><span>MedRiv Bienes Raíces</span><span>Bolivia</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="medriv-footer">
        <img src={medrivLogo} alt="MedRiv Bienes Raíces" />
        <span>ESPACIOS PARA TU FUTURO</span>
        <span>© {new Date().getFullYear()} MedRiv Bienes Raíces · Created by Ghost W&SD</span>
      </footer>
    </div>
  );
}
