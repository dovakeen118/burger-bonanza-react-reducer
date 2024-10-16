/// <reference types="cypress" />

import orderJson from "../../fixtures/order.json";
import order2Json from "../../fixtures/order2.json";

describe("As a user viewing the list of Orders", () => {
  beforeEach(() => {
    cy.task("db:truncate", ["Burger", "Order"]);
    cy.task("db:insert", { modelName: "Order", json: [orderJson, order2Json] });

    cy.visit("/orders");
  });

  context("incomplete orders", () => {
    it("should display the Order name for each order", () => {
      cy.get("#incomplete-order-list").children().should("have.length", 1);

      cy.get("#incomplete-order-list > :nth-child(1)").contains(orderJson.name);
      cy.get("#incomplete-order-list > :nth-child(1)").contains("Currently pending...");
    });

    describe("there is a clickable link for each Order", () => {
      let orderId;
      beforeEach(() => {
        cy.task("db:find", {
          modelName: "Order",
          conditions: { name: orderJson.name },
        }).then((orderData) => {
          orderId = orderData[0].id;
        });
      });

      it("should navigate to the details page of the Order", () => {
        cy.get("#incomplete-order-list > :nth-child(1)").contains(orderJson.name).click();
        cy.url().should("include", `/orders/${orderId}`);
      });
    });
  });

  context("complete orders", () => {
    it("should display the Order name for each order", () => {
      cy.get("#complete-order-list").children().should("have.length", 1);

      cy.get("#complete-order-list > :nth-child(1)").contains(order2Json.name);
      cy.get("#complete-order-list > :nth-child(1)").contains("Fulfillment time");
    });

    describe("there is a clickable link for each Order", () => {
      let orderId;
      beforeEach(() => {
        cy.task("db:find", {
          modelName: "Order",
          conditions: { name: order2Json.name },
        }).then((orderData) => {
          orderId = orderData[0].id;
        });
      });

      it("should navigate to the details page of the Order", () => {
        cy.get("#complete-order-list > :nth-child(1)").contains(order2Json.name).click();
        cy.url().should("include", `/orders/${orderId}`);
      });
    });
  });
});
