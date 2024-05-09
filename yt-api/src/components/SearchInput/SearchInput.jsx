import React from "react";
import "./Input.scss";
import PropTypes from "prop-types"
import { useLanguageContext } from "../../contexts/LanguageContext";

const SearchInput = (props) => {
  const { getString } = useLanguageContext();
  const { query, onInputChange, onFormSubmit } = props;
  return (
    <form className="search-box" onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder={getString("search-box")}
        value={query}
        onChange={onInputChange}
      />
      <button type="submit">{getString("search")}</button>
    </form>
  );
};

export default SearchInput;

SearchInput.propTypes = {
  query: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired
};