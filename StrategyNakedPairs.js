//-----------------------------------------------------------------------------
//STRATEGY: NAKED PAIRS
//-----------------------------------------------------------------------------

//helper method to determine the eqaulity of two arrays (from StackOverflow)
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}


function getNakedPairsLocations(sudoku) {
    var twinLocations = [];
    for (var r = 0; r < 9; r++) {
        for (var c = 0; c < 9; c++) {
            var candList = sudoku.getCandidateList(r, c);
            if (candList.length === 2) {
                twinLocations.push([r, c]);
            }
        }
    }
    var locationArray = [];
    for (var i = 0; i < twinLocations.length - 1; i++) {
        for (var j = i + 1; j < twinLocations.length; j++) {
            var ri = twinLocations[i][0];
            var ci = twinLocations[i][1];
            var rj = twinLocations[j][0];
            var cj = twinLocations[j][1];
                
            if (!arraysEqual(sudoku.getCandidateList(ri, ci), sudoku.getCandidateList(rj, cj)))
                continue;

            var twin1 = sudoku.getCandidateList(ri, ci)[0]; // equivalently (rj, cj)[0]
            var twin2 = sudoku.getCandidateList(ri, ci)[1]; // equivalently (rj, cj)[1]

            var inSameRow = (ri === rj);
            var inSameCol = (ci === cj);
            var Ri = Math.floor(ri / 3);
            var Ci = Math.floor(ci / 3);
            var Rj = Math.floor(rj / 3);
            var Cj = Math.floor(cj / 3);
            var inSameBlock = ((Ri === Rj) && (Ci === Cj));

            if (inSameRow || inSameCol || inSameBlock) {
                locationArray.push([ri, ci, rj, cj, twin1, twin2, inSameRow, inSameCol, inSameBlock]);
            }
        }
    }
    return locationArray;
}
                                                                                                                                                                                                                                                   

function getEliminatedCandidateLocations(sudoku) {
    var locationArray = getNakedPairsLocations(sudoku);
    var elimCandidates = [];
    for (var i = 0; i < locationArray.length; i++) {
        var r1 = locationArray[i][0];
        var c1 = locationArray[i][1];
        var r2 = locationArray[i][2];
        var c2 = locationArray[i][3];
        var twin1 = locationArray[i][4];
        var twin2 = locationArray[i][5];
        var inSameRow = locationArray[i][6];
        var inSameCol = locationArray[i][7];
        var inSameBlock = locationArray[i][8];

        if (inSameRow) {
            // so r1 = r2
            for (var c = 0; c < 9; c++) {
                if (c === c1 || c === c2)
                    continue;
                if (sudoku.inCandidateList(r1, c, twin1))
                    elimCandidates.push([r1, c, twin1]);
                if (sudoku.inCandidateList(r1, c, twin2))
                    elimCandidates.push([r1, c, twin2]);
            }
        }

        if (inSameCol) {
            // so c1 = c2
            for (var r = 0; r < 9; r++) {
                if (r === r1 || r === r2)
                    continue;
                if (sudoku.inCandidateList(r, c1, twin1))
                    elimCandidates.push([r, c1, twin1]);
                if (sudoku.inCandidateList(r, c1, twin2))
                    elimCandidates.push([r, c1, twin2]);
            }
        }

        if (inSameBlock) {
            var R = Math.floor(r1 / 3);
            var C = Math.floor(c1 / 3);

            for (var r = 0; r < 3; r++) {
                for (var c = 0; c < 3; c++) {
                    var x = 3 * R + r;
                    var y = 3 * C + c;
                    if ((r1 === x) && (c1 === y))
                        continue;
                    if ((r2 === x) && (c2 === y))
                        continue;
                    if (sudoku.inCandidateList(x, y, twin1))
                        elimCandidates.push([x, y, twin1]);
                    if (sudoku.inCandidateList(x, y, twin2))
                        elimCandidates.push([x, y, twin2]);
                }
            } 
        }
    }
    return elimCandidates;
}


function showNakedPairs(sudoku) {
    var locationArray = getNakedPairsLocations(sudoku);
    for (var i = 0; i < locationArray.length; i++) {
        var r1 = locationArray[i][0];
        var c1 = locationArray[i][1];
        var r2 = locationArray[i][2];
        var c2 = locationArray[i][3];
        var twin1 = locationArray[i][4];
        var twin2 = locationArray[i][5];
       
        var cellID;
        var elem;
        
        cellID = 'location' + r1.toString() + c1.toString();
        elem = document.getElementById(cellID);
        elem.innerHTML = '<div class="uniqueCandidate">' + twin1.toString() + '</div>';
        elem.innerHTML += '<div class="uniqueCandidate">' + twin2.toString() + '</div>';

        cellID = 'location' + r2.toString() + c2.toString();
        elem = document.getElementById(cellID);
        elem.innerHTML = '<div class="uniqueCandidate">' + twin1.toString() + '</div>';
        elem.innerHTML += '<div class="uniqueCandidate">' + twin2.toString() + '</div>';
    }

    showEliminatedCandidates(sudoku);
}

//helper
function valueInArray(n, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (n === arr[i])
            return true;
    }
    return false;
}


function showEliminatedCandidates(sudoku) {
    var eliminatedCandidatesLocations = getEliminatedCandidateLocations(sudoku);
    var eliminatedCandidates = [];

    for (var i = 0; i < eliminatedCandidatesLocations.length; i++) {
        eliminatedCandidates.push(eliminatedCandidatesLocations[i][2]);
    }

    for (var i = 0; i < eliminatedCandidatesLocations.length; i++) {
        var r = eliminatedCandidatesLocations[i][0];
        var c = eliminatedCandidatesLocations[i][1];
        var n = eliminatedCandidatesLocations[i][2];
        var cellID = 'location' + r.toString() + c.toString();
        var elem = document.getElementById(cellID);
        elem.innerHTML = '';
        var candList = sudoku.getCandidateList(r, c);
        for (var j = 0; j < candList.length; j++) {
            if (valueInArray(candList[j], eliminatedCandidates))
                elem.innerHTML += '<div class="eliminatedCandidate">' + candList[j].toString() + '</div>';
            else 
                elem.innerHTML += '<div class="candidate">' + candList[j].toString() + '</div>';
        }
    }
}


function deduceFromNakedPairs(sudoku) {
    var eliminatedCandidates = getEliminatedCandidateLocations(sudoku);
    for (var i = 0; i < eliminatedCandidates.length; i++) {
        var r = eliminatedCandidates[i][0];
        var c = eliminatedCandidates[i][1];
        var n = eliminatedCandidates[i][2];
        sudoku.removeCandidate(r, c, n);
    }
    drawBoard(sudoku);
}
