// Dimensions du plateau de jeu
const nombreDeLignes = 6;
const nombreDeColonnes = 7;
let joueurActuel = 'jaune';
// Crée un tableau vide
let plateauDeJeu = [];
let jeuTerminé = false;

// Récupérer les éléments HTML du plateau et du bouton de réinitialisation dans les div
const plateauHTML = document.getElementById('game-board');
const boutonReinitialiser = document.getElementById('reset-button');

// Initialisation du tableau
function initialiserPlateau() {
    // Vide le tableau en créant un tableau avec des cases nulles
    plateauDeJeu = [];
    for (let ligne = 0; ligne < nombreDeLignes; ligne++) {
        plateauDeJeu[ligne] = [];
        for (let colonne = 0; colonne < nombreDeColonnes; colonne++) {
            plateauDeJeu[ligne][colonne] = null; // Aucun jeton
        }
    }
    
    // Efface le plateau de jeu visuel dans l'HTML
    plateauHTML.innerHTML = '';

    // Crée des cases (div) pour chaque cellule du tableau
    for (let ligne = 0; ligne < nombreDeLignes; ligne++) {
        for (let colonne = 0; colonne < nombreDeColonnes; colonne++) {
            // ---- ChatGPT
            let cellule = document.createElement('div');
            cellule.classList.add('cell');
            cellule.dataset.ligne = ligne;
            cellule.dataset.colonne = colonne;
            // ---- ChatGPT
            plateauHTML.appendChild(cellule);
        }
    }
}

// Fonction pour faire le son du jeton
function sonjeton() {
    let audio = new Audio('import/0918.MP3')
    audio.play();
}

// Fonction pour faire le son du jeton
function sonVictoire() {
    let audio = new Audio('import/sonvictoire.mp3')
    audio.play();
}
function nouvelleGame() {
    let audio = new Audio('import/voieoff.mp3')
    audio.play();
}

// Fonction pour afficher le modal de victoire
function afficherVictoire(joueurGagnant) {
    const texteVictoire = document.getElementById('texteVictoire');
    texteVictoire.textContent = joueurGagnant.toUpperCase() + ' a gagné !'; // Modifie le texte du modal
    const modal = new bootstrap.Modal(document.getElementById('modalVictoire')); // Initialise le modal
    modal.show(); // Affiche le modal
}

// Fonction pour placer un jeton dans une colonne donnée
function placerJeton(colonneChoisie) {
    if (jeuTerminé) return; // Vérifie si le jeu est déjà terminé

    // On part du bas de la colonne et on cherche la première case vide
    for (let ligne = nombreDeLignes - 1; ligne >= 0; ligne--) {
        if (plateauDeJeu[ligne][colonneChoisie] === null) {
            plateauDeJeu[ligne][colonneChoisie] = joueurActuel;

            // Création visuel d'un jeton dans HTML
            // --- ChatGPT
            let cellule = document.querySelector(`.cell[data-ligne='${ligne}'][data-colonne='${colonneChoisie}']`);
            let jeton = document.createElement('div');
            jeton.classList.add('token', joueurActuel, 'drop-animation');
            // --- ChatGPT
            cellule.appendChild(jeton);

            // Joue le son du jeton
            sonjeton()

            // Vérifie si le joueur a gagné
            if (verifierVictoire(ligne, colonneChoisie)) {
                sonVictoire()
                setTimeout(() => {
                    afficherVictoire(joueurActuel);
                    reinitialiserJeu();
                }, 500);
                jeuTerminé = true; // Fin du jeu
            } else {
                joueurActuel = (joueurActuel === 'jaune') ? 'rouge' : 'jaune'; // Changement de joueur
            }
            return; // Sort de la fonction une fois le jeton placé
        }
    }
}

// Fonction pour vérifier la victoire d'un joueur dans une direction donnée
function verifierVictoire(ligne, colonne) {
    // Vérifie les quatre directions possibles
    return (verifierLigne(ligne, colonne, 1, 0) ||  // Horizontal
            verifierLigne(ligne, colonne, 0, 1) ||  // Vertical
            verifierLigne(ligne, colonne, 1, 1) ||  // Diagonale descendante
            verifierLigne(ligne, colonne, 1, -1));  // Diagonale montante
}

// Fonction pour vérifier s'il y a 4 jetons alignés dans une direction
function verifierLigne(ligne, colonne, directionLigne, directionColonne) {
    let compteur = 1; // Compte le jeton actuel
    // Vérifie dans une direction (ex : vers la droite)
    compteur += compterJetons(ligne, colonne, directionLigne, directionColonne);
    // Vérifie dans la direction opposée (ex : vers la gauche)
    compteur += compterJetons(ligne, colonne, -directionLigne, -directionColonne);
    return compteur >= 4; // Si 4 jetons ou plus sont alignés
}

// Fonction pour compter les jetons dans une direction donnée
function compterJetons(ligne, colonne, directionLigne, directionColonne) {
    let compteur = 0;
    let nouvelleLigne = ligne + directionLigne;
    let nouvelleColonne = colonne + directionColonne;

    // Continue à vérifier tant qu'on est dans les limites du tableau
    while (nouvelleLigne >= 0 && nouvelleLigne < nombreDeLignes &&
           nouvelleColonne >= 0 && nouvelleColonne < nombreDeColonnes &&
           plateauDeJeu[nouvelleLigne][nouvelleColonne] === joueurActuel) {
        compteur++;
        nouvelleLigne += directionLigne;
        nouvelleColonne += directionColonne;
    }

    return compteur;
}

// Fonction pour réinitialiser le jeu
function reinitialiserJeu() {
    initialiserPlateau();
    joueurActuel = 'jaune'; // Le joueur jaune recommence
    jeuTerminé = false; // Le jeu n'est plus terminé
    nouvelleGame();
}

// Événements : lorsqu'on clique sur une cellule, on place un jeton
plateauHTML.addEventListener('click', function(event) {
    let colonneCliquee = event.target.dataset.colonne;
    if (colonneCliquee !== undefined) {
        placerJeton(parseInt(colonneCliquee));
    }
});

// Événements : lorsque le bouton de réinitialisation est cliqué
boutonReinitialiser.addEventListener('click', function() {
    reinitialiserJeu();
});

initialiserPlateau();
