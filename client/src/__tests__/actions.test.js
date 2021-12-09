import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  getPokemons,
  postPokemons,
  getPokemonDetail,
} from "../actions";
//import * as data from "../../db.json";

describe("Actions", () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({ pokemons: [] });

  beforeEach(() => store.clearActions());

 xdescribe("getPokemons", () => {
    it('Debería hacer un dispatch con las propiedades type "GET_POKEMONS" y como payload, el resultado del axios al link provisto', 
      async () => {
      return store
        .dispatch(getPokemons())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].payload.length).toBe(3);
          expect(actions[0]).toEqual({
            type: "GET_POKEMONS",
            payload: json.data,
          });
        })
        .catch((err) => {
          // Acá llegamos cuando tu petición al backend no salió como el test lo pide. Revisá el error en la consola y verificá
          // qué es lo que está pasando.
          console.error(err);
          expect(err).toBeUndefined();
        });
    });
  });

  xdescribe("getPokemonDetail", () => {
    it('Debería hacer un dispatch con las propiedades type "GET_POKEMON_DETAIL" y como payload, el resultado del axios al link provisto', 
      async () => {
      const payload = store.pokemons[0];
      return store
        .dispatch(getPokemonDetail(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toStrictEqual({
            type: "GET_POKEMON_DETAIL",
            payload: { ...payload },
          });
        })
        .catch((err) => {
          // Acá llegamos cuando tu petición al backend no salió como el test lo pide. Revisá el error en la consola y verificá
          // qué es lo que está pasando.
          console.error(err);
          expect(err).toBeUndefined();
        });
    });
  });

 xdescribe("postPokemons", () => {
    it('Debería retornar una action con las propiedades type "POST_POKEMONS" y payload: contiene los values recibidos en la action creator "postPokemons"', 
      () => {
      const payload1 = {
        name: "Pokemon1",
        height: 1,
        weight: 1,
        attack:1, 
        types: ["ice", "fire"], 
      };
      const payload2 = {
        name: "Pokemon2",
        height: 2,
        weight: 2,
        attack:2, 
        types: ["ghost"], 
      };
 
      expect(postPokemons(payload1)).toEqual({
        type: "POST_POKEMONS",
        payload: {
          name: "Pokemon1",
          height: 1,
          weight: 1,
          life:1, attack:1, defense:1, speed:1,
          types: ["ice", "fire"], 
        },
      });

      expect(postPokemons(payload2)).toEqual({
        type: "POST_POKEMONS",
        payload: {
        name: "Pokemon2",
        height: 2,
        weight: 2,
        life:2, attack:2, defense:2, speed:2,
        types: ["ghost"],
        },
      });
    });
  });
});
