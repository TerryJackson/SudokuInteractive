//-----------------------------------------------------------------------------
// STRATEGY: NAKED SINGLES
//-----------------------------------------------------------------------------

function getNakedSinglesLocations(sudoku) {
    var locationArray = [];
    for (var r = 0; r < 9; r++) {
        for (var c = 0; c < 9; c++) {
            if (sudoku.getCandidateListLength(r, c) === 1) {
                locationArray.push([r, c]);
            }            
        }
    }
    return locationArray;
}


function showNakedSingles(sudoku) {
    var locationArray = getNakedSinglesLocations(sudoku);
    for (var i = 0; i < locationArray.length; i++) {
        var r = locationArray[i][0];
        var c = locationArray[i][1];
        var n = sudoku.getCandidateList(r, c)[0];
        var cellID = 'location' + r.toString() + c.toString();
        var elem = document.getElementById(cellID);
        elem.innerHTML = '<div class="uniqueCandidate">' + n.toString() + '</div>';
    }
}


function placeNakedSingles(sudoku) {
    var locationArray = getNakedSinglesLocations(sudoku);
    for (var i = 0; i < locationArray.length; i++) {
        var r = locationArray[i][0];
        var c = locationArray[i][1];
        var n = sudoku.getCandidateList(r, c)[0];
        sudoku.setEntryValue(r, c, n);
    }
    drawBoard(sudoku);
}




