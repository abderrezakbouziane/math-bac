/* ============================================================================
   الحفظ المحلّي: التقدّم، كرّاسة الأخطاء (مراجعة متباعدة)، الأيام، الشارات، الإعدادات
   Enregistrement local : progression, carnet d'erreurs, jours, badges, réglages.
   كلّ قراءة أو كتابة محميّة: إن رفض المتصفّح الحفظ يعمل التطبيق عاديا في الذاكرة فقط.
   ============================================================================ */
const Store=(function(){
  const KEY='mathbac.v1', GAPS=[1,3,7];           /* الفواصل: يوم، ثلاثة أيام، أسبوع */
  const blank=()=>({v:1,les:{},q:[],mast:0,days:[],badges:{},bac:{},set:{theme:'auto',z:1,rate:0.9,lang:'ar'}});
  let P=blank(), persist=true;
  try{
    const t=localStorage.getItem(KEY);
    if(t){ const o=JSON.parse(t); if(o&&o.v===1) P=merge(blank(),o); }
  }catch(e){ persist=false; }
  function merge(b,o){ for(const k in b) if(o[k]!==undefined) b[k]=(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k]))?Object.assign(b[k],o[k]):o[k]; return b; }
  function save(){ if(!persist) return false; try{ localStorage.setItem(KEY,JSON.stringify(P)); return true; }catch(e){ persist=false; return false; } }
  const pad=n=>String(n).padStart(2,'0');
  const fmt=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  function today(){ return fmt(new Date()); }
  function addDays(s,n){ const d=new Date(s+'T12:00:00'); d.setDate(d.getDate()+n); return fmt(d); }
  function les(id){ return P.les[id]||(P.les[id]={ok:0,ko:0,h:[]}); }
  function markDay(){ const t=today(); if(!P.days.includes(t)){ P.days.push(t); P.days=P.days.slice(-120); } }
  function streak(){
    const set=new Set(P.days); let d=today(), n=0;
    if(!set.has(d)) d=addDays(d,-1);
    while(set.has(d)){ n++; d=addDays(d,-1); }
    return n;
  }
  function stars(id){
    const s=P.les[id]; if(!s) return 0;
    const acc=s.h.length?s.h.reduce((a,b)=>a+b,0)/s.h.length:0;
    return (s.ok>=30&&acc>=0.8)?3:s.ok>=15?2:s.ok>=5?1:0;
  }
  /* تسجيل نتيجة تمرين مولَّد */
  function record(lid,gi,success,run){
    const s=les(lid); success?s.ok++:s.ko++; s.h.push(success?1:0); if(s.h.length>10) s.h.shift();
    markDay();
    const t=today();
    if(run&&run.mode==='review'&&run.item){
      const it=P.q.find(x=>x.lid===run.item.lid&&x.gi===run.item.gi);
      if(it){
        if(success){ it.st++; if(it.st>=GAPS.length){ P.q=P.q.filter(x=>x!==it); P.mast++; } else it.due=addDays(t,GAPS[it.st]); }
        else { it.st=0; it.due=addDays(t,GAPS[0]); }
      }
    } else if(!success){
      const it=P.q.find(x=>x.lid===lid&&x.gi===gi);
      if(it){ it.st=0; it.due=addDays(t,GAPS[0]); }
      else { P.q.push({lid,gi,st:0,due:addDays(t,GAPS[0]),a:t}); if(P.q.length>80) P.q.shift(); }
    }
    const fresh=checkBadges(); save(); return fresh;
  }
  function due(){ const t=today(); return P.q.filter(x=>x.due<=t).sort((a,b)=>a.due<b.due?-1:1); }
  function upcoming(){ const t=today(); return P.q.filter(x=>x.due>t).sort((a,b)=>a.due<b.due?-1:1); }
  /* الشارات / badges */
  const BADGES=[
    ...L.filter(l=>!l.soon).map(l=>({id:'L'+l.id,ico:'★',t:B('متمكّن: '+l.t.ar,'Maîtrise : '+l.t.fr),d:B('ثلاث نجوم في الباب '+l.id,'Trois étoiles au chapitre '+l.id),test:()=>stars(l.id)>=3})),
    {id:'F1',ico:'✎',t:B('الانطلاقة','Premier pas'),d:B('أوّل إجابة صحيحة في مولّد التمارين','Première bonne réponse au générateur'),test:()=>Object.values(P.les).some(s=>s.ok>=1)},
    {id:'S3',ico:'◆',t:B('ثلاثة أيام متتالية','Trois jours d\'affilée'),d:B('تدرّبت ثلاثة أيام دون انقطاع','Tu t\'es entraîné(e) trois jours sans interruption'),test:()=>streak()>=3},
    {id:'S7',ico:'◆',t:B('أسبوع كامل','Une semaine entière'),d:B('سبعة أيام متتالية','Sept jours d\'affilée'),test:()=>streak()>=7},
    {id:'S30',ico:'◆',t:B('شهر من المثابرة','Un mois de persévérance'),d:B('ثلاثون يوما متتاليا','Trente jours d\'affilée'),test:()=>streak()>=30},
    {id:'R5',ico:'↺',t:B('أخطاء تحوّلت إلى مكاسب','Des erreurs devenues des acquis'),d:B('أتقنت 5 أنواع من تمارين كرّاسة الأخطاء','Tu as maîtrisé 5 types d\'exercices du carnet d\'erreurs'),test:()=>P.mast>=5},
    {id:'B1',ico:'▣',t:B('أوّل تمرين بكالوريا مصحَّح','Premier exercice BAC corrigé'),d:B('فتحت كلّ حلول تمرين بكالوريا وصحّحت نفسك','Tu as ouvert tous les corrigés d\'un exercice BAC'),test:()=>Object.values(P.bac).some(x=>x.done)},
    {id:'B6',ico:'▣',t:B('العلامة الكاملة','Note maximale'),d:B('العلامة الكاملة في تمرين بكالوريا','La note maximale à un exercice BAC'),test:()=>Object.values(P.bac).some(x=>x.done&&x.full)},
  ];
  function checkBadges(){
    const fresh=[];
    for(const b of BADGES) if(!P.badges[b.id] && b.test()){ P.badges[b.id]=today(); fresh.push(b); }
    return fresh;
  }
  function exportCode(){ return btoa(unescape(encodeURIComponent(JSON.stringify(P)))); }
  function importData(txt){
    let o=null; txt=String(txt||'').trim();
    try{ o=JSON.parse(txt); }catch(e){ try{ o=JSON.parse(decodeURIComponent(escape(atob(txt.replace(/\s+/g,''))))); }catch(e2){ o=null; } }
    if(!o||o.v!==1||typeof o.les!=='object'||!Array.isArray(o.q)) return false;
    P=merge(blank(),o); save(); return true;
  }
  return {
    get P(){ return P; }, persist:()=>persist, save, today, addDays, streak, stars, record, due, upcoming,
    BADGES, checkBadges, exportCode, importData, les,
    reset(){ P=blank(); save(); },
    setSetting(k,v){ P.set[k]=v; save(); },
    bacState(id){ return P.bac[id]||(P.bac[id]={hint:{},sol:{},tick:{},done:false,full:false}); },
    saveBac(){ markDay(); const f=checkBadges(); save(); return f; },
  };
})();
LANG=Store.P.set.lang==='fr'?'fr':'ar';

