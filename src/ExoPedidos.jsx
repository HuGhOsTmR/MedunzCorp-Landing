import React from 'react';
import { ArrowLeft, ChevronRight, Edit3, Plus, Search, ShoppingCart, Trash2, UserRound } from 'lucide-react';
import './exo-pedidos.css';

const PRICES = {
  'EXO-VAJ-001':13,'EXO-VAJ-003':30.5,'EXO-VAJ-010':101,
  'EXO-LPI-001':11,'EXO-LPI-003':25.5,'EXO-LPI-010':81,
  'EXO-SHA-500':11.5,'EXO-SHA-001':20.5,'EXO-SHA-003':55.5,'EXO-SHA-010':176,
  'EXO-SGR-001':18,'EXO-SGR-003':40.5,'EXO-SGR-010':126,
  'EXO-LVR-003':45.5,'EXO-LVR-005':75.5,'EXO-LVR-010':151,
  'EXO-JLI-001':13,'EXO-JLI-003':30.5,'EXO-JLI-010':101,
  'EXO-CWS-500':11.5,'EXO-CWS-001':20.5,'EXO-CWS-003':55.5,'EXO-CWS-010':176
};
const CATALOG = [
 ['VAJ','Vajillero',['1 L','3 L','10 L']],['LPI','Limpia Piso',['1 L','3 L','10 L']],
 ['SHA','Shampoo',['500 ml','1 L','3 L','10 L']],['SGR','Saca Grasa',['1 L','3 L','10 L']],
 ['LVR','Lava Ropa',['3 L','5 L','10 L']],['JLI','Jabón Líquido',['1 L','3 L','10 L']],
 ['CWS','Car Wash',['500 ml','1 L','3 L','10 L']]
];
const SKU=(code,size)=>`EXO-${code}-${size==='500 ml'?'500':size.replace(' L','').padStart(3,'0')}`;
const STATUS=['Borrador','Confirmado','Preparando','Listo para entrega','En entrega','Entregado','Cancelado','Rechazado'];
const KEY='exo_orders_v1';
const CUSTOMER_KEY='exo_customers_v1';
const CUSTOMER_SEED=[
{id:'EXO-CLI-0001',type:'Empresa',name:'Distribuidora Norte',nit:'10293847',phone:'70000001',email:'ventas@distribuidoranorte.bo',address:'Cochabamba',status:'Activo'},
{id:'EXO-CLI-0002',type:'Empresa',name:'Limpieza Hogar',nit:'20394857',phone:'70000002',email:'contacto@limpiezahogar.bo',address:'Quillacollo',status:'Activo'},
{id:'EXO-CLI-0003',type:'Empresa',name:'Comercial Andina',nit:'30495867',phone:'70000003',email:'compras@comercialandina.bo',address:'Sacaba',status:'Activo'}
];
function loadCustomers(){try{const x=JSON.parse(localStorage.getItem(CUSTOMER_KEY));if(Array.isArray(x)&&x.length)return x}catch{}return CUSTOMER_SEED}
function normalizeOrders(items,customers){return items.map(o=>{if(o.customerId)return o;const c=customers.find(x=>x.name.toLowerCase()===String(o.customer||'').toLowerCase()||x.phone===o.phone);return c?{...o,customerId:c.id,customerName:c.name,customerNit:c.nit,customerPhone:c.phone,customerAddress:c.address}:{...o}})}

const seed=[
 {id:'EXO-PED-0001',date:'2026-10-05',customer:'Distribuidora Norte',phone:'70000001',status:'Confirmado',discount:0,lines:[{sku:'EXO-SHA-001',product:'Shampoo',presentation:'1 L',qty:12,price:20.5}]},
 {id:'EXO-PED-0002',date:'2026-10-06',customer:'Limpieza Hogar',phone:'70000002',status:'En entrega',discount:10,lines:[{sku:'EXO-VAJ-003',product:'Vajillero',presentation:'3 L',qty:8,price:30.5}]},
 {id:'EXO-PED-0003',date:'2026-10-07',customer:'Comercial Andina',phone:'70000003',status:'Borrador',discount:0,lines:[{sku:'EXO-CWS-010',product:'Car Wash',presentation:'10 L',qty:4,price:176}]}
];

function load(customers=loadCustomers()){try{const x=JSON.parse(localStorage.getItem(KEY));if(Array.isArray(x)&&x.length)return normalizeOrders(x,customers)}catch{}return normalizeOrders(seed,customers)}
function money(n){return `Bs ${Number(n||0).toFixed(2)}`}
function total(o){return o.lines.reduce((s,l)=>s+l.qty*l.price,0)-Number(o.discount||0)}

