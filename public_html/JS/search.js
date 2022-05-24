const btnSearch = document.querySelector(".btn-search");
const btnClose = document.getElementById("closeX");
const box = document.getElementById("box");
const cardBox = document.querySelector(".search");
const input = document.querySelector(".input");
box.style.display = "none";

//btns
btnSearch.addEventListener('click', () => {
    box.style.display = "block";
    pokefetch();
});
btnClose.addEventListener('click', () => {
    box.style.display = "none";
    location.reload();
});


const pokefetch = async () => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.value.toLowerCase()}`);
        const data = await res.json();
        pokemonSearch(data);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

function pokemonSearch(pokemon) {

    const card = document.createElement('div');
    card.classList.add('searchCard');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.classList.add('img-card');
    sprite.src = pokemon.sprites.other.home.front_default;
    
     const types = document.createElement('p');
    types.textContent = "Types: " + pokemon.types[0].type.name;

    const weight = document.createElement('p');
    weight.textContent = "Weight: " + pokemon.weight;

    const height = document.createElement('p');
    height.textContent = "Height: " + pokemon.height;

    const abiliti = document.createElement('p');
    abiliti.textContent = "Ability one: " + pokemon.abilities[0].ability.name;

    const abilitow = document.createElement('p');
    abilitow.textContent = "Ability two: " + pokemon.abilities[1].ability.name;

    
     //bts event
    sprite.addEventListener('click', () => {
        alerta.style.display = "block";
        info.appendChild(name);
        info.appendChild(spriteContainer);
        info.appendChild(types);
        info.appendChild(weight);
        info.appendChild(height);
        info.appendChild(abiliti);
        info.appendChild(abilitow);
    });

    spriteContainer.appendChild(sprite);

    const number = document.createElement('h2');
    number.classList.add('number');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('p');
    name.classList.add('name-poke');
    name.textContent = pokemon.name;

    //card append child to see all the complete card
    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
    card.appendChild(progressBars(pokemon.stats));

    cardBox.appendChild(card);

}


function progressBars(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");

    for (let i = 0; i < 3; i++) {
        const stat = stats[i];

        const statPercent = stat.base_stat / 2 + "%";
        const statContainer = document.createElement("stat-container");
        statContainer.classList.add("stat-container");

        const statName = document.createElement("p");
        statName.classList.add("stat-p");
        statName.textContent = stat.stat.name;

        const progress = document.createElement("div");
        progress.classList.add("progress");

        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        progressBar.setAttribute("aria-valuenow", stat.base_stat);
        progressBar.setAttribute("aria-valuemin", 0);
        progressBar.setAttribute("aria-valuemax", 200);
        progressBar.style.width = statPercent;

        progressBar.textContent = stat.base_stat;

        progress.appendChild(progressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);

        statsContainer.appendChild(statContainer);
    }

    return statsContainer;
}
;

/*Drag elemnt*/
dragElement(box);


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}