import React from 'react';
import { ArrowLeft, Download, Edit3, Package, Plus, Printer, Search, Trash2 } from 'lucide-react';
import './exo-codificacion-sku.css';

const PRODUCTS = [
  { name: 'Vajillero', code: 'VAJ', sizes: ['1 L', '3 L', '10 L'] },
  { name: 'Limpia Piso', code: 'LPI', sizes: ['1 L', '3 L', '10 L'] },
  { name: 'Shampoo', code: 'SHA', sizes: ['500 ml', '1 L', '3 L', '10 L'] },
  { name: 'Saca Grasa', code: 'SGR', sizes: ['1 L', '3 L', '10 L'] },
  { name: 'Lava Ropa', code: 'LVR', sizes: ['3 L', '5 L', '10 L'] },
  { name: 'Jabón Líquido', code: 'JLI', sizes: ['1 L', '3 L', '10 L'] },
  { name: 'Car Wash', code: 'CWS', sizes: ['500 ml', '1 L', '3 L', '10 L'] },
];

const STORAGE_KEY = 'ghost_exo_sku_catalog_v1';

function eanCheckDigit(base12) {
  const digits = String(base12).split('').map(Number);
  const sum = digits.reduce((total, digit, index) => total + digit * (index % 2 === 0 ? 1 : 3), 0);
  return String((10 - (sum % 10)) % 10);
}

function provisionalCode(index) {
  const base = String(200000000000 + index).padStart(12, '0');
  return base + eanCheckDigit(base);
}

function buildCatalog() {
  let index = 1;
  return PRODUCTS.flatMap((product) =>
    product.sizes.map((size) => ({
      id: `${product.code}-${size.replace(/\\s/g, '').replace('ml', 'ML')}`,
      product: product.name,
      productCode: product.code,
      presentation: size,
      sku: `EXO-${product.code}-${size === '500 ml' ? '500' : size.replace(' L', '').padStart(3, '0')}`,
      provisionalCode: provisionalCode(index++),
      status: 'Activo',
      officialGtin: '',
      lot: '',
    }))
  );
}

function loadCatalog() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.length) return saved;
  } catch {}
  return buildCatalog();
}

const BAR_PATTERNS = {
  L: ['0001101','0011001','0010011','0111101','0100011','0110001','0101111','0111011','0110111','0001011'],
  G: ['0100111','0110011','0011011','0100001','0011101','0111001','0000101','0010001','0001001','0010111'],
  R: ['1110010','1100110','1101100','1000010','1011100','1001110','1010000','1000100','1001000','1110100'],
};
const PARITY = ['LLLLLL','LLGLGG','LLGGLG','LLGGGL','LGLLGG','LGGLLG','LGGGLL','LGLGLG','LGLGGL','LGGLGL'];

function barcodePattern(value) {
  const digits = String(value).padStart(13, '0').slice(0, 13).split('').map(Number);
  let pattern = '101';
  const parity = PARITY[digits[0]];
  for (let i = 1; i <= 6; i++) pattern += BAR_PATTERNS[parity[i - 1]][digits[i]];
  pattern += '01010';
  for (let i = 7; i <= 12; i++) pattern += BAR_PATTERNS.R[digits[i]];
  return pattern + '101';
}

function Barcode({ value, compact = false }) {
  const pattern = barcodePattern(value);
  const height = compact ? 34 : 76;
  return (
    <div className={compact ? 'barcode compact' : 'barcode'}>
      <svg viewBox={`0 0 ${pattern.length} ${height}`} preserveAspectRatio="none" role="img" aria-label={`Código provisional ${value}`}>
        {pattern.split('').map((bit, i) => bit === '1' && <rect key={i} x={i} y="0" width="1" height={height} />)}
      </svg>
      {!compact && <div className="barcode-number">{value}</div>}
    </div>
  );
}

function readStored() {
  return loadCatalog();
}

