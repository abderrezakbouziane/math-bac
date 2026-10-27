/* ============================================================================
   البرنامج: الميادين والأبواب — Programme : domaines et chapitres
   Pour ajouter un chapitre : créer src/ch-xxx.js qui remplit CH(id) (voir ch-suites.js),
   l'ajouter à build.py, puis retirer « soon » ci-dessous.
   ============================================================================ */
const DOMAINS={
  ana:{name:B('التحليل','Analyse'), v:'blue'},
  alg:{name:B('الجبر والهندسة','Algèbre et géométrie'), v:'brand'},
  pro:{name:B('الاحتمالات','Probabilités'), v:'violet'}
};
const L=[
  {id:1, dom:'ana', soon:true, t:B('النهايات والاستمرارية','Limites et continuité')},
  {id:2, dom:'ana', soon:true, t:B('الاشتقاقية ودراسة الدوال','Dérivabilité et étude de fonctions')},
  {id:3, dom:'ana', soon:true, t:B('الدالة الأسية','Fonction exponentielle')},
  {id:4, dom:'ana', soon:true, t:B('الدالة اللوغاريتمية النيبيرية','Fonction logarithme népérien')},
  {id:5, dom:'ana', soon:true, t:B('المتتاليات العددية','Suites numériques')},
  {id:6, dom:'ana', soon:true, t:B('الدوال الأصلية والحساب التكاملي','Primitives et calcul intégral')},
  {id:7, dom:'alg', soon:true, t:B('الأعداد المركّبة','Nombres complexes')},
  {id:8, dom:'alg', soon:true, t:B('الهندسة في الفضاء','Géométrie dans l\'espace')},
  {id:9, dom:'pro', soon:true, t:B('الاحتمالات','Probabilités')},
];
const CH=id=>L.find(l=>l.id===id);
const GEN={};     /* GEN[id]  : générateurs d'exercices du chapitre */
const BAC={};     /* BAC[id]  : exercice type BAC du chapitre */
const LABS={};    /* LABS[id] : activité « Explorer » du chapitre */
