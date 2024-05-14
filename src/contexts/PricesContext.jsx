import { useState, useEffect, createContext } from 'react';
import apiService from '../services/apiService';

export const PricesContext = createContext();

export default function PricesProvider ({ children }) {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
        try {
            const response = await apiService.getOCIPrices();
                if (response.status === 200) {
                    const data = response.data;
                    setPrices(data);
                    console.log("SALVEI O PRICES!")
                }
        } catch (error) {
            console.log(error);
            alert("ocorreu um erro");
        }
    };

    fetchPrices();
  }, []); // empty dependency array means this effect runs only once, on mount

  return (
    <PricesContext.Provider value={prices}>
      {children}
    </PricesContext.Provider>
  );
};