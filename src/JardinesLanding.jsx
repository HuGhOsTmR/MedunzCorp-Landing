import React from 'react';
import { ArrowUpRight, Leaf, Menu, Droplets, Scissors, Sparkles, Waves, Trees, X } from 'lucide-react';
import jardinesLogo from './assets/medunz-jardines-logo.svg';
import './jardines.css';

const services = [
  { icon: Trees, title: 'Mantenimiento de Áreas Verdes', text: 'Conservación de áreas verdes para condominios, empresas y hoteles.' },
  { icon: Leaf, title: 'Mantenimiento de Jardines', text: 'Cuidado de especies, podado, fumigación y reforestación.' },
  { icon: Sparkles, title: 'Diseño y construcción', text: 'Diseños y proyectos de jardines adaptados a cada espacio.' },
  { icon: Leaf, title: 'Paisajismo', text: 'Composición de espacios que busca armonía entre entorno, formas y vegetación.' },
  { icon: Waves, title: 'Mantenimiento de piscinas', text: 'Cuidado y mantenimiento de espacios de agua y sus áreas complementarias.' },
  { icon: Sparkles, title: 'Limpieza de áreas comunes', text: 'Espacios ordenados y despejados para una mejor experiencia.' }
];

function BotanicalArt() {
  return (
    <div className="jardines-art" aria-hidden="true">
      <div className="jardines-art-circle jardines-art-circle-one" />
      <div className="jardines-art-circle jardines-art-circle-two" />
      <svg viewBox="0 0 520 520" className="jardines-art-svg">
        <path d="M258 434C255 350 262 275 296 196C316 149 351 117 395 84" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        <path d="M265 352C213 327 177 286 171 227" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <path d="M292 248C338 243 380 221 416 186" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <path d="M213 286C173 272 141 244 120 207" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <path d="M172 226C166 178 188 143 230 119C231 163 214 199 172 226Z" fill="currentColor" opacity=".18" />
        <path d="M414 187C411 143 430 111 469 91C470 132 451 165 414 187Z" fill="currentColor" opacity=".22" />
        <path d="M120 207C100 171 106 137 134 108C157 142 153 176 120 207Z" fill="currentColor" opacity=".18" />
        <path d="M297 197C283 153 294 117 326 88C348 125 337 163 297 197Z" fill="currentColor" opacity=".18" />
        <circle cx="259" cy="434" r="13" fill="currentColor" />
        <circle cx="395" cy="84" r="12" fill="currentColor" />
      </svg>
      <div className="jardines-art-label">NATURALEZA · EQUILIBRIO · BIENESTAR</div>
    </div>
  );
}

