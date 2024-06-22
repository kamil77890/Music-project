import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const LanguageContext = createContext();

const fetchStrings = async () => {
  const response = await axios.get("src/strings.json");
  return response.data;
};

const allLanguages = { pl: "🇵🇱 ", en: "🇬🇧 ", cn: "🇨🇳 " };

const useLanguageContext = () => useContext(LanguageContext);

const LanguageProvider = (props) => {
  const [strings, setStrings] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setStrings(await fetchStrings());
    };
    fetchData();
  }, []);

  const [lang, setLang] = useState("pl");

  // look in src/strings.json for avaliable parameters
  const getString = (text) => {
    return strings ? strings[lang][text] : "Loading text...";
  };

  return (
    <LanguageContext.Provider
      value={{ lang, allLanguages, setLang, getString }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};

export { useLanguageContext, LanguageProvider };
