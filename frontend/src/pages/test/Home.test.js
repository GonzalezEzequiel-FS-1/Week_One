import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { test, expect, describe } from "@jest/globals"; // Import Jest functions explicitly

import Home from "./Home";

describe("Home Component", () => {
    test("formats input correctly with dashes", () => {
        render(<Home />);
        const input = screen.getByPlaceholderText("xxxx-xxxx-xxxx-xxxx");

        fireEvent.change(input, { target: { value: "1234567812345678" } });
        expect(input.value).toBe("1234-5678-1234-5678");
    });

    test("displays an error message for invalid input", () => {
        render(<Home />);
        const input = screen.getByPlaceholderText("xxxx-xxxx-xxxx-xxxx");
        const submitButton = screen.getByText("Submit");

        fireEvent.change(input, { target: { value: "12345678" } });
        fireEvent.click(submitButton);

        expect(screen.getByText("Pattern does not match")).toBeInTheDocument();
    });

    test("obscures part of the card number on submit", () => {
        render(<Home />);
        const input = screen.getByPlaceholderText("xxxx-xxxx-xxxx-xxxx");
        const submitButton = screen.getByText("Submit");

        fireEvent.change(input, { target: { value: "1234567812345678" } });
        fireEvent.click(submitButton);

        expect(screen.getByText("Obscured Number: ••••-••••-••••-5678")).toBeInTheDocument();
    });
});
