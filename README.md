# الرياضيات — البكالوريا · Mathématiques — BAC

Application interactive **bilingue (arabe / français)** pour préparer le BAC de mathématiques,
filière **Sciences expérimentales** (3e AS, Algérie). Elle s'installe sur téléphone et fonctionne hors ligne.

Basée sur l'application [Math3AM](https://ferhat06gc-commits.github.io/Math3AM/), réutilisée avec l'accord de son auteur.

## État du prototype

| Chapitre | État |
|---|---|
| 1. Limites et continuité | **Complet** : 8 onglets |
| 5. Suites numériques | **Complet** : 8 onglets |
| 2–4, 6–9 | Listés dans le sommaire, marqués « Bientôt » |

Chaque chapitre complet a les mêmes 8 onglets : cours, analogies, dans la vie, l'essentiel (avec lexique arabe ↔ français), bien raisonner, explorer (laboratoire interactif), exercice type BAC sur 6 points, et exercices générés à l'infini (11 types par chapitre).

Le laboratoire de « Limites et continuité » a deux modes : les asymptotes de f(x) = ax + b + c/(x − d), et la dichotomie pour encadrer la solution de x³ + x − k = 0.

Détail des onglets du chapitre « Suites numériques » :

1. **Cours** (7 parties) :
   - généralités ;
   - sens de variation ;
   - raisonnement par récurrence ;
   - suites arithmétiques ;
   - suites géométriques ;
   - limites, suites adjacentes ;
   - suite auxiliaire.
2. **Analogies** : escalier et photocopieuse, dominos, plafond, café qui refroidit…
3. **Dans la vie** : épargne, médicament, bactéries, carbone 14, lien avec l'exponentielle.
4. **L'essentiel** : fiche à retenir et lexique arabe ↔ français.
5. **Bien raisonner** : méthode d'un exercice de BAC et 7 pièges.
6. **Explorer** : laboratoire interactif pour u(n+1) = a·u(n) + b, en escalier ou en nuage de points, avec animation.
7. **Exercice type BAC** : 6 points, avec indices, corrigé détaillé et barème que l'élève coche lui-même.
8. **Exercices** : 11 types d'exercices générés à l'infini, correction immédiate, diagnostic des erreurs fréquentes et carnet d'erreurs avec révisions espacées.

## Structure

```
math-bac/
├── index.html            ← fichier généré (c'est lui qu'on publie)
├── build.py              ← assemble src/ en index.html
├── src/
│   ├── shell.html        squelette de la page
│   ├── style.css         styles (repris de Math3AM + bilingue)
│   ├── core.js           outils : calcul, lecture des réponses, mise en page arabe, langue
│   ├── i18n.js           tous les textes de l'interface, en arabe et en français
│   ├── program.js        domaines et liste des chapitres
│   ├── ch-limites.js     chapitre 1 : cours, analogies, vie, essentiel, méthode
│   ├── ch-limites-ex.js  chapitre 1 : générateurs, exercice BAC, laboratoire
│   ├── ch-suites.js      chapitre 5 : cours, analogies, vie, essentiel, méthode
│   ├── ch-suites-ex.js   chapitre 5 : générateurs, exercice BAC, laboratoire
│   └── app.js            progression, écrans, réglages, clavier, installation
├── sw.js, manifest.webmanifest, icon-*.png   installation et mode hors ligne
```

## Modifier puis reconstruire

Après toute modification dans `src/` :

```
python3 build.py
```

Pour tester sur l'ordinateur : `python3 -m http.server`, puis ouvrir http://localhost:8000.
Ouvrir `index.html` directement fonctionne aussi, mais sans installation.

## Ajouter un chapitre

1. Créer `src/ch-xxx.js` sur le modèle de `ch-suites.js`. Tout le contenu s'écrit avec `B('texte arabe', 'texte français')`, les formules avec `M('…')`.
2. Facultatif : créer `src/ch-xxx-ex.js` pour les générateurs (`GEN[id]`), l'exercice BAC (`BAC[id]`) et le laboratoire (`LABS[id]`).
3. Ajouter le ou les fichiers à la liste `JS` de `build.py`, avant `app.js`.
4. Lancer `python3 build.py`.

Le chapitre perd automatiquement l'étiquette « Bientôt » dès que son fichier fixe `soon:false`.

## Publier (GitHub Pages)

Même procédure que Math3AM :

1. Déposer à la racine d'un dépôt : `index.html`, `sw.js`, `manifest.webmanifest` et les 4 icônes. Le dossier `src/` et `build.py` peuvent aussi y être.
2. Aller dans Settings → Pages → « Deploy from a branch », branche `main`, dossier `/ (root)`.
3. À chaque nouvelle version, changer la valeur `V` dans `sw.js` pour que les téléphones se mettent à jour.

## À compléter

- **Nom de l'auteur** : ajouter `creditName:'…'` dans `src/i18n.js` (sections `ar` et `fr`). Une ligne « Conception et développement » apparaîtra alors en bas de page.
- **Licence** : à choisir. Math3AM est « tous droits réservés ».
- **Liste et ordre des chapitres** (`src/program.js`) : à vérifier avec le programme officiel en vigueur.
