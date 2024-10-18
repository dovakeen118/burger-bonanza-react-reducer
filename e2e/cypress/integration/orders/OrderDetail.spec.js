/// <reference types="cypress" />

import orderJson from "../../fixtures/order.json";

describe("As a user viewing details about an Order", () => {
  beforeEach(() => {
    let orderId;
    cy.task("db:truncate", ["Burger", "Order"]);
    cy.task("db:insert", { modelName: "Order", json: orderJson });
    cy.task("db:find", {
      modelName: "Order",
      conditions: { name: orderJson.name },
    }).then((foundOrder) => {
      orderId = foundOrder[0].id;
      cy.visit(`/orders/${orderId}`);
    });
  });

  it("should display details for the Order", () => {
    cy.contains(orderJson.name);
    cy.get("#burger-list").children().should("have.length", orderJson.burgers.length);

    cy.get("#burger-list > :nth-child(1)").contains(orderJson.burgers[0].type);
    cy.get("#burger-list > :nth-child(1)").contains(
      orderJson.burgers[0].isGlutenFree ? "gluten-free" : "Hawaiian"
    );
    cy.get("#burger-list > :nth-child(1)").contains(orderJson.burgers[0].toppings[0]);
    cy.get("#burger-list > :nth-child(1)").contains(orderJson.burgers[0].toppings[1]);
    cy.get("#burger-list > :nth-child(1)").contains(orderJson.burgers[0].side);

    cy.get("#burger-list > :nth-child(2)").contains(orderJson.burgers[1].type);
    cy.get("#burger-list > :nth-child(2)").contains(
      orderJson.burgers[1].isGlutenFree ? "gluten-free" : "Hawaiian"
    );
    cy.get("#burger-list > :nth-child(2)").contains(orderJson.burgers[1].side);
  });

  it("should display whether the order has been completed", () => {
    cy.contains("Complete order").click();
    cy.get("h4").contains("Fulfilled");
  });
});
