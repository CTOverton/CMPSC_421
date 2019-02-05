// ========== [ Globals ] ==========
var minePercentage = 20;
var boardSize = 100;

var firstClick = true;

var winmsg = 'You won!';
var lossmsg = 'You Exploded.';

// ========== [ Events ] ==========

// Page Load
$(document).ready(function(){
    $('.modal').modal();
    generate();
});

$('#playAgain').click(function() {
    firstClick = true;
    generate();
});

// ========== [ Functions ] ==========

function generate() {
    $('.grid-container').empty();

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

    $('.grid-cell').click(function() {
        sweep($(this));
    });
    $('.grid-cell').contextmenu(function() {
        if ($(this).hasClass('flag')) {$(this).removeClass('flag')}
        else {$(this).addClass('flag')}
    });

}

function addMines(){
    $.each($('.grid-cell'), function(){
        var chance = Math.floor(Math.random()*100);

        if ((chance <= minePercentage) && !($(this).hasClass('start'))) {$(this).addClass('mine')}
    });
}

function sweep(cell) {
    if (firstClick) {
        firstClick = false;
        cell.addClass('start');
        addMines();
    }

    if (!(cell.hasClass('sweeped'))){
        cell.gridRow = cell.parent().index();
        cell.gridCell = cell.index();
        if (cell.hasClass('mine')) {
            cell.isMine = true;
            end(false);
        } else {
            console.log('[%s,%s] %s', cell.gridRow, cell.gridCell, cell.isMine);

            var adjacent = [
                [cell.gridRow - 1, cell.gridCell -1], [cell.gridRow - 1, cell.gridCell], [cell.gridRow - 1, cell.gridCell +1],
                [cell.gridRow, cell.gridCell -1], [cell.gridRow, cell.gridCell +1],
                [cell.gridRow + 1, cell.gridCell -1], [cell.gridRow + 1, cell.gridCell], [cell.gridRow + 1, cell.gridCell +1],
            ];

            var count = 0;

            for (var i=0; i<adjacent.length; i++) {
                var row = adjacent[i][0];
                var col = adjacent[i][1];

                if ((row >= 0)&&(col >= 0) && (row < Math.sqrt(boardSize))&&(col < Math.sqrt(boardSize))) {
                    var checkCell = $('.grid-row').eq(row).find('.grid-cell').eq(col);

                    if (checkCell.hasClass('mine')){count++}
                }
            }
            cell.addClass('count'+ count);
            cell.addClass('sweeped');
            console.log('Count: %s', count);
            if (count == 0){
                for (var i=0; i<adjacent.length; i++) {
                    var nextCell = $('.grid-row').eq(adjacent[i][0]).find('.grid-cell').eq(adjacent[i][1]);
                    if (((adjacent[i][0] >= 0)&&(adjacent[i][1] >= 0) && (adjacent[i][0] < Math.sqrt(boardSize))&&(adjacent[i][1] < Math.sqrt(boardSize)))) {
                        console.log(nextCell);
                        sweep(nextCell);

                    }
                }
            }
        }
    }

}

function end(win) {
    $('.mine').addClass('show');
    if (win) {
        console.log('Won');
        wins++;

        $('#endModal #title').text(winmsg);

        var instance = M.Modal.getInstance($('#endModal'));
        instance.open();

    } else {
        console.log('Lost');

        $('#endModal #title').text(lossmsg);

        var instance = M.Modal.getInstance($('#endModal'));
        instance.open();

    }

}