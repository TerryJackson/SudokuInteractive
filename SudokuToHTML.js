//---------------------------------------------------------------
// Creating the HTML to draw the board
//---------------------------------------------------------------

// We use this method when we have an existing sudoku object and we want
// to draw it to the screen.
function drawBoard(sudoku) {
    var elem = document.getElementById("containerSudoku");
    elem.innerHTML = boardToHTML(sudoku);
}


function boardToHTML(sudoku) {
    var html = '';
    for (var R = 0; R < 3; R++) {
        for (var C = 0; C < 3; C++) {
            html += blockToHTML(sudoku, R, C);
        }
    }
    return html;
}


function blockToHTML(sudoku, R, C) {
    var html = '';
    html += '<div class="block">';
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            html += cellToHTML(sudoku, 3 * R  + r, 3 * C + c);
        }
    }
    html += '</div>';
    return html;
}


function cellToHTML(sudoku, r, c) {
    var html = '';
    html +=  '<div class="cell" id="location' + r + c + '">';
    //The entry will either be known and display a value or be unknown
    //and display the digits of the candidate list.
    if (sudoku.isEntryKnown(r, c)) {
        //the entry is known
        html += '<div class="value">';
        html += sudoku.getEntryValue(r, c).toString();
        html += '</div>';
    } else {
        //the entry is unknown
        var candidateList = sudoku.getCandidateList(r, c);

        for (var i = 0; i < candidateList.length; i++) {
                html += '<div class="candidate">';
                html += candidateList[i].toString();
                html += '</div>';
        }
    }
    html +='</div>';
    return html;
}


//-------------------------------------------------------------------------------------------------------

// We use this method when we want to present the user an empty board to fill in.
// Notice we do not have any sudoku object as a paramater to this function.
function drawEmptyBoard() {
    var elem = document.getElementById("containerSudoku");
    elem.innerHTML = emptyBoardToHTML();
}


function emptyBoardToHTML() {
    var html = '';
    for (var R = 0; R < 3; R++) {
        for (var C = 0; C < 3; C++) {
            html += emptyBlockToHTML(R, C);
        }
    }
    return html;
}


function emptyBlockToHTML(R, C) {
	var html = '';
    html += '<div class="block">';
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            html += emptyCellToHTML(3 * R  + r, 3 * C + c);
        }
    }
    html += '</div>';
    return html;
}


function emptyCellToHTML(r, c) {
	var html = '';
    html +=  '<div class="emptycell">';
    var nameID = "location" + r.toString() + c.toString();
    html += '<input type="text" autocomplete="off" maxlength="1" id="' + nameID + '" value="">';
    html += '</div>';
    return html;
}




