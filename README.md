# React + TypeScript + Vite

# Teste unitarios
![testUnitarios](https://github.com/EduardoMendes418/Teste_Unitario_TDD_Cypress/assets/34344214/113ec4b8-c129-4107-a611-54c418cbfd48)

# Cypress

![cypress](https://github.com/EduardoMendes418/Teste_Unitario_TDD_Cypress/assets/34344214/27fd27d6-9101-4fe5-9e8d-5e778a5e5e72)

# Clonar a API do Backend 
Link: https://github.com/DEV2DEV-BR/pokemon-fake-api.git

# Instalação
npm install @testing-library/jest-dom @testing-library/react @testing-library/user-event  @vitest/coverage-v8 jsdom vitest path -D

Criar o arquivo vitest.config.ts na raiz do projeto:

/// <reference types="vitest"/>

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
  },
});
Criar o arquivo vitest-env.d.ts dentro da pasta src:
/// <reference types="vitest/globals"/>
Criar o arquivo setupTests.ts dentro da pasta src
import "@testing-library/jest-dom";
Agora é preciso criar os scripts dentro do package.json
 "test": "vitest",
 "coverage": "vitest run --coverage"
Exemplo de um teste de frontend:
// component
import "./App.css";

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <h1>Seja bem-vindo</h1>
    </div>
  );
}

export default App;

// testes

import { render, screen } from "@testing-library/react";
import App from "./App";
describe("Testa o component App", () => {
  test("Devem haver dois títulos na página", async () => {
    render(<App />);

    const titles = await screen.findAllByRole("heading");

    expect(titles).toHaveLength(2);
  });

  test("Deve haver um título escrito 'Hello World'", async () => {
    render(<App />);

    const title = await screen.findByRole("heading", {
      name: "Hello World",
    });

    expect(title).toBeInTheDocument();
  });
});



