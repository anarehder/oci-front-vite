import { useState, createContext } from 'react';

export const TenancyContext = createContext();

export default function TenancyProvider({ children }) {
    const [tenancy, setTenancy] = useState([]);

    return (
        <TenancyContext.Provider value={[tenancy, setTenancy]}>
            {children}
        </TenancyContext.Provider>
    );
};