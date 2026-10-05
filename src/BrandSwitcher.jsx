import React from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import './brand-switcher.css';

const brands = [
  { name: 'MedUnz Corp.', href: 'https://medunzcorp.com', short: 'Corporativo' },
  { name: 'GHOST Web & Software', href: 'https://ghost.medunzcorp.com', short: 'Tecnología' },
  { name: 'HUPI Baby Gym', href: 'https://hupi.medunzcorp.com', short: 'Desarrollo infantil' },
  { name: 'Medunz Pharma', href: 'https://pharma.medunzcorp.com', short: 'Salud' },
  { name: 'Medunz Jardines', href: 'https://jardines.medunzcorp.com', short: 'Naturaleza' },
  { name: 'M&R Catering', href: 'https://mrcatering.medunzcorp.com', short: 'Gastronomía' },
  { name: 'MedRiv Bienes Raíces', href: 'https://medriv.medunzcorp.com', short: 'Bienes raíces' }
];

export default function BrandSwitcher({ current }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handleOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div className="brand-switcher" ref={ref}>
      <button
        className="brand-switcher-trigger"
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen(!open)}
      >
        <span>Grupo MedUnz</span>
        <ChevronDown size={14} className={open ? 'rotated' : ''} />
      </button>

      {open && (
        <div className="brand-switcher-menu" role="menu">
          <div className="brand-switcher-heading">Nuestras empresas</div>
          {brands.map((brand) => (
            <a
              key={brand.name}
              href={brand.href}
              role="menuitem"
              className={current === brand.name ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              <span>
                <strong>{brand.name}</strong>
                <small>{brand.short}</small>
              </span>
              <ArrowUpRight size={15} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