/* إشعار صغير عند الحصول على شارة جديدة / petite notification */
function toastBadges(list){
  if(!list||!list.length||typeof document.createElement!=='function') return;
  let el=document.getElementById('toast');
  if(!el){ el=document.createElement('div'); el.id='toast'; document.body.appendChild(el); }
  el.innerHTML=fix(list.map(b=>`<div class="tb"><span class="ti">${b.ico}</span><span><b>${b.h?tr(b.h):t('newBadge')}</b><br>${tr(b.t)}</span></div>`).join(''));
  el.classList.add('on'); clearTimeout(el._h); el._h=setTimeout(()=>el.classList.remove('on'),4200);
}

/* ============================================================================
   الواجهة — Interface
   ============================================================================ */
const $=s=>document.querySelector(s);
const S={view:'home', id:5, tab:'cours', dom:'all'};
const cur=()=>CH(S.id);
const ACTIVE=()=>L.filter(l=>!l.soon);
let streak=0, tries=0, ex=null, sel=null, genOn=(ACTIVE()[0]||L[0]).id;
const VIEWS={};
const lname=id=>{ const l=CH(id); return l?tr(l.t):''; };
const go=(view,extra)=>{ Object.assign(S,{view},extra||{}); render(); window.scrollTo(0,0); };

function setAcc(dom){
  const v=DOMAINS[dom]?DOMAINS[dom].v:'brand';
  const r=document.documentElement.style;
  r.setProperty('--acc','var(--'+v+')');
  r.setProperty('--acc-l','var(--'+v+'-l)');
  r.setProperty('--acc-d','var(--'+v+'-d)');
}
function paintYears(){
  const items=[['all',t('allDom')]].concat(Object.keys(DOMAINS).map(k=>[k,tr(DOMAINS[k].name)]));
  $('#years').innerHTML=items.map(([k,n])=>`<button class="ybtn ${S.dom===k?'on':''}" data-yr="${k}">${n}</button>`).join('');
  document.querySelectorAll('[data-yr]').forEach(b=>b.onclick=()=>{ S.dom=b.dataset.yr; go('home'); });
}
function paintTitle(){
  const sm=(a,b)=>`${a}<small>${b}</small>`;
  $('#ttl').innerHTML=fix(S.view==='lesson'?sm(tr(cur().t),`${t('chap')} <span class="lat">${cur().id}</span> · ${t('appSub')}`)
    : S.view==='quick'?sm(t('quickTitle'),t('quickSub'))
    : S.view==='progress'?sm(t('progTitle'),t('progSub'))
    : S.view==='practice'?sm(t('revH'),t('progTitle'))
    : sm(t('appName'),t('appSub')));
}

/* ---------------------------- الفهرس / Sommaire ---------------------------- */
function renderHome(){
  setAcc('alg');
  let h=`<div class="hero"><h2>${t('heroH')}</h2><p>${t('heroP')}</p><div class="hnote">${t('heroNote')}</div></div>`;
  h+=todayCard();
  for(const k of Object.keys(DOMAINS)){
    if(S.dom!=='all' && S.dom!==k) continue;
    const grp=L.filter(l=>l.dom===k); if(!grp.length) continue;
    h+=`<div class="domain" style="--acc:var(--${DOMAINS[k].v})"><span>${tr(DOMAINS[k].name)}</span><hr></div>`;
    grp.forEach(l=>{
      h+=`<button class="lcard ${l.soon?'soon':''}" ${l.soon?'disabled':''} data-go="${l.id}" style="--acc-l:var(--${DOMAINS[k].v}-l);--acc-d:var(--${DOMAINS[k].v})">
        <span class="lnum">${l.id}</span>
        <span><b>${tr(l.t)}</b><em>${t('chap')} <span class="lat">${l.id}</span> · ${l.soon?`<span class="tsoon">${t('soon')}</span>`:t('tabsN')}</em>
        ${l.soon?'':`<em class="prog">${starTxt(Store.stars(l.id))}</em>`}</span></button>`;
    });
  }
  h+=`<div class="note">${t('progNote')}</div>`;
  $('#app').innerHTML=fix(h);
  wireToday();
  document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{ if(b.disabled) return; ex=null; go('lesson',{id:+b.dataset.go,tab:'cours'}); });
}
function todayCard(){
  const d=Store.due().length, st=Store.streak();
  return `<div class="card today">
    <div class="tgrid">
      <div class="tile"><b class="lat">${st}</b><span>${st===1?t('dayOne'):t('daysRow')}</span></div>
      <div class="tile"><b class="lat">${d}</b><span>${t('toReview')}</span></div>
      <div class="tile"><b class="lat">${Object.keys(Store.P.badges).length}</b><span>${t('badgesW')}</span></div>
    </div>
    <div class="btnrow">
      ${d?`<button class="btn" id="hRev">${t('revH')} (<span class="lat">${d}</span>)</button>`:''}
      <button class="btn ${d?'sec2':''}" id="hEx">${t('nav_quick')}</button>
      <button class="btn sec2" id="hProg">${t('progTitle')}</button>
    </div></div>`;
}
function wireToday(){
  const b=(id,fn)=>{ const e=$('#'+id); if(e) e.onclick=fn; };
  b('hRev',startReview); b('hEx',()=>go('quick')); b('hProg',()=>go('progress'));
}

/* ---------------------------- الدرس / Leçon ---------------------------- */
const TABS=['cours','analogie','vie','noyau','methode','lab','bac','gen'];
function tabsFor(l){ return TABS.filter(k=>k==='lab'?!!LABS[l.id]:k==='bac'?!!BAC[l.id]:k==='gen'?!!GEN[l.id]:!!l[k]); }
function renderLesson(){
  const l=cur(); if(!l||l.soon){ S.view='home'; return renderHome(); }
  setAcc(l.dom);
  const act=ACTIVE(), i=act.indexOf(l), prev=act[i-1], next=act[i+1];
  let h=`<div class="crumb"><b>${tr(DOMAINS[l.dom].name)}</b> · ${t('chap')} <span class="lat">${l.id}</span></div>
   <h2 class="ltitle"><span class="lat">${l.id}</span>. ${tr(l.t)}</h2>
   <div class="hook">${tr(l.hook)}</div>
   <div class="tabs">${tabsFor(l).map(k=>`<button class="tab ${S.tab===k?'on':''} ${k==='lab'?'labtab':''} ${k==='bac'?'mix':''}" data-tab="${k}">${t('tab_'+k)}</button>`).join('')}</div>
   ${['gen','lab','bac'].includes(S.tab)?'':`<div class="speak noprint"><button class="btn sec2 small" id="spk">${t('listen')}</button><span id="spkmsg"></span></div>`}
   <div id="pane" class="pane-${S.tab}"></div>
   <div class="btnrow" style="margin:16px 0 4px">
   ${prev?`<button class="btn sec2" data-nav="${prev.id}">${t('prevChap')} <span class="lat">${prev.id}</span></button>`:''}
   ${next?`<button class="btn" data-nav="${next.id}">${t('nextChap')} <span class="lat">${next.id}</span>${t('nextArrow')}</button>`:''}
   </div>`;
  $('#app').innerHTML=fix(h);
  document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{
    stopSpeech(); S.tab=b.dataset.tab; if(S.tab==='gen'&&RUN.mode!=='free') RUN={mode:'free'}; renderLesson(); window.scrollTo(0,0); });
  const sp=$('#spk'); if(sp) sp.onclick=()=>toggleSpeech($('#pane'));
  document.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>{ ex=null; go('lesson',{id:+b.dataset.nav,tab:'cours'}); });
  paint();
}
function paint(){
  const p=$('#pane'), l=cur();
  if(!tabsFor(l).includes(S.tab)) S.tab='cours';
  if(S.tab==='gen'){ if(RUN.mode!=='free') RUN={mode:'free'}; p.innerHTML=fix(genShell(l)); wireGen(); if(!ex||ex.lid!==l.id) newEx(l.id); else paintEx(); return; }
  if(S.tab==='lab') return LABS[l.id](p);
  if(S.tab==='bac') return paintBac(l,p);
  p.innerHTML=fix(tr(l[S.tab])+(S.tab==='noyau'?glossCard(l):''));
}
function glossCard(l){
  if(!l.gloss) return '';
  return `<div class="card"><h3>${tr(B('المصطلحات بالعربية والفرنسية','Vocabulaire arabe — français'))}</h3>
   <table class="dt gl"><tr><th>العربية</th><th>Français</th></tr>${l.gloss.map(g=>`<tr><td dir="rtl">${g[0]}</td><td dir="ltr">${g[1]}</td></tr>`).join('')}</table>
   <p class="note">${tr(B('في الجامعة تُدرَّس الرياضيات والعلوم بالفرنسية غالبا: حفظ هذه المصطلحات الآن يسهّل عليك الانتقال.','À l\'université, les mathématiques et les sciences sont souvent enseignées en français : retenir ce vocabulaire dès maintenant facilite la transition.'))}</p></div>`;
}

