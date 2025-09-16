/// <reference types="cypress" />

context("Counter component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("renders initial value from props", () => {
    cy.get("p").should("contain.text", "Count: 0");
  });

  it("decrements the value when clicking decrement button", () => {
    cy.contains("button", "-1").click();
    cy.get("p").should("contain.text", "Count: -1");
  });

  it("increments the value when clicking increment button", () => {
    cy.contains("button", "+1").click();
    cy.get("p").should("contain.text", "Count: 1");
  });
});
