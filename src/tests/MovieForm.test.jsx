import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MovieForm from "../components/MovieForm/MovieForm";

describe("MovieForm component", () => {
  const movie = {
    name: "Inception",
    release_date: "2010-02-02",
    genres: ["Action", "Sci-Fi"],
    vote_average: 8.8,
    runtime: "148 min",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    imgUrl: "https://example.com/inception.jpg"
  };

  it("renders with provided props", () => {
    render(<MovieForm movie={movie} />);
    expect(screen.getByLabelText("Title")).toHaveValue("Inception");
    expect(screen.getByLabelText("Release date (2010)")).toHaveValue("2010-01-01");
    expect(screen.getByLabelText("Genres (Action, Sci-Fi)")).toHaveValue("Action, Sci-Fi");
    expect(screen.getByLabelText("Description")).toHaveValue("A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.");
  });
});
