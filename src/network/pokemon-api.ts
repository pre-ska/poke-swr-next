import { Pokemon, PokemonPage } from "@/models/Pokemon";
import api from "./axiosInstance";

export async function getPokemon(name: string) {
  const { data } = await api.get<Pokemon>(`/pokemon/${name}`);
  return data;
}

export async function getPokemonPage(page: number) {
  const pageSize = 12;
  const { data } = await api.get<PokemonPage>(
    `/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`
  );
  return data;
}
