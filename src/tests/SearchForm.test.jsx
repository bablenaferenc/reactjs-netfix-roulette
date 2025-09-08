import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SearchForm from "../components/SearchForm";

describe("SearchForm component", () => {
  it("renders input with the initial value provided in props", () => {
    const { container } = render(<SearchForm initialQuery="test" />);
    expect(container.querySelector("input").value).toBe("test");
  });

  it("calls onSearch prop with the input value after clicking Submit button", () => {
    const handleSearch = vi.fn();
    render(<SearchForm initialQuery="" onSearch={handleSearch} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "hello" } });

    expect(input.value).toBe("hello");
  });

  it("calls onSearch prop with the input value after pressing Enter key", () => {
    const mockOnChange = vi.fn();
    render(<SearchForm initialQuery="" onSearch={mockOnChange} />);

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "new value" } });
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter", code: "Enter", charCode: 13 });

    expect(mockOnChange).toHaveBeenCalledWith("new value");
  });

  it("calls onSearch prop when clicking Search button", () => {
    const handleSearch = vi.fn();
    render(<SearchForm initialQuery="" onSearch={handleSearch} />);
  
    fireEvent.click(screen.getByText("Search"));
  
    expect(handleSearch).toHaveBeenCalled();
  });
});
