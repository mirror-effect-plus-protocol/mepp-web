# Rapport d'évaluation des facteurs relatifs à la vie privée (EFVP)

# Plateforme MEPP (Mirror Effect Plus Protocol)

---

**Version** : 1.0
**Date** : Mars 2026
**Responsable du projet** : Professeure Sarah Martineau, École d'orthophonie et d'audiologie, Université de Montréal
**Référence légale** : Loi sur la protection des renseignements personnels dans le secteur privé (« Loi sur le privé »), telle que modifiée par la Loi modernisant des dispositions législatives en matière de protection des renseignements personnels (Loi 25)
**Situation applicable** : Situation 2 — Acquisition, développement ou refonte d'un système d'information ou de prestation électronique de services impliquant des renseignements personnels (art. 3.3 de la Loi sur le privé)

---

## Section récapitulative

| Élément | Détail |
|---------|--------|
| Nom du projet | MEPP — Mirror Effect Plus Protocol |
| Nature | Plateforme web et mobile de rééducation de la paralysie faciale |
| Responsable | Professeure Sarah Martineau, UdeM |
| Responsable de la protection des RP | *À nommer* |
| Raison de l'EFVP | Refonte du système d'information (mise à jour Django 5.2, ajout bannière de cookies, mécanisme d'anonymisation) — art. 3.3 Loi sur le privé |
| Date de début du projet | 2021 (développement initial) |
| Date de la refonte | Mars 2026 |
| Renseignements personnels impliqués | Oui — données d'identification, données de santé |

---

## 1. Description du projet et de ses finalités

### 1.1 Présentation du projet

MEPP est une plateforme de rééducation de la paralysie faciale qui guide les patients et les cliniciens dans le processus de réhabilitation, à l'aide de l'effet miroir et des principes d'apprentissage moteur.

La plateforme comprend :
- Un **site web pour les cliniciens** : gestion des patients, création de plans de traitement personnalisés, suivi de la progression, export de données de recherche
- Un **site web pour les patients** : exécution d'exercices de rééducation avec miroir augmenté (technologie DeepAR)
- Une **application iOS** réservée aux patients

Le projet a été développé par la professeure Sarah Martineau et son équipe, avec le soutien de l'Université de Montréal, du CIUSSS de l'Est-de-l'Île-de-Montréal et du CIUSSS du Nord-de-l'Île-de-Montréal.

### 1.2 Objectifs du projet

1. Offrir un outil de rééducation de la paralysie faciale accessible à distance
2. Permettre aux cliniciens de personnaliser les exercices selon le profil de chaque patient (côté de la paralysie, préférences audio/vidéo)
3. Assurer le suivi de la progression des patients par leurs cliniciens
4. Collecter des données de progression à des fins de recherche scientifique, sous forme dé-identifiée
5. Améliorer les approches de rééducation de la paralysie faciale et leur efficacité

### 1.3 Nécessité et proportionnalité

**Nécessité** : La collecte de renseignements personnels est nécessaire pour :
- **Identifier le patient** (nom, courriel) : indispensable pour l'authentification et la communication clinicien-patient
- **Déterminer le côté de la paralysie** (donnée de santé) : indispensable pour configurer correctement les exercices de rééducation et le miroir augmenté
- **Enregistrer la progression** (sessions, exercices) : indispensable pour le suivi clinique et l'adaptation du plan de traitement

**Proportionnalité** : La collecte est limitée au strict nécessaire :
- Aucune donnée biométrique n'est stockée (le miroir AR fonctionne en temps réel côté client, aucune image n'est transmise au serveur)
- Aucune vidéo du patient n'est enregistrée ou stockée
- Aucune adresse physique, numéro de téléphone ou identifiant gouvernemental n'est collecté
- Aucune donnée n'est transmise à des tiers (pas d'analytics externes, pas de publicité)

### 1.4 Contexte de la présente EFVP

