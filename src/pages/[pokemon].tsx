import { useRouter } from "next/router";
import useSwr from "swr";
import * as PokemonApi from "@/network/pokemon-api";
import Head from "next/head";
import Link from "next/link";
import { Spinner } from "react-bootstrap";
import Image from "next/image";

export default function PokemonDetailsPage() {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || ""; // ! get pokemon name from url params

  const { data: pokemon, isLoading: pokemonLoading } = useSwr(
    pokemonName,
    PokemonApi.getPokemon,
    {
      revalidateOnFocus: false, // ! optimisticData config - third argument in useSwr hook
    }
  );

  return (
    <>
      <Head>
        {pokemon && <title>{`${pokemon.name} - NextJS PokéDex`}</title>}
      </Head>

      <div className="d-flex flex-column align-items-center">
        <p>
          <Link href="/" className="link-light">
            ← Back to Pokédex
          </Link>
        </p>
        {pokemonLoading && <Spinner animation="grow" />}
        {pokemon && (
          <>
            <h1 className="text-center text-capitalize">{pokemon.name}</h1>

            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={"Pokemon: " + pokemon.name + " Artwork"}
              width={400}
              height={400}
            />
            <div className="d-inline-block mt-2">
              <div>
                <strong>Types: </strong>
                {pokemon.types.map((type) => type.type.name).join(", ")}
              </div>
              <div>
                <strong>Height: </strong>
                {pokemon.height * 10} cm
              </div>
              <div>
                <strong>Weight: </strong>
                {pokemon.height / 10} kg
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
