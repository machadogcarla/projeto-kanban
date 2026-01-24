# ProjectKanban

Este projeto é uma aplicação de quadro Kanban desenvolvida em Angular, utilizando uma API mockada com **json-server**.

## Tecnologias
- Angular 19
- PrimeNG
- json-server
- Node.js


## Instalação do Projeto
```bash
git clone https://github.com/machadogcarla/projeto-kanban.git
```


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Rodando a API Mock (json-server)

Este projeto utiliza o **json-server** para simular uma API REST.

### Pré-requisitos
- Node.js instalado

### Passos para rodar

```bash
npx json-server db.json
```

Exemplos de rota:

http://localhost:3000/tasks

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
