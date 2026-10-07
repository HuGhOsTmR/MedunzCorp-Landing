import React from 'react';
import GhostLogo from './assets/ghost-navbar-logo.svg';
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
const INVENTORY_KEY='exo_inventory_v1';
const MOVEMENTS_KEY='exo_movements_v1';
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
const INVENTORY_SEED=CATALOG.map((x,i)=>({...{sku:SKU(x[0],x[2][0]),code:x[0],product:x[1],presentation:x[2][0]},stock:0,reserved:0}));
function readArray(key,fallback=[]){try{const x=JSON.parse(localStorage.getItem(key));return Array.isArray(x)?x:fallback}catch{return fallback}}
function applyOrderInventory(previous,next,inventory,movements){
 const oldRes=previous?.reservationLines||[];
 const wasReserved=Boolean(previous?.reservationApplied&&oldRes.length);
 const willReserve=next.status==='Confirmado';
 const willRelease=['Borrador','Cancelado','Rechazado'].includes(next.status);
 const willDeliver=next.status==='Entregado';
 if(['Preparando','Listo para entrega','En entrega','Entregado'].includes(next.status)&&!wasReserved&&!willReserve)throw new Error('El pedido debe pasar por Confirmado para reservar stock antes de avanzar a preparación o entrega.');
 if(!wasReserved&&!willReserve&&!willDeliver)return {inventory,movements,order:next};
 let nextInv=inventory.map(x=>({...x}));
 const newMov=[...movements];
 const addMovement=(type,line,qty,ref,updated)=>newMov.unshift({id:`MOV-${Date.now()}-${newMov.length}`,date:new Date().toISOString(),type,sku:line.sku,product:line.product,presentation:line.presentation,lot:'',quantity:qty,reference:ref,balanceStock:updated.stock,balanceReserved:updated.reserved,orderId:next.id});
 const restoreReservations=()=>{oldRes.forEach(line=>{const item=nextInv.find(x=>x.sku===line.sku);if(item){item.reserved=Math.max(0,item.reserved-line.qty);addMovement('Liberación',line,line.qty,`Pedido ${next.id} · liberación`,item)}})};
 if(wasReserved&&(willRelease||willDeliver||willReserve)){restoreReservations();}
 if(willDeliver){for(const line of oldRes){const item=nextInv.find(x=>x.sku===line.sku);if(!item||item.stock<line.qty){throw new Error(`No hay stock físico suficiente para entregar ${line.product} · ${line.presentation}.`)}item.stock-=line.qty;addMovement('Salida',line,line.qty,`Pedido ${next.id} · entrega`,item)}return {inventory:nextInv,movements:newMov,order:{...next,reservationApplied:false,reservationLines:[]}};}
 if(willReserve){const requested=next.lines.map(l=>({...l,qty:Number(l.qty)||0})).filter(l=>l.qty>0);const totals=requested.reduce((a,l)=>(a[l.sku]=(a[l.sku]||0)+l.qty,a),{});const missing=Object.entries(totals).map(([sku,qty])=>{const item=nextInv.find(x=>x.sku===sku);const available=Math.max(0,(item?.stock||0)-(item?.reserved||0));return {sku,qty,available}}).filter(l=>l.qty>l.available);if(missing.length){const msg=missing.map(l=>`${l.sku}: necesita ${l.qty}, disponible ${l.available}`).join('\\n');throw new Error(`No hay stock suficiente para confirmar el pedido:\\n${msg}`)}requested.forEach(line=>{const item=nextInv.find(x=>x.sku===line.sku);item.reserved+=line.qty;addMovement('Reserva',line,line.qty,`Pedido ${next.id} · reserva`,item)});return {inventory:nextInv,movements:newMov,order:{...next,reservationApplied:true,reservationLines:requested.map(l=>({sku:l.sku,product:l.product,presentation:l.presentation,qty:l.qty}))}};}
 return {inventory:nextInv,movements:newMov,order:{...next,reservationApplied:false,reservationLines:[]}};
}

