//on utilise prompt-sync pour demander les coordonées a l'utilisateur
import promptSync from "prompt-sync";
const prompt = promptSync();

class GrilleJeu {
  private grille: string[][];
  private taille: number;
  private dictionnaire : { [key: string]: number };
  constructor(taille: number = 10) {
    this.taille = taille;
    this.grille = [];
    //dictionnaire pour afficher des lettre et pouvoir utiliser comme des chiffres.
    this.dictionnaire = {"A": 0,
  "B": 1,
  "C": 2,
  "D": 3,
  "E": 4,
  "F": 5,
  "G": 6,
  "H": 7,
  "I": 8,
  "J": 9
  }
    
    for (let i = 0; i < taille; i++) {
      this.grille[i] = [];
      for (let j = 0; j < taille; j++) {
        this.grille[i][j] = " ~ ";
      }
    }
  }

  afficherGrille(): void {
    // Affiche les lettres au-dessus
    let dessus = "   ";
  for (let lettre in this.dictionnaire) {
  if (this.dictionnaire[lettre] < this.taille) {
    dessus += lettre + "  ";
  }
}

    console.log(dessus);

   for (let i = 0; i < this.taille; i++) {
    //les chiffres sur le cotée pour les coordonnées
  let numero = i + 1;
  let texte;
  if (numero < 10) {
    texte = " " + numero;
  } else {
    texte = "" + numero;
  }
  let ligne = texte + " ";

  for (let j = 0; j < this.taille; j++) {
    ligne += this.grille[i][j];
  }
  console.log(ligne);
}

  }

   //bateau 2
  placerBateau2x1(x: number, y: number): boolean {
    if (y + 1 >= this.taille) return false;
    if (this.grille[x][y] !== " ~ " || this.grille[x][y + 1] !== " ~ ") return false;

    this.grille[x][y] = "[ ]";
    this.grille[x][y + 1] = "[ ]";
    return true;
  }

  // bateau 3
  placerBateau1x3(x: number, y: number): boolean {
    if (y + 2 >= this.taille) return false;
    if (this.grille[x][y] !== " ~ " || this.grille[x][y + 1] !== " ~ " || this.grille[x][y + 2] !== " ~ ") return false;

    this.grille[x][y] = "[ ]";
    this.grille[x][y + 1] = "[ ]";
    this.grille[x][y + 2] = "[ ]";
    return true;
  }

  // bteau 4
  placerBateau4x1(x: number, y: number): boolean {
    if (x + 3 >= this.taille) return false;
    if (this.grille[x][y] !== " ~ " || this.grille[x + 1][y] !== " ~ " || this.grille[x + 2][y] !== " ~ " || this.grille[x + 3][y] !== " ~ ") return false;

    this.grille[x][y] = "[ ]";
    this.grille[x + 1][y] = "[ ]";
    this.grille[x + 2][y] = "[ ]";
    this.grille[x + 3][y] = "[ ]";
    return true;
  }
  getDictionnaire() {
  return this.dictionnaire;
}
}

class Joueur {
  nom: string;
  grille: GrilleJeu;

  constructor(nom: string, taille: number = 10) {
    this.nom = nom;
    this.grille = new GrilleJeu(taille);
  }

 placerBateauInteractif(): void {
  const taillesBateaux = [2, 3, 4];

  for (let taille of taillesBateaux) {
    while (true) {
      console.clear();
      console.log(`=== ${this.nom} : placer un bateau de taille ${taille} ===`);
      this.grille.afficherGrille();

      const saisie = prompt("Entrez des coordonnées (ex: B3) : ").toUpperCase().trim();
      if (!/^[A-J](10|[1-9])$/.test(saisie)) {
        continue;
      }

      const dictionnaire = this.grille.getDictionnaire();
      const lettre = saisie[0];
      const col = dictionnaire[lettre];
      const row = parseInt(saisie.slice(1)) - 1;

      let succes = false;

      if (taille === 2) {
        succes = this.grille.placerBateau2x1(row, col);
      } else if (taille === 3) {
        succes = this.grille.placerBateau1x3(row, col);
      } else if (taille === 4) {
        succes = this.grille.placerBateau4x1(row, col);
      }
      if (succes) {
console.clear();      
this.grille.afficherGrille();
  break; // passe au bateau suivant
} else {
  console.log("Impossible de placer le bateau ici.");
  prompt("Appuyez sur Entrée pour réessayer...");
}
    }
  }
   console.log(`=== ${this.nom} a placé tous ses bateaux ===`);
  prompt("Appuyez sur Entrée pour passer au joueur suivant...");

}

}
//test
const j1 = new Joueur("Joueur 1");
const j2 = new Joueur("Joueur 2");

  j1.placerBateauInteractif();
  j2.placerBateauInteractif();
