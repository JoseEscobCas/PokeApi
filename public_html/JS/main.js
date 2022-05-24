
document.addEventListener("DOMContentLoaded", () => {
    fetchPokemons(offset, limit);
});

const pokemonContainer = document.querySelector(".poke-container");
const spinner = document.querySelector(".spinners");
const alerta = document.getElementById("alert");
const closeAlert = document.querySelector(".infoX");
const info = document.getElementById("info");

//btn alerta de informacion
alerta.style.display = "none";

closeAlert.addEventListener('click', () => {
    alerta.style.display = "none";
     location.reload();
});

//btn
const privius = document.querySelector("#privius");
const next = document.querySelector("#next");


let offset = 1;
let limit = 8;

//btn event
privius.addEventListener('click', () => {
    if (offset !== 1) {
        offset -= 9;
        removeChild(pokemonContainer);
        fetchPokemons(offset, limit);
    }
});

next.addEventListener('click', () => {
    offset += 9;
    removeChild(pokemonContainer);
    fetchPokemons(offset, limit);
});

const fecthPokemon = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        createPokemon(data);
        spinner.style.display = "none";

    } catch (error) {
        console.log(error);
    }
};

function fetchPokemons(offset, limit) {
    spinner.style.display = "block";
    for (var i = offset; i <= offset + limit; i++) {
        fecthPokemon(i);
    }
}

function createPokemon(pokemon) {
    const card = document.createElement('div');
    card.classList.add('pokemon-block');

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
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('p');
    name.classList.add('name-poke');
    name.textContent = pokemon.name;



    //card append child to see all the complete card
    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
    card.appendChild(progressBars(pokemon.stats));

    pokemonContainer.appendChild(card);
}
;

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

function removeChild(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
;


