import React from 'react';
import GhostLogo from './assets/ghost-navbar-logo.svg';
import ExoNav from './ExoNav';
import { ArrowLeft, Edit3, Package, Plus, Search, Trash2 } from 'lucide-react';
import './exo-presentaciones.css';

const DEFAULT_PRESENTATIONS = [
  ['VAJ','Vajillero','1 L'],['VAJ','Vajillero','3 L'],['VAJ','Vajillero','10 L'],
  ['LPI','Limpia Piso','1 L'],['LPI','Limpia Piso','3 L'],['LPI','Limpia Piso','10 L'],
  ['SHA','Shampoo','500 ml'],['SHA','Shampoo','1 L'],['SHA','Shampoo','3 L'],['SHA','Shampoo','10 L'],
  ['SGR','Saca Grasa','1 L'],['SGR','Saca Grasa','3 L'],['SGR','Saca Grasa','10 L'],
  ['LVR','Lava Ropa','3 L'],['LVR','Lava Ropa','5 L'],['LVR','Lava Ropa','10 L'],
  ['JLI','Jabón Líquido','1 L'],['JLI','Jabón Líquido','3 L'],['JLI','Jabón Líquido','10 L'],
  ['CWS','Car Wash','500 ml'],['CWS','Car Wash','1 L'],['CWS','Car Wash','3 L'],['CWS','Car Wash','10 L'],
].map(([productCode,product,size]) => ({id:productCode+'-'+size.replace(/\\s/g,''),productCode,product,size,status:'Activo'}));

const STORAGE_KEY='exo_presentations_v1';

function loadPresentations(){
  try{
    const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(Array.isArray(saved)&&saved.length)return saved;
  }catch{}
  return DEFAULT_PRESENTATIONS;
}

export default function ExoPresentaciones(){
  const [items,setItems]=React.useState(loadPresentations);
  const [selectedId,setSelectedId]=React.useState(DEFAULT_PRESENTATIONS[0].id);
  const [query,setQuery]=React.useState('');
  const [filter,setFilter]=React.useState('Todos');
  const [modalOpen,setModalOpen]=React.useState(false);
  const [editing,setEditing]=React.useState(null);

  React.useEffect(()=>{
    document.title='EXO · Presentaciones | Ghost W&SD';
    localStorage.setItem(STORAGE_KEY,JSON.stringify(items));
  },[items]);

  const products=[...new Map(items.map(x=>[x.productCode,x.product])).entries()].map(([code,name])=>({code,name}));
  const filtered=items.filter(x=>{
    const productOk=filter==='Todos'||x.productCode===filter;
    const q=query.trim().toLowerCase();
    return productOk&&(!q||[x.productCode,x.product,x.size,x.status].join(' ').toLowerCase().includes(q));
  });
  const selected=items.find(x=>x.id===selectedId)||filtered[0];

  const saveItem=item=>{
    setItems(current=>current.some(x=>x.id===item.id)?current.map(x=>x.id===item.id?item:x):[...current,item]);
    setSelectedId(item.id);setModalOpen(false);setEditing(null);
  };
  const deleteItem=id=>{
    if(!window.confirm('¿Eliminar esta presentación del catálogo?'))return;
    setItems(current=>current.filter(x=>x.id!==id));setSelectedId('');
  };

  return <div className="exo-presentations">
    <header className="exo-presentations-header">
      <a href="https://ghost.medunzcorp.com" className="exo-presentations-brand"><img src={GhostLogo} alt="Ghost Web & Software Designer"/></a>
      <div><span>GHOST W&amp;SD</span><strong>EXO / PRESENTACIONES</strong></div>
      <a href="https://ghost.medunzcorp.com/exo/productos" className="exo-presentations-back"><ArrowLeft size={15}/> Productos</a>
    </header>

    <ExoNav active="presentaciones" />
      <main className="exo-presentations-main">
      <section className="exo-presentations-hero">
        <div>
          <span className="exo-presentations-kicker">EXO · ESTRUCTURA COMERCIAL</span>
          <h1>Presentaciones.<br/><em>Una medida.</em></h1>
          <p>Define el contenido comercial de cada producto EXO. Una presentación representa una combinación concreta de producto y tamaño, antes de asignar su SKU.</p>
        </div>
        <div className="exo-presentations-mark"><Package size={38} strokeWidth={1.2}/><span>{items.length}<br/>PRESENTACIONES</span></div>
      </section>

      <section className="exo-presentations-toolbar">
        <div className="exo-presentations-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar producto o presentación..."/></div>
        <select value={filter} onChange={e=>setFilter(e.target.value)}><option value="Todos">Todos los productos</option>{products.map(p=><option key={p.code} value={p.code}>{p.name}</option>)}</select>
        <button className="exo-presentations-button dark" onClick={()=>{setEditing(null);setModalOpen(true)}}><Plus size={16}/> Nueva presentación</button>
      </section>

      <section className="exo-presentations-layout">
        <div className="exo-presentations-list">
          <div className="exo-presentations-list-head"><div><span>CATÁLOGO DE PRESENTACIONES</span><h2>{filtered.length} registros</h2></div><span className="exo-presentations-count">EXO</span></div>
          {filtered.map(item=><button key={item.id} className={selected?.id===item.id?'exo-presentation-row active':'exo-presentation-row'} onClick={()=>setSelectedId(item.id)}>
            <span className="exo-presentation-code">{item.productCode}</span>
            <span className="exo-presentation-name"><strong>{item.product}</strong><small>{item.size} · {item.status}</small></span>
            <span className="exo-presentation-arrow">→</span>
          </button>)}
        </div>

        <aside className="exo-presentations-detail">
          {selected?<><div className="exo-presentations-detail-top"><span>FICHA DE PRESENTACIÓN</span><span className="exo-presentations-pill">{selected.status.toUpperCase()}</span></div>
            <div className="exo-presentations-code">{selected.productCode}</div>
            <h2>{selected.product}</h2>
            <div className="exo-presentation-size">{selected.size}</div>
            <p>Esta presentación identifica el producto <strong>{selected.product}</strong> en su contenido de <strong>{selected.size}</strong>. El SKU y la codificación comercial se relacionarán posteriormente.</p>
            <div className="exo-presentations-detail-grid"><div><span>PRODUCTO</span><strong>{selected.productCode}</strong></div><div><span>CONTENIDO</span><strong>{selected.size}</strong></div></div>
            <div className="exo-presentations-detail-actions"><button className="exo-presentations-button dark" onClick={()=>{setEditing(selected);setModalOpen(true)}}><Edit3 size={15}/> Editar</button><button className="exo-presentations-danger" onClick={()=>deleteItem(selected.id)}><Trash2 size={15}/> Eliminar</button></div>
          </>:<div className="exo-presentations-empty">No hay presentaciones para mostrar.</div>}
        </aside>
      </section>
    </main>

    {modalOpen&&<PresentationModal initial={editing} products={products} items={items} onClose={()=>{setModalOpen(false);setEditing(null)}} onSave={saveItem}/>}
    <footer className="exo-presentations-footer"><span>EXO · Presentaciones</span><span>Ghost Web &amp; Software Designer · Medunz Corp.</span></footer>
  </div>;
}

