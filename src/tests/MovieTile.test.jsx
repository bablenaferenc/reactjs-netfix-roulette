import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MovieTile from "../components/MovieTile/MovieTile";

describe("MovieTile component", () => {
  const movie = {
    name: "Inception",
    releaseYear: "2010",
    genres: ["Action", "Sci-Fi"],
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    imageUrl: "https://example.com/inception.jpg"
  };

  it("renders value provided in props", () => {
    render(<MovieTile movie={movie} />);
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("Action, Sci-Fi")).toBeInTheDocument();
    expect(screen.getByAltText("Inception")).toHaveAttribute("src", "https://example.com/inception.jpg");
  });

  it('calls onClick prop with the selected value when a value button is clicked', () => {
    const onClick = vi.fn();
    render(<MovieTile movie={movie} onClick={onClick} />);

    fireEvent.click(screen.getByText("Inception"));

    expect(onClick).toHaveBeenCalledWith(movie);
  });

  it("calls onEdit prop with the selected value when edit button is clicked", () => {
    const onEdit = vi.fn();
    render(<MovieTile movie={movie} onEdit={onEdit} isAdmin={true} />);

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(screen.getByText("Edit"));

    expect(onEdit).toHaveBeenCalledWith(movie);
  });

  it("calls onDelete prop with the selected value when delete button is clicked", () => {
    const onDelete = vi.fn();
    render(<MovieTile movie={movie} onDelete={onDelete} isAdmin={true} />);

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(screen.getByText("Delete"));

    expect(onDelete).toHaveBeenCalledWith(movie);
  });
});