/* ---------------------- تمرين البكالوريا / Exercice type BAC ---------------------- */
const ptsTxt=p=>`<span class="lat">${String(p).replace('.',',')}</span> ${t('pts')}`;
function bacGot(X,s,i){ return X.parts[i].sol.reduce((a,x,j)=>a+(s.tick[i+'-'+j]?x[1]:0),0); }
function bacScore(X,s){ return X.parts.reduce((a,_,i)=>a+bacGot(X,s,i),0); }
function bacMsg(X,s){
  const done=X.parts.every((_,i)=>s.sol[i]), sc=bacScore(X,s), r=sc/X.pts;
  return !done?t('bacMsgNone'):r>=0.8?t('bacMsgTop'):r>=0.5?t('bacMsgMid'):t('bacMsgLow');
}
function paintBac(l,p){
  const X=BAC[l.id], s=Store.bacState(l.id);
  const sc=()=>`<span class="lat">${String(Math.round(bacScore(X,s)*100)/100).replace('.',',')} / ${X.pts}</span>`;
  let h=`<div class="card scorecard"><div class="exhead"><h3>${tr(X.t)}</h3><span class="ptsb big" id="bacScore">${sc()}</span></div>
    <p class="qtext">${tr(X.st)}</p><p class="note">${t('bacHow')}</p><p class="exsum" id="bacMsg">${bacMsg(X,s)}</p></div>`;
  X.parts.forEach((P,i)=>{
    h+=`<div class="card"><div class="exhead"><h3>${LANG==='ar'?P.n:P.nf}</h3><span class="ptsb">${ptsTxt(P.p)}</span></div>
      <div class="qtext">${tr(P.q)}</div>
      <div class="btnrow noprint"><button class="btn sec2 small" data-bh="${i}">${s.hint[i]?t('hideHint'):t('hint')}</button>
        <button class="btn small" data-bs="${i}">${s.sol[i]?t('hideCorr'):t('corr')}</button></div>
      <div class="hintbox ${s.hint[i]?'on':''}"><b>${t('hint')} :</b> ${tr(P.hint)}</div>
      <div class="solbox ${s.sol[i]?'on':''}"><div class="soltip">${t('tickTip')}</div>
       ${P.sol.map((x,j)=>`<label class="solrow"><input type="checkbox" data-bt="${i}-${j}" ${s.tick[i+'-'+j]?'checked':''}><span class="st2">${tr(x[0])}</span><span class="sp">${ptsTxt(x[1])}</span></label>`).join('')}
       <div class="exsum" id="bsum${i}">${t('qMark')}<b>${ptsTxt(bacGot(X,s,i))}</b> / ${ptsTxt(P.p)}</div></div></div>`;
  });
  h+=`<div class="btnrow noprint"><button class="btn warnb small" id="bacReset">${t('bacReset')}</button></div>`;
  p.innerHTML=fix(h);
  const upd=()=>{ s.done=X.parts.every((_,i)=>s.sol[i]); s.full=s.done&&Math.abs(bacScore(X,s)-X.pts)<1e-9;
    const fr=Store.saveBac(); $('#bacScore').innerHTML=sc(); $('#bacMsg').innerHTML=fix(bacMsg(X,s)); if(fr.length) toastBadges(fr); };
  p.querySelectorAll('[data-bh]').forEach(b=>b.onclick=()=>{ const i=b.dataset.bh; s.hint[i]=!s.hint[i]; Store.save(); paintBac(l,p); });
  p.querySelectorAll('[data-bs]').forEach(b=>b.onclick=()=>{ const i=b.dataset.bs; s.sol[i]=!s.sol[i]; upd(); paintBac(l,p); });
  p.querySelectorAll('[data-bt]').forEach(c=>c.onchange=()=>{ const k=c.dataset.bt, i=+k.split('-')[0]; s.tick[k]=c.checked; upd();
    $('#bsum'+i).innerHTML=fix(`${t('qMark')}<b>${ptsTxt(bacGot(X,s,i))}</b> / ${ptsTxt(X.parts[i].p)}`); });
  $('#bacReset').onclick=()=>{ Object.assign(s,{hint:{},sol:{},tick:{}}); Store.save(); paintBac(l,p); };
}

/* -------------------- تمارين من كلّ الأبواب / Exercices -------------------- */
let RUN={mode:'free'};          /* free | review — يحدّد مصير النتيجة والتمرين الموالي */
function renderQuick(){
  if(RUN.mode!=='free') RUN={mode:'free'};
  const act=ACTIVE(); if(!act.find(x=>x.id===genOn)) genOn=act[0].id;
  const l=CH(genOn); setAcc(l.dom);
  let h=`<div class="crumb"><b>${t('quickTitle')}</b> · ${t('quickSub')}</div>
   <h2 class="ltitle">${t('quickH')}</h2>
   <div class="pageref">${t('quickRef')}</div>
   <div class="tabs">${act.map(x=>`<button class="tab ${x.id===genOn?'on':''}" data-gl="${x.id}"><span class="lat">${x.id}</span>. ${tr(x.t)}</button>`).join('')}</div>
   <div id="pane" class="pane-gen"></div>`;
  $('#app').innerHTML=fix(h);
  $('#pane').innerHTML=fix(genShell(l)); wireGen();
  if(!ex||ex.lid!==genOn) newEx(genOn); else paintEx();
  document.querySelectorAll('[data-gl]').forEach(b=>b.onclick=()=>{ genOn=+b.dataset.gl; ex=null; renderQuick(); window.scrollTo(0,0); });
}

