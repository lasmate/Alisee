# Projet Alisee

![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Version](https://img.shields.io/badge/version-v0.0.7-blue?style=for-the-badge)

Ceci est un projet Svelte initialisé avec SvelteKit, utilisant Tailwind CSS pour le style et Drizzle ORM pour les interactions avec la base de données.

## Version Changelog

### v0.0.7 (Décembre 2025)

- ✨ **Système d'authentification complet** : Implémentation de la connexion/déconnexion des utilisateurs
- 🔐 **Gestion des sessions** : Persistance des sessions utilisateur avec sessionStorage
- 👤 **Affichage dynamique de l'utilisateur** : Le nom de l'utilisateur connecté apparaît dans la navbar
- 🎨 **Interface utilisateur adaptive** : La navbar s'adapte automatiquement selon l'état de connexion
- 🛡️ **Contrôle d'accès admin** : Bouton d'administration visible uniquement pour les comptes admin
- 🚀 **Gestion des modales améliorée** : Fermeture automatique des modales après connexion réussie
- 📱 **États de chargement** : Indicateurs visuels et gestion d'erreurs pour l'authentification
- 🗄️ **API d'authentification** : Endpoints sécurisés pour la connexion et déconnexion

### v0.0.6 et versions antérieures

- 🏗️ Configuration initiale du projet avec SvelteKit, Tailwind CSS et Drizzle ORM
- 📊 Interface d'administration pour la gestion des utilisateurs et produits
- 🎨 Système de thèmes (clair/sombre) avec persistance
- 🛒 Fonctionnalités de base du panier d'achat
- 📦 Gestion des produits et images

## Démarrage rapide

### Prérequis

- Node.js (version recommandée par SvelteKit, généralement la dernière LTS)
- npm (ou pnpm/yarn)

### Installation

1. **Cloner le dépôt (si ce n'est pas déjà fait) :**

   ```bash
   # Si vous partez de zéro ou contribuez
   # git clone <repository-url>
   # cd alisee
   ```

2. **Installer les dépendances :**

   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement :**

   Créer un fichier `.env` à la racine du projet et ajouter l'URL de votre base de données :

   ```env
   DATABASE_URL="file:./db.sqlite"
   ```

   Ou pour une base de données Turso/libSQL distante :

   ```env
   DATABASE_URL="libsql://your-database.turso.io"
   TURSO_AUTH_TOKEN="your-auth-token"
   ```

## Développement

Pour démarrer le serveur de développement :

```bash
npm run dev
```

Cela démarrera le serveur de développement SvelteKit, généralement sur `http://localhost:5173`. Le serveur se rechargera automatiquement lorsque vous apporterez des modifications au code.

Pour ouvrir l'application dans un nouvel onglet de navigateur lors du démarrage du serveur :

```bash
npm run dev -- --open
```

## Gestion de la base de données (Drizzle ORM)

Ce projet utilise Drizzle ORM avec une base de données SQLite par défaut (via `libsql`).

### Réinitialisation rapide

Pour plus de commodité, il existe un mini-script `dbump.sh` à la racine du projet qui supprimera le fichier `db.sqlite` existant et relancera le processus d'amorçage complet :

```bash
./dbump.sh
```

1. **Définir votre schéma :**
   Modifier les fichiers de schéma dans `src/lib/server/db/schema/`.

2. **Envoyer les modifications de schéma à la base de données :**
   Cette commande comparera vos fichiers de schéma avec la base de données et appliquera les modifications nécessaires. C'est utile pour le développement, mais utilisez les migrations pour la production.

   ```bash
   npm run db:push
   ```

3. **Créer et appliquer des migrations (recommandé pour la production) :**
   Générer un fichier de migration basé sur les modifications de schéma :

   ```bash
   # Remplacer <migration-name> par un nom descriptif
   npx drizzle-kit generate --name <migration-name>
   ```

   Puis appliquer la migration générée :

   ```bash
   npm run db:migrate
   ```

4. **Amorcer la base de données (idempotent) :**
   Nous maintenons maintenant trois scripts d'amorçage distincts (`seedItem.ts`, `seedUser.ts`, `seedImg.ts`) orchestrés par `seed.ts` pour peupler les éléments, les utilisateurs et les entrées d'image. Chaque script utilise `ON CONFLICT DO NOTHING` et applique des contraintes d'unicité pour éviter les doublons, vous pouvez donc relancer l'amorçage en toute sécurité si nécessaire.

   ```bash
   npm run db:seed
   ```

   Si jamais vous avez besoin de réinitialiser, supprimez ou renommez le fichier `db.sqlite` avant de réamorcer.

5. **Drizzle Studio :**
   Pour ouvrir Drizzle Studio, une interface graphique pour votre base de données :

   ```bash
   npm run db:studio
   ```

## Construction pour la production

Pour créer une version prête pour la production de votre application :

```bash
npm run build
```

Cela affichera la build optimisée dans le répertoire `build` (ou tel que configuré par votre adaptateur SvelteKit).

Vous pouvez prévisualiser la build de production localement avec :

```bash
npm run preview
```

> **Déploiement :** Pour déployer votre application, vous devrez peut-être installer et configurer un [adaptateur](https://kit.svelte.dev/docs/adapters) SvelteKit spécifique à votre environnement de déploiement cible (par exemple, Vercel, Netlify, serveur Node). La configuration actuelle utilise `@sveltejs/adapter-auto` qui tente de détecter l'environnement.

## Qualité du code et tests

1. **Formatage :**
   Pour formater automatiquement votre code à l'aide de Prettier :

   ```bash
   npm run format
   ```

2. **Linting :**
   Pour vérifier les problèmes de style de code et les erreurs potentielles avec ESLint et Prettier :

   ```bash
   npm run lint
   ```

3. **Vérification des types :**
   Pour effectuer une vérification statique des types avec TypeScript :

   ```bash
   npm run check
   ```

   Ou pour exécuter en mode surveillance :

   ```bash
   npm run check:watch
   ```

4. **Tests unitaires :**
   Pour exécuter des tests unitaires à l'aide de Vitest :

   ```bash
   npm run test:unit
   ```

5. **Tests de bout en bout :**
   Pour exécuter des tests de bout en bout à l'aide de Playwright :

   ```bash
   npm run test:e2e
   ```

   Assurez-vous d'installer les navigateurs Playwright si vous ne l'avez pas déjà fait : `npx playwright install`

6. **Exécuter tous les tests :**

   ```bash
   npm run test
   ```

## Scripts disponibles

Voici un résumé des principaux scripts disponibles dans `package.json` :

- `npm run dev` : Démarre le serveur de développement.
- `npm run build` : Construit l'application pour la production.
- `npm run preview` : Prévisualise la build de production localement.
- `npm run check` : Exécute la vérification Svelte et la vérification des types TypeScript.
- `npm run format` : Formate le code avec Prettier.
- `npm run lint` : Linte le code avec ESLint et Prettier.
- `npm run test` : Exécute tous les tests unitaires et e2e.
- `npm run test:unit` : Exécute des tests unitaires avec Vitest.
- `npm run test:e2e` : Exécute des tests de bout en bout avec Playwright.
- `npm run db:push` : Envoie les modifications de schéma à la base de données (développement).
- `npm run db:migrate` : Applique les migrations de base de données.
- `npm run db:studio` : Ouvre Drizzle Studio.
- `npm run db:seed` : Amorce la base de données avec les données initiales.

Se référer à `package.json` pour la liste complète des scripts et leurs configurations.
