//-----------------------------------------------------------------------------
// ONE RULE
// SHOULD ONLY CALL THIS ONCE AT THE START
//-----------------------------------------------------------------------------

function strategyOneRule(sudoku) {
    determineCandidateLists(sudoku);
    drawBoard(sudoku);
}

function determineCandidateLists(sudoku) {
    for (var r = 0; r < 9; r++) {
        for (var c = 0; c < 9; c++) {
            if (sudoku.getEntryValue(r, c) !== 0)
                continue;

            //Start with the candidate list having all digits.
            sudoku.cells[r][c].candidateList = [1,2,3,4,5,6,7,8,9];

            var rowValues = sudoku.getRowValues(r);
            var colValues = sudoku.getColValues(c);
            var R = Math.floor(r / 3);
            var C = Math.floor(c / 3);
            var blockValues = sudoku.getBlockValues(R, C);

            for (var i = 0; i < 9; i++) {
                //Eliminate any digits in that row.
                if (rowValues[i] !== 0)
                    sudoku.removeCandidate(r, c, rowValues[i]);

                //Eliminate any digits in that column.
                if (colValues[i] !== 0)
                    sudoku.removeCandidate(r, c, colValues[i]);

                //Eliminate any digits in that block.
                if (blockValues[i] !== 0)
                    sudoku.removeCandidate(r, c, blockValues[i]);
            }
        }
    }
}