/* ---------------------- مولّد التمارين / Générateur ---------------------- */
function genShell(l){
  return `<div class="gen">
    <div class="top2"><h3 id="gtitle">${t('genTitle')}${tr(l.t)}</h3><span class="score" id="score"></span></div>
    <div class="body">
      <div id="runbar"></div>
      <div class="qbox" id="q"><span class="tag" id="qtag">${t('genTag')}</span><div id="qt"></div></div>
      <div id="ansArea"></div>
      <div class="btnrow">
        <button class="btn" id="check">${t('check')}</button>
        <button class="btn sec2" id="next">${t('newEx')}</button>
        <button class="btn warnb" id="show">${t('showSol')}</button>
      </div>
      <div class="fb" id="fb"></div>
      <div id="scrg">${scratchHTML()}</div>
      <p class="help">${t('genHelp')}</p>
    </div></div>`;
}
function wireGen(){
  $('#next').onclick=()=>{ if(RUN.next) RUN.next(); else newEx(ex?ex.lid:cur().id); };
  $('#check').onclick=judge;
  $('#show').onclick=reveal;
}
function makeEx(lid,gi){
  const g=GEN[lid], k=(gi==null||gi>=g.length)?Math.floor(Math.random()*g.length):gi;
  const e=g[k](); e.lid=lid; e.gi=k; e.done=false; return e;
}
let EXUID=0;
function newEx(lid,gi){ sel=null; tries=0; ex=makeEx(lid,gi); ex.uid=++EXUID; paintEx(); }
function paintEx(){
  $('#qt').innerHTML=fix(tr(ex.q));
  const tag=$('#qtag'); if(tag) tag.innerHTML=fix(`${t('genTag')} · ${t('chap')} <span class="lat">${ex.lid}</span> · ${lname(ex.lid)}`);
  $('#score').textContent=t('streak')+streak;
  const rb=$('#runbar'); if(rb) rb.innerHTML=fix(RUN.bar?RUN.bar():'');
  const a=$('#ansArea');
  if(ex.type==='choice'){
    a.innerHTML=fix(`<div class="choices">${ex.opts.map(o=>`<button class="choice ${sel===o.k?'sel':''}" data-k="${o.k}">${tr(o)}</button>`).join('')}</div>`);
    a.querySelectorAll('.choice').forEach(b=>b.onclick=()=>{
      sel=b.dataset.k;
      a.querySelectorAll('.choice').forEach(x=>x.classList.remove('sel'));
      b.classList.add('sel');});
  }else{
    a.innerHTML=`<div class="answer"><input type="text" id="inp" placeholder="${ex.type==='exprn'?t('phN'):t('ph')}" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="text"></div>`;
    $('#inp').addEventListener('keydown',e=>{if(e.key==='Enter')judge();});
    attachPad($('#inp'),ex.type,a);
  }
  const fb=$('#fb'); fb.className='fb'; fb.innerHTML='';
  const sg=$('#scrg'); if(sg){ sg.innerHTML=scratchHTML(); wireScratch(sg,'gen:'+ex.uid); }
}
/* نهاية التمرين: تُسجَّل النتيجة مرّة واحدة فقط (نجاح = جواب صحيح قبل ظهور الحلّ) */
function finishEx(success){
  if(!ex||ex.done) return; ex.done=true;
  const fresh=Store.record(ex.lid,ex.gi,success,RUN);
  if(RUN.onDone) RUN.onDone(success);
  if(fresh&&fresh.length) toastBadges(fresh);
}
function ok(){
  streak++;
  const fb=$('#fb'); fb.className='fb good show';
  fb.innerHTML=fix(`<h4>${pick(t('okMsgs'))}</h4><div class="sol"><b>${t('fullSteps')}</b>${tr(ex.sol)}</div>${RUN.after?RUN.after(true):''}`);
  $('#score').textContent=t('streak')+streak;
  finishEx(true);
}
function bad(msg){
  const fb=$('#fb'); fb.className='fb bad show';
  if(tries<2){
    fb.innerHTML=fix(`<h4>${t('notYet')}</h4><p>${msg||t('retry')} ${t('oneMore')}</p>`);
  }else{
    streak=0;
    fb.innerHTML=fix(`<h4>${t('okFail')}</h4><p>${msg||''} ${t('hereSol')}</p>
     <div class="sol">${tr(ex.sol)}</div><p class="carnet">${t('carnet')}</p>${RUN.after?RUN.after(false):''}`);
    $('#score').textContent=t('streak')+'0';
    finishEx(false);
  }
}
function reveal(){
  const fb=$('#fb'); fb.className='fb bad show';
  fb.innerHTML=fix(`<h4>${t('solTitle')}</h4><div class="sol">${tr(ex.sol)}</div>
   <p style="margin-top:8px">${t('solThen')}</p>${ex.done?'':`<p class="carnet">${t('carnetShort')}</p>`}${RUN.after&&!ex.done?RUN.after(false):''}`);
  streak=0; $('#score').textContent=t('streak')+'0';
  finishEx(false);
}

/* ---------------------- التصحيح: دالة صافية / correction : fonction pure ----------------------
   ترجع {s:'ok'|'bad'|'empty', m:رسالة}. «empty» لا يُحتسب محاولة. */
const DX=m=>`<b>${t('dx')}</b> ${tr(m)}`;
function near(a,b,tol){ return Math.abs(a-b)<=tol; }
function checkAnswer(e,raw,choice){
  if(e.type==='choice'){
    if(!choice) return {s:'empty',m:t('chooseFirst')};
    if(choice===e.ans) return {s:'ok'};
    return {s:'bad',m:(e.why&&e.why[choice])?DX(e.why[choice]):t('wrongChoice')};
  }
  raw=raw==null?'':String(raw);
  if(!raw.trim()) return {s:'empty',m:t('empty')};
  if(e.type==='exprn'){
    if(isNaN(pexprN(raw,1))) return {s:'bad',m:t('exprParse')};
    if(sameSeq(raw,e.fn)) return {s:'ok'};
    for(const [fm,m] of (e.missF||[])) if(!sameFnN(fm,e.fn) && sameSeq(raw,fm)) return {s:'bad',m:DX(m)};
    return {s:'bad',m:t('exprBad')};
  }
  const v=pnum(raw);
  if(isNaN(v)) return {s:'bad',m:t('numParse')};
  const tol=e.tol!=null?e.tol:Math.max(1e-6,Math.abs(e.ans)*1e-9);
  if(near(v,e.ans,tol)) return {s:'ok'};
  for(const [w,m] of (e.miss||[])) if(isFinite(w) && near(v,w,tol) && !near(w,e.ans,tol)) return {s:'bad',m:DX(m)};
  if(near(v,-e.ans,tol)) return {s:'bad',m:DX(t('signWrong'))};
  return {s:'bad',m:t('wrong')};
}
function judge(){
  if(!ex) return;
  const fb=$('#fb');
  if(ex.done){ fb.className='fb good show';
    if(!fb.innerHTML.includes('class="nextnote"')) fb.innerHTML+=fix(`<p class="nextnote">${t('exDone')}</p>`); return; }
  const r=checkAnswer(ex, $('#inp')?$('#inp').value:'', sel);
  if(r.s==='empty'){ fb.className='fb bad show'; fb.innerHTML=fix(`<p>${r.m}</p>`); return; }
  tries++;
  return r.s==='ok'?ok():bad(r.m);
}

