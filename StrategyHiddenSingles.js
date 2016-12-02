//-----------------------------------------------------------------------------
// STRATEGY: HIDDEN SINGLES
//-----------------------------------------------------------------------------

function getHiddenSinglesLocations(sudoku) {
    var locationArray = [];
    for (var r = 0; r < 9; r++) {
        for (var c = 0; c< 9; c++) {
            var candList = sudoku.getCandidateList(r,c);
            if (candList.length <= 1)
                continue;
            for (var i = 0; i < candList.length; i++) {
                var n = candList[i];
                var occurencesInRow = sudoku.occurencesCandidateinRow(r, n);
                var occurencesInCol = sudoku.occurencesCandidateinCol(c, n);
                var R = Math.floor(r / 3);
                var C = Math.floor(c / 3); 
                var occurencesInBlock = sudoku.occurencesCandidateinBlock(R, C, n);

                if (occurencesInRow === 1 || occurencesInCol === 1 || occurencesInBlock === 1) {
                    locationArray.push([r, c, n]);
                }
            }
        }
    }
    return locationArray;
}


function showHiddenSingles(sudoku) {
    var locationArray = getHiddenSinglesLocations(sudoku);
    for (var i = 0; i < locationArray.length; i++) {
        var r = locationArray[i][0];
        var c = locationArray[i][1];
        var n = locationArray[i][2];
        var cellID = 'location' + r.toString() + c.toString();
        var elem = document.getElementById(cellID);
        elem.innerHTML = '';
        var candList = sudoku.getCandidateList(r,c);
        for (var j = 0; j < candList.length; j++) {
            // We rewrite the entire HTML of the candidate list.
            // On the hidden single its CSS class is changed to make it stand out.
            if (candList[j] === n) {
                elem.innerHTML += '<div class="uniqueCandidate">' + n.toString() + '</div>';
            } else {
                elem.innerHTML += '<div class="candidate">' + candList[j].toString() + '</div>';
            }
        }
    }
}


function placeHiddenSingles(sudoku) {
    var locationArray = getHiddenSinglesLocations(sudoku);
    for (var i = 0; i < locationArray.length; i++) {
        var r = locationArray[i][0];
        var c = locationArray[i][1];
        var n = locationArray[i][2];
        sudoku.setEntryValue(r, c, n);
    }
    drawBoard(sudoku);
}

