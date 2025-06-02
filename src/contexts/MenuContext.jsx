import { useState, createContext, useContext } from 'react';

export const MenuContext = createContext();

export default function MenuProvider({ children }) {
    const [show, setShow] = useState(true);
    
    return (
        <MenuContext.Provider value={{show, setShow}}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);