/* ---------- جلسة مراجعة كرّاسة الأخطاء / séance de révision ---------- */
function startRun(kind,list){
  if(!list.length) return;
  RUN={mode:kind,items:list.slice(),i:0,ok:0,
    get item(){ return this.items[this.i]; },
    next(){ if(this.i<this.items.length-1){ this.i++; newEx(this.item.lid,this.item.gi); nextLabel(); } else endRun(); },
    bar(){ const n=this.items.length, k=this.i+1;
      return `<div class="runbar"><b>${t('revH')}</b> — ${t('exOf')}<span class="lat">${k}</span>${t('of')}<span class="lat">${n}</span>
        <span class="rbar"><i style="width:${Math.round(100*(this.i)/n)}%"></i></span></div>`; },
    onDone(s){ if(s) this.ok++; },
    after(){ return `<p class="nextnote">${this.i<this.items.length-1?t('pressNext'):t('pressEnd')}</p>`; },
  };
  ex=null; go('practice');
}
function nextLabel(){ const nb=$('#next'); if(nb&&RUN.items) nb.textContent=RUN.i<RUN.items.length-1?t('nextOne'):t('endRun'); }
function endRun(){ const r=RUN; RUN={mode:'done',ok:r.ok,n:r.items.length}; render(); }
function startReview(){ startRun('review',Store.due().map(x=>({lid:x.lid,gi:x.gi}))); }
VIEWS.practice=function(){
  setAcc('alg');
  if(RUN.mode==='done'){
    const d=RUN, msg=d.ok===d.n?t('resAll'):d.ok>=d.n/2?t('resHalf'):t('resLow');
    $('#app').innerHTML=fix(`<div class="crumb"><b>${t('revH')}</b></div>
      <h2 class="ltitle">${t('runEnd')}</h2>
      <div class="card scorecard"><div class="exhead"><h3>${t('yourRes')}</h3><span class="ptsb big"><span class="lat">${d.ok} / ${d.n}</span></span></div><p>${msg}</p>
      <div class="btnrow"><button class="btn" id="goProg">${t('backProg')}</button></div></div>`);
    $('#goProg').onclick=()=>{ RUN={mode:'free'}; go('progress'); };
    return;
  }
  if(!RUN.items){ S.view='progress'; return VIEWS.progress(); }
  const it=RUN.item, l=CH(it.lid); setAcc(l.dom);
  $('#app').innerHTML=fix(`<div class="crumb"><b>${t('revH')}</b></div>
    <h2 class="ltitle">${t('revTitle')}</h2><div class="pageref">${t('revRef')}</div><div id="pane" class="pane-gen"></div>`);
  $('#pane').innerHTML=fix(genShell(l)); wireGen(); nextLabel();
  if(!ex||ex.lid!==it.lid||(it.gi!=null&&ex.gi!==it.gi)) newEx(it.lid,it.gi); else paintEx();
};

/* ---------------------------- تقدّمي / Mes progrès ---------------------------- */
function whenTxt(d){
  const n=Math.round((new Date(d+'T12:00:00')-new Date(Store.today()+'T12:00:00'))/864e5);
  if(n<=0) return t('today'); if(n===1) return t('tomorrow'); if(n===2) return t('in2');
  if(n<=10) return t('inN')+'<span class="lat">'+n+'</span>'+t('daysW');
  const p=d.split('-'); return '<span class="lat">'+p[2]+'/'+p[1]+'</span>';
}
function starTxt(n){ return '<span class="stars">'+'★'.repeat(n)+'<i>'+'★'.repeat(3-n)+'</i></span>'; }
VIEWS.progress=function(){
  setAcc('alg');
  const P=Store.P, due=Store.due(), up=Store.upcoming(), st=Store.streak();
  const okTot=Object.values(P.les).reduce((a,s)=>a+s.ok,0);
  const earned=Store.BADGES.filter(b=>P.badges[b.id]);
  let h=`<div class="crumb"><b>${t('progTitle')}</b></div><h2 class="ltitle">${t('progH')}</h2>
   <div class="tgrid big">
    <div class="tile"><b class="lat">${st}</b><span>${st===1?t('dayOne'):t('daysRow')}</span></div>
    <div class="tile"><b class="lat">${okTot}</b><span>${t('okAnswers')}</span></div>
    <div class="tile"><b class="lat">${earned.length}</b><span>${t('badgesOf')}<span class="lat">${Store.BADGES.length}</span></span></div>
   </div>
   ${Store.persist()?'':`<div class="warn">${t('noSave')}</div>`}
   <div class="card"><h3>${t('carnetH')}</h3>
    ${due.length?`<p>${t('dueN')}<b><span class="lat">${due.length}</span></b>${t('dueTail')}</p>
      <div class="btnrow"><button class="btn" id="pRev">${t('startRev')}</button></div>`
     :`<p>${t('nothingDue')}${up.length?`${t('nextRev')}<b>${whenTxt(up[0].due)}</b>${t('waiting')}<span class="lat">${up.length}</span>.`:t('autoNote')}</p>`}
    <p class="note">${t('carnetHow')}</p>
    ${P.q.length?`<details><summary>${t('carnetIn')} (<span class="lat">${P.q.length}</span>)</summary><ul class="qlist">${P.q.map(x=>`<li>${t('chap')} <span class="lat">${x.lid}</span> — ${lname(x.lid)} · ${t('stage')} <span class="lat">${x.st+1}/3</span> · ${t('when')}${whenTxt(x.due)}</li>`).join('')}</ul></details>`:''}
   </div>
   <div class="card"><h3>${t('mapH')}</h3><p class="note">${t('mapNote')}</p>
    <div class="map">${Object.keys(DOMAINS).map(k=>`<div class="mrowd"><div class="mdom" style="--acc:var(--${DOMAINS[k].v})">${tr(DOMAINS[k].name)}</div><div class="stations">${
      L.filter(l=>l.dom===k).map(l=>{ const s=Store.stars(l.id), on=P.les[l.id];
        return `<button class="station s${s} ${on?'seen':''}" ${l.soon?'disabled':''} data-go4="${l.id}" style="--acc:var(--${DOMAINS[k].v})"><span class="snum lat">${l.id}</span><span class="sname">${tr(l.t)}</span>${l.soon?`<span class="tsoon">${t('soon')}</span>`:starTxt(s)}</button>`;}).join('')}</div></div>`).join('')}</div>
   </div>
   <div class="card"><h3>${t('myBadges')}</h3><div class="badges">${Store.BADGES.map(b=>`<div class="badge ${P.badges[b.id]?'on':''}"><span class="bi">${b.ico}</span><b>${tr(b.t)}</b><small>${tr(b.d)}</small></div>`).join('')}</div></div>
   <div class="card" id="backup"><h3>${t('backupH')}</h3><p>${t('backupP')}</p>
    <div class="btnrow"><button class="btn sec2" id="bCopy">${t('showCode')}</button><button class="btn sec2" id="bFile">${t('dlFile')}</button></div>
    <textarea id="bCode" class="code" rows="3" placeholder="${t('pasteCode')}"></textarea>
    <div class="btnrow"><button class="btn" id="bImp">${t('impCode')}</button><label class="btn sec2 filebtn">${t('impFile')}<input type="file" id="bIn" accept=".json,.txt,application/json,text/plain"></label></div>
    <p id="bMsg" class="note"></p>
   </div>`;
  $('#app').innerHTML=fix(h);
  const on=(id,fn)=>{ const e=$('#'+id); if(e) e.onclick=fn; };
  on('pRev',startReview);
  document.querySelectorAll('[data-go4]').forEach(b=>b.onclick=()=>{ if(b.disabled) return; ex=null; go('lesson',{id:+b.dataset.go4,tab:'cours'}); });
  on('bCopy',()=>{ const x=$('#bCode'); x.value=Store.exportCode(); if(x.select) x.select(); $('#bMsg').textContent=t('codeShown'); });
  on('bFile',()=>downloadText('mathbac-progress-'+Store.today()+'.json',JSON.stringify(Store.P)));
  const imp=okk=>{ $('#bMsg').textContent=okk?t('impOk'):t('impBad'); if(okk){ LANG=Store.P.set.lang==='fr'?'fr':'ar'; setTimeout(()=>{ applySettings(); applyLang(); render(); },600); } };
  on('bImp',()=>imp(Store.importData($('#bCode').value)));
  const fi=$('#bIn'); if(fi) fi.onchange=()=>{ const fl=fi.files&&fi.files[0]; if(!fl) return; const r=new FileReader();
    r.onload=()=>imp(Store.importData(r.result)); r.readAsText(fl); };
};
function downloadText(name,text){
  try{ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([text],{type:'application/json'})); a.download=name;
    document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },500); }catch(e){}
}

