import React from 'react';
import {
  ArrowUpRight,
  Check,
  MapPin,
  Menu,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Users,
  X
} from 'lucide-react';
import pharmaLogo from './assets/medunz-pharma-logo.svg';
import './pharma.css';
import BrandSwitcher from './BrandSwitcher';

export default function PharmaLanding() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    document.title = 'Medunz Pharma | Salud al alcance de más personas';
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="pharma-site">
      <header className="pharma-nav">
        <a className="pharma-brand" href="#inicio" aria-label="Medunz Pharma inicio">
          <img src={pharmaLogo} alt="Medunz Pharma" />
        </a>

        <BrandSwitcher current="Medunz Pharma" />
        <nav className={menuOpen ? 'pharma-nav-links open' : 'pharma-nav-links'} aria-label="Navegación principal">
          <a href="#inicio" onClick={closeMenu}>Inicio</a>
          <a href="#propuesta" onClick={closeMenu}>Propuesta</a>
          <a href="#servicios" onClick={closeMenu}>Servicios</a>
          <a href="#compromiso" onClick={closeMenu}>Compromiso</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
        </nav>

        <a className="pharma-nav-cta" href="#contacto">
          Contáctanos <ArrowUpRight size={15} />
        </a>

        <button
          className="pharma-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        <section id="inicio" className="pharma-hero">
          <div className="pharma-hero-copy">
            <div className="pharma-kicker">MEDUNZ PHARMA · DISTRIBUIDORA DE MEDICAMENTOS</div>

            <h1>
              Salud al alcance<br />
              <em>de más personas.</em>
            </h1>

            <p className="pharma-hero-lead">
              Una propuesta enfocada en la distribución de medicamentos, con venta al por mayor
              y menor, cobertura regional y atención profesional.
            </p>

            <div className="pharma-actions">
              <a className="pharma-button" href="#propuesta">
                Conocer nuestra propuesta <ArrowUpRight size={16} />
              </a>
              <a className="pharma-text-link" href="#contacto">
                Solicitar información
              </a>
            </div>

            <div className="pharma-hero-trust">
              <span><ShieldCheck size={17} /> Calidad garantizada</span>
              <span><Truck size={17} /> Entrega rápida</span>
              <span><Users size={17} /> Atención profesional</span>
            </div>
          </div>

          <div className="pharma-hero-visual">
            <div className="pharma-hero-glow" />
            <div className="pharma-watermark" aria-hidden="true">
              <span />
            </div>

            <div className="pharma-hero-image-card">
              <img
                src="/medunz-pharma-brand.jpg"
                alt="Medunz Pharma — distribuidora de medicamentos"
              />
            </div>

            <div className="pharma-floating-card">
              <div className="pharma-floating-icon"><PackageCheck size={20} /></div>
              <div>
                <strong>Disponibilidad y cobertura</strong>
                <span>Una atención pensada para nuestros clientes.</span>
              </div>
            </div>
          </div>
        </section>

        <section id="propuesta" className="pharma-section pharma-proposal">
          <div className="pharma-kicker">01 · NUESTRA PROPUESTA</div>

          <div className="pharma-section-grid">
            <div>
              <h2>
                Distribución que conecta
                <br />
                <em>salud y disponibilidad.</em>
              </h2>
            </div>

            <div className="pharma-copy">
              <p>
                Medunz Pharma desarrolla una propuesta orientada a acercar medicamentos y
                productos de salud a través de una operación enfocada en cobertura, servicio y
                atención a nuestros clientes.
              </p>
              <p>
                Nuestro modelo combina venta al por mayor y menor con una experiencia de atención
                clara, cercana y profesional.
              </p>
            </div>
          </div>

          <div className="pharma-stat-grid">
            <article className="pharma-stat-card">
              <span className="pharma-stat-icon"><ShoppingCart size={22} /></span>
              <strong>Mayor y menor</strong>
              <p>Opciones de compra para distintos tipos de clientes.</p>
            </article>
            <article className="pharma-stat-card">
              <span className="pharma-stat-icon"><MapPin size={22} /></span>
              <strong>Cobertura regional</strong>
              <p>Una propuesta pensada para conectar diferentes mercados.</p>
            </article>
            <article className="pharma-stat-card">
              <span className="pharma-stat-icon"><Truck size={22} /></span>
              <strong>Entrega rápida</strong>
              <p>La distribución como parte central de nuestra experiencia.</p>
            </article>
          </div>
        </section>

        <section id="servicios" className="pharma-section pharma-services">
          <div className="pharma-section-heading centered">
            <div className="pharma-kicker">02 · SERVICIOS</div>
            <h2>
              Una propuesta clara.
              <br />
              <em>Un servicio cercano.</em>
            </h2>
            <p>
              Cuatro pilares que definen la experiencia de Medunz Pharma.
            </p>
          </div>

          <div className="pharma-service-grid">
            <article className="pharma-service-card">
              <div className="pharma-service-number">01</div>
              <div className="pharma-service-icon"><ShoppingCart size={27} /></div>
              <h3>Venta al por mayor y menor</h3>
              <p>Atención orientada a diferentes necesidades de compra.</p>
            </article>

            <article className="pharma-service-card">
              <div className="pharma-service-number">02</div>
              <div className="pharma-service-icon"><MapPin size={27} /></div>
              <h3>Cobertura regional</h3>
              <p>Una red de distribución pensada para ampliar el alcance.</p>
            </article>

            <article className="pharma-service-card">
              <div className="pharma-service-number">03</div>
              <div className="pharma-service-icon"><Truck size={27} /></div>
              <h3>Entrega rápida</h3>
              <p>La logística integrada a una experiencia de servicio ágil.</p>
            </article>

            <article className="pharma-service-card">
              <div className="pharma-service-number">04</div>
              <div className="pharma-service-icon"><Users size={27} /></div>
              <h3>Atención profesional</h3>
              <p>Comunicación clara y acompañamiento durante la atención.</p>
            </article>
          </div>
        </section>

        <section id="compromiso" className="pharma-commitment">
          <div className="pharma-commitment-medusa" aria-hidden="true">
            <img src={pharmaLogo} alt="" />
          </div>

          <div className="pharma-commitment-copy">
            <div className="pharma-kicker light">03 · COMPROMISO</div>
            <h2>
              Calidad que se nota.
              <br />
              <em>Servicio que permanece.</em>
            </h2>
            <p>
              Construimos la propuesta de Medunz Pharma alrededor de tres ideas simples:
              calidad, disponibilidad y atención profesional.
            </p>

            <div className="pharma-check-list">
              <span><i><Check size={14} /></i> Calidad garantizada</span>
              <span><i><Check size={14} /></i> Entrega rápida</span>
              <span><i><Check size={14} /></i> Atención profesional</span>
            </div>
          </div>

          <div className="pharma-commitment-panel">
            <div className="pharma-panel-line" />
            <span>MEDUNZ PHARMA</span>
            <strong>Salud al alcance de más personas.</strong>
            <small>Distribuidora de medicamentos</small>
          </div>
        </section>

        <section id="contacto" className="pharma-contact">
          <div className="pharma-kicker">04 · CONTACTO</div>

          <div className="pharma-contact-grid">
            <div>
              <h2>
                Conversemos sobre
                <br />
                <em>lo que necesitas.</em>
              </h2>
            </div>

            <div className="pharma-contact-card">
              <p>
                Para información comercial, consultas y oportunidades de colaboración:
              </p>
              <a className="pharma-contact-email" href="mailto:contacto@medunzcorp.com">
                contacto@medunzcorp.com <ArrowUpRight size={18} />
              </a>
              <div className="pharma-contact-note">
                <span>MEDUNZ PHARMA</span>
                <span>Bolivia</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pharma-footer">
        <img src={pharmaLogo} alt="Medunz Pharma" />
        <span>Salud al alcance de más personas</span>
        <span>© {new Date().getFullYear()} Medunz Pharma · Created by Ghost W&SD</span>
      </footer>
    </div>
  );
}
