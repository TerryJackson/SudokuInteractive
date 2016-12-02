//---------------------------------------------------------------
// Object Definitions
//---------------------------------------------------------------


//--------------------------------------------------------------------
// Cell Object
//
// row and col in range 0,...,8
// value is in the range 0 to 9, where 0 indicates the cell value is unknown in the Sudoku grid.
// candidateList is a subset of {1,...,9} or is an empty array.
// the candidateList is an empty array when the value is known (i.e. not zero)
//--------------------------------------------------------------------

function Cell(row, col, value) {
    this.row = row;
    this.col = col;
    this.value = value;
    this.candidateList = [];

    this.numberCandidates = function() {
        return this.candidateList.length;
    };

    this.removeCandidate = function(n) {
        var index = this.candidateList.indexOf(n);

        if (index > -1) {
            this.candidateList.splice(index, 1);
        }
    };

    this.addCandidate = function(n) {
        // Make sure n is not already in the list.
        for (var i = 0; i < this.candidateList.length; i++) {
            if (this.candidateList[i] == n)
                return;
        }
        this.candidateList.push(n);
    };

    this.setValue = function(n) {
        this.value = n;
        this.candidateList = [];    // If the value is known the candidate list should be empty.
    }
}


//--------------------------------------------------------------------
// Sudoku Object
//
// This is the main object of the application.
// entryArray is an array of 81 digits, i.e. elements of {0,1,...,9}
//--------------------------------------------------------------------

