import { fireEvent, render, screen } from "@testing-library/react";
import Dashboard from ".";

import { faker } from "@faker-js/faker";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchPokemonDetail,
  fetchPokemonList,
} from "../../services/pokemonServices";
import { PokemonType } from "../../types/pokemonTypes";

globalThis.fetch = vi.fn();

const mock = new MockAdapter(axios);
const BASE_URL = "http://localhost:3000";

function createFetchResponse(data: any) {
  return {
    json: () => new Promise((resolve) => resolve(data)),
  };
}

const mockFetchListPokemonFn = vi
  .fn(fetchPokemonList)
  .mockImplementation(async () => {
    return [
      {
        id: 2,
        name: "Picaxu",
        image: faker.image.urlPlaceholder(),
        type: "Electric",
      },
      {
        id: 3,
        name: "Charmander",
        image: faker.image.urlPlaceholder(),
        type: "Fogo",
      },
    ];
  });

const navigateMock = vi.fn();

describe("Testa o compoent de Dashboard", () => {
  vi.mock("react-router-dom", () => {
    return {
      useNavigate() {
        return navigateMock;
      },
    };
  });

  afterEach(() => {
    mock.reset();
  });

  it("Deve haver um titulo escrito 'Sing In", async () => {
    render(<Dashboard fetchPokemonList={mockFetchListPokemonFn} />);

    const title = await screen.findByRole("heading");

    expect(title).toHaveTextContent("Dashboard");
  });

  it("Deve haver dois pokemons na lista", async () => {
    render(<Dashboard fetchPokemonList={mockFetchListPokemonFn} />);

    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(2);
  });

  it("Deve haver um pikachu na lista", async () => {
    render(<Dashboard fetchPokemonList={mockFetchListPokemonFn} />);

    const picaxu = await screen.findByText("Picaxu");
    expect(picaxu).toBeInTheDocument();
  });

  it("Deve haver um charmander na lista", async () => {
    render(<Dashboard fetchPokemonList={mockFetchListPokemonFn} />);

    const charmander = await screen.findByText("Charmander");
    expect(charmander).toBeInTheDocument();
  });

  it("Deve retornar a lista de Pokémon corretamente", async () => {
    const mockData: PokemonType[] = [
      {
        name: "Pikachu",
        id: 1,
        image: "",
        type: "",
      },
      {
        name: "Bulbasaur",
        id: 2,
        image: "",
        type: "",
      },
    ];
    mock.onGet(`${BASE_URL}/pokemon`).reply(200, mockData);

    const pokemonList = await fetchPokemonList();

    expect(pokemonList).toEqual(mockData);
  });

  it("Deve retornar os dados da resposta", async () => {
    const mockData = [{ name: "Pikachu" }, { name: "Bulbasaur" }];
    mock.onGet(`${BASE_URL}/pokemon`).reply(200, mockData);

    const result = await fetchPokemonList();

    expect(result).toEqual(mockData);
  });

  it("Deve ser possivel clicar no li para abrir a pagina de detalhes do pokemon", async () => {
    render(<Dashboard fetchPokemonList={mockFetchListPokemonFn} />);

    const link = await screen.findByText("Charmander");
    fireEvent.click(link);
    expect(navigateMock).toHaveBeenCalledTimes(1);
  });

  it("Deve verificar se foi feito o GET detail para a URL correta", async () => {
    const pokemonDetailResponse: PokemonType = {
      id: 1,
      image: faker.image.url(),
      name: faker.animal.bear(),
      type: faker.animal.type(),
    };

    mock.onGet(`${BASE_URL}/pokemon/1`).reply(200, pokemonDetailResponse);

    const pokemon = await fetchPokemonDetail(1);

    expect(mock.history.get.length).toBe(1);
    expect(pokemon).toEqual(pokemonDetailResponse);
  });
});
