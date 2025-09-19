import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {SortControl} from "../components/SortControl/SortControl";

describe("SortControl component", () => {
  it("renders value provided in props", () => {
    render(<SortControl current={"Release Date"} onSelect={vi.fn()} />);
    expect(screen.getByText("Release Date")).toBeInTheDocument();
    expect(screen.getByText("Sort by")).toBeInTheDocument();
  });

  it('calls onSelect prop with the selected value when a value button is clicked', () => {
    const onSelect = vi.fn();
    render(<SortControl current={"Release Date"} onSelect={onSelect} />);

    fireEvent.click(screen.getByText("Release Date"));
    fireEvent.click(screen.getByText("Title"));

    expect(onSelect).toHaveBeenCalledWith("Title");
  });
});
