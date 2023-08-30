import useSwr from "swr";
import * as PokemonApi from "@/network/pokemon-api";
import { AxiosError } from "axios";

export default function usePokemon(name: string) {
  const { data, isLoading } = useSwr(name, async (name) => {
    try {
      return await PokemonApi.getPokemon(name);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return null; // ! u ovom slučaju null neće throwat error i request je validan
        // ! ovo je bitno kada npr. pokemon name je pogrešan (404 not found) - ne trebam refetchat, uvijek će failat u svakom sljedećem
      } else {
        throw error; // ! ako throwam error swr će pokušavati refetchat data
      }
    }
  });
  return { pokemon: data, pokemonLoading: isLoading };
}

// ! ovo je bez async callback - on treba za provjeru dali je response 404 da ne refetcham više
// export default function usePokemon(name: string) {
//   const { data, isLoading } = useSwr(name, PokemonApi.getPokemon, {
//     revalidateOnFocus: false, // ! optimisticData config - third argument in useSwr hook
//   });
//   return { pokemon: data, pokemonLoading: isLoading };
// }
