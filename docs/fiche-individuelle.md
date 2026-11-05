# Fiche individuelle

> Une page, avant la livraison. Prénom, nom : Ble Adolphe MOUKIE; compte GitHub : moukiebleadolphe573-web

1. **Une fonction que j'ai écrite**, et comment elle marche : j'ai écrit `listerOperations` dans `src/registre.js`. Elle reçoit le tableau des opérations et renvoie un seul texte, avec une opération par ligne. Si le tableau est vide, elle renvoie le message « Aucune opération enregistrée. ». Sinon, je crée un tableau `lignes`, je passe sur chaque opération avec une boucle `for`, et j'ajoute avec `push` le texte fabriqué par `formaterOperation`. À la fin, `join('\n')` colle toutes les lignes en un texte, séparées par un retour à la ligne. Avec les données de départ, elle renvoie 10 lignes, de O01 à O10.

2. **Une difficulté, et sa solution** :  en lançant le menu et en tapant 2, le programme affichait `undefined` au lieu de la liste. J'ai compris que ma fonction calculait bien le texte, mais qu'il manquait le mot `return` devant : sans `return`, une fonction renvoie `undefined`. Je l'ai trouvé en regardant mon code ligne par ligne, puis j'ai ajouté `return` devant `lignes.join('\n')`. Le test `listerOperations écrit une ligne par opération` est passé au vert, et le menu a affiché mes 10 opérations. J'ai aussi compris pourquoi le cas du tableau vide est traité en premier avec son propre `return`.

3. **L'entraide** 
qui m'a aidé ? 
-Kamagaté Abdala et Koffi VIEGNEKOU m'ont donné des explixations durant tout mon travail.
 qui j'ai aidé, sur quoi ? 
 -J'ai aidé  [Kake] à remplir leur fiche agronomique : je lui ai expliqué comment la remplir et ce que chaque partie demande (étapes du cycle, ce qu'on vérifie sur la parcelle).
