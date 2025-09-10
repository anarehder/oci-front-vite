import { useState, createContext, useEffect, useContext } from 'react';
import apiServiceOCI from '../services/apiServiceOCI';
import { UserContext } from './UserContext';

export const TenancyContext = createContext();

export default function TenancyProvider({ children }) {
    const [user] = useContext(UserContext);
    const [tenancy, setTenancy] = useState('all');
    const [allTenanciesInfo, setAllTenanciesInfo] = useState([]);
    const [oneTenancyInfo, setOneTenancyInfo] = useState([]);
    const [orphanList, setOrpahnList] = useState([]);
    const currentMonth = new Date().toISOString().slice(0, 7);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    
    useEffect(() => {
        async function fetchData() {
            try {
                if (tenancy === 'all') {
                    const response = await apiServiceOCI.getDash(user.token, selectedMonth);
                    if (response.status === 200) {
                        setAllTenanciesInfo(response.data);
                        setOrpahnList(response.data.orphan ? response.data?.orphan?.filter(item => item.is_orfao === "Y") : []);
                    }
                } else {
                    const tenancySelections = {tenancy1: tenancy, tenancy2: null, tenancy3: null};
                    // console.log(tenancySelections);
                    const response = await apiServiceOCI.getJoinDash(tenancySelections, user.token, selectedMonth);
                    if (response.status === 200) {
                        setOneTenancyInfo(response.data);
                        console.log(response.data);
                        setOrpahnList(response.data.orphan ? response.data?.orphan?.filter(item => item.is_orfao === "Y") : []);
                    }
                }
            } catch (error) {
                console.error(error);
                alert("Ocorreu um erro na busca de todas as tenancies", error);
            }
        }
        fetchData();
    }, [tenancy, selectedMonth]);
    

    return (
        <TenancyContext.Provider value={{tenancy, setTenancy, allTenanciesInfo, oneTenancyInfo, orphanList, selectedMonth, setSelectedMonth}}>
            {children}
        </TenancyContext.Provider>
    );
};

export const useTenancy = () => useContext(TenancyContext);