// ========== [ Globals ] ==========
let words = ['space',
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
let selectedWord = '';
let guessAttempts = 0;
let guesses = [];
let progress = [];
let wins = 0;

let winmsg = 'You Survived!';
let lossmsg = 'You Died.';

// ========== [ Events ] ==========

// Page Load
$(document).ready(function(){
    start();
    $('.modal').modal();
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
    guessAttempts = 6;
    guesses = [];
    progress = [];
    $('#keys .btn').removeClass('disabled');

    updateGraphic(true);
    updateGraphic(false);

    $('#progress').empty();
    for (let i=0; i<selectedWord.length; i++) {
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

        let instance = M.Modal.getInstance($('#endModal'));
        instance.open();

    } else {
        console.log('Lost');

        $('#endModal #title').text(lossmsg);
        $('#endModal #guesses').text('');
        $('#endModal #wins').text('');

        let instance = M.Modal.getInstance($('#endModal'));
        instance.open();

    }
}

function checkInput(key){
    console.log('User Pressed: %s', key);
    if ($.inArray(key,guesses) == -1) {
        guesses.push(key);
        console.log();
        $('#keys').find(".btn:contains("+ key +")").addClass('disabled');

        let correct = [];

        for (let i=0; i<selectedWord.length; i++) {
            if (key == selectedWord.charAt(i)) {
                correct.push(i);
            }
        }

        if (correct.length > 0) {
            console.log('Correct at: ' + correct);


            for (let i=0; i<correct.length; i++) {
                progress[correct[i]] = key;
            }
            console.log('Progress: ' + progress);

            // Update Visuals
            updateGraphic(true);

            // Check win
            let compare = [];
            for (let i=0; i<selectedWord.length; i++) {
                compare.push(selectedWord.charAt(i));
            }
            console.log(JSON.stringify(compare) + ' | ' + JSON.stringify(progress));
            if (JSON.stringify(compare)==JSON.stringify(progress)) {end(true)}
        } else {
            console.log('Incorrect');
            updateGraphic(false);
            if (guessAttempts > 1) {guessAttempts--} else {end(false)}
            console.log('Guesses remaining: %s', guessAttempts);
        }
    }
}

function updateGraphic(correct) {
    if (correct) {
        for (let i=0; i<progress.length; i++) {
            if (progress[i] != null) {
                $('.wordDisplay')[i].innerText = progress[i].toUpperCase();
            }
        }
    } else {
        $('#man .container').text(guessAttempts);
    }

}

