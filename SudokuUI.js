//---------------------------------------------------------------
// UI
//---------------------------------------------------------------


function submitSudokuUI() {
	var html = '';
	html += 'Enter the sudoku puzzle<br><br>';
	html += '<button onclick="submitGrid()">Submit</button>';
	var elem = document.getElementById("containerUI");
    elem.innerHTML = html;
}


function submitGrid() {
    var entryArray = [];
    for (var r = 0; r < 9; r++) {
        for (var c = 0; c < 9; c++) {
            var id = "location" + r.toString() + c.toString();
            var elem = document.getElementById(id);
            if (elem.value === "")
                entryArray.push(0);
            else
                entryArray.push(parseInt(elem.value));
        }
    }
    sudoku = new Sudoku(entryArray);
    strategyOneRule(sudoku);
    interactiveUI();
}


function interactiveUI() {
    var html = '<h3>Strategies</h3><br>';
    html += 'Naked Singles<br>';
    html += '<button onclick="showNakedSingles(sudoku)">Show</button>&nbsp';
    html += '<button onclick="drawBoard(sudoku)">Hide</button>&nbsp';
    html += '<button onclick="placeNakedSingles(sudoku)">Place</button><br><br>';

    html += 'Hidden Singles<br>';
    html += '<button onclick="showHiddenSingles(sudoku)">Show</button>&nbsp';
    html += '<button onclick="drawBoard(sudoku)">Hide</button>&nbsp';
    html += '<button onclick="placeHiddenSingles(sudoku)">Place</button><br><br>';

    html += 'Naked Pairs<br>';
    html += '<button onclick="showNakedPairs(sudoku)">Show</button>&nbsp';
    html += '<button onclick="drawBoard(sudoku)">Hide</button>&nbsp';
    html += '<button onclick="deduceFromNakedPairs(sudoku)">Deduce</button><br><br>';

    html += '<br><br><br><br>Restart<br>';
    html += '<button onclick="interactiveSolverWithInput()">Restart</button>&nbsp';

    var elem = document.getElementById("containerUI");
    elem.innerHTML = html;
}




