let postNumber = 25;
let body = document.getElementById('body');

$(document).ready(function() {
    render();
});

function getData(endPoint) {
    return new Promise(function (resolve, reject) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://jsonplaceholder.typicode.com/"+endPoint,
            "method": "GET"
        };

        $.ajax(settings).done(function (response) {
            // console.log(endPoint + ': ' + response);
            resolve(response);
        });
    });
}

function render() {
    $('#body').empty();

    let posts = getData('posts');
    let users = getData('users');
    let photos = getData('photos');

    Promise.all([posts, users, photos]).then(function(values){
        console.log(values);
        let rowcount = 0;
        let currentRow = null;
       for(let i=0; i<postNumber; i++) {
           if (rowcount == 0) {
               rowcount++;
               let row = createEl('div', 'row','', body);
               currentRow = row;
           } else {
               if (rowcount < 2) {rowcount++;} else {rowcount = 0;}
           }
           let col = createEl('div', 'col s12 m4','', currentRow);
           let card = createEl('div', 'card','', col);
           let card_img = createEl('div', 'card-image','', card);
           let img = document.createElement('img');
           img.setAttribute('src', values[2][i].url);
           card_img.appendChild(img);
           createEl('span', 'card-title',values[0][i].title, card_img);
           let card_content = createEl('div', 'card-content','', card);
           createEl('p', '',values[0][i].body, card_content);
           let card_action = createEl('div', 'card-action','', card);
           createEl('a', 'card-action','View Full Post ' + i, card_action);
       }
       $('a').click(function (el) {

           let i = el.target.innerHTML.slice(15,16);
           console.log(i);
           $('#body').empty();
           let row = createEl('div', 'row','', body);
           let col = createEl('div', 'col s12 m4','', row);
           let card = createEl('div', 'card','', col);
           let card_img = createEl('div', 'card-image','', card);
           let img = document.createElement('img');
           img.setAttribute('src', values[2][i].url);
           card_img.appendChild(img);
           createEl('span', 'card-title',values[0][i].title, card_img);
           let card_content = createEl('div', 'card-content','', card);
           createEl('p', '',values[0][i].body, card_content);
           let card_action = createEl('div', 'card-action','', card);
           createEl('a', 'card-action','View Full Post', card_action);

           let row2 = createEl('div', 'row','', body);
           let ul = createEl('ul', 'row','', body);
       })

    });

}

function createEl(type, className, html, parent) {
    let el = document.createElement(type);
    if ((className != null) && (className != '')){ el.className = className }
    if ((html != null) && (html != '')){ el.innerHTML = html }
    parent.appendChild(el);
    return el;
}