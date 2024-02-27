/// <reference types="Cypress" />

import userJson from "../../fixtures/user.json";

describe("As a user visiting the registration sign up page", () => {
  const registrationPath = "/users/new";
  const visitRegistrationPage = () => {
    cy.visit(registrationPath);
  };

  before(() => {
    cy.task("db:truncate", "User");
  });

  describe("when correct email, password, and password confirmation are provided", () => {
    it("should sign in the user", () => {
      visitRegistrationPage();
      cy.get("form").within(() => {
        cy.findByLabelText("Email").type(userJson.email);
        cy.findByLabelText("Password").type(userJson.password);
        cy.findByLabelText("Password Confirmation").type(userJson.password);

        cy.root().submit();

        cy.url().should("eq", `${Cypress.config().baseUrl}/`);
      });
      cy.contains("Sign Out");
    });
  });

  describe("when invalid email and password are provided", () => {
    it("should keep the user on the same page", () => {
      visitRegistrationPage();
      cy.get("form").within(() => {
        cy.findByLabelText("Email").type("fake@email.com");
        cy.findByLabelText("Password").type("banana");
        cy.root().submit();

        cy.url().should("eq", `${Cypress.config().baseUrl}${registrationPath}`);
      });
    });
  });

  describe("when an email is not provided", () => {
    it("should display an invalid error message for the user", () => {
      visitRegistrationPage();
      cy.get("form").within(() => {
        cy.findByLabelText("Password").type(userJson.password);
        cy.root().submit();

        cy.get("#email-error").contains("is invalid");
      });
    });
  });

  describe("when password and password confirmation don't match", () => {
    it("should keep the user on the same page", () => {
      visitRegistrationPage();
      cy.get("form").within(() => {
        cy.findByLabelText("Email").type(userJson.email);

        cy.findByLabelText("Password").type("password");
        cy.findByLabelText("Password Confirmation").type("passwordNotAMatch");

        cy.root().submit();
        cy.url().should("eq", `${Cypress.config().baseUrl}${registrationPath}`);
      });
    });

    it("should display error message", () => {
      visitRegistrationPage();
      cy.get("form").within(() => {
        cy.findByLabelText("Email").type(userJson.email);

        cy.findByLabelText("Password").type("password");
        cy.findByLabelText("Password Confirmation").type("passwordNotAMatch");

        cy.root().submit();
        cy.get("#passwordConfirmation-error").contains("does not match password");
      });
    });
  });

  describe("when the email is already in use", () => {
    before(() => {
      cy.task("db:truncate", "User");
      cy.task("db:insert", {
        modelName: "User",
        json: userJson,
      });
    });

    it("should keep the user on the same page", () => {
      visitRegistrationPage();
      cy.get("form").within(() => {
        cy.findByLabelText("Email").type(userJson.email);
        cy.findByLabelText("Password").type(userJson.password);
        cy.findByLabelText("Password Confirmation").type(userJson.password);
        cy.root().submit();

        cy.url().should("eq", `${Cypress.config().baseUrl}${registrationPath}`);
      });
    });

    it("should display an uniqueness error message for the user", () => {
      visitRegistrationPage();
      cy.get("form").within(() => {
        cy.findByLabelText("Email").type(userJson.email);
        cy.findByLabelText("Password").type(userJson.password);
        cy.findByLabelText("Password Confirmation").type(userJson.password);
        cy.root().submit();

        cy.get(".callout").contains("email already in use");
      });
    });
  });
});
