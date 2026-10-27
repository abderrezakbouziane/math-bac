/* ============================================================================
   الباب 5 — المتتاليات العددية / Chapitre 5 — Suites numériques
   Contenu rédigé : cours, analogies, dans la vie, l'essentiel, bien raisonner.
   Les exercices générés, l'exercice type BAC et le laboratoire sont dans ch-suites-ex.js.
   ============================================================================ */
(function(){
const U=i=>`u<sub>${i}</sub>`, V=i=>`v<sub>${i}</sub>`;
const un=U('n'), un1=U('n+1'), u0=U(0), vn=V('n'), vn1=V('n+1'), v0=V(0);
const LIM='lim<sub>n→+∞</sub> ';
const h=f('1','2');
const S='(u<sub>n</sub>)';

Object.assign(CH(5),{
soon:false,
hook:B(
`المتتالية فيلمٌ مصنوع من الأعداد: صورة بعد صورة، وكلّ صورة تتبع قاعدة. حين تفهم القاعدة تستطيع أن تتنبّأ بالصورة رقم ${M('1000')} دون أن تشاهد الفيلم كلّه، بل وأن تعرف كيف ينتهي. وهذا الباب حاضر في <b>كلّ</b> مواضيع البكالوريا تقريبا.`,
`Une suite, c'est un film fait de nombres : image après image, chacune obéit à une règle. Quand on comprend la règle, on peut prédire l'image n° ${M('1000')} sans regarder tout le film — et même savoir comment il se termine. Ce chapitre tombe presque <b>chaque année</b> au BAC.`),

/* ------------------------------------------------------------------ الدرس / Cours */
cours:B(`
<div class="card"><h3>١) عموميات: تعريف متتالية وطريقتا توليدها</h3>
<div class="rule"><b>تعريف:</b> المتتالية العددية ${M(S)} دالة ترفق بكلّ عدد طبيعي ${M('n')} (ابتداءً من رتبة ${M('n<sub>0</sub>')}) عددا حقيقيا ${M(un)} يُسمّى <b>الحدّ ذا الرتبة</b> ${M('n')}، أو <b>الحدّ العام</b>.</div>
<p>توجد طريقتان أساسيتان لتعريف متتالية:</p>
<ul><li><b>بصيغة صريحة</b> ${M(`${un} = f(n)`)}: نحسب أيّ حدّ مباشرة. مثال: ${M(`${un} = 2n² − 1`)}، ومنه ${M(`${U(3)} = 2 × 9 − 1 = 17`)}.</li>
<li><b>بعلاقة تراجعية</b> ${M(`${un1} = f(${un})`)} مع حدّ أوّل معلوم: كلّ حدّ يُحسب من الذي قبله. مثال: ${M(`${u0} = 2`)} و ${M(`${un1} = 3${un} − 1`)}، ومنه ${M(`${U(1)} = 5`)} ثمّ ${M(`${U(2)} = 14`)}. ولحساب ${M(U(10))} يجب المرور بكلّ الحدود السابقة.</li></ul>
<div class="warn"><b>انتبه:</b> ${M(un1)} هو الحدّ الموالي، وليس ${M(`${un} + 1`)}. مثلا إذا كان ${M(`${un} = n²`)} فإنّ ${M(`${un1} = (n + 1)² = n² + 2n + 1`)}، بينما ${M(`${un} + 1 = n² + 1`)}.</div></div>

<div class="card"><h3>٢) اتجاه تغيّر متتالية — المتتاليات المحدودة</h3>
<div class="rule">نقول إنّ ${M(S)} <b>متزايدة تماما</b> إذا كان من أجل كلّ ${M('n')}: ${M(`${un1} > ${un}`)}، و<b>متناقصة تماما</b> إذا كان ${M(`${un1} < ${un}`)}، و<b>ثابتة</b> إذا كان ${M(`${un1} = ${un}`)}. والمتتالية المتزايدة أو المتناقصة تُسمّى <b>رتيبة</b>.</div>
<p>ثلاث طرق لدراسة اتجاه التغيّر:</p>
<ol class="steps"><li>ندرس <b>إشارة الفرق</b> ${M(`${un1} − ${un}`)}، وهي الطريقة الأكثر استعمالا.</li>
<li>إذا كانت كلّ الحدود <b>موجبة تماما</b>، نقارن ${M(f(un1,un))} بالعدد ${M('1')}.</li>
<li>إذا كان ${M(`${un} = f(n)`)}، فإنّ اتجاه تغيّر الدالة ${M('f')} على ${M('[0 ; +∞[')} يعطي اتجاه تغيّر المتتالية.</li></ol>
<div class="ex"><b>مثال:</b> ${M(`${un} = n² − 4n`)}. ${M(`${un1} − ${un} = (n + 1)² − 4(n + 1) − n² + 4n = 2n − 3`)}. هذا الفرق موجب تماما من أجل ${M('n ≥ 2')}: المتتالية متزايدة تماما ابتداءً من الرتبة ${M('2')}.</div>
<div class="rule">${M(S)} <b>محدودة من الأعلى</b> بالعدد ${M('M')} إذا كان ${M(`${un} ≤ M`)} من أجل كلّ ${M('n')}، و<b>محدودة من الأسفل</b> بالعدد ${M('m')} إذا كان ${M(`${un} ≥ m`)} من أجل كلّ ${M('n')}، و<b>محدودة</b> إذا كانت محدودة من الأعلى ومن الأسفل.</div>
<div class="ex"><b>مثال:</b> ${M(`${un} = 3 − ${f('1','n + 1')}`)}. بما أنّ ${M(`0 < ${f('1','n + 1')} ≤ 1`)} فإنّ ${M(`2 ≤ ${un} < 3`)}: المتتالية محدودة.</div></div>

<div class="card"><h3>٣) الاستدلال بالتراجع</h3>
<div class="rule">لإثبات أنّ خاصية ${M('P(n)')} صحيحة من أجل كلّ عدد طبيعي ${M('n ≥ n<sub>0</sub>')}:
<ol class="steps"><li><b>التحقّق:</b> نتحقّق أنّ ${M('P(n<sub>0</sub>)')} صحيحة.</li>
<li><b>الوراثة:</b> نفرض أنّ ${M('P(n)')} صحيحة من أجل عدد طبيعي كيفي ${M('n ≥ n<sub>0</sub>')}، ونبرهن أنّ ${M('P(n + 1)')} صحيحة.</li>
<li><b>الخلاصة:</b> ${M('P(n)')} صحيحة من أجل كلّ ${M('n ≥ n<sub>0</sub>')}.</li></ol></div>
<div class="ex"><b>مثال:</b> ${M(`${u0} = 1`)} و ${M(`${un1} = ${h}${un} + 2`)}. نبرهن أنّ ${M(`0 ≤ ${un} ≤ 4`)} من أجل كلّ عدد طبيعي ${M('n')}.<br>
• <b>التحقّق:</b> ${M(`${u0} = 1`)} و ${M('0 ≤ 1 ≤ 4')}.<br>
• <b>الوراثة:</b> نفرض ${M(`0 ≤ ${un} ≤ 4`)}. نضرب في ${M(h)} وهو موجب: ${M(`0 ≤ ${h}${un} ≤ 2`)}، ثمّ نضيف ${M('2')}: ${M(`2 ≤ ${un1} ≤ 4`)}، إذن ${M(`0 ≤ ${un1} ≤ 4`)}.<br>
• <b>الخلاصة:</b> من أجل كلّ عدد طبيعي ${M('n')}: ${M(`0 ≤ ${un} ≤ 4`)}.</div>
<div class="warn"><b>الوراثة وحدها لا تكفي:</b> الخاصية «${M('10<sup>n</sup> + 1')} مضاعف للعدد ${M('9')}» وراثية: إذا كان ${M('10<sup>n</sup> + 1 = 9k')} فإنّ ${M('10<sup>n+1</sup> + 1 = 9(10k − 1)')}. لكنّها خاطئة دائما، فمثلا ${M('10<sup>0</sup> + 1 = 2')}. التحقّق خطوة إلزامية.</div></div>

<div class="card"><h3>٤) المتتاليات الحسابية</h3>
<div class="rule"><b>تعريف:</b> ${M(S)} متتالية حسابية إذا وُجد عدد حقيقي ${M('r')} بحيث من أجل كلّ ${M('n')}: ${M(`${un1} = ${un} + r`)}. العدد ${M('r')} هو <b>أساس</b> المتتالية.</div>
<div class="rule"><b>الحدّ العام:</b> ${M(`${un} = ${u0} + nr`)}، وبصفة عامّة ${M(`${un} = ${U('p')} + (n − p)r`)}.</div>
<div class="ex"><b>مثال:</b> ${M(`${u0} = 7`)} و ${M('r = −3')}: ${M(`${un} = 7 − 3n`)}، ومنه ${M(`${U(20)} = 7 − 60 = −53`)}.</div>
<p><b>اتجاه التغيّر:</b> ${M(`${un1} − ${un} = r`)}، فالمتتالية متزايدة تماما إذا كان ${M('r > 0')}، ومتناقصة تماما إذا كان ${M('r < 0')}، وثابتة إذا كان ${M('r = 0')}.</p>
<div class="rule"><b>مجموع حدود متتابعة:</b> ${M(`S = ${U('p')} + ${U('p+1')} + … + ${un} = (n − p + 1) × ${f(`${U('p')} + ${un}`,'2')}`)}<br>
أي: <b>عدد الحدود × (الحدّ الأوّل + الحدّ الأخير) ÷ 2</b>. وحالة خاصة: ${M(`1 + 2 + … + n = ${f('n(n + 1)','2')}`)}.</div>
<div class="ex">${M(`1 + 2 + … + 100 = ${f('100 × 101','2')} = 5050`)}.</div>
<div class="rule"><b>الوسط الحسابي:</b> الأعداد ${M('a')} ، ${M('b')} ، ${M('c')} حدود متتابعة لمتتالية حسابية إذا وفقط إذا كان ${M('2b = a + c')}.</div></div>

<div class="card"><h3>٥) المتتاليات الهندسية</h3>
<div class="rule"><b>تعريف:</b> ${M(S)} متتالية هندسية إذا وُجد عدد حقيقي ${M('q')} بحيث من أجل كلّ ${M('n')}: ${M(`${un1} = q × ${un}`)}. العدد ${M('q')} هو <b>أساس</b> المتتالية.</div>
<div class="rule"><b>الحدّ العام:</b> ${M(`${un} = ${u0} × q<sup>n</sup>`)}، وبصفة عامّة ${M(`${un} = ${U('p')} × q<sup>n−p</sup>`)}.</div>
<div class="ex"><b>مثال:</b> ${M(`${u0} = 5`)} و ${M('q = 2')}: ${M(`${un} = 5 × 2<sup>n</sup>`)}، ومنه ${M(`${U(6)} = 5 × 64 = 320`)}.</div>
<p><b>اتجاه التغيّر</b> في حالة ${M(`${u0} > 0`)}: إذا كان ${M('q > 1')} فهي متزايدة تماما، وإذا كان ${M('0 < q < 1')} فهي متناقصة تماما، وإذا كان ${M('q = 1')} فهي ثابتة، وإذا كان ${M('q < 0')} فإشارات الحدود تتناوب والمتتالية ليست رتيبة. وإذا كان ${M(`${u0} < 0`)} ينعكس الاتجاهان.</p>
<div class="rule"><b>مجموع حدود متتابعة</b> (${M('q ≠ 1')}): ${M(`S = ${U('p')} + … + ${un} = ${U('p')} × ${f('1 − q<sup>n−p+1</sup>','1 − q')}`)}<br>
أي: <b>الحدّ الأوّل × (1 − الأساس<sup>عدد الحدود</sup>) ÷ (1 − الأساس)</b>. وحالة خاصة: ${M(`1 + q + … + q<sup>n</sup> = ${f('1 − q<sup>n+1</sup>','1 − q')}`)}.</div>
<div class="ex">${M(`1 + 2 + 4 + … + 2<sup>9</sup> = ${f('1 − 2<sup>10</sup>','1 − 2')} = 1023`)}.</div>
<div class="rule"><b>الوسط الهندسي:</b> الأعداد غير المعدومة ${M('a')} ، ${M('b')} ، ${M('c')} حدود متتابعة لمتتالية هندسية إذا وفقط إذا كان ${M('b² = ac')}.</div></div>

<div class="card"><h3>٦) نهاية متتالية — التقارب</h3>
<div class="rule">نقول إنّ ${M(S)} <b>متقاربة</b> نحو العدد الحقيقي ${M('ℓ')} إذا أصبحت حدودها قريبة من ${M('ℓ')} بالقدر الذي نريد ابتداءً من رتبة معيّنة، ونكتب ${M(`${LIM}${un} = ℓ`)}. وإلّا فهي <b>متباعدة</b>: نهايتها ${M('+∞')} أو ${M('−∞')}، أو ليست لها نهاية.</div>
<div class="rule"><b>نهاية ${M('q<sup>n</sup>')}:</b><br>
• إذا كان ${M('q > 1')}: ${M(`${LIM}q<sup>n</sup> = +∞`)}<br>
• إذا كان ${M('q = 1')}: ${M('q<sup>n</sup> = 1')}<br>
• إذا كان ${M('−1 < q < 1')}: ${M(`${LIM}q<sup>n</sup> = 0`)}<br>
• إذا كان ${M('q ≤ −1')}: المتتالية ${M('(q<sup>n</sup>)')} ليست لها نهاية.</div>
<div class="rule"><b>مبرهنة التقارب الرتيب:</b> كلّ متتالية <b>متزايدة ومحدودة من الأعلى</b> متقاربة، وكلّ متتالية <b>متناقصة ومحدودة من الأسفل</b> متقاربة. أمّا المتتالية المتزايدة غير المحدودة من الأعلى فتؤول إلى ${M('+∞')}.</div>
<div class="rule"><b>المقارنة:</b> إذا كان ${M(`${vn} ≤ ${un} ≤ w<sub>n</sub>`)} ابتداءً من رتبة معيّنة، وكانت ${M('(v<sub>n</sub>)')} و ${M('(w<sub>n</sub>)')} متقاربتين نحو نفس العدد ${M('ℓ')}، فإنّ ${M(`${LIM}${un} = ℓ`)}. وإذا كان ${M(`${un} ≥ ${vn}`)} و ${M(`${LIM}${vn} = +∞`)} فإنّ ${M(`${LIM}${un} = +∞`)}.</div>
<div class="rule"><b>متتاليتان متجاورتان:</b> إذا كانت ${M(S)} متزايدة و ${M('(v<sub>n</sub>)')} متناقصة و ${M(`${LIM}(${vn} − ${un}) = 0`)}، فإنّهما متقاربتان نحو نفس النهاية ${M('ℓ')}، ومن أجل كلّ ${M('n')}: ${M(`${un} ≤ ℓ ≤ ${vn}`)}.</div>
<div class="rule"><b>متتالية تراجعية:</b> إذا كان ${M(`${un1} = f(${un})`)} حيث ${M('f')} دالة مستمرّة، وكانت ${M(S)} متقاربة نحو ${M('ℓ')}، فإنّ ${M('ℓ')} حلّ للمعادلة ${M('f(x) = x')}.</div></div>

<div class="card"><h3>٧) طريقة المتتالية المساعدة</h3>
<p>هذه الطريقة حاضرة في أغلب مواضيع البكالوريا. نعتبر ${M(`${un1} = a${un} + b`)} حيث ${M('a ≠ 0')} و ${M('a ≠ 1')}.</p>
<ol class="steps"><li>نبحث عن العدد ${M('α')} الذي يحقّق ${M('α = aα + b')}، أي ${M(`α = ${f('b','1 − a')}`)}.</li>
<li>نضع ${M(`${vn} = ${un} − α`)}، فنجد ${M(`${vn1} = a${un} + b − (aα + b) = a(${un} − α) = a${vn}`)}: المتتالية ${M('(v<sub>n</sub>)')} هندسية أساسها ${M('a')}.</li>
<li>ومنه ${M(`${vn} = ${v0} × a<sup>n</sup>`)}، ثمّ ${M(`${un} = α + (${u0} − α) × a<sup>n</sup>`)}.</li></ol>
<div class="ex"><b>مثال (متتالية الفقرة ٣ نفسها):</b> ${M(`${u0} = 1`)} و ${M(`${un1} = ${h}${un} + 2`)}.<br>
${M(`α = ${f('2','1 − 0,5')} = 4`)}، ونضع ${M(`${vn} = ${un} − 4`)}: ${M(`${v0} = −3`)} و ${M(`${vn} = −3 × (${h})<sup>n</sup>`)}، إذن ${M(`${un} = 4 − 3 × (${h})<sup>n</sup>`)}.<br>
وبما أنّ ${M(`−1 < ${h} < 1`)} فإنّ ${M(`${LIM}${un} = 4`)}.</div></div>`,

`
<div class="card"><h3>1) Généralités : définition et modes de génération</h3>
<div class="rule"><b>Définition :</b> une suite numérique ${M(S)} associe à chaque entier naturel ${M('n')} (à partir d'un rang ${M('n<sub>0</sub>')}) un réel ${M(un)}, appelé <b>terme de rang</b> ${M('n')} ou <b>terme général</b>.</div>
<p>Il y a deux façons principales de définir une suite :</p>
<ul><li><b>De façon explicite</b> ${M(`${un} = f(n)`)} : on calcule n'importe quel terme directement. Exemple : ${M(`${un} = 2n² − 1`)}, donc ${M(`${U(3)} = 2 × 9 − 1 = 17`)}.</li>
<li><b>Par récurrence</b> ${M(`${un1} = f(${un})`)}, avec un premier terme donné : chaque terme se calcule à partir du précédent. Exemple : ${M(`${u0} = 2`)} et ${M(`${un1} = 3${un} − 1`)}, donc ${M(`${U(1)} = 5`)} puis ${M(`${U(2)} = 14`)}. Pour calculer ${M(U(10))}, il faut passer par tous les termes précédents.</li></ul>
<div class="warn"><b>Attention :</b> ${M(un1)} est le terme suivant, pas ${M(`${un} + 1`)}. Par exemple, si ${M(`${un} = n²`)}, alors ${M(`${un1} = (n + 1)² = n² + 2n + 1`)}, alors que ${M(`${un} + 1 = n² + 1`)}.</div></div>

<div class="card"><h3>2) Sens de variation — suites bornées</h3>
<div class="rule">${M(S)} est <b>strictement croissante</b> si, pour tout ${M('n')}, ${M(`${un1} > ${un}`)} ; <b>strictement décroissante</b> si ${M(`${un1} < ${un}`)} ; <b>constante</b> si ${M(`${un1} = ${un}`)}. Une suite croissante ou décroissante est dite <b>monotone</b>.</div>
<p>Trois méthodes pour étudier le sens de variation :</p>
<ol class="steps"><li>Étudier le <b>signe de la différence</b> ${M(`${un1} − ${un}`)} : c'est la méthode la plus utilisée.</li>
<li>Si tous les termes sont <b>strictement positifs</b>, comparer ${M(f(un1,un))} à ${M('1')}.</li>
<li>Si ${M(`${un} = f(n)`)}, le sens de variation de la fonction ${M('f')} sur ${M('[0 ; +∞[')} donne celui de la suite.</li></ol>
<div class="ex"><b>Exemple :</b> ${M(`${un} = n² − 4n`)}. ${M(`${un1} − ${un} = (n + 1)² − 4(n + 1) − n² + 4n = 2n − 3`)}. Cette différence est strictement positive pour ${M('n ≥ 2')} : la suite est strictement croissante à partir du rang ${M('2')}.</div>
<div class="rule">${M(S)} est <b>majorée</b> par ${M('M')} si ${M(`${un} ≤ M`)} pour tout ${M('n')}, <b>minorée</b> par ${M('m')} si ${M(`${un} ≥ m`)} pour tout ${M('n')}, et <b>bornée</b> si elle est à la fois majorée et minorée.</div>
<div class="ex"><b>Exemple :</b> ${M(`${un} = 3 − ${f('1','n + 1')}`)}. Comme ${M(`0 < ${f('1','n + 1')} ≤ 1`)}, on a ${M(`2 ≤ ${un} < 3`)} : la suite est bornée.</div></div>

<div class="card"><h3>3) Raisonnement par récurrence</h3>
<div class="rule">Pour démontrer qu'une propriété ${M('P(n)')} est vraie pour tout entier ${M('n ≥ n<sub>0</sub>')} :
<ol class="steps"><li><b>Initialisation :</b> on vérifie que ${M('P(n<sub>0</sub>)')} est vraie.</li>
<li><b>Hérédité :</b> on suppose ${M('P(n)')} vraie pour un entier ${M('n ≥ n<sub>0</sub>')} quelconque, et on démontre ${M('P(n + 1)')}.</li>
<li><b>Conclusion :</b> ${M('P(n)')} est vraie pour tout ${M('n ≥ n<sub>0</sub>')}.</li></ol></div>
<div class="ex"><b>Exemple :</b> ${M(`${u0} = 1`)} et ${M(`${un1} = ${h}${un} + 2`)}. Montrons que ${M(`0 ≤ ${un} ≤ 4`)} pour tout entier naturel ${M('n')}.<br>
• <b>Initialisation :</b> ${M(`${u0} = 1`)} et ${M('0 ≤ 1 ≤ 4')}.<br>
• <b>Hérédité :</b> supposons ${M(`0 ≤ ${un} ≤ 4`)}. On multiplie par ${M(h)}, qui est positif : ${M(`0 ≤ ${h}${un} ≤ 2`)}, puis on ajoute ${M('2')} : ${M(`2 ≤ ${un1} ≤ 4`)}, donc ${M(`0 ≤ ${un1} ≤ 4`)}.<br>
• <b>Conclusion :</b> pour tout entier naturel ${M('n')}, ${M(`0 ≤ ${un} ≤ 4`)}.</div>
<div class="warn"><b>L'hérédité seule ne suffit pas :</b> la propriété « ${M('10<sup>n</sup> + 1')} est un multiple de ${M('9')} » est héréditaire : si ${M('10<sup>n</sup> + 1 = 9k')}, alors ${M('10<sup>n+1</sup> + 1 = 9(10k − 1)')}. Pourtant elle est toujours fausse, par exemple ${M('10<sup>0</sup> + 1 = 2')}. L'initialisation est obligatoire.</div></div>

<div class="card"><h3>4) Suites arithmétiques</h3>
<div class="rule"><b>Définition :</b> ${M(S)} est arithmétique s'il existe un réel ${M('r')} tel que, pour tout ${M('n')}, ${M(`${un1} = ${un} + r`)}. Le réel ${M('r')} est la <b>raison</b> de la suite.</div>
<div class="rule"><b>Terme général :</b> ${M(`${un} = ${u0} + nr`)}, et plus généralement ${M(`${un} = ${U('p')} + (n − p)r`)}.</div>
<div class="ex"><b>Exemple :</b> ${M(`${u0} = 7`)} et ${M('r = −3')} : ${M(`${un} = 7 − 3n`)}, donc ${M(`${U(20)} = 7 − 60 = −53`)}.</div>
<p><b>Sens de variation :</b> ${M(`${un1} − ${un} = r`)}, donc la suite est strictement croissante si ${M('r > 0')}, strictement décroissante si ${M('r < 0')}, constante si ${M('r = 0')}.</p>
<div class="rule"><b>Somme de termes consécutifs :</b> ${M(`S = ${U('p')} + ${U('p+1')} + … + ${un} = (n − p + 1) × ${f(`${U('p')} + ${un}`,'2')}`)}<br>
c'est-à-dire : <b>nombre de termes × (premier terme + dernier terme) ÷ 2</b>. Cas particulier : ${M(`1 + 2 + … + n = ${f('n(n + 1)','2')}`)}.</div>
<div class="ex">${M(`1 + 2 + … + 100 = ${f('100 × 101','2')} = 5050`)}.</div>
<div class="rule"><b>Moyenne arithmétique :</b> ${M('a')}, ${M('b')}, ${M('c')} sont trois termes consécutifs d'une suite arithmétique si et seulement si ${M('2b = a + c')}.</div></div>

<div class="card"><h3>5) Suites géométriques</h3>
<div class="rule"><b>Définition :</b> ${M(S)} est géométrique s'il existe un réel ${M('q')} tel que, pour tout ${M('n')}, ${M(`${un1} = q × ${un}`)}. Le réel ${M('q')} est la <b>raison</b> de la suite.</div>
<div class="rule"><b>Terme général :</b> ${M(`${un} = ${u0} × q<sup>n</sup>`)}, et plus généralement ${M(`${un} = ${U('p')} × q<sup>n−p</sup>`)}.</div>
<div class="ex"><b>Exemple :</b> ${M(`${u0} = 5`)} et ${M('q = 2')} : ${M(`${un} = 5 × 2<sup>n</sup>`)}, donc ${M(`${U(6)} = 5 × 64 = 320`)}.</div>
<p><b>Sens de variation</b> lorsque ${M(`${u0} > 0`)} : si ${M('q > 1')} elle est strictement croissante ; si ${M('0 < q < 1')} elle est strictement décroissante ; si ${M('q = 1')} elle est constante ; si ${M('q < 0')} les signes des termes alternent et la suite n'est pas monotone. Si ${M(`${u0} < 0`)}, les deux sens s'inversent.</p>
<div class="rule"><b>Somme de termes consécutifs</b> (${M('q ≠ 1')}) : ${M(`S = ${U('p')} + … + ${un} = ${U('p')} × ${f('1 − q<sup>n−p+1</sup>','1 − q')}`)}<br>
c'est-à-dire : <b>premier terme × (1 − raison<sup>nombre de termes</sup>) ÷ (1 − raison)</b>. Cas particulier : ${M(`1 + q + … + q<sup>n</sup> = ${f('1 − q<sup>n+1</sup>','1 − q')}`)}.</div>
<div class="ex">${M(`1 + 2 + 4 + … + 2<sup>9</sup> = ${f('1 − 2<sup>10</sup>','1 − 2')} = 1023`)}.</div>
<div class="rule"><b>Moyenne géométrique :</b> trois réels non nuls ${M('a')}, ${M('b')}, ${M('c')} sont trois termes consécutifs d'une suite géométrique si et seulement si ${M('b² = ac')}.</div></div>

<div class="card"><h3>6) Limite d'une suite — convergence</h3>
<div class="rule">${M(S)} <b>converge</b> vers le réel ${M('ℓ')} si ses termes deviennent aussi proches de ${M('ℓ')} qu'on le veut à partir d'un certain rang ; on écrit ${M(`${LIM}${un} = ℓ`)}. Sinon elle <b>diverge</b> : sa limite est ${M('+∞')} ou ${M('−∞')}, ou elle n'a pas de limite.</div>
<div class="rule"><b>Limite de ${M('q<sup>n</sup>')} :</b><br>
• si ${M('q > 1')} : ${M(`${LIM}q<sup>n</sup> = +∞`)}<br>
• si ${M('q = 1')} : ${M('q<sup>n</sup> = 1')}<br>
• si ${M('−1 < q < 1')} : ${M(`${LIM}q<sup>n</sup> = 0`)}<br>
• si ${M('q ≤ −1')} : la suite ${M('(q<sup>n</sup>)')} n'a pas de limite.</div>
<div class="rule"><b>Théorème de convergence monotone :</b> toute suite <b>croissante et majorée</b> converge ; toute suite <b>décroissante et minorée</b> converge. Une suite croissante non majorée tend vers ${M('+∞')}.</div>
<div class="rule"><b>Comparaison :</b> si ${M(`${vn} ≤ ${un} ≤ w<sub>n</sub>`)} à partir d'un certain rang, et si ${M('(v<sub>n</sub>)')} et ${M('(w<sub>n</sub>)')} convergent vers le même réel ${M('ℓ')}, alors ${M(`${LIM}${un} = ℓ`)} (théorème des gendarmes). Si ${M(`${un} ≥ ${vn}`)} et ${M(`${LIM}${vn} = +∞`)}, alors ${M(`${LIM}${un} = +∞`)}.</div>
<div class="rule"><b>Suites adjacentes :</b> si ${M(S)} est croissante, ${M('(v<sub>n</sub>)')} décroissante et ${M(`${LIM}(${vn} − ${un}) = 0`)}, alors elles convergent vers la même limite ${M('ℓ')}, et pour tout ${M('n')} : ${M(`${un} ≤ ℓ ≤ ${vn}`)}.</div>
<div class="rule"><b>Suite récurrente :</b> si ${M(`${un1} = f(${un})`)} avec ${M('f')} continue, et si ${M(S)} converge vers ${M('ℓ')}, alors ${M('ℓ')} est solution de l'équation ${M('f(x) = x')}.</div></div>

<div class="card"><h3>7) La méthode de la suite auxiliaire</h3>
<p>Cette méthode apparaît dans la plupart des sujets de BAC. On considère ${M(`${un1} = a${un} + b`)} avec ${M('a ≠ 0')} et ${M('a ≠ 1')}.</p>
<ol class="steps"><li>On cherche le réel ${M('α')} tel que ${M('α = aα + b')}, c'est-à-dire ${M(`α = ${f('b','1 − a')}`)}.</li>
<li>On pose ${M(`${vn} = ${un} − α`)} et on trouve ${M(`${vn1} = a${un} + b − (aα + b) = a(${un} − α) = a${vn}`)} : la suite ${M('(v<sub>n</sub>)')} est géométrique de raison ${M('a')}.</li>
<li>Donc ${M(`${vn} = ${v0} × a<sup>n</sup>`)}, puis ${M(`${un} = α + (${u0} − α) × a<sup>n</sup>`)}.</li></ol>
<div class="ex"><b>Exemple (la suite du paragraphe 3) :</b> ${M(`${u0} = 1`)} et ${M(`${un1} = ${h}${un} + 2`)}.<br>
${M(`α = ${f('2','1 − 0,5')} = 4`)} ; on pose ${M(`${vn} = ${un} − 4`)} : ${M(`${v0} = −3`)} et ${M(`${vn} = −3 × (${h})<sup>n</sup>`)}, donc ${M(`${un} = 4 − 3 × (${h})<sup>n</sup>`)}.<br>
Comme ${M(`−1 < ${h} < 1`)}, on obtient ${M(`${LIM}${un} = 4`)}.</div></div>`),

/* ------------------------------------------------------------- تشبيهات / Analogies */
analogie:B(`
<div class="card"><h3>الدَّرَج وآلة النسخ بالتكبير</h3>
<p>المتتالية <b>الحسابية</b> درج منتظم: كلّ درجة تضيف نفس الارتفاع ${M('r')}. بعد ${M('n')} درجة صعدت ${M('n × r')}، ولهذا ${M(`${un} = ${u0} + nr`)}.</p>
<p>المتتالية <b>الهندسية</b> آلة نسخ مضبوطة على تكبير ثابت ${M('× q')}: كلّ نسخة هي السابقة مكبّرة (${M('q > 1')}) أو مصغّرة (${M('0 < q < 1')}). بعد ${M('n')} نسخة تكون الصورة الأصلية قد ضُربت في ${M('q<sup>n</sup>')}.</p>
<p>الفرق كلّه في كلمة واحدة: <b>نضيف</b> (حسابية) أم <b>نضرب</b> (هندسية)؟</p></div>
<div class="card"><h3>الاستدلال بالتراجع = قطع الدومينو</h3>
<p>لكي تسقط كلّ القطع يجب شرطان: أن تُسقط <b>القطعة الأولى</b> (التحقّق)، وأن تكون كلّ قطعة <b>قريبة بما يكفي</b> لتُسقط التي بعدها (الوراثة).</p>
<ul><li>بدون القطعة الأولى لا يسقط شيء، مهما كانت القطع متقاربة: هذا مثال ${M('10<sup>n</sup> + 1')} في الدرس.</li>
<li>وإذا انقطعت السلسلة في مكان ما، تتوقّف القطع عن السقوط: الوراثة يجب أن تصحّ من أجل <b>كلّ</b> ${M('n')}.</li></ul></div>
<div class="card"><h3>المتتالية المتزايدة المحدودة: الصعود تحت سقف</h3>
<p>تصعد دائما، لكن يوجد سقف لا تستطيع اختراقه. لا بدّ إذن أن تقترب من ارتفاع معيّن: المتتالية متقاربة.</p>
<p>انتبه: هذا الارتفاع ليس بالضرورة السقف نفسه. قد يكون السقف في ${M('10')} وتقترب أنت من ${M('4')}. لهذا نقول: «متزايدة ومحدودة من الأعلى بـ ${M('6')}، إذن متقاربة»، دون أن نستنتج أنّ النهاية ${M('6')}.</p></div>
<div class="card"><h3>التقارب: نصف المسافة المتبقّية</h3>
<p>تقف على بعد مترين من جدار، وفي كلّ خطوة تقطع <b>نصف</b> المسافة المتبقّية. لن تلمس الجدار أبدا، لكنّ المسافة تصبح أصغر من أيّ عدد تختاره: ${M(`d<sub>n</sub> = 2 × (${h})<sup>n</sup>`)} تؤول إلى ${M('0')}. هذا بالضبط معنى ${M(`${LIM}${un} = ℓ`)}: الاقتراب بالقدر الذي نريد، لا الوصول.</p></div>
<div class="card"><h3>متتاليتان متجاورتان: مسافران في رواق</h3>
<p>مسافر يمشي نحو الشرق فقط، وآخر نحو الغرب فقط، في رواق واحد، ولا يتجاوز أحدهما الآخر، والمسافة بينهما تؤول إلى ${M('0')}. سيلتقيان حتما في نفس النقطة: هذه هي النهاية المشتركة ${M('ℓ')}، وهي محصورة دائما بينهما.</p></div>
<div class="card"><h3>المتتالية المساعدة: تغيير مستوى المرجع</h3>
<p>فنجان قهوة يبرد في غرفة حرارتها ${M('20°')}. درجة حرارة القهوة نفسها تتغيّر بطريقة معقّدة، لكنّ <b>الفرق</b> بينها وبين حرارة الغرفة يُضرب تقريبا في نفس العدد كلّ دقيقة: هذا الفرق متتالية هندسية!</p>
<p>هذا ما نفعله مع ${M(`${vn} = ${un} − α`)}: نقيس الحدود انطلاقا من «نقطة التوازن» ${M('α')} بدل الصفر، فتظهر البنية الهندسية البسيطة المختبئة.</p></div>
<div class="card"><h3>مجموع غاوس: الطيّ</h3>
<p>لحساب ${M('1 + 2 + … + 100')} اكتب المجموع مرّتين، مرّة بالترتيب ومرّة بالترتيب المعاكس، ثمّ اجمع عموديا: كلّ عمود يعطي ${M('101')}، وعندك ${M('100')} عمود. المجموع المضاعف ${M('100 × 101')}، إذن المجموع ${M('5050')}. هذا هو سبب «الأوّل + الأخير، على 2».</p></div>`,
`
<div class="card"><h3>L'escalier et la photocopieuse à zoom</h3>
<p>Une suite <b>arithmétique</b> est un escalier régulier : chaque marche ajoute la même hauteur ${M('r')}. Après ${M('n')} marches, tu es monté de ${M('n × r')} — d'où ${M(`${un} = ${u0} + nr`)}.</p>
<p>Une suite <b>géométrique</b> est une photocopieuse réglée sur un zoom fixe ${M('× q')} : chaque copie est la précédente agrandie (${M('q > 1')}) ou réduite (${M('0 < q < 1')}). Après ${M('n')} copies, l'original a été multiplié par ${M('q<sup>n</sup>')}.</p>
<p>Toute la différence tient en un mot : on <b>ajoute</b> (arithmétique) ou on <b>multiplie</b> (géométrique) ?</p></div>
<div class="card"><h3>La récurrence = les dominos</h3>
<p>Pour que tous les dominos tombent, il faut deux choses : faire tomber le <b>premier</b> (initialisation), et que chaque domino soit <b>assez proche</b> pour renverser le suivant (hérédité).</p>
<ul><li>Sans le premier domino, rien ne tombe, même si les dominos sont bien serrés : c'est l'exemple ${M('10<sup>n</sup> + 1')} du cours.</li>
<li>Si la chaîne est coupée quelque part, la chute s'arrête : l'hérédité doit être vraie pour <b>tout</b> ${M('n')}.</li></ul></div>
<div class="card"><h3>Croissante et majorée : monter sous un plafond</h3>
<p>Tu montes sans arrêt, mais il y a un plafond que tu ne peux pas traverser. Tu t'approches donc forcément d'une certaine hauteur : la suite converge.</p>
<p>Attention : cette hauteur n'est pas forcément le plafond lui-même. Le plafond peut être à ${M('10')} et toi t'approcher de ${M('4')}. C'est pourquoi on dit « croissante et majorée par ${M('6')}, donc convergente », sans conclure que la limite vaut ${M('6')}.</p></div>
<div class="card"><h3>Converger : la moitié du chemin restant</h3>
<p>Tu es à deux mètres d'un mur et, à chaque pas, tu parcours la <b>moitié</b> de la distance qui reste. Tu ne toucheras jamais le mur, mais la distance devient plus petite que n'importe quel nombre choisi : ${M(`d<sub>n</sub> = 2 × (${h})<sup>n</sup>`)} tend vers ${M('0')}. C'est exactement le sens de ${M(`${LIM}${un} = ℓ`)} : s'approcher autant qu'on veut, pas forcément arriver.</p></div>
<div class="card"><h3>Suites adjacentes : deux marcheurs dans un couloir</h3>
<p>L'un ne marche que vers l'est, l'autre que vers l'ouest, dans le même couloir ; aucun ne dépasse l'autre, et l'écart entre eux tend vers ${M('0')}. Ils finissent forcément au même point : c'est la limite commune ${M('ℓ')}, toujours coincée entre les deux.</p></div>
<div class="card"><h3>La suite auxiliaire : changer de niveau de référence</h3>
<p>Une tasse de café refroidit dans une pièce à ${M('20°')}. La température du café varie de façon compliquée, mais l'<b>écart</b> avec la température de la pièce est multiplié à peu près par le même nombre chaque minute : cet écart est une suite géométrique !</p>
<p>C'est ce qu'on fait avec ${M(`${vn} = ${un} − α`)} : on mesure les termes à partir du « point d'équilibre » ${M('α')} au lieu de zéro, et la structure géométrique cachée apparaît.</p></div>
<div class="card"><h3>La somme de Gauss : le pliage</h3>
<p>Pour calculer ${M('1 + 2 + … + 100')}, écris la somme deux fois, une fois dans l'ordre et une fois à l'envers, puis additionne en colonnes : chaque colonne donne ${M('101')}, et il y a ${M('100')} colonnes. Le double de la somme vaut ${M('100 × 101')}, donc la somme vaut ${M('5050')}. Voilà d'où vient « premier + dernier, divisé par 2 ».</p></div>`),

/* --------------------------------------------------------- في الحياة / Dans la vie */
vie:B(`
<div class="card"><h3>أين تلتقي بالمتتاليات فعلا؟</h3>
<ul>
<li><b>الادّخار والفوائد المركّبة:</b> مبلغ ${M('100 000')} دج موضوع بنسبة ${M('5%')} سنويا يصبح بعد ${M('n')} سنة ${M(`C<sub>n</sub> = 100 000 × 1,05<sup>n</sup>`)}: متتالية هندسية أساسها ${M('1,05')}. بعد ${M('10')} سنوات: حوالي ${M('162 889')} دج. أمّا الفائدة البسيطة (نفس المبلغ يضاف كلّ سنة) فتعطي متتالية حسابية.</li>
<li><b>الطبّ والصيدلة:</b> يتخلّص الجسم كلّ ساعة من ${M('20%')} من دواء في الدم، ويتلقّى المريض جرعة ${M('2')} ملغ كلّ ساعة: ${M(`${un1} = 0,8${un} + 2`)}. الطريقة المساعدة تعطي النهاية ${M(`α = ${f('2','0,2')} = 10`)} ملغ: الكمّية تستقرّ عند ${M('10')} ملغ مهما كانت الجرعة الأولى.</li>
<li><b>البيولوجيا:</b> بكتيريا تنقسم كلّ ${M('20')} دقيقة: ${M(`N<sub>n</sub> = N<sub>0</sub> × 2<sup>n</sup>`)}. بعد ${M('3')} ساعات (${M('9')} انقسامات) يُضرب العدد في ${M('2<sup>9</sup> = 512')}.</li>
<li><b>الفيزياء — النشاط الإشعاعي:</b> كلّ ${M('5730')} سنة تُقسم كمّية الكربون ${M('14')} على ${M('2')}: متتالية هندسية أساسها ${M(h)}، وهي أساس التأريخ بالكربون ${M('14')} الذي تدرسه في الفيزياء هذه السنة.</li>
<li><b>نحو الدالة الأسية:</b> المتتالية الهندسية هي «النسخة المتقطّعة» للدالة الأسية: نفس الظواهر (تفريغ مكثّفة، تناقص إشعاعي، نموّ سكّاني) تُدرس بالمتتاليات عند القياس خطوة بخطوة، وبالدالة الأسية عند القياس المستمرّ.</li>
<li><b>الإعلام الآلي:</b> الخوارزميات التي «تكرّر» حسابا (حساب ${M(un1)} من ${M(un)} داخل حلقة) هي متتاليات تراجعية، وهكذا تحسب الآلات الحاسبة جذورا ونهايات كثيرة.</li></ul></div>`,
`
<div class="card"><h3>Où rencontre-t-on vraiment les suites ?</h3>
<ul>
<li><b>Épargne et intérêts composés :</b> ${M('100 000')} DA placés à ${M('5 %')} par an deviennent, après ${M('n')} ans, ${M(`C<sub>n</sub> = 100 000 × 1,05<sup>n</sup>`)} : une suite géométrique de raison ${M('1,05')}. Après ${M('10')} ans : environ ${M('162 889')} DA. Les intérêts simples (la même somme ajoutée chaque année) donnent, eux, une suite arithmétique.</li>
<li><b>Médecine et pharmacie :</b> chaque heure, le corps élimine ${M('20 %')} d'un médicament présent dans le sang, et le patient reçoit ${M('2')} mg par heure : ${M(`${un1} = 0,8${un} + 2`)}. La méthode de la suite auxiliaire donne la limite ${M(`α = ${f('2','0,2')} = 10`)} mg : la quantité se stabilise à ${M('10')} mg, quelle que soit la première dose.</li>
<li><b>Biologie :</b> des bactéries se divisent toutes les ${M('20')} minutes : ${M(`N<sub>n</sub> = N<sub>0</sub> × 2<sup>n</sup>`)}. Après ${M('3')} heures (${M('9')} divisions), leur nombre est multiplié par ${M('2<sup>9</sup> = 512')}.</li>
<li><b>Physique — radioactivité :</b> tous les ${M('5730')} ans, la quantité de carbone ${M('14')} est divisée par ${M('2')} : une suite géométrique de raison ${M(h)}. C'est la base de la datation au carbone ${M('14')}, que tu étudies cette année en physique.</li>
<li><b>Vers la fonction exponentielle :</b> la suite géométrique est la « version pas à pas » de la fonction exponentielle : les mêmes phénomènes (décharge d'un condensateur, décroissance radioactive, croissance d'une population) s'étudient avec les suites quand on mesure étape par étape, et avec l'exponentielle quand on mesure en continu.</li>
<li><b>Informatique :</b> les algorithmes qui « répètent » un calcul (calculer ${M(un1)} à partir de ${M(un)} dans une boucle) sont des suites récurrentes ; c'est ainsi que les calculatrices obtiennent de nombreuses racines et limites.</li></ul></div>`),

/* -------------------------------------------------------- النواة الصلبة / L'essentiel */
noyau:B(`
<div class="card core"><h3>النواة الصلبة — ما يجب أن تحفظه</h3>
<div class="chip"><div class="lab">متتالية حسابية</div>${M(`${un1} = ${un} + r`)} · ${M(`${un} = ${U('p')} + (n − p)r`)} · ${M(`S = N × ${f('الأوّل + الأخير','2')}`)}</div>
<div class="chip"><div class="lab">متتالية هندسية</div>${M(`${un1} = q${un}`)} · ${M(`${un} = ${U('p')} × q<sup>n−p</sup>`)} · ${M(`S = الأوّل × ${f('1 − q<sup>N</sup>','1 − q')}`)}</div>
<div class="chip"><div class="lab">عدد الحدود</div>من ${M(U('p'))} إلى ${M(un)}: ${M('N = n − p + 1')} (من ${M(u0)} إلى ${M(un)}: ${M('n + 1')} حدّا)</div>
<div class="chip"><div class="lab">اتجاه التغيّر</div>إشارة ${M(`${un1} − ${un}`)}</div>
<div class="chip"><div class="lab">الاستدلال بالتراجع</div>التحقّق + الوراثة ← الخلاصة</div>
<div class="chip"><div class="lab">نهاية ${M('q<sup>n</sup>')}</div>${M('q > 1')} ← ${M('+∞')} · ${M('−1 < q < 1')} ← ${M('0')} · ${M('q ≤ −1')} ← لا نهاية</div>
<div class="chip"><div class="lab">التقارب الرتيب</div>متزايدة ومحدودة من الأعلى ← متقاربة · متناقصة ومحدودة من الأسفل ← متقاربة</div>
<div class="chip"><div class="lab">متجاورتان</div>${M('(u<sub>n</sub>)')} ↗ ، ${M('(v<sub>n</sub>)')} ↘ ، ${M(`${vn} − ${un} → 0`)} ← نفس النهاية</div>
<div class="chip"><div class="lab">المتتالية المساعدة</div>${M(`${un1} = a${un} + b`)}: ${M(`α = ${f('b','1 − a')}`)} و ${M(`${vn} = ${un} − α`)} هندسية أساسها ${M('a')}</div>
<div class="chip"><div class="lab">النقطة الثابتة</div>${M(`${un1} = f(${un})`)} و ${M('f')} مستمرّة و ${M(`${un} → ℓ`)} ← ${M('f(ℓ) = ℓ')}</div></div>`,
`
<div class="card core"><h3>L'essentiel — ce qu'il faut retenir</h3>
<div class="chip"><div class="lab">Suite arithmétique</div>${M(`${un1} = ${un} + r`)} · ${M(`${un} = ${U('p')} + (n − p)r`)} · ${M(`S = N × ${f('premier + dernier','2')}`)}</div>
<div class="chip"><div class="lab">Suite géométrique</div>${M(`${un1} = q${un}`)} · ${M(`${un} = ${U('p')} × q<sup>n−p</sup>`)} · ${M(`S = premier × ${f('1 − q<sup>N</sup>','1 − q')}`)}</div>
<div class="chip"><div class="lab">Nombre de termes</div>de ${M(U('p'))} à ${M(un)} : ${M('N = n − p + 1')} (de ${M(u0)} à ${M(un)} : ${M('n + 1')} termes)</div>
<div class="chip"><div class="lab">Sens de variation</div>signe de ${M(`${un1} − ${un}`)}</div>
<div class="chip"><div class="lab">Récurrence</div>initialisation + hérédité → conclusion</div>
<div class="chip"><div class="lab">Limite de ${M('q<sup>n</sup>')}</div>${M('q > 1')} → ${M('+∞')} · ${M('−1 < q < 1')} → ${M('0')} · ${M('q ≤ −1')} → pas de limite</div>
<div class="chip"><div class="lab">Convergence monotone</div>croissante et majorée → converge · décroissante et minorée → converge</div>
<div class="chip"><div class="lab">Adjacentes</div>${M('(u<sub>n</sub>)')} ↗, ${M('(v<sub>n</sub>)')} ↘, ${M(`${vn} − ${un} → 0`)} → même limite</div>
<div class="chip"><div class="lab">Suite auxiliaire</div>${M(`${un1} = a${un} + b`)} : ${M(`α = ${f('b','1 − a')}`)} et ${M(`${vn} = ${un} − α`)} géométrique de raison ${M('a')}</div>
<div class="chip"><div class="lab">Point fixe</div>${M(`${un1} = f(${un})`)}, ${M('f')} continue et ${M(`${un} → ℓ`)} → ${M('f(ℓ) = ℓ')}</div></div>`),

/* Lexique : affiché tel quel dans les deux langues */
gloss:[['متتالية عددية','suite numérique'],['الحدّ العام','terme général'],['الحدّ الأوّل','premier terme'],['الرتبة','le rang'],
  ['علاقة تراجعية','relation de récurrence'],['متتالية حسابية','suite arithmétique'],['متتالية هندسية','suite géométrique'],['الأساس','la raison'],
  ['متزايدة تماما','strictement croissante'],['متناقصة تماما','strictement décroissante'],['رتيبة','monotone'],['محدودة من الأعلى','majorée'],
  ['محدودة من الأسفل','minorée'],['محدودة','bornée'],['متقاربة','convergente'],['متباعدة','divergente'],['النهاية','la limite'],
  ['الاستدلال بالتراجع','raisonnement par récurrence'],['التحقّق','initialisation'],['الوراثة','hérédité'],
  ['متتاليتان متجاورتان','suites adjacentes'],['متتالية مساعدة','suite auxiliaire'],['مجموع حدود متتابعة','somme de termes consécutifs']],

/* ----------------------------------------------------- التفكير الصحيح / Bien raisonner */
methode:B(`
<div class="card"><h3>كيف تعالج تمرين متتاليات في البكالوريا؟</h3>
<p>أغلب التمارين تدور حول متتالية تراجعية ${M(`${un1} = f(${un})`)}، والأسئلة تأتي دائما تقريبا بهذا الترتيب:</p>
<ol class="steps">
<li><b>احسب أوّل الحدود</b> (${M(U(1))}، ${M(U(2))}) واحتفظ بالكسور. هذه الحدود تعطيك فكرة عن السلوك (تزايد؟ تقارب؟) وتسمح لك بالتحقّق لاحقا.</li>
<li><b>برهن حصرا بالتراجع</b> (مثل ${M(`${un} < 6`)} أو ${M(`0 ≤ ${un} ≤ 4`)}). في الوراثة: انطلق من فرضية التراجع وطبّق عليها العمليات نفسها التي في العلاقة التراجعية، بالترتيب.</li>
<li><b>ادرس اتجاه التغيّر:</b> احسب ${M(`${un1} − ${un}`)} وحلّله، ثمّ استعمل الحصر السابق لمعرفة إشارته.</li>
<li><b>استنتج التقارب:</b> «متزايدة ومحدودة من الأعلى، إذن متقاربة» — جملة واحدة تكفي.</li>
<li><b>المتتالية المساعدة:</b> لإثبات أنّ ${M('(v<sub>n</sub>)')} هندسية، اكتب ${M(vn1)}، عوّض ${M(un1)} بعبارتها، ثمّ أخرج الأساس عاملا مشتركا حتى تصل إلى ${M(`${vn1} = q × ${vn}`)}.</li>
<li><b>اكتب ${M(vn)} ثمّ ${M(un)} بدلالة ${M('n')}</b>، واحسب النهاية بنهاية ${M('q<sup>n</sup>')}. وإن طُلب مجموع، فاحسب عدد الحدود أوّلا.</li></ol></div>
<div class="card"><h3>المطبّات</h3>
<div class="warn"><b>المطبّ 1 — عدد الحدود:</b> من ${M(u0)} إلى ${M(un)} يوجد ${M('n + 1')} حدّا، وليس ${M('n')}. هذا الخطأ وحده يُضيّع نقاط سؤال المجموع.</div>
<div class="warn"><b>المطبّ 2:</b> ${M(un1)} ليس ${M(`${un} + 1`)}، و ${M(`${U('2n')}`)} ليس ${M(`2${un}`)}.</div>
<div class="warn"><b>المطبّ 3 — إثبات أنّ متتالية هندسية:</b> حساب ${M(f(U(1),u0))} و ${M(f(U(2),U(1)))} لا يكفي (ذلك يُثبت فقط أنّها <b>ليست</b> هندسية إن اختلفا). يجب إثبات ${M(`${vn1} = q × ${vn}`)} من أجل كلّ ${M('n')} مع ${M('q')} ثابت لا يتعلّق بـ ${M('n')}.</div>
<div class="warn"><b>المطبّ 4:</b> «متزايدة ومحدودة من الأعلى بـ ${M('6')}» تعني أنّها متقاربة، <b>لا</b> أنّ نهايتها ${M('6')}. النهاية تُحسب بعد ذلك.</div>
<div class="warn"><b>المطبّ 5:</b> نسيان التحقّق في الاستدلال بالتراجع، أو عدم استعمال فرضية التراجع في الوراثة: عندها لا يكون البرهان استدلالا بالتراجع.</div>
<div class="warn"><b>المطبّ 6:</b> ${M('(−2)<sup>n</sup>')} ليست لها نهاية، و ${M('q<sup>n</sup> → 0')} فقط إذا كان ${M('−1 < q < 1')}. لا تكتب ${M('q<sup>n</sup> → +∞')} قبل التحقّق من أنّ ${M('q > 1')}.</div>
<div class="warn"><b>المطبّ 7:</b> عند ضرب متباينة في عدد سالب ينعكس اتجاهها، وهذا يتكرّر في الوراثة حين يكون ${M('a < 0')}.</div></div>`,
`
<div class="card"><h3>Comment traiter un exercice de suites au BAC ?</h3>
<p>La plupart des exercices portent sur une suite récurrente ${M(`${un1} = f(${un})`)}, et les questions arrivent presque toujours dans cet ordre :</p>
<ol class="steps">
<li><b>Calcule les premiers termes</b> (${M(U(1))}, ${M(U(2))}) en gardant les fractions. Ils donnent une idée du comportement (croissance ? convergence ?) et permettent de vérifier la suite.</li>
<li><b>Démontre un encadrement par récurrence</b> (comme ${M(`${un} < 6`)} ou ${M(`0 ≤ ${un} ≤ 4`)}). Dans l'hérédité : pars de l'hypothèse de récurrence et applique-lui, dans l'ordre, les mêmes opérations que la relation de récurrence.</li>
<li><b>Étudie le sens de variation :</b> calcule ${M(`${un1} − ${un}`)}, factorise, puis utilise l'encadrement pour connaître son signe.</li>
<li><b>Déduis la convergence :</b> « croissante et majorée, donc convergente » — une phrase suffit.</li>
<li><b>Suite auxiliaire :</b> pour montrer que ${M('(v<sub>n</sub>)')} est géométrique, écris ${M(vn1)}, remplace ${M(un1)} par son expression, puis factorise par la raison jusqu'à obtenir ${M(`${vn1} = q × ${vn}`)}.</li>
<li><b>Exprime ${M(vn)} puis ${M(un)} en fonction de ${M('n')}</b>, et calcule la limite grâce à celle de ${M('q<sup>n</sup>')}. Pour une somme, compte d'abord le nombre de termes.</li></ol></div>
<div class="card"><h3>Les pièges</h3>
<div class="warn"><b>Piège 1 — le nombre de termes :</b> de ${M(u0)} à ${M(un)} il y a ${M('n + 1')} termes, pas ${M('n')}. Cette seule erreur fait perdre les points de la question sur la somme.</div>
<div class="warn"><b>Piège 2 :</b> ${M(un1)} n'est pas ${M(`${un} + 1`)}, et ${M(U('2n'))} n'est pas ${M(`2${un}`)}.</div>
<div class="warn"><b>Piège 3 — montrer qu'une suite est géométrique :</b> calculer ${M(f(U(1),u0))} et ${M(f(U(2),U(1)))} ne suffit pas (cela prouve seulement qu'elle n'est <b>pas</b> géométrique s'ils diffèrent). Il faut prouver ${M(`${vn1} = q × ${vn}`)} pour tout ${M('n')}, avec ${M('q')} constant, indépendant de ${M('n')}.</div>
<div class="warn"><b>Piège 4 :</b> « croissante et majorée par ${M('6')} » signifie qu'elle converge, <b>pas</b> que sa limite vaut ${M('6')}. La limite se calcule ensuite.</div>
<div class="warn"><b>Piège 5 :</b> oublier l'initialisation, ou ne pas utiliser l'hypothèse de récurrence dans l'hérédité : ce n'est alors plus un raisonnement par récurrence.</div>
<div class="warn"><b>Piège 6 :</b> ${M('(−2)<sup>n</sup>')} n'a pas de limite, et ${M('q<sup>n</sup> → 0')} seulement si ${M('−1 < q < 1')}. N'écris pas ${M('q<sup>n</sup> → +∞')} sans avoir vérifié que ${M('q > 1')}.</div>
<div class="warn"><b>Piège 7 :</b> multiplier une inégalité par un nombre négatif change son sens — cela arrive dans l'hérédité quand ${M('a < 0')}.</div></div>`)
});
})();
