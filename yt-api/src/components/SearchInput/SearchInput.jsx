import React from "react";

const SearchInput = (props) => {
  const { query, onInputChange, onFormSubmit } = props;
  return (
    <form onSubmit={onFormSubmit}>
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
