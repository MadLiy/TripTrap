# TP Node.js - TripTrap - MadLiy

Une plateforme de réservation de voyages développée avec **Node.js**, **Express**, **MongoDB** et **EJS**.

---

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (local ou Atlas)
- npm
- Postman (pour tester les API)
---

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/MadLiy/TripTrap.git
cd TP-Final
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d\'environnement
Créez un fichier .env à la racine du projet avec les variables suivantes :

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/travelnow # ou votre URI MongoDB Atlas
SECRET_KEY="votre_cle_secrete"
JWT_SECRET="votre_cle_jwt"
JWT_EXPIRATION="24h"
```

### 4. Lancer le serveur

```bash
npm run start
```
### 5. Accéder à l'application
Ouvrez votre navigateur et allez à l'adresse suivante :

```
http://localhost:3000/api/
``` 

### 6. Exécuter les tests
Pour exécuter les tests, utilisez la commande suivante :
```bash
npm test
``` 
## Compte administrateur de test

```
{
  "firstname": "Admin",
  "lastname": "Test",
  "email": "admin@mail.com",
  "password": "azerty",
  "roles": "admin"
}
```
## Identifiants de connexion :
```
Email : admin@mail.com
Password : azerty
```
### 7. Démarrage rapide

1. Copier le template .env.example et adapter les valeurs à votre configuration.
2. Installer les dépendances : npm install
3. Démarrer l'application : npm run start
4. Accéder à http://localhost:3010/api/


### 8. Structure du projet

/controller : Logique métier (contrôleurs)
/model : Schémas Mongoose
/repositories : Accès aux données
/service : Services applicatifs
/views : Templates EJS
/router : Définition des routes
/middleware : Middlewares Express
/validator : Validators express-validator