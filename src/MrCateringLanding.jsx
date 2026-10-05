import React from 'react';
import {
  ArrowUpRight,
  CalendarDays,
  ChefHat,
  Home,
  MapPin,
  Menu,
  PartyPopper,
  Sparkles,
  Users,
  Utensils,
  X
} from 'lucide-react';
import cateringLogo from './assets/mr-catering-logo.svg';
import './mrcatering.css';
import BrandSwitcher from './BrandSwitcher';

const services = [
  { icon: CalendarDays, title: 'Eventos corporativos', text: 'Catering pensado para reuniones, celebraciones y actividades de empresa.' },
  { icon: Users, title: 'Reuniones y capacitaciones', text: 'Alternativas para acompañar jornadas de trabajo con un servicio cuidado.' },
  { icon: Home, title: 'Servicios a domicilio', text: 'Una propuesta gastronómica para disfrutar en casa o donde la necesites.' },
  { icon: Utensils, title: 'Menús personalizados', text: 'Opciones adaptadas al tipo de evento, cantidad de personas y ocasión.' },
  { icon: ChefHat, title: 'Coffee breaks y refrigerios', text: 'Momentos de pausa con una presentación práctica y agradable.' },
  { icon: PartyPopper, title: 'Eventos especiales', text: 'Catering para celebraciones que merecen una experiencia diferente.' }
];

export default function MrCateringLanding() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const closeMenu = () => setMenuOpen(false);

  React.useEffect(() => {
    document.title = 'M&R Catering | Es como comer en casa...';
  }, []);

  return (
    <div className="mrc-site">
      <header className="mrc-nav">
        <a href="#inicio" className="mrc-brand" aria-label="M&R Catering inicio">
          <img src={cateringLogo} alt="M&R Catering" />
        </a>

        <BrandSwitcher current="M&R Catering" />
        <nav className={menuOpen ? 'mrc-nav-links open' : 'mrc-nav-links'} aria-label="Navegación principal">
          <a href="#inicio" onClick={closeMenu}>Inicio</a>
          <a href="#propuesta" onClick={closeMenu}>Propuesta</a>
          <a href="#servicios" onClick={closeMenu}>Servicios</a>
          <a href="#experiencia" onClick={closeMenu}>Experiencia</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
        </nav>

        <a className="mrc-nav-cta" href="#contacto">Contáctanos <ArrowUpRight size={15} /></a>
        <button className="mrc-menu" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        <section id="inicio" className="mrc-hero">
          <div className="mrc-hero-copy">
            <div className="mrc-kicker">M&R CATERING · SERVICIO GASTRONÓMICO</div>
            <h1>
              Es como
              <br />
              <em>comer en casa...</em>
            </h1>
            <p className="mrc-lead">
              Servicio de catering con el sabor, calidad y calidez de siempre.
            </p>

            <div className="mrc-actions">
              <a className="mrc-button" href="#servicios">Conocer nuestros servicios <ArrowUpRight size={16} /></a>
              <a className="mrc-text-link" href="#contacto">Solicitar información</a>
            </div>

            <div className="mrc-hero-meta">
              <span>Sabor</span><i />
              <span>Calidad</span><i />
              <span>Calidez</span>
            </div>
          </div>

          <div className="mrc-hero-visual">
            <div className="mrc-hero-glow" />
            <div className="mrc-swoosh mrc-swoosh-blue" />
            <div className="mrc-swoosh mrc-swoosh-orange" />
            <div className="mrc-hero-card">
              <img src="/mrcatering-card.webp" alt="M&R Catering — Es como comer en casa..." />
            </div>
            <div className="mrc-floating-card">
              <span className="mrc-floating-icon"><Sparkles size={20} /></span>
              <div>
                <strong>Sabor que conecta</strong>
                <span>Una experiencia cálida en cada momento.</span>
              </div>
            </div>
          </div>
        </section>

        <section id="propuesta" className="mrc-section mrc-proposal">
          <div className="mrc-kicker">01 · NUESTRA PROPUESTA</div>
          <div className="mrc-proposal-grid">
            <h2>El sabor de casa<br /><em>en cada ocasión.</em></h2>
            <div className="mrc-copy">
              <p>
                En M&R Catering buscamos que cada servicio conserve algo esencial:
                la sensación de sentarse a la mesa y disfrutar comida preparada con
                dedicación.
              </p>
              <p>
                Nuestra propuesta combina una atención cercana con soluciones para
                distintos tipos de reuniones, celebraciones y momentos especiales.
              </p>
            </div>
          </div>

          <div className="mrc-values">
            <article><span>01</span><strong>Sabor</strong><p>Preparaciones pensadas para disfrutar.</p></article>
            <article><span>02</span><strong>Calidad</strong><p>Presentación y servicio en cada detalle.</p></article>
            <article><span>03</span><strong>Calidez</strong><p>Una atención cercana y humana.</p></article>
          </div>
        </section>

        <section id="servicios" className="mrc-section mrc-services">
          <div className="mrc-heading">
            <div>
              <div className="mrc-kicker">02 · SERVICIOS</div>
              <h2>Para compartir.<br /><em>Para celebrar.</em></h2>
            </div>
            <p>
              Una propuesta flexible para acompañar distintos tipos de eventos y
              necesidades gastronómicas.
            </p>
          </div>

          <div className="mrc-service-grid">
            {services.map(({ icon: Icon, title, text }, index) => (
              <article className="mrc-service-card" key={title}>
                <div className="mrc-service-top">
                  <span>0{index + 1}</span>
                  <Icon size={25} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="mrc-card-line" />
              </article>
            ))}
          </div>
        </section>

        <section id="experiencia" className="mrc-experience">
          <div className="mrc-experience-media">
            <div className="mrc-experience-ring" />
            <img src="/mrcatering-card.webp" alt="M&R Catering — servicio gastronómico" />
          </div>

          <div className="mrc-experience-copy">
            <div className="mrc-kicker light">03 · EXPERIENCIA</div>
            <h2>Un buen momento<br /><em>empieza en la mesa.</em></h2>
            <p>
              Desde un coffee break hasta un evento especial, nuestra intención es
              que la comida forme parte de una experiencia agradable, bien cuidada
              y fácil de disfrutar.
            </p>
            <div className="mrc-experience-points">
              <span><ChefHat size={16} /> Preparación</span>
              <span><Utensils size={16} /> Presentación</span>
              <span><Users size={16} /> Servicio</span>
            </div>
          </div>
        </section>

        <section id="contacto" className="mrc-section mrc-contact">
          <div className="mrc-kicker">04 · CONTACTO</div>
          <div className="mrc-contact-grid">
            <div>
              <h2>Hagamos de tu próximo evento<br /><em>un momento para recordar.</em></h2>
            </div>
            <div className="mrc-contact-card">
              <strong>M&R Catering</strong>
              <p>Cuéntanos sobre tu evento y conversemos sobre una propuesta gastronómica a tu medida.</p>
              <a className="mrc-email" href="mailto:contacto@medunzcorp.com">
                contacto@medunzcorp.com <ArrowUpRight size={18} />
              </a>
              <span className="mrc-contact-note"><MapPin size={13} /> Bolivia</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="mrc-footer">
        <img src={cateringLogo} alt="M&R Catering" />
        <span>ES COMO COMER EN CASA...</span>
        <span>© {new Date().getFullYear()} M&R Catering · Created by Ghost W&SD</span>
      </footer>
    </div>
  );
}