export default function JardinesLanding() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const closeMenu = () => setMenuOpen(false);

  React.useEffect(() => {
    document.title = 'Medunz Jardines | Naturaleza que inspira';
  }, []);

  return (
    <div className="jardines-site">
      <header className="jardines-nav">
        <a href="#inicio" className="jardines-brand" aria-label="Medunz Jardines inicio">
          <img src={jardinesLogo} alt="Medunz Jardines" />
        </a>

        <nav className={menuOpen ? 'jardines-nav-links open' : 'jardines-nav-links'} aria-label="Navegación principal">
          <a href="#inicio" onClick={closeMenu}>Inicio</a>
          <a href="#nosotros" onClick={closeMenu}>Nosotros</a>
          <a href="#servicios" onClick={closeMenu}>Servicios</a>
          <a href="#filosofia" onClick={closeMenu}>Nuestra mirada</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
        </nav>

        <a className="jardines-nav-cta" href="#contacto">Conócenos <ArrowUpRight size={15} /></a>
        <button className="jardines-menu-toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        <section id="inicio" className="jardines-hero">
          <div className="jardines-hero-copy">
            <div className="jardines-kicker">MEDUNZ JARDINES · ESPACIOS QUE INSPIRAN</div>
            <h1>
              Cuidamos la naturaleza.
              <br />
              <em>Creamos equilibrio.</em>
            </h1>
            <p className="jardines-hero-lead">
              Diseñamos, mantenemos y transformamos jardines para crear ambientes
              de recreación y armonía entre las personas y la naturaleza.
            </p>
            <div className="jardines-actions">
              <a className="jardines-button" href="#servicios">Conocer servicios <ArrowUpRight size={16} /></a>
              <a className="jardines-text-link" href="#contacto">Solicitar información</a>
            </div>
            <div className="jardines-hero-meta">
              <span>Bolivia</span>
              <i />
              <span>Diseño</span>
              <i />
              <span>Mantenimiento</span>
              <i />
              <span>Paisajismo</span>
            </div>
          </div>

          <div className="jardines-hero-visual">
            <BotanicalArt />
            <div className="jardines-hero-logo-card">
              <img src={jardinesLogo} alt="Medunz Jardines" />
              <span>La naturaleza nos da todo lo que necesitamos.</span>
            </div>
          </div>
        </section>

        <section id="nosotros" className="jardines-intro jardines-section">
          <div className="jardines-kicker">01 · NOSOTROS</div>
          <div className="jardines-intro-grid">
            <div>
              <h2>Espacios que buscan<br /><em>vivir en armonía.</em></h2>
            </div>
            <div className="jardines-copy">
              <p>
                MEDUNZ Jardines nace ante la necesidad de generar ambientes de recreación
                donde podamos relacionarnos con la naturaleza, entenderla y respetarla.
              </p>
              <p>
                El diseño y desarrollo de jardines es el primer paso para contar con un
                ambiente equilibrado dentro de nuestros hogares.
              </p>
            </div>
          </div>

          <div className="jardines-mission-vision">
            <article>
              <span className="jardines-label">Misión</span>
              <p>Contribuir al cuidado de nuestro planeta mediante el cuidado de nuestros hogares, promoviendo el equilibrio de nuestros jardines para vivir en armonía con la naturaleza.</p>
            </article>
            <article>
              <span className="jardines-label">Visión</span>
              <p>Ser la empresa referente en Bolivia en el cuidado de la naturaleza y de nuestros jardines.</p>
            </article>
          </div>
        </section>

        <section id="servicios" className="jardines-services jardines-section">
          <div className="jardines-services-heading">
            <div>
              <div className="jardines-kicker">02 · SERVICIOS</div>
              <h2>Del cuidado diario<br /><em>al paisaje completo.</em></h2>
            </div>
            <p>
              Una oferta integral para conservar, diseñar y equilibrar espacios
              verdes según las necesidades de cada cliente.
            </p>
          </div>

          <div className="jardines-service-grid">
            {services.map(({ icon: Icon, title, text }, index) => (
              <article className="jardines-service-card" key={title}>
                <div className="jardines-service-top">
                  <span>0{index + 1}</span>
                  <Icon size={25} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="jardines-card-line" />
              </article>
            ))}
          </div>
        </section>

        <section id="filosofia" className="jardines-philosophy">
          <div className="jardines-philosophy-mark" aria-hidden="true"><BotanicalArt /></div>
          <div className="jardines-philosophy-copy">
            <div className="jardines-kicker light">03 · NUESTRA MIRADA</div>
            <h2>La armonía también<br /><em>se diseña.</em></h2>
            <p>
              Nuestra propuesta recoge la idea del equilibrio entre el urbanismo y la naturaleza.
              El documento institucional de Medunz Jardines plantea el Feng Shui como una
              herramienta para buscar armonía y favorecer el flujo natural de los espacios.
            </p>
            <div className="jardines-pill-row">
              <span>Equilibrio</span>
              <span>Naturaleza</span>
              <span>Paisajismo</span>
              <span>Feng Shui</span>
            </div>
          </div>
        </section>

        <section id="contacto" className="jardines-contact jardines-section">
          <div className="jardines-kicker">04 · CONTACTO</div>
          <div className="jardines-contact-grid">
            <div>
              <h2>Hagamos espacio<br /><em>para la naturaleza.</em></h2>
            </div>
            <div className="jardines-contact-card">
              <strong>Medunz Jardines</strong>
              <p>Av. Virgen de Cotoca Km. 8<br />Santa Cruz de la Sierra — Bolivia</p>
              <div className="jardines-contact-lines">
                <a href="tel:+59133245010">(591) 33245010 <ArrowUpRight size={15} /></a>
                <a href="tel:+59179760818">(591) 79760818 <ArrowUpRight size={15} /></a>
                <a href="tel:+59170745349">(591) 70745349 <ArrowUpRight size={15} /></a>
                <a href="mailto:medunz.jardines@gmail.com">medunz.jardines@gmail.com <ArrowUpRight size={15} /></a>
              </div>
              <a className="jardines-facebook" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="jardines-footer">
        <img src={jardinesLogo} alt="Medunz Jardines" />
        <span>MEDUNZ JARDINES · CUIDANDO LA NATURALEZA</span>
        <span>© {new Date().getFullYear()} Medunz Jardines · Created by Ghost W&SD</span>
      </footer>
    </div>
  );
}
