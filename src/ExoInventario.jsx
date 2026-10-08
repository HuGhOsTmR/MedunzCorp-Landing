import React from 'react';
import GhostLogo from './assets/ghost-navbar-logo.svg';
import { ArrowLeft, Edit3, Package, Plus, Search, SlidersHorizontal, Trash2, AlertTriangle } from 'lucide-react';
import './exo-inventario.css';

const PRODUCTS=[
 ['VAJ','Vajillero',['1 L','3 L','10 L']],['LPI','Limpia Piso',['1 L','3 L','10 L']],
 ['SHA','Shampoo',['500 ml','1 L','3 L','10 L']],['SGR','Saca Grasa',['1 L','3 L','10 L']],
 ['LVR','Lava Ropa',['3 L','5 L','10 L']],['JLI','Jabón Líquido',['1 L','3 L','10 L']],
 ['CWS','Car Wash',['500 ml','1 L','3 L','10 L']]
];
const STORAGE='exo_inventory_v1';
const LOW=20;
const makeSku=(code,size)=>`EXO-${code}-${size==='500 ml'?'500':size.replace(' L','').padStart(3,'0')}`;
const catalog=PRODUCTS.flatMap(([code,product,sizes])=>sizes.map(size=>({sku:makeSku(code,size),code,product,presentation:size})));
const SEED=catalog.map((x,i)=>({
 ...x,
 stock:i===3?500:[18,65,120,42,80,35,12,55,90,25,40,15,70,32,110,28,45,18,60,24,75,16,50][i],
 reserved:i===3?24:([2,5,8].includes(i)?8:0)
}));

function load(){try{const x=JSON.parse(localStorage.getItem(STORAGE));if(Array.isArray(x)&&x.length)return x}catch{}return SEED}
const money=n=>`Bs ${Number(n||0).toFixed(2)}`;
const available=x=>Math.max(0,Number(x.stock||0)-Number(x.reserved||0));

