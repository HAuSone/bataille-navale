//grille class joueur et placer bateau
import readline from "readline";

class GrilleJeu {
  private grille: string[][];
  private taille: number;

  constructor(taille: number = 10) {
    this.taille = taille;
    this.grille = [];

    for (let i = 0; i < this.taille; i++) {
      this.grille[i] = [];
      for (let j = 0; j < this.taille; j++) {
        this.grille[i][j] = " ~ ";
      }
    }
  }

  clearGrille(): void {
    for (let i = 0; i < this.taille; i++) {
      for (let j = 0; j < this.taille; j++) {
        this.grille[i][j] = " ~ ";
      }
    }
  }

  placerBateau(x: number, y: number): void {
    this.clearGrille();
      this.grille;
    for (let i = 0; i < 1; i++) {
      for (let j = 0; j < 2; j++) {
        if (x + i < this.taille && y + j < this.taille) {
          this.grille[x + i][y + j] = "[ ]";
        }
      }
    }
  }

  afficherGrille(): void {
    console.clear();
    for (let i = 0; i < this.taille; i++) {
      let ligne = "";
      for (let j = 0; j < this.taille; j++) {
        ligne += this.grille[i][j];
      }
      console.log(ligne);
    }
  }
}

class Joueur {
  nom: string;
  grille: GrilleJeu;

  constructor(nom: string, tailleGrille: number = 10) {
    this.nom = nom;
    this.grille = new GrilleJeu(tailleGrille);
  }

  async placerBateauInteractif(): Promise<void> {
    return new Promise((resolve) => {
      console.log(`--- ${this.nom} : Placer votre bateau (Entrée pour valider) ---`);

      let x = 0;
      let y = 0;
      this.grille.placerBateau(x, y);
      this.grille.afficherGrille();

      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.setEncoding("utf8");

      const onKeyPress = (key: string) => {
        if (key === "\u0003") {
          // Ctrl+C
          process.exit();
        } else if (key === "\r") {
          // Entrée
          process.stdin.removeListener("data", onKeyPress);
          process.stdin.setRawMode(false);
         
          resolve();
        } else if (key === "\u001B[A") {
          // Flèche haut
          if (x > 0) x--;
        } else if (key === "\u001B[B") {
          // Flèche bas
          if (x < 8) x++; // 10 - 2 (taille bateau)
        } else if (key === "\u001B[D") {
          // Flèche gauche
          if (y > 0) y--;
        } else if (key === "\u001B[C") {
          // Flèche droite
          if (y < 8) y++;
        }

        this.grille.placerBateau(x, y);
        console.log(`--- ${this.nom} : Déplacez le bateau ---`);
        this.grille.afficherGrille();
        console.log(`--- ${this.nom} : Déplacez le bateau ---`);
      };

      process.stdin.on("data", onKeyPress);
    });
  }
}

// Création des joueurs
const j1 = new Joueur("Joueur 1");

const j2 = new Joueur("Joueur 2");
async function  main(){  
await j1.placerBateauInteractif();
 
  await j2.placerBateauInteractif();

  console.log("\n✅ Les deux bateaux ont été placés !");
  process.exit();
}

main();
