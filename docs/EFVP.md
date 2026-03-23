# Evaluation des Facteurs relatifs a la Vie Privee (EFVP) — MEPP

**Projet** : MEPP (Mirror Effect Plus Protocol)
**Version** : 1.0
**Date** : Mars 2026
**Responsable du projet** : Professeure Sarah Martineau, Ecole d'orthophonie et d'audiologie, Universite de Montreal
**Cadre legal** : Loi sur la protection des renseignements personnels dans le secteur prive (Loi 25), Quebec

---

## 1. Description du projet

### 1.1 Presentation

MEPP est une plateforme web de reeducation de la paralysie faciale. Elle guide les patients et les cliniciens dans le processus de rehabilitation, a l'aide de l'effet miroir et des principes d'apprentissage moteur.

La plateforme comprend :
- Un **site web** pour les cliniciens (gestion des patients, creation de plans de traitement, suivi de progression)
- Un **site web** pour les patients (execution d'exercices avec miroir augmente via DeepAR)
- Une **application iOS** (reservee aux patients)

### 1.2 Contexte et objectifs

- Offrir un outil de reeducation accessible a distance
- Permettre aux cliniciens de personnaliser les exercices selon le profil de chaque patient
- Collecter des donnees de progression a des fins de recherche scientifique (sous forme de-identifiee)
- Ameliorer les approches de reeducation de la paralysie faciale

### 1.3 Parties prenantes

| Role | Description |
|------|-------------|
| Responsable du projet | Professeure Sarah Martineau, UdeM |
| Equipe de developpement | Developpeur freelance |
| Cliniciens | Utilisateurs staff qui gerent les patients |
| Patients | Utilisateurs qui effectuent les exercices |
| Hebergeur | AWS (region ca-central-1, Canada) |

### 1.4 Stack technique

| Composant | Technologie |
|-----------|-------------|
| Backend | Django 5.2, Django REST Framework |
| Frontend | React, Material UI, react-admin |
| Base de donnees | PostgreSQL |
| Serveur web | Nginx, uWSGI |
| Conteneurisation | Docker, Docker Compose |
| Realite augmentee | DeepAR |

### 1.5 Environnements

| Environnement | URL | Hebergement |
|---------------|-----|-------------|
| Staging | staging.mirroreffectplus.org | AWS ca-central-1 (Canada) |
| Production | mirroreffectplus.org | AWS ca-central-1 (Canada) |

---

## 2. Inventaire des renseignements personnels

### 2.1 Donnees collectees

| Modele | Champ | Type de RP | Finalite | Sensibilite |
|--------|-------|------------|----------|-------------|
| User | first_name | Identifiant | Identification dans l'interface | Elevee |
| User | last_name | Identifiant | Identification dans l'interface | Elevee |
| User | email / username | Identifiant | Authentification, communication | Elevee |
| User | password (hash bcrypt) | Credential | Authentification | N/A (hash irreversible) |
| User | language | Preference | Personnalisation de l'interface | Faible |
| User | side | Donnee de sante | Cote de la paralysie faciale (gauche/droit) | **Tres elevee** |
| User | use_audio | Preference | Configuration des exercices | Faible |
| User | use_video_only | Preference | Configuration des exercices | Faible |
| User | mirror_settings | Configuration | Calibration du miroir AR (position, rotation, echelle) | Faible |
| User | date_joined | Metadonnee | Gestion du cycle de vie du compte | Faible |
| User | last_login | Metadonnee | Securite, politique de retention | Faible |
| Session | patient (FK) | Lien identifiant | Association patient-session | Elevee |
| Session | exercises (JSON) | Donnee de sante indirecte | Contenu et statut des exercices realises | Moyenne |
| Session | status, timestamps | Metadonnee | Suivi de progression | Faible |
| Log | session (FK) | Lien identifiant | Tracabilite des actions | Moyenne |
| Log | action | Metadonnee | Type d'action effectuee (login, start, pause, etc.) | Faible |
| Log | user_agent | Donnee technique | Diagnostic, compatibilite navigateur | Faible |
| TreatmentPlan | patient (FK) | Lien identifiant | Association plan-patient | Elevee |
| TreatmentPlan | clinician (FK) | Lien identifiant | Association plan-clinicien | Elevee |
| TreatmentPlan | exercises, dates | Donnee clinique | Contenu du plan de traitement | Moyenne |
| ExpiringToken | user (FK), key | Credential | Authentification API | Elevee |

### 2.2 Donnees sensibles

Les donnees suivantes sont considerees comme **sensibles** au sens de la Loi 25 :
- **side** (cote de la paralysie) : renseignement de sante
- **exercises/sessions** : donnees de progression clinique

### 2.3 Donnees NON collectees

- Aucune donnee biometrique n'est stockee (le miroir AR fonctionne en temps reel cote client)
- Aucune video n'est enregistree ou stockee
- Aucune adresse physique
- Aucun numero de telephone
- Aucun numero d'assurance sociale ou identifiant gouvernemental

---

## 3. Cartographie des flux de donnees

### 3.1 Collecte

| Point de collecte | Donnees collectees | Qui collecte |
|--------------------|--------------------|--------------|
| Creation de compte patient | Nom, prenom, courriel, cote paralysie, langue | Le clinicien (via l'interface admin) |
| Connexion | Identifiants (email/mot de passe) | Le patient |
| Session d'exercice | Actions (start, pause, done, skip), user_agent | Le systeme automatiquement |
| Calibration miroir | mirror_settings (position, rotation, echelle) | Le patient (via l'interface miroir) |

**Note** : Les patients ne peuvent pas s'inscrire eux-memes sur le site web. Le compte est cree par le clinicien. L'inscription self-service est uniquement disponible via l'application iOS.

### 3.2 Stockage

- **Localisation** : Base de donnees PostgreSQL sur serveur AWS, region `ca-central-1` (Montreal, Canada)
- **Chiffrement au repos** : Gere par l'infrastructure AWS (EBS encryption)
- **Sauvegardes** : Geres par l'infrastructure AWS
- **Acces physique** : Aucun acces physique direct — serveurs cloud uniquement

### 3.3 Acces

| Role | Perimetre d'acces |
|------|-------------------|
| Patient | Ses propres donnees uniquement (profil, sessions, exercices via miroir) |
| Clinicien | Ses patients uniquement + exercices/plans qu'il a crees + templates systeme |
| Superutilisateur (admin) | Toutes les donnees |
| Developpeur | Acces SSH au serveur (cle privee) — uniquement pour maintenance |

### 3.4 Transmission

- **Protocole** : HTTPS uniquement (TLS, certificat Let's Encrypt)
- **API** : REST, authentification par token expirant
- **Aucune transmission a des tiers** : Pas d'analytics externes, pas de publicite, pas de partage de donnees

### 3.5 Conservation et suppression

| Type de donnee | Duree de conservation | Mecanisme |
|----------------|----------------------|-----------|
| Compte patient actif | Tant que le compte est actif | — |
| Compte patient inactif | 5 ans apres la derniere connexion | Politique documentee |
| Sessions et logs | Conserves sous forme de-identifiee apres anonymisation | Anonymisation du compte patient |
| Tokens d'authentification | TTL de 14 jours (renouveles a chaque connexion) | Expiration automatique |
| Tokens miroir | TTL de 30 minutes | Expiration automatique |

---

## 4. Analyse des risques

### 4.1 Risques identifies

| # | Risque | Probabilite | Impact | Niveau initial |
|---|--------|-------------|--------|----------------|
| R1 | Acces non autorise aux donnees patients | Faible | Eleve | Moyen |
| R2 | Fuite de donnees par interception reseau | Faible | Eleve | Moyen |
| R3 | Conservation excessive de donnees | Moyenne | Moyen | Moyen |
| R4 | Acces non autorise au serveur | Faible | Tres eleve | Moyen |
| R5 | Perte de donnees | Faible | Eleve | Moyen |
| R6 | Utilisation abusive des donnees de recherche | Tres faible | Moyen | Faible |

### 4.2 Mesures d'attenuation

| # | Risque | Mesures en place | Niveau residuel |
|---|--------|------------------|-----------------|
| R1 | Acces non autorise | Tokens expirables, permissions DRF granulaires, isolation par clinicien | Faible |
| R2 | Interception reseau | HTTPS obligatoire, tokens a duree de vie limitee | Faible |
| R3 | Conservation excessive | Politique de retention de 5 ans, mecanisme d'anonymisation | Faible |
| R4 | Acces serveur | Cle SSH privee, pas de mot de passe, acces restreint | Faible |
| R5 | Perte de donnees | Sauvegardes AWS, conteneurisation Docker | Faible |
| R6 | Utilisation abusive recherche | Donnees de-identifiees, pas de re-identification possible apres anonymisation | Tres faible |

---

## 5. Mesures de securite en place

### 5.1 Authentification

| Mesure | Detail |
|--------|--------|
| Type | Token expirant (custom `ExpiringTokenAuthentication`) |
| TTL token authentifie | 14 jours (renouvele a chaque connexion) |
| TTL token miroir | 30 minutes |
| TTL token export | 15 secondes |
| Validation mot de passe | `MeppPasswordValidator` (regles de complexite configurables) |
| Hashage mot de passe | bcrypt (defaut Django) |

### 5.2 Autorisations (permissions DRF)

| Permission | Description |
|------------|-------------|
| `MeppAPIPermission` | Acces reserve aux staff. Object-level : clinicien du patient ou superuser |
| `MeppStaffProfilePermission` | Superuser ou self uniquement |
| `MeppMirrorPermission` | Patient accede a ses propres donnees miroir uniquement |
| `MeppMirrorSettingPermission` | Patient modifie ses propres settings miroir uniquement |
| `MeppExportPermission` | Export via token temporaire |

### 5.3 Middleware de securite

| Middleware | Fonction |
|------------|----------|
| `SecurityMiddleware` | En-tetes de securite HTTP |
| `CsrfViewMiddleware` | Protection CSRF |
| `XFrameOptionsMiddleware` | Protection clickjacking |
| `BlockOldIOSUserAgentMiddleware` | Blocage des versions iOS obsoletes |

### 5.4 Infrastructure

| Element | Detail |
|---------|--------|
| Hebergement | AWS ca-central-1 (Montreal, Canada) |
| Protocole | HTTPS (Let's Encrypt) |
| Conteneurisation | Docker + Docker Compose |
| Serveur web | Nginx (reverse proxy) + uWSGI |
| Acces serveur | SSH avec cle privee uniquement |

### 5.5 Donnees en transit

- Toutes les communications client-serveur sont chiffrees via HTTPS/TLS
- Les tokens d'authentification sont transmis dans l'en-tete `Authorization`
- Aucune donnee sensible n'est transmise via les parametres d'URL

---

## 6. Droits des personnes concernees

| Droit | Mecanisme |
|-------|-----------|
| Acces | Via le profil utilisateur (interface web) + sur demande par courriel |
| Rectification | Via le profil utilisateur (interface web) |
| Suppression / Anonymisation | Endpoint API : clinicien ou patient (self-service avec mot de passe). Les PII sont remplaces par des valeurs irreversibles. Les sessions/logs sont conserves sous forme de-identifiee. |
| Portabilite | *A implementer* — export JSON des donnees personnelles |
| Retrait du consentement | Possible via la banniere de cookies et par contact direct |
| Plainte | Aupres de la Commission d'acces a l'information du Quebec (CAI) |

---

## 7. Recommandations

### 7.1 Actions a court terme

- [ ] **Nommer formellement un responsable de la protection des renseignements personnels** (obligation Loi 25)
- [ ] **Definir les durees de conservation** pour chaque type de donnee (actuellement : 5 ans apres derniere connexion pour tous les types)
- [ ] **Definir une procedure de gestion des incidents** (notification CAI dans les 72 heures, notification des personnes concernees)

### 7.2 Actions a moyen terme

- [ ] **Implementer l'export de donnees personnelles** (portabilite — endpoint API retournant un JSON avec toutes les donnees du patient)
- [ ] **Automatiser la purge des comptes inactifs** (script cron supprimant/anonymisant les comptes inactifs depuis plus de 5 ans)
- [ ] **Former les cliniciens** a la protection des renseignements personnels et a l'utilisation du mecanisme d'anonymisation

### 7.3 Actions a long terme

- [ ] **Journalisation d'audit** (qui accede a quel dossier patient et quand)
- [ ] **Chiffrement au niveau applicatif** des donnees sensibles (champ `side`)

---

## 8. Conclusion

MEPP collecte un ensemble limite de renseignements personnels, dont certains sont sensibles (donnees de sante). Les mesures de securite en place (authentification par token, permissions granulaires, HTTPS, hebergement au Canada) offrent un niveau de protection adequat.

Le mecanisme d'anonymisation permet de repondre au droit de suppression exige par la Loi 25, tout en preservant les donnees de recherche sous forme de-identifiee.

Les principales recommandations portent sur la nomination d'un responsable de la protection des renseignements personnels, la definition d'une procedure de gestion des incidents, et l'implementation de la portabilite des donnees.

---

*Document prepare dans le cadre de la conformite a la Loi 25 du Quebec, selon le guide d'accompagnement de la Commission d'acces a l'information (CAI), version 3.1 — Avril 2024.*
