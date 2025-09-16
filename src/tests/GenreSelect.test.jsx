import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GenreSelect from "../components/GenreSelect";

describe("GenreSelect component", () => {
  const genres = [ "Action", "Comedy", "Drama" ];

  it("renders initial genres value provided in props", () => {
    render(<GenreSelect genres={genres} />);
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Comedy")).toBeInTheDocument();
    expect(screen.getByText("Drama")).toBeInTheDocument();

    expect(screen.getByText("Action")).toHaveStyle("background-color: #f0f0f0; color: #000;");
    expect(screen.getByText("Drama")).toHaveStyle("background-color: #f0f0f0; color: #000;");
    expect(screen.getByText("Comedy")).toHaveStyle("background-color: #f0f0f0; color: #000;");
  });

  it('renders initial genres with selected genre', () => {
    render(<GenreSelect genres={genres} selectedGenre={"Action"} />);
    expect(screen.getByText("Action")).toHaveStyle("background-color: #007bff; color: #fff;");
    expect(screen.getByText("Drama")).toHaveStyle("background-color: #f0f0f0; color: #000;");
    expect(screen.getByText("Comedy")).toHaveStyle("background-color: #f0f0f0; color: #000;");
  });

  it('calls onSelect prop with the selected genre when a genre button is clicked', () => {
    const onSelect = vi.fn();
    render(<GenreSelect genres={genres} onSelect={onSelect} />);

    fireEvent.click(screen.getByText("Action"));

    expect(onSelect).toHaveBeenCalledWith("Action");
  });
});
