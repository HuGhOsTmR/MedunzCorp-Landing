import React from 'react';
import GhostLogo from './assets/ghost-navbar-logo.svg';
import { ArrowLeft, Edit3, Package, Plus, Search, Trash2 } from 'lucide-react';
import './exo-productos.css';

const DEFAULT_PRODUCTS = [
  { id:'VAJ', code:'VAJ', name:'Vajillero', description:'Producto para lavado manual de vajilla.', presentations:['1 L','3 L','10 L'], status:'Activo' },
  { id:'LPI', code:'LPI', name:'Limpia Piso', description:'Producto para limpieza y mantenimiento de pisos.', presentations:['1 L','3 L','10 L'], status:'Activo' },
  { id:'SHA', code:'SHA', name:'Shampoo', description:'Producto de higiene y cuidado personal.', presentations:['500 ml','1 L','3 L','10 L'], status:'Activo' },
  { id:'SGR', code:'SGR', name:'Saca Grasa', description:'Producto desengrasante para superficies.', presentations:['1 L','3 L','10 L'], status:'Activo' },
  { id:'LVR', code:'LVR', name:'Lava Ropa', description:'Producto para lavado de ropa.', presentations:['3 L','5 L','10 L'], status:'Activo' },
  { id:'JLI', code:'JLI', name:'Jabón Líquido', description:'Producto de limpieza en presentación líquida.', presentations:['1 L','3 L','10 L'], status:'Activo' },
  { id:'CWS', code:'CWS', name:'Car Wash', description:'Producto para limpieza de vehículos.', presentations:['500 ml','1 L','3 L','10 L'], status:'Activo' },
];

const STORAGE_KEY = 'exo_products_v1';

function loadProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.length) return saved;
  } catch {}
  return DEFAULT_PRODUCTS;
}

export default function ExoProductos() {
  const [products,setProducts] = React.useState(loadProducts);
  const [selectedId,setSelectedId] = React.useState('VAJ');
  const [query,setQuery] = React.useState('');
  const [modalOpen,setModalOpen] = React.useState(false);
  const [editing,setEditing] = React.useState(null);

  React.useEffect(() => {
    document.title = 'EXO · Productos | Ghost W&SD';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  },[products]);

  const filtered = products.filter(p => {
    const q=query.trim().toLowerCase();
    return !q || [p.code,p.name,p.description,...p.presentations].join(' ').toLowerCase().includes(q);
  });
  const selected = products.find(p=>p.id===selectedId) || filtered[0];

  const saveProduct = product => {
    setProducts(current => current.some(p=>p.id===product.id)
      ? current.map(p=>p.id===product.id?product:p)
      : [...current,product]);
    setSelectedId(product.id);
    setModalOpen(false);
    setEditing(null);
  };

  const deleteProduct = id => {
    if(!window.confirm('¿Eliminar este producto del catálogo maestro?')) return;
    setProducts(current=>current.filter(p=>p.id!==id));
    setSelectedId('');
  };

  return <div className="exo-products">
    <header className="exo-products-header">
      <a href="https://ghost.medunzcorp.com" className="exo-products-brand">
        <img src={GhostLogo} alt="Ghost Web & Software Designer" />
      </a>
      <div><span>GHOST W&amp;SD</span><strong>EXO / PRODUCTOS</strong></div>
      <a href="https://ghost.medunzcorp.com/exo/codificacionSKU" className="exo-products-back"><ArrowLeft size={15}/> SKU</a>
    </header>

    <main className="exo-products-main">
      <section className="exo-products-hero">
        <div>
          <span className="exo-products-kicker">EXO · CATÁLOGO MAESTRO</span>
          <h1>Productos EXO.<br/><em>Una identidad.</em></h1>
          <p>Catálogo maestro donde se define la identidad de cada producto antes de relacionarlo con sus presentaciones y SKU.</p>
        </div>
        <div className="exo-products-mark"><Package size={38} strokeWidth={1.2}/><span>{products.length}<br/>PRODUCTOS</span></div>
      </section>

      <section className="exo-products-toolbar">
        <div className="exo-products-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar producto o presentación..."/></div>
        <button className="exo-products-button dark" onClick={()=>{setEditing(null);setModalOpen(true)}}><Plus size={16}/> Nuevo producto</button>
      </section>

      <section className="exo-products-layout">
        <div className="exo-products-list">
          <div className="exo-products-list-head"><div><span>CATÁLOGO MAESTRO</span><h2>{filtered.length} productos</h2></div><span className="exo-products-count">ACTIVOS</span></div>
          {filtered.map(product=><button key={product.id} className={selected?.id===product.id?'exo-product-row active':'exo-product-row'} onClick={()=>setSelectedId(product.id)}>
            <span className="exo-product-code">{product.code}</span>
            <span className="exo-product-name"><strong>{product.name}</strong><small>{product.presentations.length} presentaciones · {product.status}</small></span>
            <span className="exo-product-arrow">→</span>
          </button>)}
        </div>

        <aside className="exo-products-detail">
          {selected ? <>
            <div className="exo-products-detail-top"><span>FICHA DEL PRODUCTO</span><span className="exo-products-pill">{selected.status.toUpperCase()}</span></div>
            <div className="exo-products-code">{selected.code}</div>
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>
            <div className="exo-products-section-title">PRESENTACIONES</div>
            <div className="exo-products-presentations">{selected.presentations.map(s=><span key={s}>{s}</span>)}</div>
            <div className="exo-products-detail-actions">
              <button className="exo-products-button dark" onClick={()=>{setEditing(selected);setModalOpen(true)}}><Edit3 size={15}/> Editar</button>
              <button className="exo-products-danger" onClick={()=>deleteProduct(selected.id)}><Trash2 size={15}/> Eliminar</button>
            </div>
          </> : <div className="exo-products-empty">No hay productos para mostrar.</div>}
        </aside>
      </section>
    </main>

    {modalOpen && <ProductModal initial={editing} products={products} onClose={()=>{setModalOpen(false);setEditing(null)}} onSave={saveProduct}/>}
    <footer className="exo-products-footer"><span>EXO · Productos</span><span>Ghost Web &amp; Software Designer · Medunz Corp.</span></footer>
  </div>;
}

