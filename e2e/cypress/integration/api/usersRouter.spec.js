/// <reference types="Cypress" />

import userJson from "../../fixtures/user.json";

describe("usersRouter", () => {
  beforeEach(() => {
    cy.task("db:truncate", "User");
  });

  describe("POST /users", () => {
    context("when a user registers successfully", () => {
      it("has a successful status code", () => {
        cy.request({ method: "POST", url: "/api/v1/users", body: userJson })
          .its("status")
          .should("equal", 201);
      });

      it("has a JSON response type", () => {
        cy.request({ method: "POST", url: "/api/v1/users", body: userJson })
          .its("headers")
          .its("content-type")
          .should("include", "application/json");
      });

      it("returns the newly persisted user without password", () => {
        cy.request({ method: "POST", url: "/api/v1/users", body: userJson }).should((response) => {
          expect(response.body.user).to.have.property("email", userJson.email);
          expect(response.body.user).not.to.have.property("password");
        });
      });
    });

    context("when attempting to register with an email already in use", () => {
      beforeEach(() => {
        cy.task("db:insert", { modelName: "User", json: userJson });
      });

      it("has an unsuccessful status code", () => {
        cy.request({
          method: "POST",
          url: "/api/v1/users",
          body: userJson,
          failOnStatusCode: false,
        })
          .its("status")
          .should("equal", 422);
      });

      it("has a JSON response type", () => {
        cy.request({
          method: "POST",
          url: "/api/v1/users",
          body: userJson,
          failOnStatusCode: false,
        })
          .its("headers")
          .its("content-type")
          .should("include", "application/json");
      });

      it("returns an error message for email uniqueness", () => {
        cy.request({
          method: "POST",
          url: "/api/v1/users",
          body: userJson,
          failOnStatusCode: false,
        }).should((response) => {
          const errorsForEmailField = response.body.errors.email[0];
          expect(errorsForEmailField).to.be.equal("already in use");
        });
      });
    });

    context("when invalid data is supplied", () => {
      it("has an unsuccessful status code", () => {
        cy.request({
          method: "POST",
          url: "/api/v1/users",
          body: { email: "", password: "" },
          failOnStatusCode: false,
        })
          .its("status")
          .should("equal", 422);
      });

      it("has a JSON response type", () => {
        cy.request({
          method: "POST",
          url: "/api/v1/users",
          body: { email: "", password: "" },
          failOnStatusCode: false,
        })
          .its("headers")
          .its("content-type")
          .should("include", "application/json");
      });

      it("returns an error for required email", () => {
        cy.request({
          method: "POST",
          url: "/api/v1/users",
          body: { email: "", password: "" },
          failOnStatusCode: false,
        }).should((response) => {
          const errorsForEmailField = response.body.errors.email[0];
          expect(errorsForEmailField.keyword).to.be.equal("required");
          expect(errorsForEmailField.message).to.be.equal("must have required property 'email'");
        });
      });
    });
  });
});
