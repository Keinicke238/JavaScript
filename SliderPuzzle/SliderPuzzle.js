// Simple slider puzzle using per-tile images in the Images/ folder
// GRID_SIZE defines the number of tiles per row/column (4x4 puzzle)
const GRID_SIZE = 4;
// EMPTY is the numeric id used to represent the blank tile (the last index)
const EMPTY = GRID_SIZE * GRID_SIZE - 1;
// IMAGE_FOLDER is the relative path where per-tile image files are stored
const IMAGE_FOLDER = 'Images';

// positions holds the current tile ordering. Each entry is a tile id (0..15),
// where the value `EMPTY` denotes the blank tile. The array index corresponds
// to a position on the board (0..15, left-to-right top-to-bottom).
let positions = [];

// initPuzzle: put the puzzle in the solved state and render it.
function initPuzzle() {
    // Create a solved positions array [0,1,2,...,EMPTY]
    positions = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);
    // Render the initial solved board to the DOM
    render();
}

// render: build DOM tiles from the `positions` array and attach click handlers
function render() {
    // Get the grid container element by id
    const grid = document.getElementById('puzzleGrid');
    // Clear any existing children (rebuild from scratch)
    grid.innerHTML = '';
    // For each position index, create a tile element showing the tile image
    positions.forEach((tileNum, idx) => {
        // Create a div element for this tile
        const tile = document.createElement('div');
        // Apply the shared tile CSS class
        tile.className = 'tile';
        // If the tile number equals EMPTY, this position is the blank
        if (tileNum === EMPTY) {
            // Mark visually as empty via CSS class
            tile.classList.add('empty');
        } else {
            // Compute the original row (r) and column (c) of this tile id
            const r = Math.floor(tileNum / GRID_SIZE);
            const c = tileNum % GRID_SIZE;
            // Set the tile background to the matching image file (hall-r c.jpg)
            tile.style.backgroundImage = `url('${IMAGE_FOLDER}/hall-${r}${c}.jpg')`;
            // Clicking this tile will attempt to move it (based on its current index)
            tile.onclick = () => moveAt(idx);
        }
        // Append the tile element into the grid container
        grid.appendChild(tile);
    });
}

// indexToRC: helper converting a linear index into {r, c}
function indexToRC(i) {
    return { r: Math.floor(i / GRID_SIZE), c: i % GRID_SIZE };
}

// isAdjacent: returns true if two linear indices are orthogonally adjacent
function isAdjacent(i1, i2) {
    // Convert both indices to row/col and compare Manhattan distance
    const a = indexToRC(i1), b = indexToRC(i2);
    return Math.abs(a.r - b.r) + Math.abs(a.c - b.c) === 1;
}

// moveAt: attempt to move the tile at `index` into the blank position
function moveAt(index) {
    // Find the current index of the blank tile in `positions`
    const emptyIndex = positions.indexOf(EMPTY);
    // If the clicked tile is not adjacent to the blank, do nothing
    if (!isAdjacent(index, emptyIndex)) return;
    // Swap the clicked tile with the blank in the positions array
    [positions[index], positions[emptyIndex]] = [positions[emptyIndex], positions[index]];
    // Re-render the board after the swap
    render();
    // If the puzzle is now solved, show success message and visual state
    if (isSolved()) {
        showMessage('Puzzle Solved! 🎉');
        document.getElementById('puzzleGrid').classList.add('solved');
    } else {
        // Clear any message and remove solved styling otherwise
        showMessage('');
        document.getElementById('puzzleGrid').classList.remove('solved');
    }
}

// isSolved: quick check whether `positions` is in the solved order
function isSolved() {
    for (let i = 0; i < positions.length; i++) if (positions[i] !== i) return false;
    return true;
}

// getAdjacentIndices: return array of valid orthogonal neighbors for a board index
function getAdjacentIndices(index) {
    const adj = [];
    const { r, c } = indexToRC(index);
    if (r > 0) adj.push(index - GRID_SIZE);
    if (r < GRID_SIZE - 1) adj.push(index + GRID_SIZE);
    if (c > 0) adj.push(index - 1);
    if (c < GRID_SIZE - 1) adj.push(index + 1);
    return adj;
}

// shufflePuzzle: produce a solvable random board by making `moves` legal moves
// starting from the solved state. This guarantees solvability.
function shufflePuzzle(moves = 200) {
    // Reset to solved order
    positions = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);
    // Track the blank index and the previous move to avoid immediately reversing
    let emptyIndex = positions.indexOf(EMPTY);
    let lastMove = -1;
    for (let i = 0; i < moves; i++) {
        // Choose a random neighbor of the blank that is not the tile we just moved
        const adj = getAdjacentIndices(emptyIndex).filter(x => x !== lastMove);
        const pick = adj[Math.floor(Math.random() * adj.length)];
        // Swap the picked tile into the blank
        [positions[emptyIndex], positions[pick]] = [positions[pick], positions[emptyIndex]];
        // Update lastMove and blank index for next iteration
        lastMove = emptyIndex;
        emptyIndex = pick;
    }
    // If by chance we ended up solved (very unlikely), shuffle a bit more
    if (isSolved()) return shufflePuzzle(moves + 10);
    // Render the shuffled board and clear any message/solved styling
    render();
    showMessage('');
    document.getElementById('puzzleGrid').classList.remove('solved');
}

// showMessage: write a short string into the #message element
function showMessage(text) { document.getElementById('message').textContent = text; }

// Initialize the puzzle when the script loads
initPuzzle();