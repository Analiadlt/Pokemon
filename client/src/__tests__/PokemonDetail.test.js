import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import * as ReactRedux from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
//import isReact from "is-react";

import PokemonDetail from "../components/PokemonDetail";
import PokemonCard from "../components/PokemonCard";
//import * as data from "../db.json";
import * as actions from "../actions";

configure({ adapter: new Adapter() });

describe("<PokemonDetail />", () => {
  let pokemonDetail, useSelectorStub, useSelectorFn, useEffect;
  const noPokemons = {
    id: 5,
    name: "charmeleon",
  };

  const match = (id) => ({
    params: { pokemonId: id },
    isExact: true,
    path: "/pokemons/:pokemonId",
    url: `/pokemons/${id}`,
  });
  const mockStore = configureStore([thunk]);

  const store = (id) => {
    let state = {
      pokemons: data.pokemons.concat(noPokemons),
      pokemons:
        id !== 5 ? data.pokemons[id - 1] : data.pokemons.concat(noPokemons),
    };
    return mockStore(state);
  };
  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
  // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
  // cuando se hace destructuring de estos métodos === test no corren.
 // beforeAll(() => expect(isReact.classComponent(PokemonDetail)).toBeFalsy());
  const mockUseEffect = () => useEffect.mockImplementation((fn) => fn());

  beforeEach(() => {
    useSelectorStub = jest.spyOn(ReactRedux, "useSelector");
    useSelectorFn = (id) =>
      useSelectorStub.mockReturnValue(store(id).getState().house);
    useEffect = jest.spyOn(React, "useEffect");
    pokemonDetail = (id) =>
      mount(
        <ReactRedux.Provider store={store(id)}>
          <MemoryRouter initialEntries={[`/pokemons/${id}`]}>
            <PokemonDetail match={match(id)} />
          </MemoryRouter>
        </ReactRedux.Provider>
      );
    mockUseEffect();
    mockUseEffect();
  });

  afterEach(() => jest.restoreAllMocks());

  it("Debería usar un useEffect y dentro de este, dispachar la acción getPokemonDetail, pasandole como argumento el ID del pokemon a renderizar", () => {
    // Nuevamente testeamos todo el proceso. Tenes que usar un useEffect, y despachar la acción "getPokemonDetail".
    const useDispatch = jest.spyOn(ReactRedux, "useDispatch");
    const getPokemonDetail = jest.spyOn(actions, "getPokemonDetail");
    pokemonDetail(1);
    expect(useEffect).toHaveBeenCalled();
    expect(useDispatch).toHaveBeenCalled();
    expect(getPokemonDetail).toHaveBeenCalled();
  });

  it('Debería recibir por props el objeto "match". Utilizar el "pokemonId" de "params" para despachar la action "getPokemonDetail" y renderizar los detalles de la house', () => {
    const pokemon = data.pokemons[0];
    // Fijate que para traerte los datos desde Redux, vas a tener que usar el hook de Redux "useSelector"
    // para que los tests pasen!
    // Lo que se esta testeando aca, es que el componente renderice los detalles del todo correctamente,
    // no la estructura del componente asi que eres libre de diseñar la estructura, siempre y cuando se muestren los datos del todo.
    // Verificar la llegada de datos en el objeto "match.params", puede romper en el caso que no exista nada.
    useSelectorFn(1);
    expect(pokemonDetail(1).text().includes(pokemon.name)).toEqual(true);
    expect(useSelectorStub).toHaveBeenCalled();
    expect(useEffect).toHaveBeenCalled();
  });

  it('Debería renderizar una <PokemonCard /> por cada pokemon', () => {
    // PASARLE LA PROP keys en el mapeo.
    useSelectorFn(1);
    expect(pokemonDetail(1).find(PokemonCard)).toHaveLength(4);
    useSelectorFn(2);
    expect(pokemonDetail(2).find(PokemonCard)).toHaveLength(1);
    useSelectorFn(3);
    expect(pokemonDetail(3).find(PokemonCard)).toHaveLength(3);
    expect(useSelectorStub).toHaveBeenCalled();
    expect(useEffect).toHaveBeenCalled();
  });


  it("Debería pasar a cada <PokemonCard /> como props todos los datos del pokemon", () => {
    useSelectorFn(1);
    expect(pokemonDetail(1).find(PokemonCard).at(0).props().name).toBe(
      "bulbasaur"
    );
    expect(pokemonDetail(1).find(PokemonCard).at(0).props().id).toBe("1");
    

    useSelectorFn(2);
    expect(pokemonDetail(2).find(PokemonCard).at(0).props().name).toBe(
      "ivysaur"
    );
    
    useSelectorFn(3);
    expect(pokemonDetail(3).find(PokemonCard).at(2).props().name).toBe(
      "venusaur"
    );
    expect(useSelectorStub).toHaveBeenCalled();
    expect(useEffect).toHaveBeenCalled();
  });
});
