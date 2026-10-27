"use strict";
/* Basé sur Math3AM (© 2026, son auteur), réutilisé avec son autorisation.
   مبنيّ على تطبيق Math3AM بإذن من مؤلّفه. */

/* ============================================================================
   اللغة — Langue
   كلّ نصّ يظهر للتلميذ إمّا مفتاح في I18N (واجهة) وإمّا كائن {ar,fr} (محتوى).
   Tout texte affiché est soit une clé de I18N (interface), soit un objet {ar,fr} (contenu).
   ============================================================================ */
let LANG='ar';
const B=(ar,fr)=>({ar,fr});                         /* نصّ ثنائي اللغة / texte bilingue */
const tr=o=>o==null?'':(typeof o==='string'||typeof o==='number')?String(o):(o[LANG]!=null?o[LANG]:o.ar);
function t(k){ const d=I18N[LANG]||I18N.ar; return d[k]!=null?d[k]:(I18N.ar[k]!=null?I18N.ar[k]:k); }

/* ================================================================
   محرّك مولّد التمارين — أدوات عددية (من Math3AM)
   ================================================================ */
const ri=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[Math.floor(Math.random()*a.length)];
const nz=(a,b)=>{let v=0;while(v===0)v=ri(a,b);return v;};
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a||1;};
const ar=n=>String(n).replace('.',',').replace(/^-/,'−');   /* علامة الطرح الرياضية، والفاصلة العشرية */
const red=(p,q)=>{const g=gcd(p,q);p/=g;q/=g;if(q<0){p=-p;q=-q;}return [p,q];};
const f=(a,b)=>`<span class="fr"><span>${a}</span><span>${b}</span></span>`;
const frs=(p,q)=>{const [a,b]=red(p,q);return b===1?ar(a):(a<0?'−'+f(-a,b):f(a,b));};
const par=n=>n<0?`(${ar(n)})`:ar(n);
const cx=a=>a===1?'':a===-1?'−':ar(a);          /* معامل: 1n ← n */
const sgn=n=>n<0?'−':'+';
const lcm=(a,b)=>Math.abs(a*b)/gcd(a,b);
/* صيغة رياضية؛ الصيغ القصيرة لا تنقسم على سطرين / formule ; les formules courtes ne sont pas coupées en fin de ligne */
const M=s=>{ s=String(s); return s.replace(/<[^>]*>/g,'').replace(/&[a-z]+;/g,'x').length<=28?`<span class="m"><span class="nw">${s}</span></span>`:`<span class="m">${s}</span>`; };
/* عدد عشري مقرّب للعرض / nombre arrondi pour l'affichage */
const rnd=(v,d)=>{ const k=Math.pow(10,d==null?2:d); const r=Math.round(v*k)/k; return Object.is(r,-0)?0:r; };
/* عدد ناطق قريب من v (للعرض بكسر) / fraction proche de v */
function rat(v){ for(let q=1;q<=1000;q++){ const p=Math.round(v*q); if(Math.abs(p/q-v)<1e-9) return [p,q]; } return null; }
const nice=v=>{ const r=rat(v); return r?frs(r[0],r[1]):ar(rnd(v,4)); };

/* محلّل رياضي صغير (نزول تكراري): أولويات صحيحة، دون تنفيذ أيّ شيفرة.
   -x^2 = −(x²) ، 10^-3 = 0,001 ، 2x = 2×x ، (x+1)(x−2) ضرب ضمني */
function mathEval(src,xv){
  let i=0; const t=src;
  const peek=()=>t[i];
  const isStart=c=>c!==undefined&&(/[0-9.(x]/.test(c)||c==='π');
  function num(){ const m=/^\d*\.?\d+(?:e[+-]?\d+)?|^\d+\./.exec(t.slice(i)); if(!m) throw 0; i+=m[0].length; return parseFloat(m[0]); }
  function atom(){
    const c=peek();
    if(c==='('){ i++; const v=expr(); if(peek()!==')') throw 0; i++; return v; }
    if(c==='x'){ if(xv===undefined) throw 0; i++; return xv; }
    if(c==='π'){ i++; return Math.PI; }
    return num();
  }
  function power(){ const b=atom(); if(peek()==='^'){ i++; return Math.pow(b,unary()); } return b; }
  function unary(){ const c=peek(); if(c==='-'){ i++; return -unary(); } if(c==='+'){ i++; return unary(); } return power(); }
  function term(){
    let v=unary();
    for(;;){
      const c=peek();
      if(c==='*'){ i++; v*=unary(); }
      else if(c==='/'){ i++; const d=unary(); if(d===0) throw 0; v/=d; }
      else if(isStart(c)){ v*=power(); }
      else return v;
    }
  }
  function expr(){
    let v=term();
    for(;;){ const c=peek(); if(c==='+'){ i++; v+=term(); } else if(c==='-'){ i++; v-=term(); } else return v; }
  }
  try{ const v=expr(); if(i!==t.length) return NaN; return isFinite(v)?v:NaN; }catch(e){ return NaN; }
}

/* تحليل جواب عددي: يقبل 3/4 و 0,75 و 2,5×10^3 */
function pnum(s){
  if(s==null)return NaN;
  s=String(s).trim();
  if(!s)return NaN;
  s=s.replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d))
     .replace(/−|–|—/g,'-').replace(/,/g,'.')
     .replace(/[×x·X*]/g,'*').replace(/÷/g,'/')
     .replace(/\s+/g,'').replace(/Π/g,'π');
  if(!/^[0-9.+\-*/()^π]+$/.test(s))return NaN;
  return mathEval(s);
}
/* تحليل عبارة بدلالة n (حدّ عام لمتتالية) وتقييمها من أجل عدد طبيعي
   Analyse une expression en n (terme général) et l'évalue pour un entier n */
