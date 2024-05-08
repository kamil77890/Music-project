/*
   sorry for this spaghetti code, i ate some spaghetti in
  the morning so now you have to experience this.

  -bambus80
*/
import { createContext, useContext, useRef, useState } from "react";
import axios from "axios";

const LanguageContext = createContext();

const fetchStrings = async () => {
  const response = await axios.get("../../text.json"); //.then((response) => response.data);
  return response.data;
};

const getString = (text) => {
  return "Download";
};

const useLanguageContext = () => useContext(LanguageContext);

const LanguageProvider = (props) => {
  const stringsRef = useRef({});
  const [lang, setLang] = useState("pl");
  stringsRef.current = fetchStrings();
  console.log(stringsRef);

  const { children } = props;
  return (
    <LanguageContext.Provider value={{ lang, setLang, getString }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { useLanguageContext, LanguageProvider };
