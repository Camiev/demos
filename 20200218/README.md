# 03 02 2020: Back y Front

Proyecto que contempla back y front, con el solo objetivo de practicar desarrollo.

Back:

- Permite registrar usuarios usando username y password, guardando estos datos en redis.
- Permite ingresar (loguear) usuarios con un username y password, creando un token de 2 minutos de duración.
- Permite obtener los personas de la serie Rick and Morty, previamente validando el login a través de un token.

Front:

- Permite, a través de una pantalla, ingresar (loguearse).
- Permite, a través de una pantalla, ver los personajes de Rick and Morty.

Se usaron las siguientes tecnologías/dependencias:

- NodeJS: Entorno de ejecución
- Koa: Como framework REST
- Axios: Para comunicación http
- Joi: Para uso de esquemas.
- http-status-code: Para setear status codes
- Winston: Para logs
- dotenv: Para setear variables de entorno
- Nodemon: Para auto-refrescar proyecto al desarrollar
- Redis: Para persistencia de datos en memoria
- Jest: Para los test
- Redis-Mock: Para mockear redis para test
- Supertest: Para hacer test http
- Eslint: Para formateo de código.
- React: Para el front
- Git: Como sistema de versionamiento, subiendo a Github
- Docker: Para generar y levantar imágenes tanto back como front
- Docker-compose: Para orquestar las imágenes de back y front, además de la redis

---

## BACK

### Levantar proyecto

#### local

Instalar dependencias
`npm install`

Levantar proyecto
`npm run start`

Si se está desarrollando, quizás sea más cómodo levantar el proyecto con nodemon
`npm run start:dev`

#### docker

Hacer build de imagen
`npm run docker:build`

Correr imagen
`npm run docker:start`

Si se está desarrollando, quizás sea más cómodo correr la imagen con nodemon
`npm run docker:dev`

### Tests

Para correr las pruebas
`npm run test`

Para conocer el procentaje de cobertura
`npm run coverage`

### Endpoints:

Healthcheck:

- Method: `GET`
- Endpoint: `http://localhost:3000/health`
- Response body:

```js
{
    "health": "I'm Ok!"
}
```

Registrar usuarios con username y password, guardando en redis.

- Method: `POST`
- Endpoint: http://localhost:3000/register
- Request body:

```js
{
    "username": "a-user-name",
    "password": "a-password",
    "repeat_password": "a-password",
}
```

- Response body:

```js
{
    "register": true
}
```

Ingresar (loguear) usuarios con username y password, devolviendo un token de 2 minutos de duración.

- Method: `POST`
- Endpoint: http://localhost:3000/login
- Request body:

```js
{
    "username": "a-user-name",
    "password": "a-password"
}
```

- Response body:

```js
{
    "token": "a-token-valid-for-2-minutes",
}
```

Obtener los personas de la serie Rick and Morty, previamente validando el login a través de un token.

- Method: `GET`
- Endpoint: http://localhost:3000/characters
- Request header:

```js
{
    "Authorization": "Bearer a-token"
}
```

- Response body:

```js
[
  {
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
  },
  {
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
  },
  ...
]
```

---

## FRONT

En construcción

---

## ALL!

Usando docker compose podemos levantar todos los artefactos

1- Hacer build de todo:
`docker-compose build`

2- Correr todo:
`docker-compose up`

1- y 2- en un paso: `docker-compose up --build`

---

## ToDo:

- Back: Improve handle error: To log internal error and show less information in all cases.
- Improve logs: To ofuscate tokens, password and sensitive data in logs.
- Improve how to send password: encrypt password in front and recieve encryted in back
- Improve docker image: use alpine nodejs?
- Improve test
- Don't write in english AND spanish 'n.n
- Front! ToDo the Front