function pexprN(s,n){
  if(s==null)return NaN;
  s=String(s).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d))
     .replace(/−|–|—/g,'-').replace(/,/g,'.').replace(/÷/g,'/')
     .replace(/×|·/g,'*').replace(/²/g,'^2').replace(/³/g,'^3')
     .replace(/\s+/g,'').replace(/^u_?\(?n\)?=/i,'').replace(/[nN]/g,'x');
  if(!s||!/^[0-9x.+\-*/()^]+$/.test(s))return NaN;
  return mathEval(s,n);
}
const NS=[0,1,2,3,4,6,9];                          /* قيم n للمقارنة / valeurs de n testées */
const closeV=(a,b)=>Math.abs(a-b)<=1e-6*Math.max(1,Math.abs(b));
function sameSeq(user,fn){ return NS.every(n=>{ const u=pexprN(user,n); return !isNaN(u)&&closeV(u,fn(n)); }); }
function sameFnN(f1,f2){ return NS.every(n=>closeV(f1(n),f2(n))); }

/* ============================================================================
   إصلاح الاتجاه ثنائي المسار (للعربية فقط) — من Math3AM
   الصيغة الرياضية التي تتوزّع على عدّة عناصر تُجمع في عازل واحد من اليسار لليمين.
   En français (gauche → droite) aucune correction n'est nécessaire : fix() renvoie le texte tel quel.
   ============================================================================ */
const GLUE=/^(?:[\s0-9=×÷+\-−·<>≤≥≠≈%(),;/*^'"]|&[a-z]+;)*$/;
const LAT_RE=/(^|[^A-Za-z0-9؀-ۿ&#])([A-Z][A-Z0-9′']*|[a-z])(?![A-Za-z0-9;])/g;
function latWrap(h){
  return h.split(/(<svg[\s\S]*?<\/svg>)/).map((seg,i)=>{
    if(i%2) return seg;
    const stack=[]; let out='';
    for(const t of seg.split(/(<[^>]+>)/)){
      if(!t) continue;
      if(t[0]==='<'){
        if(/^<span\b/.test(t)) stack.push(/class="(m|mb|fr|lat|mrow|ref)"/.test(t));
        else if(t==='</span>') stack.pop();
        out+=t; continue;
      }
      const nb=t.replace(/(\d) (?=\d{3}(?!\d))/g,'$1 ');
      out+= stack.some(Boolean) ? nb : nb.replace(LAT_RE,'$1<span class="lat">$2</span>');
    }
    return out;
  }).join('');
}
function bidiFix(h){
  if(!h) return h;
  h=latWrap(h);
  if(h.indexOf('class="')<0) return h;
  const T=[]; let i=0;
  while(i<h.length){
    if(h[i]==='<'){
      const m=/^<span class="(m|fr|lat)">/.exec(h.slice(i,i+24));
      if(m){
        let depth=0,end=-1,x; const re=/<span\b[^>]*>|<\/span>/g; re.lastIndex=i;
        while((x=re.exec(h))){
          if(x[0]==='</span>'){ if(--depth===0){ end=x.index+7; break; } } else depth++;
        }
        if(end<0){ T.push({k:'txt',s:h.slice(i)}); break; }
        T.push({k:'math',s:h.slice(i,end)}); i=end; continue;
      }
      const g=h.indexOf('>',i);
      if(g<0){ T.push({k:'txt',s:h.slice(i)}); break; }
      T.push({k:'tag',s:h.slice(i,g+1)}); i=g+1; continue;
    }
    let g=h.indexOf('<',i); if(g<0) g=h.length;
    T.push({k:'txt',s:h.slice(i,g)}); i=g;
  }
  let out='',j=0;
  while(j<T.length){
    if(T[j].k!=='math'){ out+=T[j].s; j++; continue; }
    let end=j,k=j+1;
    while(k<T.length){
      if(T[k].k==='math'){ end=k; k++; continue; }
      if(T[k].k==='txt' && T[k].s.length<=25 && GLUE.test(T[k].s)
         && k+1<T.length && T[k+1].k==='math'){ k++; continue; }
      break;
    }
    const run=T.slice(j,end+1);
    const s=run.map(t=>t.s).join('');
    out += run.filter(t=>t.k==='math').length>=2 ? '<span class="mrow">'+s+'</span>' : s;
    j=end+1;
  }
  return out;
}
const fix=h=>LANG==='ar'?bidiFix(h):h;
