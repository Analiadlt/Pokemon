<p align="left">
  <img height="300" src="./family.png" />
</p>

# Individual Project - Henry Pokemon

## Objetivos del Proyecto
- Esta App fue desarrollada utilizando React, Redux, Node y Sequelize.
- Aprendí y practiqué el workflow de GIT. 
- Usé y practiqué testing.
- Esta App permite mostrar los datos obtenidos a partir de las consultas a la API externa [pokeapi]

__IMPORTANTE:__ Es necesario contar minimamente con Node v14.18.1 y NPM v8.1.3, para poder instalar correctamente las dependecias necesarias para correr el proyecto.

## Proyecto

El proyecto cuenta con dos carpetas: `api` y `client`. En estas carpetas está el código del back-end y el front-end respectivamente.

En `api` es necesario crear un archivo llamado: `.env` que tenga la siguiente forma:
```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
PORT=3001
```
(Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres.)
Adicionalmente, será necesario crear desde psql una base de datos llamada `pokemon` (usando CREATE DATABASE pokemon).

El contenido de `client` fue creado usando: Create React App.

## Enunciado

En esta aplicación se pueden ver los distintos Pokemon utilizando la api externa [pokeapi](https://pokeapi.co/) y a partir de ella se puede, entre otras cosas:
  - Buscar pokemons
  - Filtrarlos / Ordenarlos
  - Crear nuevos pokemons

### Únicos Endpoints/Flags utilizados

  - GET https://pokeapi.co/api/v2/pokemon
  - GET https://pokeapi.co/api/v2/pokemon/{id}
  - GET https://pokeapi.co/api/v2/pokemon/{name}
  - GET https://pokeapi.co/api/v2/type

#### Tecnologías utilizadas:

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend
Contiene las siguientes pantallas/rutas:

__Pagina inicial__: "/" landing page con 
- [ ] imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: "/home" contiene
- [ ] Input de búsqueda para encontrar pokemons por nombre (La búsqueda es exacta, es decir solo encontrará al pokemon si se coloca el nombre completo)
- [ ] Al iniciar carga los primeros 40 resultados obtenidos desde la ruta `GET /pokemons` y muestra su:
  - Imagen
  - Nombre
  - Tipos (Eléctrico, Fuego, Agua, etc)
- [ ] Opciones para filtrar por tipo de pokemon y por pokemon existente o creado por nosotros
- [ ] Opciones para ordenar tanto ascendente como descendentemente los pokemons por orden alfabético y por ataque
- [ ] Paginado para ir buscando y mostrando los siguientes pokemons, muestra 12 pokemons por página.

__IMPORTANTE__: Dentro de la Ruta Principal se muestran los pokemons traidos desde la API como así también las de la base de datos. Por otro lado, el endpoint que trae todos los pokemons contiene una URL para hacer un subrequest para obtener la información detalada de los pokemons desde allí, como son su imagen y tipos. Debido a que esto puede hacer que la búsqueda sea muy lenta, se limita el resultado a 40 pokemons totales.

__Ruta de detalle de Pokemon__: contiene
- [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
- [ ] Número de Pokemon (id)
- [ ] Estadísticas (vida, fuerza, defensa, velocidad)
- [ ] Altura y peso

__Ruta de creación__: contiene
- [ ] Un formulario __controlado__ con los campos mencionados en el detalle del pokemon
- [ ] Posibilidad de seleccionar/agregar más de un tipo de pokemon
- [ ] Botón/Opción para crear un nuevo pokemon

#### Base de datos

El modelo de la base de datos tiene las siguientes entidades (las propiedades señaladas con * son obligatorias):

- [ ] Pokemon con las siguientes propiedades:
  - ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
  - Nombre *
  - Vida
  - Ataque
  - Defensa
  - Velocidad
  - Altura
  - Peso
- [ ] Tipo con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades es de muchos a muchos ya que un pokemon puede pertenecer a más de un tipo y, a su vez, un tipo puede incluir a muchos pokemons.

#### Backend

Se ha desarrollado un servidor en Node/Express con las siguientes rutas:

- [ ] __GET /pokemons__:
  - Permite obtener un listado de los pokemons desde pokeapi.
  - Retorna solo los datos necesarios para la ruta principal.
- [ ] __GET /pokemons/{idPokemon}__:
  - Permite obtener el detalle de un pokemon en particular.
  - Trae solo los datos pedidos en la ruta de detalle de pokemon.
  - Funciona tanto para un id de un pokemon existente en pokeapi o uno creado por nosotros.
- [ ] __GET /pokemons?name="..."__:
  - Permite obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros).
  - Si no existe ningún pokemon mostrará el mensaje adecuado.
- [ ] __POST /pokemons__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body.
  - Crea un pokemon en la base de datos.
- [ ] __GET /types__:
  - Permite obtener todos los tipos de pokemons posibles.
  - En una primera instancia los trae desde pokeapi y los guarda en su propia base de datos y luego los utiliza desde allí.


#### Testing
- [ ] Posee los tests de un componente del frontend
- [ ] Posee los tests de una ruta del backend
- [ ] Posee los tests de un modelo de la base de datos
