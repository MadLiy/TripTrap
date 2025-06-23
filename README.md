Pour lancer le TP, il faut d'abord installer les dépendances nécessaires. Pour cela, exécutez la commande suivante dans le terminal :

```bash
npm install
```

ensuite il faut crée un fichier `.env` à la racine du projet avec les variables d'environnement nécessaires. Voici un exemple de contenu pour le fichier `.env` :

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/monTP
SECRET_KEY="mysecretkey"
JWT_SECRET="myjwtsecret"
JWT_EXPIRATION="24h"
```
Ensuite, vous pouvez lancer le serveur en utilisant la commande suivante :

```bash
npm run start
```

Enfin vous pouvez accéder à l'application en ouvrant votre navigateur et en vous rendant à l'adresse suivante :

```
http://localhost:3000/api/

```

Pour les test il vous suffit d'exécuter la commande suivante :

```bash
npm test
```