[![codecov](https://codecov.io/gh/alucrece/Deploiement_continu/branch/main/graph/badge.svg)](https://app.codecov.io/gh/alucrece/Deploiement_continu)

# Deploiement Continu - React App

Ce projet a été initialisé avec **Create React App** et enrichi par une intégration continue avec GitHub Actions, des tests complets, une couverture Codecov à 100 %, et un déploiement automatique sur GitHub Pages.

## Liens utiles

-  **Application déployée** : [Voir sur GitHub Pages](https://alucrece.github.io/Deploiement_continu)
-  **Couverture de code** : [Rapport Codecov](https://app.codecov.io/gh/alucrece/Deploiement_continu)

##  Scripts disponibles

Dans le dossier `my-app`, vous pouvez exécuter :

### `npm start`

Lance l'application en mode développement.
Ouvrez [http://localhost:3000](http://localhost:3000) pour voir dans le navigateur.

### `npm test`

Lance les tests unitaires et affiche la couverture de code.

### `npm run build`

Construit l'application pour la production dans le dossier `build/`.
Les fichiers sont minifiés et prêts à être déployés.

### `npm run eject`

**Attention** : cette commande est irréversible.
Elle expose toute la configuration interne (webpack, Babel, etc.).

## Tests et couverture

- Couverture globale actuelle : **100 %**
- Framework : `Jest` + `@testing-library/react`
- E2E (optionnel) : `Cypress`

Les tests se trouvent dans le dossier `src/tests/`.

## Intégration Continue

Le dépôt utilise **GitHub Actions** pour :
- Installer les dépendances
- Lancer les tests unitaires
- Générer le rapport de couverture
- Uploader vers Codecov
- Construire l'application
- Déployer automatiquement sur GitHub Pages

## Pour aller plus loin

- [Create React App - Documentation](https://create-react-app.dev/docs/getting-started)
- [React - Documentation officielle](https://react.dev/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Codecov](https://docs.codecov.com/docs)
