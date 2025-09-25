Le code de bataille navale a pour objectif de permettre a deux joueurs de faire une partie de bataille navale classique.

 Utilisation du code de bataille navale :

Une fois le code lancé, une grille de 10x10 remplie de " ~ " s'affiche avec les instructions.
Le code attend de l'utilisateur qu'il inscrive des coordonnées au format lettre/chiffre (exemple : A2, B10). Les coordonnées attendues doivent être comprises entre [A-J] et [1-10]. Si les coordonnées envoyées par l'utilisateur ne sont pas comprises dans ces plages ou pas dans le bon sens, le code renvoie "coordonnées incorrectes" et redemande des coordonnées à l'utilisateur.

Le code va demander à l'utilisateur de placer 3 bateaux de tailles différentes : le premier de taille 2*1, le deuxième de taille 3*1 et le dernier de taille 1*4. Les bateaux sont symbolisés par '[ ]'. Une fois les trois bateaux placés, c'est au tour de l'utilisateur suivant qui doit placer ses trois bateaux.

Quand les deux joueurs ont placé leurs trois bateaux, les joueurs vont chacun leur tour tirer. Une nouvelle grille de tir apparaît en plus de la grille du joueur. Cette nouvelle grille va servir à inscrire où le joueur a tiré. Cette nouvelle grille va donc se remplir avec les symboles 'O' s'il a touché un bateau adverse et 'X' s'il a raté.
Les actions d'un joueur sont retranscrites sur la grille de son adversaire. La grille où sont inscrits les bateaux placés va donc se remplir avec les tirs du joueur adverse avec les mêmes symboles que pour la grille de tir.

Les tours de tir vont s'alterner tant que la condition de victoire n'est pas remplie.
Cette condition renvoie false tant que la grille du joueur contient un symbole de bateau '[ ]' si il n'y plus aucun symbole de bateau alors le jeux ce termine.
