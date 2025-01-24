import React, { useContext } from "react";
import "./Input.scss";
import PropTypes from "prop-types";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useLanguageContext } from "../../contexts/LanguageContext";
import QueryHistory from "../QueryHistory/QueryHistory"; // Importujemy QueryHistory
import { IoSearch } from "react-icons/io5"; // Ikona lupki

const SearchInput = (props) => {
  const { theme } = useContext(ThemeContext);
  const { getString } = useLanguageContext();
  const { query, onInputChange, onFormSubmit } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onFormSubmit(e);
    }
  };

  return (
    <div>
      <form
        className={`${theme === "light" ? "light" : "dark"} search-box`}
        onSubmit={handleSubmit}
      >
        <label>
          <div className="showHistoryButton">
            <input
              type="text"
              placeholder={getString("search-box")}
              value={query}
              onChange={onInputChange}
            />
            <IoSearch className="search-icon" />
          </div>
        </label>
      </form>
      <QueryHistory
        query={query}
        onInputChange={onInputChange}
        onFormSubmit={onFormSubmit}
      />
    </div>
  );
};

export default SearchInput;

SearchInput.propTypes = {
  query: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
