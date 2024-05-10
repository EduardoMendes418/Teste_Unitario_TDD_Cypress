import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { PokemonType } from "../../types/pokemonTypes";
import { useNavigate } from "react-router-dom";

interface IProps {
  fetchPokemonList: () => Promise<PokemonType[]>;
}

export default function Dashboard({ fetchPokemonList }: IProps) {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);

  function handleNavigate(id:number){
    navigate(`/pokemon-detail/${id}`)
  }

  useEffect(() => {
    (async () => {
      const data = await fetchPokemonList();
      setPokemons(data);
    })();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Dashboard</h2>
      <ul className={styles["container-pokemons"]}>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id} onClick={() => handleNavigate(pokemon.id)}>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <strong>{pokemon.type}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
