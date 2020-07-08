## URL de prod 
https://brave-pasteur-784339.netlify.app/ <br>
`Currently optimized for iPhone 6/7/8`

## Stack utilisées
React<br />
SASS<br />
ThreeJS<br />
React-three-fiber / react-spring

### Justifications techniques

Cette application web est un jeu interactif dans lequel le joueur incarne le programme spatial américain et doit parvenir à poser le premier pas sur la lune avant l’URSS.

Notre projet étant un jeu, basé sur l’interaction avec le joueur nous avons jugé bon d’utiliser du client side rendering. Celui-ci nous permet de privilégier une application fluide, dynamique et performante au dépend du référencement ou de la résilience qui nous sont de moins grande utilité. 

Nous avons préféré utiliser la bibliothèque React par rapport à Angular ou Vue js par soucis de familiarité avec son environnement et d’habitude de travail. Nous avons pris soins de fonctionner uniquement avec des hooks (a partir de react v16.8) et des fonctions sans utiliser de Classes. Cela permet un code plus concis et la non-utilisation du “this”, qui peut parfois être source d’erreurs quand à sa référence.

Nous avons également utilisé sass avec node-sass pour avoir un css plus lisible, mieux organisé et profiter du stockage de variables.

L’ambiance et l’expérience de jeu étant essentielles au projet nous y avons intégré du webgl. L’utilisation du webgl se fait de plusieurs manières. La première via la librairie Three js directement importée. Ayant fait de nombreux tests auparavant, l’utilisation de la librairie Three js pur et react peut souvent être compliquée et peu optimisée. De nombreux problèmes de rendu peuvent se faire et le système de composant react est moins privilégié. C’est pourquoi nous avons également utilisé react-three-fiber.L’utilisation de cette librairie est bien plus simple et intuitive. De plus, le fonctionnement par composants est mieux optimisé et certaines fonctionnalités de three js comme les shaders, ou simplement la construction de modèles sont moins compliquées à utiliser. L’ajout de hooks spécifiques comme “useFrame”, hooks qui permet de mettre à jour les propriétés de rendu d’un objet 3D,  permettent d’éviter certains problèmes de rendu en optimisant la.performance.

Autre avantages de cette librairie est sa compatibilité avec les librairies react-spring, use-cannon, et react-use-gesture.  Brièvement, use-cannon permet de gérer le système de gravité d’éléments 3D, utilisé dans le mini jeu flight game. React-use-gesture, permet de gérer les controls notamment sur mobile (drag, swipe…). Pour finir, react-spring permet de gérer les animations en étant compatible avec react-three-fiber étant du même créateur. L’ environnement et l’utilisation de ces librairies est similaire, avec une mise en valeur de hooks spécifiques  à chacune d’entres elles.

Pour terminer, la mécanique et le principe de notre jeu convient particulièrement à des utilisateurs mobiles. C’est pourquoi nous avons fonctionné en mobile first et avons mis en place une PWA. 


## React Installation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