/* ---------------------------- الإعدادات / Réglages ---------------------------- */
let mqDark=null;
function applySettings(){
  const s=Store.P.set, root=document.documentElement;
  if(!mqDark&&window.matchMedia){ mqDark=window.matchMedia('(prefers-color-scheme: dark)'); try{ mqDark.addEventListener('change',applySettings); }catch(e){ try{ mqDark.addListener(applySettings); }catch(_){} } }
  const dark=s.theme==='dark'||(s.theme==='auto'&&mqDark&&mqDark.matches);
  root.classList.toggle('dk',!!dark); root.dataset.theme=s.theme;
  const z=[0.9,1,1.1,1.2,1.35].includes(+s.z)?+s.z:1;
  root.style.setProperty('--z',z);
  const m=document.querySelector('meta[name="theme-color"]'); if(m) m.setAttribute('content',dark?'#123E35':'#0F5C4E');
}
function applyLang(){
  const root=document.documentElement;
  root.lang=LANG; root.dir=LANG==='ar'?'rtl':'ltr';
  const lb=$('#lng'); lb.textContent=t('langBtn'); lb.setAttribute('aria-label',t('langAria'));
  $('#home').setAttribute('aria-label',t('menuAria'));
  document.title=t('appName')+' — '+t('appSub');
  const cn=t('creditName');
  $('#cred').innerHTML=fix(`${cn&&cn!=='creditName'?`<div>${t('credit')}<b>${cn}</b></div>`:''}
    <div class="cpy"><div class="cpt">${t('cpt')} — <span class="lat">2026</span></div>${t('cpy')}</div>`);
  renderNav();
}
function setLang(l){ if(l===LANG) return; stopSpeech(); LANG=l; Store.setSetting('lang',l); applyLang(); render(); }
function openSettings(){
  const s=Store.P.set, sp=speechInfo();
  const seg=(k,items,cv)=>`<div class="seg">${items.map(([v,x])=>`<button class="${String(cv)===String(v)?'on':''}" data-set="${k}" data-v="${v}">${x}</button>`).join('')}</div>`;
  openSheet(`<h3 style="font-size:17px;margin-bottom:10px">${t('setTitle')}</h3>
   <div class="card"><h3>${t('setLang')}</h3>${seg('lang',[['ar','العربية'],['fr','Français']],LANG)}</div>
   ${instCardHTML()}
   <div class="card"><h3>${t('setTheme')}</h3>${seg('theme',[['auto',t('thAuto')],['light',t('thLight')],['dark',t('thDark')]],s.theme)}</div>
   <div class="card"><h3>${t('setPad')}</h3>${seg('pad',[['auto',t('padAuto')],['on',t('padOn')],['off',t('padOff')]],s.pad||'auto')}
     <p class="note">${t('padNote')}</p></div>
   <div class="card"><h3>${t('setZ')}</h3>${seg('z',[[0.9,t('z09')],[1,t('z1')],[1.1,t('z11')],[1.2,t('z12')],[1.35,t('z135')]],s.z)}
     <p class="note">${t('zNote')}</p></div>
   <div class="card"><h3>${t('setSpeech')}</h3>
     <label class="sl"><span>${t('speed')}<b class="lat" id="rtv">${ar(s.rate)}</b></span><input type="range" id="rt" min="0.6" max="1.3" step="0.1" value="${s.rate}"></label>
     <p class="note">${sp.msg}</p>
     <div class="btnrow"><button class="btn sec2 small" id="rtTry" ${sp.ok?'':'disabled'}>${t('tryVoice')}</button></div></div>
   <div class="card"><h3>${t('setSaved')}</h3><p class="note">${Store.persist()?t('savedOk'):t('savedNo')}</p>
     <div class="btnrow"><button class="btn warnb small" id="rst">${t('resetAll')}</button></div><p class="note" id="rstm"></p></div>
   <div class="btnrow"><button class="btn sec2" id="stx">${t('close')}</button></div>`);
  document.querySelectorAll('[data-set]').forEach(b=>b.onclick=()=>{ const k=b.dataset.set, v=k==='z'?+b.dataset.v:b.dataset.v;
    if(k==='lang'){ setLang(v); return openSettings(); }
    Store.setSetting(k,v); if(k==='pad') PADON=null; applySettings(); openSettings(); });
  const rt=$('#rt'); rt.oninput=()=>{ $('#rtv').textContent=ar(+rt.value); Store.setSetting('rate',+rt.value); };
  $('#rtTry').onclick=()=>speakText(t('voiceTest'));
  let armed=false;
  $('#rst').onclick=()=>{ if(!armed){ armed=true; $('#rstm').textContent=t('resetSure'); $('#rst').textContent=t('resetYes'); return; }
    const keep=Object.assign({},Store.P.set); Store.reset(); Object.assign(Store.P.set,keep); Store.save(); closeSheet(); render(); };
  $('#stx').onclick=closeSheet; instWire();
}

/* ---------------------------- القراءة الصوتية / lecture à voix haute ----------------------------
   تعتمد على أصوات الجهاز (Web Speech API): صوت عربي أو فرنسي حسب لغة التطبيق. */
