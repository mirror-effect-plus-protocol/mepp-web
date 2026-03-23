# Rapport d'évaluation des facteurs relatifs à la vie privée

## Plateforme MEPP (Mirror Effect Plus Protocol)

**Organisation** : Université de Montréal — École d'orthophonie et d'audiologie

**Date du document** : Mars 2026

**Dernière révision** : Mars 2026

---

## Résumé de l'évaluation

### Identification du responsable de l'évaluation

| | |
|---|---|
| **Nom du responsable** | Professeure Sarah Martineau |
| **Titre** | Responsable de la protection des renseignements personnels |
| **Organisation** | École d'orthophonie et d'audiologie, Université de Montréal |
| **Coordonnées** | sarah.martineau.2@umontreal.ca — 514 343-7645 |

### Autres personnes impliquées dans l'évaluation

| Nom | Titre | Organisation |
|-----|-------|--------------|
| Hugo Platret | Développeur | Freelance |

### Description du projet

| | |
|---|---|
| **Description sommaire** | Plateforme web et mobile de rééducation de la paralysie faciale à l'aide de l'effet miroir et des principes d'apprentissage moteur |
| **Date de début du projet** | 2021 |
| **Durée prévue** | Projet permanent (plateforme en exploitation continue) |
| **Le projet implique des renseignements personnels** | Oui |

### Résumé de l'évaluation des facteurs relatifs à la vie privée

