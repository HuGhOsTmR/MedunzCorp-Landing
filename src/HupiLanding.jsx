import React from 'react';
import { ArrowUpRight, Brain, Heart, Sparkles, Users, Menu, X } from 'lucide-react';

import hupiLogo from './assets/hupi-baby-gym-logo.svg';

export default function HupiLanding() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const closeMenu = () => setMenuOpen(false);

  React.useEffect(() => {
    document.title = 'HUPI Baby Gym | Estimulación Temprana';
  }, []);

  return (
    <div className="hupi-site">
      <header className="hupi-nav">
        <a href="#inicio" className="hupi-brand" aria-label="HUPI Baby Gym">
          <img src={hupiLogo} alt="HUPI Baby Gym" />
        </a>

        <nav className={menuOpen ? 'hupi-nav-links open' : 'hupi-nav-links'}>
          <a href="#inicio" onClick={closeMenu}>Inicio</a>
          <a href="#propuesta" onClick={closeMenu}>Nuestra propuesta</a>
          <a href="#desarrollo" onClick={closeMenu}>Desarrollo</a>
          <a href="#familias" onClick={closeMenu}>Familias</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
        </nav>

        <a className="hupi-nav-cta" href="#contacto">Conócenos <ArrowUpRight size={15} /></a>
        <button className="hupi-menu-toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        <section id="inicio" className="hupi-hero">
          <div className="hupi-hero-copy">
            <div className="hupi-kicker">HUPI BABY GYM · COCHABAMBA</div>
            <h1>Estimulación adecuada<br /><em>para el mejor desarrollo</em><br />de nuestros hijos.</h1>
            <p className="hupi-hero-lead">
              Un espacio pensado para acompañar a bebés y niños a través del juego, el movimiento
              y experiencias que favorecen su desarrollo integral.
            </p>
            <div className="hupi-actions">
              <a className="hupi-button" href="#propuesta">Conocer nuestra propuesta <ArrowUpRight size={16} /></a>
              <a className="hupi-text-link" href="#contacto">Quiero información</a>
            </div>
          </div>

          <div className="hupi-hero-visual">
            <div className="hupi-blob hupi-blob-pink" />
            <div className="hupi-blob hupi-blob-yellow" />
            <div className="hupi-image-card">
              <img src="/hupi-baby-gym.jpg" alt="HUPI Baby Gym" />
            </div>
            <div className="hupi-floating-note">
              <Sparkles size={17} />
              <span>Aprender también puede ser jugar.</span>
            </div>
          </div>
        </section>

        <section id="propuesta" className="hupi-section hupi-proposal">
          <div className="hupi-section-heading">
            <div className="hupi-kicker">01 · NUESTRA PROPUESTA</div>
            <h2>Crecer comienza<br /><em>con una buena experiencia.</em></h2>
          </div>
          <div className="hupi-proposal-grid">
            <div className="hupi-proposal-copy">
              <p>
                La estimulación temprana busca ofrecer al bebé y al niño oportunidades de desarrollo
                físico, intelectual y social mediante experiencias y actividades adecuadas a cada etapa.
              </p>
              <p>
                En HUPI, el juego se convierte en una herramienta para acompañar la psicomotricidad,
                las habilidades cognitivas, sensoriales, de lenguaje y la autonomía.
              </p>
            </div>
            <div className="hupi-stat-card">
              <span className="hupi-stat-number">0–7</span>
              <span className="hupi-stat-label">años · etapa de gran plasticidad para el desarrollo</span>
            </div>
          </div>
        </section>

        <section id="desarrollo" className="hupi-section hupi-development">
          <div className="hupi-section-heading centered">
            <div className="hupi-kicker">02 · DESARROLLO INTEGRAL</div>
            <h2>Espacios para<br /><em>descubrir y desarrollar.</em></h2>
          </div>

          <div className="hupi-card-grid">
            <article className="hupi-service-card hupi-yellow-card">
              <div className="hupi-icon"><Brain size={28} /></div>
              <h3>Desarrollo cognitivo</h3>
              <p>Experiencias que despiertan curiosidad, atención y aprendizaje a través del juego.</p>
            </article>

            <article className="hupi-service-card hupi-pink-card">
              <div className="hupi-icon"><Heart size={28} /></div>
              <h3>Desarrollo socioemocional</h3>
              <p>Un entorno seguro que acompaña la confianza, autonomía e interacción.</p>
            </article>

            <article className="hupi-service-card hupi-green-card">
              <div className="hupi-icon"><Sparkles size={28} /></div>
              <h3>Estimulación sensorial</h3>
              <p>Texturas, movimiento y estímulos pensados para enriquecer cada experiencia.</p>
            </article>

            <article className="hupi-service-card hupi-purple-card">
              <div className="hupi-icon"><Users size={28} /></div>
              <h3>Psicomotricidad y lenguaje</h3>
              <p>Actividades que favorecen el movimiento, la coordinación y la comunicación.</p>
            </article>
          </div>
        </section>

        <section id="familias" className="hupi-family-banner">
          <div className="hupi-family-copy">
            <div className="hupi-kicker">03 · PARA LAS FAMILIAS</div>
            <h2>El desarrollo de nuestros hijos<br /><em>también se construye en familia.</em></h2>
            <p>Un acompañamiento cercano permite convertir cada etapa en una oportunidad para descubrir nuevas capacidades.</p>
            <a className="hupi-button light" href="#contacto">Conversemos <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section id="contacto" className="hupi-contact">
          <div className="hupi-kicker">04 · CONTACTO</div>
          <div className="hupi-contact-grid">
            <div>
              <h2>Hagamos del desarrollo<br /><em>una experiencia feliz.</em></h2>
            </div>
            <div className="hupi-contact-info">
              <p><strong>HUPI Baby Gym</strong><br />Avenida Circunvalación Esq. Los Cedros<br />Cochabamba, Bolivia</p>
              <a href="https://www.google.com/maps/search/?api=1&query=Hupi+Baby+Gym+Cochabamba" target="_blank" rel="noreferrer">Ver ubicación <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="hupi-footer">
        <img src={hupiLogo} alt="HUPI Baby Gym" />
        <span>Estimulación adecuada para el mejor desarrollo de nuestros hijos</span>
        <span>© {new Date().getFullYear()} HUPI Baby Gym · Created by Ghost W&SD</span>
      </footer>
    </div>
  );
}