const SP={on:false};
function pickVoice(){
  const ss=window.speechSynthesis; if(!ss||!ss.getVoices) return null;
  const re=LANG==='ar'?/^ar(\b|[-_])/i:/^fr(\b|[-_])/i;
  const v=ss.getVoices().filter(x=>re.test(x.lang||''));
  return LANG==='ar'?(v.find(x=>/DZ|MA|TN/i.test(x.lang))||v.find(x=>/SA/i.test(x.lang))||v[0]||null):(v.find(x=>/FR/i.test(x.lang))||v[0]||null);
}
function speechInfo(){
  if(!('speechSynthesis' in window)||typeof SpeechSynthesisUtterance==='undefined') return {ok:false,msg:t('noSpeech')};
  const v=pickVoice();
  return v?{ok:true,msg:`${t('voiceUsed')}<span class="lat">${v.name} (${v.lang})</span>${t('voiceApprox')}`}:{ok:false,msg:t('noVoice')};
}
function chunks(x){
  const out=[]; for(const part of x.replace(/([.!؟?:؛;\n])\s+/g,'$1\u0001').split('\u0001')){ let p=part.trim(); while(p.length>220){ const c=Math.max(p.lastIndexOf('،',220),p.lastIndexOf(',',220)); const k=c>60?c+1:220; out.push(p.slice(0,k)); p=p.slice(k).trim(); } if(p) out.push(p); }
  return out;
}
function speakText(x,onEnd){
  const ss=window.speechSynthesis, v=pickVoice(); if(!ss||!v) return false;
  ss.cancel(); const parts=chunks(x); let i=0;
  const next=()=>{ if(!SP.on) return; if(i>=parts.length){ SP.on=false; if(onEnd) onEnd(); return; }
    const u=new SpeechSynthesisUtterance(parts[i++]); u.voice=v; u.lang=v.lang; u.rate=+Store.P.set.rate||0.9;
    u.onend=next; u.onerror=()=>{ SP.on=false; if(onEnd) onEnd(); }; ss.speak(u); };
  SP.on=true; next(); return true;
}
function paneText(el){
  const fr=LANG==='fr', c=el.cloneNode(true);
  c.querySelectorAll('svg,.ref,button,input,.noread').forEach(x=>x.remove());
  c.querySelectorAll('.fr').forEach(x=>{ const s=x.children; if(s.length===2) x.textContent=' '+s[0].textContent+(fr?' sur ':' على ')+s[1].textContent+' '; });
  c.querySelectorAll('sub').forEach(x=>{ x.textContent=' '+x.textContent+' '; });
  c.querySelectorAll('sup').forEach(x=>{ x.textContent=(fr?' puissance ':' أس ')+x.textContent+' '; });
  c.querySelectorAll('li,p,div,h3,h4,tr').forEach(x=>x.appendChild(document.createTextNode('. ')));
  const R=fr?{'²':' au carré ','×':' fois ','−':' moins ','≤':' inférieur ou égal à ','≥':' supérieur ou égal à ','→':' tend vers ','∞':' l\'infini ','≠':' différent de '}
            :{'²':' مربّع ','×':' ضرب ','−':' ناقص ','≤':' أصغر من أو يساوي ','≥':' أكبر من أو يساوي ','→':' يؤول إلى ','∞':' ما لا نهاية ','≠':' يختلف عن '};
  let s=c.textContent||''; for(const k in R) s=s.split(k).join(R[k]);
  return s.replace(/\s*\.\s*(\.\s*)+/g,'. ').replace(/\s+/g,' ').trim();
}
function stopSpeech(){
  SP.on=false; try{ if(window.speechSynthesis) window.speechSynthesis.cancel(); }catch(e){}
  const b=document.getElementById('spk'); if(b) b.textContent=t('listen');
}
function toggleSpeech(el){
  const b=$('#spk'), m=$('#spkmsg');
  if(SP.on){ stopSpeech(); return; }
  const info=speechInfo(); if(!info.ok){ if(m) m.innerHTML=fix(`<span class="note">${info.msg}</span>`); return; }
  if(m) m.innerHTML='';
  if(speakText(paneText(el),()=>{ if(b) b.textContent=t('listen'); })&&b) b.textContent=t('stopListen');
}

/* ---------------------------- لوحة المفاتيح الرياضية + المسودّة / clavier + brouillon ----------------------------
   على الهاتف (مؤشّر لمسي) تظهر اللوحة مكان لوحة الجهاز، مع زرّ للرجوع إليها. */
const COARSE=(function(){ try{ return !!(window.matchMedia&&window.matchMedia('(pointer: coarse)').matches); }catch(e){ return false; } })();
const PAD_EX={num:['/','(',')','^'],exprn:['n','^','×','(',')','/','+']};
let PADON=null;                                   /* null = حسب الجهاز */
function padOn(){ const s=Store.P.set.pad||'auto'; return PADON!==null?PADON:(s==='on'||(s==='auto'&&COARSE)); }
function padKeys(type){
  const x=(PAD_EX[type]||PAD_EX.num).slice(); while(x.length<9) x.push('');
  return [['7','8','9',x[0],x[1],x[2]],['4','5','6',x[3],x[4],x[5]],['1','2','3',x[6],x[7],x[8]],[',','0','−','◀','▶','⌫']];
}
function padInsert(inp,k){
  const v=inp.value; let a=inp.selectionStart, b=inp.selectionEnd;
  if(a==null||b==null||(document.activeElement!==inp&&!COARSE)){ a=b=v.length; }
  if(k==='⌫'){ if(a===b&&a>0) a--; inp.value=v.slice(0,a)+v.slice(b); setCaret(inp,a); }
  else if(k==='◀'){ setCaret(inp,Math.max(0,a-1)); }
  else if(k==='▶'){ setCaret(inp,Math.min(v.length,b+1)); }
  else { const ins=k==='−'?'-':k; inp.value=v.slice(0,a)+ins+v.slice(b); setCaret(inp,a+ins.length); }
  try{ inp.dispatchEvent(new Event('input',{bubbles:true})); }catch(e){}
}
function setCaret(inp,k){ try{ inp.focus({preventScroll:true}); inp.setSelectionRange(k,k); }catch(e){ try{ inp.setSelectionRange(k,k); }catch(_){} } }
function attachPad(inp,type,box){
  if(!inp||!box) return;
  const on=padOn();
  inp.setAttribute('inputmode',on&&COARSE?'none':'text');
  const wrap=document.createElement('div'); wrap.className='padwrap noprint';
  const keys=padKeys(type).map(r=>r.map(k=>k?`<button type="button" class="pk ${/^[0-9,]$/.test(k)?'d':/[◀▶⌫]/.test(k)?'f':'o'}" data-pk="${k}">${k}</button>`:'<span class="pk e"></span>').join('')).join('');
  wrap.innerHTML=`<div class="padbar"><button type="button" class="btn sec2 small" data-padt="1">${on?(COARSE?t('padDevice'):t('padHide')):t('padShow')}</button></div>
    <div class="pad ${on?'':'off'}" dir="ltr">${keys}</div>`;
  box.appendChild(wrap);
  if(type==='exprn'){                              /* معاينة: كيف سيُقرأ الجواب */
    const pv=document.createElement('div'); pv.className='padpv'; wrap.insertBefore(pv,wrap.firstChild);
    const upd=()=>{ const v=inp.value.trim(); pv.innerHTML=v?t('willRead')+'<span class="m">'+padPreview(v)+'</span>':''; };
    inp.addEventListener('input',upd); upd();
  }
  wrap.querySelectorAll('[data-pk]').forEach(b=>{
    b.addEventListener('pointerdown',e=>e.preventDefault());
    b.addEventListener('mousedown',e=>e.preventDefault());
    b.onclick=()=>padInsert(inp,b.dataset.pk);
  });
  wrap.querySelector('[data-padt]').onclick=()=>{
    PADON=!padOn(); wrap.remove(); attachPad(inp,type,box);
    if(!PADON&&COARSE){ inp.setAttribute('inputmode','text'); try{ inp.blur(); inp.focus(); }catch(e){} }
  };
}
function padPreview(v){
  const esc=x=>x.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return esc(v).replace(/\*/g,'×').replace(/-/g,'−')
    .replace(/\^\(([^)]*)\)/g,'<sup>$1</sup>').replace(/\^(−?[0-9n]+)/g,'<sup>$1</sup>').replace(/\^/g,'<sup>□</sup>');
}
const SCR={};                                     /* رسومات المسودّة في الذاكرة فقط، حسب التمرين */
function scratchHTML(){ return `<div class="scrbar noprint"><button type="button" class="btn sec2 small" data-scr="1">${t('scr')}</button></div><div class="scrbox noprint"></div>`; }
function wireScratch(root,key){
  const bar=root.querySelector('[data-scr]'), box=root.querySelector('.scrbox'); if(!bar||!box) return;
  const show=()=>{ box.innerHTML=`<div class="scrtools"><button type="button" class="btn small" data-st="pen">${t('pen')}</button><button type="button" class="btn small sec2" data-st="er">${t('eraser')}</button>
      <button type="button" class="btn small sec2" data-st="clr">${t('clearAll')}</button><span class="note">${t('scrNote')}</span></div><canvas class="scr"></canvas>`;
    mountCanvas(box.querySelector('canvas'),key,box); bar.textContent=t('scrHide'); SCR[key+':open']=true; };
  const hide=()=>{ box.innerHTML=''; bar.textContent=t('scr'); SCR[key+':open']=false; };
  bar.onclick=()=>box.firstChild?hide():show();
  if(SCR[key+':open']) show();
}
function mountCanvas(cv,key,box){
  if(!cv.getContext) return;
  const dpr=Math.min(window.devicePixelRatio||1,2), W=cv.clientWidth||320, H=Math.round(Math.min(320,Math.max(200,W*0.55)));
  cv.width=W*dpr; cv.height=H*dpr; cv.style.height=H+'px';
  const g=cv.getContext('2d'); g.scale(dpr,dpr); g.lineCap='round'; g.lineJoin='round';
  if(SCR[key]){ const im=new Image(); im.onload=()=>g.drawImage(im,0,0,W,H); im.src=SCR[key]; }
  let mode='pen', last=null;
  const pos=e=>{ const r=cv.getBoundingClientRect(); return [(e.clientX-r.left)*W/r.width,(e.clientY-r.top)*H/r.height]; };
  cv.addEventListener('pointerdown',e=>{ last=pos(e); try{ cv.setPointerCapture(e.pointerId); }catch(_){} e.preventDefault(); });
  cv.addEventListener('pointermove',e=>{ if(!last) return; const p=pos(e);
    g.globalCompositeOperation=mode==='er'?'destination-out':'source-over'; g.strokeStyle='#1A2230'; g.lineWidth=mode==='er'?18:2.4;
    g.beginPath(); g.moveTo(last[0],last[1]); g.lineTo(p[0],p[1]); g.stroke(); last=p; e.preventDefault(); });
  const end=()=>{ if(last){ last=null; try{ SCR[key]=cv.toDataURL(); }catch(_){} } };
  cv.addEventListener('pointerup',end); cv.addEventListener('pointercancel',end); cv.addEventListener('pointerleave',end);
  box.querySelectorAll('[data-st]').forEach(b=>b.onclick=()=>{
    const k=b.dataset.st;
    if(k==='clr'){ g.clearRect(0,0,W,H); delete SCR[key]; return; }
    mode=k; box.querySelectorAll('[data-st=pen],[data-st=er]').forEach(x=>x.classList.toggle('sec2',x!==b));
  });
}