| Élément | Statut | Réf. |
|---------|--------|------|
| Le projet implique la réalisation obligatoire d'une EFVP en vertu d'une loi | Oui — art. 3.3 de la Loi sur le privé (système d'information impliquant des RP) | |
| Le projet, ses objectifs et l'objet de l'EFVP ont été définis | Oui | § 1 |
| L'inventaire des renseignements personnels et leur parcours ont été réalisés | Oui | § 3 |
| L'ampleur de l'évaluation est proportionnelle à la sensibilité, à la finalité, à la quantité, à la répartition et au support des RP | Oui | § 3 |
| Les acteurs pertinents ont été impliqués et les rôles précisés | Oui | § 2 |
| L'organisation s'est assurée de respecter les obligations et principes de protection des RP | Oui | § 4 |
| L'organisation a identifié les risques, ciblé leurs causes et évalué leur probabilité et conséquences | Oui | § 5 |
| L'organisation a prévu des stratégies pour éviter ou réduire ces risques | Oui | § 5 |
| Des mécanismes de suivi de l'évaluation ont été mis en place | Oui | § 6 |

**Statut de ce rapport** : Nouveau

---

## 1. Description du projet et de l'objet de l'EFVP

### Présentation des grandes lignes du projet

MEPP (Mirror Effect Plus Protocol) est une plateforme de rééducation de la paralysie faciale développée par la professeure Sarah Martineau et son équipe, avec le soutien de l'Université de Montréal, du CIUSSS de l'Est-de-l'Île-de-Montréal et du CIUSSS du Nord-de-l'Île-de-Montréal.

La plateforme comprend :

- Un **site web pour les cliniciens** : gestion des patients, création de plans de traitement personnalisés, suivi de la progression, export de données de recherche
- Un **site web pour les patients** : exécution d'exercices de rééducation avec miroir augmenté (technologie DeepAR)
- Une **application iOS** réservée aux patients

Le site web est hébergé au Canada (AWS, région ca-central-1, Montréal) et est accessible à l'adresse mirroreffectplus.org.

### Échéancier du projet

Le développement initial de MEPP a débuté en 2021. La plateforme est en exploitation continue. La présente EFVP est réalisée dans le cadre d'une refonte comprenant la mise à jour du cadre technique (Django 5.2), l'ajout d'une bannière de consentement aux cookies et l'implémentation d'un mécanisme d'anonymisation des comptes.

### Énoncé et justification des objectifs motivant le projet

1. Offrir un outil de rééducation de la paralysie faciale accessible à distance
2. Permettre aux cliniciens de personnaliser les exercices selon le profil clinique de chaque patient
3. Assurer le suivi de la progression des patients par leurs cliniciens
4. Contribuer à la recherche scientifique sur la rééducation de la paralysie faciale, à partir de données dé-identifiées
5. Améliorer les approches de rééducation et leur efficacité

### Démonstration que le projet est proportionné aux objectifs et aux risques d'atteinte à la vie privée

La collecte de renseignements personnels est limitée au strict nécessaire :

- Les **données d'identification** (nom, courriel) sont indispensables à l'authentification et à la relation clinicien-patient
- Le **côté de la paralysie faciale** (donnée de santé) est indispensable à la configuration des exercices et du miroir augmenté
- Les **données de progression** (sessions, exercices) sont indispensables au suivi clinique

La plateforme **ne collecte pas** de données biométriques (le miroir AR fonctionne en temps réel côté client, aucune image n'est transmise au serveur), de vidéos du patient, d'adresse physique, de numéro de téléphone ni d'identifiant gouvernemental. Aucune donnée n'est transmise à des tiers.

### Détermination de l'objet de l'évaluation

L'évaluation porte sur l'ensemble de la plateforme MEPP en phase d'exploitation, incluant la collecte et le traitement des renseignements personnels des patients et des cliniciens, les flux de données, les mesures de sécurité et la conformité à la Loi sur le privé telle que modifiée par la Loi 25.

---

## 2. Rôles et responsabilités

### Intervenants impliqués dans la démarche d'EFVP

| Nom | Titre | Organisation | Rôle dans la démarche | Raison de l'implication |
|-----|-------|--------------|-----------------------|------------------------|
| Sarah Martineau | Professeure, responsable de la protection des RP | UdeM — École d'orthophonie et d'audiologie | Responsable du projet, approbation du rapport | Responsable de la protection des renseignements personnels |
| Hugo Platret | Développeur | Freelance | Rédaction du volet technique, implémentation des mesures | Connaissance approfondie de l'architecture technique |

### Résumé des consultations

Le volet technique de cette évaluation a été réalisé par le développeur responsable de la plateforme, en consultation avec la responsable du projet. Les mesures techniques (anonymisation, politique de confidentialité, bannière de cookies) ont été implémentées et testées préalablement à la rédaction de ce rapport.

---

## 3. Renseignements personnels impliqués et ampleur de l'évaluation

### Inventaire des renseignements personnels

#### Données d'identification et d'authentification

| Renseignement | Personnes concernées | Finalité | Nécessité |
|---------------|---------------------|----------|-----------|
| Prénom et nom de famille | Patients, cliniciens | Identification dans l'interface, relation clinicien-patient | Indispensable à la gestion du compte |
| Adresse courriel | Patients, cliniciens | Authentification, communications relatives au compte | Indispensable à l'authentification |
| Mot de passe (stocké sous forme de hash bcrypt irréversible) | Patients, cliniciens | Authentification | Indispensable à la sécurité du compte |

#### Données de santé

| Renseignement | Personnes concernées | Finalité | Nécessité |
|---------------|---------------------|----------|-----------|
| Côté de la paralysie faciale (gauche ou droit) | Patients | Configuration des exercices de rééducation et du miroir augmenté | Indispensable au fonctionnement clinique |
| Historique des sessions d'exercices (contenu, progression, statut) | Patients | Suivi clinique par le clinicien, recherche sous forme dé-identifiée | Indispensable au suivi de la rééducation |
| Plans de traitement (exercices prescrits, durées, fréquence) | Patients | Personnalisation de la rééducation | Indispensable au suivi clinique |

#### Données de préférence et de configuration

| Renseignement | Personnes concernées | Finalité | Nécessité |
|---------------|---------------------|----------|-----------|
| Langue de l'interface | Patients, cliniciens | Personnalisation de l'interface | Nécessaire à l'accessibilité (plateforme multilingue) |
| Préférences audio et vidéo | Patients | Configuration des exercices | Nécessaire à l'adaptation des exercices |
| Paramètres du miroir augmenté (position, rotation, échelle) | Patients | Calibration du miroir | Nécessaire au fonctionnement du miroir |

#### Données techniques collectées automatiquement

| Renseignement | Personnes concernées | Finalité | Nécessité |
|---------------|---------------------|----------|-----------|
| Date de création du compte et de dernière connexion | Patients, cliniciens | Gestion du cycle de vie du compte, politique de rétention | Nécessaire à la gestion du compte |
| Actions effectuées (connexion, début/pause/fin d'exercice) | Patients | Suivi de la progression | Nécessaire au suivi clinique |
| Agent utilisateur du navigateur | Patients | Diagnostic technique, compatibilité | Utile au support technique |
| Jetons d'authentification (expirables) | Patients, cliniciens | Authentification des requêtes API | Indispensable à la sécurité |

#### Données non collectées

MEPP ne collecte pas : données biométriques, vidéos ou photos, adresse physique, numéro de téléphone, numéro d'assurance sociale, données de géolocalisation, données à des fins publicitaires.

### Parcours des renseignements personnels

| Renseignement | Collecte | Utilisation | Conservation | Suppression |
|---------------|----------|-------------|--------------|-------------|
| Données d'identification (nom, courriel) | Par le clinicien lors de la création du compte, ou par le patient via l'application iOS | Authentification, affichage dans l'interface, communication | Base de données PostgreSQL, serveur AWS ca-central-1, Canada | Anonymisation irréversible sur demande du patient ou du clinicien |
| Côté de la paralysie | Par le clinicien lors de la création du compte | Configuration des exercices et du miroir | Base de données PostgreSQL, Canada | Supprimé lors de l'anonymisation du compte |
| Sessions et progression | Automatiquement lors de l'utilisation | Suivi clinique, recherche dé-identifiée | Base de données PostgreSQL, Canada | Conservées sous forme dé-identifiée après anonymisation du compte |
| Préférences et configuration | Par le patient via l'interface | Personnalisation de l'expérience | Base de données PostgreSQL, Canada | Supprimées lors de l'anonymisation du compte |
| Données techniques | Automatiquement | Diagnostic, compatibilité | Base de données PostgreSQL, Canada | Conservées sous forme dé-identifiée après anonymisation |
| Jetons d'authentification | Automatiquement à la connexion | Authentification des requêtes | Base de données PostgreSQL, Canada | Expiration automatique (14 jours) ; supprimés lors de l'anonymisation |

### Personnes ayant accès aux renseignements personnels

| Catégorie | Accès | Justification | Mécanisme de contrôle |
|-----------|-------|---------------|----------------------|
| Patient | Ses propres données uniquement | Consultation de son profil et de ses exercices | Jeton d'authentification personnel, permissions applicatives |
| Clinicien | Données de ses patients uniquement | Gestion clinique des patients qui lui sont assignés | Jeton d'authentification, filtrage systématique par clinicien au niveau de la base de données |
| Administrateur | Toutes les données | Administration de la plateforme | Jeton d'authentification, rôle superutilisateur |
| Développeur | Accès au serveur pour maintenance | Maintenance technique | Accès SSH par clé privée uniquement |

### Ampleur de l'évaluation

| Critère | Évaluation |
|---------|------------|
| **Sensibilité** | Certains renseignements sont sensibles (donnée de santé : côté de la paralysie). La majorité des autres données sont des renseignements d'identification courants. |
| **Finalité** | Rééducation clinique et recherche scientifique dé-identifiée. Pas de profilage, pas de décision automatisée, pas de publicité. |
| **Quantité** | Nombre limité de personnes concernées (patients suivis en clinique de rééducation faciale). Volume de données modéré par patient. |
| **Répartition** | Données centralisées dans une seule base de données, hébergée au Canada. Aucune communication à des tiers ou à l'extérieur du Québec. |
| **Support** | Exclusivement numérique (base de données PostgreSQL sur serveur infonuagique AWS). |

L'ampleur de la présente EFVP est adaptée à un projet de taille modérée impliquant des données de santé pour un nombre limité de personnes, avec une répartition centralisée et aucune communication à des tiers.

---

## 4. Conformité aux obligations et aux principes de protection des renseignements personnels

### Obligations relatives au cycle de vie des renseignements personnels

| Obligation | Référence | Moyens mis en place |
|------------|-----------|---------------------|
| **Collecte** — Ne recueillir que les RP nécessaires | Art. 5 Loi sur le privé | La collecte est limitée aux données indispensables à la rééducation (voir inventaire ci-dessus). Aucune donnée superflue n'est recueillie. |
| **Collecte** — Informer la personne concernée | Art. 8 et 8.1 Loi sur le privé | Politique de confidentialité publiée sur le site en 6 langues, accessible à tout moment. Bannière de consentement aux cookies. |
| **Utilisation** — Utiliser les RP uniquement aux fins pour lesquelles ils ont été recueillis | Art. 13 Loi sur le privé | Les données sont utilisées exclusivement pour la rééducation clinique et la recherche dé-identifiée, tel que décrit dans la politique de confidentialité. |
| **Communication** — Ne pas communiquer les RP sans consentement | Art. 13 Loi sur le privé | Aucune donnée n'est communiquée à des tiers. Pas d'analytics externes, pas de publicité, pas de sous-traitant ayant accès aux données. |
| **Conservation** — Détruire ou anonymiser les RP lorsque la finalité est atteinte | Art. 12 Loi sur le privé | Durée de conservation de 5 ans après la dernière connexion. Mécanisme d'anonymisation irréversible disponible. |
| **Sécurité** — Prendre les mesures de sécurité propres à assurer la protection des RP | Art. 10 Loi sur le privé | Voir ci-dessous. |

### Mesures de sécurité

**Authentification et contrôle d'accès**

- Authentification par jeton expirant (durée de vie : 14 jours pour l'authentification courante, 30 minutes pour le miroir, 15 secondes pour l'export)
- Mots de passe stockés sous forme de hash bcrypt irréversible
- Règles de complexité de mot de passe configurables
- Isolation stricte des données par clinicien : un clinicien ne peut accéder qu'aux données de ses propres patients (filtrage au niveau de la base de données)
- Permissions applicatives granulaires selon le rôle (patient, clinicien, administrateur)

**Sécurité des communications**

- Communications chiffrées via HTTPS/TLS sur tous les environnements (certificat Let's Encrypt)
- Jetons transmis exclusivement dans les en-têtes HTTP, jamais dans les URL
- Protection CSRF activée
- En-têtes de sécurité HTTP (X-Frame-Options, Content-Security-Policy)

**Sécurité de l'infrastructure**

- Hébergement sur serveur AWS au Canada (région ca-central-1, Montréal)
- Accès au serveur par clé SSH privée uniquement (pas d'accès par mot de passe)
- Conteneurisation Docker (isolation des services)
- Sauvegardes automatiques gérées par l'infrastructure AWS

### Obligations transversales

| Obligation | Référence | Moyens mis en place |
|------------|-----------|---------------------|
| Nommer un responsable de la protection des RP | Art. 3.1 Loi sur le privé | Professeure Sarah Martineau |
| Publier une politique de confidentialité | Art. 8.2 Loi sur le privé | Politique publiée sur le site en 6 langues, mentionnant les types de données, les finalités, les durées de conservation, les droits des personnes et les coordonnées du responsable |
| Permettre l'accès et la rectification | Art. 27 et 28 Loi sur le privé | Accès via le profil utilisateur dans l'interface web, et sur demande par courriel |
| Permettre la suppression / dé-indexation | Art. 28.3 Loi sur le privé | Mécanisme d'anonymisation irréversible, accessible par le clinicien ou par le patient (self-service) |
| Réaliser une EFVP | Art. 3.3 Loi sur le privé | Le présent rapport |
| Aviser la CAI et les personnes en cas d'incident de confidentialité | Art. 3.5 Loi sur le privé | Procédure à documenter (voir plan d'action) |
| Tenir un registre des incidents de confidentialité | Art. 3.8 Loi sur le privé | À mettre en place (voir plan d'action) |

---

## 5. Identification des risques et des stratégies pour les atténuer

### Grille d'évaluation utilisée

L'évaluation des risques utilise une grille gravité × probabilité, chaque critère étant coté de 1 à 4 :

| | 1 — Très faible | 2 — Faible | 3 — Grande | 4 — Très grande |
|---|---|---|---|---|
| **Gravité** | Aucune conséquence ou conséquences très mineures | Conséquences mineures pour un petit nombre de personnes | Conséquences importantes pour une personne ou mineures pour un grand nombre | Conséquences majeures pour une personne ou importantes pour un grand nombre |
| **Probabilité** | Le risque n'a aucune chance de se concrétiser | Le risque a peu de chances de se concrétiser | Le risque a de bonnes chances de se réaliser | Le risque a de très grandes chances de se concrétiser |

**Niveaux de risque** : Très faible (1–2) · Modéré (3–4) · Grand (6–8) · Très grand (9–12)

### Analyse des risques

#### Risque 1 — Accès non autorisé aux données d'un patient par un autre utilisateur

| | |
|---|---|
| **Description** | Un clinicien ou un utilisateur accède aux données d'un patient qui ne lui est pas assigné |
| **Causes possibles** | Défaillance du contrôle d'accès, erreur de configuration des permissions |
| **Conséquences potentielles** | Atteinte à la confidentialité des données de santé du patient |
| **Gravité** | 3 — Grande (données de santé concernées) |
| **Probabilité** | 1 — Très faible (isolation par clinicien appliquée systématiquement au niveau de la base de données) |
| **Niveau initial** | **3 — Modéré** |
| **Stratégies en place** | Filtrage systématique des requêtes par clinicien, permissions applicatives par rôle, jetons d'authentification individuels |
| **Niveau résiduel** | **2 — Très faible** |

#### Risque 2 — Interception de données en transit

| | |
|---|---|
| **Description** | Un tiers intercepte les communications entre le client et le serveur |
| **Causes possibles** | Absence de chiffrement, attaque de type « homme du milieu » |
| **Conséquences potentielles** | Divulgation de données d'identification et de santé |
| **Gravité** | 3 — Grande |
| **Probabilité** | 1 — Très faible (HTTPS/TLS obligatoire sur tous les environnements) |
| **Niveau initial** | **3 — Modéré** |
| **Stratégies en place** | HTTPS obligatoire, jetons transmis dans les en-têtes HTTP uniquement, aucune donnée sensible dans les URL |
| **Niveau résiduel** | **1 — Très faible** |

#### Risque 3 — Conservation de données au-delà de la durée nécessaire

| | |
|---|---|
| **Description** | Des renseignements personnels sont conservés alors que la finalité justifiant leur collecte est atteinte |
| **Causes possibles** | Absence de mécanisme de suppression automatique, oubli de demande de suppression |
| **Conséquences potentielles** | Atteinte au droit de suppression des personnes concernées |
| **Gravité** | 2 — Faible (données accessibles uniquement par le clinicien et l'administrateur) |
| **Probabilité** | 2 — Faible (politique de rétention de 5 ans documentée, mécanisme d'anonymisation opérationnel) |
| **Niveau initial** | **4 — Modéré** |
| **Stratégies en place** | Politique de rétention de 5 ans après la dernière connexion, mécanisme d'anonymisation irréversible sur demande, jetons à durée de vie limitée |
| **Niveau résiduel** | **2 — Très faible** |

#### Risque 4 — Accès non autorisé au serveur

| | |
|---|---|
| **Description** | Un tiers obtient un accès au serveur de production |
| **Causes possibles** | Compromission de la clé SSH, vulnérabilité de l'infrastructure |
| **Conséquences potentielles** | Accès à l'ensemble des données de la plateforme |
| **Gravité** | 4 — Très grande |
| **Probabilité** | 1 — Très faible (accès par clé SSH uniquement, infrastructure AWS gérée) |
| **Niveau initial** | **4 — Modéré** |
| **Stratégies en place** | Accès SSH par clé privée uniquement, aucun accès par mot de passe, infrastructure AWS avec sécurité gérée, conteneurisation Docker |
| **Niveau résiduel** | **2 — Très faible** |

#### Risque 5 — Perte de données

| | |
|---|---|
| **Description** | Les données sont perdues à la suite d'une défaillance technique |
| **Causes possibles** | Défaillance matérielle, erreur humaine, incident logiciel |
| **Conséquences potentielles** | Perte de l'historique de rééducation du patient |
| **Gravité** | 2 — Faible (les données peuvent être reconstituées par le clinicien) |
| **Probabilité** | 1 — Très faible (sauvegardes automatiques AWS) |
| **Niveau initial** | **2 — Très faible** |
| **Stratégies en place** | Sauvegardes automatiques AWS, conteneurisation Docker permettant une reconstruction rapide |
| **Niveau résiduel** | **1 — Très faible** |

#### Risque 6 — Incident de confidentialité non détecté

| | |
|---|---|
| **Description** | Un incident de confidentialité survient sans être détecté ni signalé dans les délais requis |
| **Causes possibles** | Absence de procédure formelle de gestion des incidents, absence de journalisation des accès |
| **Conséquences potentielles** | Non-respect du délai de notification à la CAI (72 heures), préjudice prolongé pour les personnes concernées |
| **Gravité** | 3 — Grande |
| **Probabilité** | 2 — Faible (le nombre limité d'utilisateurs et d'administrateurs réduit la probabilité) |
| **Niveau initial** | **6 — Grand** |
| **Stratégies prévues** | Documentation d'une procédure de gestion des incidents (voir plan d'action), mise en place d'un registre des incidents |
| **Niveau résiduel après mise en œuvre** | **3 — Modéré** |

### Réévaluation de la nécessité et de la proportionnalité

Au terme de l'analyse des risques, les niveaux résiduels sont acceptables : cinq risques sur six présentent un niveau résiduel très faible (1 ou 2), et le sixième (incident non détecté) sera ramené à un niveau modéré par la mise en place de la procédure de gestion des incidents prévue au plan d'action.

Le projet demeure nécessaire et proportionné : les données collectées sont limitées au strict minimum requis pour la rééducation, les mesures de sécurité sont adaptées à la sensibilité des données, et aucune donnée n'est communiquée à des tiers.

---

## 6. Plan d'action

| # | Action | Responsable | Échéancier | Suivi |
|---|--------|-------------|------------|-------|
| 1 | Documenter une procédure de gestion des incidents de confidentialité (détection, évaluation de la gravité, notification à la CAI dans les 72 heures, notification aux personnes concernées) | Sarah Martineau | Avril 2026 | |
| 2 | Mettre en place un registre des incidents de confidentialité | Sarah Martineau | Avril 2026 | |
| 3 | Sensibiliser les cliniciens utilisateurs de la plateforme à la protection des renseignements personnels et à la procédure d'anonymisation | Sarah Martineau | Juin 2026 | |
| 4 | Implémenter un export automatisé des données personnelles du patient (portabilité) | Hugo Platret | Selon budget | |
| 5 | Automatiser la suppression ou l'anonymisation des comptes inactifs depuis plus de 5 ans | Hugo Platret | Selon budget | |
| 6 | Réévaluer la présente EFVP lors de tout changement significatif au projet | Sarah Martineau | En continu | |

---

## 7. Approbation du rapport et versions

### Historique des versions

| Version | Date | Auteur | Description |
|---------|------|--------|-------------|
| 1.0 | Mars 2026 | Hugo Platret | Version initiale |

### Approbation

| | Nom | Titre | Date | Signature |
|---|-----|-------|------|-----------|
| Rédigé par | Hugo Platret | Développeur | Mars 2026 | |
| Approuvé par | Sarah Martineau | Responsable de la protection des RP | | |

---

## Documents joints

- Politique de confidentialité (publiée sur le site, en 6 langues)
- Code source du mécanisme d'anonymisation (`mepp/api/services/anonymization.py`)

---

*Ce rapport a été préparé à l'aide du modèle générique de rapport d'EFVP proposé par la Commission d'accès à l'information du Québec (version 1.1 — Avril 2024).*