Cette EFVP est réalisée dans le cadre d'une refonte du système d'information comprenant :
- La mise à jour du framework backend (Django 5.2)
- L'ajout d'une bannière de consentement aux cookies
- L'implémentation d'un mécanisme d'anonymisation des comptes (droit de suppression)
- La mise à jour de la politique de confidentialité pour conformité à la Loi 25

---

## 2. Objet de l'évaluation et rôles

### 2.1 Objet de l'évaluation

L'évaluation porte sur l'ensemble de la plateforme MEPP, incluant :
- La collecte et le traitement des renseignements personnels des patients et des cliniciens
- Les flux de données (collecte, stockage, accès, transmission, conservation, suppression)
- Les mesures de sécurité techniques et organisationnelles
- La conformité aux obligations de la Loi sur le privé telle que modifiée par la Loi 25

### 2.2 Rôles et responsabilités

| Rôle | Personne | Responsabilité |
|------|----------|----------------|
| Responsable du projet | Professeure Sarah Martineau | Décisions relatives au projet, validation du rapport EFVP |
| Responsable de la protection des RP | *À nommer (obligation Loi 25)* | Supervision de la conformité, point de contact pour les personnes concernées |
| Développeur | Hugo Platret (freelance) | Implémentation des mesures techniques, rédaction du support technique EFVP |
| Cliniciens | Utilisateurs staff | Création des comptes patients, gestion des plans de traitement |

---

## 3. Inventaire des renseignements personnels

### 3.1 Renseignements collectés

#### Données d'identification

| Donnée | Finalité | Sensibilité | Obligatoire |
|--------|----------|-------------|-------------|
| Prénom | Identification dans l'interface | Élevée | Oui |
| Nom de famille | Identification dans l'interface | Élevée | Oui |
| Adresse courriel | Authentification, communication | Élevée | Oui |
| Mot de passe (hash bcrypt) | Authentification | N/A (hash irréversible) | Oui |

#### Données de santé

| Donnée | Finalité | Sensibilité | Obligatoire |
|--------|----------|-------------|-------------|
| Côté de la paralysie faciale (gauche/droit) | Configuration des exercices et du miroir AR | **Très élevée** | Oui |
| Sessions d'exercices (contenu, statut, progression) | Suivi clinique | Moyenne | Automatique |
| Plans de traitement (exercices prescrits, durées) | Personnalisation de la rééducation | Moyenne | Créé par le clinicien |

#### Données de préférence et de configuration

| Donnée | Finalité | Sensibilité | Obligatoire |
|--------|----------|-------------|-------------|
| Langue | Personnalisation de l'interface | Faible | Oui |
| Préférence audio | Configuration des exercices | Faible | Non |
| Mode vidéo uniquement | Configuration des exercices | Faible | Non |
| Paramètres miroir (position, rotation, échelle) | Calibration du miroir AR | Faible | Automatique |

#### Données techniques et métadonnées

| Donnée | Finalité | Sensibilité | Obligatoire |
|--------|----------|-------------|-------------|
| Date de création du compte | Gestion du cycle de vie | Faible | Automatique |
| Date de dernière connexion | Sécurité, politique de rétention | Faible | Automatique |
| Actions effectuées (login, pause, complétion) | Suivi de progression | Faible | Automatique |
| Agent utilisateur (navigateur) | Diagnostic technique, compatibilité | Faible | Automatique |
| Jeton d'authentification | Authentification API | Élevée | Automatique |

### 3.2 Données NON collectées

Il est important de noter que MEPP **ne collecte pas** :
- De données biométriques (le miroir AR fonctionne en temps réel côté client uniquement)
- De vidéos ou photos du patient
- D'adresse physique ou numéro de téléphone
- De numéro d'assurance sociale ou identifiant gouvernemental
- De données de géolocalisation
- De données de navigation à des fins publicitaires

### 3.3 Regroupement par sensibilité

