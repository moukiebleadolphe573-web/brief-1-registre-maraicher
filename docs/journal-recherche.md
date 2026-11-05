# Journal de recherche

> Chaque recherche utile : ce que vous cherchiez, où (cours, [MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript), [Node.js](https://nodejs.org/api/), un camarade, une IA…), ce que vous avez compris. Ce que vous gardez, vous devez pouvoir l'expliquer.

| Ce que je cherchais | Où | Ce que j'ai compris | Utilisé dans |
| --- | --- | --- | --- |
|Partager du code entre fichiers : `import` et`export`|MDN : instructions import et export|export met une fonction à disposition des autres fichiers, import va la chercher | app.js (les imports) et tous les fichiers de src/|
| Fonctions asynchrones : async et await |MDN : async function et await ; Claude (IA) | Lire un fichier prend du temps : await attend le résultat avant de continuer, et async marque une fonction qui contient une attente|`src/stockage.js, app.js` |
|Lire et écrire un fichier : `readFile` et `writeFile`| Node.js : module fs/promises| readFile renvoie le texte du fichier, writeFile écrit un texte en remplaçant l'ancien contenu.|`src/stockage.js`|
|Parcourir une liste : boucle `for`...`of`|MDN : `for`...`of`| Pour chaque élément de la liste, on exécute les mêmes instructions.|`src/registre.js, src/recherche.js, src/synthese.js`|
