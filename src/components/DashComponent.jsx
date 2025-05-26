import styled from 'styled-components';
import { useContext, useEffect, useState, useRef } from 'react';
import apiServiceOCI from '../services/apiServiceOCI';
import { UserContext } from '../contexts/UserContext';
import DashGraphComponent from './DashGraphComponent';
import OrphanListComponent from './OrphanListComponent';
import TenancySelectionComponent from './TenancySelectionComponent';

function DashComponent() {
    const [user] = useContext(UserContext);
    const sectionRef = useRef(null);
    const [allTenancies, setAllTenancies] = useState(true);
    const [allTenanciesInfo, setAllTenanciesInfo] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [tenancySelections, setTenancySelections] = useState(
        { tenancy1: null, tenancy2: null, tenancy3: null }
    );
    
    const [orphanList, setOrpahnList] = useState([]);
    const [compiledTenanciesInfo, setCompiledTenanciesInfo] = useState(null);

    const currentMonth = new Date().toISOString().slice(0, 7);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

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
        if (!user) return;
        getData();
    }, [selectedMonth, tenancySelections]);

    const getData = async () => {
        if (tenancySelections.tenancy1 === null && tenancySelections.tenancy2 === null && tenancySelections.tenancy3 === null) {
            try {
                const response = await apiServiceOCI.getDash(user.token, selectedMonth);
                if (response.status === 200) {
                    setAllTenanciesInfo(response.data);
                    setCompiledTenanciesInfo(null);
                    setAllTenancies(true);
                    setOrpahnList(response.data.orphan?.filter(item => item.is_orfao === "Y"));
                }
            } catch (error) {
                console.error(error);
                alert("Ocorreu um erro na busca de todas as tenancies", error);
            }
        } if (tenancySelections.tenancy1 !== null) {
            try {
                const response = await apiServiceOCI.getJoinDash(tenancySelections, user.token, selectedMonth);
                if (response.status === 200) {
                    setCompiledTenanciesInfo(response.data);
                    setAllTenancies(false);
                    setOrpahnList(response.data.orphan?.filter(item => item.is_orfao === "Y"));
                }
            } catch (error) {
                console.error(error);
                alert("Ocorreu um erro ao buscar tenancy", error);
            }
        }
    }

    const handleTenancyChange = async (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'null') {
            setTenancySelections({
                tenancy1: null,
                tenancy2: null,
                tenancy3: null
            });
        } else {
            setTenancySelections({
                tenancy1: selectedValue,
                tenancy2: null,
                tenancy3: null
            });
        }
    };

    return (
        <ComponentContainer>
            {allTenanciesInfo?.tenancies &&
                <TenancySelectionContainer>
                    <Compiladas>
                        <div>
                            <h3>Selecione uma Tenancy</h3>
                            <select value={tenancySelections.tenancy2 ? "nao" : tenancySelections.tenancy1} onChange={handleTenancyChange}>
                                {tenancySelections.tenancy2 && <option>Compilado</option>}
                                <option key={'null'} value={'null'}>Todas as Tenancies</option>
                                {allTenanciesInfo?.tenancies.map((tenancy) => (
                                    <option key={tenancy} value={tenancy}>{tenancy}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <h3>Selecione um mês</h3>
                            <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
                        </div>
                        {user?.isAdmin === 1 &&
                            <div>
                                <h3>Tenancies Compiladas</h3>
                                {tenancySelections.tenancy1 && tenancySelections.tenancy2 ?
                                    <div>
                                        <p>1.{tenancySelections?.tenancy1 ? tenancySelections?.tenancy1 : "-"}</p>
                                        <p>2.{tenancySelections?.tenancy2 ? tenancySelections?.tenancy2 : "-"}</p>
                                        <p>3.{tenancySelections?.tenancy3 ? tenancySelections?.tenancy3 : "-"}</p>
                                    </div> :
                                    allTenancies ?
                                        <div>
                                            <h3>Todas as tenancies</h3>
                                        </div>
                                        :
                                        <div>
                                            <h3>{tenancySelections?.tenancy1}</h3>
                                        </div>
                                }
                                <button onClick={() => setShowModal(!showModal)}>
                                    Compilar Tenancies
                                </button>
                            </div>
                        }
                    </Compiladas>
                </TenancySelectionContainer>
            }
            <TenancySelectionComponent
                show={showModal}
                setShowModal={setShowModal}
                onClose={() => setShowModal(false)}
                tenancySelections={tenancySelections}
                setTenancySelections={setTenancySelections}
                allTenancies={allTenanciesInfo?.tenancies}
                setAllTenancies={setAllTenancies}
                getData={getData}
            />
            {/* {
                !allTenancies &&
                    <h2>
                        {tenancySelections.tenancy1 && tenancySelections.tenancy1}
                        {tenancySelections.tenancy2 && ` / ${tenancySelections.tenancy2}`}
                        {tenancySelections.tenancy3 && ` / ${tenancySelections.tenancy3}`}
                    </h2>
            } */}
            {allTenancies && allTenanciesInfo && <DashGraphComponent tenancyInfo={allTenanciesInfo} scrollToSection={scrollToSection} selectedMonth={selectedMonth}/>}
            {!allTenancies && allTenanciesInfo && <DashGraphComponent tenancyInfo={compiledTenanciesInfo} scrollToSection={scrollToSection} selectedMonth={selectedMonth}/>}
            <OrphanListComponent orphanList={orphanList} sectionRef={sectionRef}/>
        </ComponentContainer>
    );
}
export default DashComponent;

const ComponentContainer = styled.div`
    width: calc(100vw - 220px);
    margin-left: 200px;
    margin-top: 90px;

    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;

    color: #021121;
    overflow-y: auto;
    overflow-x: hidden;
`;

const TenancySelectionContainer = styled.div `
    width: 95%;
    justify-content: space-between;
    flex-direction: column;
    gap: 50px;
    button{
        font-size: 15px;
        width: 100px;
    }
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