| Niveau | Données | Justification |
|--------|---------|---------------|
| **Très élevé** | Côté de la paralysie | Renseignement de santé au sens de la loi |
| **Élevé** | Nom, prénom, courriel, jetons | Permettent l'identification directe |
| **Moyen** | Sessions, plans de traitement | Données cliniques liées à un patient identifiable |
| **Faible** | Langue, préférences, métadonnées | Ne permettent pas l'identification à elles seules |

---

## 4. Parcours des renseignements personnels

### 4.1 Points de collecte

| Point de collecte | Données collectées | Qui collecte | Comment |
|--------------------|--------------------|--------------|---------|
| Création de compte patient | Nom, prénom, courriel, côté paralysie, langue | Le clinicien | Via l'interface d'administration (react-admin) |
| Inscription iOS | Nom, prénom, courriel, côté paralysie | Le patient | Via l'application iOS (self-service) |
| Connexion | Identifiants (courriel/mot de passe) | Le patient | Via le formulaire de connexion |
| Session d'exercice | Actions (début, pause, complétion, saut), agent utilisateur | Le système | Automatiquement lors de l'utilisation |
| Calibration miroir | Paramètres du miroir (position, rotation, échelle) | Le patient | Via l'interface miroir |

**Note importante** : Sur le site web, les patients ne peuvent pas s'inscrire eux-mêmes. Le compte est créé par le clinicien responsable. L'inscription self-service est uniquement disponible via l'application iOS.

### 4.2 Stockage

| Élément | Détail |
|---------|--------|
| Base de données | PostgreSQL |
| Localisation | Serveur AWS, région `ca-central-1` (Montréal, Canada) |
| Chiffrement au repos | Géré par l'infrastructure AWS (chiffrement EBS) |
| Sauvegardes | Gérées par l'infrastructure AWS |
| Accès physique | Aucun — serveurs infonuagiques uniquement |

Les renseignements personnels ne sont **jamais stockés à l'extérieur du Canada**.

### 4.3 Accès

| Rôle | Périmètre d'accès | Mécanisme de contrôle |
|------|--------------------|-----------------------|
| Patient | Ses propres données uniquement (profil, sessions, exercices) | Jeton d'authentification, permission `MeppMirrorPermission` |
| Clinicien | Ses patients uniquement + exercices/plans qu'il a créés + modèles système | Jeton d'authentification, permission `MeppAPIPermission`, filtrage par clinicien |
| Superutilisateur (admin) | Toutes les données | Jeton d'authentification, permission superutilisateur |
| Développeur | Accès au serveur pour maintenance | Clé SSH privée uniquement, pas de mot de passe |

**Isolation des données** : Un clinicien ne peut en aucun cas accéder aux patients d'un autre clinicien. Cette isolation est appliquée au niveau de la base de données (filtrage systématique des requêtes).

### 4.4 Transmission

