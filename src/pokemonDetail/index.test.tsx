import PokemonDetail from ".";
import { fetchPokemonDetail } from "../services/pokemonServices";
import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import * as rrd from "react-router-dom";

const mockFn = vi.fn(fetchPokemonDetail);
const mockFetchPokemonDetailFn = mockFn.mockImplementation(async () => {
  return {
    id: 1,
    image: faker.image.urlPlaceholder(),
    name: "Pikaxu",
    type: "Eletrico",
  };
});

describe("Testa o component PokemonDetail", () => {
  vi.mock("react-router-dom", () => {
    return {
      useParams: () => ({
        id: 1,
      }),
      Link: vi.fn().mockImplementation((props) => props.children),
    };
  });

  it("Deve haver um titulo na pagina ", async () => {
    render(<PokemonDetail fetchPokemonDetail={mockFetchPokemonDetailFn} />);

    const pikaxu = await screen.findByText("Pikaxu");
    expect(pikaxu).toBeInTheDocument();
  });

  it("Deve haver um link para voltar ", async () => {
    render(<PokemonDetail fetchPokemonDetail={mockFetchPokemonDetailFn} />);

    const linkback = await screen.findByText("Voltar");
    expect(linkback).toBeInTheDocument();
  });

  it("Deve validar quando não vier parametro na rota ", async () => {
    vi.spyOn(rrd, "useParams").mockImplementationOnce(() => ({ id: "0" }));

    render(<PokemonDetail fetchPokemonDetail={mockFetchPokemonDetailFn} />);

    const errorText = await screen.findByText("o id não é valido !");
    expect(errorText).toBeInTheDocument();
  });
});



