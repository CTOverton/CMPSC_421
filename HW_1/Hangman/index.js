// ========== [ Globals ] ==========
var words = ['space',
    'earth',
    'jupiter',
    'mars',
    'neptune',
    'moon',
    'mercury',
    'pluto',
    'saturn',
    'venus',
    'uranus',
    'planet',
    'waning',
    'waxing',
    'asteroid',
    'astronaut',
    'comet',
    'binary star',
    'astronomer',
    'astronomy',
    'density',
    'constellation',
    'deep space',
    'cosmonaut',
    'cosmos',
    'crater',
    'day',
    'dwarf star',
    'dust',
    'equinox',
    'eclipse',
    'ecliptic',
    'galaxy',
    'lunar',
    'meteorite',
    'meteor',
    'meteoroid',
    'lens',
    'gravity',
    'inertia',
    'mass',
    'magnitude',
    'nebula',
    'orbit',
    'rocket',
    'solar',
    'solstice',
    'star',
    'umbra',
    'space',
    'sky',
    'satellite',
    'penumbra',
    'rings',
    'observatory',
    'phase',
    'universe',
    'zodiac',
    'sun',
    'starlight',
    'telescope'];
var selectedWord = '';
var guessAttempts = 0;
var guesses = [];
var progress = [];
var wins = 0;

var winmsg = 'You Survived!';
var lossmsg = 'You Died.';

// Tweaks
var attempts = 4;
var stars = 100;
var starSize = 4;

// ========== [ Events ] ==========

// Page Load
$(document).ready(function(){
    start();
    $('.modal').modal();
    gensvgs();
});

// User Key Input
$(window).keydown(function(e){
    checkInput(e.key);
});

$('#keys .btn').click(function() {
    checkInput($(this).text());
});

$('#playAgain').click(function() {
    start();
});

// ========== [ Functions ] ==========

function start(){
    // Init
    selectedWord = words[Math.floor(Math.random()*words.length)];
    console.log('Selected Word: %s', selectedWord);
    guessAttempts = attempts;
    guesses = [];
    progress = [];
    $('#keys .btn').removeClass('disabled');

    updateGraphic(true);
    updateGraphic(false);

    $('#progress').empty();
    for (var i=0; i<selectedWord.length; i++) {
        $('#progress').append("<div class=\"wordDisplay flow-text\"></div>");
    }
}

function end(win){
    if (win) {
        console.log('Won');
        wins++;

        $('#endModal #title').text(winmsg);
        $('#endModal #guesses').text('Score: '+ guessAttempts);
        $('#endModal #wins').text('Wins: ' + wins);

        var instance = M.Modal.getInstance($('#endModal'));
        instance.open();

    } else {
        console.log('Lost');

        $('#endModal #title').text(lossmsg);
        $('#endModal #guesses').text('');
        $('#endModal #wins').text('');

        var instance = M.Modal.getInstance($('#endModal'));
        instance.open();

    }
}

function checkInput(key){
    console.log('User Pressed: %s', key);
    if ($.inArray(key,guesses) == -1) {
        guesses.push(key);
        console.log();
        $('#keys').find(".btn:contains("+ key +")").addClass('disabled');

        var correct = [];

        for (var i=0; i<selectedWord.length; i++) {
            if (key == selectedWord.charAt(i)) {
                correct.push(i);
            }
        }

        if (correct.length > 0) {
            console.log('Correct at: ' + correct);


            for (var i=0; i<correct.length; i++) {
                progress[correct[i]] = key;
            }
            console.log('Progress: ' + progress);

            // Update Visuals
            updateGraphic(true);

            // Check win
            var compare = [];
            for (var i=0; i<selectedWord.length; i++) {
                compare.push(selectedWord.charAt(i));
            }
            console.log(JSON.stringify(compare) + ' | ' + JSON.stringify(progress));
            if (JSON.stringify(compare)==JSON.stringify(progress)) {end(true)}
        } else {
            console.log('Incorrect');
            if (guessAttempts > 1) {guessAttempts--} else {end(false)}
            console.log('Guesses remaining: %s', guessAttempts);
            updateGraphic(false);
        }
    }
}

function updateGraphic(correct) {
    if (correct) {
        for (var i=0; i<progress.length; i++) {
            if (progress[i] != null) {
                $('.wordDisplay')[i].innerText = progress[i].toUpperCase();
            }
        }
    } else {
        $('#fuel').width('' + (guessAttempts/attempts)*100 + '%');
        $('#man .container').text(guessAttempts);
    }
}

function gensvgs() {
    var draw = SVG('drawing').size('100%', '400');

    for (var i=0; i<stars; i++) {
        var sx = Math.floor(Math.random()*draw.node.clientWidth);
        var sy = Math.floor(Math.random()*(draw.node.clientHeight*0.75));
        var ssize = Math.floor(Math.random()*starSize);
        draw.circle(ssize).fill('#d8d5f4').move(sx,sy);
        //console.log('x: %s y: %s size: %s height: %s', sx, sy, ssize, draw.node.clientHeight);
    }

    var ship = draw.group();
    ship.polygon('32 0 0 96 32 80 32 0').fill('#d8d5f4');
    ship.polygon('32 0 64 96 32 80 32 0').fill('#b0b0c6');
    ship.center(draw.node.clientWidth/2,352);
}

