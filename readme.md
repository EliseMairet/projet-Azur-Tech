
Missions :
Dans le cadre du processus de sélection, nous vous demanderons de réaliser l'exercice technique suivant. Ce test est conçu pour évaluer vos compétences en développement web et en organisation de projet.

Exercice technique développeur web :

Objectif : Réaliser un mini-réseau social en local, sans connexions vers une API externe.
Technologies : HTML / CSS / JavaScript pur (sans frameworks).

Style : L'interface doit adopter un style "neumorphisme".

Exigences techniques :

Le site doit être responsive et le code commenté.
Pas de framework (Bootstrap, Tailwind, etc.) : l’organisation des fichiers et des classes CSS est un critère important.
Pages à créer :

Page de feed :

Affichage de posts (texte ou photo + texte), ajoutés à partir d’un JSON en utilisant la gestion du DOM.
Tous les articles (texte et photos) doivent avoir les mêmes formats et clés JSON, simulant ainsi le retour d’une API.
Fonctionnalités :
Réagir aux posts (Like / Dislike / Love) avec une animation de particules pour chaque réaction.
Commenter les posts et les commentaires.
Afficher la photo en plein écran si le post en contient une.
Page de messagerie :

Affichage d’une liste de conversations, gérée dynamiquement via le DOM depuis un JSON pour simuler une API ou websocket.
Fonctionnalités :
Afficher le dernier message de chaque conversation.
Afficher le détail d’une conversation avec un historique de messages.
Gestion des messages en JSON (ne développer qu’un seul côté de la conversation).
Affichage d’horodatage, nom, photo de profil de l’expéditeur, et contenu du message.
Envoi de nouveaux messages qui s’ajoutent à la fois dans le JSON et sur l’interface.
Page de liste d’amis :

Pas besoin de JSON (amis codés en dur).
L'HTML et CSS doivent présenter une redondance dans les classes CSS des amis.
Fonctionnalités :
Filtrer les amis par nom et prénom.
Lien vers la messagerie depuis chaque ligne d’ami.
Implémenter une fonction de "drag and drop" pour réorganiser la liste d’amis.
Instructions de rendu :

Le travail devra être rendu sur un Git.
Commits réguliers avec un descriptif suffisant et des titres clairs pour suivre l'évolution du projet.
À noter : L'UI/UX n'est pas prioritaire, l'évaluation se concentrera sur le code, l’organisation, la structure, et la gestion de Git.
