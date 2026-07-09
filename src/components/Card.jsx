function Card({ pokemon = { name: "loading...", image: "loading..." }, handleClick }) {

    return (
        <div id={pokemon.name} onClick={handleClick}>
            <p>{pokemon.name}</p>
            <img src={pokemon.image} alt={pokemon.name} />
        </div>
    )
}

export default Card;