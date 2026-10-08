import React from 'react';
import GhostLogo from './assets/ghost-navbar-logo.svg';
import { ArrowLeft, ArrowDownToLine, ArrowUpFromLine, RefreshCw, Lock, Unlock, Plus, Search, Package, CalendarDays } from 'lucide-react';
import { LOT_INV_KEY, ensureLotInventory, availableLot } from './exo-lot-utils';
import './exo-movimientos.css';

const INVENTORY_KEY='exo_inventory_v1';
const LOTS_KEY='exo_lots_v1';
const MOVEMENTS_KEY='exo_movements_v1';

const PRODUCTS=[
 ['VAJ','Vajillero',['1 L','3 L','10 L']],['LPI','Limpia Piso',['1 L','3 L','10 L']],
 ['SHA','Shampoo',['500 ml','1 L','3 L','10 L']],['SGR','Saca Grasa',['1 L','3 L','10 L']],
 ['LVR','Lava Ropa',['3 L','5 L','10 L']],['JLI','Jabón Líquido',['1 L','3 L','10 L']],
 ['CWS','Car Wash',['500 ml','1 L','3 L','10 L']]
];
const catalog=PRODUCTS.flatMap(([code,product,sizes])=>sizes.map(size=>({sku:`EXO-${code}-${size==='500 ml'?'500':size.replace(' L','').padStart(3,'0')}`,code,product,presentation:size})));
const SEED_INVENTORY=catalog.map((x,i)=>({...x,stock:i===3?500:[18,65,120,42,80,35,12,55,90,25,40,15,70,32,110,28,45,18,60,24,75,16,50][i],reserved:i===3?24:([2,5,8].includes(i)?8:0)}));
const SEED_LOTS=[
 {id:'EXO-2026-001',lot:'EXO-2026-001',productCode:'SHA',product:'Shampoo',size:'1 L',sku:'EXO-SHA-001',manufactured:'2026-10-01',expires:'2028-10-01',quantity:500,status:'Liberado'},
 {id:'EXO-2026-002',lot:'EXO-2026-002',productCode:'VAJ',product:'Vajillero',size:'1 L',sku:'EXO-VAJ-001',manufactured:'2026-10-03',expires:'2028-10-03',quantity:350,status:'En producción'},
 {id:'EXO-2026-003',lot:'EXO-2026-003',productCode:'LVR',product:'Lava Ropa',size:'3 L',sku:'EXO-LVR-003',manufactured:'2026-10-05',expires:'2028-10-05',quantity:250,status:'En cuarentena'},
 {id:'EXO-2026-004',lot:'EXO-2026-004',productCode:'CWS',product:'Car Wash',size:'500 ml',sku:'EXO-CWS-500',manufactured:'2026-10-06',expires:'2028-10-06',quantity:420,status:'Planificado'}
];
const TYPES=[
 {id:'Entrada',label:'Entrada',icon:ArrowDownToLine,delta:'physical',sign:1},
 {id:'Salida',label:'Salida',icon:ArrowUpFromLine,delta:'physical',sign:-1},
 {id:'Ajuste',label:'Ajuste',icon:RefreshCw,delta:'adjustment',sign:1},
 {id:'Reserva',label:'Reserva',icon:Lock,delta:'reserved',sign:1},
 {id:'Liberación',label:'Liberación',icon:Unlock,delta:'reserved',sign:-1}
];
const read=(key,fallback)=>{try{const x=JSON.parse(localStorage.getItem(key));return Array.isArray(x)&&x.length?x:fallback}catch{return fallback}};
const fmtDate=d=>new Intl.DateTimeFormat('es-BO',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(d));
const initialMovements=[];

