/// <reference types="cypress" />

import orderJson from "../../fixtures/order.json";
import order2Json from "../../fixtures/order2.json";

describe("As a user viewing the list of Orders", () => {
  beforeEach(() => {
    cy.task("db:truncate", ["Burger", "Order"]);
    cy.task("db:insert", { modelName: "Order", json: [orderJson, order2Json] });

    cy.visit("/orders");
  });

  it("should display the Order name for each order", () => {
    cy.get("#order-list").children().should("have.length", 2);

    cy.get("#order-list > :nth-child(1)").contains(orderJson.name);
    cy.get("#order-list > :nth-child(2)").contains(order2Json.name);
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
      cy.get("#order-list > :nth-child(1)").contains(orderJson.name).click();
      cy.url().should("include", `/orders/${orderId}`);
    });
  });
});