export default function ExoInventario(){
 const [items,setItems]=React.useState(load),[selectedId,setSelectedId]=React.useState(load()[0]?.sku),[q,setQ]=React.useState(''),[filter,setFilter]=React.useState('Todos'),[modal,setModal]=React.useState(false),[editing,setEditing]=React.useState(null);
 React.useEffect(()=>{localStorage.setItem(STORAGE,JSON.stringify(items));document.title='EXO · Inventario'},[items]);
 const filtered=items.filter(x=>{const query=q.trim().toLowerCase();const status=available(x)===0?'Agotado':available(x)<=LOW?'Stock bajo':'Disponible';return (filter==='Todos'||status===filter)&&(!query||[x.sku,x.product,x.presentation,x.code].join(' ').toLowerCase().includes(query))});
 const selected=items.find(x=>x.sku===selectedId)||filtered[0];
 const save=x=>{setItems(a=>a.map(y=>y.sku===x.sku?x:y));setSelectedId(x.sku);setModal(false);setEditing(null)};
 const removeAdjustment=()=>{};
 const totalStock=items.reduce((s,x)=>s+Number(x.stock||0),0);
 const totalReserved=items.reduce((s,x)=>s+Number(x.reserved||0),0);
 const low=items.filter(x=>available(x)>0&&available(x)<=LOW).length;
 const empty=items.filter(x=>available(x)===0).length;
 return <div className="exo-inventory">
  <header className="exo-inventory-header"><a href="https://ghost.medunzcorp.com"><img src={GhostLogo} alt="Ghost Web & Software Designer"/></a><div><span>EXO CLEAN</span><strong>GESTIÓN DE INVENTARIO</strong></div><div className="exo-inventory-nav"><a className="exo-inventory-back" href="https://ghost.medunzcorp.com/exo/movimientos">Movimientos</a><a className="exo-inventory-back" href="https://ghost.medunzcorp.com/exo/lotes"><ArrowLeft size={15}/> Lotes</a></div></header>
  <main className="exo-inventory-main">
   <section className="exo-inventory-hero"><div><span className="exo-kicker">EXO CLEAN · EXISTENCIAS</span><h1>Inventario.<br/><em>Lo que tenemos, disponible.</em></h1><p>Controla las existencias por SKU, separando el stock físico del stock reservado para pedidos. El inventario es la base para preparar, entregar y vender.</p></div><div className="exo-inventory-mark"><Package size={38}/><strong>{items.length}</strong><span>SKU CONTROLADOS</span></div></section>
   <section className="exo-inventory-stats">
    <div><span>STOCK FÍSICO</span><strong>{totalStock.toLocaleString('es-BO')}</strong><small>unidades</small></div>
    <div><span>RESERVADO</span><strong>{totalReserved.toLocaleString('es-BO')}</strong><small>unidades</small></div>
    <div><span>STOCK BAJO</span><strong>{low}</strong><small>SKU requieren atención</small></div>
    <div><span>AGOTADOS</span><strong>{empty}</strong><small>SKU sin disponible</small></div>
   </section>
   <section className="exo-inventory-toolbar"><div className="exo-inventory-search"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar producto, presentación o SKU..."/></div><select value={filter} onChange={e=>setFilter(e.target.value)}><option>Todos</option><option>Disponible</option><option>Stock bajo</option><option>Agotado</option></select><button className="exo-inventory-btn primary" onClick={()=>{setEditing(null);setModal(true)}}><Plus size={16}/> Ajustar stock</button></section>
   <section className="exo-inventory-layout">
    <div className="exo-inventory-list"><div className="exo-list-head"><div><span>EXISTENCIAS POR SKU</span><h2>{filtered.length} registros</h2></div><SlidersHorizontal size={20}/></div>
      <div className="exo-table-head"><span>SKU / PRODUCTO</span><span>FÍSICO</span><span>RESERVADO</span><span>DISPONIBLE</span><span>ESTADO</span></div>
      {filtered.map(x=>{const av=available(x);const status=av===0?'Agotado':av<=LOW?'Stock bajo':'Disponible';return <button key={x.sku} className={selected?.sku===x.sku?'exo-stock-row active':'exo-stock-row'} onClick={()=>setSelectedId(x.sku)}><span><b>{x.sku}</b><small>{x.product} · {x.presentation}</small></span><strong>{x.stock.toLocaleString('es-BO')}</strong><span>{x.reserved.toLocaleString('es-BO')}</span><strong>{av.toLocaleString('es-BO')}</strong><em className={status==='Agotado'?'danger':status==='Stock bajo'?'warning':''}>{status}</em></button>})}
    </div>
    <aside className="exo-inventory-detail">{selected?<><div className="exo-detail-top"><span>FICHA DE INVENTARIO</span><span className="exo-stock-badge">{available(selected)} DISPONIBLES</span></div><div className="exo-sku-big">{selected.sku}</div><h2>{selected.product}</h2><div className="exo-presentation">{selected.presentation}</div><div className="exo-inventory-grid"><div><span>STOCK FÍSICO</span><strong>{selected.stock.toLocaleString('es-BO')} u.</strong></div><div><span>RESERVADO</span><strong>{selected.reserved.toLocaleString('es-BO')} u.</strong></div><div><span>DISPONIBLE</span><strong>{available(selected).toLocaleString('es-BO')} u.</strong></div><div><span>MÍNIMO</span><strong>{LOW} u.</strong></div></div>{available(selected)<=LOW&&<div className="exo-inventory-alert"><AlertTriangle size={18}/><div><strong>{available(selected)===0?'Sin stock disponible':'Stock bajo'}</strong><p>{available(selected)===0?'Este SKU no puede atender nuevos pedidos sin reposición.':'La existencia disponible está por debajo del nivel mínimo configurado.'}</p></div></div>}<div className="exo-detail-note"><strong>Regla de inventario</strong><p>Disponible = stock físico − reservado. El SKU identifica la presentación; los lotes se utilizarán en la trazabilidad de entradas y salidas.</p></div><div className="exo-detail-actions"><button className="exo-inventory-btn primary" onClick={()=>{setEditing(selected);setModal(true)}}><Edit3 size={15}/> Ajustar stock</button></div></>:<div>Selecciona un SKU.</div>}</aside>
   </section>
  </main><footer className="exo-inventory-footer"><span>EXO CLEAN · Inventario</span><span>Ghost Web & Software Designer · Medunz Corp.</span></footer>
  {modal&&<InventoryModal initial={editing} onClose={()=>setModal(false)} onSave={save}/>}
 </div>
}

function InventoryModal({initial,onClose,onSave}){
 const [stock,setStock]=React.useState(initial?.stock||0),[reserved,setReserved]=React.useState(initial?.reserved||0);
 const save=e=>{e.preventDefault();const physical=Math.max(0,Number(stock)||0),reserve=Math.min(physical,Math.max(0,Number(reserved)||0));onSave({...initial,stock:physical,reserved:reserve})};
 return <div className="exo-inventory-modal-bg" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><form className="exo-inventory-modal" onSubmit={save}><div className="exo-modal-head"><div><span>CONTROL DE EXISTENCIAS</span><h2>Ajustar stock</h2></div><button type="button" onClick={onClose}>×</button></div><div className="exo-modal-product"><b>{initial?.sku}</b><span>{initial?.product} · {initial?.presentation}</span></div><label>Stock físico<input type="number" min="0" value={stock} onChange={e=>setStock(e.target.value)}/></label><label>Stock reservado<input type="number" min="0" max={stock} value={reserved} onChange={e=>setReserved(e.target.value)}/></label><div className="exo-modal-available">Disponible <strong>{Math.max(0,(Number(stock)||0)-(Number(reserved)||0)).toLocaleString('es-BO')} u.</strong></div><div className="exo-modal-foot"><button type="button" className="exo-inventory-btn light" onClick={onClose}>Cancelar</button><button className="exo-inventory-btn primary">Guardar ajuste</button></div></form></div>
}
