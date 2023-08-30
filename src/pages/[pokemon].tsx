import { useRouter } from "next/router";
import useSwr from "swr";
import * as PokemonApi from "@/network/pokemon-api";

export default function PokemonDetailsPage() {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || ""; // ! get pokemon name from url params

  const { data, isLoading } = useSwr(pokemonName, PokemonApi.getPokemon);

  return <div>PokemonDetailsPage</div>;
}