function PresentationModal({initial,products,items,onClose,onSave}){
  const [productCode,setProductCode]=React.useState(initial?.productCode||products[0]?.code||'VAJ');
  const [size,setSize]=React.useState(initial?.size||'');
  const [status,setStatus]=React.useState(initial?.status||'Activo');
  const product=products.find(x=>x.code===productCode)||products[0];
  const save=e=>{
    e.preventDefault();
    const cleanSize=size.trim();
    if(!product||!cleanSize)return;
    const id=product.code+'-'+cleanSize.replace(/\\s/g,'');
    if(items.some(x=>x.id===id&&x.id!==initial?.id)){window.alert('Esta presentación ya existe para el producto seleccionado.');return;}
    onSave({id,productCode:product.code,product:product.name,size:cleanSize,status});
  };
  return <div className="exo-presentations-modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <form className="exo-presentations-modal" onSubmit={save}>
      <div className="exo-presentations-modal-head"><div><span>CATÁLOGO DE PRESENTACIONES</span><h2>{initial?'Editar presentación':'Nueva presentación'}</h2></div><button type="button" onClick={onClose}>×</button></div>
      <label>Producto<select value={productCode} onChange={e=>setProductCode(e.target.value)}>{products.map(p=><option key={p.code} value={p.code}>{p.name} ({p.code})</option>)}</select></label>
      <label>Contenido / tamaño<input value={size} onChange={e=>setSize(e.target.value)} placeholder="Ej. 500 ml, 1 L, 3 L"/></label>
      <label>Estado<select value={status} onChange={e=>setStatus(e.target.value)}><option>Activo</option><option>Inactivo</option><option>En desarrollo</option></select></label>
      <div className="exo-presentations-modal-foot"><button type="button" className="exo-presentations-button light" onClick={onClose}>Cancelar</button><button className="exo-presentations-button dark" type="submit">Guardar presentación</button></div>
    </form>
  </div>;
}
