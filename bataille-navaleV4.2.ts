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
    this.dictionnaire = {
  "A": 0,
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
    dessus += lettre + "  ";
}
  console.log(dessus);
   for (let i = 0; i < this.taille; i++) {
    //les chiffres sur le cotée pour les coordonnées
  let numero = i + 1;
  let texte;
  if (numero < 10) {
    texte = " " + numero;
  } else {
    texte =+ numero;
  }
  let ligne = texte;

  for (let j = 0; j < this.taille; j++) {
    ligne += this.grille[i][j];
  }
  console.log(ligne);
}


  }
  conditionVictoire () : boolean{
        // Votre code ici  
        let nbrBateau:number=0; 
        // Parcourir toute la grille  
       for (let i=0; i<this.taille;i++){  
          for (let j=0;j<this.taille;j++){  
            if (this.grille[i][j]=== "[ ]"){ 
              nbrBateau++; 
            }else{ 
             continue 
            } 
          }  
      }   if (nbrBateau!==0){
    return false;
      }else{
        return true;
      }
  }
   //bateau 2
  placerBateau2x1(x: number, y: number): boolean {
    if (y+1>=this.taille&&(this.grille[x][y] !== " ~ " || this.grille[x][y + 1] !== " ~ ")) return false;

    this.grille[x][y] = "[ ]";
    this.grille[x][y + 1] = "[ ]";
    return true;
  }

  // bateau 3
  placerBateau1x3(x: number, y: number): boolean {
    if (y+2>=this.taille&&(this.grille[x][y] !== " ~ " || this.grille[x][y + 1] !== " ~ " || this.grille[x][y + 2] !== " ~ ")) return false;

    this.grille[x][y] = "[ ]";
    this.grille[x][y + 1] = "[ ]";
    this.grille[x][y + 2] = "[ ]";
    return true;
  }

  // bteau 4
  placerBateau4x1(x: number, y: number): boolean {
    if (x+3>=this.taille&&(this.grille[x][y] !== " ~ " || this.grille[x + 1][y] !== " ~ " || this.grille[x + 2][y] !== " ~ " || this.grille[x + 3][y] !== " ~ ")) return false;

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
  grilleTirs: GrilleJeu;  

  constructor(nom: string, taille: number = 10) {
    this.nom = nom;
    this.grille = new GrilleJeu(taille);
    this.grilleTirs = new GrilleJeu(taille);
  }

  placerBateauInteractif(): void {
    const taillesBateaux = [2,3,4];

    for (let taille of taillesBateaux) {
      while (true) {
        console.clear();
        console.log(`=== ${this.nom} : placer un bateau de taille ${taille} ===`);
        this.grille.afficherGrille();

        const saisie = prompt("Entrez des coordonnées (ex: B3) : ").toUpperCase();
        if (!/^[A-J](10|[1-9])$/.test(saisie)) {
          continue;
        }

        const dictionnaire = this.grille.getDictionnaire();
        const lettre = saisie[0];
        const col = dictionnaire[lettre];
        const ligne = parseInt(saisie.slice(1)) - 1;

        let succes = false;

        if (taille === 2) {
          succes = this.grille.placerBateau2x1(ligne, col);
        } else if (taille === 3) {
          succes = this.grille.placerBateau1x3(ligne, col);
        } else if (taille === 4) {
          succes = this.grille.placerBateau4x1(ligne, col);
        }

        if (succes) {
          console.clear();
          this.grille.afficherGrille();
          break;
        } else {
          console.log("Impossible de placer le bateau ici.");
          prompt("Appuyez sur Entrée pour réessayer...");
        }
      }
    }

    console.log(`=== ${this.nom} a placé tous ses bateaux ===`);
    prompt("Appuyez sur Entrée pour passer au joueur suivant...");
  }

  tirer(adversaire: Joueur): void {
    while (true) {
      console.clear();
      console.log(`=== ${this.nom} : choisissez une case pour tirer ===`);
      this.grilleTirs.afficherGrille();

      console.log("\nVotre grille");
      this.grille.afficherGrille();

      const saisie = prompt("Entrez des coordonnées (ex: B3) : ").toUpperCase();
      if (!/^[A-J](10|[1-9])$/.test(saisie)) {
        continue;
      }

      const dictionnaire = this.grille.getDictionnaire();
      const lettre = saisie[0];
      const col = dictionnaire[lettre];
      const ligne = parseInt(saisie.slice(1)) - 1;

      // Vérifie si déjà tiré
      if (this.grilleTirs["grille"][ligne][col] === " O "||this.grilleTirs["grille"][ligne][col] === " x ") {
        console.log("Vous avez déjà tiré ici !");
        prompt("Appuyez sur Entré pour réessayer");
        continue;
      }

      // Vérifie sur la grille adverse
      if (adversaire.grille["grille"][ligne][col] === "[ ]") {
        console.log("O Touché !");
        this.grilleTirs["grille"][ligne][col] = " O ";//marque tir toucher sur la grille du joueur
        adversaire.grille["grille"][ligne][col] = " O "; // Marque tir reçu
      } else {
        console.log(" X Raté");
        this.grilleTirs["grille"][ligne][col] = " X ";//marque tir toucher sur la grille du joueur
          adversaire.grille["grille"][ligne][col] = " X "; // Marque tir raté sur la grille adversaire
      }

      prompt("Appuyez sur Entré pour continuer...");
      break;
    }
  }


}

//test
const j1 = new Joueur("Joueur 1");
const j2 = new Joueur("Joueur 2");

  j1.placerBateauInteractif();
  j2.placerBateauInteractif();

while (!j1.grille.conditionVictoire() && !j2.grille.conditionVictoire()) {
  j1.tirer(j2);
  if (j2.grille.conditionVictoire()) break;
  j2.tirer(j1);
  if (j1.grille.conditionVictoire()) break;
}
console.log("vous avez gagnez!");
