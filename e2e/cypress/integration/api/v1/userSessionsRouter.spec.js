/// <reference types="Cypress" />

import userJson from "../../../fixtures/user.json";

describe("userSessionsRouter", () => {
  beforeEach(() => {
    cy.task("db:truncate", "User");
    cy.task("db:insert", { modelName: "User", json: userJson });
  });

  describe("POST /user-sessions", () => {
    context("when a user signs in with correct credentials", () => {
      it("has a successful status code", () => {
        cy.request({ method: "POST", url: "/api/v1/user-sessions", body: userJson })
          .its("status")
          .should("equal", 201);
      });

      it("has a JSON response type", () => {
        cy.request({ method: "POST", url: "/api/v1/user-sessions", body: userJson })
          .its("headers")
          .its("content-type")
          .should("include", "application/json");
      });

      it("returns the user without their email", () => {
        cy.request({ method: "POST", url: "/api/v1/user-sessions", body: userJson }).should(
          (response) => {
            expect(response.body).to.have.property("email", userJson.email);
            expect(response.body).not.to.have.property("password");
          }
        );
      });
    });

    context("when providing invalid user credentials", () => {
      const fakeUserData = { email: "fake@email.com", password: "abc" };

      it("has an unsuccessful status code", () => {
        cy.request({
          method: "POST",
          url: "/api/v1/user-sessions",
          body: fakeUserData,
          failOnStatusCode: false,
        })
          .its("status")
          .should("equal", 401);
      });

      it("has a JSON response type", () => {
        cy.request({
          method: "POST",
          url: "/api/v1/user-sessions",
          body: fakeUserData,
          failOnStatusCode: false,
        })
          .its("headers")
          .its("content-type")
          .should("include", "application/json");
      });

      it("returns an unsuccessful sign in attempt message", () => {
        cy.request({
          method: "POST",
          url: "/api/v1/user-sessions",
          body: fakeUserData,
          failOnStatusCode: false,
        }).should((response) => {
          expect(response.body.error).to.have.property("email", "no account found");
        });
      });
    });
  });

  describe("GET /user-sessions/current", () => {
    context("when a user is currently signed in", () => {
      beforeEach(() => {
        cy.login(userJson);
      });

      it("has a successful status code", () => {
        cy.request("/api/v1/user-sessions/current").its("status").should("be.equal", 200);
      });

      it("has a JSON response type", () => {
        cy.request("/api/v1/user-sessions/current")
          .its("headers")
          .its("content-type")
          .should("include", "application/json");
      });

      it("returns the currently signed in user without their password", () => {
        cy.request("/api/v1/user-sessions/current").should((response) => {
          expect(response.body).to.have.property("email", userJson.email);
          expect(response.body).not.to.have.property("password");
        });
      });
    });

    context("when a user is not signed in", () => {
      it("has an unsuccessful status code", () => {
        cy.request({ method: "GET", url: "/api/v1/user-sessions/current", failOnStatusCode: false })
          .its("status")
          .should("be.equal", 401);
      });
    });
  });

  describe("DELETE /user-sessions", () => {
    it("has a successful status code", () => {
      cy.login(userJson);
      cy.request({ method: "DELETE", url: "/api/v1/user-sessions" })
        .its("status")
        .should("be.equal", 200);
    });
  });
});
