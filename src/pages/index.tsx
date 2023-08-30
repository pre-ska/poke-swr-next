import PokemonEntry from "@/components/PokemonEntry";
import Link from "next/link";
import { useRouter } from "next/router";
import useSwr from "swr";
import * as PokemonApi from "@/network/pokemon-api";
import { Spinner, Row, Col } from "react-bootstrap";

export default function Home() {
  const router = useRouter();
  const page = parseInt(router.query.page?.toString() || "1");

  const { data, isLoading } = useSwr(
    ["getPokemonPage", page], // ! cache key - ovo je forma za paginaciju da se data spremi po getPokemonPage1
    ([key, page]) => PokemonApi.getPokemonPage(page)
  );

  if (isLoading) {
    return <Spinner animation="border" className="d-block m-auto" />;
  }

  return (
    <div>
      <h1 className="text-center mb-4"> Gotta cache &apos;em all </h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {data?.results.map((pokemon) => (
          <Col key={pokemon.name}>
            <PokemonEntry name={pokemon.name} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
