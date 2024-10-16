/// <reference types="Cypress" />

import orderJson from "../../../fixtures/order.json";
import order2Json from "../../../fixtures/order2.json";

describe("ordersRouter", () => {
  describe("GET /orders", () => {
    beforeEach(() => {
      cy.task("db:truncate", ["Burger", "Order"]);
      cy.task("db:insert", { modelName: "Order", json: [orderJson, order2Json] });
    });

    it("has a successful status code", () => {
      cy.request({ method: "GET", url: "/api/v1/orders" }).its("status").should("equal", 200);
    });

    it("has a JSON response type", () => {
      cy.request({ method: "GET", url: "/api/v1/orders" })
        .its("headers")
        .its("content-type")
        .should("include", "application/json");
    });

    it("returns all orders", () => {
      cy.request("/api/v1/orders").should((response) => {
        expect(response.body.completeOrders.length).to.equal(1);
        expect(response.body.completeOrders[0].name).to.equal(order2Json.name);

        expect(response.body.incompleteOrders.length).to.equal(1);
        expect(response.body.incompleteOrders[0].name).to.equal(orderJson.name);
      });
    });
  });

  describe("GET /orders/:id", () => {
    let orderId;

    beforeEach(() => {
      cy.task("db:truncate", ["Burger", "Order"]);
      cy.task("db:insert", { modelName: "Order", json: orderJson });

      cy.task("db:find", {
        modelName: "Order",
        conditions: { name: orderJson.name },
      }).then((foundOrder) => {
        orderId = foundOrder[0].id;
      });
    });

    it("has a successful status code", () => {
      cy.request(`/api/v1/orders/${orderId}`).its("status").should("equal", 200);
    });

    it("has a JSON response type", () => {
      cy.request(`/api/v1/orders/${orderId}`)
        .its("headers")
        .its("content-type")
        .should("include", "application/json");
    });

    it("returns the Order with its Burgers", () => {
      cy.request(`/api/v1/orders/${orderId}`).should((response) => {
        expect(response.body.order.name).to.equal(orderJson.name);
        expect(response.body.order.burgers[0].type).to.equal(orderJson.burgers[0].type);
        expect(response.body.order.burgers[0].isGlutenFree).to.equal(
          orderJson.burgers[0].isGlutenFree
        );
        expect(response.body.order.burgers[0].side).to.equal(orderJson.burgers[0].side);
        expect(response.body.order.burgers[0].toppings).to.equal(orderJson.burgers[0].toppings);
      });
    });
  });

  describe("POST /orders", () => {
    beforeEach(() => {
      cy.task("db:truncate", ["Burger", "Order"]);
    });

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

  describe("PATCH /orders/:id", () => {
    let orderId;

    beforeEach(() => {
      cy.task("db:truncate", ["Burger", "Order"]);
      cy.task("db:insert", { modelName: "Order", json: orderJson });

      cy.task("db:find", {
        modelName: "Order",
        conditions: { name: orderJson.name },
      }).then((foundOrder) => {
        orderId = foundOrder[0].id;
      });
    });

    context("when all fields are provided", () => {
      it("has a successful status code", () => {
        cy.request({
          method: "PATCH",
          url: `/api/v1/orders/${orderId}`,
          body: { status: "fulfilled" },
        })
          .its("status")
          .should("equal", 200);
      });

      it("has a JSON response type", () => {
        cy.request({
          method: "PATCH",
          url: `/api/v1/orders/${orderId}`,
          body: { status: "fulfilled" },
        })
          .its("headers")
          .its("content-type")
          .should("include", "application/json");
      });

      it("returns the updated order", () => {
        cy.request({
          method: "PATCH",
          url: `/api/v1/orders/${orderId}`,
          body: { status: "fulfilled" },
        }).should((response) => {
          expect(response.body.order).to.have.property("name", orderJson.name);
          expect(response.body.order).to.have.property("status", "fulfilled");
          expect(response.body.order).to.have.property("fulfilledAt");
          expect(response.body.order.burgers.length).to.equal(orderJson.burgers.length);
        });
      });
    });
  });
});
