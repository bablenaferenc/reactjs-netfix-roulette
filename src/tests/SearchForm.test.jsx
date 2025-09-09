import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SearchForm from "../components/SearchForm";

describe("SearchForm component", () => {
  const mockSearch = vi.fn();

  it("renders input with the initial value provided in props", () => {
    const { container } = render(<SearchForm initialQuery="test" />);
    expect(container.querySelector("input").value).toBe("test");
  });

  it("calls onSearch prop with the input value after clicking Search button", () => {
    render(<SearchForm initialQuery="" onSearch={mockSearch} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "hello" } });
    fireEvent.click(screen.getByText("Search"));

    expect(input.value).toBe("hello");
    expect(mockSearch).toHaveBeenCalledWith("hello"); 
  });

  it("calls onSearch prop with the input value after pressing Enter key", () => {
    render(<SearchForm initialQuery="" onSearch={mockSearch} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "new value" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(input.value).toBe("new value");
    expect(mockSearch).toHaveBeenCalledWith("new value");
  });

  it("calls onSearch prop with an empty string when initialQuery is empty and clicking Search button", () => {
    render(<SearchForm onSearch={mockSearch} />);
    const input = screen.getByRole("textbox");

    fireEvent.click(screen.getByText("Search"));

    expect(input.value).toBe("");
    expect(mockSearch).toHaveBeenCalled();
    expect(mockSearch).toHaveBeenCalledWith("");
  });
});
