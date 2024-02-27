/// <reference types="Cypress" />

import orderJson from "../../fixtures/order.json";

describe("ordersRouter", () => {
  beforeEach(() => {
    cy.task("db:truncate", "Burger");
    cy.task("db:truncate", "Order");
  });

  describe("POST /orders", () => {
    context("when all fields are provided", () => {
      it("has a successful status code", () => {
        cy.request({ method: "POST", url: "/api/v1/orders", body: { order: orderJson } })
          .its("status")
          .should("equal", 201);
      });

      it("has a JSON response type", () => {
        cy.request({ method: "POST", url: "/api/v1/orders", body: { order: orderJson } })
          .its("headers")
          .its("content-type")
          .should("include", "application/json");
      });

      it("returns the newly persisted order", () => {
        cy.request({ method: "POST", url: "/api/v1/orders", body: { order: orderJson } }).should(
          (response) => {
            expect(response.body.order).to.have.property("name", orderJson.name);
            expect(response.body.order.burgers.length).to.equal(orderJson.burgers.length);
          }
        );
      });
    });

    context("when invalid order data is supplied", () => {
      const badOrderData = { name: "", burgers: [] };
      it("has an unsuccessful status code", () => {
        cy.request({
          method: "POST",
          url: "/api/v1/orders",
          body: { order: badOrderData },
          failOnStatusCode: false,
        })
          .its("status")
          .should("equal", 422);
      });

      it("has a JSON response type", () => {
        cy.request({
          method: "POST",
          url: "/api/v1/orders",
          body: { order: badOrderData },
          failOnStatusCode: false,
        })
          .its("headers")
          .its("content-type")
          .should("include", "application/json");
      });

      it("returns an error for required name", () => {
        cy.request({
          method: "POST",
          url: "/api/v1/orders",
          body: { order: badOrderData },
          failOnStatusCode: false,
        }).should((response) => {
          const errorsForNameField = response.body.errors.name[0];
          expect(errorsForNameField.keyword).to.be.equal("required");
          expect(errorsForNameField.message).to.be.equal("must have required property 'name'");
        });
      });
    });

    context("when invalid burger data is supplied", () => {
      const badBurgerData = {
        name: "Test User",
        burgers: [{ type: "", isGlutenFree: "", side: "", toppings: [""] }],
      };
      it("has an unsuccessful status code", () => {
        cy.request({
          method: "POST",
          url: "/api/v1/orders",
          body: { order: badBurgerData },
          failOnStatusCode: false,
        })
          .its("status")
          .should("equal", 422);
      });

      it("has a JSON response type", () => {
        cy.request({
          method: "POST",
          url: "/api/v1/orders",
          body: { order: badBurgerData },
          failOnStatusCode: false,
        })
          .its("headers")
          .its("content-type")
          .should("include", "application/json");
      });

      it("returns errors for new burger", () => {
        cy.request({
          method: "POST",
          url: "/api/v1/orders",
          body: { order: badBurgerData },
          failOnStatusCode: false,
        }).should((response) => {
          const errorsForTypeField = response.body.errors.type[0];
          expect(errorsForTypeField.keyword).to.be.equal("required");
          expect(errorsForTypeField.message).to.be.equal("must have required property 'type'");
          const errorsForSideField = response.body.errors.side[0];
          expect(errorsForSideField.keyword).to.be.equal("required");
          expect(errorsForSideField.message).to.be.equal("must have required property 'side'");
        });
      });
    });
  });
});
