
import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-container">
      <h3>Search Extensions</h3>
      <input
        type="text"
        className="search-input"
        placeholder="Search by floor, department, person name, or extension number..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
