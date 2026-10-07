import React from 'react';
import ghostNavbarLogo from './assets/ghost-navbar-logo.svg';
import BrandSwitcher from './BrandSwitcher';
import { ArrowRight, ArrowUpRight, Check, Code2, Layers3, Sparkles, Workflow } from 'lucide-react';
import './ghost.css';

export default function GhostLanding() {
  React.useEffect(() => {
    document.title = 'GHOST | Web & Software Designers';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ghost-site">
      <header className="ghost-nav">
        <a href="#ghost-home" className="ghost-brand" aria-label="GHOST home">
          <img src={ghostNavbarLogo} alt="GHOST Web & Software Designers" />
        </a>
        <BrandSwitcher current="GHOST Web & Software" />
        <nav className="ghost-nav-links" aria-label="Ghost navigation">
          <a href="#services">Services</a>
          <a href="#approach">Approach</a>
          <a href="#work">Capabilities</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="ghost-nav-cta" href="#contact">Start a project <ArrowUpRight size={15} /></a>
      </header>

      <main>
        <section id="ghost-home" className="ghost-hero">
          <div className="ghost-hero-grid">
            <div className="ghost-hero-copy">
              <div className="ghost-kicker">GHOST · WEB & SOFTWARE DESIGNERS</div>
              <h1>We design.<br /><span>We build solutions.</span><br />We drive your <em>digital future.</em></h1>
              <p className="ghost-hero-lead">Digital products, web experiences and custom software designed around the way your business works.</p>
              <div className="ghost-actions">
                <a className="ghost-btn ghost-btn-red" href="#contact">Start a project <ArrowRight size={18} /></a>
                <a className="ghost-btn ghost-btn-outline" href="#services">Explore services</a>
              </div>
              <div className="ghost-proof">
                <span>DESIGN</span><i /> <span>DEVELOPMENT</span><i /> <span>DIGITAL</span>
              </div>
            </div>

            <div className="ghost-visual">
              <img
                className="ghost-hero-visual-image"
                src="/ghost-hero-visual.webp"
                alt="GHOST — Build, Ship, Grow"
              />
            </div>
          </div>
        </section>

        <section className="ghost-statement">
          <div className="ghost-statement-label">A DIGITAL PARTNER, NOT JUST A VENDOR.</div>
          <p>We turn complex ideas into clear digital products—combining strategy, design and engineering to create solutions people can actually use.</p>
        </section>

        <section id="services" className="ghost-section ghost-services">
          <div className="ghost-section-head">
            <div>
              <div className="ghost-kicker">01 · SERVICES</div>
              <h2>From first idea<br />to <em>real product.</em></h2>
            </div>
            <p>We bring the disciplines together so you don't have to manage disconnected teams.</p>
          </div>

          <div className="ghost-service-grid">
            <article className="ghost-service-card">
              <span className="ghost-service-number">01</span>
              <Code2 size={28} />
              <h3>Web & Apps</h3>
              <p>Responsive websites and digital products designed to be fast, clear and useful.</p>
            </article>
            <article className="ghost-service-card ghost-service-card-dark">
              <span className="ghost-service-number">02</span>
              <Layers3 size={28} />
              <h3>Custom Software</h3>
              <p>Business software shaped around your workflows, data and operational needs.</p>
            </article>
            <article className="ghost-service-card">
              <span className="ghost-service-number">03</span>
              <Workflow size={28} />
              <h3>Digital Systems</h3>
              <p>Connected experiences that help teams work smarter across their digital ecosystem.</p>
            </article>
            <article className="ghost-service-card ghost-service-card-red">
              <span className="ghost-service-number">04</span>
              <Sparkles size={28} />
              <h3>Digital Strategy</h3>
              <p>Clear direction, practical roadmaps and product decisions focused on business value.</p>
            </article>
          </div>
        </section>

        <section id="approach" className="ghost-section ghost-approach">
          <div className="ghost-approach-image">
            <div className="ghost-code-window">
              <div className="ghost-window-bar"><span /><span /><span /></div>
              <div className="ghost-code-line w1" />
              <div className="ghost-code-line w2" />
              <div className="ghost-code-line w3" />
              <div className="ghost-code-line w4" />
              <div className="ghost-code-line w5" />
              <div className="ghost-code-line w6" />
            </div>
            <div className="ghost-red-block" />
          </div>
          <div className="ghost-approach-copy">
            <div className="ghost-kicker">02 · APPROACH</div>
            <h2>Think clearly.<br /><span>Build boldly.</span></h2>
            <p>Every project moves through a simple cycle: understand the challenge, define the right solution, build with intention and improve continuously.</p>
            <div className="ghost-steps">
              {[
                ['01', 'Discover', 'Understand goals, users and constraints.'],
                ['02', 'Design', 'Shape the experience and the product system.'],
                ['03', 'Build', 'Develop, test and launch with focus.'],
                ['04', 'Evolve', 'Measure, improve and keep moving forward.']
              ].map(([number, title, text]) => (
                <div className="ghost-step" key={number}>
                  <span>{number}</span>
                  <div><h4>{title}</h4><p>{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="ghost-capabilities">
          <div className="ghost-capabilities-inner">
            <div className="ghost-kicker">03 · CAPABILITIES</div>
            <h2>Built for ambitious<br /><em>digital futures.</em></h2>
            <div className="ghost-capability-list">
              <span>Websites</span><span>Web Applications</span><span>Mobile Experiences</span><span>Custom Software</span><span>Business Platforms</span><span>Automation</span><span>UI / UX</span><span>Digital Strategy</span>
            </div>
          </div>
        </section>

        <section id="contact" className="ghost-contact">
          <div className="ghost-contact-box">
            <div className="ghost-kicker">04 · CONTACT</div>
            <h2>Let's build what<br /><em>comes next.</em></h2>
            <p>Tell us what you're trying to solve, what you're building or where you want to go next.</p>
            <a className="ghost-btn ghost-btn-red" href="mailto:hello@ghost.medunzcorp.com">hello@ghost.medunzcorp.com <ArrowUpRight size={18} /></a>
          </div>
          <div className="ghost-contact-side">
            <div className="ghost-check"><Check size={16} /> Strategy-led</div>
            <div className="ghost-check"><Check size={16} /> Human-centered</div>
            <div className="ghost-check"><Check size={16} /> Built to evolve</div>
          </div>
        </section>
      </main>

      <footer className="ghost-footer">
        <div className="ghost-footer-brand">
          <img src={ghostLogo} alt="GHOST" />
        </div>
        <div>WEB · SOFTWARE · DIGITAL</div>
        <div>© {new Date().getFullYear()} GHOST / MEDUNZ CORP. · Created by Ghost W&SD</div>
      </footer>
    </div>
  );
}
