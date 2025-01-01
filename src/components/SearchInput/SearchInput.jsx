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

  const [queryHistory, setQueryHistory] = useState([]);

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("queryHistory")) || [];
    setQueryHistory(storedHistory);
  }, []);

  const updateLocalStorage = (history) => {
    localStorage.setItem("queryHistory", JSON.stringify(history));
  };

  const addToHistory = (newQuery) => {
    if (newQuery && !queryHistory.includes(newQuery)) {
      const updatedHistory = [newQuery, ...queryHistory];
      setQueryHistory(updatedHistory);
      updateLocalStorage(updatedHistory);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      addToHistory(query);
      onFormSubmit(e);
    }
  };

  const handleChange = (querys) => {
    onInputChange({ target: { value: querys } });
  };

  const showQueryHistory = () => {
    if (queryHistory.length > 3) {
      return queryHistory.slice(0, 3).map((query, index) => (
        <div key={index} className="queryHistory">
          <button
            onClick={() => handleChange(query)}
            className="historyElement"
            key={index}
          >
            {query}
          </button>
        </div>
      ));
    }

    return queryHistory.length > 0 ? (
      <div className="queryHistory">
        {queryHistory.map((query, index) => (
          <button
            onClick={() => handleChange(query)}
            className="historyElement"
            key={index}
          >
            {query}
          </button>
        ))}
      </div>
    ) : (
      ""
    );
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
            <IoSearch />
          </div>
        </label>
      </form>
      {showQueryHistory()}
    </div>
  );
};

export default SearchInput;

SearchInput.propTypes = {
  query: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
