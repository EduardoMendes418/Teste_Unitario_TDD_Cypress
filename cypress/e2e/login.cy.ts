describe("Testa a pagina de login", () => {
  it("Quando clicar em login deve ir para pagina de Dashboard ", () => {
    cy.visit("/");

    cy.intercept("GET", "http://localhost:3000/pokemon", {
      fixture: "pokemons.json",
    });

    cy.contains("Login").click();
    cy.contains("Dashboard");
  });

  it("Quando clicar em login deve ir para a pagina de Dashboard e ter um pokemon ", () => {
    cy.visit("/");

    cy.intercept("GET", "http://localhost:3000/pokemon", {
      fixture: "pokemons.json",
    });

    cy.contains("Login").click();
    cy.contains("Dashboard");
    cy.contains("Pikachu");
  });

  it("Quando clicar em Sign Up deve ir para a pagina de cadastre-se", () => {
    cy.visit("/");

    cy.contains("Não tem cadastro? Clique aqui!").click();
    cy.contains("Cadastre-se");
  });

  it("O botão deve ter 10px de margin top", () => {
    cy.visit("/");

    cy.get("div")
      .find("button")
      .should("have.css", "marginTop")
      .and("match", /10px/);
  });
});
