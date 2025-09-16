import React, { useState } from "react";
import "./sort-control.css";

type SortControlProps = {
  current: string;
  onSelect: (sortby: string) => void;
};

export const SortControl: React.FC<SortControlProps> = ({
  current,
  onSelect,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState(current || "Release Date");

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((open) => !open);
  };

  const handleRelease = (e: React.MouseEvent) => {
    setStatus("Release Date");
    e.stopPropagation();
    setMenuOpen(false);
    onSelect?.("Release Date");
  };

  const handleTitle = (e: React.MouseEvent) => {
    setStatus("Title");
    e.stopPropagation();
    setMenuOpen(false);
    onSelect?.("Title");
  };

  return (
    <div className="sort-control">
      <label>Sort by</label>
      <button type="button" aria-label="Open menu" onClick={handleMenuClick}>
        {status} <span>&#9662;</span>
      </button>
      {menuOpen && (
        <div className="menu-popup" onClick={() => setMenuOpen(false)}>
          <button
            className={status === "Release Date" ? "active" : ""}
            onClick={handleRelease}
          >
            Release Date
          </button>
          <button
            className={status === "Title" ? "active" : ""}
            onClick={handleTitle}
          >
            Title
          </button>
        </div>
      )}
    </div>
  );
};
