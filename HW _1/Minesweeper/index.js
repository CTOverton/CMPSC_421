// ========== [ Globals ] ==========
var mines = 10;
var boardSize = 100;

// ========== [ Events ] ==========

// Page Load
$(document).ready(function(){
    generate();
});

function generate() {

    for (var i=0; i<Math.sqrt(boardSize); i++) {
        var row = document.createElement('div');
        row.className += 'grid-row';
        $('.grid-container').append(row);

        for (var j=0; j<Math.sqrt(boardSize); j++) {
            var cell = document.createElement('div');
            cell.className += 'grid-cell';
            $('.grid-row')[i].append(cell);
        }

    }

}