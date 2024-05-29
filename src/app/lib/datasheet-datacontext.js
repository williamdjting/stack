
import React, { createContext, useState, useContext } from 'react';

const DatasheetDataContext = createContext();

export const DatasheetDataProvider = ({ children }) => {
  const [datasheetData, setDatasheetData] = useState([]);

  return (
    <DatasheetDataContext.Provider value={{ datasheetData, setDatasheetData }}>
      {children}
    </DatasheetDataContext.Provider>
  );
};

// export const useDatasheetData = () => useContext(DatasheetDataContext);
