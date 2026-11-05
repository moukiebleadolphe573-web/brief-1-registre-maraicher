# Registre des opérations maraîchères

> Projet individuel du SAS DFS, brief 1 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte
Cet outil est destiné à une responsable d'une exploitation maraîchère pédagogique qui note aujourd'hui ses opérations (semis, arrosage, désherbage…) dans un carnet papier. Son geste professionnel est d'observer la parcelle avec la fiche fournie, d'identifier la culture et l'opération, de renseigner la date et le coût, de vérifier les unités, puis de restituer un résumé. Son besoin est de réduire les oublis de suivi et de rendre les opérations consultables à partir d'un terminal. Elle saisit pour chaque opération : un identifiant, une date (AAAA-MM-JJ), une parcelle, une culture, l'opération (semis, arrosage, désherbage, repiquage ou récolte) et un coût en FCFA. Le programme, écrit en JavaScript avec Node.js, lui permet de retrouver une intervention (liste, recherche, tri) et de totaliser les dépenses par parcelle (synthèse : total, nombre et total par parcelle, coût minimum et maximum). Le coût enregistré est une **dépense**, présente dans les données. Les **revenus** sont absents : l'outil ne permet donc pas de parler de **rentabilité**.

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-1-registre-maraicher.git
cd brief-1-registre-maraicher
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [X] Données lues et enregistrées dans `donnees/operations.json`
- [X] Ajouter une opération, saisies invalides refusées sans arrêter le programme
- [X] Lister les opérations, message si le registre est vide
- [X] Rechercher par identifiant ou par parcelle ; filtrer par culture
- [X] Trier par coût ou par date
- [X] Synthèse : total, nombre et total par parcelle, coût minimum et maximum
- [ ] Bonus : supprimer et modifier une opération (choix 6 et 7)
- [ ] Bonus : tri par coût décroissant, parcelle la plus coûteuse

## Données
fichier :`operation.json`
nombre d'operations : 05 
les champs : `id`,`date`,`parcelle`,`culture`,`operation`,`coutFCFA` 
les unités : seul le champ `coutFCFA`presente une unité (FCFA). Les autres, pas d'unités.
NB : Nos données utilisées  sont fictives.*

## Limites
Le registre ne contrôle pas la cohérence entre la parcelle et la culture : on peut enregistrer la parcelle `P1` avec la culture `gombo`, alors que les données de départ y placent la tomate.
Le registre ne contrôle pas le cycle de culture : une récolte peut être enregistrée avec une date antérieure au semis de la même culture.
Le registre n'enregistre ni la surface, ni la quantité récoltée, ni l'eau apportée : on ne peut pas comparer deux parcelles de tailles différentes.


## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

Prénom NOM : Ble Adolphe MOUKIE 
compte GitHub : moukiebleadolphe573-web
 Entraide : Kamagate Abdala m'aidé à corriger une erreur sur l'un de mes commmit.
