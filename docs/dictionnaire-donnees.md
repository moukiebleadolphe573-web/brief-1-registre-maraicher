# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | `O02`|
| `date` |dat de l'operation |date |date réelle du format AAAA-MM-JJ |—|`2026-10-20`|
|`parcelle`|parcelle ou a lieu l'operation|texte|non vide, absent des données |—| `P2`|
|`culture`|culture suivie sur la parcelle |texte | non vide, absent des données|—| `gombo`|
| `operation`|type du geste technique|texte|trouvable dans le fichier `donnees/operations.json`|—| `semis`|
| `coutFCFA`|dépense enregistrée pour l'operation |nombre|nombre doit etre positif ou nul|FCFA| `4000`|

**Listes de valeurs autorisées** : 
`id` suit le format `O` plus deux chiffres, seulement dans tout le registre
-`date` suit le format AAAA-MM-JJ et doit être une date réelle.
-`parcelle` et `culture` n'ont pas de liste fermée : n'importe quel texte non vide est accepté (le menu met la parcelle en majuscules et la culture en minuscules).
-`operation`:`semis`, `arrosage`, `désherbage`, `repiquage`, `récolte`; en minuscules avec accents. 
 `coutFCFA` c'est un nombre positif ou nul, en FCFA

**Sources** : 
 `SUJET.md` (le besoin et les champs) ; `fiches/3-ajouter-lister.md` (règles de validation et messages) ; `donnees/operations.json` (les dix opérations de départ, fictives) ; `src/outils.js` (`versNombre` et `estDateValide`) ; liste des opérations fournie par le coach agronomie.
