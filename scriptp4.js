// Sélectionne la grille
const grid = document.getElementById('grid');

// Crée les cellules
for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', handleClick);
        grid.appendChild(cell);
    }
}

function handleClick(event) {
    const cell = event.target;
    // Change la couleur de la cellule au clic (alternance rouge/jaune)
    if (!cell.classList.contains('red') && !cell.classList.contains('yellow')) {
        const isRedTurn = grid.dataset.turn === 'red';
        cell.classList.add(isRedTurn ? 'red' : 'yellow');
        grid.dataset.turn = isRedTurn ? 'yellow' : 'red';  // Alternance des tours
    }
}

// Initialise à rouge le premier tour
grid.dataset.turn = 'red';