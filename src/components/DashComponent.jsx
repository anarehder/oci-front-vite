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
    console.log(user);
    const { show } = useMenu();
    const { tenancy, oneTenancyInfo, allTenanciesInfo, selectedMonth, setSelectedMonth } = useTenancy();
    const sectionRef = useRef(null);
    console.log(oneTenancyInfo);
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
                <>
                    <TenancySelectionContainer>
                        <div>
                            <h3>Selecione um mês</h3>
                            <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
                        </div>
                    </TenancySelectionContainer>

                    {(tenancy === 'all' && allTenanciesInfo) && <DashGraphComponent tenancyInfo={allTenanciesInfo} scrollToSection={scrollToSection} selectedMonth={selectedMonth} />}
                    {(tenancy !== 'all' && oneTenancyInfo) && <DashGraphComponent tenancyInfo={oneTenancyInfo} scrollToSection={scrollToSection} selectedMonth={selectedMonth} />}

                    <OrphanListComponent sectionRef={sectionRef} />
                </>
            }
        </ComponentContainer>
    );
}
export default DashComponent;

const ComponentContainer = styled.div`
    flex-direction: column;
    gap: 20px;

    color: #021121;
    overflow-y: auto;
    overflow-x: hidden;
`;

const TenancySelectionContainer = styled.div `
    justify-content: flex-start;
    width: 400px;
    h3{
        width: 200px;
    }
    select {
        width: 200px;
    }
`