export default function ExoPedidos(){
 const customers=React.useMemo(()=>loadCustomers(),[]);
 const initialOrders=React.useMemo(()=>load(customers),[customers]);
 const [orders,setOrders]=React.useState(initialOrders),[selectedId,setSelectedId]=React.useState(initialOrders[0]?.id),[q,setQ]=React.useState(''),[filter,setFilter]=React.useState('Todos'),[modal,setModal]=React.useState(false),[editing,setEditing]=React.useState(null),[inventory,setInventory]=React.useState(()=>readArray(INVENTORY_KEY, CATALOG.flatMap(([code,product,sizes])=>sizes.map(size=>({sku:SKU(code,size),code,product,presentation:size,stock:0,reserved:0})))));
 const [movements,setMovements]=React.useState(()=>readArray(MOVEMENTS_KEY));
 React.useEffect(()=>{localStorage.setItem(KEY,JSON.stringify(orders));document.title='EXO · Pedidos | Ghost W&SD'},[orders]);
 React.useEffect(()=>{localStorage.setItem(INVENTORY_KEY,JSON.stringify(inventory))},[inventory]);
 React.useEffect(()=>{localStorage.setItem(MOVEMENTS_KEY,JSON.stringify(movements))},[movements]);
 const filtered=orders.filter(o=>(filter==='Todos'||o.status===filter)&&(!q.trim()||[o.id,o.customer,o.phone,o.status].join(' ').toLowerCase().includes(q.toLowerCase())));
 const selected=orders.find(o=>o.id===selectedId)||filtered[0];
 const save=o=>{try{const previous=orders.find(a=>a.id===o.id);const result=applyOrderInventory(previous,o,inventory,movements);setInventory(result.inventory);setMovements(result.movements);setOrders(x=>x.some(a=>a.id===result.order.id)?x.map(a=>a.id===result.order.id?result.order:a):[result.order,...x]);setSelectedId(result.order.id);setModal(false);setEditing(null)}catch(error){alert(error.message)}};
 const del=id=>{if(!confirm('¿Eliminar este pedido?'))return;const order=orders.find(o=>o.id===id);if(order?.reservationApplied){try{const result=applyOrderInventory(order,{...order,status:'Cancelado'},inventory,movements);setInventory(result.inventory);setMovements(result.movements)}catch(error){alert(error.message);return}}setOrders(x=>x.filter(o=>o.id!==id));setSelectedId('')};
 const counts=STATUS.reduce((a,s)=>(a[s]=orders.filter(o=>o.status===s).length,a),{});
 return <div className="exo-orders">
  <header className="exo-orders-header"><a href="https://ghost.medunzcorp.com"><img src={GhostLogo} alt="Ghost Web & Software Designer"/></a><div><span>GHOST W&amp;SD</span><strong>EXO / PEDIDOS</strong></div><a className="exo-orders-back" href="https://ghost.medunzcorp.com/exo/presentaciones"><ArrowLeft size={15}/> Presentaciones</a></header>
  <main className="exo-orders-main">
   <section className="exo-orders-hero"><div><span className="exo-kicker">EXO · VENTAS Y CONTROL</span><h1>Pedidos.<br/><em>De la solicitud a la entrega.</em></h1><p>Registra, confirma y controla cada pedido comercial. El precio aplicado pertenece al pedido, mientras el SKU permanece estable como identificador de la presentación.</p></div><div className="exo-orders-mark"><ShoppingCart size={38}/><span>{orders.length}<br/>PEDIDOS</span></div></section>
   <section className="exo-order-stats">{[['Nuevos','Borrador'],['Confirmados','Confirmado'],['En preparación','Preparando'],['En entrega','En entrega'],['Entregados','Entregado']].map(([label,s])=><div key={s}><strong>{counts[s]||0}</strong><span>{label}</span></div>)}</section>
   <section className="exo-orders-toolbar"><div className="exo-orders-search"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar pedido, cliente o teléfono..."/></div><select value={filter} onChange={e=>setFilter(e.target.value)}><option>Todos</option>{STATUS.map(s=><option key={s}>{s}</option>)}</select><button className="exo-orders-button primary" onClick={()=>{setEditing(null);setModal(true)}}><Plus size={16}/> Nuevo pedido</button></section>
   <section className="exo-orders-layout"><div className="exo-orders-list"><div className="exo-list-head"><div><span>PEDIDOS REGISTRADOS</span><h2>{filtered.length} registros</h2></div><ShoppingCart size={20}/></div>{filtered.map(o=><button key={o.id} className={selected?.id===o.id?'exo-order-row active':'exo-order-row'} onClick={()=>setSelectedId(o.id)}><span><b>{o.id}</b><small>{o.date} · {o.customer}</small></span><strong>{money(total(o))}</strong><span className="exo-status">{o.status}</span><ChevronRight size={17}/></button>)}</div>
   <aside className="exo-order-detail">{selected?<><div className="exo-detail-top"><span>FICHA DE PEDIDO</span><span className="exo-status large">{selected.status}</span></div><div className="exo-order-id">{selected.id}</div><div className="exo-customer"><UserRound size={20}/><div><strong>{selected.customer}</strong><span>{selected.phone||'Sin teléfono'}</span></div></div><div className="exo-lines"><div className="exo-lines-head"><span>DETALLE</span><span>IMPORTE</span></div>{selected.lines.map((l,i)=><div className="exo-line" key={i}><div><b>{l.product}</b><span>{l.presentation} · {l.sku} · {l.qty} un.</span></div><strong>{money(l.qty*l.price)}</strong></div>)}</div><div className="exo-total"><span>Total</span><strong>{money(total(selected))}</strong></div><div className="exo-detail-actions"><button className="exo-orders-button primary" onClick={()=>{setEditing(selected);setModal(true)}}><Edit3 size={15}/> Editar</button><button className="exo-danger" onClick={()=>del(selected.id)}><Trash2 size={15}/> Eliminar</button></div></>:<div className="exo-empty">Selecciona un pedido.</div>}</aside></section>
  </main>
  {modal&&<OrderModal initial={editing} customers={customers} inventory={inventory} onClose={()=>setModal(false)} onSave={save}/>}
  <footer className="exo-orders-footer"><span>EXO · Pedidos</span><span>Ghost Web &amp; Software Designer · Medunz Corp.</span></footer>
 </div>
}

