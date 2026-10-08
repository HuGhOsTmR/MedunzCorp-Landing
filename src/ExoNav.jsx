import React from 'react';
import { BarChart3, Boxes, ClipboardList, FileBox, Layers3, PackageSearch, ReceiptText, Tags, Users, ArrowLeft } from 'lucide-react';
import './exo-nav.css';

const ITEMS = [
  { key:'dashboard', label:'Dashboard', href:'/exo/dashboard', icon:BarChart3 },
  { key:'productos', label:'Productos', href:'/exo/productos', icon:Boxes },
  { key:'presentaciones', label:'Presentaciones', href:'/exo/presentaciones', icon:Layers3 },
  { key:'sku', label:'SKU', href:'/exo/codificacionsku', icon:Tags },
  { key:'lotes', label:'Lotes', href:'/exo/lotes', icon:PackageSearch },
  { key:'inventario', label:'Inventario', href:'/exo/inventario', icon:FileBox },
  { key:'movimientos', label:'Kardex', href:'/exo/movimientos', icon:ReceiptText },
  { key:'clientes', label:'Clientes', href:'/exo/clientes', icon:Users },
  { key:'pedidos', label:'Pedidos', href:'/exo/pedidos', icon:ClipboardList },
];

export default function ExoNav({ active }) {
  return (
    <nav className="exo-nav" aria-label="Navegación EXO">
      <div className="exo-nav-scroll">
        {ITEMS.map(({key,label,href,icon:Icon}) => (
          <a key={key} href={href} className={active===key?'active':''}>
            <Icon size={15}/><span>{label}</span>
          </a>
        ))}
      </div>
      <a className="exo-nav-ghost" href="https://ghost.medunzcorp.com">
        <ArrowLeft size={15}/><span>Ghost</span>
      </a>
    </nav>
  );
}