function Sudoku(entryArray) {
    this.entryArray = entryArray;

    if (entryArray.length != 9 * 9) {
        console.log("Error: array is not 81 elements.");
    }

    var cells = [];

    for (var r = 0; r < 9; r++) {
        cells[r] = [];

        for (var c = 0; c < 9; c++) {
            var index = 9 * r + c;
            cells[r][c] = new Cell(r, c, entryArray[index]);
        }
    }

    this.cells = cells;

    this.getEntryValue = function(r, c) {
        return this.cells[r][c].value;
    };


    this.setEntryValue = function(r, c, n) {
        this.cells[r][c].setValue(n); // This sets the entry value and makes the candidate list empty.
        // Remove all candidates equal to n from the same houses
        this.removeCandidateFromRow(r, n);
        this.removeCandidateFromCol(c, n);
        var R = Math.floor(r / 3);
        var C = Math.floor(c / 3);
        this.removeCandidateFromBlock(R, C, n);
    };


    this.isEntryKnown = function(r, c) {
        return (this.cells[r][c].value !== 0);
    };


    this.isEntryUnknown = function(r, c) {
        return (this.cells[r][c].value === 0);
    };


    this.getCandidateList = function(r, c) {
        return this.cells[r][c].candidateList;
    };


    this.inCandidateList = function(r, c, n) {
        return (this.cells[r][c].candidateList.indexOf(n) > -1);
    };


    this.getCandidateListLength = function(r, c) {
        return this.cells[r][c].candidateList.length;
    };


    this.addCandidate = function(r, c, n) {
        this.cells[r][c].addCandidate(n);
    };


    this.removeCandidate = function(r, c, n) {
        this.cells[r][c].removeCandidate(n);
    };

    this.removeCandidateFromRow = function(r, n) {
        for (var c = 0; c < 9; c++) {
            this.removeCandidate(r, c, n);
        }
    };

    this.removeCandidateFromCol = function(c, n) {
        for (var r = 0; r < 9; r++) {
            this.removeCandidate(r, c, n);
        }
    };

    this.removeCandidateFromBlock = function(R, C, n) {
        for (var r = 0; r < 3; r++) {
            for (var c = 0; c < 3; c++) {
                this.removeCandidate(3 * R + r, 3 * C + c, n);
            }
        }
    };

    // Gives the total number of unknown squares in the Sudoku grid that are unknown.
    this.numberUndefined = function() {
        var count = 0;
        for (var r = 0; r < 9; r++)
            for (var c = 0; c < 9; c++) {
                if (this.getEntryValue(r,c) === 0) {
                    count++;
                }
            }
        return count;
    };

    // Returns an array with the values (excluding 0) of the given row.
    this.getRowValues = function(r) {
        var row = [];
        for (var c = 0; c < 9; c++) {
            var n = this.cells[r][c].value;
            if (n !== 0) {
                row.push(n);
            }
        }
        return row;
    };

    // Returns an array with the values (excluding 0) of the given column .
    this.getColValues = function(c) {
        var col = [];
        for (var r = 0; r < 9; r++) {
            var n = this.cells[r][c].value;
            if (n !== 0) {
                col.push(n);
            }
        }
        return col;
    };

    // Returns an array with the values (excluding 0) of the 3x3 block at (R, C)
    // Here R, C are in {0,1,2}
    this.getBlockValues = function(R, C) {
        var cell = [];
        for (var i = 0; i < 3; i++)
            for (var j = 0; j < 3; j++) {
                var n = this.cells[3 * R + i][3 * C + j].value;
                if (n !== 0) {
                    cell.push(n);
                }
            }
        return cell;
    };


    this.getRowMissingValues = function(r) {
        var missingValues = [];
        var row = this.getRowValues(r);
        for (var n = 1; n <= 9; n++) {
            //see if n is contined in row
            if (row.indexOf(n) === -1)
                missingValues.push(n);
        }
        return missingValues;
    };


    this.getColMissingValues = function(c) {
        var missingValues = [];
        var col = this.getColValues(c);
        for (var n = 1; n <= 9; n++) {
            //see if n is contined in col
            if (col.indexOf(n) === -1)
                missingValues.push(n);
        }
        return missingValues;
    };


    this.getBlockMissingValues = function(R, C) {
        var missingValues = [];
        var block = this.getBlockValues(R, C);
        for (var n = 1; n <= 9; n++) {
            //see if n is contined in row
            if (block.indexOf(n) === -1)
                missingValues.push(n);
        }
        return missingValues;
    };

    // Returns and array of positions [r,c] at which cells[r,c] is 0.
    this.getRowMissingIndices = function(r) {
        var missingIndices = [];
        for (var c = 0; c < 9; c++) {
            if(this.cells[r][c].value === 0) {
                missingIndices.push([r, c]);
            }
        }
        return missingIndices;
    };


    this.getColMissingIndices = function(c) {
        var missingIndices = [];
        for (var r = 0; r < 9; r++) {
            if(this.cells[r][c].value === 0) {
                missingIndices.push([r,c]);
            }
        }
        return missingIndices;
    };


    this.getBlockMissingIndices = function(R, C) {
        var missingIndices = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.cells[3 * R + i][3 * C + j].value === 0) {
                    missingIndices.push([3 * R + i, 3 * C + j])
                }
            }
        }
        return missingIndices;
    };


    this.rowContainsValue = function(r, n) {
        var row = this.getRowValues(r);
        var index = row.indexOf(n);
        return (index > -1);
    };


    this.colContainsValue = function(c, n) {
        var col = this.getColValues(c);
        var index = col.indexOf(n);
        return (index > -1);
    };


    this.blockContainsValue = function(R, C, n) {
        var block = this.getBlockValues(R, C);
        var index = block.indexOf(n);
        return (index > -1);
    };


    this.setCandidateList = function(r, c, newCandidateList) {
        this.cells[r][c].candidateList = newCandidateList;
    };


    // Number of times a value n appears as a candidate in row r
    this.occurencesCandidateinRow = function(r, n) {
        var count = 0;
        for (var c = 0; c < 9; c++) {
            if (sudoku.inCandidateList(r, c, n))
                count++;
        }
        return count;
    };


    // Number of times a value n appears as a candidate in column c
    this.occurencesCandidateinCol = function(c, n) {
        var count = 0;
        for (var r = 0; r < 9; r++) {
            if (sudoku.inCandidateList(r, c, n))
                count++;
        }
        return count;
    };


    // Number of times a value n appears as a candidate in block (R, C)
    this.occurencesCandidateinBlock = function(R, C, n) {
        var count = 0;
        for (var r = 0; r < 3; r++) {
            for (var c = 0; c < 3; c++) {
                if (sudoku.inCandidateList(3 * R + r, 3 * C + c, n))
                count++;
            }
        }
        return count;
    };


    //verification that the current sudoku values match the given entry array
    this.verifyAgainstEntryArray = function() {
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                var index = 9 * r + c;
                if (this.entryArray[index] !== 0 && this.entryArray[index] !== this.getEntryValue(r,c))
                    return false;
            }
        }
        return true;
    };


    //this function determines if there are any violations of the one rule currently in the entered values.
    this.verifyCurrentConsistency = function() {
        for (var n = 1; n <= 9; n++) {

            // Look for n in the rows
            for (var r = 0; r < 9; r++) {
                //count the number of n's in row r
                var count = 0;
                for (var c = 0; c < 9; c++) {
                    if (sudoku.getEntryValue(r,c) === n)
                        count++;
                }
                if (count > 1)
                    return false;
            }

            // Look for n in the columns
            for (var c = 0; c < 9; c++) {
                //count the number of n's in column c
                var count = 0;
                for (var r = 0; r < 9; r++) {
                    if (sudoku.getEntryValue(r,c) === n)
                        count++;
                }
                if (count > 1)
                    return false;
            }

            // Look for n in the blocks
            for (var R = 0; R < 3; R++) {
                for (var C = 0; C < 3; C++) {
                    var count = 0;
                    for (var r = 0; r < 3; r++) {
                        for (var c = 0; c < 3; c++) {
                            if (sudoku.getEntryValue(3 * R + r, 3 * C + c) === n)
                                count++;
                        }
                    }
                    if (count > 1)
                        return false;
                }
            }
        }
        return true;
    };


    this.isSolved = function() {
        return this.numberUndefined() === 0 && this.verifyAgainstEntryArray(entryArray) && this.verifyCurrentConsistency();
    }


    // Use this to print the sudoku grid to the console.
    this.toString = function() {
        var div = "=====================================\n";
        var s = "\n";

        for (var r = 0; r < 9; r++) {

            if (r % 3 === 0)
                s += div;

            for (var c = 0; c < 9; c++) {
                if (c % 3 === 0) {
                    s += "|  ";
                }
                var n = this.cells[r][c].value;
                if (n === 0)
                    s += "   ";  //"u  ";
                else
                    s += n + "  ";
            }
            s += "|\n";
        }

        s += div;
        s += "Number Undefined: " + this.numberUndefined() + "\n";
        return s;
    };
}



function entryStringToEntryArray(entryString) {
    var entryCharacterArray = entryString.split('');
    var entryArray = [];
    for (var i = 0; i < entryCharacterArray.length; i++) {
        entryArray.push(parseInt(entryCharacterArray[i]));
    }
    return entryArray;
}


function googleDataToEntryArray(gdata) {
    var entryCharacterArray = gdata.split('');
    var entryArray = [];
    for (var i = 0; i < entryCharacterArray.length; i++) {
        if (entryCharacterArray[i] === '.')
            entryArray.push(0);
        else 
            entryArray.push(parseInt(entryCharacterArray[i]));
    }
    return entryArray; 
}






