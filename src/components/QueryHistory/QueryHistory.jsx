import "./QueryHistory.scss";
import React, { useState, useEffect } from "react";
import setQueryAndFetchData from "../YT-api/index";

const QueryHistory = () => {
  const [queryHistory, setQueryHistory] = useState([]);

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("queryHistory")) || [];
    setQueryHistory(storedHistory);
  }, []);

  return (
    <div className="queryStorage">
      <h2>Query History</h2>

      {queryHistory.map((query, index) => (
        <button
          onClick={() => setQueryAndFetchData(query)}
          className="historyElement"
          key={index}
        >
          {query}
        </button>
      ))}
    </div>
  );
};

export default QueryHistory;
