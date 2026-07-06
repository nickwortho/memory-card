function Card({ pokemon = { name: "loading...", image: "loading..." } }) {

    return (
        <div>
            <p>{pokemon.name}</p>
            <img src={pokemon.image} alt={pokemon.image} />
        </div>
    )
}

export default Card;