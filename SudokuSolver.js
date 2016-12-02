
var sudoku; //global variable

interactiveSolverWithInput();
//interactiveSolverWithLoading(e4);
//automatedSolver(google10);






//---------------------------------------------------------------
// Interactive Solver With Input
//---------------------------------------------------------------

function interactiveSolverWithInput() {
    drawEmptyBoard();
    submitSudokuUI();
}


//---------------------------------------------------------------
// Interactive Solver With Loading
//---------------------------------------------------------------

function interactiveSolverWithLoading(entryArray) {
    sudoku = new Sudoku(entryArray);
    strategyOneRule(sudoku);
    drawBoard(sudoku);
    interactiveUI();
}


//---------------------------------------------------------------
// Automated Solver
//---------------------------------------------------------------

function automatedSolver(data) {
    var entryStringList = data.split('\n');
    var entryArrayList = [];
    for (var i = 0; i < entryStringList.length; i++) {
        entryArrayList.push(entryStringToEntryArray(entryStringList[i]));
    }

    for (var i = 0; i < entryArrayList.length; i++) {
        console.log("Solved? " + attemptSolve(entryArrayList[i]));
    }
}


function attemptSolve(entryArray) {
    sudoku = new Sudoku(entryArray);
    strategyOneRule(sudoku);
    var previouslyUndefined;
    do {
        previouslyUndefined = sudoku.numberUndefined();
        placeNakedSingles(sudoku);
        placeHiddenSingles(sudoku);
        deduceFromNakedPairs(sudoku);
    } while(sudoku.numberUndefined() < previouslyUndefined);

    return sudoku.isSolved()
}