export default function ExoPedidos(){
 const customers=React.useMemo(()=>loadCustomers(),[]);
 const initialOrders=React.useMemo(()=>load(customers),[customers]);
 const [orders,setOrders]=React.useState(initialOrders),[selectedId,setSelectedId]=React.useState(initialOrders[0]?.id),[q,setQ]=React.useState(''),[filter,setFilter]=React.useState('Todos'),[modal,setModal]=React.useState(false),[editing,setEditing]=React.useState(null);
 React.useEffect(()=>{localStorage.setItem(KEY,JSON.stringify(orders));document.title='EXO · Pedidos | Ghost W&SD'},[orders]);
 const filtered=orders.filter(o=>(filter==='Todos'||o.status===filter)&&(!q.trim()||[o.id,o.customer,o.phone,o.status].join(' ').toLowerCase().includes(q.toLowerCase())));
 const selected=orders.find(o=>o.id===selectedId)||filtered[0];
 const save=o=>{setOrders(x=>x.some(a=>a.id===o.id)?x.map(a=>a.id===o.id?o:a):[o,...x]);setSelectedId(o.id);setModal(false);setEditing(null)};
 const del=id=>{if(confirm('¿Eliminar este pedido?')){setOrders(x=>x.filter(o=>o.id!==id));setSelectedId('')}};
 const counts=STATUS.reduce((a,s)=>(a[s]=orders.filter(o=>o.status===s).length,a),{});
 return <div className="exo-orders">
  <header className="exo-orders-header"><a href="https://ghost.medunzcorp.com"><img src="/ghost-logo.svg" alt="Ghost Web & Software Designer"/></a><div><span>GHOST W&amp;SD</span><strong>EXO / PEDIDOS</strong></div><a className="exo-orders-back" href="https://ghost.medunzcorp.com/exo/presentaciones"><ArrowLeft size={15}/> Presentaciones</a></header>
  <main className="exo-orders-main">
   <section className="exo-orders-hero"><div><span className="exo-kicker">EXO · VENTAS Y CONTROL</span><h1>Pedidos.<br/><em>De la solicitud a la entrega.</em></h1><p>Registra, confirma y controla cada pedido comercial. El precio aplicado pertenece al pedido, mientras el SKU permanece estable como identificador de la presentación.</p></div><div className="exo-orders-mark"><ShoppingCart size={38}/><span>{orders.length}<br/>PEDIDOS</span></div></section>
   <section className="exo-order-stats">{[['Nuevos','Borrador'],['Confirmados','Confirmado'],['En preparación','Preparando'],['En entrega','En entrega'],['Entregados','Entregado']].map(([label,s])=><div key={s}><strong>{counts[s]||0}</strong><span>{label}</span></div>)}</section>
   <section className="exo-orders-toolbar"><div className="exo-orders-search"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar pedido, cliente o teléfono..."/></div><select value={filter} onChange={e=>setFilter(e.target.value)}><option>Todos</option>{STATUS.map(s=><option key={s}>{s}</option>)}</select><button className="exo-orders-button primary" onClick={()=>{setEditing(null);setModal(true)}}><Plus size={16}/> Nuevo pedido</button></section>
   <section className="exo-orders-layout"><div className="exo-orders-list"><div className="exo-list-head"><div><span>PEDIDOS REGISTRADOS</span><h2>{filtered.length} registros</h2></div><ShoppingCart size={20}/></div>{filtered.map(o=><button key={o.id} className={selected?.id===o.id?'exo-order-row active':'exo-order-row'} onClick={()=>setSelectedId(o.id)}><span><b>{o.id}</b><small>{o.date} · {o.customer}</small></span><strong>{money(total(o))}</strong><span className="exo-status">{o.status}</span><ChevronRight size={17}/></button>)}</div>
   <aside className="exo-order-detail">{selected?<><div className="exo-detail-top"><span>FICHA DE PEDIDO</span><span className="exo-status large">{selected.status}</span></div><div className="exo-order-id">{selected.id}</div><div className="exo-customer"><UserRound size={20}/><div><strong>{selected.customer}</strong><span>{selected.phone||'Sin teléfono'}</span></div></div><div className="exo-lines"><div className="exo-lines-head"><span>DETALLE</span><span>IMPORTE</span></div>{selected.lines.map((l,i)=><div className="exo-line" key={i}><div><b>{l.product}</b><span>{l.presentation} · {l.sku} · {l.qty} un.</span></div><strong>{money(l.qty*l.price)}</strong></div>)}</div><div className="exo-total"><span>Total</span><strong>{money(total(selected))}</strong></div><div className="exo-detail-actions"><button className="exo-orders-button primary" onClick={()=>{setEditing(selected);setModal(true)}}><Edit3 size={15}/> Editar</button><button className="exo-danger" onClick={()=>del(selected.id)}><Trash2 size={15}/> Eliminar</button></div></>:<div className="exo-empty">Selecciona un pedido.</div>}</aside></section>
  </main>
  {modal&&<OrderModal initial={editing} customers={customers} onClose={()=>setModal(false)} onSave={save}/>}
  <footer className="exo-orders-footer"><span>EXO · Pedidos</span><span>Ghost Web &amp; Software Designer · Medunz Corp.</span></footer>
 </div>
}

