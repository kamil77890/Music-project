import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./QueryHistory.scss";

const QueryHistory = ({ query, onInputChange, onFormSubmit }) => {
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

  const handleChange = (querys) => {
    onInputChange({ target: { value: querys } });
  };

  const handleHistoryClick = (query) => {
    onInputChange({ target: { value: query } });
    onFormSubmit({ preventDefault: () => { } });
  };

  const showQueryHistory = () => {
    if (queryHistory.length > 3) {
      return queryHistory.slice(0, 3).map((query, index) => (
        <div key={index} className="queryStorage"> {/* Zmieniamy tutaj klasę */}
          <button
            onClick={() => handleHistoryClick(query)}
            className="historyElement"
          >
            {query}
          </button>
        </div>
      ));
    }

    return queryHistory.length > 0 ? (
      <div className="queryStorage"> {/* Zmieniamy tutaj klasę */}
        {queryHistory.map((query, index) => (
          <button
            onClick={() => handleHistoryClick(query)}
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

  return <div>{showQueryHistory()}</div>;
};

QueryHistory.propTypes = {
  query: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default QueryHistory;