- **Protocole** : Toutes les communications sont chiffrées via HTTPS/TLS (certificat Let's Encrypt)
- **API** : Architecture REST, authentification par jeton expirant transmis dans l'en-tête HTTP `Authorization`
- **Aucune transmission à des tiers** : Les données ne sont transmises à aucun service externe (pas d'analytics, pas de publicité, pas de sous-traitant)
- **Aucune donnée sensible dans les URL** : Les paramètres sensibles sont transmis dans le corps des requêtes, jamais dans les URL

### 4.5 Conservation

| Type de donnée | Durée de conservation | Mécanisme |
|----------------|----------------------|-----------|
| Compte patient actif | Tant que le compte est actif | — |
| Compte patient inactif | 5 ans après la dernière connexion | Politique documentée dans la politique de confidentialité |
| Sessions et journaux | Conservés sous forme dé-identifiée après anonymisation du compte | Mécanisme d'anonymisation |
| Jetons d'authentification | 14 jours (renouvelés à chaque connexion) | Expiration automatique |
| Jetons miroir | 30 minutes | Expiration automatique |
| Jetons d'export | 15 secondes | Expiration automatique |

### 4.6 Suppression et anonymisation

Le mécanisme d'anonymisation permet la suppression des renseignements personnels tout en préservant les données de recherche sous forme dé-identifiée :

1. Les données d'identification (nom, prénom, courriel) sont remplacées par des valeurs irréversibles (hash cryptographique)
2. Les données de santé directes (côté de la paralysie) sont supprimées
3. Les paramètres de configuration (miroir, préférences) sont supprimés
4. Le lien avec le clinicien est supprimé
5. Le mot de passe est rendu inutilisable
6. Tous les jetons d'authentification sont supprimés
7. Le compte est archivé (connexion impossible)
8. Les sessions et journaux sont conservés mais ne peuvent plus être associés à une personne identifiable

Ce mécanisme est accessible :
- Par le clinicien du patient ou un administrateur (via l'API)
- Par le patient lui-même (self-service avec vérification du mot de passe)

---

## 5. Obligations applicables

### 5.1 Obligations provinciales

| Obligation | Référence | Statut |
|------------|-----------|--------|
| Nommer un responsable de la protection des RP | Art. 3.1 Loi sur le privé | **À faire** |
| Réaliser une EFVP pour tout système d'information impliquant des RP | Art. 3.3 Loi sur le privé | **Présent document** |
| Obtenir le consentement pour la collecte | Art. 8 et 8.1 Loi sur le privé | Conforme (consentement implicite via politique + bannière cookies) |
| Limiter la collecte au nécessaire | Art. 5 Loi sur le privé | Conforme (voir section 1.3) |
| Assurer la sécurité des RP | Art. 10 Loi sur le privé | Conforme (voir section 6) |
| Permettre l'accès et la rectification | Art. 27 et 28 Loi sur le privé | Conforme (via profil utilisateur et contact) |
| Permettre la suppression / désindexation | Art. 28.3 Loi sur le privé | Conforme (mécanisme d'anonymisation) |
| Aviser la CAI et les personnes en cas d'incident | Art. 3.5 Loi sur le privé | **Procédure à documenter** |
| Conserver un registre des incidents | Art. 3.8 Loi sur le privé | **À mettre en place** |
| Politique de confidentialité publiée | Art. 8.2 Loi sur le privé | Conforme (page Vie privée en 6 langues) |
| Ne pas communiquer les RP à l'extérieur du Québec sans EFVP | Art. 17 Loi sur le privé | Non applicable (données hébergées au Canada, pas de transfert) |

### 5.2 Normes et bonnes pratiques

| Norme | Application |
|-------|-------------|
| Chiffrement en transit (TLS) | Appliqué (HTTPS obligatoire) |
| Hachage des mots de passe | Appliqué (bcrypt) |
| Principe du moindre privilège | Appliqué (isolation par clinicien, permissions granulaires) |
| Minimisation des données | Appliqué (pas de collecte superflue) |

---

## 6. Évaluation des risques et stratégies d'atténuation

### 6.1 Risques identifiés

| # | Risque | Description | Probabilité | Impact | Niveau initial |
|---|--------|-------------|-------------|--------|----------------|
| R1 | Accès non autorisé aux données patients | Un utilisateur accède aux données d'un patient qui n'est pas le sien | Faible | Élevé | **Moyen** |
| R2 | Interception de données en transit | Un tiers intercepte les communications entre le client et le serveur | Faible | Élevé | **Moyen** |
| R3 | Conservation excessive | Des données sont conservées au-delà de la durée nécessaire | Moyenne | Moyen | **Moyen** |
| R4 | Accès non autorisé au serveur | Un tiers obtient un accès au serveur de production | Faible | Très élevé | **Moyen** |
| R5 | Perte de données | Les données sont perdues suite à une défaillance technique | Faible | Élevé | **Moyen** |
| R6 | Ré-identification de données de recherche | Les données dé-identifiées sont croisées pour identifier un patient | Très faible | Moyen | **Faible** |
| R7 | Incident de confidentialité non détecté | Un incident survient sans être détecté ni signalé | Faible | Très élevé | **Élevé** |

### 6.2 Stratégies d'atténuation et risques résiduels

| # | Risque | Mesures en place | Niveau résiduel |
|---|--------|------------------|-----------------|
| R1 | Accès non autorisé | Jetons expirables (14 jours), permissions granulaires par rôle, isolation stricte par clinicien au niveau du filtrage des requêtes, protection CSRF | **Faible** |
| R2 | Interception réseau | HTTPS/TLS obligatoire sur tous les environnements, jetons transmis uniquement dans les en-têtes HTTP, aucune donnée sensible dans les URL | **Faible** |
| R3 | Conservation excessive | Politique de rétention de 5 ans documentée dans la politique de confidentialité, mécanisme d'anonymisation opérationnel, jetons à durée de vie limitée (14j / 30min / 15s) | **Faible** |
| R4 | Accès serveur | Accès SSH par clé privée uniquement (pas de mot de passe), serveurs AWS avec sécurité gérée, aucun accès physique possible | **Faible** |
| R5 | Perte de données | Sauvegardes AWS automatiques, conteneurisation Docker (reconstruction rapide), infrastructure déclarative reproductible | **Faible** |
| R6 | Ré-identification | Après anonymisation : hash irréversible, suppression du côté de la paralysie et du lien clinicien, pas de données croisables permettant la ré-identification | **Très faible** |
| R7 | Incident non détecté | **Risque résiduel élevé** — Aucun système de détection d'incident n'est en place. Voir le plan d'action. | **Moyen** |

### 6.3 Réévaluation de la nécessité et de la proportionnalité

Au terme de l'analyse des risques, les stratégies d'atténuation en place réduisent les risques à un niveau acceptable pour tous les risques identifiés, à l'exception du risque R7 (incident non détecté) qui fait l'objet d'une action au plan d'action.

Le projet demeure nécessaire et proportionné : les données collectées sont limitées au strict minimum requis pour la rééducation de la paralysie faciale, et les mesures de sécurité sont adaptées à la sensibilité des données traitées.

---

## 7. Mesures de sécurité détaillées

### 7.1 Authentification

| Mesure | Détail |
|--------|--------|
| Type | Jeton expirant (implémentation personnalisée) |
| Durée de vie du jeton authentifié | 14 jours (renouvelé à chaque connexion) |
| Durée de vie du jeton miroir | 30 minutes |
| Durée de vie du jeton d'export | 15 secondes |
| Validation du mot de passe | Règles de complexité configurables |
| Hachage du mot de passe | bcrypt (standard Django) |

### 7.2 Autorisations

| Niveau | Mécanisme | Description |
|--------|-----------|-------------|
| API globale | `MeppAPIPermission` | Accès réservé aux cliniciens (staff). Au niveau de l'objet : seul le clinicien du patient ou un superutilisateur peut accéder/modifier |
| Profil clinicien | `MeppStaffProfilePermission` | Un clinicien ne peut voir/modifier que son propre profil. Les superutilisateurs peuvent tout voir |
| Miroir patient | `MeppMirrorPermission` | Le patient n'accède qu'à ses propres données miroir |
| Paramètres miroir | `MeppMirrorSettingPermission` | Le patient ne modifie que ses propres paramètres |
| Export | `MeppExportPermission` | Export via jeton temporaire à usage unique (15 secondes) |

### 7.3 Sécurité applicative

| Mesure | Détail |
|--------|--------|
| Protection CSRF | Middleware Django activé |
| En-têtes de sécurité HTTP | SecurityMiddleware activé |
| Protection clickjacking | X-Frame-Options via middleware |
| Blocage versions obsolètes | Middleware bloquant les versions iOS non supportées |
| Validation des entrées | Sérialiseurs Django REST Framework avec validation des types et des contraintes |

### 7.4 Infrastructure

| Élément | Détail |
|---------|--------|
| Hébergement | AWS ca-central-1 (Montréal, Canada) |
| Protocole | HTTPS obligatoire (certificat Let's Encrypt) |
| Conteneurisation | Docker + Docker Compose |
| Serveur web | Nginx (proxy inverse) + uWSGI |
| Accès serveur | SSH avec clé privée uniquement, aucun accès par mot de passe |

---

## 8. Droits des personnes concernées

| Droit | Mécanisme | Statut |
|-------|-----------|--------|
| **Accès** | Le patient peut consulter ses données via son profil dans l'interface web. Il peut également en faire la demande par courriel. | Conforme |
| **Rectification** | Le patient peut modifier certaines données via son profil (langue, préférences). Pour les autres modifications, il peut contacter son clinicien ou le responsable. | Conforme |
| **Suppression / Anonymisation** | Mécanisme d'anonymisation irréversible disponible via l'API. Accessible par le clinicien, l'administrateur, ou le patient lui-même (self-service avec vérification du mot de passe). | Conforme |
| **Portabilité** | Le patient peut demander l'export de ses données en contactant le responsable. | Partiellement conforme (processus manuel) |
| **Retrait du consentement** | Le patient peut retirer son consentement aux cookies via la bannière de consentement, et demander l'anonymisation de son compte. | Conforme |
| **Plainte** | Le patient peut déposer une plainte auprès de la Commission d'accès à l'information du Québec (CAI). Les coordonnées sont publiées dans la politique de confidentialité. | Conforme |

---

## 9. Plan d'action

| # | Action | Responsable | Priorité | Échéancier |
|---|--------|-------------|----------|------------|
| A1 | **Nommer un responsable de la protection des renseignements personnels** | Sarah Martineau | Obligatoire | Immédiat |
| A2 | **Documenter une procédure de gestion des incidents de confidentialité** (détection, évaluation, notification CAI dans les 72h, notification des personnes concernées) | Sarah Martineau + Hugo Platret | Obligatoire | Avril 2026 |
| A3 | **Mettre en place un registre des incidents de confidentialité** | Sarah Martineau | Obligatoire | Avril 2026 |
| A4 | **Former les cliniciens** à la protection des renseignements personnels et à la procédure d'anonymisation | Sarah Martineau | Recommandé | Juin 2026 |
| A5 | **Implémenter l'export automatisé des données personnelles** (portabilité via API) | Hugo Platret | Recommandé | Selon budget |
| A6 | **Automatiser la purge des comptes inactifs** après 5 ans | Hugo Platret | Recommandé | Selon budget |
| A7 | **Mettre en place une journalisation d'audit** (qui accède à quel dossier et quand) | Hugo Platret | Optionnel | Selon budget |

---

## 10. Conclusion

La plateforme MEPP collecte un ensemble limité de renseignements personnels, dont certains sont sensibles (données de santé relatives à la paralysie faciale). L'analyse démontre que cette collecte est nécessaire et proportionnée aux finalités du projet.

Les mesures de sécurité en place — authentification par jeton expirant, permissions granulaires avec isolation par clinicien, chiffrement en transit, hébergement au Canada — offrent un niveau de protection adapté à la sensibilité des données traitées.

Le mécanisme d'anonymisation implémenté répond au droit de suppression exigé par la Loi 25, tout en préservant les données de recherche sous forme dé-identifiée.

Les risques résiduels sont acceptables, à l'exception de la gestion des incidents de confidentialité qui nécessite la mise en place d'une procédure formelle (action A2) et d'un registre (action A3).

Les actions prioritaires identifiées sont la nomination d'un responsable de la protection des renseignements personnels et la documentation d'une procédure de gestion des incidents.

---

*Ce rapport a été préparé conformément au guide d'accompagnement de la Commission d'accès à l'information du Québec (CAI), version 3.1 — Avril 2024, dans le cadre de la conformité à la Loi sur la protection des renseignements personnels dans le secteur privé, telle que modifiée par la Loi 25.*
