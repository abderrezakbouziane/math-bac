/* ============================================================================
   الباب 1 — النهايات والاستمرارية / Chapitre 1 — Limites et continuité
   Contenu rédigé : cours, analogies, dans la vie, l'essentiel, bien raisonner.
   Les exercices générés, l'exercice type BAC et le laboratoire sont dans ch-limites-ex.js.
   ============================================================================ */
(function(){
const LX=v=>`lim<sub>x→${v}</sub> `;
const LS=(a,s)=>`lim<sub>x→${a}, x${s}${a}</sub> `;          /* limite à droite (s='&gt;') ou à gauche (s='&lt;') */
const P2='<sup>2</sup>', P3='<sup>3</sup>';
const Cf='(C<sub>f</sub>)';

Object.assign(CH(1),{
soon:false,
hook:B(
`ماذا يحدث للدالة «في أقصى اليمين» أو بالقرب من قيمة ممنوعة؟ النهايات تجيب عن هذا السؤال، فترسم لك الشكل العامّ للمنحنى قبل أن ترسمه. أمّا الاستمرارية فتضمن أنّ المنحنى «لا يقفز»، وهذا ما يسمح بإثبات وجود حلّ لمعادلة لا نعرف حلّها. هذا الباب هو أساس كلّ مسائل الدوال في البكالوريا.`,
`Que fait une fonction « tout au bout » de l'axe, ou près d'une valeur interdite ? Les limites répondent à cette question et te donnent l'allure de la courbe avant même de la tracer. La continuité garantit que la courbe « ne saute pas », ce qui permet de prouver qu'une équation a une solution sans savoir la calculer. Ce chapitre est la base de tous les problèmes de fonctions au BAC.`),

/* ------------------------------------------------------------------ الدرس / Cours */
cours:B(`
<div class="card"><h3>١) النهاية عند ${M('+∞')} أو عند ${M('−∞')}</h3>
<div class="rule">نكتب ${M(`${LX('+∞')}f(x) = +∞`)} إذا أصبحت ${M('f(x)')} أكبر من أيّ عدد نختاره عندما يكون ${M('x')} كبيرا بالقدر الكافي.<br>
ونكتب ${M(`${LX('+∞')}f(x) = ℓ`)} (حيث ${M('ℓ')} عدد حقيقي) إذا أصبحت ${M('f(x)')} قريبة من ${M('ℓ')} بالقدر الذي نريد عندما يكون ${M('x')} كبيرا بالقدر الكافي. نقول عندئذ إنّ المستقيم ذا المعادلة ${M('y = ℓ')} <b>مستقيم مقارب أفقي</b> للمنحنى ${M(Cf)} بجوار ${M('+∞')}. والتعاريف مماثلة بجوار ${M('−∞')}.</div>
<div class="rule"><b>نهايات مرجعية:</b><br>
• بجوار ${M('+∞')}: الدوال ${M('x')} ، ${M(`x${P2}`)} ، ${M(`x${P3}`)} ، ${M('√x')} تؤول إلى ${M('+∞')}، والدوال ${M(f('1','x'))} ، ${M(f('1',`x${P2}`))} ، ${M(f('1','√x'))} تؤول إلى ${M('0')}.<br>
• بجوار ${M('−∞')}: ${M(`x<sup>n</sup>`)} يؤول إلى ${M('+∞')} إذا كان ${M('n')} زوجيا، وإلى ${M('−∞')} إذا كان ${M('n')} فرديا، و ${M(f('1',`x<sup>n</sup>`))} يؤول إلى ${M('0')}.</div>
<div class="ex"><b>مثال:</b> ${M(`f(x) = 2 + ${f('1','x')}`)}. بما أنّ ${M(`${LX('+∞')}${f('1','x')} = 0`)} فإنّ ${M(`${LX('+∞')}f(x) = 2`)}: المستقيم ${M('y = 2')} مقارب أفقي للمنحنى ${M(Cf)} بجوار ${M('+∞')}.</div></div>

<div class="card"><h3>٢) النهاية غير المنتهية عند عدد حقيقي — المستقيم المقارب العمودي</h3>
<div class="rule">إذا أصبحت ${M('f(x)')} كبيرة (أو صغيرة) بالقدر الذي نريد عندما يقترب ${M('x')} من العدد ${M('a')}، نكتب ${M(`${LX('a')}f(x) = +∞`)} (أو ${M('−∞')})، ونقول إنّ المستقيم ذا المعادلة ${M('x = a')} <b>مستقيم مقارب عمودي</b> للمنحنى ${M(Cf)}. وكثيرا ما نميّز بين النهاية <b>على اليمين</b> (${M('x > a')}) والنهاية <b>على اليسار</b> (${M('x < a')}).</div>
<div class="rule"><b>مرجع:</b> ${M(`${LS('0','&gt;')}${f('1','x')} = +∞`)} و ${M(`${LS('0','&lt;')}${f('1','x')} = −∞`)} و ${M(`${LX('0')}${f('1',`x${P2}`)} = +∞`)}.</div>
<div class="rule"><b>قاعدة «${M(f('k','0'))}»:</b> إذا آل البسط إلى عدد ${M('k ≠ 0')} وآل المقام إلى ${M('0')} محافظا على إشارة ثابتة، فإنّ حاصل القسمة يؤول إلى ${M('+∞')} أو ${M('−∞')}، والإشارة تُعطى بقاعدة الإشارات.</div>
<div class="ex"><b>مثال:</b> ${M(`f(x) = ${f('x + 1','x − 2')}`)}. عندما يؤول ${M('x')} إلى ${M('2')}: البسط يؤول إلى ${M('3 > 0')} والمقام إلى ${M('0')}.<br>
• إذا كان ${M('x > 2')} فإنّ ${M('x − 2 > 0')}، ومنه ${M(`${LS('2','&gt;')}f(x) = +∞`)}.<br>
• إذا كان ${M('x < 2')} فإنّ ${M('x − 2 < 0')}، ومنه ${M(`${LS('2','&lt;')}f(x) = −∞`)}.<br>
إذن المستقيم ${M('x = 2')} مقارب عمودي للمنحنى ${M(Cf)}.</div></div>

<div class="card"><h3>٣) العمليات على النهايات — حالات عدم التعيين</h3>
<p>أغلب النتائج «بديهية»: ${M('ℓ + ∞ = +∞')} ، ${M('(+∞) + (+∞) = +∞')} ، ${M('ℓ × (+∞) = ±∞')} حسب إشارة ${M('ℓ ≠ 0')} ، ${M(`${f('ℓ','∞')} = 0`)} ، ${M(`${f('k','0')} = ±∞`)} …</p>
<div class="rule"><b>حالات عدم التعيين الأربع:</b> ${M('+∞ − ∞')} ، ${M('0 × ∞')} ، ${M(f('∞','∞'))} ، ${M(f('0','0'))}.<br>
في هذه الحالات لا يمكن الاستنتاج مباشرة: يجب <b>تحويل كتابة</b> العبارة.</div>
<p><b>ثلاث طرق لإزالة عدم التعيين:</b></p>
<ol class="steps">
<li><b>كثير حدود أو دالة ناطقة بجوار ${M('±∞')}:</b> نُخرج الحدّ الأعلى درجة عاملا مشتركا. والنتيجة: نهاية كثير حدود هي نهاية حدّه الأعلى درجة، ونهاية دالة ناطقة هي نهاية حاصل قسمة الحدّين الأعلى درجة.<br>
${M(`${LX('+∞')}(x${P3} − 5x${P2}) = ${LX('+∞')}x${P3} = +∞`)} لأنّ ${M(`x${P3} − 5x${P2} = x${P3}(1 − ${f('5','x')})`)}.<br>
${M(`${LX('−∞')}${f(`3x${P2} + 1`,`2x${P2} − x`)} = ${LX('−∞')}${f(`3x${P2}`,`2x${P2}`)} = ${f('3','2')}`)}.</li>
<li><b>الحالة ${M(f('0','0'))} عند عدد ${M('a')}:</b> نحلّل البسط والمقام ونختزل العامل ${M('(x − a)')}.<br>
${M(`${LX('3')}${f(`x${P2} − 9`,'x − 3')} = ${LX('3')}${f('(x − 3)(x + 3)','x − 3')} = ${LX('3')}(x + 3) = 6`)}.</li>
<li><b>عبارات فيها جذور:</b> نضرب في <b>المرافق</b> ونستعمل ${M(`(√A − √B)(√A + √B) = A − B`)}.<br>
${M(`${LX('+∞')}(√(x + 1) − √x) = ${LX('+∞')}${f('1','√(x + 1) + √x')} = 0`)}.</li></ol></div>

<div class="card"><h3>٤) نهاية دالة مركّبة</h3>
<div class="rule">إذا كان ${M(`${LX('a')}u(x) = b`)} و ${M(`lim<sub>X→b</sub> g(X) = c`)}، فإنّ ${M(`${LX('a')}g(u(x)) = c`)}. (الأعداد ${M('a')} ، ${M('b')} ، ${M('c')} حقيقية أو ${M('±∞')}.)</div>
<div class="ex"><b>مثال:</b> ${M(`f(x) = √(${f('4x + 1','x + 2')})`)}. لدينا ${M(`${LX('+∞')}${f('4x + 1','x + 2')} = 4`)} و ${M(`lim<sub>X→4</sub> √X = 2`)}، إذن ${M(`${LX('+∞')}f(x) = 2`)}.</div></div>

<div class="card"><h3>٥) النهايات بالمقارنة</h3>
<div class="rule"><b>المقارنة:</b> إذا كان ${M('f(x) ≥ g(x)')} من أجل ${M('x')} كبير بالقدر الكافي و ${M(`${LX('+∞')}g(x) = +∞`)}، فإنّ ${M(`${LX('+∞')}f(x) = +∞`)}. وإذا كان ${M('f(x) ≤ g(x)')} و ${M(`${LX('+∞')}g(x) = −∞`)} فإنّ ${M(`${LX('+∞')}f(x) = −∞`)}.</div>
<div class="rule"><b>مبرهنة الحصر:</b> إذا كان ${M('g(x) ≤ f(x) ≤ h(x)')} من أجل ${M('x')} كبير بالقدر الكافي، وكانت ${M('g')} و ${M('h')} تؤولان إلى نفس العدد ${M('ℓ')}، فإنّ ${M(`${LX('+∞')}f(x) = ℓ`)}. (والنتائج مماثلة بجوار ${M('−∞')} أو عند عدد ${M('a')}.)</div>
<div class="ex"><b>مثال:</b> من أجل ${M('x > 0')}: ${M(`−1 ≤ sin x ≤ 1`)}، إذن ${M(`−${f('1','x')} ≤ ${f('sin x','x')} ≤ ${f('1','x')}`)}، والطرفان يؤولان إلى ${M('0')}: ${M(`${LX('+∞')}${f('sin x','x')} = 0`)}.<br>
وبما أنّ ${M('x + sin x ≥ x − 1')} و ${M(`${LX('+∞')}(x − 1) = +∞`)} فإنّ ${M(`${LX('+∞')}(x + sin x) = +∞`)}.</div></div>

<div class="card"><h3>٦) المستقيم المقارب المائل — الوضع النسبي</h3>
<div class="rule">المستقيم ${M('(Δ) : y = ax + b')} (حيث ${M('a ≠ 0')}) <b>مقارب مائل</b> للمنحنى ${M(Cf)} بجوار ${M('+∞')} إذا وفقط إذا كان ${M(`${LX('+∞')}[f(x) − (ax + b)] = 0`)}. (ونفس التعريف بجوار ${M('−∞')}.)</div>
<div class="ex"><b>مثال:</b> ${M(`f(x) = 2x − 1 + ${f('3','x + 1')}`)}. لدينا ${M(`f(x) − (2x − 1) = ${f('3','x + 1')}`)} وهذا يؤول إلى ${M('0')} بجوار ${M('+∞')} و ${M('−∞')}: المستقيم ${M('y = 2x − 1')} مقارب مائل للمنحنى ${M(Cf)}.</div>
<div class="rule"><b>الوضع النسبي:</b> ندرس إشارة الفرق ${M('f(x) − (ax + b)')}: إذا كان موجبا فإنّ ${M(Cf)} <b>فوق</b> ${M('(Δ)')}، وإذا كان سالبا فإنّ ${M(Cf)} <b>تحت</b> ${M('(Δ)')}.</div>
<div class="ex">في المثال: ${M(`${f('3','x + 1')} > 0`)} إذا كان ${M('x > −1')}، فالمنحنى فوق ${M('(Δ)')} على ${M(']−1 ; +∞[')}، وتحته على ${M(']−∞ ; −1[')}.</div>
<p>وإذا كانت ${M('f')} حاصل قسمة كثير حدود من الدرجة ${M('2')} على كثير حدود من الدرجة ${M('1')}، فإنّ القسمة الإقليدية تعطي كتابة من الشكل ${M(`ax + b + ${f('c','x − d')}`)}.</p></div>

<div class="card"><h3>٧) الاستمرارية</h3>
<div class="rule"><b>تعريف:</b> ${M('f')} دالة معرّفة على مجال ${M('I')} يشمل العدد ${M('a')}. نقول إنّ ${M('f')} <b>مستمرّة عند</b> ${M('a')} إذا كان ${M(`${LX('a')}f(x) = f(a)`)}، و<b>مستمرّة على</b> ${M('I')} إذا كانت مستمرّة عند كلّ عدد من ${M('I')}. بيانيا: نرسم المنحنى دون رفع القلم.</div>
<div class="rule"><b>دوال مستمرّة:</b> كثيرات الحدود مستمرّة على ${M('ℝ')}. الدوال الناطقة، ${M('x ↦ √x')} ، ${M('x ↦ |x|')} ، ${M('sin')} و ${M('cos')} مستمرّة على كلّ مجال من مجموعة تعريفها. ومجموع أو جداء أو حاصل قسمة أو مركّب دوال مستمرّة دالة مستمرّة (حيث تكون معرّفة).</div>
<div class="ex"><b>مثال (دالة معرّفة بقطع):</b> ${M(`f(x) = x${P2}`)} إذا كان ${M('x < 1')} ، و ${M('f(x) = 2x − 1')} إذا كان ${M('x ≥ 1')}.<br>
${M(`${LS('1','&lt;')}f(x) = 1`)} و ${M('f(1) = 2 × 1 − 1 = 1')}: إذن ${M('f')} مستمرّة عند ${M('1')}.</div>
<div class="warn"><b>دالة غير مستمرّة:</b> دالة الجزء الصحيح ${M('E')} (${M('E(x)')} هو أكبر عدد صحيح أصغر من أو يساوي ${M('x')}) غير مستمرّة عند كلّ عدد صحيح: ${M(`${LS('1','&lt;')}E(x) = 0`)} بينما ${M('E(1) = 1')}.</div></div>

<div class="card"><h3>٨) مبرهنة القيم المتوسطة</h3>
<div class="rule"><b>المبرهنة:</b> إذا كانت ${M('f')} مستمرّة على المجال ${M('[a ; b]')}، فمن أجل كلّ عدد حقيقي ${M('k')} محصور بين ${M('f(a)')} و ${M('f(b)')}، المعادلة ${M('f(x) = k')} تقبل <b>حلّا على الأقلّ</b> في ${M('[a ; b]')}.</div>
<div class="rule"><b>حالة خاصة (الأكثر استعمالا):</b> إذا كانت ${M('f')} مستمرّة و<b>رتيبة تماما</b> على ${M('[a ; b]')} و ${M('f(a) × f(b) < 0')}، فإنّ المعادلة ${M('f(x) = 0')} تقبل <b>حلّا وحيدا</b> ${M('α')} في ${M(']a ; b[')}.</div>
<p><b>اصطلاح:</b> في جدول التغيّرات، يعني السهم المائل أنّ الدالة مستمرّة ورتيبة تماما على المجال الموافق.</p>
<div class="ex"><b>مثال:</b> ${M(`f(x) = x${P3} + x − 1`)}. الدالة ${M('f')} مستمرّة ومتزايدة تماما على ${M('ℝ')} (مجموع الدالتين المتزايدتين تماما ${M(`x ↦ x${P3}`)} و ${M('x ↦ x − 1')}).<br>
${M('f(0) = −1 < 0')} و ${M('f(1) = 1 > 0')}: المعادلة ${M('f(x) = 0')} تقبل حلّا وحيدا ${M('α')} في ${M(']0 ; 1[')}.<br>
<b>حصر بالسعة ${M('0,1')}:</b> ${M('f(0,6) = −0,184 < 0')} و ${M('f(0,7) = 0,043 > 0')}، إذن ${M('0,6 < α < 0,7')}.</div>
<p>لحصر ${M('α')} نستعمل طريقة <b>المسح</b> (نحسب الصور بخطوة ${M('0,1')} ثمّ ${M('0,01')}) أو طريقة <b>التنصيف</b> (نقسم المجال إلى نصفين في كلّ مرّة). جرّبها في تبويب «جرّب بنفسك».</p></div>`,

`
<div class="card"><h3>1) Limite en ${M('+∞')} ou en ${M('−∞')}</h3>
<div class="rule">On écrit ${M(`${LX('+∞')}f(x) = +∞`)} si ${M('f(x)')} devient plus grand que n'importe quel nombre choisi dès que ${M('x')} est assez grand.<br>
On écrit ${M(`${LX('+∞')}f(x) = ℓ`)} (${M('ℓ')} réel) si ${M('f(x)')} devient aussi proche de ${M('ℓ')} qu'on le veut dès que ${M('x')} est assez grand. On dit alors que la droite d'équation ${M('y = ℓ')} est <b>asymptote horizontale</b> à ${M(Cf)} en ${M('+∞')}. Les définitions sont analogues en ${M('−∞')}.</div>
<div class="rule"><b>Limites de référence :</b><br>
• en ${M('+∞')} : les fonctions ${M('x')}, ${M(`x${P2}`)}, ${M(`x${P3}`)}, ${M('√x')} tendent vers ${M('+∞')} ; les fonctions ${M(f('1','x'))}, ${M(f('1',`x${P2}`))}, ${M(f('1','√x'))} tendent vers ${M('0')}.<br>
• en ${M('−∞')} : ${M('x<sup>n</sup>')} tend vers ${M('+∞')} si ${M('n')} est pair et vers ${M('−∞')} si ${M('n')} est impair ; ${M(f('1','x<sup>n</sup>'))} tend vers ${M('0')}.</div>
<div class="ex"><b>Exemple :</b> ${M(`f(x) = 2 + ${f('1','x')}`)}. Comme ${M(`${LX('+∞')}${f('1','x')} = 0`)}, on a ${M(`${LX('+∞')}f(x) = 2`)} : la droite ${M('y = 2')} est asymptote horizontale à ${M(Cf)} en ${M('+∞')}.</div></div>

<div class="card"><h3>2) Limite infinie en un réel — asymptote verticale</h3>
<div class="rule">Si ${M('f(x)')} devient aussi grand (ou aussi petit) qu'on veut quand ${M('x')} s'approche du réel ${M('a')}, on écrit ${M(`${LX('a')}f(x) = +∞`)} (ou ${M('−∞')}) et on dit que la droite d'équation ${M('x = a')} est <b>asymptote verticale</b> à ${M(Cf)}. On distingue souvent la limite <b>à droite</b> (${M('x > a')}) et la limite <b>à gauche</b> (${M('x < a')}).</div>
<div class="rule"><b>Référence :</b> ${M(`${LS('0','&gt;')}${f('1','x')} = +∞`)}, ${M(`${LS('0','&lt;')}${f('1','x')} = −∞`)} et ${M(`${LX('0')}${f('1',`x${P2}`)} = +∞`)}.</div>
<div class="rule"><b>Règle « ${M(f('k','0'))} » :</b> si le numérateur tend vers un réel ${M('k ≠ 0')} et le dénominateur vers ${M('0')} en gardant un signe constant, le quotient tend vers ${M('+∞')} ou ${M('−∞')} ; le signe est donné par la règle des signes.</div>
<div class="ex"><b>Exemple :</b> ${M(`f(x) = ${f('x + 1','x − 2')}`)}. Quand ${M('x')} tend vers ${M('2')}, le numérateur tend vers ${M('3 > 0')} et le dénominateur vers ${M('0')}.<br>
• Si ${M('x > 2')}, alors ${M('x − 2 > 0')}, donc ${M(`${LS('2','&gt;')}f(x) = +∞`)}.<br>
• Si ${M('x < 2')}, alors ${M('x − 2 < 0')}, donc ${M(`${LS('2','&lt;')}f(x) = −∞`)}.<br>
La droite ${M('x = 2')} est donc asymptote verticale à ${M(Cf)}.</div></div>

<div class="card"><h3>3) Opérations sur les limites — formes indéterminées</h3>
<p>La plupart des résultats sont « intuitifs » : ${M('ℓ + ∞ = +∞')}, ${M('(+∞) + (+∞) = +∞')}, ${M('ℓ × (+∞) = ±∞')} selon le signe de ${M('ℓ ≠ 0')}, ${M(`${f('ℓ','∞')} = 0`)}, ${M(`${f('k','0')} = ±∞`)}…</p>
<div class="rule"><b>Les quatre formes indéterminées :</b> ${M('+∞ − ∞')}, ${M('0 × ∞')}, ${M(f('∞','∞'))}, ${M(f('0','0'))}.<br>
Dans ces cas, on ne peut pas conclure directement : il faut <b>transformer l'écriture</b> de l'expression.</div>
<p><b>Trois méthodes pour lever l'indétermination :</b></p>
<ol class="steps">
<li><b>Polynôme ou fonction rationnelle en ${M('±∞')} :</b> on factorise par le terme de plus haut degré. Résultat : un polynôme a la même limite que son terme de plus haut degré, une fonction rationnelle la même limite que le quotient de ses termes de plus haut degré.<br>
${M(`${LX('+∞')}(x${P3} − 5x${P2}) = ${LX('+∞')}x${P3} = +∞`)} car ${M(`x${P3} − 5x${P2} = x${P3}(1 − ${f('5','x')})`)}.<br>
${M(`${LX('−∞')}${f(`3x${P2} + 1`,`2x${P2} − x`)} = ${LX('−∞')}${f(`3x${P2}`,`2x${P2}`)} = ${f('3','2')}`)}.</li>
<li><b>Forme ${M(f('0','0'))} en un réel ${M('a')} :</b> on factorise numérateur et dénominateur et on simplifie par ${M('(x − a)')}.<br>
${M(`${LX('3')}${f(`x${P2} − 9`,'x − 3')} = ${LX('3')}${f('(x − 3)(x + 3)','x − 3')} = ${LX('3')}(x + 3) = 6`)}.</li>
<li><b>Expressions avec des racines :</b> on multiplie par l'<b>expression conjuguée</b> et on utilise ${M('(√A − √B)(√A + √B) = A − B')}.<br>
${M(`${LX('+∞')}(√(x + 1) − √x) = ${LX('+∞')}${f('1','√(x + 1) + √x')} = 0`)}.</li></ol></div>

<div class="card"><h3>4) Limite d'une fonction composée</h3>
<div class="rule">Si ${M(`${LX('a')}u(x) = b`)} et ${M('lim<sub>X→b</sub> g(X) = c')}, alors ${M(`${LX('a')}g(u(x)) = c`)}. (${M('a')}, ${M('b')}, ${M('c')} sont des réels ou ${M('±∞')}.)</div>
<div class="ex"><b>Exemple :</b> ${M(`f(x) = √(${f('4x + 1','x + 2')})`)}. On a ${M(`${LX('+∞')}${f('4x + 1','x + 2')} = 4`)} et ${M('lim<sub>X→4</sub> √X = 2')}, donc ${M(`${LX('+∞')}f(x) = 2`)}.</div></div>

<div class="card"><h3>5) Limites par comparaison</h3>
<div class="rule"><b>Comparaison :</b> si ${M('f(x) ≥ g(x)')} pour ${M('x')} assez grand et ${M(`${LX('+∞')}g(x) = +∞`)}, alors ${M(`${LX('+∞')}f(x) = +∞`)}. Si ${M('f(x) ≤ g(x)')} et ${M(`${LX('+∞')}g(x) = −∞`)}, alors ${M(`${LX('+∞')}f(x) = −∞`)}.</div>
<div class="rule"><b>Théorème des gendarmes :</b> si ${M('g(x) ≤ f(x) ≤ h(x)')} pour ${M('x')} assez grand, et si ${M('g')} et ${M('h')} tendent vers le même réel ${M('ℓ')}, alors ${M(`${LX('+∞')}f(x) = ℓ`)}. (Résultats analogues en ${M('−∞')} ou en un réel ${M('a')}.)</div>
<div class="ex"><b>Exemple :</b> pour ${M('x > 0')}, ${M('−1 ≤ sin x ≤ 1')}, donc ${M(`−${f('1','x')} ≤ ${f('sin x','x')} ≤ ${f('1','x')}`)}, et les deux bornes tendent vers ${M('0')} : ${M(`${LX('+∞')}${f('sin x','x')} = 0`)}.<br>
Comme ${M('x + sin x ≥ x − 1')} et ${M(`${LX('+∞')}(x − 1) = +∞`)}, on a ${M(`${LX('+∞')}(x + sin x) = +∞`)}.</div></div>

<div class="card"><h3>6) Asymptote oblique — position relative</h3>
<div class="rule">La droite ${M('(Δ) : y = ax + b')} (${M('a ≠ 0')}) est <b>asymptote oblique</b> à ${M(Cf)} en ${M('+∞')} si et seulement si ${M(`${LX('+∞')}[f(x) − (ax + b)] = 0`)}. (Même définition en ${M('−∞')}.)</div>
<div class="ex"><b>Exemple :</b> ${M(`f(x) = 2x − 1 + ${f('3','x + 1')}`)}. On a ${M(`f(x) − (2x − 1) = ${f('3','x + 1')}`)}, qui tend vers ${M('0')} en ${M('+∞')} et en ${M('−∞')} : la droite ${M('y = 2x − 1')} est asymptote oblique à ${M(Cf)}.</div>
<div class="rule"><b>Position relative :</b> on étudie le signe de la différence ${M('f(x) − (ax + b)')} : si elle est positive, ${M(Cf)} est <b>au-dessus</b> de ${M('(Δ)')} ; si elle est négative, ${M(Cf)} est <b>au-dessous</b>.</div>
<div class="ex">Dans l'exemple : ${M(`${f('3','x + 1')} > 0`)} si ${M('x > −1')}, donc la courbe est au-dessus de ${M('(Δ)')} sur ${M(']−1 ; +∞[')} et au-dessous sur ${M(']−∞ ; −1[')}.</div>
<p>Si ${M('f')} est le quotient d'un polynôme de degré ${M('2')} par un polynôme de degré ${M('1')}, la division euclidienne donne une écriture de la forme ${M(`ax + b + ${f('c','x − d')}`)}.</p></div>

<div class="card"><h3>7) Continuité</h3>
<div class="rule"><b>Définition :</b> ${M('f')} est définie sur un intervalle ${M('I')} contenant ${M('a')}. On dit que ${M('f')} est <b>continue en</b> ${M('a')} si ${M(`${LX('a')}f(x) = f(a)`)}, et <b>continue sur</b> ${M('I')} si elle est continue en tout point de ${M('I')}. Graphiquement : on trace la courbe sans lever le crayon.</div>
<div class="rule"><b>Fonctions continues :</b> les polynômes sont continus sur ${M('ℝ')}. Les fonctions rationnelles, ${M('x ↦ √x')}, ${M('x ↦ |x|')}, ${M('sin')} et ${M('cos')} sont continues sur chaque intervalle de leur ensemble de définition. Somme, produit, quotient et composée de fonctions continues sont continus (là où ils sont définis).</div>
<div class="ex"><b>Exemple (fonction définie par morceaux) :</b> ${M(`f(x) = x${P2}`)} si ${M('x < 1')}, et ${M('f(x) = 2x − 1')} si ${M('x ≥ 1')}.<br>
${M(`${LS('1','&lt;')}f(x) = 1`)} et ${M('f(1) = 2 × 1 − 1 = 1')} : ${M('f')} est donc continue en ${M('1')}.</div>
<div class="warn"><b>Fonction non continue :</b> la fonction partie entière ${M('E')} (${M('E(x)')} est le plus grand entier inférieur ou égal à ${M('x')}) n'est continue en aucun entier : ${M(`${LS('1','&lt;')}E(x) = 0`)} alors que ${M('E(1) = 1')}.</div></div>

<div class="card"><h3>8) Théorème des valeurs intermédiaires</h3>
<div class="rule"><b>Théorème :</b> si ${M('f')} est continue sur l'intervalle ${M('[a ; b]')}, alors pour tout réel ${M('k')} compris entre ${M('f(a)')} et ${M('f(b)')}, l'équation ${M('f(x) = k')} admet <b>au moins une solution</b> dans ${M('[a ; b]')}.</div>
<div class="rule"><b>Cas particulier (le plus utilisé) :</b> si ${M('f')} est continue et <b>strictement monotone</b> sur ${M('[a ; b]')} et si ${M('f(a) × f(b) < 0')}, alors l'équation ${M('f(x) = 0')} admet une <b>unique solution</b> ${M('α')} dans ${M(']a ; b[')}.</div>
<p><b>Convention :</b> dans un tableau de variations, une flèche oblique signifie que la fonction est continue et strictement monotone sur l'intervalle correspondant.</p>
<div class="ex"><b>Exemple :</b> ${M(`f(x) = x${P3} + x − 1`)}. La fonction ${M('f')} est continue et strictement croissante sur ${M('ℝ')} (somme des fonctions strictement croissantes ${M(`x ↦ x${P3}`)} et ${M('x ↦ x − 1')}).<br>
${M('f(0) = −1 < 0')} et ${M('f(1) = 1 > 0')} : l'équation ${M('f(x) = 0')} admet une unique solution ${M('α')} dans ${M(']0 ; 1[')}.<br>
<b>Encadrement d'amplitude ${M('0,1')} :</b> ${M('f(0,6) = −0,184 < 0')} et ${M('f(0,7) = 0,043 > 0')}, donc ${M('0,6 < α < 0,7')}.</div>
<p>Pour encadrer ${M('α')}, on utilise le <b>balayage</b> (on calcule les images avec un pas de ${M('0,1')}, puis ${M('0,01')}) ou la <b>dichotomie</b> (on coupe l'intervalle en deux à chaque étape). Essaie-la dans l'onglet « Explorer ».</p></div>`),

/* ------------------------------------------------------------- تشبيهات / Analogies */
analogie:B(`
<div class="card"><h3>النهاية بجوار ${M('+∞')}: النظر إلى المنحنى من بعيد جدّا</h3>
<p>تخيّل أنّك تبتعد عن المنحنى بطائرة. التفاصيل الصغيرة (التموّجات، الحدود الصغيرة) تختفي، ولا يبقى إلّا «الشكل العامّ»: هل يصعد بلا حدود؟ هل يستقرّ على ارتفاع معيّن؟ النهاية هي ما تراه من الطائرة.</p></div>
<div class="card"><h3>الحدّ الأعلى درجة: الفيل والفأر</h3>
<p>في ${M(`x${P3} − 100x${P2}`)} يبدو الحدّ ${M(`100x${P2}`)} قويّا بسبب المعامل ${M('100')}. لكن من أجل ${M('x = 1000')}: ${M(`x${P3} = 10<sup>9</sup>`)} بينما ${M(`100x${P2} = 10<sup>8</sup>`)}، ومن أجل ${M(`x = 10<sup>6</sup>`)}: ${M(`10<sup>18</sup>`)} مقابل ${M(`10<sup>14</sup>`)}. الفيل (الحدّ الأعلى درجة) يسحق الفأر في النهاية مهما كان الفأر «مدرَّبا».</p></div>
<div class="card"><h3>حالات عدم التعيين: لعبة شدّ الحبل</h3>
<p>${M('+∞ − ∞')} فريقان قويّان بلا حدود يشدّان الحبل في اتجاهين متعاكسين: لا يمكنك معرفة الفائز دون أن تنظر عن قرب. ${M(`x${P2} − x`)} يؤول إلى ${M('+∞')}، و ${M(`x − x${P2}`)} إلى ${M('−∞')}، و ${M('(x + 1) − x')} إلى ${M('1')}. ثلاث نتائج مختلفة لنفس «الشكل» ${M('∞ − ∞')}: لهذا نسمّيها «غير معيّنة».</p></div>
<div class="card"><h3>القسمة على «شبه لا شيء»</h3>
<p>اقسم ${M('1')} على ${M('0,1')} ثمّ ${M('0,001')} ثمّ ${M('0,000001')}: تحصل على ${M('10')} ، ${M('1000')} ، ${M('1 000 000')}… كلّما صغر المقام كبر الناتج بلا حدود. وإذا كان المقام سالبا (${M('−0,001')}) يصبح الناتج سالبا كبيرا. لهذا ننظر دائما إلى <b>إشارة</b> المقام حين يؤول إلى ${M('0')}.</p></div>
<div class="card"><h3>المستقيم المقارب: الطريق الترابي بجانب الطريق السيّار</h3>
<p>طريق ترابي يقترب شيئا فشيئا من الطريق السيّار دون أن يندمج فيه: المسافة بينهما تصغر نحو الصفر. المستقيم المقارب المائل هو الطريق السيّار، والعبارة ${M('f(x) − (ax + b)')} هي المسافة العمودية بينهما: إذا آلت إلى ${M('0')} فالمستقيم مقارب.</p></div>
<div class="card"><h3>مبرهنة الحصر: الدركيّان</h3>
<p>دركيّان يرافقان شخصا، واحد عن يمينه وآخر عن يساره. إذا وصل الدركيّان إلى نفس المركز، فالشخص المحصور بينهما يصل حتما إلى المركز نفسه. هذا هو ${M('g(x) ≤ f(x) ≤ h(x)')} مع ${M('g')} و ${M('h')} تؤولان إلى نفس النهاية.</p></div>
<div class="card"><h3>الاستمرارية: جسر بلا ثقوب</h3>
<p>الدالة المستمرّة جسر تمشي عليه دون أن تقفز: ترسم المنحنى دون رفع القلم. أمّا دالة الجزء الصحيح فهي درج: عند كلّ عدد صحيح «قفزة» من درجة إلى أخرى.</p></div>
<div class="card"><h3>مبرهنة القيم المتوسطة: نزهة في الجبل</h3>
<p>تنطلق من ارتفاع ${M('200')} م وتصل إلى ${M('1500')} م عبر مسلك متّصل: لقد مررت حتما بارتفاع ${M('1000')} م مرّة على الأقلّ. وإذا كنت <b>تصعد دائما</b> (دالة متزايدة تماما) فقد مررت به <b>مرّة واحدة فقط</b>. أمّا من يستعمل «مصعدا سحريا» يقفز من ${M('500')} م إلى ${M('1200')} م (دالة غير مستمرّة) فقد لا يمرّ بالارتفاع ${M('1000')} م أبدا.</p></div>
<div class="card"><h3>طريقة التنصيف: لعبة العدد السرّي</h3>
<p>صديقك يفكّر في عدد بين ${M('1')} و ${M('100')} ويجيبك بـ «أكبر» أو «أصغر». إذا سألت دائما عن منتصف المجال الباقي، تجده في ${M('7')} أسئلة على الأكثر (لأنّ ${M('2<sup>7</sup> = 128')}). هذا بالضبط ما نفعله لحصر ${M('α')}: إشارة ${M('f')} في المنتصف تقول لنا في أيّ نصف يوجد الحلّ.</p></div>`,
`
<div class="card"><h3>La limite en ${M('+∞')} : regarder la courbe de très loin</h3>
<p>Imagine que tu t'éloignes de la courbe en avion. Les petits détails (ondulations, petits termes) disparaissent ; il ne reste que l'« allure générale » : monte-t-elle sans fin ? se stabilise-t-elle à une certaine hauteur ? La limite, c'est ce que tu vois depuis l'avion.</p></div>
<div class="card"><h3>Le terme de plus haut degré : l'éléphant et la souris</h3>
<p>Dans ${M(`x${P3} − 100x${P2}`)}, le terme ${M(`100x${P2}`)} semble fort à cause du coefficient ${M('100')}. Mais pour ${M('x = 1000')} : ${M(`x${P3} = 10<sup>9</sup>`)} alors que ${M(`100x${P2} = 10<sup>8</sup>`)} ; pour ${M(`x = 10<sup>6</sup>`)} : ${M('10<sup>18</sup>')} contre ${M('10<sup>14</sup>')}. L'éléphant (le terme de plus haut degré) finit toujours par écraser la souris, même très « entraînée ».</p></div>
<div class="card"><h3>Les formes indéterminées : le tir à la corde</h3>
<p>${M('+∞ − ∞')}, ce sont deux équipes infiniment fortes qui tirent en sens opposés : impossible de savoir qui gagne sans regarder de près. ${M(`x${P2} − x`)} tend vers ${M('+∞')}, ${M(`x − x${P2}`)} vers ${M('−∞')} et ${M('(x + 1) − x')} vers ${M('1')}. Trois résultats différents pour la même « forme » ${M('∞ − ∞')} : c'est pour cela qu'on la dit « indéterminée ».</p></div>
<div class="card"><h3>Diviser par « presque rien »</h3>
<p>Divise ${M('1')} par ${M('0,1')}, puis ${M('0,001')}, puis ${M('0,000001')} : tu obtiens ${M('10')}, ${M('1000')}, ${M('1 000 000')}… Plus le dénominateur est petit, plus le résultat est grand, sans limite. Si le dénominateur est négatif (${M('−0,001')}), le résultat devient un grand nombre négatif. Voilà pourquoi on regarde toujours le <b>signe</b> du dénominateur quand il tend vers ${M('0')}.</p></div>
<div class="card"><h3>L'asymptote : le chemin de terre le long de l'autoroute</h3>
<p>Un chemin de terre se rapproche de plus en plus de l'autoroute sans jamais la rejoindre : l'écart entre eux tend vers zéro. L'asymptote oblique, c'est l'autoroute, et ${M('f(x) − (ax + b)')} est l'écart vertical entre les deux : s'il tend vers ${M('0')}, la droite est asymptote.</p></div>
<div class="card"><h3>Le théorème des gendarmes</h3>
<p>Deux gendarmes escortent une personne, l'un à sa droite, l'autre à sa gauche. S'ils arrivent tous les deux au même commissariat, la personne coincée entre eux y arrive forcément aussi. C'est exactement ${M('g(x) ≤ f(x) ≤ h(x)')} avec ${M('g')} et ${M('h')} qui ont la même limite.</p></div>
<div class="card"><h3>La continuité : un pont sans trou</h3>
<p>Une fonction continue est un pont sur lequel on marche sans sauter : on trace la courbe sans lever le crayon. La fonction partie entière, elle, est un escalier : à chaque entier, on « saute » d'une marche à l'autre.</p></div>
<div class="card"><h3>Le théorème des valeurs intermédiaires : la randonnée</h3>
<p>Tu pars d'une altitude de ${M('200')} m et tu arrives à ${M('1500')} m par un sentier continu : tu es forcément passé(e) par ${M('1000')} m au moins une fois. Si tu <b>montes tout le temps</b> (fonction strictement croissante), tu y es passé(e) <b>une seule fois</b>. Mais avec un « téléporteur » qui saute de ${M('500')} m à ${M('1200')} m (fonction non continue), tu peux ne jamais passer par ${M('1000')} m.</p></div>
<div class="card"><h3>La dichotomie : le jeu du nombre mystère</h3>
<p>Un ami pense à un nombre entre ${M('1')} et ${M('100')} et répond « plus grand » ou « plus petit ». Si tu proposes toujours le milieu de l'intervalle restant, tu le trouves en ${M('7')} questions au plus (car ${M('2<sup>7</sup> = 128')}). C'est exactement ce qu'on fait pour encadrer ${M('α')} : le signe de ${M('f')} au milieu indique dans quelle moitié se trouve la solution.</p></div>`),

/* --------------------------------------------------------- في الحياة / Dans la vie */
vie:B(`
<div class="card"><h3>أين تلتقي بالنهايات والاستمرارية فعلا؟</h3>
<ul>
<li><b>الفيزياء — السقوط الشاقولي في الهواء:</b> سرعة جسم يسقط مع احتكاك الهواء لا تزيد بلا حدود، بل تقترب من <b>سرعة حدّية</b>: هذه نهاية عند ${M('+∞')}، والمستقيم ${M('v = v<sub>lim</sub>')} مقارب أفقي للمنحنى ${M('v(t)')}. وكذلك شحن مكثّفة: التوتّر ${M('u<sub>C</sub>(t)')} يقترب من ${M('E')}. ستلتقي بهما في برنامج الفيزياء لهذه السنة.</li>
<li><b>الاقتصاد — الكلفة المتوسّطة:</b> إذا كانت كلفة إنتاج ${M('x')} قطعة هي ${M('C(x) = 2000 + 5x')} دج، فإنّ الكلفة المتوسّطة للقطعة ${M(`${f('C(x)','x')} = 5 + ${f('2000','x')}`)} تؤول إلى ${M('5')} دج: التكاليف الثابتة «تذوب» عندما يكبر الإنتاج.</li>
<li><b>البصريات — العدسة المقرّبة:</b> عندما يقترب الجسم من المحرق، تبتعد الصورة بلا حدود: هذا مستقيم مقارب عمودي في علاقة المرافقة.</li>
<li><b>الحياة اليومية — دالة غير مستمرّة:</b> تسعيرة موقف السيارات «لكلّ ساعة بدأت» دالة درج: عند ${M('1')} سا و ${M('59')} د تدفع ثمن ساعتين، وعند ${M('1')} سا بالضبط ثمن ساعة واحدة. هذا هو الجزء الصحيح.</li>
<li><b>الطقس — مبرهنة القيم المتوسطة:</b> إذا انتقلت الحرارة من ${M('−3°')} ليلا إلى ${M('8°')} نهارا، فقد مرّت حتما بـ ${M('0°')}: لحظة ذوبان الجليد على الطريق.</li>
<li><b>الإعلام الآلي:</b> الآلات الحاسبة والبرامج تحلّ المعادلات بطرق مثل التنصيف: هكذا نحسب ${M('√2')} بالبحث عن حلّ المعادلة ${M(`x${P2} − 2 = 0`)} في ${M('[1 ; 2]')}.</li></ul></div>`,
`
<div class="card"><h3>Où rencontre-t-on vraiment limites et continuité ?</h3>
<ul>
<li><b>Physique — chute verticale dans l'air :</b> la vitesse d'un corps qui tombe avec frottement de l'air n'augmente pas sans fin ; elle s'approche d'une <b>vitesse limite</b>. C'est une limite en ${M('+∞')}, et la droite ${M('v = v<sub>lim</sub>')} est asymptote horizontale à la courbe de ${M('v(t)')}. De même, lors de la charge d'un condensateur, la tension ${M('u<sub>C</sub>(t)')} s'approche de ${M('E')}. Tu les retrouveras en physique cette année.</li>
<li><b>Économie — le coût moyen :</b> si produire ${M('x')} pièces coûte ${M('C(x) = 2000 + 5x')} DA, le coût moyen par pièce ${M(`${f('C(x)','x')} = 5 + ${f('2000','x')}`)} tend vers ${M('5')} DA : les frais fixes se « diluent » quand la production augmente.</li>
<li><b>Optique — la lentille convergente :</b> quand l'objet s'approche du foyer, l'image s'éloigne sans limite : c'est une asymptote verticale dans la relation de conjugaison.</li>
<li><b>Vie quotidienne — une fonction non continue :</b> le tarif d'un parking « par heure commencée » est une fonction en escalier : à ${M('1')} h ${M('59')} tu paies deux heures, à ${M('1')} h pile une seule. C'est la partie entière.</li>
<li><b>Météo — le théorème des valeurs intermédiaires :</b> si la température passe de ${M('−3°')} la nuit à ${M('8°')} le jour, elle est forcément passée par ${M('0°')} : le moment où le verglas fond.</li>
<li><b>Informatique :</b> les calculatrices et les logiciels résolvent les équations par des méthodes comme la dichotomie : c'est ainsi qu'on calcule ${M('√2')}, en cherchant la solution de ${M(`x${P2} − 2 = 0`)} dans ${M('[1 ; 2]')}.</li></ul></div>`),

/* -------------------------------------------------------- النواة الصلبة / L'essentiel */
noyau:B(`
<div class="card core"><h3>النواة الصلبة — ما يجب أن تحفظه</h3>
<div class="chip"><div class="lab">نهايات مرجعية</div>${M(`${LX('+∞')}x<sup>n</sup> = +∞`)} · ${M(`${LX('±∞')}${f('1','x<sup>n</sup>')} = 0`)} · ${M(`${LS('0','&gt;')}${f('1','x')} = +∞`)}</div>
<div class="chip"><div class="lab">حالات عدم التعيين</div>${M('∞ − ∞')} · ${M('0 × ∞')} · ${M(f('∞','∞'))} · ${M(f('0','0'))}</div>
<div class="chip"><div class="lab">كثير حدود / دالة ناطقة بجوار ${M('±∞')}</div>نهاية الحدّ الأعلى درجة / نهاية حاصل قسمة الحدّين الأعلى درجة</div>
<div class="chip"><div class="lab">${M(f('k','0'))} مع ${M('k ≠ 0')}</div>${M('±∞')} — الإشارة حسب إشارة ${M('k')} وإشارة المقام</div>
<div class="chip"><div class="lab">المستقيمات المقاربة</div>${M(`${LX('±∞')}f(x) = ℓ`)} ← أفقي ${M('y = ℓ')} · ${M(`${LX('a')}f(x) = ±∞`)} ← عمودي ${M('x = a')} · ${M(`${LX('±∞')}[f(x) − (ax + b)] = 0`)} ← مائل ${M('y = ax + b')}</div>
<div class="chip"><div class="lab">الوضع النسبي</div>إشارة ${M('f(x) − (ax + b)')}: موجبة ← ${M(Cf)} فوق ${M('(Δ)')}</div>
<div class="chip"><div class="lab">دالة مركّبة</div>${M('u(x) → b')} و ${M('g(X) → c')} عندما ${M('X → b')} ← ${M('g(u(x)) → c')}</div>
<div class="chip"><div class="lab">الحصر</div>${M('g ≤ f ≤ h')} و ${M('g , h → ℓ')} ← ${M('f → ℓ')}</div>
<div class="chip"><div class="lab">الاستمرارية</div>${M(`${LX('a')}f(x) = f(a)`)}</div>
<div class="chip"><div class="lab">مبرهنة القيم المتوسطة</div>${M('f')} مستمرّة ورتيبة تماما على ${M('[a ; b]')} و ${M('f(a) × f(b) < 0')} ← حلّ وحيد ${M('α')} في ${M(']a ; b[')}</div></div>`,
`
<div class="card core"><h3>L'essentiel — ce qu'il faut retenir</h3>
<div class="chip"><div class="lab">Limites de référence</div>${M(`${LX('+∞')}x<sup>n</sup> = +∞`)} · ${M(`${LX('±∞')}${f('1','x<sup>n</sup>')} = 0`)} · ${M(`${LS('0','&gt;')}${f('1','x')} = +∞`)}</div>
<div class="chip"><div class="lab">Formes indéterminées</div>${M('∞ − ∞')} · ${M('0 × ∞')} · ${M(f('∞','∞'))} · ${M(f('0','0'))}</div>
<div class="chip"><div class="lab">Polynôme / fonction rationnelle en ${M('±∞')}</div>limite du terme de plus haut degré / du quotient des termes de plus haut degré</div>
<div class="chip"><div class="lab">${M(f('k','0'))} avec ${M('k ≠ 0')}</div>${M('±∞')} — signe selon le signe de ${M('k')} et celui du dénominateur</div>
<div class="chip"><div class="lab">Asymptotes</div>${M(`${LX('±∞')}f(x) = ℓ`)} → horizontale ${M('y = ℓ')} · ${M(`${LX('a')}f(x) = ±∞`)} → verticale ${M('x = a')} · ${M(`${LX('±∞')}[f(x) − (ax + b)] = 0`)} → oblique ${M('y = ax + b')}</div>
<div class="chip"><div class="lab">Position relative</div>signe de ${M('f(x) − (ax + b)')} : positif → ${M(Cf)} au-dessus de ${M('(Δ)')}</div>
<div class="chip"><div class="lab">Composée</div>${M('u(x) → b')} et ${M('g(X) → c')} quand ${M('X → b')} → ${M('g(u(x)) → c')}</div>
<div class="chip"><div class="lab">Gendarmes</div>${M('g ≤ f ≤ h')} et ${M('g , h → ℓ')} → ${M('f → ℓ')}</div>
<div class="chip"><div class="lab">Continuité</div>${M(`${LX('a')}f(x) = f(a)`)}</div>
<div class="chip"><div class="lab">Valeurs intermédiaires</div>${M('f')} continue et strictement monotone sur ${M('[a ; b]')} et ${M('f(a) × f(b) < 0')} → unique ${M('α')} dans ${M(']a ; b[')}</div></div>`),

/* Lexique : affiché tel quel dans les deux langues */
gloss:[['نهاية','limite'],['نهاية منتهية','limite finie'],['نهاية غير منتهية','limite infinie'],['على اليمين / على اليسار','à droite / à gauche'],
  ['بجوار','au voisinage de'],['مستقيم مقارب أفقي','asymptote horizontale'],['مستقيم مقارب عمودي','asymptote verticale'],['مستقيم مقارب مائل','asymptote oblique'],
  ['حالة عدم التعيين','forme indéterminée'],['الحدّ الأعلى درجة','terme de plus haut degré'],['المرافق','expression conjuguée'],['دالة مركّبة','fonction composée'],
  ['مبرهنة الحصر','théorème des gendarmes'],['الوضع النسبي','position relative'],['منحنى','courbe représentative'],['الاستمرارية','continuité'],
  ['دالة مستمرّة','fonction continue'],['دالة معرّفة بقطع','fonction définie par morceaux'],['الجزء الصحيح','partie entière'],
  ['مبرهنة القيم المتوسطة','théorème des valeurs intermédiaires'],['رتيبة تماما','strictement monotone'],['حصر','encadrement'],['طريقة التنصيف','dichotomie'],['طريقة المسح','balayage']],

/* ----------------------------------------------------- التفكير الصحيح / Bien raisonner */
methode:B(`
<div class="card"><h3>كيف تحسب نهاية؟</h3>
<ol class="steps">
<li><b>عوّض أوّلا</b> (ذهنيا) ${M('x')} بالقيمة التي يؤول إليها. إذا لم تحصل على حالة عدم تعيين، فقد انتهيت: طبّق قواعد العمليات.</li>
<li><b>إذا حصلت على حالة عدم تعيين، حدّد نوعها</b> واختر الطريقة: ${M(f('∞','∞'))} أو ${M('∞ − ∞')} مع كثيرات حدود ← الحدّ الأعلى درجة؛ ${M(f('0','0'))} عند ${M('a')} ← حلّل واختزل ${M('(x − a)')}؛ جذور ← المرافق؛ ${M('sin')} أو ${M('cos')} بجوار ${M('∞')} ← الحصر.</li>
<li><b>في الحالة ${M(f('k','0'))}:</b> ادرس إشارة المقام على يسار ويمين القيمة (جدول إشارات)، ثمّ طبّق قاعدة الإشارات.</li>
<li><b>فسّر النتيجة بيانيا:</b> نهاية منتهية عند ${M('±∞')} ← مستقيم مقارب أفقي؛ نهاية غير منتهية عند ${M('a')} ← مستقيم مقارب عمودي.</li></ol></div>
<div class="card"><h3>كيف تحرّر سؤال «بيّن أنّ المعادلة ${M('f(x) = 0')} تقبل حلّا وحيدا ${M('α')} حيث ${M('1,1 < α < 1,2')}»؟</h3>
<div class="rule">«الدالة ${M('f')} <b>مستمرّة</b> و<b>متزايدة تماما</b> على المجال ${M('[1,1 ; 1,2]')}، و ${M('f(1,1) ≈ −0,37 < 0')} و ${M('f(1,2) ≈ 0,33 > 0')}. إذن حسب مبرهنة القيم المتوسطة، المعادلة ${M('f(x) = 0')} تقبل حلّا وحيدا ${M('α')} حيث ${M('1,1 < α < 1,2')}.»</div>
<p>ثلاثة عناصر لا غنى عنها: <b>الاستمرارية</b>، <b>الرتابة التامّة</b> (من أجل الوحدانية)، و<b>تغيّر الإشارة</b>. وأيّ عنصر ناقص يُفقدك جزءا من العلامة.</p></div>
<div class="card"><h3>المطبّات</h3>
<div class="warn"><b>المطبّ 1:</b> كتابة ${M('∞ − ∞ = 0')} أو ${M(`${f('∞','∞')} = 1`)} أو ${M(`${f('0','0')} = 0`)}. هذه حالات عدم تعيين: النتيجة قد تكون أيّ شيء.</div>
<div class="warn"><b>المطبّ 2:</b> كتابة ${M(`${f('3','0')} = +∞`)} دون دراسة إشارة المقام. يجب التمييز بين ${M('x > a')} و ${M('x < a')}.</div>
<div class="warn"><b>المطبّ 3:</b> نسيان الإشارة بجوار ${M('−∞')}: ${M(`${LX('−∞')}(−2x${P3}) = +∞`)} لأنّ ${M(`x${P3} → −∞`)} و ${M('−2 < 0')}.</div>
<div class="warn"><b>المطبّ 4:</b> استعمال قاعدة «الحدّ الأعلى درجة» عند عدد حقيقي ${M('a')}: هذه القاعدة صالحة <b>فقط</b> بجوار ${M('±∞')}.</div>
<div class="warn"><b>المطبّ 5:</b> استنتاج وحدانية الحلّ دون الرتابة التامّة: مبرهنة القيم المتوسطة وحدها تضمن الوجود فقط.</div>
<div class="warn"><b>المطبّ 6:</b> نسيان الاستمرارية: ${M(f('1','x'))} على ${M('[−1 ; 1]')} تحقّق ${M('f(−1) < 0 < f(1)')} لكنّها لا تنعدم أبدا، لأنّها غير مستمرّة (غير معرّفة) عند ${M('0')}.</div>
<div class="warn"><b>المطبّ 7:</b> ${M('sin x')} ليست لها نهاية بجوار ${M('+∞')}، لكنّها <b>محدودة</b>: ${M(f('sin x','x'))} تؤول إلى ${M('0')} بالحصر. لا تكتب «ليست لها نهاية» بسرعة.</div></div>`,
`
<div class="card"><h3>Comment calculer une limite ?</h3>
<ol class="steps">
<li><b>Remplace d'abord</b> (mentalement) ${M('x')} par la valeur vers laquelle il tend. Si tu n'obtiens pas de forme indéterminée, c'est fini : applique les règles d'opérations.</li>
<li><b>Si c'est une forme indéterminée, identifie-la</b> et choisis la méthode : ${M(f('∞','∞'))} ou ${M('∞ − ∞')} avec des polynômes → terme de plus haut degré ; ${M(f('0','0'))} en ${M('a')} → factorise et simplifie par ${M('(x − a)')} ; racines → conjugué ; ${M('sin')} ou ${M('cos')} en ${M('∞')} → encadrement.</li>
<li><b>Dans le cas ${M(f('k','0'))} :</b> étudie le signe du dénominateur à gauche et à droite de la valeur (tableau de signes), puis applique la règle des signes.</li>
<li><b>Interprète graphiquement :</b> limite finie en ${M('±∞')} → asymptote horizontale ; limite infinie en ${M('a')} → asymptote verticale.</li></ol></div>
<div class="card"><h3>Comment rédiger « Montrer que l'équation ${M('f(x) = 0')} admet une unique solution ${M('α')} telle que ${M('1,1 < α < 1,2')} » ?</h3>
<div class="rule">« La fonction ${M('f')} est <b>continue</b> et <b>strictement croissante</b> sur l'intervalle ${M('[1,1 ; 1,2]')}, et ${M('f(1,1) ≈ −0,37 < 0')}, ${M('f(1,2) ≈ 0,33 > 0')}. Donc, d'après le théorème des valeurs intermédiaires, l'équation ${M('f(x) = 0')} admet une unique solution ${M('α')} telle que ${M('1,1 < α < 1,2')}. »</div>
<p>Trois éléments indispensables : la <b>continuité</b>, la <b>stricte monotonie</b> (pour l'unicité) et le <b>changement de signe</b>. Chaque élément oublié coûte des points.</p></div>
<div class="card"><h3>Les pièges</h3>
<div class="warn"><b>Piège 1 :</b> écrire ${M('∞ − ∞ = 0')}, ${M(`${f('∞','∞')} = 1`)} ou ${M(`${f('0','0')} = 0`)}. Ce sont des formes indéterminées : le résultat peut être n'importe quoi.</div>
<div class="warn"><b>Piège 2 :</b> écrire ${M(`${f('3','0')} = +∞`)} sans étudier le signe du dénominateur. Il faut distinguer ${M('x > a')} et ${M('x < a')}.</div>
<div class="warn"><b>Piège 3 :</b> oublier le signe en ${M('−∞')} : ${M(`${LX('−∞')}(−2x${P3}) = +∞`)} car ${M(`x${P3} → −∞`)} et ${M('−2 < 0')}.</div>
<div class="warn"><b>Piège 4 :</b> utiliser la règle du « terme de plus haut degré » en un réel ${M('a')} : elle n'est valable <b>qu'en</b> ${M('±∞')}.</div>
<div class="warn"><b>Piège 5 :</b> conclure à l'unicité sans la stricte monotonie : le théorème des valeurs intermédiaires seul ne garantit que l'existence.</div>
<div class="warn"><b>Piège 6 :</b> oublier la continuité : ${M(f('1','x'))} sur ${M('[−1 ; 1]')} vérifie ${M('f(−1) < 0 < f(1)')} mais ne s'annule jamais, car elle n'est pas continue (pas définie) en ${M('0')}.</div>
<div class="warn"><b>Piège 7 :</b> ${M('sin x')} n'a pas de limite en ${M('+∞')}, mais elle est <b>bornée</b> : ${M(f('sin x','x'))} tend vers ${M('0')} par encadrement. N'écris pas trop vite « pas de limite ».</div></div>`)
});
})();