function ProductModal({initial,products,onClose,onSave}) {
  const [presentations,setPresentations]=React.useState(initial?.presentations||['1 L']);
  const [presentation,setPresentation]=React.useState('');
  const [code,setCode]=React.useState(initial?.code||'');
  const [name,setName]=React.useState(initial?.name||'');
  const [description,setDescription]=React.useState(initial?.description||'');
  const [status,setStatus]=React.useState(initial?.status||'Activo');

  const addPresentation=()=>{
    const value=presentation.trim();
    if(value && !presentations.includes(value)) setPresentations([...presentations,value]);
    setPresentation('');
  };
  const removePresentation=value=>setPresentations(presentations.filter(p=>p!==value));

  const save=e=>{
    e.preventDefault();
    const cleanCode=code.trim().toUpperCase();
    const cleanName=name.trim();
    if(!cleanCode || !cleanName || !presentations.length) return;
    if(products.some(p=>p.code===cleanCode && p.id!==initial?.id)) { window.alert('El código del producto ya existe.'); return; }
    onSave({id:initial?.id||cleanCode,code:cleanCode,name:cleanName,description:description.trim(),presentations,status});
  };

  return <div className="exo-products-modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <form className="exo-products-modal" onSubmit={save}>
      <div className="exo-products-modal-head"><div><span>CATÁLOGO MAESTRO</span><h2>{initial?'Editar producto':'Nuevo producto'}</h2></div><button type="button" onClick={onClose}>×</button></div>
      <label>Código interno<input value={code} onChange={e=>setCode(e.target.value)} placeholder="Ej. VAJ" maxLength={8}/></label>
      <label>Nombre del producto<input value={name} onChange={e=>setName(e.target.value)} placeholder="Ej. Vajillero"/></label>
      <label>Descripción<textarea value={description} onChange={e=>setDescription(e.target.value)} rows={3} placeholder="Descripción breve del producto"/></label>
      <label>Presentaciones</label>
      <div className="exo-products-add-presentation"><input value={presentation} onChange={e=>setPresentation(e.target.value)} placeholder="Ej. 1 L, 500 ml"/><button type="button" onClick={addPresentation}><Plus size={15}/> Agregar</button></div>
      <div className="exo-products-tags">{presentations.map(p=><span key={p}>{p}<button type="button" onClick={()=>removePresentation(p)} aria-label={'Eliminar '+p}>×</button></span>)}</div>
      <label>Estado<select value={status} onChange={e=>setStatus(e.target.value)}><option>Activo</option><option>Inactivo</option><option>En desarrollo</option></select></label>
      <div className="exo-products-modal-foot"><button type="button" className="exo-products-button light" onClick={onClose}>Cancelar</button><button className="exo-products-button dark" type="submit">Guardar producto</button></div>
    </form>
  </div>;
}
