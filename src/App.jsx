import { useEffect, useState } from 'react'
import './styles/App.css'
import Card from './components/Card.jsx'

function App() {
  const [loading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState(
    Array.from({ length: 9 }, () => (
      {
        id: crypto.randomUUID(),
        name: "loading name...",
        image: "loading img..."
      }
    ))
  );
  const [apiFetchCount, setApiFetchCount] = useState(0);
  let apiFetchUrl = `https://pokeapi.co/api/v2/pokemon/${apiFetchCount + 1}/`

  console.log(pokemonList);

  async function getCardImages() {
    try {
      let response = await fetch(apiFetchUrl);
      const pokemon = await response.json();
      setPokemonList(prevList => {
        const newList = [...prevList];

        newList[apiFetchCount] = {
          id: pokemon.name,
          name: pokemon.name,
          image: pokemon.sprites.front_default
        }

        return newList;
      });
      setApiFetchCount(apiFetchCount + 1);
      console.log(pokemonList);
    } catch (error) {
      console.log('ERROR');
    }
  }

  useEffect(() => {
    if (apiFetchCount < 9) getCardImages();
  }, [apiFetchCount]);

  return (
    <main>
      <header>
        <h1>Memory Card</h1>
      </header>
      <div className="cardGrid">
        {pokemonList.map((pokemonData) => {
          return (
            <Card key={pokemonData.id} pokemon={pokemonData} />
          );
        })}
      </div>
    </main>
  )

}
export default App;