export default function ExoMovimientos(){
 const [inventory,setInventory]=React.useState(()=>read(INVENTORY_KEY,SEED_INVENTORY));
 const [lots]=React.useState(()=>read(LOTS_KEY,SEED_LOTS));
 const [lotInventory,setLotInventory]=React.useState(()=>ensureLotInventory(lots,read(LOT_INV_KEY,[])));
 const [movements,setMovements]=React.useState(()=>read(MOVEMENTS_KEY,initialMovements));
 const [query,setQuery]=React.useState('');
 const [filter,setFilter]=React.useState('Todos');
 const [modal,setModal]=React.useState(false);
 React.useEffect(()=>{localStorage.setItem(INVENTORY_KEY,JSON.stringify(inventory))},[inventory]);
 React.useEffect(()=>{localStorage.setItem(MOVEMENTS_KEY,JSON.stringify(movements));document.title='EXO · Movimientos de inventario'},[movements]);
 React.useEffect(()=>{localStorage.setItem(LOT_INV_KEY,JSON.stringify(lotInventory))},[lotInventory]);
 const filtered=movements.filter(m=>{const q=query.toLowerCase().trim();return (filter==='Todos'||m.type===filter)&&(!q||[m.id,m.type,m.sku,m.product,m.presentation,m.lot,m.reference].join(' ').toLowerCase().includes(q))}).sort((a,b)=>new Date(b.date)-new Date(a.date));
 const totalIn=movements.filter(x=>x.type==='Entrada').reduce((s,x)=>s+x.quantity,0);
 const totalOut=movements.filter(x=>x.type==='Salida').reduce((s,x)=>s+x.quantity,0);
 const totalRes=movements.filter(x=>x.type==='Reserva').reduce((s,x)=>s+x.quantity,0);
 const saveMovement=m=>{
   setInventory(current=>current.map(item=>item.sku===m.sku?m.updatedItem:item));
   if(m.updatedLotItem){setLotInventory(current=>current.map(item=>(item.lotId||item.id)===m.updatedLotItem.lotId?m.updatedLotItem:item));}
   setMovements(current=>[{...m,id:`MOV-${String(current.length+1).padStart(6,'0')}`,date:new Date().toISOString()},...current]);
   setModal(false);
 };
 return <div className="exo-movements">
  <header className="exo-movements-header"><a href="https://ghost.medunzcorp.com"><img src={GhostLogo} alt="Ghost Web & Software Designer"/></a><div><span>EXO CLEAN</span><strong>MOVIMIENTOS DE INVENTARIO</strong></div><a className="exo-movements-back" href="https://ghost.medunzcorp.com/exo/inventario"><ArrowLeft size={15}/> Inventario</a></header>
  <ExoNav active="movimientos" />
      <main className="exo-movements-main">
   <section className="exo-movements-hero"><div><span className="exo-kicker">EXO CLEAN · KARDEX</span><h1>Movimientos.<br/><em>Todo lo que entra y sale.</em></h1><p>Registra entradas, salidas, ajustes y reservas para mantener una trazabilidad clara de las existencias.</p></div><div className="exo-movements-mark"><Package size={34}/><strong>{movements.length}</strong><span>MOVIMIENTOS</span></div></section>
   <section className="exo-movement-stats"><div><span>ENTRADAS</span><strong>{totalIn.toLocaleString('es-BO')}</strong><small>unidades registradas</small></div><div><span>SALIDAS</span><strong>{totalOut.toLocaleString('es-BO')}</strong><small>unidades registradas</small></div><div><span>RESERVAS</span><strong>{totalRes.toLocaleString('es-BO')}</strong><small>unidades acumuladas</small></div><div><span>REGISTROS</span><strong>{movements.length}</strong><small>movimientos</small></div></section>
   <section className="exo-movements-toolbar"><div className="exo-movements-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar movimiento, SKU, lote, pedido..."/></div><select value={filter} onChange={e=>setFilter(e.target.value)}><option>Todos</option>{TYPES.map(t=><option key={t.id}>{t.label}</option>)}</select><button className="exo-movement-btn primary" onClick={()=>setModal(true)}><Plus size={16}/> Nuevo movimiento</button></section>
   <section className="exo-movements-card"><div className="exo-movement-table-head"><span>MOVIMIENTO</span><span>SKU / LOTE</span><span>CANTIDAD</span><span>FECHA</span><span>REFERENCIA</span></div>
    {filtered.map(m=>{const T=TYPES.find(x=>x.id===m.type)||TYPES[2];const Icon=T.icon;return <div className="exo-movement-row" key={m.id}><span className="movement-type"><i className={m.type==='Entrada'?'in':m.type==='Salida'?'out':m.type==='Reserva'?'reserve':'adjust'}><Icon size={15}/></i><b>{m.type}</b><small>{m.id}</small></span><span><strong>{m.sku}</strong><small>{m.lot||'Sin lote'} · {m.product} · {m.presentation}</small></span><strong className={m.type==='Salida'?'negative':m.type==='Entrada'?'positive':''}>{m.type==='Salida'?'−':m.type==='Entrada'?'+':''}{m.quantity.toLocaleString('es-BO')} u.</strong><span className="movement-date">{fmtDate(m.date)}</span><span className="movement-ref">{m.reference||'—'}</span></div>})}
    {!filtered.length&&<div className="exo-movement-empty">No se encontraron movimientos.</div>}
   </section>
  </main>
  <footer className="exo-movements-footer"><span>EXO CLEAN · Movimientos</span><span>Ghost Web & Software Designer · Medunz Corp.</span></footer>
  {modal&&<MovementModal inventory={inventory} lots={lots} lotInventory={lotInventory} onClose={()=>setModal(false)} onSave={saveMovement}/>}
 </div>
}

