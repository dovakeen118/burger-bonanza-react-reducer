/// <reference types="Cypress" />

import userJson from "../../fixtures/user.json";

describe("As a user visiting the sign in page", () => {
  const signInPath = "/user-sessions/new";
  const visitSignInPage = () => {
    cy.visit(signInPath);
  };

  before(() => {
    cy.task("db:truncate", "User");
    cy.task("db:insert", {
      modelName: "User",
      json: userJson,
    });
  });

  describe("when valid email and password are provided", () => {
    it("should sign in the user", () => {
      visitSignInPage();
      cy.get("form").within(() => {
        cy.findByLabelText("Email").type(userJson.email);
        cy.findByLabelText("Password").type(userJson.password);
        cy.root().submit();

        cy.url().should("eq", `${Cypress.config().baseUrl}/`);
      });
      cy.contains("Sign Out");
    });
  });

  describe("when nothing is provided in the form", () => {
    it("should display error messages", () => {
      visitSignInPage();
      cy.get("form").within(() => {
        cy.root().submit();

        cy.get("#email-error").contains("is invalid");
        cy.get("#password-error").contains("is required");
      });
    });
  });

  describe("when invalid email is provided", () => {
    it("should keep the user on the same page", () => {
      visitSignInPage();
      cy.get("form").within(() => {
        cy.findByLabelText("Email").type("fake@email.com");
        cy.findByLabelText("Password").type("password");
        cy.root().submit();

        cy.url().should("eq", `${Cypress.config().baseUrl}${signInPath}`);
      });
    });

    it("should display an error message", () => {
      visitSignInPage();
      cy.get("form").within(() => {
        cy.findByLabelText("Email").type("fake@email.com");
        cy.findByLabelText("Password").type("password");
        cy.root().submit();

        cy.contains("No account found with that email.");
      });
    });
  });

  describe("when incorrect password is provided", () => {
    it("should keep the user on the same page", () => {
      visitSignInPage();
      cy.get("form").within(() => {
        cy.findByLabelText("Email").type(userJson.email);
        cy.findByLabelText("Password").type("fake");
        cy.root().submit();

        cy.url().should("eq", `${Cypress.config().baseUrl}${signInPath}`);
      });
    });

    it("should display an error message", () => {
      visitSignInPage();
      cy.get("form").within(() => {
        cy.findByLabelText("Email").type(userJson.email);
        cy.findByLabelText("Password").type("fake");
        cy.root().submit();

        cy.contains("Try again, incorrect password");
      });
    });
  });
});
