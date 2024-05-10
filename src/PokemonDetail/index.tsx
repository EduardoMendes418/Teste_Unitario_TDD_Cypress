import { Link, useParams } from "react-router-dom";
import { PokemonType } from "../types/pokemonTypes";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface IProps {
  fetchPokemonDetail: (id: number) => Promise<PokemonType>;
}

export default function PokemonDetail({ fetchPokemonDetail }: IProps) {
  const params = useParams();
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState<PokemonType>({
    id: 0,
    image: "",
    name: "",
    type: "",
  });

  useEffect(() => {
    (async () => {
      setError("");
      if (!params.id || params.id === "0") {
        setError('o id não é valido !')
        return;
      }

      const data = await fetchPokemonDetail(parseInt(params.id));
      setPokemon(data);
    })();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.image} alt={pokemon.name} />
        <strong>{pokemon.type}</strong>
        <Link to="/dashboard">Voltar</Link>
      </div>
      {error && <strong>{error}</strong>}
    </div>
  );
}