function MovementModal({inventory,lots,lotInventory,onClose,onSave}){
 const [type,setType]=React.useState('Entrada'),[sku,setSku]=React.useState(inventory[0]?.sku||''),[quantity,setQuantity]=React.useState(''),[lot,setLot]=React.useState(''),[reference,setReference]=React.useState('');
 const item=inventory.find(x=>x.sku===sku);
 const selectedLots=lots.filter(x=>x.sku===sku);
 const selectedLot=selectedLots.find(x=>x.lot===lot);
 const lotItem=selectedLot?lotInventory.find(x=>(x.lotId||x.id)===(selectedLot.id||selectedLot.lot)):null;
 const available=Math.max(0,(item?.stock||0)-(item?.reserved||0));
 const lotAvailable=availableLot(lotItem);
 const save=e=>{
  e.preventDefault();
  const qtyRaw=Number(quantity);
  const qty=Math.floor(Math.abs(qtyRaw));
  if(!item||!qty||qty<1){alert('Ingresa una cantidad válida.');return}
  if(type!=='Ajuste'&&!selectedLot){alert('Selecciona un lote para registrar un movimiento trazable.');return}
  let updated={...item};
  let updatedLotItem=lotItem?{...lotItem}:null;
  if(type==='Entrada'){
   updated.stock+=qty;
   if(!updatedLotItem){alert('El lote seleccionado no tiene inventario asociado.');return}
   updatedLotItem.stock+=qty;
  }
  if(type==='Salida'){
   if(qty>available){alert('No hay stock disponible suficiente. Disponible: '+available+' unidades.');return}
   if(!updatedLotItem||qty>lotAvailable){alert('El lote no tiene stock disponible suficiente. Disponible en lote: '+lotAvailable+' unidades.');return}
   updated.stock-=qty; updatedLotItem.stock-=qty;
  }
  if(type==='Ajuste'){
   if(!Number.isInteger(qtyRaw)||qtyRaw===0){alert('Para un ajuste usa una cantidad entera distinta de cero.');return}
   if(updated.stock+qtyRaw<updated.reserved){alert('El ajuste no puede dejar el stock físico por debajo del stock reservado.');return}
   if(updatedLotItem&&updatedLotItem.stock+qtyRaw<updatedLotItem.reserved){alert('El ajuste no puede dejar el stock del lote por debajo de lo reservado.');return}
   updated.stock+=qtyRaw;
   if(updatedLotItem)updatedLotItem.stock+=qtyRaw;
  }
  if(type==='Reserva'){
   if(qty>available){alert('No hay stock disponible suficiente para reservar. Disponible: '+available+' unidades.');return}
   if(!updatedLotItem||qty>lotAvailable){alert('El lote no tiene stock disponible suficiente para reservar. Disponible: '+lotAvailable+' unidades.');return}
   updated.reserved+=qty; updatedLotItem.reserved+=qty;
  }
  if(type==='Liberación'){
   if(qty>updated.reserved){alert('No puedes liberar más de lo reservado global: '+updated.reserved+' unidades.');return}
   if(!updatedLotItem||qty>updatedLotItem.reserved){alert('No puedes liberar más de lo reservado en el lote: '+(updatedLotItem?.reserved||0)+' unidades.');return}
   updated.reserved-=qty; updatedLotItem.reserved-=qty;
  }
  onSave({
   type,sku,product:item.product,presentation:item.presentation,lot:selectedLot?.lot||'',
   quantity:qty,reference:reference||'Movimiento manual',
   updatedItem:updated,updatedLotItem,
   balanceStock:updated.stock,balanceReserved:updated.reserved
  });
 };
 return <div className="exo-movement-modal-bg" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><form className="exo-movement-modal" onSubmit={save}>
  <div className="exo-modal-head"><div><span>CONTROL DE EXISTENCIAS</span><h2>Nuevo movimiento</h2></div><button type="button" onClick={onClose}>×</button></div>
  <div className="exo-movement-types">{TYPES.map(t=>{const I=t.icon;return <button type="button" key={t.id} className={type===t.id?'selected':''} onClick={()=>{setType(t.id);setLot('')}}><I size={16}/>{t.label}</button>})}</div>
  <label>SKU<select value={sku} onChange={e=>{setSku(e.target.value);setLot('')}}>{inventory.map(x=><option key={x.sku} value={x.sku}>{x.sku} · {x.product} · {x.presentation}</option>)}</select></label>
  <label>Lote<select value={lot} onChange={e=>setLot(e.target.value)}><option value="">{type==='Ajuste'?'Sin lote':'Selecciona un lote'}</option>{selectedLots.map(x=><option key={x.id} value={x.lot}>{x.lot} · {x.status}{x.expires?' · vence '+x.expires:''}</option>)}</select></label>
  <div className="exo-movement-current"><span>Disponible SKU</span><strong>{available.toLocaleString('es-BO')} u.</strong><span>Disponible lote</span><strong>{lotItem?lotAvailable.toLocaleString('es-BO')+' u.':'—'}</strong><span>Reservado lote</span><strong>{lotItem?Number(lotItem.reserved||0).toLocaleString('es-BO')+' u.':'—'}</strong></div>
  <label>Cantidad{type==='Ajuste'&&<small>Usa positivo para aumentar y negativo para disminuir.</small>}<input type="number" step="1" value={quantity} onChange={e=>setQuantity(e.target.value)} placeholder={type==='Ajuste'?'+/- cantidad':'Cantidad'} required/></label>
  <label>Referencia / motivo<input value={reference} onChange={e=>setReference(e.target.value)} placeholder={type==='Entrada'?'Producción, compra...':type==='Salida'?'Pedido, entrega...':'Motivo del movimiento'}/></label>
  <div className="exo-modal-foot"><button type="button" className="exo-movement-btn light" onClick={onClose}>Cancelar</button><button className="exo-movement-btn primary">Registrar movimiento</button></div>
 </form></div>;
}