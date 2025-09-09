import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Counter from "../components/Counter";

describe("Counter component", () => {
  it("renders initial value provided in props", () => {
    const { container } = render(<Counter initialValue={5} />);
    expect(container.querySelector("p").textContent).toBe("Count: 5");
  });

  it('decrements value when clicking "decrement"', () => {
    const { container } = render(<Counter initialValue={5} />);
    fireEvent.click(screen.getByText("-1"));
    expect(container.querySelector("p").textContent).toBe("Count: 4");
  });

  it('increments value when clicking "increment"', () => {
    const { container } = render(<Counter initialValue={5} />);
    fireEvent.click(screen.getByText("+1"));
    expect(container.querySelector("p").textContent).toBe("Count: 6");
  });
});
