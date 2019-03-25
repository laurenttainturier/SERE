#  Description de l’attaque 

##	Middleware
Grâce à une technique de phishing (ou autre), faire croire que la victime se connecte sur le site de manière sécurisée sans passer par un tiers, alors que les requêtes qu’elle croit faire sont en fait à destination du serveur de l’attaquant. Le serveur joue le rôle de middleware entre la victime et le site cible et intercepte toutes les requêtes à destination du site en question.

##	Récupération des identifiants
La victime va entrer ses identifiants croyant être sur le bon site. Ses identifiants vont être interceptés par le serveur de l’attaquant qui va rediriger la requête sur le site et renvoyer la réponse à la victime qui va alors être connectée sans s’être rendu compte que ses identifiants ont été intercepté. En plus de ses identifiants l’attaquant va pouvoir récupérer un jeton de connexion sous la forme d’un cookie lui permettant de se connecter directement sans devoir rentrer ses identifiants. Cela peut permettre d’outrepasser une authentification à deux facteurs, puisque nous obtenons ce cookie. Une fois qu’il nous est possible de nous connecter, il est tout à fait possible de supprimer cette double authentification afin de prendre entièrement le contrôle du compte de la victime.

#	Difficultés

##	Redirection
Lorsque le serveur envoie la requête du site vers le client, il faut veiller à supprimer les redirections vers le domaine du site, notamment pour le formulaire de connexion, afin qu’il ne soit pas redirigé vers le site officiel. Pour résoudre cette difficulté, nous avons créé une expression régulière qui à chaque fois qu’il trouve le domaine du site, le remplace pour le domaine de notre serveur.

##	Cookies
Il faut s’assurer de transmettre les bons cookies lors de la requête de connexion. Ces cookies sont indispensables pour assurer l’authenticité de l’utilisateur qui veut se connecter. Sans ceux-ci le serveur du site ne nous donnera pas le précieux token. Toute la difficulté réside donc dans la redirection des bons cookies au serveur. 
Pour résoudre cette difficulté nous enregistrons tous les cookies reçus depuis le serveur du site et nous les ajoutons à toutes les requêtes que nous faisons par la suite au dit serveur.

##	Protocole sécurité
Pour rendre cette attaque la plus discrète possible, il faut que le nom de domaine du serveur de l’attaquant soit le plus proche de celui du site duquel il veut récupérer les identifiants. De plus il faut s’assurer que le serveur utilise le protocole https.
	Une autre solution, plus puissante, serait d’ajouter un certificat sur la machine de la victime qui certifierait notre propre serveur DNS. Ainsi notre attaque serait presque indétectable puisque l’url du site serait le bon, le protocole https et le contenu des pages identiques.
