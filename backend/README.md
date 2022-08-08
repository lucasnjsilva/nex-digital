### Antes de tudo é necessário subir um docker container Postgres.

Caso tenha o docker compose instalado:
```
docker compose up
```

### Para subir as migrations
```
npm run migrations:run
```
ou
```
yarn migrations:run
```

### Para criar uma Migration
```
yarn migration:create NOME_DA_MIGRATION
```

### Para iniciar o projeto
```
yarn dev
```
