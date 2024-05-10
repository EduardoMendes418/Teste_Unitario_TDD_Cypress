
import { PokemonType } from '../types/pokemonTypes';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export async function fetchPokemonList(): Promise<PokemonType[]> {
  const response = await axios.get(`${BASE_URL}/pokemon`);
  return response.data;
}

export async function fetchPokemonDetail(id: number): Promise<PokemonType> {
  const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
  return response.data;
}
