import React from "react";
import "./Input.scss";

const SearchInput = (props) => {
  const { query, onInputChange, onFormSubmit } = props;
  return (
    <form className="search-box" onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={onInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchInput;
