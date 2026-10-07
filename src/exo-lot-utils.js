export const LOT_INV_KEY='exo_lot_inventory_v1';

export function readArray(key,fallback=[]){
  try{
    const value=JSON.parse(localStorage.getItem(key));
    return Array.isArray(value)?value:fallback;
  }catch{return fallback}
}

export function ensureLotInventory(lots,current=[]){
  const map=new Map(current.map(x=>[x.lotId||x.id,x]));
  return lots.map(lot=>{
    const key=lot.id||lot.lot;
    const existing=map.get(key);
    if(existing){
      return {...existing,lotId:key,lot:lot.lot,sku:lot.sku,product:lot.product,presentation:lot.size};
    }
    return {
      lotId:key,
      lot:lot.lot,
      sku:lot.sku,
      product:lot.product,
      presentation:lot.size,
      stock:lot.status==='Liberado'?Number(lot.quantity)||0:0,
      reserved:0
    };
  });
}

export function availableLot(item){
  return Math.max(0,(Number(item?.stock)||0)-(Number(item?.reserved)||0));
}

export function allocateFEFO(lots,lotInventory,sku,quantity){
  let remaining=Number(quantity)||0;
  if(remaining<=0)return [];
  const candidates=lots
    .filter(l=>l.sku===sku&&l.status==='Liberado')
    .map(l=>{
      const inv=lotInventory.find(x=>(x.lotId||x.id)===(l.id||l.lot));
      return inv?{lot:l,inv}:null;
    })
    .filter(Boolean)
    .filter(x=>availableLot(x.inv)>0)
    .sort((a,b)=>{
      const ea=new Date((a.lot.expires||'9999-12-31')+'T12:00:00').getTime();
      const eb=new Date((b.lot.expires||'9999-12-31')+'T12:00:00').getTime();
      return ea-eb||String(a.lot.lot).localeCompare(String(b.lot.lot));
    });
  const allocations=[];
  for(const candidate of candidates){
    if(remaining<=0)break;
    const qty=Math.min(remaining,availableLot(candidate.inv));
    if(qty>0){
      allocations.push({
        lotId:candidate.lot.id||candidate.lot.lot,
        lot:candidate.lot.lot,
        sku,
        product:candidate.lot.product,
        presentation:candidate.lot.size,
        qty
      });
      remaining-=qty;
    }
  }
  return remaining>0?null:allocations;
}
