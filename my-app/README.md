Application React avec validation de formulaire, tests complets, couverture à 100 %, et déploiement GitHub Pages + npm.

Description

Ce projet est une application React permettant à un utilisateur de s'enregistrer via un formulaire. Le formulaire effectue une validation des champs avant d'autoriser la soumission. Si les informations sont correctes, elles sont sauvegardées dans le localStorage, et un message de succès s'affiche. En cas d'erreur, des messages d'erreur sont affichés sous les champs concernés.

Fonctionnalités

Vérification des champs en temps réel

Désactivation du bouton tant que tous les champs ne sont pas valides

Validation stricte des entrées (âge, email, code postal, etc.)

Affichage d'un toaster de succès ou d'erreur

Stockage des données valides dans le localStorage

Tests unitaires et d'intégration avec une couverture de 100%

Déploiement automatique via GitHub Actions sur GitHub Pages

Installation et Exécution

1️. Cloner le projet
  git clone git@github.com:alucrece/Deploiement_continu.git
  
2️. Installer les dépendances
  npm install
  
3️. Lancer le projet en local
  npm start
  Ouvre http://localhost:3000 pour voir l'application.
  
Tests & Couverture
Exécuter tous les tests
  npm test
Vérifier la couverture des tests
  npm test -- --coverage

⚙️ Installation
npm install
npm run dev

Pour lancer les tests :

Edit
npm run test