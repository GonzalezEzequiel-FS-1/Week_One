import "@testing-library/jest-dom";
import { test, expect } from "@jest/globals"; // Import Jest functions explicitly

import { add } from "./utils"; // Your function to test

test("adds 1 + 2 to equal 3", () => {
  expect(add(1, 2)).toBe(3);
});
