import React, { memo } from "react";
import "./FilterButton.css";

const FilterButtons = memo(({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="filter-buttons">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`filter-button ${
            currentFilter === filter.key ? "active" : ""
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
});

FilterButtons.displayName = "FilterButtons";
export default FilterButtons;
