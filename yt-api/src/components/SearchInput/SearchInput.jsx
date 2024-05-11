import React from "react";
import "./Input.scss";
import PropTypes from "prop-types";
import { useLanguageContext } from "../../contexts/LanguageContext";
import { IoSearch } from "react-icons/io5";

const SearchInput = (props) => {
  const { getString } = useLanguageContext();
  const { query, onInputChange, onFormSubmit } = props;
  return (
    <form className="search-box" onSubmit={onFormSubmit}>
      <label>
        <button>
          <input
            type="text"
            placeholder={getString("search-box")}
            value={query}
            onChange={onInputChange}
          />
          <IoSearch />
        </button>
      </label>
    </form>
  );
};

export default SearchInput;

SearchInput.propTypes = {
  query: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
