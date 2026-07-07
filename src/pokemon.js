async function getPokemon(numPokemon) {
    // bound check on number of api fetches
    if (numPokemon < 9) numPokemon = 9;
    if (numPokemon > 30) numPokemon = 30;

    const pokemonUrls = generateRandomPokemonUrls(numPokemon);
    const pokemonList = await fetchPokemonFromAPI(pokemonUrls);

    return pokemonList;
}

function generateRandomPokemonUrls(numPokemon) {
    const maxId = 151;
    const minId = 1;

    const pokemonUrls = [];
    for (let i = 0; i < numPokemon; i++) {
        let url = '';
        do {
            const id = Math.floor(Math.random() * (maxId - minId + 1) + minId);
            url = `https://pokeapi.co/api/v2/pokemon/${id}/`
        } while (pokemonUrls.includes(url));
        pokemonUrls.push(url);
    }

    return pokemonUrls;
}

async function fetchPokemonFromAPI(urlList) {
    try {
        const pokemonList = [];
        for (let i = 0; i < urlList.length; i++) {
            const url = urlList[i];

            const response = await fetch(url);
            console.log(`Fetched from ${url}`);
            const pokemon = await response.json();

            pokemonList.push(
                {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.front_default
                });
        }
        return pokemonList;
    } catch (error) {
        console.error('Failure during API fetch: ', error.message);
        return null;
    }
}

export default getPokemon;