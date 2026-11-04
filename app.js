// Registre des opérations maraîchères — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { OPERATIONS, ajouterOperation, formaterOperation, listerOperations, trouverParId } from './src/registre.js';
import { filtrerParCulture, filtrerParParcelle, trierParCout, trierParDate } from './src/recherche.js';
import { coutMinMax, syntheseParParcelle, totalCouts } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/operations.json';
 
function afficherAccueil() {
  console.log('='.repeat(50));
  console.log('   REGISTRE DES OPÉRATIONS MARAÎCHÈRES');
  console.log('   Exploitation maraîchère pédagogique');
  console.log('='.repeat(50));
}
 
function afficherMenu() {
  console.log('');
  console.log('--------------------- MENU ---------------------');
  console.log('1. Ajouter une opération');
  console.log('2. Lister les opérations');
  console.log('3. Rechercher (identifiant, parcelle, culture)');
  console.log('4. Trier (coût, date)');
  console.log('5. Synthèse des dépenses');
  console.log('0. Quitter');
}
 
// Choix 1 : pose six questions, vérifie, ajoute et enregistre.
async function ajouter(operations) {
  console.log('--- Ajouter une opération ---');
 
  // Si demander() renvoie null (Ctrl+C), on abandonne l'ajout.
  const id = await demander('Identifiant (ex. O11) : ');
  if (id === null) {
    return;
  }
  const date = await demander('Date (AAAA-MM-JJ) : ');
  if (date === null) {
    return;
  }
  const parcelle = await demander('Parcelle (ex. P1) : ');
  if (parcelle === null) {
    return;
  }
  const culture = await demander('Culture (ex. tomate) : ');
  if (culture === null) {
    return;
  }
  const operation = await demander(`Opération (${OPERATIONS.join(', ')}) : `);
  if (operation === null) {
    return;
  }
  const cout = await demander('Coût en FCFA : ');
  if (cout === null) {
    return;
  }
 
  // On range les réponses dans une saisie, avec la mise en forme demandée.
  const saisie = {
    id: id.toUpperCase(),
    date: date,
    parcelle: parcelle.toUpperCase(),
    culture: culture.toLowerCase(),
    operation: operation.toLowerCase(),
    coutFCFA: cout
  };
 
  const erreurs = ajouterOperation(operations, saisie);
 
  if (erreurs.length === 0) {
    await enregistrerJson(FICHIER_DONNEES, operations);
    console.log(`Opération ${saisie.id} ajoutée. Le registre compte ${operations.length} opération(s).`);
  } else {
    console.log('Opération refusée :');
    for (const erreur of erreurs) {
      console.log(`  - ${erreur}`);
    }
    console.log(`Le registre compte toujours ${operations.length} opération(s).`);
  }
}
 
// Choix 2 : affiche toutes les opérations.
function lister(operations) {
  console.log(`--- Liste des opérations (${operations.length}) ---`);
  console.log(listerOperations(operations));
}
 
// Choix 3 : recherche par identifiant, par parcelle ou par culture.
async function rechercher(operations) {
  console.log('--- Rechercher ---');
  console.log('1. Par identifiant');
  console.log('2. Par parcelle');
  console.log("3. Les opérations d'une culture");
  const sousChoix = await demander('Votre choix : ');
  if (sousChoix === null) {
    return;
  }
 
  if (sousChoix === '1') {
    const reponse = await demander('Identifiant : ');
    if (reponse === null) {
      return;
    }
    const id = reponse.toUpperCase();
    const operation = trouverParId(operations, id);
    if (operation === undefined) {
      console.log(`Opération ${id} introuvable.`);
    } else {
      console.log(formaterOperation(operation));
    }
  } else if (sousChoix === '2') {
    const reponse = await demander('Parcelle : ');
    if (reponse === null) {
      return;
    }
    const parcelle = reponse.toUpperCase();
    const resultat = filtrerParParcelle(operations, parcelle);
    console.log(`${resultat.length} opération(s) sur la parcelle ${parcelle} :`);
    console.log(listerOperations(resultat));
  } else if (sousChoix === '3') {
    const reponse = await demander('Culture : ');
    if (reponse === null) {
      return;
    }
    const culture = reponse.toLowerCase();
    const resultat = filtrerParCulture(operations, culture);
    console.log(`${resultat.length} opération(s) pour la culture ${culture} :`);
    console.log(listerOperations(resultat));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}
 
// Choix 4 : tri par coût ou par date (le registre lui-même ne change pas d'ordre).
async function trier(operations) {
  console.log('--- Trier ---');
  console.log('1. Par coût croissant');
  console.log('2. Par date, de la plus ancienne à la plus récente');
  const sousChoix = await demander('Votre choix : ');
  if (sousChoix === null) {
    return;
  }
 
  if (sousChoix === '1') {
    console.log(listerOperations(trierParCout(operations)));
  } else if (sousChoix === '2') {
    console.log(listerOperations(trierParDate(operations)));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}
 
// Choix 5 : synthèse des dépenses.
function afficherSynthese(operations) {
  console.log('--- Synthèse des dépenses enregistrées ---');
  console.log(`Nombre d'opérations : ${operations.length}`);
  console.log(`Total des coûts : ${totalCouts(operations)} FCFA`);
 
  console.log('Par parcelle :');
  const parParcelle = syntheseParParcelle(operations);
  for (const parcelle in parParcelle) {
    const details = parParcelle[parcelle];
    console.log(`  ${parcelle} : ${details.nombre} opération(s), ${details.total} FCFA`);
  }
 
  const extremes = coutMinMax(operations);
  if (extremes === null) {
    console.log('Coût minimum et maximum : aucune donnée');
  } else {
    console.log(`Coût minimum : ${extremes.min} FCFA · Coût maximum : ${extremes.max} FCFA`);
  }
  console.log('Rappel : ce sont des dépenses. Sans les revenus, elles ne mesurent pas la rentabilité.');
}
 
async function main() {
  ouvrirSaisie();
  afficherAccueil();
 
  // Chargement des données : si le fichier est illisible, le registre démarre vide.
  let operations = [];
  try {
    operations = await chargerJson(FICHIER_DONNEES);
    console.log(`${operations.length} opération(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
  } catch (erreur) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. Le registre démarre vide.`);
  }
 
  // Le menu revient après chaque action, jusqu'à ce que l'utilisateur quitte.
  while (true) {
    afficherMenu();
    const choix = await demander('Votre choix : ');
 
    if (choix === null || choix === '0') {
      console.log('Au revoir !');
      break;
    }
 
    try {
      if (choix === '1') {
        await ajouter(operations);
      } else if (choix === '2') {
        lister(operations);
      } else if (choix === '3') {
        await rechercher(operations);
      } else if (choix === '4') {
        await trier(operations);
      } else if (choix === '5') {
        afficherSynthese(operations);
      } else {
        console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
      }
    } catch (erreur) {
      if (erreur.message.startsWith('TODO')) {
        console.log(`À compléter : ${erreur.message}`);
      } else {
        console.log(`Erreur inattendue : ${erreur.message}`);
      }
    }
  }
 
  fermerSaisie();
}
 
main();