function CustomerAutocomplete({customers,value,onChange}){
 const [query,setQuery]=React.useState('');
 const [open,setOpen]=React.useState(false);
 const ref=React.useRef(null);
 const selected=customers.find(c=>c.id===value);
 React.useEffect(()=>{if(selected)setQuery(selected.name)},[selected]);
 React.useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false)};document.addEventListener('mousedown',h);return()=>document.removeEventListener('mousedown',h)},[]);
 const results=customers.filter(c=>c.status==="Activo"&&(query.trim()===""||[c.id,c.name,c.nit,c.phone,c.email,c.address].join(' ').toLowerCase().includes(query.toLowerCase()))).slice(0,8);
 return <label className="exo-customer-autocomplete">Cliente / razón social
  <div className="exo-autocomplete-wrap" ref={ref}><Search size={16}/>
   <input value={query} onChange={e=>{setQuery(e.target.value);onChange('');setOpen(true)}} onFocus={()=>setOpen(true)} placeholder="Buscar por nombre, NIT o teléfono..." autoComplete="off" required={!value}/>
   {open&&(query.trim()||!selected)&&<div className="exo-autocomplete-menu">{results.length?results.map(c=><button type="button" key={c.id} onClick={()=>{onChange(c.id);setQuery(c.name);setOpen(false)}}><strong>{c.name}</strong><span>{c.nit?'NIT: '+c.nit:'Sin NIT'} · {c.phone||'Sin teléfono'}</span></button>):<div className="exo-autocomplete-empty">No se encontraron clientes.</div>}</div>}
  </div>
 </label>
}

