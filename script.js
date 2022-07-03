const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeButtonNormal = document.querySelector('[poke-button-normal]');
const pokeButtonShiny = document.querySelector('[poke-button-shiny]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    fairy: '#fc82c4',
    dark: '#6d6a6c',
    default: '#ffffff',
};


async function searchPokemon(event) {
  try{
    event.preventDefault();
    const {value} = event.target.pokemon;
    
    const data_json = await fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}/`);
    const data = await data_json.json();

    const sprite = [data.sprites.front_default, data.sprites.front_shiny];
    
    const { stats, types } = data;
    pokeName.textContent = data.name.toUpperCase();

    pokeImg.setAttribute('src', sprite[0]);
    pokeId.textContent = (`No ${data.id}`);

    setCardColor(types);
    renderButtonNormal(sprite);
    renderButtonShiny(sprite);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    
    // console.log(data);
  }
  catch {
    renderNotFound();
  }
}


const renderButtonNormal = sprite => {
  pokeButtonNormal.innerHTML = '';
  
  const buttonElement = document.createElement("button");
  buttonElement.innerHTML = "Normal";
  buttonElement.className = "container btn btn-success my-2";
  buttonElement.addEventListener("click", function () {
    pokeImg.setAttribute('src', sprite[0]);
  });
  pokeButtonNormal.appendChild(buttonElement);
}

const renderButtonShiny = sprite => {
  pokeButtonShiny.innerHTML = '';
  
  const buttonElement = document.createElement("button");
  buttonElement.innerHTML = "Shiny";
  buttonElement.className = "container btn btn-success my-2";
  buttonElement.addEventListener("click", function () {
    pokeImg.setAttribute('src', sprite[1]);
  });
  pokeButtonShiny.appendChild(buttonElement);
}

const setCardColor = types => {
  const colorOne = typeColors[types[0].type.name];
  const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors["default"];
  pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
  pokeImg.style.backgroundSize = '5px 5px';
}

const renderPokemonTypes = types => {
  pokeTypes.innerHTML = '';
  types.forEach(type => {
    const typeTextElement = document.createElement("div");
    typeTextElement.style.color = typeColors[type.type.name];
    typeTextElement.textContent = type.type.name;
    pokeTypes.appendChild(typeTextElement);
  });
}

const renderPokemonStats = stats => {
  pokeStats.innerHTML = '';
  stats.forEach(stat => {
    const statElement = document.createElement("div");
    const statElementName = document.createElement("div");
    const statElementAmount = document.createElement("div");
    statElementName.textContent = stat.stat.name;
    statElementAmount.textContent = stat.base_stat;
    statElement.appendChild(statElementName);
    statElement.appendChild(statElementAmount);
    pokeStats.appendChild(statElement);
  });
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'poke-shadow.png');
    pokeImg.style.background =  '#fff';
    pokeButtonNormal.innerHTML = 'Type a valid';
    pokeButtonShiny.innerHTML = 'Pokemon';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}