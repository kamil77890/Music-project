import React, { useContext, useEffect, useState } from "react";
import "./Input.scss";
import PropTypes from "prop-types";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useLanguageContext } from "../../contexts/LanguageContext";
import { IoSearch } from "react-icons/io5";

const SearchInput = (props) => {
  const { theme } = useContext(ThemeContext);
  const { getString } = useLanguageContext();
  const { query, onInputChange, onFormSubmit } = props;
  return (
    <form
      className={(theme === "light" ? "light" : "dark", "search-box")}
      onSubmit={onFormSubmit}
    >
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
