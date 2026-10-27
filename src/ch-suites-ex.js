/* ============================================================================
   الباب 5 — المتتاليات: مولّد التمارين، تمرين البكالوريا، المختبر
   Chapitre 5 — Suites : générateurs d'exercices, exercice type BAC, laboratoire
   Chaque générateur renvoie {type, q, ans, sol, miss|why|missF} ; q et sol sont des objets {ar,fr}.
   ============================================================================ */
(function(){
const U=i=>`u<sub>${i}</sub>`, V=i=>`v<sub>${i}</sub>`;
const un=U('n'), un1=U('n+1'), u0=U(0), vn=V('n'), vn1=V('n+1'), v0=V(0);
const LIM='lim<sub>n→+∞</sub> ';
const S='(u<sub>n</sub>)';
const st=(k,html)=>`<div class="st">${k}) ${html}</div>`;
const N_=n=>M(String(n));
const qS=(p,d)=>d===1?ar(p):(p<0?'−'+f(-p,d):f(p,d));                       /* q = p/d */
const qP=(p,d,e)=>(d!==1||p<0?`(${qS(p,d)})`:qS(p,d))+`<sup>${e}</sup>`;      /* q^e */
const pn=v=>v<0?`(${nice(v)})`:nice(v);
const kx=k=>k===1?'':k===-1?'−':ar(k)+' × ';                                 /* k × … */
const addC=d=>d?` ${sgn(d)} ${ar(Math.abs(d))}`:'';
/* d + c·n  →  « 7 − 3n » */
const lin=(d,c)=>{ const cn=(Math.abs(c)===1?'':ar(Math.abs(c)))+'n'; return d===0?(c<0?'−':'')+cn:`${ar(d)} ${sgn(c)} ${cn}`; };
const lin1=(d,c)=>{ const cn=(Math.abs(c)===1?'':ar(Math.abs(c)))+'(n + 1)'; return d===0?(c<0?'−':'')+cn:`${ar(d)} ${sgn(c)} ${cn}`; };

GEN[5]=[
/* 0 — terme d'une suite arithmétique */
()=>{ const p=pick([0,1]), a=nz(-12,12), r=nz(-7,7), n=ri(10,40), k=n-p, ans=a+k*r;
  const fo=p===0?`${un} = ${u0} + nr`:`${un} = ${U(1)} + (n − 1)r`;
  const calc=`${U(n)} = ${ar(a)} + ${k} × ${par(r)} = ${ar(a)} ${sgn(k*r)} ${Math.abs(k*r)} = ${ar(ans)}`;
  return {type:'num',ans,
   q:B(`${M(S)} متتالية حسابية حدّها الأوّل ${M(`${U(p)} = ${ar(a)}`)} وأساسها ${M(`r = ${ar(r)}`)}. احسب ${M(U(n))}.`,
       `${M(S)} est une suite arithmétique de premier terme ${M(`${U(p)} = ${ar(a)}`)} et de raison ${M(`r = ${ar(r)}`)}. Calcule ${M(U(n))}.`),
   miss:[[a+(k-1)*r,B(`من ${M(U(p))} إلى ${M(U(n))} نضيف الأساس ${M(`${n} − ${p} = ${k}`)} مرّة، لا ${N_(k-1)} مرّة.`,
                     `De ${M(U(p))} à ${M(U(n))}, on ajoute la raison ${M(`${n} − ${p} = ${k}`)} fois, pas ${N_(k-1)} fois.`)],
         [a+(k+1)*r,B(`نضيف الأساس ${M(`${n} − ${p} = ${k}`)} مرّة وليس ${N_(k+1)}: انتبه إلى رتبة الحدّ الأوّل.`,
                     `On ajoute la raison ${M(`${n} − ${p} = ${k}`)} fois, pas ${N_(k+1)} : attention au rang du premier terme.`)]],
   sol:B(st(1,`<b>الحدّ العام:</b> ${M(fo)}`)+st(2,`<b>بالتعويض:</b> ${M(calc)}`),
         st(1,`<b>Terme général :</b> ${M(fo)}`)+st(2,`<b>On remplace :</b> ${M(calc)}`))};},

/* 1 — raison d'une suite arithmétique à partir de deux termes */
()=>{ const p=ri(0,4), d=ri(3,12), k=p+d, r=nz(-8,8), a=ri(-15,15), b=a+d*r;
  const miss=[[(b-a)/(d+1),B(`بين ${M(U(p))} و ${M(U(k))} توجد ${M(`${k} − ${p} = ${d}`)} خطوة، وليس ${N_(d+1)}.`,
                             `Entre ${M(U(p))} et ${M(U(k))}, il y a ${M(`${k} − ${p} = ${d}`)} pas, et non ${N_(d+1)}.`)],
     [b-a,B(`${M(`${ar(b)} − ${par(a)} = ${ar(b-a)}`)} هو التغيّر الكلّي عبر ${N_(d)} خطوات: يجب قسمته على ${N_(d)}.`,
            `${M(`${ar(b)} − ${par(a)} = ${ar(b-a)}`)} est la variation totale sur ${N_(d)} pas : il faut la diviser par ${N_(d)}.`)]];
  if(p>0) miss.push([(b-a)/k,B(`قسمت على ${N_(k)} (رتبة الحدّ) بدل ${M(`${k} − ${p} = ${d}`)}.`,`Tu as divisé par ${N_(k)} (le rang) au lieu de ${M(`${k} − ${p} = ${d}`)}.`)]);
  const s2=st(2,M(`${d}r = ${ar(b)} − ${par(a)} = ${ar(b-a)}`));
  return {type:'num',ans:r,miss,
   q:B(`${M(S)} متتالية حسابية حيث ${M(`${U(p)} = ${ar(a)}`)} و ${M(`${U(k)} = ${ar(b)}`)}. احسب أساسها ${M('r')}.`,
       `${M(S)} est une suite arithmétique telle que ${M(`${U(p)} = ${ar(a)}`)} et ${M(`${U(k)} = ${ar(b)}`)}. Calcule sa raison ${M('r')}.`),
   sol:B(st(1,`${M(`${U(k)} = ${U(p)} + (${k} − ${p})r`)}، أي ${M(`${ar(b)} = ${ar(a)} + ${d}r`)}`)+s2+st(3,`<b>النتيجة:</b> ${M(`r = ${f(ar(b-a),d)} = ${ar(r)}`)}`),
         st(1,`${M(`${U(k)} = ${U(p)} + (${k} − ${p})r`)}, c'est-à-dire ${M(`${ar(b)} = ${ar(a)} + ${d}r`)}`)+s2+st(3,`<b>Résultat :</b> ${M(`r = ${f(ar(b-a),d)} = ${ar(r)}`)}`))};},

/* 2 — terme d'une suite géométrique */
()=>{ let a,qp,qd=1,n;
  if(Math.random()<0.6){ a=pick([1,2,3,4,5,-1,-2,-3]); qp=pick([2,3,-2,-3]); n=ri(3,Math.abs(qp)===3?6:8); }
  else { qp=1; qd=2; a=pick([64,128,192,320,-64,-192]); n=ri(2,6); }
  const q=qp/qd, qn=Math.pow(q,n), ans=a*qn;
  const s2=st(2,M(`${U(n)} = ${par(a)} × ${qP(qp,qd,n)} = ${par(a)} × ${pn(qn)}`));
  return {type:'num',ans,
   q:B(`${M(S)} متتالية هندسية حدّها الأوّل ${M(`${u0} = ${ar(a)}`)} وأساسها ${M(`q = ${qS(qp,qd)}`)}. احسب ${M(U(n))}.`,
       `${M(S)} est une suite géométrique de premier terme ${M(`${u0} = ${ar(a)}`)} et de raison ${M(`q = ${qS(qp,qd)}`)}. Calcule ${M(U(n))}.`),
   miss:[[a*Math.pow(q,n-1),B(`${M(`${U(n)} = ${u0} × q<sup>${n}</sup>`)}: الأسّ ${N_(n)} وليس ${N_(n-1)}.`,`${M(`${U(n)} = ${u0} × q<sup>${n}</sup>`)} : l'exposant est ${N_(n)}, pas ${N_(n-1)}.`)],
         [a*Math.pow(q,n+1),B(`من ${M(u0)} إلى ${M(U(n))} نضرب في ${M('q')} بالضبط ${N_(n)} مرّة.`,`De ${M(u0)} à ${M(U(n))}, on multiplie par ${M('q')} exactement ${N_(n)} fois.`)],
         [a*q*n,B(`ضربت في ${M('q × n')}: في المتتالية الهندسية نرفع ${M('q')} إلى القوّة ${M('n')}.`,`Tu as multiplié par ${M('q × n')} : dans une suite géométrique, on élève ${M('q')} à la puissance ${M('n')}.`)],
         [a+n*q,B(`هذه علاقة المتتالية الحسابية ${M(`${u0} + nq`)}: هنا نضرب في الأساس، لا نضيفه.`,`C'est la formule d'une suite arithmétique, ${M(`${u0} + nq`)} : ici on multiplie par la raison, on ne l'ajoute pas.`)]],
   sol:B(st(1,`<b>الحدّ العام:</b> ${M(`${un} = ${u0} × q<sup>n</sup>`)}`)+s2+st(3,`<b>النتيجة:</b> ${M(`${U(n)} = ${ar(ans)}`)}`),
         st(1,`<b>Terme général :</b> ${M(`${un} = ${u0} × q<sup>n</sup>`)}`)+s2+st(3,`<b>Résultat :</b> ${M(`${U(n)} = ${ar(ans)}`)}`))};},

/* 3 — somme de termes d'une suite arithmétique */
()=>{ const p=pick([0,1]), a=ri(-10,15), r=nz(-5,6), n=p+ri(8,30), N=n-p+1, last=a+(n-p)*r, ans=N*(a+last)/2;
  const s2=M(`${U(n)} = ${ar(a)} + ${n-p} × ${par(r)} = ${ar(last)}`), s3=st(3,M(`S = ${N} × ${f(`${ar(a)} + ${par(last)}`,'2')} = ${ar(ans)}`));
  return {type:'num',ans,
   q:B(`${M(S)} متتالية حسابية حدّها الأوّل ${M(`${U(p)} = ${ar(a)}`)} وأساسها ${M(`r = ${ar(r)}`)}. احسب المجموع ${M(`S = ${U(p)} + ${U(p+1)} + … + ${U(n)}`)}.`,
       `${M(S)} est une suite arithmétique de premier terme ${M(`${U(p)} = ${ar(a)}`)} et de raison ${M(`r = ${ar(r)}`)}. Calcule la somme ${M(`S = ${U(p)} + ${U(p+1)} + … + ${U(n)}`)}.`),
   miss:[[(N-1)*(a+last)/2,B(`عدد الحدود من ${M(U(p))} إلى ${M(U(n))} هو ${M(`${n} − ${p} + 1 = ${N}`)}، وليس ${N_(N-1)}.`,`De ${M(U(p))} à ${M(U(n))}, il y a ${M(`${n} − ${p} + 1 = ${N}`)} termes, pas ${N_(N-1)}.`)],
         [(N+1)*(a+last)/2,B(`عدد الحدود هو ${M(`${n} − ${p} + 1 = ${N}`)}، وليس ${N_(N+1)}.`,`Le nombre de termes est ${M(`${n} − ${p} + 1 = ${N}`)}, pas ${N_(N+1)}.`)],
         [N*(a+last),B('نسيت القسمة على 2: المجموع = عدد الحدود × (الأوّل + الأخير) ÷ 2.','Tu as oublié de diviser par 2 : somme = nombre de termes × (premier + dernier) ÷ 2.')]],
   sol:B(st(1,`<b>عدد الحدود:</b> ${M(`N = ${n} − ${p} + 1 = ${N}`)}`)+st(2,`<b>الحدّ الأخير:</b> ${s2}`)+s3,
         st(1,`<b>Nombre de termes :</b> ${M(`N = ${n} − ${p} + 1 = ${N}`)}`)+st(2,`<b>Dernier terme :</b> ${s2}`)+s3)};},

/* 4 — somme de termes d'une suite géométrique */
()=>{ const a=pick([1,2,3,5,-1,-2]), q=pick([2,3,-2]), n=ri(q===3?3:4,q===3?6:8), N=n+1, X=Math.pow(q,N), ans=a*(1-X)/(1-q);
  const miss=[[a*(1-Math.pow(q,n))/(1-q),B(`من ${M(u0)} إلى ${M(U(n))} يوجد ${M(`${n} + 1 = ${N}`)} حدّا: الأسّ في الدستور ${N_(N)} وليس ${N_(n)}.`,`De ${M(u0)} à ${M(U(n))}, il y a ${M(`${n} + 1 = ${N}`)} termes : l'exposant dans la formule est ${N_(N)}, pas ${N_(n)}.`)],
     [a*(1-Math.pow(q,N+1))/(1-q),B(`الأسّ هو عدد الحدود ${N_(N)}، وليس ${N_(N+1)}.`,`L'exposant est le nombre de termes, ${N_(N)}, pas ${N_(N+1)}.`)],
     [a*Math.pow(q,n),B(`هذا هو الحدّ الأخير ${M(U(n))}، وليس المجموع.`,`C'est le dernier terme ${M(U(n))}, pas la somme.`)]];
  if(a!==1) miss.push([(1-X)/(1-q),B(`نسيت الضرب في الحدّ الأوّل ${M(`${u0} = ${ar(a)}`)}.`,`Tu as oublié de multiplier par le premier terme ${M(`${u0} = ${ar(a)}`)}.`)]);
  const s2=st(2,M(`S = ${u0} × ${f('1 − q<sup>N</sup>','1 − q')} = ${par(a)} × ${f(`1 − ${par(q)}<sup>${N}</sup>`,`1 − ${par(q)}`)}`));
  const s3=st(3,M(`S = ${par(a)} × ${f(ar(1-X),ar(1-q))} = ${ar(ans)}`));
  return {type:'num',ans,miss,
   q:B(`${M(S)} متتالية هندسية حدّها الأوّل ${M(`${u0} = ${ar(a)}`)} وأساسها ${M(`q = ${ar(q)}`)}. احسب ${M(`S = ${u0} + ${U(1)} + … + ${U(n)}`)}.`,
       `${M(S)} est une suite géométrique de premier terme ${M(`${u0} = ${ar(a)}`)} et de raison ${M(`q = ${ar(q)}`)}. Calcule ${M(`S = ${u0} + ${U(1)} + … + ${U(n)}`)}.`),
   sol:B(st(1,`<b>عدد الحدود:</b> ${M(`N = ${n} + 1 = ${N}`)}`)+s2+s3,
         st(1,`<b>Nombre de termes :</b> ${M(`N = ${n} + 1 = ${N}`)}`)+s2+s3)};},

/* 5 — nature d'une suite donnée explicitement (QCM) */
()=>{ const OP=[{k:'A',ar:'حسابية',fr:'arithmétique'},{k:'G',ar:'هندسية',fr:'géométrique'},{k:'N',ar:'لا حسابية ولا هندسية',fr:'ni arithmétique ni géométrique'}];
  const kind=pick(['A','G','N']); let expr,sol,why;
  if(kind==='A'){ const c=nz(-6,6), d=ri(-9,9); expr=lin(d,c);
    const s1=st(1,M(`${un1} − ${un} = ${lin1(d,c)} − (${lin(d,c)}) = ${ar(c)}`));
    sol=B(s1+st(2,`الفرق ثابت لا يتعلّق بـ ${M('n')}: المتتالية <b>حسابية</b> أساسها ${M(`r = ${ar(c)}`)} وحدّها الأوّل ${M(`${u0} = ${ar(d)}`)}.`),
          s1+st(2,`La différence est constante, elle ne dépend pas de ${M('n')} : la suite est <b>arithmétique</b> de raison ${M(`r = ${ar(c)}`)} et de premier terme ${M(`${u0} = ${ar(d)}`)}.`));
    why={G:B(`حاصل القسمة ${M(f(un1,un))} ليس ثابتا هنا. احسب الفرق ${M(`${un1} − ${un}`)}: ستجده ثابتا.`,`Le quotient ${M(f(un1,un))} n'est pas constant ici. Calcule la différence ${M(`${un1} − ${un}`)} : elle est constante.`),
         N:B(`احسب الفرق ${M(`${un1} − ${un}`)}: ستجده ثابتا يساوي ${M(ar(c))}.`,`Calcule la différence ${M(`${un1} − ${un}`)} : elle est constante, égale à ${M(ar(c))}.`)};
  } else if(kind==='G'){ const c=pick([1,2,3,5,-2,-3]), q=pick([2,3,4,5]); const cc=c===1?'':ar(c)+' × '; expr=`${cc}${q}<sup>n</sup>`;
    const s1=M(`${f(un1,un)} = ${f(`${cc}${q}<sup>n+1</sup>`,`${cc}${q}<sup>n</sup>`)} = ${q}`);
    sol=B(st(1,`كلّ الحدود غير معدومة، و ${s1}`)+st(2,`حاصل القسمة ثابت: المتتالية <b>هندسية</b> أساسها ${M(`q = ${q}`)} وحدّها الأوّل ${M(`${u0} = ${ar(c)}`)}.`),
          st(1,`Tous les termes sont non nuls, et ${s1}`)+st(2,`Le quotient est constant : la suite est <b>géométrique</b> de raison ${M(`q = ${q}`)} et de premier terme ${M(`${u0} = ${ar(c)}`)}.`));
    const t3=M(`${ar(c)} ; ${ar(c*q)} ; ${ar(c*q*q)}`);
    why={A:B(`الحدود ${t3} لا تتغيّر بنفس المقدار: الفرق ${M(`${un1} − ${un}`)} يتعلّق بـ ${M('n')}. احسب ${M(f(un1,un))}.`,`Les termes ${t3} ne varient pas de la même quantité : la différence ${M(`${un1} − ${un}`)} dépend de ${M('n')}. Calcule ${M(f(un1,un))}.`),
         N:B(`احسب ${M(f(un1,un))}: ستجده ثابتا يساوي ${N_(q)}.`,`Calcule ${M(f(un1,un))} : il est constant, égal à ${N_(q)}.`)};
  } else { const sq=Math.random()<0.5, d=ri(1,sq?5:4); expr=sq?`n² + ${d}`:`2<sup>n</sup> + ${d}`;
    const g=n=>sq?n*n+d:Math.pow(2,n)+d, a0=g(0), a1=g(1), a2=g(2);
    const s1=st(1,`${M(`${u0} = ${a0}`)} ، ${M(`${U(1)} = ${a1}`)} ، ${M(`${U(2)} = ${a2}`)}`);
    const dA=`${M(`${U(1)} − ${u0} = ${a1-a0}`)}`, dB=`${M(`${U(2)} − ${U(1)} = ${a2-a1}`)}`;
    const rA=`${M(`${f(U(1),u0)} = ${frs(a1,a0)}`)}`, rB=`${M(`${f(U(2),U(1))} = ${frs(a2,a1)}`)}`;
    sol=B(s1+st(2,`${dA} و ${dB}: الفرق ليس ثابتا، إذن ليست حسابية.`)+st(3,`${rA} و ${rB}: حاصل القسمة ليس ثابتا، إذن ليست هندسية.`),
          s1+st(2,`${dA} et ${dB} : la différence n'est pas constante, donc elle n'est pas arithmétique.`)+st(3,`${rA} et ${rB} : le quotient n'est pas constant, donc elle n'est pas géométrique.`));
    why={A:B(`${dA} بينما ${dB}: الفرق ليس ثابتا.`,`${dA} alors que ${dB} : la différence n'est pas constante.`),
         G:B(`${rA} بينما ${rB}: حاصل القسمة ليس ثابتا.`,`${rA} alors que ${rB} : le quotient n'est pas constant.`)};
  }
  return {type:'choice',opts:OP,ans:kind,why,sol,
   q:B(`ما طبيعة المتتالية المعرّفة على ${M('ℕ')} بـ ${M(`${un} = ${expr}`)}؟`,`Quelle est la nature de la suite définie sur ${M('ℕ')} par ${M(`${un} = ${expr}`)} ?`)};},

/* 6 — sens de variation (QCM) */
()=>{ const OP=[{k:'C',ar:'متزايدة تماما',fr:'strictement croissante'},{k:'D',ar:'متناقصة تماما',fr:'strictement décroissante'},{k:'X',ar:'ليست رتيبة',fr:'ni croissante ni décroissante'}];
  const v=pick(['lin','geo','geo','quad']); let expr,ans,sol;
  const pos=B('موجب','positive'), neg=B('سالب','négative');
  if(v==='lin'){ const c=nz(-6,6), d=ri(-9,9); expr=lin(d,c); ans=c>0?'C':'D';
    const s1=st(1,M(`${un1} − ${un} = ${ar(c)}`));
    sol=B(s1+st(2,`الفرق ${c>0?'موجب':'سالب'} تماما، إذن المتتالية ${c>0?'متزايدة':'متناقصة'} تماما (حسابية أساسها ${M(ar(c))}).`),
          s1+st(2,`La différence est strictement ${c>0?'positive':'négative'} : la suite est strictement ${c>0?'croissante':'décroissante'} (arithmétique de raison ${M(ar(c))}).`));
  } else if(v==='geo'){ const k=pick([1,2,3,4,-1,-2,-3]), [qp,qd]=pick([[2,1],[3,1],[1,2],[1,3],[2,3],[-2,1],[-1,2]]), q=qp/qd;
    expr=kx(k)+qP(qp,qd,'n');
    if(q<0){ ans='X'; const t0=k, t1=k*q, t2=k*q*q;
      const tt=`${M(`${u0} = ${nice(t0)}`)} ، ${M(`${U(1)} = ${nice(t1)}`)} ، ${M(`${U(2)} = ${nice(t2)}`)}`;
      const cmp=`${M(`${U(1)} ${t1<t0?'<':'>'} ${u0}`)}`, cmp2=`${M(`${U(2)} ${t2<t1?'<':'>'} ${U(1)}`)}`;
      sol=B(st(1,`الأساس ${M(`q = ${qS(qp,qd)}`)} سالب، فإشارات الحدود تتناوب: ${tt}.`)+st(2,`${cmp} لكنّ ${cmp2}: المتتالية ليست رتيبة.`),
            st(1,`La raison ${M(`q = ${qS(qp,qd)}`)} est négative, donc les signes des termes alternent : ${tt}.`)+st(2,`${cmp} mais ${cmp2} : la suite n'est pas monotone.`));
    } else { const s=Math.sign(k)*Math.sign(q-1); ans=s>0?'C':'D';
      const s1=st(1,M(`${un1} − ${un} = ${kx(k)}${qP(qp,qd,'n')} × (${qS(qp,qd)} − 1) = ${kx(k)}${qP(qp,qd,'n')} × ${pn(q-1)}`));
      sol=B(s1+st(2,`${M(qP(qp,qd,'n')+' > 0')}، و ${M(ar(k))} ${k>0?'موجب':'سالب'}، و ${M(`${qS(qp,qd)} − 1`)} ${q>1?'موجب':'سالب'}: الفرق ${s>0?'موجب':'سالب'} تماما، إذن المتتالية ${s>0?'متزايدة':'متناقصة'} تماما.`),
            s1+st(2,`${M(qP(qp,qd,'n')+' > 0')}, ${M(ar(k))} est ${k>0?'positif':'négatif'} et ${M(`${qS(qp,qd)} − 1`)} est ${q>1?'positif':'négatif'} : la différence est strictement ${s>0?'positive':'négative'}, donc la suite est strictement ${s>0?'croissante':'décroissante'}.`));
    }
  } else { const kind=pick(['up','mix','down']), d=ri(-5,5);
    if(kind==='mix'){ const c=ri(3,7); expr=`n² − ${c}n${addC(d)}`; ans='X';
      const s1=st(1,M(`${un1} − ${un} = 2n + 1 − ${c} = 2n − ${c-1}`));
      const e=`${M(`${U(1)} − ${u0} = ${1-c} < 0`)}`, e2=`${M(`${U(c+1)} − ${U(c)} = ${c+1} > 0`)}`;
      sol=B(s1+st(2,`${e} لكنّ ${e2}: الفرق يغيّر إشارته، فالمتتالية ليست رتيبة (تتناقص ثمّ تتزايد).`),
            s1+st(2,`${e} mais ${e2} : la différence change de signe, la suite n'est donc pas monotone (elle décroît puis croît).`));
    } else { const c=ri(0,4), up=kind==='up', cn=c?` ${up?'+':'−'} ${c===1?'':c}n`:'';
      expr=`${up?'':'−'}n²${cn}${addC(d)}`; ans=up?'C':'D';
      const df=up?`2n + ${1+c}`:`−2n − ${1+c}`;
      const s1=st(1,M(`${un1} − ${un} = ${df}`));
      sol=B(s1+st(2,`من أجل كلّ ${M('n ≥ 0')}: ${M(`${df} ${up?'>':'<'} 0`)}، إذن المتتالية ${up?'متزايدة':'متناقصة'} تماما.`),
            s1+st(2,`Pour tout ${M('n ≥ 0')} : ${M(`${df} ${up?'>':'<'} 0`)}, donc la suite est strictement ${up?'croissante':'décroissante'}.`));
    }
  }
  const W={C:B(`الفرق ${M(`${un1} − ${un}`)} موجب تماما من أجل كلّ ${M('n')}: كلّ حدّ أكبر من الذي قبله.`,`La différence ${M(`${un1} − ${un}`)} est strictement positive pour tout ${M('n')} : chaque terme est plus grand que le précédent.`),
           D:B(`الفرق ${M(`${un1} − ${un}`)} سالب تماما من أجل كلّ ${M('n')}: كلّ حدّ أصغر من الذي قبله.`,`La différence ${M(`${un1} − ${un}`)} est strictement négative pour tout ${M('n')} : chaque terme est plus petit que le précédent.`),
           X:B(`احسب أوّل الحدود: المتتالية تنقص في موضع وتزيد في آخر، فهي ليست رتيبة.`,`Calcule les premiers termes : la suite diminue à un endroit et augmente à un autre, elle n'est donc pas monotone.`)};
  const why={}; OP.forEach(o=>{ if(o.k!==ans) why[o.k]=W[ans]; });
  return {type:'choice',opts:OP,ans,why,sol,
   q:B(`ما اتجاه تغيّر المتتالية المعرّفة على ${M('ℕ')} بـ ${M(`${un} = ${expr}`)}؟`,`Quel est le sens de variation de la suite définie sur ${M('ℕ')} par ${M(`${un} = ${expr}`)} ?`)};},

/* 7 — limite de c·qⁿ + d (QCM) */
()=>{ const cat=pick(['s','s','s','b','b','g']);
  const Q={s:[[1,2],[1,3],[2,3],[3,4],[-1,2],[-1,3]], b:[[2,1],[3,1],[3,2],[5,4]], g:[[-2,1],[-3,1],[-1,1]]};
  const [qp,qd]=pick(Q[cat]), c=nz(-5,5), d=ri(-6,6), qs=qS(qp,qd);
  const expr=kx(c)+qP(qp,qd,'n')+addC(d);
  const ans=cat==='s'?'L':cat==='b'?(c>0?'P':'M'):'N';
  const opts=[{k:'L',ar:M(ar(d)),fr:M(ar(d))}].concat(d!==0?[{k:'Z',ar:M('0'),fr:M('0')}]:[],
    [{k:'P',ar:M('+∞'),fr:M('+∞')},{k:'M',ar:M('−∞'),fr:M('−∞')},{k:'N',ar:'ليست لها نهاية',fr:'pas de limite'}]);
  let sol;
  if(cat==='s'){
    sol=B(st(1,`${M(`−1 < ${qs} < 1`)}، إذن ${M(`${LIM}${qP(qp,qd,'n')} = 0`)}، ومنه ${M(`${LIM}${kx(c)}${qP(qp,qd,'n')} = 0`)}.`)+st(2,`${M(`${LIM}${un} = 0${addC(d)} = ${ar(d)}`)}.`),
          st(1,`${M(`−1 < ${qs} < 1`)}, donc ${M(`${LIM}${qP(qp,qd,'n')} = 0`)}, d'où ${M(`${LIM}${kx(c)}${qP(qp,qd,'n')} = 0`)}.`)+st(2,`${M(`${LIM}${un} = 0${addC(d)} = ${ar(d)}`)}.`));
  } else if(cat==='b'){ const inf=c>0?'+∞':'−∞';
    sol=B(st(1,`${M(`${qs} > 1`)}، إذن ${M(`${LIM}${qP(qp,qd,'n')} = +∞`)}.`)+st(2,`${M(`${ar(c)} ${c>0?'> 0':'< 0'}`)}، إذن ${M(`${LIM}${kx(c)}${qP(qp,qd,'n')} = ${inf}`)}، وإضافة ${M(ar(d))} لا تغيّر شيئا: ${M(`${LIM}${un} = ${inf}`)}.`),
          st(1,`${M(`${qs} > 1`)}, donc ${M(`${LIM}${qP(qp,qd,'n')} = +∞`)}.`)+st(2,`${M(`${ar(c)} ${c>0?'> 0':'< 0'}`)}, donc ${M(`${LIM}${kx(c)}${qP(qp,qd,'n')} = ${inf}`)}, et ajouter ${M(ar(d))} ne change rien : ${M(`${LIM}${un} = ${inf}`)}.`));
  } else {
    sol=B(st(1,`${M(`${qs} ≤ −1`)}: إشارة ${M(qP(qp,qd,'n'))} تتغيّر من رتبة إلى أخرى ولا تقترب من أيّ عدد، فـ ${M(`(${qP(qp,qd,'n')})`)} ليست لها نهاية.`)+st(2,`إذن ${M(S)} ليست لها نهاية.`),
          st(1,`${M(`${qs} ≤ −1`)} : le signe de ${M(qP(qp,qd,'n'))} change d'un rang à l'autre et ne s'approche d'aucun nombre, donc ${M(`(${qP(qp,qd,'n')})`)} n'a pas de limite.`)+st(2,`Donc ${M(S)} n'a pas de limite.`));
  }
  const why={};
  const msg={
    toZ:B(`${M(`${kx(c)}${qP(qp,qd,'n')}`)} يؤول إلى ${M('0')}، لكن يبقى الحدّ الثابت: ${M(`${un} → ${ar(d)}`)}.`,`${M(`${kx(c)}${qP(qp,qd,'n')}`)} tend vers ${M('0')}, mais il reste le terme constant : ${M(`${un} → ${ar(d)}`)}.`),
    small:B(`${M(`−1 < ${qs} < 1`)}: قوى عدد محصور بين ${M('−1')} و ${M('1')} تصغر وتؤول إلى ${M('0')}.`,`${M(`−1 < ${qs} < 1`)} : les puissances d'un nombre compris entre ${M('−1')} et ${M('1')} rapetissent et tendent vers ${M('0')}.`),
    big:B(`${M(`${qs} > 1`)}: ${M(qP(qp,qd,'n'))} يؤول إلى ${M('+∞')}، فالمتتالية لا تستقرّ عند عدد.`,`${M(`${qs} > 1`)} : ${M(qP(qp,qd,'n'))} tend vers ${M('+∞')}, la suite ne se stabilise pas.`),
    sign:B(`انتبه إلى إشارة المعامل ${M(ar(c))}: ${M(`${ar(c)} × (+∞) = ${c>0?'+∞':'−∞'}`)}.`,`Attention au signe du coefficient ${M(ar(c))} : ${M(`${ar(c)} × (+∞) = ${c>0?'+∞':'−∞'}`)}.`),
    hasLim:B(`للمتتالية نهاية هنا: ${M(`q = ${qs}`)} أكبر من ${M('−1')}.`,`La suite a bien une limite ici : ${M(`q = ${qs}`)} est supérieur à ${M('−1')}.`),
    none:B(`${M(`${qs} ≤ −1`)}: الحدود تتناوب في الإشارة دون أن تقترب من عدد: لا توجد نهاية.`,`${M(`${qs} ≤ −1`)} : les termes alternent de signe sans s'approcher d'un nombre : pas de limite.`)};
  opts.forEach(o=>{ if(o.k===ans) return;
    why[o.k]= ans==='N'?msg.none
      : ans==='L'?(o.k==='Z'?msg.toZ:o.k==='N'?msg.hasLim:msg.small)
      : (o.k==='P'||o.k==='M')?msg.sign : o.k==='N'?msg.hasLim : msg.big; });
  return {type:'choice',opts,ans,why,sol,
   q:B(`ما نهاية المتتالية ${M(`${un} = ${expr}`)} عندما يؤول ${M('n')} إلى ${M('+∞')}؟`,`Quelle est la limite de la suite ${M(`${un} = ${expr}`)} quand ${M('n')} tend vers ${M('+∞')} ?`)};},

/* 8 — calcul de termes d'une suite récurrente */
()=>{ const a=ri(-4,4), k=pick([2,3,-2,-1]), b=nz(-5,5), m=pick([2,3]);
  const T=[a], W=[a]; for(let i=0;i<m;i++){ T.push(k*T[i]+b); W.push(k*(W[i]+b)); }
  const rec=`${cx(k)}${un}${addC(b)}`;
  let steps=''; for(let i=0;i<m;i++) steps+=st(i+1,M(`${U(i+1)} = ${ar(k)} × ${par(T[i])}${addC(b)} = ${ar(T[i+1])}`));
  return {type:'num',ans:T[m],
   q:B(`${M(S)} متتالية معرّفة بـ ${M(`${u0} = ${ar(a)}`)} ومن أجل كلّ عدد طبيعي ${M('n')}: ${M(`${un1} = ${rec}`)}. احسب ${M(U(m))}.`,
       `${M(S)} est définie par ${M(`${u0} = ${ar(a)}`)} et, pour tout entier naturel ${M('n')}, ${M(`${un1} = ${rec}`)}. Calcule ${M(U(m))}.`),
   miss:[[T[m-1],B(`هذا هو ${M(U(m-1))}: تحتاج خطوة أخرى للوصول إلى ${M(U(m))}.`,`C'est ${M(U(m-1))} : il faut encore une étape pour arriver à ${M(U(m))}.`)],
         [W[m],B(`الضرب قبل الجمع: ${M(rec)} تعني ${M(`(${ar(k)} × ${un})${addC(b)}`)}، وليس ${M(`${ar(k)} × (${un}${addC(b)})`)}.`,`La multiplication passe avant l'addition : ${M(rec)} signifie ${M(`(${ar(k)} × ${un})${addC(b)}`)}, et non ${M(`${ar(k)} × (${un}${addC(b)})`)}.`)],
         [k*T[m]+b,B(`ذهبت خطوة أبعد: هذا هو ${M(U(m+1))}.`,`Tu es allé(e) une étape trop loin : c'est ${M(U(m+1))}.`)]],
   sol:B(steps,steps)};},

/* 9 — suite auxiliaire : α, raison de (vₙ), limite */
()=>{ const [p,d]=pick([[1,2],[1,3],[2,3],[3,4],[-1,2],[2,1],[3,1]]), a=p/d, t=nz(-3,3);
  const alpha=d===1?t:d*t, b=d===1?t*(1-p):t*(d-p);
  const aS=qS(p,d), rec=`${un1} = ${d===1?cx(p):aS}${un}${addC(b)}`;
  const vdef=`${vn} = ${un}${addC(-alpha)}`;
  const variant=Math.abs(a)<1?pick(['alpha','ratio','lim']):pick(['alpha','ratio']);
  const aMinus=`1 − ${a<0?'('+aS+')':aS}`;
  const aC=d===1?cx(p):aS, aAl=a<0?` − ${qS(-p,d)}α`:` + ${aC}α`;          /* « + aα » avec le bon signe */
  const s1=st(1,M(`${vn1} = ${un1} − α = ${aC}${un}${addC(b)} − α = ${aC}(${un} − α)${aAl}${addC(b)} − α`));
  if(variant==='alpha'){
    const s2=B(st(2,`نريد ${M(`${vn1} = ${aS} × ${vn}`)}، أي ${M(`${aS}α${addC(b)} − α = 0`)}، ومنه ${M(`α = ${f(ar(b),aMinus)} = ${ar(alpha)}`)}.`),
               st(2,`On veut ${M(`${vn1} = ${aS} × ${vn}`)}, c'est-à-dire ${M(`${aS}α${addC(b)} − α = 0`)}, d'où ${M(`α = ${f(ar(b),aMinus)} = ${ar(alpha)}`)}.`));
    return {type:'num',ans:alpha,
     q:B(`${M(S)} معرّفة بـ ${M(rec)}. نضع ${M(`${vn} = ${un} − α`)}. عيّن العدد الحقيقي ${M('α')} الذي تكون من أجله ${M('(v<sub>n</sub>)')} متتالية هندسية.`,
         `${M(S)} est définie par ${M(rec)}. On pose ${M(`${vn} = ${un} − α`)}. Détermine le réel ${M('α')} pour lequel ${M('(v<sub>n</sub>)')} est une suite géométrique.`),
     miss:[[b,B(`نسيت القسمة على ${M(aMinus)}: ${M('α')} يحقّق ${M(`α = ${aS}α${addC(b)}`)}، أي ${M(`α = ${f('b','1 − a')}`)}.`,`Tu as oublié de diviser par ${M(aMinus)} : ${M('α')} vérifie ${M(`α = ${aS}α${addC(b)}`)}, donc ${M(`α = ${f('b','1 − a')}`)}.`)],
           [b/(1+a),B(`${M(`α = ${f('b','1 − a')}`)} وليس ${M(f('b','1 + a'))}: انتبه إلى الإشارة عند نقل ${M(`${aS}α`)}.`,`${M(`α = ${f('b','1 − a')}`)}, et non ${M(f('b','1 + a'))} : attention au signe en passant ${M(`${aS}α`)} de l'autre côté.`)],
           [b/a,B(`${M('α')} هو حلّ ${M(`α = ${aS}α${addC(b)}`)}: نجمع حدود ${M('α')} في طرف واحد قبل القسمة.`,`${M('α')} est solution de ${M(`α = ${aS}α${addC(b)}`)} : on regroupe les termes en ${M('α')} d'un côté avant de diviser.`)]],
     sol:B(s1+s2.ar,s1+s2.fr)};
  }
  if(variant==='ratio'){
    const chk=M(`${aS} × ${par(alpha)}${addC(b)} − ${par(alpha)} = 0`);
    return {type:'num',ans:a,tol:1e-6,
     q:B(`${M(S)} معرّفة بـ ${M(rec)}، ونضع ${M(vdef)}. نقبل أنّ ${M('(v<sub>n</sub>)')} متتالية هندسية. ما أساسها؟`,
         `${M(S)} est définie par ${M(rec)}, et on pose ${M(vdef)}. On admet que ${M('(v<sub>n</sub>)')} est géométrique. Quelle est sa raison ?`),
     miss:[[b,B(`${M(ar(b))} هو الحدّ الثابت في العلاقة، وليس الأساس. احسب ${M(vn1)} بدلالة ${M(vn)}.`,`${M(ar(b))} est le terme constant de la relation, pas la raison. Calcule ${M(vn1)} en fonction de ${M(vn)}.`)],
           [1-a,B(`${M(`1 − a`)} يظهر في حساب ${M('α')}، أمّا الأساس فهو المعامل ${M('a')} نفسه.`,`${M('1 − a')} intervient dans le calcul de ${M('α')} ; la raison est le coefficient ${M('a')} lui-même.`)],
           [alpha,B(`${M(`α = ${ar(alpha)}`)} هو العدد المطروح لتعريف ${M(vn)}، وليس الأساس.`,`${M(`α = ${ar(alpha)}`)} est le nombre retranché pour définir ${M(vn)}, pas la raison.`)]],
     sol:B(s1+st(2,`مع ${M(`α = ${ar(alpha)}`)}: ${chk}، إذن ${M(`${vn1} = ${aS} × ${vn}`)}.`)+st(3,`أساس ${M('(v<sub>n</sub>)')} هو ${M(aS)}.`),
           s1+st(2,`Avec ${M(`α = ${ar(alpha)}`)} : ${chk}, donc ${M(`${vn1} = ${aS} × ${vn}`)}.`)+st(3,`La raison de ${M('(v<sub>n</sub>)')} est ${M(aS)}.`))};
  }
  let x0=ri(-6,6); if(x0===alpha) x0+=1;
  const s3=M(`${vn} = (${ar(x0)}${addC(-alpha)}) × ${qP(p,d,'n')} = ${ar(x0-alpha)} × ${qP(p,d,'n')}`);
  return {type:'num',ans:alpha,
   q:B(`${M(S)} معرّفة بـ ${M(`${u0} = ${ar(x0)}`)} و ${M(rec)}. احسب ${M(`${LIM}${un}`)}.`,
       `${M(S)} est définie par ${M(`${u0} = ${ar(x0)}`)} et ${M(rec)}. Calcule ${M(`${LIM}${un}`)}.`),
   miss:[[x0,B(`النهاية لا تتعلّق بالحدّ الأوّل هنا: استعمل المتتالية المساعدة ${M(`${vn} = ${un} − α`)}.`,`Ici, la limite ne dépend pas du premier terme : utilise la suite auxiliaire ${M(`${vn} = ${un} − α`)}.`)],
         [0,B(`${M(vn)} هي التي تؤول إلى ${M('0')}، أمّا ${M(`${un} = ${vn} + α`)} فتؤول إلى ${M('α')}.`,`C'est ${M(vn)} qui tend vers ${M('0')} ; ${M(`${un} = ${vn} + α`)} tend vers ${M('α')}.`)],
         [b,B(`النهاية ${M('ℓ')} تحقّق ${M(`ℓ = ${aS}ℓ${addC(b)}`)}، أي ${M(`ℓ = ${f('b','1 − a')}`)}، وليست ${M('b')}.`,`La limite ${M('ℓ')} vérifie ${M(`ℓ = ${aS}ℓ${addC(b)}`)}, donc ${M(`ℓ = ${f('b','1 − a')}`)}, et non ${M('b')}.`)]],
   sol:B(st(1,`${M(`α = ${f(ar(b),aMinus)} = ${ar(alpha)}`)}، و ${M(`${vn} = ${un} − α`)} هندسية أساسها ${M(aS)}.`)+st(2,s3)+st(3,`${M(`−1 < ${aS} < 1`)} إذن ${M(`${vn} → 0`)}، ومنه ${M(`${un} = ${vn} + α → ${ar(alpha)}`)}.`),
         st(1,`${M(`α = ${f(ar(b),aMinus)} = ${ar(alpha)}`)}, et ${M(`${vn} = ${un} − α`)} est géométrique de raison ${M(aS)}.`)+st(2,s3)+st(3,`${M(`−1 < ${aS} < 1`)} donc ${M(`${vn} → 0`)}, d'où ${M(`${un} = ${vn} + α → ${ar(alpha)}`)}.`))};},

/* 10 — terme général en fonction de n (réponse = expression) */
()=>{ const geo=Math.random()<0.5, p=pick([0,0,1]);
  if(!geo){ const a=nz(-9,12), r=nz(-6,6), fn=n=>a+(n-p)*r, c0=a-p*r;
    const s1=st(1,M(`${un} = ${U(p)} + (n − ${p})r = ${ar(a)} + (n − ${p}) × ${par(r)}`)), s2=st(2,M(`${un} = ${lin(c0,r)}`));
    return {type:'exprn',fn,ansS:`${c0}+(${r})*n`,
     q:B(`${M(S)} متتالية حسابية حدّها الأوّل ${M(`${U(p)} = ${ar(a)}`)} وأساسها ${M(`r = ${ar(r)}`)}. اكتب ${M(un)} بدلالة ${M('n')}.`,
         `${M(S)} est une suite arithmétique de premier terme ${M(`${U(p)} = ${ar(a)}`)} et de raison ${M(`r = ${ar(r)}`)}. Exprime ${M(un)} en fonction de ${M('n')}.`),
     missF:[[n=>a+(n-p-1)*r,B(`تحقّق: عوّض ${M(`n = ${p}`)} في عبارتك، يجب أن تجد ${M(`${U(p)} = ${ar(a)}`)}.`,`Vérifie : en remplaçant ${M(`n = ${p}`)} dans ton expression, tu dois retrouver ${M(`${U(p)} = ${ar(a)}`)}.`)],
            [n=>a+(n-p+1)*r,B(`تحقّق: عوّض ${M(`n = ${p}`)} في عبارتك، يجب أن تجد ${M(`${U(p)} = ${ar(a)}`)}. الحدّ الأوّل رتبته ${N_(p)}.`,`Vérifie : en remplaçant ${M(`n = ${p}`)}, tu dois retrouver ${M(`${U(p)} = ${ar(a)}`)}. Le premier terme est de rang ${N_(p)}.`)],
            [n=>a*Math.pow(r,n-p),B(`هذه علاقة متتالية هندسية: في المتتالية الحسابية نضيف الأساس، فيظهر ${M('n')} مضروبا في ${M('r')}.`,`C'est une formule de suite géométrique : dans une suite arithmétique on ajoute la raison, donc ${M('n')} est multiplié par ${M('r')}.`)]],
     sol:B(s1+s2,s1+s2)};
  }
  const a=pick([1,2,3,5,-2,-3]), [qp,qd]=pick([[2,1],[3,1],[-2,1],[1,2],[1,3]]), q=qp/qd, fn=n=>a*Math.pow(q,n-p);
  const e=p?'n − 1':'n', s1=st(1,M(`${un} = ${U(p)} × q<sup>${e}</sup>`)), s2=st(2,M(`${un} = ${kx(a)}${qP(qp,qd,e)}`));
  return {type:'exprn',fn,ansS:`${a}*(${qp}/${qd})^(n-${p})`,
   q:B(`${M(S)} متتالية هندسية حدّها الأوّل ${M(`${U(p)} = ${ar(a)}`)} وأساسها ${M(`q = ${qS(qp,qd)}`)}. اكتب ${M(un)} بدلالة ${M('n')}.`,
       `${M(S)} est une suite géométrique de premier terme ${M(`${U(p)} = ${ar(a)}`)} et de raison ${M(`q = ${qS(qp,qd)}`)}. Exprime ${M(un)} en fonction de ${M('n')}.`),
   missF:[[n=>a*Math.pow(q,n-p-1),B(`تحقّق: من أجل ${M(`n = ${p}`)} يجب أن تجد ${M(`${U(p)} = ${ar(a)}`)}. راجع الأسّ.`,`Vérifie : pour ${M(`n = ${p}`)}, tu dois retrouver ${M(`${U(p)} = ${ar(a)}`)}. Revois l'exposant.`)],
          [n=>a*Math.pow(q,n-p+1),B(`تحقّق: من أجل ${M(`n = ${p}`)} يجب أن تجد ${M(`${U(p)} = ${ar(a)}`)}. الأسّ هو ${M(e)}.`,`Vérifie : pour ${M(`n = ${p}`)}, tu dois retrouver ${M(`${U(p)} = ${ar(a)}`)}. L'exposant est ${M(e)}.`)],
          [n=>a+(n-p)*q,B(`هذه علاقة متتالية حسابية: في المتتالية الهندسية نضرب في الأساس، فيظهر ${M('n')} في الأسّ.`,`C'est une formule de suite arithmétique : dans une suite géométrique on multiplie par la raison, donc ${M('n')} apparaît en exposant.`)]],
   sol:B(s1+s2,s1+s2)};}
];

/* ============================================================================
   تمرين نموذجي من نوع البكالوريا — Exercice type BAC
   ============================================================================ */
const t23=f('2','3'), t13=f('1','3');
const same=s=>B(s,s);
BAC[5]={
 t:B('تمرين نموذجي من نوع البكالوريا','Exercice type BAC'), pts:6,
 st:B(`نعتبر المتتالية ${M(S)} المعرّفة بـ ${M(`${u0} = 1`)}، ومن أجل كلّ عدد طبيعي ${M('n')}: ${M(`${un1} = ${t23}${un} + 2`)}.`,
      `On considère la suite ${M(S)} définie par ${M(`${u0} = 1`)} et, pour tout entier naturel ${M('n')}, ${M(`${un1} = ${t23}${un} + 2`)}.`),
 parts:[
  {n:'1) أ', nf:'1) a', p:0.5,
   q:B(`احسب ${M(U(1))} و ${M(U(2))}.`,`Calcule ${M(U(1))} et ${M(U(2))}.`),
   hint:B(`عوّض ${M('n')} بـ ${M('0')} ثمّ بـ ${M('1')} في العلاقة التراجعية، واحتفظ بالكسور.`,`Remplace ${M('n')} par ${M('0')} puis par ${M('1')} dans la relation de récurrence, en gardant les fractions.`),
   sol:[[same(M(`${U(1)} = ${t23} × 1 + 2 = ${f('8','3')}`)),0.25],
        [same(M(`${U(2)} = ${t23} × ${f('8','3')} + 2 = ${f('16','9')} + ${f('18','9')} = ${f('34','9')}`)),0.25]]},
  {n:'1) ب', nf:'1) b', p:1,
   q:B(`برهن بالتراجع أنّه من أجل كلّ عدد طبيعي ${M('n')}: ${M(`${un} < 6`)}.`,`Démontre par récurrence que, pour tout entier naturel ${M('n')}, ${M(`${un} < 6`)}.`),
   hint:B(`في الوراثة: انطلق من ${M(`${un} < 6`)}، اضرب في ${M(t23)} (عدد موجب، فلا يتغيّر اتجاه المتباينة) ثمّ أضف ${M('2')}.`,`Dans l'hérédité : pars de ${M(`${un} < 6`)}, multiplie par ${M(t23)} (positif, donc le sens de l'inégalité ne change pas), puis ajoute ${M('2')}.`),
   sol:[[B(`<b>التحقّق:</b> ${M(`${u0} = 1 < 6`)}.`,`<b>Initialisation :</b> ${M(`${u0} = 1 < 6`)}.`),0.25],
        [B(`<b>الوراثة:</b> نفرض ${M(`${un} < 6`)}. بما أنّ ${M(`${t23} > 0`)}: ${M(`${t23}${un} < 4`)}، ومنه ${M(`${t23}${un} + 2 < 6`)}، أي ${M(`${un1} < 6`)}.`,
           `<b>Hérédité :</b> supposons ${M(`${un} < 6`)}. Comme ${M(`${t23} > 0`)} : ${M(`${t23}${un} < 4`)}, donc ${M(`${t23}${un} + 2 < 6`)}, c'est-à-dire ${M(`${un1} < 6`)}.`),0.5],
        [B(`<b>الخلاصة:</b> من أجل كلّ ${M('n ∈ ℕ')}: ${M(`${un} < 6`)}.`,`<b>Conclusion :</b> pour tout ${M('n ∈ ℕ')}, ${M(`${un} < 6`)}.`),0.25]]},
  {n:'1) ج', nf:'1) c', p:1,
   q:B(`بيّن أنّ المتتالية ${M(S)} متزايدة تماما.`,`Montre que la suite ${M(S)} est strictement croissante.`),
   hint:B(`احسب ${M(`${un1} − ${un}`)} وأخرج ${M(t13)} عاملا مشتركا، ثمّ استعمل نتيجة السؤال السابق.`,`Calcule ${M(`${un1} − ${un}`)} et factorise par ${M(t13)}, puis utilise la question précédente.`),
   sol:[[same(M(`${un1} − ${un} = ${t23}${un} + 2 − ${un} = 2 − ${t13}${un} = ${t13}(6 − ${un})`)),0.5],
        [B(`بما أنّ ${M(`${un} < 6`)} فإنّ ${M(`6 − ${un} > 0`)}، إذن ${M(`${un1} − ${un} > 0`)}: المتتالية متزايدة تماما.`,`Comme ${M(`${un} < 6`)}, on a ${M(`6 − ${un} > 0`)}, donc ${M(`${un1} − ${un} > 0`)} : la suite est strictement croissante.`),0.5]]},
  {n:'1) د', nf:'1) d', p:0.5,
   q:B(`استنتج أنّ ${M(S)} متقاربة.`,`Déduis-en que ${M(S)} est convergente.`),
   hint:B('متتالية متزايدة و…؟','Une suite croissante et… ?'),
   sol:[[B(`${M(S)} متزايدة ومحدودة من الأعلى بالعدد ${M('6')}، إذن هي متقاربة (مبرهنة التقارب الرتيب).`,`${M(S)} est croissante et majorée par ${M('6')}, donc elle est convergente (théorème de convergence monotone).`),0.5]]},
  {n:'2) أ', nf:'2) a', p:1,
   q:B(`نضع من أجل كلّ ${M('n')}: ${M(`${vn} = ${un} − 6`)}. بيّن أنّ ${M('(v<sub>n</sub>)')} متتالية هندسية أساسها ${M(t23)}، وعيّن حدّها الأوّل.`,
       `On pose, pour tout ${M('n')}, ${M(`${vn} = ${un} − 6`)}. Montre que ${M('(v<sub>n</sub>)')} est une suite géométrique de raison ${M(t23)} et précise son premier terme.`),
   hint:B(`اكتب ${M(`${vn1} = ${un1} − 6`)}، عوّض ${M(un1)} بعبارتها، ثمّ أخرج ${M(t23)} عاملا مشتركا.`,`Écris ${M(`${vn1} = ${un1} − 6`)}, remplace ${M(un1)} par son expression, puis factorise par ${M(t23)}.`),
   sol:[[B(`${M(`${vn1} = ${un1} − 6 = ${t23}${un} + 2 − 6 = ${t23}${un} − 4 = ${t23}(${un} − 6) = ${t23}${vn}`)}، إذن ${M('(v<sub>n</sub>)')} هندسية أساسها ${M(t23)}.`,
           `${M(`${vn1} = ${un1} − 6 = ${t23}${un} + 2 − 6 = ${t23}${un} − 4 = ${t23}(${un} − 6) = ${t23}${vn}`)}, donc ${M('(v<sub>n</sub>)')} est géométrique de raison ${M(t23)}.`),0.75],
        [same(M(`${v0} = ${u0} − 6 = −5`)),0.25]]},
  {n:'2) ب', nf:'2) b', p:0.75,
   q:B(`اكتب ${M(vn)} ثمّ ${M(un)} بدلالة ${M('n')}.`,`Exprime ${M(vn)} puis ${M(un)} en fonction de ${M('n')}.`),
   hint:B(`${M(`${vn} = ${v0} × q<sup>n</sup>`)}، ثمّ ${M(`${un} = ${vn} + 6`)}.`,`${M(`${vn} = ${v0} × q<sup>n</sup>`)}, puis ${M(`${un} = ${vn} + 6`)}.`),
   sol:[[same(M(`${vn} = −5 × (${t23})<sup>n</sup>`)),0.5],[same(M(`${un} = ${vn} + 6 = 6 − 5 × (${t23})<sup>n</sup>`)),0.25]]},
  {n:'2) ج', nf:'2) c', p:0.5,
   q:B(`احسب ${M(`${LIM}${un}`)}.`,`Calcule ${M(`${LIM}${un}`)}.`),
   hint:B(`ما نهاية ${M('q<sup>n</sup>')} إذا كان ${M('0 < q < 1')}؟`,`Quelle est la limite de ${M('q<sup>n</sup>')} si ${M('0 < q < 1')} ?`),
   sol:[[B(`بما أنّ ${M(`0 < ${t23} < 1`)} فإنّ ${M(`${LIM}(${t23})<sup>n</sup> = 0`)}.`,`Comme ${M(`0 < ${t23} < 1`)}, ${M(`${LIM}(${t23})<sup>n</sup> = 0`)}.`),0.25],
        [B(`إذن ${M(`${LIM}${un} = 6`)}.`,`Donc ${M(`${LIM}${un} = 6`)}.`),0.25]]},
  {n:'3)', nf:'3)', p:0.75,
   q:B(`احسب بدلالة ${M('n')} المجموع ${M(`S<sub>n</sub> = ${v0} + ${V(1)} + … + ${vn}`)}، ثمّ استنتج ${M(`T<sub>n</sub> = ${u0} + ${U(1)} + … + ${un}`)}.`,
       `Calcule en fonction de ${M('n')} la somme ${M(`S<sub>n</sub> = ${v0} + ${V(1)} + … + ${vn}`)}, puis déduis-en ${M(`T<sub>n</sub> = ${u0} + ${U(1)} + … + ${un}`)}.`),
   hint:B(`مجموع حدود متتالية هندسية، وانتبه: يوجد ${M('n + 1')} حدّا. ثمّ ${M(`${U('k')} = ${V('k')} + 6`)}.`,`Somme de termes d'une suite géométrique — attention, il y a ${M('n + 1')} termes. Puis ${M(`${U('k')} = ${V('k')} + 6`)}.`),
   sol:[[same(M(`S<sub>n</sub> = ${v0} × ${f(`1 − (${t23})<sup>n+1</sup>`,`1 − ${t23}`)} = −15(1 − (${t23})<sup>n+1</sup>)`)),0.5],
        [same(M(`T<sub>n</sub> = S<sub>n</sub> + 6(n + 1) = 6n − 9 + 15(${t23})<sup>n+1</sup>`)),0.25]]}
 ]};

/* ============================================================================
   جرّب بنفسك — مختبر المتتاليات u(n+1) = a·u(n) + b
   Explorer — laboratoire des suites u(n+1) = a·u(n) + b
   ============================================================================ */
const LS={a:0.5,b:2,u0:0,mode:'web',k:12,tm:null};
const KMAX=12, CLV=40;
const r1=v=>Math.round(v*10)/10;
const fin=v=>isFinite(v)&&Math.abs(v)<1e9;
function terms(n){ const T=[LS.u0]; for(let i=0;i<n;i++) T.push(LS.a*T[i]+LS.b); return T; }
const PRE=[[B('حسابية','Arithmétique'),1,1.5,-3],[B('هندسية','Géométrique'),1.2,0,1],[B('متقاربة','Convergente'),0.5,2,0],[B('حلزون','Spirale'),-0.6,4,0]];

function natureTxt(){
  const {a,b}=LS;
  if(a===1) return B(`${M('a = 1')}: ${M(`${un1} = ${un}${addC(b)}`)} — متتالية <b>حسابية</b> أساسها ${M(`r = ${ar(b)}`)}.`,`${M('a = 1')} : ${M(`${un1} = ${un}${addC(b)}`)} — suite <b>arithmétique</b> de raison ${M(`r = ${ar(b)}`)}.`);
  if(b===0) return B(`${M('b = 0')}: ${M(`${un1} = ${ar(a)}${un}`)} — متتالية <b>هندسية</b> أساسها ${M(`q = ${ar(a)}`)}.`,`${M('b = 0')} : ${M(`${un1} = ${ar(a)}${un}`)} — suite <b>géométrique</b> de raison ${M(`q = ${ar(a)}`)}.`);
  if(a===0) return B(`${M('a = 0')}: كلّ الحدود ابتداءً من ${M(U(1))} تساوي ${M(ar(b))}.`,`${M('a = 0')} : tous les termes à partir de ${M(U(1))} valent ${M(ar(b))}.`);
  const al=ar(rnd(LS.b/(1-a),3));
  return B(`${M(`α = ${f('b','1 − a')} = ${al}`)}، والمتتالية ${M(`${vn} = ${un} − α`)} <b>هندسية</b> أساسها ${M(`a = ${ar(a)}`)}، إذن ${M(`${un} = α + (${u0} − α)a<sup>n</sup>`)}.`,
           `${M(`α = ${f('b','1 − a')} = ${al}`)} et la suite ${M(`${vn} = ${un} − α`)} est <b>géométrique</b> de raison ${M(`a = ${ar(a)}`)}, donc ${M(`${un} = α + (${u0} − α)a<sup>n</sup>`)}.`);
}
function limTxt(){
  const {a,b,u0:x0}=LS;
  if(a===1){
    if(b===0) return B(`المتتالية ثابتة: كلّ حدودها تساوي ${M(ar(x0))}.`,`La suite est constante : tous ses termes valent ${M(ar(x0))}.`);
    return b>0?B(`${M('r > 0')}: المتتالية متزايدة تماما و ${M(`${LIM}${un} = +∞`)}.`,`${M('r > 0')} : la suite est strictement croissante et ${M(`${LIM}${un} = +∞`)}.`)
              :B(`${M('r < 0')}: المتتالية متناقصة تماما و ${M(`${LIM}${un} = −∞`)}.`,`${M('r < 0')} : la suite est strictement décroissante et ${M(`${LIM}${un} = −∞`)}.`);
  }
  const al=b/(1-a), AL=ar(rnd(al,3));
  if(Math.abs(x0-al)<1e-9) return B(`${M(`${u0} = α`)}: المتتالية ثابتة، كلّ حدودها تساوي ${M(AL)}.`,`${M(`${u0} = α`)} : la suite est constante, tous ses termes valent ${M(AL)}.`);
  if(Math.abs(a)<1) return B(`${M('−1 < a < 1')}: ${M('a<sup>n</sup> → 0')}، إذن المتتالية متقاربة و ${M(`${LIM}${un} = α = ${AL}`)}.`,`${M('−1 < a < 1')} : ${M('a<sup>n</sup> → 0')}, donc la suite converge et ${M(`${LIM}${un} = α = ${AL}`)}.`);
  if(a>1){ const s=x0>al?'+∞':'−∞';
    return B(`${M('a > 1')} و ${M(`${u0} ${x0>al?'>':'<'} α`)}: ${M(`${LIM}${un} = ${s}`)}.`,`${M('a > 1')} et ${M(`${u0} ${x0>al?'>':'<'} α`)} : ${M(`${LIM}${un} = ${s}`)}.`); }
  return a===-1?B(`${M('a = −1')}: الحدود تتناوب بين قيمتين حول ${M('α')}: المتتالية ليست لها نهاية.`,`${M('a = −1')} : les termes alternent entre deux valeurs autour de ${M('α')} : la suite n'a pas de limite.`)
               :B(`${M('a < −1')}: الحدود تتناوب حول ${M('α')} وتبتعد عنه: المتتالية ليست لها نهاية.`,`${M('a < −1')} : les termes alternent autour de ${M('α')} en s'en éloignant : la suite n'a pas de limite.`);
}

function draw(){
  const svg=document.getElementById('lsvg'); if(!svg) return;
  const {a,b,u0:x0,mode}=LS, K=Math.min(LS.k,KMAX), T=terms(KMAX);
  const alpha=a!==1?b/(1-a):null;
  const C='#0F5C4E', G='#B8860B', GR='#9AA3AE', TX='#5B6676';
  let h='';
  const txt=(x,y,s,anc,sz,col)=>`<text x="${x}" y="${y}" font-size="${sz||11}" text-anchor="${anc||'middle'}" fill="${col||TX}">${s}</text>`;
  if(mode==='pts'){
    const vals=T.filter(fin).map(v=>Math.max(-CLV,Math.min(CLV,v))).concat([0]);
    if(alpha!==null&&Math.abs(a)<1) vals.push(alpha);
    let lo=Math.min(...vals), hi=Math.max(...vals); if(hi-lo<2){ const m=(hi+lo)/2; lo=m-1; hi=m+1; }
    const pad=(hi-lo)*0.08, L0=lo, H0=hi; lo-=pad; hi+=pad;
    const X0=40,X1=348,Y0=12,Y1=268, sx=n=>X0+n*(X1-X0)/KMAX, sy=v=>Y1-(v-lo)*(Y1-Y0)/(hi-lo);
    h+=`<rect x="${X0}" y="${Y0}" width="${X1-X0}" height="${Y1-Y0}" fill="none" stroke="#E2DDD2"/>`;
    if(lo<0&&hi>0) h+=`<line x1="${X0}" y1="${sy(0)}" x2="${X1}" y2="${sy(0)}" stroke="${GR}"/>`+txt(X0-5,sy(0)+4,'0','end',10.5);
    for(let n=0;n<=KMAX;n+=2) h+=txt(sx(n),Y1+16,n);
    h+=txt(X1,Y1+28,'n','end',11)+txt(X0-5,sy(H0)+4,ar(rnd(H0,1)),'end',10.5)+txt(X0-5,sy(L0)+4,ar(rnd(L0,1)),'end',10.5);
    if(alpha!==null&&alpha>lo&&alpha<hi) h+=`<line x1="${X0}" y1="${sy(alpha)}" x2="${X1}" y2="${sy(alpha)}" stroke="${G}" stroke-dasharray="5 4"/>`+txt(X1-4,sy(alpha)-5,'α','end',13,G);
    for(let n=0;n<=K;n++){ const v=T[n]; if(!fin(v)&&!isFinite(v)) continue;
      const cv=Math.max(lo,Math.min(hi,v)), out=cv!==v;
      h+=`<circle cx="${sx(n)}" cy="${sy(cv)}" r="${out?3:4.3}" fill="${out?'#A62B39':C}"/>`; }
  } else {
    const vals=[x0,0]; for(let i=0;i<=K;i++) if(fin(T[i])) vals.push(Math.max(-CLV,Math.min(CLV,T[i])));
    if(alpha!==null&&fin(alpha)&&Math.abs(alpha)<=CLV) vals.push(alpha);
    let lo=Math.min(...vals), hi=Math.max(...vals); if(hi-lo<4){ const m=(hi+lo)/2; lo=m-2; hi=m+2; }
    const pad=(hi-lo)*0.1; lo-=pad; hi+=pad; const W=hi-lo;
    const X0=30,X1=350,Y0=10,Y1=270;
    const cl=v=>Math.max(lo-W,Math.min(hi+W,v));
    const sx=v=>X0+(cl(v)-lo)*(X1-X0)/W, sy=v=>Y1-(cl(v)-lo)*(Y1-Y0)/W;
    h+=`<defs><clipPath id="lclip"><rect x="${X0}" y="${Y0}" width="${X1-X0}" height="${Y1-Y0}"/></clipPath></defs>`;
    h+=`<rect x="${X0}" y="${Y0}" width="${X1-X0}" height="${Y1-Y0}" fill="none" stroke="#E2DDD2"/>`;
    const base=(lo<0&&hi>0)?0:lo;
    h+='<g clip-path="url(#lclip)">';
    if(lo<0&&hi>0) h+=`<line x1="${X0}" y1="${sy(0)}" x2="${X1}" y2="${sy(0)}" stroke="${GR}"/><line x1="${sx(0)}" y1="${Y0}" x2="${sx(0)}" y2="${Y1}" stroke="${GR}"/>`;
    h+=`<line x1="${sx(lo)}" y1="${sy(lo)}" x2="${sx(hi)}" y2="${sy(hi)}" stroke="${GR}" stroke-dasharray="6 4" stroke-width="1.4"/>`;
    h+=`<line x1="${sx(lo)}" y1="${sy(a*lo+b)}" x2="${sx(hi)}" y2="${sy(a*hi+b)}" stroke="${C}" stroke-width="2.2"/>`;
    if(K>0){ let d=`M${sx(x0)} ${sy(base)}`;
      for(let i=0;i<K;i++){ if(!fin(T[i+1])) break; d+=` L${sx(T[i])} ${sy(T[i+1])} L${sx(T[i+1])} ${sy(T[i+1])}`; }
      h+=`<path d="${d}" fill="none" stroke="${G}" stroke-width="1.8" stroke-linejoin="round"/>`; }
    if(alpha!==null&&fin(alpha)) h+=`<circle cx="${sx(alpha)}" cy="${sy(alpha)}" r="4.5" fill="${G}"/>`;
    const lab=[];
    for(let i=0;i<=Math.min(K,3);i++){ if(!fin(T[i])||T[i]<lo||T[i]>hi) continue;
      h+=`<circle cx="${sx(T[i])}" cy="${sy(base)}" r="3" fill="${C}"/>`;
      let ly=sy(base)+15+(i%2)*11; if(ly>Y1-3) ly=sy(base)-7-(i%2)*11;      /* au-dessus de l'axe s'il est trop bas */
      lab.push(`<text x="${sx(T[i])}" y="${ly}" font-size="11" text-anchor="middle" fill="${C}">u<tspan font-size="8.5" dy="3">${i}</tspan></text>`); }
    h+='</g>'+lab.join('');
    /* légende sous le cadre */
    h+=`<line x1="${X0}" y1="285" x2="${X0+22}" y2="285" stroke="${GR}" stroke-dasharray="6 4" stroke-width="1.4"/>`+txt(X0+28,289,'y = x','start',11,GR)
      +`<line x1="${X0+92}" y1="285" x2="${X0+114}" y2="285" stroke="${C}" stroke-width="2.2"/>`+txt(X0+120,289,'y = ax + b','start',11,C);
    if(alpha!==null&&fin(alpha)&&alpha>lo&&alpha<hi) h+=txt(sx(alpha)+8,sy(alpha)-7,'α','start',13,G);
  }
  svg.innerHTML=h;
  const el=document.getElementById('lread'); if(!el) return;
  const T6=terms(6), fm=v=>fin(v)&&Math.abs(v)<1e6?ar(rnd(v,3)):'…';
  el.innerHTML=fix(`<p>${T6.map((v,i)=>M(`${U(i)} = ${fm(v)}`)).join(LANG==='ar'?' ؛ ':' ; ')}</p><p class="obs">${tr(natureTxt())}</p><p class="obs">${tr(limTxt())}</p>`);
}
function playLabel(){ const b=document.getElementById('lplay'); if(b) b.textContent=LS.tm?'■ '+tr(B('إيقاف','Arrêter')):'▶ '+tr(B('شغّل الحركة','Animer')); }
function stopAnim(){ if(LS.tm){ clearInterval(LS.tm); LS.tm=null; } }

LABS[5]=function(p){
  stopAnim(); LS.k=KMAX;
  const sl=(id,lab,min,max,step,val)=>`<label class="sl"><span><span class="m">${lab} = <b class="lat" id="v${id}">${ar(val)}</b></span></span><input type="range" id="s${id}" min="${min}" max="${max}" step="${step}" value="${val}"></label>`;
  const modes=[['web',B('السلّم (التمثيل البياني)','Escalier (représentation graphique)')],['pts',B('سحابة النقط','Nuage de points')]];
  p.innerHTML=fix(`<div class="lab">
   <div class="labhead"><b>${tr(B('مختبر المتتاليات','Laboratoire des suites'))} — ${M(`${un1} = a${un} + b`)}</b><span class="labtip">${tr(B('حرّك المؤشّرات وشاهد الحدود تتغيّر','Déplace les curseurs et observe les termes'))}</span></div>
   <div class="btnrow labmodes">${modes.map(([k,t])=>`<button class="btn small ${LS.mode===k?'':'sec2'}" data-lm="${k}">${tr(t)}</button>`).join('')}</div>
   <div class="labctl">${sl('a','a',-1.5,1.5,0.1,LS.a)}${sl('b','b',-4,4,0.5,LS.b)}${sl('u','u<sub>0</sub>',-6,6,0.5,LS.u0)}</div>
   <div class="btnrow" style="margin:2px 0 8px">${PRE.map((x,i)=>`<button class="btn small sec2" data-pre="${i}">${tr(x[0])}</button>`).join('')}</div>
   <svg class="labsvg" id="lsvg" viewBox="0 0 360 300" style="direction:ltr" role="img" aria-label="${tr(B('تمثيل حدود المتتالية','Représentation des termes de la suite'))}"></svg>
   <div class="btnrow"><button class="btn small" id="lplay"></button><button class="btn small sec2" id="lstep">+1 ${tr(B('خطوة','étape'))}</button></div>
   <div class="labread" id="lread"></div>
   <div class="labnote">${tr(B(
    `<b>لاحظ:</b> المستقيمان ${M('y = ax + b')} و ${M('y = x')} يتقاطعان في النقطة التي فاصلتها ${M('α')}. إذا كان ${M('−1 < a < 1')} فإنّ «السلّم» ينجذب نحو هذه النقطة (متتالية متقاربة)، وإذا كان ${M('a < 0')} يصبح السلّم حلزونا لأنّ الحدود تتناوب حول ${M('α')}. جرّب ${M('a = 1')} (حسابية: المستقيمان متوازيان)، ثمّ ${M('b = 0')} (هندسية).`,
    `<b>Observe :</b> les droites ${M('y = ax + b')} et ${M('y = x')} se coupent au point d'abscisse ${M('α')}. Si ${M('−1 < a < 1')}, l'« escalier » est attiré par ce point (suite convergente) ; si ${M('a < 0')}, il devient une spirale car les termes alternent autour de ${M('α')}. Essaie ${M('a = 1')} (arithmétique : les droites sont parallèles), puis ${M('b = 0')} (géométrique).`))}</div></div>`);
  const sync=()=>{ [['a','a'],['b','b'],['u','u0']].forEach(([id,k])=>{ const s=p.querySelector('#s'+id), v=p.querySelector('#v'+id); if(s) s.value=LS[k]; if(v) v.textContent=ar(LS[k]); }); };
  [['a','a'],['b','b'],['u','u0']].forEach(([id,k])=>{ const s=p.querySelector('#s'+id);
    s.oninput=()=>{ LS[k]=r1(+s.value); p.querySelector('#v'+id).textContent=ar(LS[k]); stopAnim(); LS.k=KMAX; playLabel(); draw(); }; });
  p.querySelectorAll('[data-pre]').forEach(bt=>bt.onclick=()=>{ const x=PRE[+bt.dataset.pre]; LS.a=x[1]; LS.b=x[2]; LS.u0=x[3]; sync(); stopAnim(); LS.k=KMAX; playLabel(); draw(); });
  p.querySelectorAll('[data-lm]').forEach(bt=>bt.onclick=()=>{ LS.mode=bt.dataset.lm; LABS[5](p); });
  p.querySelector('#lplay').onclick=()=>{
    if(LS.tm){ stopAnim(); LS.k=KMAX; playLabel(); draw(); return; }
    LS.k=0; draw(); LS.tm=setInterval(()=>{ if(!document.getElementById('lsvg')){ stopAnim(); return; }
      LS.k++; draw(); if(LS.k>=KMAX){ stopAnim(); playLabel(); } },650); playLabel(); };
  p.querySelector('#lstep').onclick=()=>{ stopAnim(); LS.k=LS.k>=KMAX?1:LS.k+1; playLabel(); draw(); };
  playLabel(); draw();
};
})();
