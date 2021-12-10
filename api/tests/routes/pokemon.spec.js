/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
xdescribe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    );
  });
 describe('GET /types', () => {
    it('should get 200', () =>
      agent.get('/types').expect(200)
    );
  });
 
  describe('GET /pokemons/:id', function() {
    it('GET responde con un array vacío si el pokemon no existe', function() {
      agent
        .get('/pokemons/2300')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).toEqual([]);
        });
    });
});

describe('GET /pokemons?name', function() {
  it('GET responde con un array de todos los pokemons con ese nombre', function() {
      agent
        .get('/pokemons/pikachu')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).toEqual([{name: 'pikachu'},
           {name: 'pikachu'}]
          );
        });
    });
});
});