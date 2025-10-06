import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MovieDetails from "../components/MovieDetails/MovieDetails";

describe("MovieDetails component", () => {
  const movie = {
    name: "Inception",
    release_date: "2010-01-01",
    genres: ["Action", "Sci-Fi"],
    director: "Christopher Nolan",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    imgUrl: "https://example.com/inception.jpg"
  };

  it("renders with provided props", () => {
    render(<MovieDetails movie={movie} />);
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("Action & Sci-Fi")).toBeInTheDocument();
    expect(screen.getByText("A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.")).toBeInTheDocument();
  });
});
