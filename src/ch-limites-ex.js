/* ============================================================================
   الباب 1 — النهايات والاستمرارية: مولّد التمارين، تمرين البكالوريا، المختبر
   Chapitre 1 — Limites et continuité : générateurs, exercice type BAC, laboratoire
   Chaque générateur renvoie {type, q, ans, sol, miss|why} ; q et sol sont des objets {ar,fr}.
   ============================================================================ */
(function(){
const LX=v=>`lim<sub>x→${v}</sub> `;
const LS=(a,s)=>`lim<sub>x→${ar(a)}, x${s>0?'&gt;':'&lt;'}${ar(a)}</sub> `;
const st=(k,html)=>`<div class="st">${k}) ${html}</div>`;
const N_=n=>M(ar(n));
const Cf='(C<sub>f</sub>)';
const pw=d=>d===1?'x':`x<sup>${d}</sup>`;
/* polynôme à partir de [[coef,degré],…] rangés par degrés décroissants */
const poly=ts=>{ let s=''; for(const [c,d] of ts){ if(!c) continue; const a=Math.abs(c), body=d===0?ar(a):(a===1?'':ar(a))+pw(d);
  s+=s?` ${c<0?'−':'+'} ${body}`:(c<0?'−':'')+body; } return s||'0'; };
const xm=v=>v===0?'x':v>0?`x − ${ar(v)}`:`x + ${ar(-v)}`;            /* x − v */
const fac=v=>v===0?'x':`(${xm(v)})`;
const addC=d=>d?` ${sgn(d)} ${ar(Math.abs(d))}`:'';
const lineEq=(a,b)=>`y = ${cx(a)}x${addC(b)}`;
const inf=s=>s>0?'+∞':'−∞';
const shuffle=a=>{ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const O=(k,html)=>({k,ar:html,fr:html});
const OP_INF=()=>[O('P',M('+∞')),O('M',M('−∞')),O('Z',M('0'))];
const sideTxt=s=>s>0?B('على اليمين','à droite'):B('على اليسار','à gauche');
/* racine de x³ + x − k par dichotomie (fonction strictement croissante) */
function root3(k){ let lo=-5, hi=5; for(let i=0;i<80;i++){ const m=(lo+hi)/2; if(m*m*m+m-k<0) lo=m; else hi=m; } return (lo+hi)/2; }

GEN[1]=[
/* 0 — limite d'un polynôme en ±∞ */
()=>{ const deg=pick([2,3,3,4,5]), lead=nz(-4,4), c1=ri(1,9)*(Math.random()<0.6?-Math.sign(lead):Math.sign(lead)), c0=ri(-9,9);
  const at=pick(['+∞','−∞']), xs=(at==='−∞'&&deg%2)?-1:1, s=Math.sign(lead)*xs, ans=s>0?'P':'M';
  const P=poly([[lead,deg],[c1,deg-1],[c0,0]]), lt=`${cx(lead)}${pw(deg)}`;
  const opts=OP_INF().concat([{k:'F',ar:'حالة عدم تعيين: لا يمكن الاستنتاج',fr:'forme indéterminée : on ne peut pas conclure'}]);
  const par_=B(deg%2?'فردي':'زوجي',deg%2?'impair':'pair');
  const s1=M(`${LX(at)}f(x) = ${LX(at)}${lt}`), s2=M(`${LX(at)}${pw(deg)} = ${inf(xs)}`), s3=M(`${LX(at)}f(x) = ${inf(s)}`);
  const why={
    F:B(`هي حالة عدم تعيين في الظاهر فقط: نُخرج الحدّ الأعلى درجة عاملا مشتركا، فتصبح النهاية نهاية ${M(lt)}.`,`Ce n'est indéterminé qu'en apparence : on factorise par le terme de plus haut degré, et la limite devient celle de ${M(lt)}.`),
    Z:B(`كثير الحدود غير الثابت لا يؤول أبدا إلى ${M('0')} بجوار ${M('±∞')}: نهايته ${M('+∞')} أو ${M('−∞')}.`,`Un polynôme non constant ne tend jamais vers ${M('0')} en ${M('±∞')} : sa limite est ${M('+∞')} ou ${M('−∞')}.`)};
  why[s>0?'M':'P']=B(`انتبه إلى الإشارة: ${s2}، ثمّ نضرب في ${M(ar(lead))}.`,`Attention au signe : ${s2}, puis on multiplie par ${M(ar(lead))}.`);
  return {type:'choice',opts,ans,why,
   q:B(`ما نهاية الدالة ${M(`f(x) = ${P}`)} عندما يؤول ${M('x')} إلى ${M(at)}؟`,`Quelle est la limite de ${M(`f(x) = ${P}`)} quand ${M('x')} tend vers ${M(at)} ?`),
   sol:B(st(1,`نهاية كثير حدود بجوار ${M(at)} هي نهاية حدّه الأعلى درجة: ${s1}.`)+st(2,`${s2} (الأسّ ${M(String(deg))} ${par_.ar}).`)+st(3,`المعامل ${M(ar(lead))} ${lead>0?'موجب':'سالب'}، إذن ${s3}.`),
         st(1,`Un polynôme a, en ${M(at)}, la même limite que son terme de plus haut degré : ${s1}.`)+st(2,`${s2} (exposant ${M(String(deg))} ${par_.fr}).`)+st(3,`Le coefficient ${M(ar(lead))} est ${lead>0?'positif':'négatif'}, donc ${s3}.`))};},

/* 1 — fonction rationnelle en ±∞ */
()=>{ const at=pick(['+∞','−∞']), q=pick([1,2,3]), same=Math.random()<0.7, p=same?q:ri(0,q-1);
  const a=nz(-6,6), d=nz(-5,5), c0=nz(-9,9), e0=nz(-9,9);
  const nT=p===0?[[a,0]]:[[a,p],[p>=2?ri(-5,5):0,p-1],[c0,0]], dT=[[d,q],[q>=2?ri(-5,5):0,q-1],[e0,0]];
  const ans=same?a/d:0, num=poly(nT), den=poly(dT);
  const hiN=p===0?ar(a):`${cx(a)}${pw(p)}`, hiD=`${cx(d)}${pw(q)}`;
  const s1=M(`${LX(at)}f(x) = ${LX(at)}${f(hiN,hiD)}`);
  const s2=same?M(`${LX(at)}f(x) = ${f(ar(a),ar(d))} = ${frs(a,d)}`):M(`${LX(at)}${f(ar(a),`${cx(d)}${pw(q-p)}`)} = 0`);
  const miss=same?[[c0/e0,B('أخذت الحدّين الثابتين: بجوار اللانهاية الحدّان الأعلى درجة هما اللذان يحدّدان النهاية.','Tu as pris les termes constants : en l\'infini, ce sont les termes de plus haut degré qui comptent.')],
                   [0,B('البسط والمقام من نفس الدرجة: النهاية هي حاصل قسمة المعاملين الرئيسيين، وليست 0.','Numérateur et dénominateur ont le même degré : la limite est le quotient des coefficients dominants, pas 0.')],
                   [d/a,B('قلبت الكسر: النهاية هي معامل البسط على معامل المقام.','Tu as inversé : c\'est le coefficient du numérateur divisé par celui du dénominateur.')]]
                 :[[a/d,B(`درجة البسط أصغر من درجة المقام: بعد الاختزال يبقى ${M('x')} في المقام، فالنهاية ${M('0')}.`,`Le degré du numérateur est plus petit que celui du dénominateur : après simplification il reste du ${M('x')} au dénominateur, donc la limite est ${M('0')}.`)]];
  return {type:'num',ans,miss,
   q:B(`احسب ${M(`${LX(at)}f(x)`)} حيث ${M(`f(x) = ${f(num,den)}`)}.`,`Calcule ${M(`${LX(at)}f(x)`)} où ${M(`f(x) = ${f(num,den)}`)}.`),
   sol:p===0
    ?B(st(1,`البسط ثابت يساوي ${M(ar(a))} والمقام يؤول إلى ${M('±∞')}: ليست حالة عدم تعيين. ${s1}.`)+st(2,s2),
       st(1,`Le numérateur est constant, égal à ${M(ar(a))}, et le dénominateur tend vers ${M('±∞')} : ce n'est pas une forme indéterminée. ${s1}.`)+st(2,s2))
    :B(st(1,`حالة عدم تعيين ${M(f('∞','∞'))}. نهاية دالة ناطقة بجوار ${M(at)} هي نهاية حاصل قسمة الحدّين الأعلى درجة: ${s1}.`)+st(2,s2),
       st(1,`Forme indéterminée ${M(f('∞','∞'))}. En ${M(at)}, une fonction rationnelle a la même limite que le quotient de ses termes de plus haut degré : ${s1}.`)+st(2,s2))};},

/* 2 — limite « k/0 » à droite ou à gauche (asymptote verticale) */
()=>{ const c=nz(-4,4); let a=nz(-3,3), b=ri(-6,6); while(a*c+b===0) b=ri(-6,6);
  const N=a*c+b, side=pick([1,-1]), s=Math.sign(N)*side, ans=s>0?'P':'M';
  const opts=OP_INF().concat([{k:'N',ar:'ليست لها نهاية (قسمة على 0)',fr:'pas de limite (division par 0)'}]);
  const fx=`f(x) = ${f(poly([[a,1],[b,0]]),xm(c))}`, L_=M(`${LS(c,side)}f(x)`);
  const dsgn=B(side>0?'موجب':'سالب',side>0?'positif':'négatif');
  const why={Z:B(`البسط لا يؤول إلى ${M('0')} بل إلى ${M(ar(N))}: الحالة ${M(f('k','0'))} تعطي ${M('±∞')} وليس ${M('0')}.`,`Le numérateur ne tend pas vers ${M('0')} mais vers ${M(ar(N))} : le cas ${M(f('k','0'))} donne ${M('±∞')}, pas ${M('0')}.`),
             N:B(`لا نقسم على ${M('0')}، بل ندرس ما يحدث بالقرب من ${M(ar(c))}: النهاية ${sideTxt(side).ar} موجودة وهي ${M('±∞')} (مستقيم مقارب عمودي).`,`On ne divise pas par ${M('0')} : on regarde ce qui se passe près de ${M(ar(c))}. La limite ${sideTxt(side).fr} existe et vaut ${M('±∞')} (asymptote verticale).`)};
  why[s>0?'M':'P']=B(`ادرس الإشارة: البسط يؤول إلى ${M(ar(N))} و ${M(xm(c))} ${dsgn.ar} عندما ${M(`x ${side>0?'&gt;':'&lt;'} ${ar(c)}`)}.`,`Étudie le signe : le numérateur tend vers ${M(ar(N))} et ${M(xm(c))} est ${dsgn.fr} quand ${M(`x ${side>0?'&gt;':'&lt;'} ${ar(c)}`)}.`);
  return {type:'choice',opts,ans,why,
   q:B(`${M(fx)}. ما قيمة ${L_}؟`,`${M(fx)}. Que vaut ${L_} ?`),
   sol:B(st(1,`البسط يؤول إلى ${M(`${ar(a)} × ${par(c)}${addC(b)} = ${ar(N)}`)}.`)+st(2,`المقام ${M(xm(c))} يؤول إلى ${M('0')} وهو ${dsgn.ar} لأنّ ${M(`x ${side>0?'&gt;':'&lt;'} ${ar(c)}`)}.`)+st(3,`حسب قاعدة الإشارات: ${M(`${LS(c,side)}f(x) = ${inf(s)}`)}، والمستقيم ${M(`x = ${ar(c)}`)} مقارب عمودي.`),
         st(1,`Le numérateur tend vers ${M(`${ar(a)} × ${par(c)}${addC(b)} = ${ar(N)}`)}.`)+st(2,`Le dénominateur ${M(xm(c))} tend vers ${M('0')} et il est ${dsgn.fr} car ${M(`x ${side>0?'&gt;':'&lt;'} ${ar(c)}`)}.`)+st(3,`Règle des signes : ${M(`${LS(c,side)}f(x) = ${inf(s)}`)}, et la droite ${M(`x = ${ar(c)}`)} est asymptote verticale.`))};},

/* 3 — forme 0/0 levée par factorisation */
()=>{ const r=nz(-5,5); let s=ri(-6,6); while(s===r) s=ri(-6,6);
  const inv=Math.random()<0.35, P=poly([[1,2],[-(r+s),1],[r*s,0]]), ans=inv?1/(r-s):r-s;
  const fx=inv?f(xm(r),P):f(P,xm(r)), red_=inv?f('1',xm(s)):xm(s);
  const miss=[[0,B(`${M(f('0','0'))} ليست ${M('0')}: هي حالة عدم تعيين، يجب تحليل البسط والمقام ثمّ الاختزال.`,`${M(f('0','0'))} ne vaut pas ${M('0')} : c'est une forme indéterminée ; il faut factoriser puis simplifier.`)],
              [inv?r-s:1/(r-s),B(`قلبت الكسر: بعد الاختزال ${M(`f(x) = ${red_}`)}.`,`Tu as inversé : après simplification, ${M(`f(x) = ${red_}`)}.`)],
              [inv?1/(r+s):r+s,B(`تحقّق من التحليل بالنشر: ${M(`${fac(r)}${fac(s)} = ${P}`)}.`,`Vérifie la factorisation en développant : ${M(`${fac(r)}${fac(s)} = ${P}`)}.`)]];
  const s1a=`بتعويض ${M('x')} بـ ${M(ar(r))} نجد ${M(f('0','0'))}: حالة عدم تعيين. ${M(ar(r))} جذر لـ ${M(P)}، إذن ${M(`${P} = ${fac(r)}${fac(s)}`)}.`;
  const s1f=`En remplaçant ${M('x')} par ${M(ar(r))}, on obtient ${M(f('0','0'))} : forme indéterminée. ${M(ar(r))} est racine de ${M(P)}, donc ${M(`${P} = ${fac(r)}${fac(s)}`)}.`;
  const s2=M(`f(x) = ${red_}`), s3=M(`${LX(ar(r))}f(x) = ${inv?f('1',`${ar(r)}${addC(-s)}`):`${ar(r)}${addC(-s)}`} = ${frs(inv?1:r-s,inv?r-s:1)}`);
  return {type:'num',ans,miss,
   q:B(`احسب ${M(`${LX(ar(r))}${fx}`)}.`,`Calcule ${M(`${LX(ar(r))}${fx}`)}.`),
   sol:B(st(1,s1a)+st(2,`من أجل ${M(`x ≠ ${ar(r)}`)}: ${s2}.`)+st(3,s3),st(1,s1f)+st(2,`Pour ${M(`x ≠ ${ar(r)}`)} : ${s2}.`)+st(3,s3))};},

/* 4 — asymptotes d'une fonction homographique */
()=>{ let a,b,c,d; do{ a=nz(-6,6); b=ri(-9,9); c=nz(-4,4); d=nz(-8,8); } while(a*d-b*c===0);
  const kind=pick(['H','V']), fx=`f(x) = ${f(poly([[a,1],[b,0]]),poly([[c,1],[d,0]]))}`;
  if(kind==='H'){
    const miss=[[c/a,B('قلبت: المعادلة هي معامل البسط على معامل المقام.','Tu as inversé : c\'est le coefficient du numérateur sur celui du dénominateur.')],
                [0,B(`البسط والمقام من نفس الدرجة: النهاية بجوار ${M('±∞')} ليست ${M('0')}.`,`Numérateur et dénominateur ont le même degré : la limite en ${M('±∞')} n'est pas ${M('0')}.`)]];
    if(b) miss.push([b/d,B('أخذت الحدّين الثابتين: بجوار اللانهاية نأخذ الحدّين الأعلى درجة.','Tu as pris les termes constants : en l\'infini, on garde les termes de plus haut degré.')]);
    const s1=M(`${LX('±∞')}f(x) = ${LX('±∞')}${f(`${cx(a)}x`,`${cx(c)}x`)} = ${frs(a,c)}`);
    return {type:'num',ans:a/c,miss,
     q:B(`${M(fx)}. المنحنى ${M(Cf)} يقبل مستقيما مقاربا أفقيا معادلته ${M('y = k')}. ما قيمة ${M('k')}؟`,`${M(fx)}. La courbe ${M(Cf)} admet une asymptote horizontale d'équation ${M('y = k')}. Que vaut ${M('k')} ?`),
     sol:B(st(1,`نهاية دالة ناطقة بجوار ${M('±∞')}: ${s1}.`)+st(2,`إذن المستقيم ${M(`y = ${frs(a,c)}`)} مقارب أفقي للمنحنى ${M(Cf)} بجوار ${M('+∞')} و ${M('−∞')}.`),
           st(1,`Limite d'une fonction rationnelle en ${M('±∞')} : ${s1}.`)+st(2,`Donc la droite ${M(`y = ${frs(a,c)}`)} est asymptote horizontale à ${M(Cf)} en ${M('+∞')} et en ${M('−∞')}.`))};
  }
  const x0=-d/c, n0=(b*c-a*d)/c;
  const miss=[[d/c,B(`المقام ينعدم من أجل ${M(`${poly([[c,1],[d,0]])} = 0`)}، أي ${M(`x = ${frs(-d,c)}`)}: انتبه إلى الإشارة.`,`Le dénominateur s'annule pour ${M(`${poly([[c,1],[d,0]])} = 0`)}, soit ${M(`x = ${frs(-d,c)}`)} : attention au signe.`)]];
  if(b) miss.push([-b/a,B('هذا جذر البسط: المستقيم المقارب العمودي يوافق القيمة التي ينعدم عندها المقام.','C\'est la racine du numérateur : l\'asymptote verticale correspond à la valeur qui annule le dénominateur.')]);
  return {type:'num',ans:x0,miss,
   q:B(`${M(fx)}. المنحنى ${M(Cf)} يقبل مستقيما مقاربا عموديا معادلته ${M('x = k')}. ما قيمة ${M('k')}؟`,`${M(fx)}. La courbe ${M(Cf)} admet une asymptote verticale d'équation ${M('x = k')}. Que vaut ${M('k')} ?`),
   sol:B(st(1,`المقام ينعدم من أجل ${M(`${poly([[c,1],[d,0]])} = 0`)}، أي ${M(`x = ${frs(-d,c)}`)}.`)+st(2,`عند هذه القيمة البسط يساوي ${M(nice(n0))} وهو غير معدوم: الحالة ${M(f('k','0'))}، فالنهاية غير منتهية.`)+st(3,`إذن المستقيم ${M(`x = ${frs(-d,c)}`)} مقارب عمودي للمنحنى ${M(Cf)}.`),
         st(1,`Le dénominateur s'annule pour ${M(`${poly([[c,1],[d,0]])} = 0`)}, soit ${M(`x = ${frs(-d,c)}`)}.`)+st(2,`En cette valeur, le numérateur vaut ${M(nice(n0))}, qui n'est pas nul : cas ${M(f('k','0'))}, la limite est infinie.`)+st(3,`Donc la droite ${M(`x = ${frs(-d,c)}`)} est asymptote verticale à ${M(Cf)}.`))};},

/* 5 — asymptote oblique (QCM) */
()=>{ let a,d,Bc,R,b,c; do{ a=nz(-3,3); d=nz(-3,3); Bc=nz(-5,5); R=nz(-6,6); b=Bc-a*d; c=R-Bc*d; } while(b===0||b===Bc||Math.abs(c)>40);
  const num=poly([[a,2],[b,1],[c,0]]), fx=`f(x) = ${f(num,xm(d))}`;
  const opts=shuffle([O('A',M(lineEq(a,Bc))),O('B',M(lineEq(a,b))),O('C',M(lineEq(a,0))),O('D',M(`x = ${ar(d)}`))]);
  const dec=`${cx(a)}x${addC(Bc)} ${R<0?'−':'+'} ${f(ar(Math.abs(R)),xm(d))}`;
  const why={B:B(`أخذت معاملات البسط دون إجراء القسمة. اكتب ${M(`f(x) = ${dec}`)} (تحقّق بالنشر).`,`Tu as repris les coefficients du numérateur sans faire la division. Écris ${M(`f(x) = ${dec}`)} (vérifie en développant).`),
             C:B(`ينقص الحدّ الثابت: ${M(`f(x) − ${cx(a)}x`)} لا يؤول إلى ${M('0')} بل إلى ${M(ar(Bc))}.`,`Il manque l'ordonnée à l'origine : ${M(`f(x) − ${cx(a)}x`)} ne tend pas vers ${M('0')} mais vers ${M(ar(Bc))}.`),
             D:B(`${M(`x = ${ar(d)}`)} مستقيم مقارب <b>عمودي</b> (المقام ينعدم)، وليس المستقيم المقارب المائل.`,`${M(`x = ${ar(d)}`)} est l'asymptote <b>verticale</b> (le dénominateur s'annule), pas l'asymptote oblique.`)};
  const s1=M(`(${cx(a)}x${addC(Bc)})(${xm(d)}) ${R<0?'−':'+'} ${ar(Math.abs(R))} = ${num}`);
  const s2=M(`${LX('±∞')}[f(x) − (${cx(a)}x${addC(Bc)})] = ${LX('±∞')}${f(ar(R),xm(d))} = 0`);
  return {type:'choice',opts,ans:'A',why,
   q:B(`${M(fx)}. ما معادلة المستقيم المقارب المائل للمنحنى ${M(Cf)}؟`,`${M(fx)}. Quelle est l'équation de l'asymptote oblique à ${M(Cf)} ?`),
   sol:B(st(1,`${s1}، إذن ${M(`f(x) = ${dec}`)}.`)+st(2,s2)+st(3,`المستقيم ${M(lineEq(a,Bc))} مقارب مائل للمنحنى ${M(Cf)} بجوار ${M('+∞')} و ${M('−∞')}.`),
         st(1,`${s1}, donc ${M(`f(x) = ${dec}`)}.`)+st(2,s2)+st(3,`La droite ${M(lineEq(a,Bc))} est asymptote oblique à ${M(Cf)} en ${M('+∞')} et en ${M('−∞')}.`))};},

/* 6 — ∞ − ∞ avec une racine : expression conjuguée */
()=>{ const p=nz(-8,8), q=ri(-5,9), R=poly([[1,2],[p,1],[q,0]]), ans=p/2;
  const s1=M(`f(x) = ${f(`(${R}) − x<sup>2</sup>`,`√(${R}) + x`)} = ${f(poly([[p,1],[q,0]]),`√(${R}) + x`)}`);
  const s2=M(`f(x) = ${f(`${ar(p)}${q?` ${sgn(q)} ${f(ar(Math.abs(q)),'x')}`:''}`,`√(1 ${sgn(p)} ${f(ar(Math.abs(p)),'x')}${q?` ${sgn(q)} ${f(ar(Math.abs(q)),'x<sup>2</sup>')}`:''}) + 1`)}`);
  const s3=M(`${LX('+∞')}f(x) = ${f(ar(p),'1 + 1')} = ${frs(p,2)}`);
  return {type:'num',ans,
   q:B(`احسب ${M(`${LX('+∞')}(√(${R}) − x)`)}.`,`Calcule ${M(`${LX('+∞')}(√(${R}) − x)`)}.`),
   miss:[[0,B(`${M('+∞ − ∞')} حالة عدم تعيين وليست ${M('0')}: اضرب في المرافق.`,`${M('+∞ − ∞')} est une forme indéterminée, pas ${M('0')} : multiplie par l'expression conjuguée.`)],
         [p,B(`المقام ${M(`√(${R}) + x`)} يتصرّف مثل ${M('2x')}: لا تنس القسمة على ${M('2')}.`,`Le dénominateur ${M(`√(${R}) + x`)} se comporte comme ${M('2x')} : n'oublie pas de diviser par ${M('2')}.`)]],
   sol:B(st(1,`حالة عدم تعيين ${M('∞ − ∞')}. نضرب في المرافق: ${s1}.`)+st(2,`من أجل ${M('x > 0')} نُخرج ${M('x')} عاملا مشتركا: ${s2}.`)+st(3,s3),
         st(1,`Forme indéterminée ${M('∞ − ∞')}. On multiplie par l'expression conjuguée : ${s1}.`)+st(2,`Pour ${M('x > 0')}, on factorise par ${M('x')} : ${s2}.`)+st(3,s3))};},

/* 7 — continuité d'une fonction définie par morceaux */
()=>{ const c=nz(-3,3), a=nz(-4,4), b=ri(-6,6), V=a*c+b, ans=V-c*c;
  const lin=poly([[a,1],[b,0]]);
  const def=B(`${M('f(x) = x<sup>2</sup> + m')} إذا كان ${M(`x &lt; ${ar(c)}`)} ، و ${M(`f(x) = ${lin}`)} إذا كان ${M(`x ≥ ${ar(c)}`)}.`,
              `${M('f(x) = x<sup>2</sup> + m')} si ${M(`x &lt; ${ar(c)}`)}, et ${M(`f(x) = ${lin}`)} si ${M(`x ≥ ${ar(c)}`)}.`);
  const s1=M(`f(${ar(c)}) = ${ar(a)} × ${par(c)}${addC(b)} = ${ar(V)}`), s2=M(`${LS(c,-1)}f(x) = ${par(c)}<sup>2</sup> + m = ${c*c} + m`), s3=M(`${c*c} + m = ${ar(V)} ⟺ m = ${ar(ans)}`);
  return {type:'num',ans,
   q:B(`${M('f')} دالة معرّفة على ${M('ℝ')} بـ: ${def.ar}<br>عيّن العدد الحقيقي ${M('m')} حتى تكون ${M('f')} مستمرّة عند ${M(ar(c))}.`,
       `${M('f')} est définie sur ${M('ℝ')} par : ${def.fr}<br>Détermine le réel ${M('m')} pour que ${M('f')} soit continue en ${M(ar(c))}.`),
   miss:[[V,B(`نسيت ${M(`${par(c)}<sup>2</sup>`)}: النهاية على اليسار هي ${M(`${c*c} + m`)}.`,`Tu as oublié ${M(`${par(c)}<sup>2</sup>`)} : la limite à gauche vaut ${M(`${c*c} + m`)}.`)],
         [-ans,B('انتبه إلى الإشارة عند نقل الحدود.','Attention au signe en passant les termes de l\'autre côté.')]],
   sol:B(st(1,`${s1}، وهي أيضا النهاية على اليمين.`)+st(2,`النهاية على اليسار: ${s2}.`)+st(3,`${M('f')} مستمرّة عند ${M(ar(c))} إذا وفقط إذا تساوت النهايتان مع ${M(`f(${ar(c)})`)}: ${s3}.`),
         st(1,`${s1}, c'est aussi la limite à droite.`)+st(2,`Limite à gauche : ${s2}.`)+st(3,`${M('f')} est continue en ${M(ar(c))} si et seulement si les deux limites sont égales à ${M(`f(${ar(c)})`)} : ${s3}.`))};},

/* 8 — théorème des valeurs intermédiaires : encadrer α */
()=>{ let k; do{ k=nz(-12,12); } while([2,-2,10,-10].includes(k));
  const al=root3(k), P=poly([[1,3],[1,1],[-k,0]]), fn=x=>x*x*x+x-k, dec=Math.random()<0.5;
  const lo=dec?Math.floor(al*10)/10:Math.floor(al), hi=dec?Math.round((lo+0.1)*10)/10:lo+1, ans=lo;
  const fv=v=>ar(rnd(fn(v),3));
  const s1=B(`${M('f')} مستمرّة ومتزايدة تماما على ${M('ℝ')} (مجموع الدالتين المتزايدتين تماما ${M('x ↦ x<sup>3</sup>')} و ${M(`x ↦ ${poly([[1,1],[-k,0]])}`)}).`,
             `${M('f')} est continue et strictement croissante sur ${M('ℝ')} (somme des fonctions strictement croissantes ${M('x ↦ x<sup>3</sup>')} et ${M(`x ↦ ${poly([[1,1],[-k,0]])}`)}).`);
  const s2b=M(`f(${ar(hi)}) = ${fv(hi)} &gt; 0`);
  const qq=dec?B(`عيّن العدد العشري ${M('a')} (برقم واحد بعد الفاصلة) بحيث ${M('a &lt; α &lt; a + 0,1')}.`,`Détermine le décimal ${M('a')} (un chiffre après la virgule) tel que ${M('a &lt; α &lt; a + 0,1')}.`)
              :B(`عيّن العدد الصحيح ${M('n')} بحيث ${M('n &lt; α &lt; n + 1')}.`,`Détermine l'entier ${M('n')} tel que ${M('n &lt; α &lt; n + 1')}.`);
  const miss=[[Math.round((lo+(dec?0.1:1))*10)/10,B(`${M(`f(${ar(hi)}) &gt; 0`)}: الحلّ أصغر من ${M(ar(hi))}. المطلوب هو الحدّ الأدنى للحصر.`,`${M(`f(${ar(hi)}) &gt; 0`)} : la solution est plus petite que ${M(ar(hi))}. On demande la borne inférieure de l'encadrement.`)],
              [Math.round((lo-(dec?0.1:1))*10)/10,B(`${M(`f(${ar(lo)}) &lt; 0`)}: الحلّ أكبر من ${M(ar(lo))}.`,`${M(`f(${ar(lo)}) &lt; 0`)} : la solution est plus grande que ${M(ar(lo))}.`)]];
  if(dec&&Math.floor(al)!==lo) miss.push([Math.floor(al),B(`المطلوب حصر بالسعة ${M('0,1')}، وليس بالسعة ${M('1')}.`,`On demande un encadrement d'amplitude ${M('0,1')}, pas d'amplitude ${M('1')}.`)]);
  return {type:'num',ans,miss,
   q:B(`${M(`f(x) = ${P}`)}. نقبل أنّ المعادلة ${M('f(x) = 0')} تقبل حلّا وحيدا ${M('α')}. ${qq.ar}`,`${M(`f(x) = ${P}`)}. On admet que l'équation ${M('f(x) = 0')} admet une unique solution ${M('α')}. ${qq.fr}`),
   sol:B(st(1,s1.ar)+st(2,`${M(`f(${ar(lo)}) = ${fv(lo)} &lt; 0`)} و ${s2b}.`)+st(3,`حسب مبرهنة القيم المتوسطة: ${M(`${ar(lo)} &lt; α &lt; ${ar(hi)}`)}، إذن ${M(`${dec?'a':'n'} = ${ar(lo)}`)}.`),
         st(1,s1.fr)+st(2,`${M(`f(${ar(lo)}) = ${fv(lo)} &lt; 0`)} et ${s2b}.`)+st(3,`D'après le théorème des valeurs intermédiaires : ${M(`${ar(lo)} &lt; α &lt; ${ar(hi)}`)}, donc ${M(`${dec?'a':'n'} = ${ar(lo)}`)}.`))};},

/* 9 — limite d'une fonction composée (racine) */
()=>{ const t=pick([1,2,3]), c=pick([1,2,3,4]), a=t*t*c, b=ri(-9,9), d=nz(-9,9), at=pick(['+∞','−∞']);
  const inner=f(poly([[a,1],[b,0]]),poly([[c,1],[d,0]]));
  const miss=[[t*t,B(`لا تنس الجذر: ما تحت الجذر يؤول إلى ${M(String(t*t))}، ثمّ ${M(`√${t*t} = ${t}`)}.`,`N'oublie pas la racine : l'intérieur tend vers ${M(String(t*t))}, puis ${M(`√${t*t} = ${t}`)}.`)]];
  if(b*d>0&&Math.abs(Math.sqrt(b/d)-t)>1e-9) miss.push([Math.sqrt(b/d),B('أخذت الحدّين الثابتين: بجوار اللانهاية نأخذ الحدّين الأعلى درجة.','Tu as pris les termes constants : en l\'infini, on garde les termes de plus haut degré.')]);
  const s1=M(`${LX(at)}${inner} = ${LX(at)}${f(`${a}x`,`${cx(c)}x`)} = ${t*t}`), s2=M(`lim<sub>X→${t*t}</sub> √X = ${t}`);
  return {type:'num',ans:t,miss,
   q:B(`احسب ${M(`${LX(at)}√(${inner})`)}.`,`Calcule ${M(`${LX(at)}√(${inner})`)}.`),
   sol:B(st(1,s1)+st(2,s2)+st(3,`حسب نهاية دالة مركّبة: ${M(`${LX(at)}f(x) = ${t}`)}.`),st(1,s1)+st(2,s2)+st(3,`Par composition : ${M(`${LX(at)}f(x) = ${t}`)}.`))};},

/* 10 — limites par comparaison (sin, cos bornées) */
()=>{ const v=pick(['q','lin','q2']), k=nz(-5,5), tg=pick(['sin x','cos x']), K=Math.abs(k);
  const kS=`${K===1?'':K+' '}${tg}`, kt=`${k<0?'−':'+'} ${kS}`, NLo={k:'N',ar:`ليست لها نهاية (لأنّ ${M(tg)} ليست لها نهاية)`,fr:`pas de limite (car ${M(tg)} n'a pas de limite)`};
  const nl=B(`${M(tg)} ليست لها نهاية بجوار ${M('+∞')}، لكنّها <b>محدودة</b> بين ${M('−1')} و ${M('1')}: نستعمل الحصر أو المقارنة.`,`${M(tg)} n'a pas de limite en ${M('+∞')}, mais elle est <b>bornée</b> entre ${M('−1')} et ${M('1')} : on utilise un encadrement ou une comparaison.`);
  const bound=M(`−1 ≤ ${tg} ≤ 1`);
  if(v==='lin'){ const a=nz(-4,4), ans=a>0?'P':'M';
    const opts=OP_INF().concat([NLo]), why={N:nl,Z:B(`${M(`${cx(a)}x`)} يكبر بلا حدود بينما ${M(`${kS}`)} يبقى محدودا.`,`${M(`${cx(a)}x`)} grandit sans limite alors que ${M(`${kS}`)} reste borné.`)};
    why[a>0?'M':'P']=B(`الحدّ ${M(`${cx(a)}x`)} هو الذي يحدّد الإشارة: ${M(ar(a))} ${a>0?'موجب':'سالب'}.`,`C'est le terme ${M(`${cx(a)}x`)} qui donne le signe : ${M(ar(a))} est ${a>0?'positif':'négatif'}.`);
    const cmp=a>0?M(`f(x) ≥ ${cx(a)}x − ${K}`):M(`f(x) ≤ ${cx(a)}x + ${K}`), lm=M(`${LX('+∞')}(${cx(a)}x ${a>0?'−':'+'} ${K}) = ${inf(a)}`);
    return {type:'choice',opts,ans,why,
     q:B(`ما نهاية ${M(`f(x) = ${cx(a)}x ${kt}`)} عندما يؤول ${M('x')} إلى ${M('+∞')}؟`,`Quelle est la limite de ${M(`f(x) = ${cx(a)}x ${kt}`)} quand ${M('x')} tend vers ${M('+∞')} ?`),
     sol:B(st(1,`${bound}، إذن ${M(`−${K} ≤ ${k<0?'−':''}${kS} ≤ ${K}`)}، ومنه ${cmp}.`)+st(2,`${lm}، إذن بالمقارنة ${M(`${LX('+∞')}f(x) = ${inf(a)}`)}.`),
           st(1,`${bound}, donc ${M(`−${K} ≤ ${k<0?'−':''}${kS} ≤ ${K}`)}, d'où ${cmp}.`)+st(2,`${lm}, donc par comparaison ${M(`${LX('+∞')}f(x) = ${inf(a)}`)}.`))};
  }
  if(v==='q'){ const a=nz(-5,5);
    const opts=[O('V',M(ar(a))),O('Z',M('0')),O('P',M('+∞')),NLo];
    const why={N:nl,Z:B(`${M(f(`${cx(a)}x`,'x'))} يساوي ${M(ar(a))}، وليس ${M('0')}: فقط الجزء ${M(f(`${kS}`,'x'))} يؤول إلى ${M('0')}.`,`${M(f(`${cx(a)}x`,'x'))} vaut ${M(ar(a))}, pas ${M('0')} : seule la partie ${M(f(`${kS}`,'x'))} tend vers ${M('0')}.`),
               P:B(`البسط يؤول إلى ${M('±∞')} لكنّ المقام كذلك: نقسم كلّ حدّ على ${M('x')}.`,`Le numérateur tend vers ${M('±∞')}, mais le dénominateur aussi : on divise chaque terme par ${M('x')}.`)};
    const s1=M(`f(x) = ${ar(a)} ${k<0?'−':'+'} ${f(`${kS}`,'x')}`), s2=M(`−${f(String(K),'x')} ≤ ${f(`${kS}`,'x')} ≤ ${f(String(K),'x')}`);
    return {type:'choice',opts,ans:'V',why,
     q:B(`ما نهاية ${M(`f(x) = ${f(`${cx(a)}x ${kt}`,'x')}`)} عندما يؤول ${M('x')} إلى ${M('+∞')}؟`,`Quelle est la limite de ${M(`f(x) = ${f(`${cx(a)}x ${kt}`,'x')}`)} quand ${M('x')} tend vers ${M('+∞')} ?`),
     sol:B(st(1,`من أجل ${M('x > 0')}: ${s1}.`)+st(2,`${bound}، إذن ${s2}، والطرفان يؤولان إلى ${M('0')}: حسب مبرهنة الحصر الكسر يؤول إلى ${M('0')}.`)+st(3,M(`${LX('+∞')}f(x) = ${ar(a)}`)),
           st(1,`Pour ${M('x > 0')} : ${s1}.`)+st(2,`${bound}, donc ${s2}, et les deux bornes tendent vers ${M('0')} : par le théorème des gendarmes, la fraction tend vers ${M('0')}.`)+st(3,M(`${LX('+∞')}f(x) = ${ar(a)}`)))};
  }
  const c0=nz(2,6)*pick([1,-1]), sk=tg;
  const opts=[O('Z',M('0')),O('V',M(ar(c0))),O('P',M('+∞')),NLo];
  const why={N:nl,V:B(`البسط محدود بين ${M(ar(c0-1))} و ${M(ar(c0+1))}، والمقام ${M('x<sup>2</sup>')} يكبر بلا حدود: الكسر يصغر نحو ${M('0')}.`,`Le numérateur est borné entre ${M(ar(c0-1))} et ${M(ar(c0+1))}, et le dénominateur ${M('x<sup>2</sup>')} grandit sans limite : la fraction tend vers ${M('0')}.`),
             P:B(`المقام هو الذي يكبر بلا حدود، لا البسط.`,`C'est le dénominateur qui grandit sans limite, pas le numérateur.`)};
  const s1=M(`${f(ar(c0-1),'x<sup>2</sup>')} ≤ f(x) ≤ ${f(ar(c0+1),'x<sup>2</sup>')}`);
  return {type:'choice',opts,ans:'Z',why,
   q:B(`ما نهاية ${M(`f(x) = ${f(`${ar(c0)} + ${sk}`,'x<sup>2</sup>')}`)} عندما يؤول ${M('x')} إلى ${M('+∞')}؟`,`Quelle est la limite de ${M(`f(x) = ${f(`${ar(c0)} + ${sk}`,'x<sup>2</sup>')}`)} quand ${M('x')} tend vers ${M('+∞')} ?`),
   sol:B(st(1,`${bound}، إذن ${M(`${ar(c0-1)} ≤ ${ar(c0)} + ${sk} ≤ ${ar(c0+1)}`)}، ومنه ${s1}.`)+st(2,`الطرفان يؤولان إلى ${M('0')}، إذن حسب مبرهنة الحصر ${M(`${LX('+∞')}f(x) = 0`)}.`),
         st(1,`${bound}, donc ${M(`${ar(c0-1)} ≤ ${ar(c0)} + ${sk} ≤ ${ar(c0+1)}`)}, d'où ${s1}.`)+st(2,`Les deux bornes tendent vers ${M('0')}, donc par le théorème des gendarmes ${M(`${LX('+∞')}f(x) = 0`)}.`))};}
];

/* ============================================================================
   تمرين نموذجي من نوع البكالوريا — Exercice type BAC
   ============================================================================ */
const same=s=>B(s,s);
const F1=f('x<sup>2</sup> + 3','x + 1'), G='x<sup>3</sup> + 3x − 5', F4=f('4','x + 1');
BAC[1]={
 t:B('تمرين نموذجي من نوع البكالوريا','Exercice type BAC'), pts:6,
 st:B(`<b>I.</b> ${M('f')} الدالة المعرّفة على ${M('ℝ − {−1}')} بـ ${M(`f(x) = ${F1}`)}، و ${M(Cf)} تمثيلها البياني في معلم متعامد ومتجانس.<br><b>II.</b> ${M('g')} الدالة المعرّفة على ${M('ℝ')} بـ ${M(`g(x) = ${G}`)}.`,
      `<b>I.</b> ${M('f')} est la fonction définie sur ${M('ℝ − {−1}')} par ${M(`f(x) = ${F1}`)}, et ${M(Cf)} sa courbe représentative dans un repère orthonormé.<br><b>II.</b> ${M('g')} est la fonction définie sur ${M('ℝ')} par ${M(`g(x) = ${G}`)}.`),
 parts:[
  {n:'<bdi dir="ltr">I. 1)</bdi>', nf:'I. 1)', p:0.75,
   q:B(`احسب ${M(`${LS(-1,1)}f(x)`)} و ${M(`${LS(-1,-1)}f(x)`)}، ثمّ فسّر النتيجتين بيانيا.`,`Calcule ${M(`${LS(-1,1)}f(x)`)} et ${M(`${LS(-1,-1)}f(x)`)}, puis interprète graphiquement.`),
   hint:B(`البسط يؤول إلى ${M('4')}، فادرس إشارة ${M('x + 1')} على يمين ${M('−1')} وعلى يساره.`,`Le numérateur tend vers ${M('4')} : étudie le signe de ${M('x + 1')} à droite et à gauche de ${M('−1')}.`),
   sol:[[B(`البسط يؤول إلى ${M('4 > 0')}، و ${M('x + 1 → 0')} مع ${M('x + 1 > 0')} إذا كان ${M('x > −1')}: ${M(`${LS(-1,1)}f(x) = +∞`)}.`,`Le numérateur tend vers ${M('4 > 0')} et ${M('x + 1 → 0')} avec ${M('x + 1 > 0')} si ${M('x > −1')} : ${M(`${LS(-1,1)}f(x) = +∞`)}.`),0.25],
        [B(`وإذا كان ${M('x < −1')} فإنّ ${M('x + 1 < 0')}: ${M(`${LS(-1,-1)}f(x) = −∞`)}.`,`Si ${M('x < −1')}, alors ${M('x + 1 < 0')} : ${M(`${LS(-1,-1)}f(x) = −∞`)}.`),0.25],
        [B(`المستقيم ${M('x = −1')} مقارب عمودي للمنحنى ${M(Cf)}.`,`La droite ${M('x = −1')} est asymptote verticale à ${M(Cf)}.`),0.25]]},
  {n:'<bdi dir="ltr">I. 2)</bdi>', nf:'I. 2)', p:1,
   q:B(`احسب ${M(`${LX('+∞')}f(x)`)} و ${M(`${LX('−∞')}f(x)`)}.`,`Calcule ${M(`${LX('+∞')}f(x)`)} et ${M(`${LX('−∞')}f(x)`)}.`),
   hint:B('دالة ناطقة بجوار اللانهاية: حاصل قسمة الحدّين الأعلى درجة.','Fonction rationnelle en l\'infini : quotient des termes de plus haut degré.'),
   sol:[[same(M(`${LX('+∞')}f(x) = ${LX('+∞')}${f('x<sup>2</sup>','x')} = ${LX('+∞')}x = +∞`)),0.5],
        [same(M(`${LX('−∞')}f(x) = ${LX('−∞')}x = −∞`)),0.5]]},
  {n:'<bdi dir="ltr">I. 3)</bdi> أ', nf:'I. 3) a', p:0.75,
   q:B(`تحقّق أنّه من أجل كلّ ${M('x ≠ −1')}: ${M(`f(x) = x − 1 + ${F4}`)}.`,`Vérifie que, pour tout ${M('x ≠ −1')}, ${M(`f(x) = x − 1 + ${F4}`)}.`),
   hint:B('انطلق من الطرف الأيمن ووحّد المقامات.','Pars du membre de droite et réduis au même dénominateur.'),
   sol:[[same(M(`x − 1 + ${F4} = ${f('(x − 1)(x + 1) + 4','x + 1')} = ${f('x<sup>2</sup> − 1 + 4','x + 1')} = ${F1} = f(x)`)),0.75]]},
  {n:'<bdi dir="ltr">I. 3)</bdi> ب', nf:'I. 3) b', p:0.75,
   q:B(`استنتج أنّ المستقيم ${M('(Δ) : y = x − 1')} مقارب مائل للمنحنى ${M(Cf)}.`,`Déduis-en que la droite ${M('(Δ) : y = x − 1')} est asymptote oblique à ${M(Cf)}.`),
   hint:B(`احسب نهاية ${M('f(x) − (x − 1)')} بجوار ${M('+∞')} و ${M('−∞')}.`,`Calcule la limite de ${M('f(x) − (x − 1)')} en ${M('+∞')} et en ${M('−∞')}.`),
   sol:[[same(M(`f(x) − (x − 1) = ${F4}`)),0.25],
        [same(M(`${LX('±∞')}${F4} = 0`)),0.25],
        [B(`إذن ${M('(Δ)')} مقارب مائل للمنحنى ${M(Cf)} بجوار ${M('+∞')} و ${M('−∞')}.`,`Donc ${M('(Δ)')} est asymptote oblique à ${M(Cf)} en ${M('+∞')} et en ${M('−∞')}.`),0.25]]},
  {n:'<bdi dir="ltr">I. 3)</bdi> ج', nf:'I. 3) c', p:0.75,
   q:B(`ادرس الوضع النسبي للمنحنى ${M(Cf)} والمستقيم ${M('(Δ)')}.`,`Étudie la position relative de ${M(Cf)} et de ${M('(Δ)')}.`),
   hint:B(`إشارة ${M('f(x) − (x − 1)')} هي إشارة ${M('x + 1')}.`,`Le signe de ${M('f(x) − (x − 1)')} est celui de ${M('x + 1')}.`),
   sol:[[B(`${M(`f(x) − (x − 1) = ${F4}`)} له نفس إشارة ${M('x + 1')}.`,`${M(`f(x) − (x − 1) = ${F4}`)} a le signe de ${M('x + 1')}.`),0.25],
        [B(`على ${M(']−1 ; +∞[')}: الفرق موجب، إذن ${M(Cf)} فوق ${M('(Δ)')}.`,`Sur ${M(']−1 ; +∞[')} : la différence est positive, donc ${M(Cf)} est au-dessus de ${M('(Δ)')}.`),0.25],
        [B(`على ${M(']−∞ ; −1[')}: الفرق سالب، إذن ${M(Cf)} تحت ${M('(Δ)')}.`,`Sur ${M(']−∞ ; −1[')} : la différence est négative, donc ${M(Cf)} est au-dessous de ${M('(Δ)')}.`),0.25]]},
  {n:'<bdi dir="ltr">II. 1)</bdi>', nf:'II. 1)', p:0.5,
   q:B(`بيّن أنّ الدالة ${M('g')} متزايدة تماما على ${M('ℝ')}.`,`Montre que la fonction ${M('g')} est strictement croissante sur ${M('ℝ')}.`),
   hint:B(`اكتب ${M('g')} كمجموع دالتين مرجعيتين.`,`Écris ${M('g')} comme somme de deux fonctions de référence.`),
   sol:[[B(`الدالتان ${M('x ↦ x<sup>3</sup>')} و ${M('x ↦ 3x − 5')} متزايدتان تماما على ${M('ℝ')}، إذن مجموعهما ${M('g')} متزايدة تماما على ${M('ℝ')}.`,`Les fonctions ${M('x ↦ x<sup>3</sup>')} et ${M('x ↦ 3x − 5')} sont strictement croissantes sur ${M('ℝ')}, donc leur somme ${M('g')} l'est aussi.`),0.5]]},
  {n:'<bdi dir="ltr">II. 2)</bdi>', nf:'II. 2)', p:1,
   q:B(`بيّن أنّ المعادلة ${M('g(x) = 0')} تقبل حلّا وحيدا ${M('α')} حيث ${M('1,1 < α < 1,2')}.`,`Montre que l'équation ${M('g(x) = 0')} admet une unique solution ${M('α')} telle que ${M('1,1 < α < 1,2')}.`),
   hint:B('الاستمرارية، الرتابة التامّة، ثمّ إشارة g(1,1) و g(1,2).','Continuité, stricte monotonie, puis signes de g(1,1) et g(1,2).'),
   sol:[[B(`${M('g')} مستمرّة على ${M('ℝ')} (كثير حدود) ومتزايدة تماما.`,`${M('g')} est continue sur ${M('ℝ')} (polynôme) et strictement croissante.`),0.25],
        [B(`${M('g(1,1) = −0,369 < 0')} و ${M('g(1,2) = 0,328 > 0')}.`,`${M('g(1,1) = −0,369 < 0')} et ${M('g(1,2) = 0,328 > 0')}.`),0.5],
        [B(`حسب مبرهنة القيم المتوسطة، المعادلة ${M('g(x) = 0')} تقبل حلّا وحيدا ${M('α')} (وحيدا على ${M('ℝ')} لأنّ ${M('g')} متزايدة تماما) حيث ${M('1,1 < α < 1,2')}.`,`D'après le théorème des valeurs intermédiaires, l'équation ${M('g(x) = 0')} admet une unique solution ${M('α')} (unique sur ${M('ℝ')} car ${M('g')} est strictement croissante) telle que ${M('1,1 < α < 1,2')}.`),0.25]]},
  {n:'<bdi dir="ltr">II. 3)</bdi>', nf:'II. 3)', p:0.5,
   q:B(`استنتج إشارة ${M('g(x)')} حسب قيم ${M('x')}.`,`Déduis-en le signe de ${M('g(x)')} selon les valeurs de ${M('x')}.`),
   hint:B(`${M('g(α) = 0')} و ${M('g')} متزايدة تماما.`,`${M('g(α) = 0')} et ${M('g')} est strictement croissante.`),
   sol:[[B(`إذا كان ${M('x < α')} فإنّ ${M('g(x) < g(α) = 0')}.`,`Si ${M('x < α')}, alors ${M('g(x) < g(α) = 0')}.`),0.25],
        [B(`إذا كان ${M('x > α')} فإنّ ${M('g(x) > 0')}، و ${M('g(α) = 0')}.`,`Si ${M('x > α')}, alors ${M('g(x) > 0')}, et ${M('g(α) = 0')}.`),0.25]]}
 ]};

/* ============================================================================
   جرّب بنفسك — مختبر: المستقيمات المقاربة وطريقة التنصيف
   Explorer — laboratoire : asymptotes et dichotomie
   ============================================================================ */
const LA={mode:'asy',a:1,b:-1,c:3,d:-1,x:3,k:4,lo:-3,hi:3,steps:[]};
const C1='#0F5C4E', GOLD='#B8860B', RED='#A62B39', GR='#9AA3AE', TX='#5B6676';
const r1=v=>Math.round(v*10)/10;
const txt=(x,y,s,anc,sz,col)=>`<text x="${x}" y="${y}" font-size="${sz||11}" text-anchor="${anc||'middle'}" fill="${col||TX}">${s}</text>`;
function fexpr(){
  const {a,b,c,d}=LA, base=poly([[a,1],[b,0]]);
  if(!c) return base;
  const fr_=f(ar(Math.abs(c)),xm(d));
  return base==='0'?`${c<0?'−':''}${fr_}`:`${base} ${c<0?'−':'+'} ${fr_}`;
}
function asyRead(){
  const {a,b,c,d,x}=LA, out=[];
  const fx=M(`f(x) = ${fexpr()}`);
  if(!c) return [B(`${fx}: ${M('c = 0')}، المنحنى هو المستقيم نفسه (محروما من النقطة ذات الفاصلة ${M(ar(d))}).`,`${fx} : ${M('c = 0')}, la courbe est la droite elle-même (privée du point d'abscisse ${M(ar(d))}).`)];
  const sr=Math.sign(c), D=ar(d);
  out.push(B(`${fx}. ${M(`${LS(d,1)}f(x) = ${inf(sr)}`)} و ${M(`${LS(d,-1)}f(x) = ${inf(-sr)}`)}: المستقيم ${M(`x = ${D}`)} مقارب عمودي.`,
             `${fx}. ${M(`${LS(d,1)}f(x) = ${inf(sr)}`)} et ${M(`${LS(d,-1)}f(x) = ${inf(-sr)}`)} : la droite ${M(`x = ${D}`)} est asymptote verticale.`));
  if(a) out.push(B(`${M(`${LX('+∞')}f(x) = ${inf(a)}`)} و ${M(`${LX('−∞')}f(x) = ${inf(-a)}`)}، و ${M(`f(x) − (${poly([[a,1],[b,0]])}) = ${f(ar(c),xm(d))} → 0`)}: المستقيم ${M(lineEq(a,b))} مقارب <b>مائل</b>.`,
                    `${M(`${LX('+∞')}f(x) = ${inf(a)}`)} et ${M(`${LX('−∞')}f(x) = ${inf(-a)}`)}, et ${M(`f(x) − (${poly([[a,1],[b,0]])}) = ${f(ar(c),xm(d))} → 0`)} : la droite ${M(lineEq(a,b))} est asymptote <b>oblique</b>.`));
  else out.push(B(`${M(`${LX('±∞')}f(x) = ${ar(b)}`)}: المستقيم ${M(`y = ${ar(b)}`)} مقارب <b>أفقي</b>.`,`${M(`${LX('±∞')}f(x) = ${ar(b)}`)} : la droite ${M(`y = ${ar(b)}`)} est asymptote <b>horizontale</b>.`));
  const up=c>0?B('فوق','au-dessus de'):B('تحت','au-dessous de'), dn=c>0?B('تحت','au-dessous de'):B('فوق','au-dessus de');
  out.push(B(`الوضع النسبي: المنحنى ${up.ar} المستقيم المقارب على ${M(`]${D} ; +∞[`)}، و${dn.ar}ه على ${M(`]−∞ ; ${D}[`)}.`,
             `Position : la courbe est ${up.fr} l'asymptote sur ${M(`]${D} ; +∞[`)}, et ${dn.fr} sur ${M(`]−∞ ; ${D}[`)}.`));
  if(Math.abs(x-d)>1e-9){ const g=c/(x-d);
    out.push(B(`من أجل ${M(`x = ${ar(x)}`)}: الفرق ${M(`f(x) − (${poly([[a,1],[b,0]])}) = ${ar(rnd(g,3))}`)}. حرّك ${M('x')} نحو الأطراف: الفرق يصغر نحو ${M('0')}.`,
               `Pour ${M(`x = ${ar(x)}`)} : l'écart ${M(`f(x) − (${poly([[a,1],[b,0]])}) = ${ar(rnd(g,3))}`)}. Déplace ${M('x')} vers les bords : l'écart tend vers ${M('0')}.`)); }
  return out;
}
function drawAsy(){
  const svg=document.getElementById('asvg'); if(!svg) return;
  const {a,b,c,d,x}=LA, X0=24,X1=344,Y0=10,Y1=270, W=8;
  const sx=v=>X0+(v+W)*(X1-X0)/(2*W), sy=v=>Y1-(v+W)*(Y1-Y0)/(2*W);
  const fn=t=>a*t+b+(c?c/(t-d):0), cl=v=>Math.max(-40,Math.min(40,v));
  let h=`<defs><clipPath id="aclip"><rect x="${X0}" y="${Y0}" width="${X1-X0}" height="${Y1-Y0}"/></clipPath></defs>`;
  h+=`<rect x="${X0}" y="${Y0}" width="${X1-X0}" height="${Y1-Y0}" fill="none" stroke="#E2DDD2"/><g clip-path="url(#aclip)">`;
  for(let t=-W;t<=W;t+=2) h+=`<line x1="${sx(t)}" y1="${Y0}" x2="${sx(t)}" y2="${Y1}" stroke="#EFEBE3"/><line x1="${X0}" y1="${sy(t)}" x2="${X1}" y2="${sy(t)}" stroke="#EFEBE3"/>`;
  h+=`<line x1="${X0}" y1="${sy(0)}" x2="${X1}" y2="${sy(0)}" stroke="${GR}"/><line x1="${sx(0)}" y1="${Y0}" x2="${sx(0)}" y2="${Y1}" stroke="${GR}"/>`;
  if(c) h+=`<line x1="${sx(d)}" y1="${Y0}" x2="${sx(d)}" y2="${Y1}" stroke="${RED}" stroke-dasharray="6 4" stroke-width="1.5"/>`;
  h+=`<line x1="${sx(-W)}" y1="${sy(a*-W+b)}" x2="${sx(W)}" y2="${sy(a*W+b)}" stroke="${GOLD}" stroke-dasharray="7 4" stroke-width="1.8"/>`;
  const branch=(t0,t1)=>{ let p=''; const n=160; for(let i=0;i<=n;i++){ const t=t0+(t1-t0)*i/n; p+=(i?' L':'M')+sx(t).toFixed(1)+' '+sy(cl(fn(t))).toFixed(1); } return `<path d="${p}" fill="none" stroke="${C1}" stroke-width="2.4"/>`; };
  if(c){ const e=0.004; if(d>-W) h+=branch(-W,d-e); if(d<W) h+=branch(d+e,W); } else h+=branch(-W,W);
  if(c&&Math.abs(x-d)>1e-9){ const y1=fn(x), y2=a*x+b;
    h+=`<line x1="${sx(x)}" y1="${sy(cl(y1))}" x2="${sx(x)}" y2="${sy(cl(y2))}" stroke="${RED}" stroke-width="2"/>`
      +`<circle cx="${sx(x)}" cy="${sy(cl(y1))}" r="4.5" fill="${C1}"/><circle cx="${sx(x)}" cy="${sy(cl(y2))}" r="4" fill="${GOLD}"/>`; }
  h+='</g>';
  h+=`<line x1="${X0}" y1="287" x2="${X0+22}" y2="287" stroke="${GOLD}" stroke-dasharray="7 4" stroke-width="1.8"/>`+txt(X0+28,291,'y = ax + b','start',11,GOLD)
    +(c?`<line x1="${X0+120}" y1="287" x2="${X0+142}" y2="287" stroke="${RED}" stroke-dasharray="6 4" stroke-width="1.5"/>`+txt(X0+148,291,`x = ${ar(d)}`,'start',11,RED):'')
    +`<line x1="${X0+220}" y1="287" x2="${X0+242}" y2="287" stroke="${C1}" stroke-width="2.4"/>`+txt(X0+248,291,'(C<tspan font-size="8.5" dy="3">f</tspan>)','start',11,C1);
  svg.innerHTML=h;
  const el=document.getElementById('aread'); if(el) el.innerHTML=fix(asyRead().map(o=>`<p class="obs">${tr(o)}</p>`).join(''));
}
/* ---- dichotomie sur f(x) = x³ + x − k ---- */
const fk=t=>t*t*t+t-LA.k;
function dicReset(){ LA.lo=-3; LA.hi=3; LA.steps=[]; }
function dicStep(){
  if(LA.steps.length>=14) return;
  const m=(LA.lo+LA.hi)/2, v=fk(m);
  LA.steps.push({lo:LA.lo,hi:LA.hi,m,v});
  if(v===0){ LA.lo=LA.hi=m; } else if(v<0) LA.lo=m; else LA.hi=m;
}
const n5=v=>ar(Math.round(v*1e5)/1e5);
function drawDic(){
  const svg=document.getElementById('asvg'); if(!svg) return;
  const {lo,hi}=LA, w=Math.max(hi-lo,1e-9), xa=lo-0.5*w, xb=hi+0.5*w, X0=40,X1=344,Y0=10,Y1=262;
  let ya=Math.min(fk(xa),0), yb=Math.max(fk(xb),0); const pad=(yb-ya)*0.08||1; ya-=pad; yb+=pad;
  const sx=v=>X0+(v-xa)*(X1-X0)/(xb-xa), sy=v=>Y1-(v-ya)*(Y1-Y0)/(yb-ya);
  let h=`<rect x="${X0}" y="${Y0}" width="${X1-X0}" height="${Y1-Y0}" fill="none" stroke="#E2DDD2"/>`;
  h+=`<rect x="${sx(lo)}" y="${Y0}" width="${Math.max(1,sx(hi)-sx(lo))}" height="${Y1-Y0}" fill="${GOLD}" fill-opacity="0.13"/>`;
  h+=`<line x1="${X0}" y1="${sy(0)}" x2="${X1}" y2="${sy(0)}" stroke="${GR}" stroke-width="1.3"/>`;
  let p=''; for(let i=0;i<=120;i++){ const t=xa+(xb-xa)*i/120; p+=(i?' L':'M')+sx(t).toFixed(1)+' '+sy(fk(t)).toFixed(1); }
  h+=`<path d="${p}" fill="none" stroke="${C1}" stroke-width="2.4"/>`;
  h+=`<circle cx="${sx(lo)}" cy="${sy(fk(lo))}" r="4.5" fill="${RED}"/><circle cx="${sx(hi)}" cy="${sy(fk(hi))}" r="4.5" fill="${C1}"/>`;
  h+=txt(sx(lo),Y1+16,n5(lo),'middle',10.5,RED)+txt(sx(hi),Y1+30,n5(hi),'middle',10.5,C1);
  h+=txt(X0+4,Y0+14,'y = x³ + x − '+(LA.k<0?`(${ar(LA.k)})`:ar(LA.k)),'start',11,C1);
  svg.innerHTML=h;
  const el=document.getElementById('aread'); if(!el) return;
  const rows=LA.steps.slice(-6).map((s,i)=>`<tr><td>${LA.steps.length-Math.min(6,LA.steps.length)+i+1}</td><td>${M(`]${n5(s.lo)} ; ${n5(s.hi)}[`)}</td><td>${M(n5(s.m))}</td><td>${s.v===0?'0':s.v<0?'−':'+'}</td></tr>`).join('');
  const amp=n5(hi-lo), found=lo===hi;
  el.innerHTML=fix(`<p class="obs">${tr(B(
    `${M(`f(x) = x<sup>3</sup> + x − ${par(LA.k)}`)} مستمرّة ومتزايدة تماما، و ${M('f(−3) &lt; 0 &lt; f(3)')}: المعادلة ${M('f(x) = 0')} تقبل حلّا وحيدا ${M('α')}. في كلّ خطوة نحسب ${M('f')} في منتصف المجال ونحتفظ بالنصف الذي تتغيّر فيه الإشارة.`,
    `${M(`f(x) = x<sup>3</sup> + x − ${par(LA.k)}`)} est continue et strictement croissante, et ${M('f(−3) &lt; 0 &lt; f(3)')} : l'équation ${M('f(x) = 0')} a une unique solution ${M('α')}. À chaque étape on calcule ${M('f')} au milieu de l'intervalle et on garde la moitié où le signe change.`))}</p>
    ${rows?`<table class="dt"><tr><th>${tr(B('الخطوة','Étape'))}</th><th>${tr(B('المجال','Intervalle'))}</th><th>${tr(B('المنتصف','Milieu'))} ${M('m')}</th><th>${tr(B('إشارة','Signe de'))} ${M('f(m)')}</th></tr>${rows}</table>`:''}
    <p class="obs">${found?tr(B(`${M('f(m) = 0')}: وجدنا الحلّ بالضبط، ${M(`α = ${n5(lo)}`)}.`,`${M('f(m) = 0')} : on a trouvé la solution exacte, ${M(`α = ${n5(lo)}`)}.`))
      :tr(B(`${M(`α ∈ ]${n5(lo)} ; ${n5(hi)}[`)} — سعة الحصر: ${M(amp)} (عدد الخطوات: ${M(String(LA.steps.length))}).`,`${M(`α ∈ ]${n5(lo)} ; ${n5(hi)}[`)} — amplitude : ${M(amp)} (après ${M(String(LA.steps.length))} étape(s)).`))}</p>`);
}

LABS[1]=function(p){
  const sl=(id,lab,min,max,step,val)=>`<label class="sl"><span><span class="m">${lab} = <b class="lat" id="v${id}">${ar(val)}</b></span></span><input type="range" id="s${id}" min="${min}" max="${max}" step="${step}" value="${val}"></label>`;
  const modes=[['asy',B('المستقيمات المقاربة','Asymptotes')],['dic',B('القيم المتوسطة: التنصيف','Valeurs intermédiaires : dichotomie')]];
  const asy=LA.mode==='asy';
  p.innerHTML=fix(`<div class="lab">
   <div class="labhead"><b>${asy?tr(B('مختبر المستقيمات المقاربة','Laboratoire des asymptotes'))+' — '+M('f(x) = ax + b + '+f('c','x − d')):tr(B('طريقة التنصيف','La dichotomie'))+' — '+M('f(x) = x<sup>3</sup> + x − k')}</b>
    <span class="labtip">${asy?tr(B('حرّك المؤشّرات وشاهد المنحنى ومستقيماته المقاربة','Déplace les curseurs et observe la courbe et ses asymptotes')):tr(B('اضغط «خطوة» لتنصيف المجال','Appuie sur « Étape » pour couper l\'intervalle en deux'))}</span></div>
   <div class="btnrow labmodes">${modes.map(([k,x])=>`<button class="btn small ${LA.mode===k?'':'sec2'}" data-lm="${k}">${tr(x)}</button>`).join('')}</div>
   <div class="labctl">${asy?sl('a','a',-2,2,0.5,LA.a)+sl('b','b',-4,4,0.5,LA.b)+sl('c','c',-4,4,0.5,LA.c)+sl('d','d',-3,3,0.5,LA.d)+sl('x','x',-8,8,0.1,LA.x):sl('k','k',-8,8,1,LA.k)}</div>
   <svg class="labsvg" id="asvg" viewBox="0 0 360 300" style="direction:ltr" role="img" aria-label="${tr(asy?B('منحنى الدالة ومستقيماتها المقاربة','Courbe de la fonction et ses asymptotes'):B('حصر الحلّ بطريقة التنصيف','Encadrement de la solution par dichotomie'))}"></svg>
   ${asy?'':`<div class="btnrow"><button class="btn small" id="dstep">${tr(B('الخطوة الموالية','Étape suivante'))}</button><button class="btn small sec2" id="dreset">${tr(B('إعادة','Recommencer'))}</button></div>`}
   <div class="labread" id="aread"></div>
   <div class="labnote">${tr(asy?B(
    `<b>لاحظ:</b> المسافة العمودية (القطعة الحمراء) بين المنحنى والمستقيم ${M('y = ax + b')} هي ${M(f('c','x − d'))}: تصغر نحو ${M('0')} كلّما ابتعد ${M('x')}. ضع ${M('a = 0')} ليصبح المستقيم المقارب أفقيا، وغيّر إشارة ${M('c')} لترى الوضع النسبي ينقلب.`,
    `<b>Observe :</b> l'écart vertical (segment rouge) entre la courbe et la droite ${M('y = ax + b')} vaut ${M(f('c','x − d'))} : il tend vers ${M('0')} quand ${M('x')} s'éloigne. Mets ${M('a = 0')} pour obtenir une asymptote horizontale, et change le signe de ${M('c')} pour voir la position relative s'inverser.`)
    :B(`<b>لاحظ:</b> بعد ${M('n')} خطوة تصبح سعة الحصر ${M(f('6','2<sup>n</sup>'))}. لكي تكون أصغر من ${M('0,01')} يكفي ${M('10')} خطوات تقريبا (${M('6 ÷ 1024 ≈ 0,006')}). الرسم «يقترب» من الحلّ في كلّ خطوة.`,
       `<b>Observe :</b> après ${M('n')} étapes, l'amplitude vaut ${M(f('6','2<sup>n</sup>'))}. Pour descendre sous ${M('0,01')}, il suffit d'environ ${M('10')} étapes (${M('6 ÷ 1024 ≈ 0,006')}). Le graphique « zoome » sur la solution à chaque étape.`))}</div></div>`);
  p.querySelectorAll('[data-lm]').forEach(bt=>bt.onclick=()=>{ LA.mode=bt.dataset.lm; LABS[1](p); });
  if(asy){
    [['a','a'],['b','b'],['c','c'],['d','d'],['x','x']].forEach(([id,k])=>{ const s=p.querySelector('#s'+id);
      s.oninput=()=>{ LA[k]=id==='x'?r1(+s.value):Math.round(+s.value*2)/2; p.querySelector('#v'+id).textContent=ar(LA[k]); drawAsy(); }; });
    drawAsy();
  } else {
    const s=p.querySelector('#sk'); s.oninput=()=>{ LA.k=+s.value; p.querySelector('#vk').textContent=ar(LA.k); dicReset(); drawDic(); };
    p.querySelector('#dstep').onclick=()=>{ dicStep(); drawDic(); };
    p.querySelector('#dreset').onclick=()=>{ dicReset(); drawDic(); };
    drawDic();
  }
};
})();
