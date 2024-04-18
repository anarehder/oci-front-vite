import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import PricesContext from '../contexts/PricesContext';

const PricesProvider = ({ children }) => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
        try {
            const response = await apiService.getOCIPrices();
                if (response.status === 200) {
                    const data = response.data;
                    data.items.forEach((item) => {
                        item.currencyCodeLocalizations = item.currencyCodeLocalizations.filter(localization => localization.currencyCode === "BRL");
                    });
                    setPrices(data.items);
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

export default PricesProvider;