import { createContext, useContext, useState } from "react";

type LanguageContext = {
  language: string;
  setLanguage: (index: string) => void;
};

interface LanguageContextInterface {
  children: React.ReactNode;
}

const LanguageContext = createContext({} as LanguageContext);

const LanguageContextProvider = ({ children }: LanguageContextInterface) => {
  const [language, setLanguage] = useState("");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

function useLanguageContext() {
  return useContext(LanguageContext);
}

export { LanguageContextProvider, useLanguageContext };