export default function ExoCodificacionSKU() {
  const [catalog, setCatalog] = React.useState(readStored);
  const [selectedId, setSelectedId] = React.useState('');
  const [query, setQuery] = React.useState('');
  const [filterProduct, setFilterProduct] = React.useState('Todos');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(null);

  React.useEffect(() => {
    document.title = 'EXO · Codificación SKU | Ghost W&SD';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));
  }, [catalog]);

  const filtered = catalog.filter((item) => {
    const matchesProduct = filterProduct === 'Todos' || item.product === filterProduct;
    const q = query.trim().toLowerCase();
    return matchesProduct && (!q || [item.product, item.presentation, item.sku, item.provisionalCode, item.officialGtin].some((v) => String(v || '').toLowerCase().includes(q)));
  });

  const selected = catalog.find((item) => item.id === selectedId) || filtered[0];

  const saveItem = (item) => {
    setCatalog((current) => current.some((x) => x.id === item.id) ? current.map((x) => x.id === item.id ? item : x) : [...current, item]);
    setSelectedId(item.id);
    setModalOpen(false);
    setEditing(null);
  };

  const deleteItem = (id) => {
    if (!window.confirm('¿Eliminar este registro del catálogo provisional?')) return;
    setCatalog((current) => current.filter((item) => item.id !== id));
    setSelectedId('');
  };

  const exportCsv = () => {
    const headers = ['Producto','Presentación','SKU','Código provisional','GTIN oficial','Lote','Estado'];
    const rows = catalog.map((x) => [x.product,x.presentation,x.sku,x.provisionalCode,x.officialGtin,x.lot,x.status]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'exo-catalogo-sku.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="exo-app">
      <header className="exo-header">
        <a className="exo-brand" href="https://ghost.medunzcorp.com" aria-label="Volver a Ghost">
          <img src="/ghost-logo.svg" alt="Ghost Web & Software Designer" />
        </a>
        <div className="exo-header-title">
          <span>GHOST W&amp;SD</span>
          <strong>EXO / CODIFICACIÓN SKU</strong>
        </div>
        <a className="exo-back" href="https://ghost.medunzcorp.com"><ArrowLeft size={15} /> Ghost</a>
      </header>

      <main className="exo-main">
        <section className="exo-hero">
          <div>
            <div className="exo-kicker">EXO · SISTEMA DE IDENTIFICACIÓN</div>
            <h1>Codificación<br /><em>de productos.</em></h1>
            <p>Catálogo maestro para estructurar SKU y códigos numéricos provisionales de las presentaciones EXO.</p>
          </div>
          <div className="exo-hero-mark"><Package size={38} strokeWidth={1.2} /><span>23<br />PRESENTACIONES</span></div>
        </section>

        <section className="exo-toolbar">
          <div className="exo-search"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar producto, SKU o código..." /></div>
          <select value={filterProduct} onChange={(e) => setFilterProduct(e.target.value)}><option>Todos</option>{PRODUCTS.map((p) => <option key={p.code}>{p.name}</option>)}</select>
          <button className="exo-button dark" onClick={() => { setEditing(null); setModalOpen(true); }}><Plus size={16} /> Nuevo SKU</button>
          <button className="exo-button light" onClick={exportCsv}><Download size={16} /> CSV</button>
        </section>

        <section className="exo-layout">
          <div className="exo-table-card">
            <div className="exo-table-head"><div><span className="exo-label">CATÁLOGO MAESTRO</span><h2>{filtered.length} registros</h2></div><span className="exo-status">● PROVISIONAL</span></div>
            <div className="exo-table-scroll">
              <table>
                <thead><tr><th>Producto</th><th>Presentación</th><th>SKU</th><th>Código provisional</th><th></th></tr></thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id} className={selected?.id === item.id ? 'active' : ''} onClick={() => setSelectedId(item.id)}>
                      <td><strong>{item.product}</strong></td><td>{item.presentation}</td><td><code>{item.sku}</code></td><td><code>{item.provisionalCode}</code></td><td><button className="icon-button" onClick={(e) => { e.stopPropagation(); setEditing(item); setModalOpen(true); }} aria-label="Editar"><Edit3 size={15} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="exo-detail">
            {selected ? (
              <>
                <div className="exo-detail-top"><span className="exo-label">FICHA DEL PRODUCTO</span><span className="exo-pill">ACTIVO</span></div>
                <h2>{selected.product}</h2><div className="exo-presentation">{selected.presentation}</div>
                <div className="exo-sku-block"><span>SKU</span><strong>{selected.sku}</strong></div>
                <Barcode value={selected.provisionalCode} />
                <div className="exo-code-note">CÓDIGO PROVISIONAL · 13 DÍGITOS</div>
                <div className="exo-meta-grid"><div><span>GTIN oficial</span><strong>{selected.officialGtin || 'Pendiente'}</strong></div><div><span>Lote</span><strong>{selected.lot || 'Sin asignar'}</strong></div><div><span>Estado</span><strong>{selected.status}</strong></div></div>
                <div className="exo-detail-actions"><button className="exo-button dark" onClick={() => window.print()}><Printer size={15} /> Imprimir</button><button className="exo-button light" onClick={() => { setEditing(selected); setModalOpen(true); }}><Edit3 size={15} /> Editar</button></div>
              </>
            ) : <div className="exo-empty">Selecciona un producto para ver su ficha.</div>}
          </aside>
        </section>
      </main>

      {modalOpen && <SkuModal initial={editing} catalog={catalog} onClose={() => { setModalOpen(false); setEditing(null); }} onSave={saveItem} onDelete={deleteItem} />}
      <footer className="exo-footer"><span>EXO · Codificación SKU</span><span>Ghost Web &amp; Software Designer · Medunz Corp.</span></footer>
    </div>
  );
}

