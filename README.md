# Test technique pour Canal+

## Objectif
Créer une application qui affiche des films et des séries à l'aide d'APIs provenant de themoviedb

## Installation du projet
Cloner le projet, puis :
```
cd movies-series-app
npm install
npm start
```

## Caractéristiques du projet

### Fonctionnalités
- Affichage des films et séries les plus populaires (selon un critère totalement objectif basé sur le nombre de votes), sous forme de grille avec pagination
- Recherche d'un film ou d'une série parmi toute la database de themoviedb
- Affichage des détails d'un film ou d'une série au clic sur ces derniers, depuis la grille ou depuis la recherche
- **Fonctionnalité secrète** : je ne veux pas la spoiler, consultez des films comme Toy Story, Ant-Man ou des séries comme Bones pour une surprise ;) La fonctionnalité marche avec des Observables de RxJS, j'en suis très fière.

### Choix techniques
- React 16.13 : la version que je connais et que je maîtrise
- RxJS : une technologie que j'aime beaucoup et que je trouve parfaite pour du contenu asynchrone
- Redux : le state management sur lequel est basé NgRx, que je maîtrise
- Reactstrap (Bootstrap) : la librairie que je connais le mieux pour faire du responsive

### Améliorations souhaitées
- Refondre le projet en TypeScript : je connais le langage mais uniquement dans le contexte Angular, j'aimerais prendre du temps pour me former et apprendre à utiliser le Typescript en React
- Utiliser des observables pour toutes les requètes pour avoir un chargement des données complètement asynchrone
- Se former pour pouvoir utiliser les nouveaux hooks : useState, useEffect
- Utiliser des constantes pour certaines valeurs, comme l'api key ou l'URL de base de l'API : j'ai essayé de les mettres dans un fichier ou en attribut de la classe mais sans succès
- Utiliser des alias pour les imports des composants et containers : j'ai trouvé un moyen sur internet mais il nécessitait d'utiliser la commande "npm run eject" et ça m'a fait peur, je préfère investiguer avant d'essayer
- Faire un Makefile pour l'installation du projet
- Ajouter des fonctionnalités : un bouton "clear" pour la recherche, afficher les films recommandés, 

### Autres infos
- Le design de mon application est inspiré du site themoviedb.com

J'espère que l'application vous plaira, je me suis beaucoup amusée en la faisant !
