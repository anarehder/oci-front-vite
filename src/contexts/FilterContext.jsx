import { useState, createContext, useContext } from 'react';

export const FilterContext = createContext();

export default function FilterProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState('');
    
    return (
        <FilterContext.Provider value={{searchTerm, setSearchTerm}}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => useContext(FilterContext);