import { createContext, useState } from "react";

const LanguageContext = createContext();

const getString = (text) => {
    return true;
};

const LanguageProvider = (props) => {
    const [lang, setLang] = useState("pl");
    const { children} = props;
    <LanguageContext.Provider value={{lang, setLang}}>
        {children}
    </LanguageContext.Provider>
};

export default LanguageProvider;