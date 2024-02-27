import cleanUserInput from "../../services/cleanUserInput.js";

describe("cleanUserInput", () => {
  it("should return an empty object when the input is empty", () => {
    const input = {};
    const result = cleanUserInput(input);
    expect(result).toEqual({});
  });

  it("should return an empty object when the input contains only empty strings or null values", () => {
    const input = {
      name: "",
      email: null,
      age: "   ",
    };
    const result = cleanUserInput(input);
    expect(result).toEqual({});
  });

  it("should return an object with non-empty strings when the input contains a mix of empty strings, null values, and non-empty strings", () => {
    const input = {
      name: "John Doe",
      email: null,
      age: "30",
    };
    const result = cleanUserInput(input);
    expect(result).toEqual({ name: "John Doe", age: "30" });
  });

  it("should return an object with non-empty strings when the input contains only non-empty strings", () => {
    const input = {
      name: "John Doe",
      email: "john.doe@example.com",
      age: "30",
    };
    const result = cleanUserInput(input);
    expect(result).toEqual({ name: "John Doe", email: "john.doe@example.com", age: "30" });
  });
});
