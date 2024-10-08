/// <reference types="cypress" />

describe("As a user adding a new burger order", () => {
  const visitOrderPage = () => {
    cy.visit("/");
  };

  before(() => {
    cy.task("db:truncate", ["Burger", "Order"]);
  });

  describe("when valid burger is provided", () => {
    it("should add the burger to the order", () => {
      visitOrderPage();
      cy.get("form").within(() => {
        cy.findByLabelText("Your name").type("Test User");
        cy.findByLabelText("Type of Burger").select("medium");
        cy.findByLabelText("cheese").check();
        cy.findByLabelText("pickles").check();
        cy.findByLabelText("Hawaiian Roll").check();
        cy.findByLabelText("Side").select("fries");
        cy.contains("Add burger").click();
      });

      cy.contains("Order Summary for Test User");
      cy.get("form")
        .eq(1)
        .within(() => {
          cy.contains("Type: medium");
          cy.get("li").eq(0).contains("cheese");
          cy.get("li").eq(1).contains("pickles");
          cy.contains("Roll: Hawaiian");
          cy.contains("Side: fries");
          cy.contains("Submit order");
        });
    });
  });

  describe("when successfully submitting an order", () => {
    it("should display a confirmation message", () => {
      visitOrderPage();
      cy.get("form").within(() => {
        cy.findByLabelText("Your name").type("Test User");
        cy.findByLabelText("Type of Burger").select("medium");
        cy.findByLabelText("Hawaiian Roll").check();
        cy.findByLabelText("Side").select("fries");
        cy.contains("Add burger").click();
      });
      cy.get("form").within(() => {
        cy.findByLabelText("Type of Burger").select("chicken");
        cy.findByLabelText("Gluten-Free Roll").check();
        cy.findByLabelText("Side").select("salad");
        cy.contains("Add burger").click();
      });

      cy.get("form")
        .eq(1)
        .within(() => {
          cy.contains("Type: medium");
          cy.contains("Roll: Hawaiian");
          cy.contains("Side: fries");

          cy.contains("Type: chicken");
          cy.contains("Roll: gluten-free");
          cy.contains("Side: salad");
          cy.root().submit();
        });
      cy.get(".success").contains("Your order has been placed!");
    });
  });

  describe("when a burger is added empty", () => {
    it("should display error messages for required fields", () => {
      visitOrderPage();
      cy.get("form").within(() => {
        cy.contains("Add burger").click();

        cy.get("#name-error").contains("is required");
        cy.get("#type-error").contains("is required");
        cy.get("#isGlutenFree-error").contains("is required");
        cy.get("#side-error").contains("is required");
      });
      cy.contains("Build your burger to place an order");
    });
  });
});
