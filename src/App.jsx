import { useState } from 'react'
import './styles/App.css'
import Card from './components/Card.jsx'
import getPokemon from './pokemon.js';

function App() {
  const pokemonListSize = 9;

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // State
  const [loading, setLoading] = useState(true);

  const [pokemonList, setPokemonList] = useState(null); // all fetched pokemon
  const [displayedPokemon, setDisplayedPokemon] = useState(null); // currently displayed pokemon
  const [selectedPokemon, setSelectedPokemon] = useState([]); // pokemon already selected this round

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Functions

  // Shuffles pokemon cards displayed in UI
  function shuffleCards() {
    if (!pokemonList) {
      console.log('ERROR: Pokemon list has not initialised.');
      return;
    }
    const shuffledPokemonList = [...pokemonList].sort(() => Math.random() - 0.5);
    const newDisplayedPokemon = shuffledPokemonList.slice(0, 9);
    setDisplayedPokemon(newDisplayedPokemon);
  }

  // Handles UI selection of a pokemon card
  function handleClick(e) {
    const currentSelection = e.currentTarget.id;
    if (selectedPokemon.includes(currentSelection)) {
      // already selected this pokemon
      if (score > highScore) {
        setHighScore(score);
      }

      setScore(0);
      setSelectedPokemon([]);
    } else {
      // selected new pokemon
      setScore(score + 1);

      setSelectedPokemon(prevSelecteds => {
        const newSelecteds = [...prevSelecteds];

        newSelecteds.push(currentSelection);

        return newSelecteds;
      });
    }
    shuffleCards();
  }

  // Fills initial pokemon list with data fetched from pokeapi.co
  async function fillPokemonList() {
    try {
      if (!pokemonList) {
        const pokemon = await getPokemon(pokemonListSize);
        setPokemonList(pokemon);

        // initial setting of displayed pokemon from shuffled fetched pokemon
        const shuffledPokemonList = [...pokemon].sort(() => Math.random() - 0.5);
        const newDisplayedPokemon = shuffledPokemonList.slice(0, 9);
        setDisplayedPokemon(newDisplayedPokemon);

        console.log("Loading finished.");
        setLoading(false);
      }
    } catch (error) {
      console.error(`Failed to fill pokemon list: `, error.message);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Rendering

  if (!pokemonList) {
    fillPokemonList();
  }

  if (loading) {
    return (
      <main>
        <header>
          <h1>Memory Card</h1>
          <p>Score: {score} - High Score: {highScore}</p>
        </header>
        <div className="cardGrid">
          <p>Loading...</p>
        </div>
      </main>
    )
  } else {
    return (
      <main>
        <header>
          <h1>Memory Card</h1>
          <p>Score: {score} - High Score: {highScore}</p>
        </header>
        <div className="cardGrid">
          <Card pokemon={displayedPokemon[0]} handleClick={handleClick} />
          <Card pokemon={displayedPokemon[1]} handleClick={handleClick} />
          <Card pokemon={displayedPokemon[2]} handleClick={handleClick} />
          <Card pokemon={displayedPokemon[3]} handleClick={handleClick} />
          <Card pokemon={displayedPokemon[4]} handleClick={handleClick} />
          <Card pokemon={displayedPokemon[5]} handleClick={handleClick} />
          <Card pokemon={displayedPokemon[6]} handleClick={handleClick} />
          <Card pokemon={displayedPokemon[7]} handleClick={handleClick} />
          <Card pokemon={displayedPokemon[8]} handleClick={handleClick} />
        </div>
        <p>Total pool of pokemon: {pokemonListSize}</p>
      </main>
    )
  }
}

export default App;