/* ---------------------------- تثبيت التطبيق / installation ----------------------------
   Chrome و Edge يطلقان beforeinstallprompt؛ Safari على iPhone لا يدعمه: نعرض الطريقة يدويا. */
const INST={ev:null, done:false};
function instStandalone(){ try{ return !!((window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true); }catch(e){ return false; } }
function instIOS(){ const u=navigator.userAgent||''; return /iPhone|iPad|iPod/.test(u)||(/Macintosh/.test(u)&&(navigator.maxTouchPoints||0)>1); }
function instWeb(){ try{ return location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1'; }catch(e){ return false; } }
function instState(){
  if(INST.done||instStandalone()) return 'installed';
  if(INST.ev) return 'ready';
  if(!instWeb()) return 'file';
  return instIOS()?'ios':'menu';
}
function instHidden(){ const x=+(Store.P.set.instX||0); return x&&Date.now()-x<7*864e5; }   /* «لاحقا» تُخفي الشريط أسبوعا */
function instPaint(){
  let b=document.getElementById('instb');
  const st=instState(), show=S.view==='home'&&!instHidden()&&(st==='ready'||st==='ios');
  if(!show){ if(b) b.classList.remove('on'); return; }
  if(!b){ b=document.createElement('div'); b.id='instb'; b.setAttribute('role','region'); document.body.appendChild(b); }
  b.setAttribute('aria-label',t('instH'));
  b.innerHTML=fix(`<span class="ii">📲</span><span class="it"><b>${t('instBarH')}</b><br>${st==='ready'?t('instBarP'):t('instIOS')}</span>
    ${st==='ready'?`<button class="btn small" id="instGo">${t('instBtn')}</button>`:''}<button class="ix" id="instX" aria-label="${t('later')}">×</button>`);
  b.classList.add('on');
  const g=document.getElementById('instGo'); if(g) g.onclick=instAsk;
  document.getElementById('instX').onclick=()=>{ Store.setSetting('instX',Date.now()); instPaint(); };
}
async function instAsk(){
  const ev=INST.ev; if(!ev) return;
  INST.ev=null;                                   /* prompt() مرّة واحدة فقط للحدث نفسه */
  try{ const r=await ev.prompt(); const c=(r&&r.outcome)?r:(ev.userChoice?await ev.userChoice:null);
    if(c&&c.outcome==='dismissed') Store.setSetting('instX',Date.now());
  }catch(e){}
  instPaint(); if(instCardOpen()) openSettings();
}
function instCardHTML(){
  const st=instState();
  const body={installed:`<p class="note">${t('instDone')}</p>`,
    ready:`<p class="note">${t('instReady')}</p><div class="btnrow"><button class="btn small" id="instGo2">${t('instNow')}</button></div>`,
    ios:`<p class="note">${t('instIOS')}</p>`, menu:`<p class="note">${t('instMenu')}</p>`, file:`<p class="note">${t('instFile')}</p>`}[st];
  return `<div class="card" id="instCard"><h3>${t('instH')}</h3>${body}</div>`;
}
function instCardOpen(){ const sh=document.getElementById('sheet'); return !!(sh&&sh.classList.contains('on')&&document.getElementById('instCard')); }
function instWire(){ const b=document.getElementById('instGo2'); if(b) b.onclick=instAsk; }
window.addEventListener('beforeinstallprompt',e=>{ e.preventDefault(); INST.ev=e; instPaint(); if(instCardOpen()) openSettings(); });
window.addEventListener('appinstalled',()=>{ INST.ev=null; INST.done=true; instPaint(); if(instCardOpen()) openSettings();
  toastBadges([{ico:'📲',h:t('instToastH'),t:t('instToast')}]); });

/* ---------------------------- التصيير والتنقّل / rendu et navigation ---------------------------- */
function render(){
  stopSpeech();
  if(S.view==='home') renderHome();
  else if(S.view==='lesson') renderLesson();
  else if(S.view==='quick') renderQuick();
  else if(VIEWS[S.view]) VIEWS[S.view]();
  else { S.view='home'; renderHome(); }
  paintYears(); paintTitle(); instPaint();
  const act={lesson:'home',practice:'progress'}[S.view]||S.view;
  document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on', b.dataset.v===act));
}
function openSheet(html){ $('#sheetin').innerHTML=fix(html); $('#sheet').classList.add('on'); }
function closeSheet(){ $('#sheet').classList.remove('on'); }
function renderNav(){
  $('#nav').innerHTML=[['home','▤'],['quick','✎'],['progress','★'],['settings','⚙']].map(([v,i])=>
    `<button data-v="${v}"><i>${i}</i>${t('nav_'+v)}</button>`).join('');
  document.querySelectorAll('#nav button').forEach(b=>b.onclick=()=>{
    if(b.dataset.v==='settings') return openSettings();
    if(b.dataset.v==='quick' && RUN.mode!=='free') RUN={mode:'free'};
    go(b.dataset.v); });
  const act={lesson:'home',practice:'progress'}[S.view]||S.view;
  document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on', b.dataset.v===act));
}
$('#home').onclick=()=>go('home');
$('#lng').onclick=()=>setLang(LANG==='ar'?'fr':'ar');
$('#sheet').onclick=e=>{ if(e.target===$('#sheet')) closeSheet(); };
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeSheet(); });

applySettings(); applyLang(); render();
