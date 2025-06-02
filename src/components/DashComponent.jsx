import styled from 'styled-components';
import { useContext, useEffect, useState, useRef } from 'react';
import apiServiceOCI from '../services/apiServiceOCI';
import { UserContext } from '../contexts/UserContext';
import DashGraphComponent from './DashGraphComponent';
import OrphanListComponent from './OrphanListComponent';
import TenancySelectionComponent from './TenancySelectionComponent';
import { useTenancy } from '../contexts/TenancyContext';
import { useMenu } from '../contexts/MenuContext';

function DashComponent() {
    const [user] = useContext(UserContext);
    const { show } = useMenu();
    const { tenancy, oneTenancyInfo, allTenanciesInfo, selectedMonth, setSelectedMonth } = useTenancy();
    const sectionRef = useRef(null);

    const scrollToSection = () => {
        if (sectionRef.current) {
            const offsetTop = sectionRef.current.offsetTop;
            window.scrollTo({
                top: offsetTop - 85, // 50px acima
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        if (!user, !allTenanciesInfo) return;
    }, []);


    return (
        <ComponentContainer $show={show ? "exibir" : "ocultar"}>
            {allTenanciesInfo?.tenancies &&
                <TenancySelectionContainer>
                    <div>
                        <h3>Selecione um mês</h3>
                        <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
                    </div>
                </TenancySelectionContainer>
            }

            {(tenancy === 'all' && allTenanciesInfo) && <DashGraphComponent tenancyInfo={allTenanciesInfo} scrollToSection={scrollToSection} selectedMonth={selectedMonth} />}
            {(tenancy !== 'all' && oneTenancyInfo) && <DashGraphComponent tenancyInfo={oneTenancyInfo} scrollToSection={scrollToSection} selectedMonth={selectedMonth} />}
             <OrphanListComponent  sectionRef={sectionRef} />
        </ComponentContainer>
    );
}
export default DashComponent;

const ComponentContainer = styled.div`
    width: ${({ $show }) => ($show === "exibir" ? "calc(100vw - 210px)" : "calc(100vw - 50px)")};
    margin-left: ${({ $show }) => ($show === "exibir" ? "180px" : "20px")};  
    // margin-left: 200px;
    margin-top: 90px;

    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    color: #021121;
    overflow-y: auto;
    overflow-x: hidden;
`;

const TenancySelectionContainer = styled.div `
    width: 21%;
    justify-content: flex-start;
`

const Compiladas = styled.div`
    padding-top: 5px;
    justify-content: space-between;
    // min-gap: 15px;
    h3{
        max-width: 130px;
    }
    select {
        width: 300px;
    }
    input{ 
        font-size: 20px;
        width: 200px;
    }
    div{
        align-items: center;
        justify-content: center;
        width: auto;
        gap: 20px;
        div{
            justify-content: center;
            flex-direction: column;
            gap: 2px;
            flex-wrap: wrap;
            width: 250px;
        }
    }
`