function SkuModal({ initial, catalog, onClose, onSave, onDelete }) {
  const [product, setProduct] = React.useState(initial?.product || PRODUCTS[0].name);
  const [presentation, setPresentation] = React.useState(initial?.presentation || PRODUCTS[0].sizes[0]);
  const currentProduct = PRODUCTS.find((p) => p.name === product) || PRODUCTS[0];

  React.useEffect(() => {
    if (!currentProduct.sizes.includes(presentation)) setPresentation(currentProduct.sizes[0]);
  }, [product]);
  const item = initial || {
    id: `${currentProduct.code}-${presentation.replace(/\\s/g, '')}-${Date.now()}`,
    productCode: currentProduct.code,
    sku: `EXO-${currentProduct.code}-${presentation === '500 ml' ? '500' : presentation.replace(' L','').padStart(3,'0')}`,
    provisionalCode: provisionalCode(catalog.length + 1),
    officialGtin: '',
    lot: '',
    status: 'Activo',
  };

  const save = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSave({ ...item, product, productCode: currentProduct.code, presentation, officialGtin: String(data.get('gtin') || '').trim(), lot: String(data.get('lot') || '').trim(), status: data.get('status') });
  };

  return (
    <div className="exo-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="exo-modal" onSubmit={save}>
        <div className="exo-modal-head"><div><span className="exo-label">{initial ? 'EDITAR REGISTRO' : 'NUEVO REGISTRO'}</span><h2>{initial ? 'Actualizar SKU' : 'Crear SKU'}</h2></div><button type="button" onClick={onClose}>×</button></div>
        <label>Producto<select value={product} onChange={(e) => setProduct(e.target.value)}>{PRODUCTS.map((p) => <option key={p.code}>{p.name}</option>)}</select></label>
        <label>Presentación<select value={presentation} onChange={(e) => setPresentation(e.target.value)}>{currentProduct.sizes.map((s) => <option key={s}>{s}</option>)}</select></label>
        <label>GTIN oficial <input name="gtin" placeholder="Pendiente" defaultValue={initial?.officialGtin || ''} /></label>
        <label>Lote <input name="lot" placeholder="Se asignará en producción" defaultValue={initial?.lot || ''} /></label>
        <label>Estado<select name="status" defaultValue={initial?.status || 'Activo'}><option>Activo</option><option>Inactivo</option><option>En desarrollo</option></select></label>
        <div className="exo-modal-foot">{initial && <button type="button" className="exo-danger" onClick={() => { onDelete(initial.id); onClose(); }}><Trash2 size={15} /> Eliminar</button>}<span /><button type="button" className="exo-button light" onClick={onClose}>Cancelar</button><button className="exo-button dark" type="submit">Guardar SKU</button></div>
      </form>
    </div>
  );
}
