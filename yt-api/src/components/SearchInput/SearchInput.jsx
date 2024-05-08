import React from "react";
import "./Input.scss";
import PropTypes from "prop-types"

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

SearchInput.propTypes = {
  query: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired
};