function OrderModal({initial,customers,onClose,onSave}){
 const initialCustomerId=initial?.customerId||customers.find(c=>c.name.toLowerCase()===String(initial?.customer||'').toLowerCase()||c.phone===initial?.phone)?.id||'';
 const [customerId,setCustomerId]=React.useState(initialCustomerId),[status,setStatus]=React.useState(initial?.status||'Borrador'),[discount,setDiscount]=React.useState(initial?.discount||0),[lines,setLines]=React.useState(initial?.lines||[{product:'Shampoo',presentation:'1 L',sku:'EXO-SHA-001',qty:1,price:20.5}]);
 const customer=customers.find(c=>c.id===customerId);
 const updateLine=(i,key,value)=>setLines(a=>a.map((x,n)=>n===i?{...x,[key]:value}:x));
 const choose=(i,val)=>{const [code,size]=val.split('|');const cat=CATALOG.find(x=>x[0]===code);const sku=SKU(code,size);updateLine(i,'product',cat[1]);updateLine(i,'presentation',size);updateLine(i,'sku',sku);updateLine(i,'price',PRICES[sku]||0)};
 const add=()=>setLines(a=>[...a,{product:'Vajillero',presentation:'1 L',sku:'EXO-VAJ-001',qty:1,price:13}]);
 const save=e=>{e.preventDefault();if(!customer||!lines.length)return;const id=initial?.id||`EXO-PED-${String(Date.now()).slice(-6)}`;onSave({id,date:initial?.date||new Date().toISOString().slice(0,10),customerId:customer.id,customerName:customer.name,customerNit:customer.nit,customerPhone:customer.phone,customerAddress:customer.address,customer:customer.name,phone:customer.phone,status,discount:Number(discount)||0,lines:lines.map(l=>({...l,qty:Number(l.qty)||1,price:Number(l.price)||0}))})};
 return <div className="exo-modal-backdrop"><form className="exo-order-modal" onSubmit={save}><div className="exo-modal-head"><div><span>NUEVO PEDIDO</span><h2>{initial?'Editar pedido':'Registrar pedido'}</h2></div><button type="button" onClick={onClose}>×</button></div><div className="exo-form-grid"><CustomerAutocomplete customers={customers} value={customerId} onChange={setCustomerId} /><label>Teléfono<input value={customer?.phone||""} readOnly placeholder="Se obtiene del cliente"/></label><label>Estado<select value={status} onChange={e=>setStatus(e.target.value)}>{STATUS.map(s=><option key={s}>{s}</option>)}</select></label><label>Descuento (Bs)<input type="number" min="0" step=".01" value={discount} onChange={e=>setDiscount(e.target.value)}/></label></div><div className="exo-form-lines"><div className="exo-form-lines-head"><span>PRODUCTOS</span><button type="button" onClick={add}><Plus size={14}/> Añadir línea</button></div>{lines.map((l,i)=><div className="exo-form-line" key={i}><select value={`${l.sku.replace(/^EXO-/,'').split('-')[0]}|${l.presentation}`} onChange={e=>choose(i,e.target.value)}>{CATALOG.flatMap(x=>x[2].map(size=><option key={x[0]+size} value={`${x[0]}|${size}`}>{x[1]} · {size}</option>))}</select><input type="number" min="1" value={l.qty} onChange={e=>updateLine(i,'qty',e.target.value)} /><span>{money(l.price)}</span><button type="button" onClick={()=>setLines(a=>a.filter((_,n)=>n!==i))} disabled={lines.length===1}>×</button></div>)}</div><div className="exo-modal-total">Total estimado <strong>{money(lines.reduce((s,l)=>s+(Number(l.qty)||0)*(Number(l.price)||0),0)-(Number(discount)||0))}</strong></div><div className="exo-modal-foot"><button type="button" className="exo-orders-button light" onClick={onClose}>Cancelar</button><button className="exo-orders-button primary">Guardar pedido</button></div></form></div>
}