function OrderModal({initial,customers,onClose,onSave}){
 const initialCustomerId=initial?.customerId||customers.find(c=>c.name.toLowerCase()===String(initial?.customer||'').toLowerCase()||c.phone===initial?.phone)?.id||'';
 const [customerId,setCustomerId]=React.useState(initialCustomerId),[status,setStatus]=React.useState(initial?.status||'Borrador'),[discount,setDiscount]=React.useState(initial?.discount||0),[lines,setLines]=React.useState(initial?.lines||[{product:'Shampoo',presentation:'1 L',sku:'EXO-SHA-001',qty:1,price:20.5}]);
 const customer=customers.find(c=>c.id===customerId);
 const updateLine=(i,key,value)=>setLines(a=>a.map((x,n)=>n===i?{...x,[key]:value}:x));
 const choose=(i,val)=>{const [code,size]=val.split('|');const cat=CATALOG.find(x=>x[0]===code);const sku=SKU(code,size);updateLine(i,'product',cat[1]);updateLine(i,'presentation',size);updateLine(i,'sku',sku);updateLine(i,'price',PRICES[sku]||0)};
 const add=()=>setLines(a=>[...a,{product:'Vajillero',presentation:'1 L',sku:'EXO-VAJ-001',qty:1,price:13}]);
 const save=e=>{e.preventDefault();if(!customer||!lines.length)return;const id=initial?.id||`EXO-PED-${String(Date.now()).slice(-6)}`;onSave({id,date:initial?.date||new Date().toISOString().slice(0,10),customerId:customer.id,customerName:customer.name,customerNit:customer.nit,customerPhone:customer.phone,customerAddress:customer.address,customer:customer.name,phone:customer.phone,status,discount:Number(discount)||0,lines:lines.map(l=>({...l,qty:Number(l.qty)||1,price:Number(l.price)||0}))})};
 return <div className="exo-modal-backdrop"><form className="exo-order-modal" onSubmit={save}><div className="exo-modal-head"><div><span>NUEVO PEDIDO</span><h2>{initial?'Editar pedido':'Registrar pedido'}</h2></div><button type="button" onClick={onClose}>×</button></div><div className="exo-form-grid"><label>Cliente / razón social<select value={customerId} onChange={e=>setCustomerId(e.target.value)} required><option value="">Seleccionar cliente...</option>{customers.filter(c=>c.status==="Activo"||c.id===customerId).map(c=><option key={c.id} value={c.id}>{c.name} · {c.nit||"Sin NIT"}</option>)}</select></label><label>Teléfono<input value={customer?.phone||""} readOnly placeholder="Se obtiene del cliente"/></label><label>Estado<select value={status} onChange={e=>setStatus(e.target.value)}>{STATUS.map(s=><option key={s}>{s}</option>)}</select></label><label>Descuento (Bs)<input type="number" min="0" step=".01" value={discount} onChange={e=>setDiscount(e.target.value)}/></label></div><div className="exo-form-lines"><div className="exo-form-lines-head"><span>PRODUCTOS</span><button type="button" onClick={add}><Plus size={14}/> Añadir línea</button></div>{lines.map((l,i)=><div className="exo-form-line" key={i}><select value={`${l.sku.replace(/^EXO-/,'').split('-')[0]}|${l.presentation}`} onChange={e=>choose(i,e.target.value)}>{CATALOG.flatMap(x=>x[2].map(size=><option key={x[0]+size} value={`${x[0]}|${size}`}>{x[1]} · {size}</option>))}</select><input type="number" min="1" value={l.qty} onChange={e=>updateLine(i,'qty',e.target.value)} /><span>{money(l.price)}</span><button type="button" onClick={()=>setLines(a=>a.filter((_,n)=>n!==i))} disabled={lines.length===1}>×</button></div>)}</div><div className="exo-modal-total">Total estimado <strong>{money(lines.reduce((s,l)=>s+(Number(l.qty)||0)*(Number(l.price)||0),0)-(Number(discount)||0))}</strong></div><div className="exo-modal-foot"><button type="button" className="exo-orders-button light" onClick={onClose}>Cancelar</button><button className="exo-orders-button primary">Guardar pedido</button></div></form></div>
}
