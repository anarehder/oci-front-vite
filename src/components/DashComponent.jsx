import styled from 'styled-components';
import { useContext, useEffect, useState, useRef } from 'react';
import apiServiceOCI from '../services/apiServiceOCI';
import { UserContext } from '../contexts/UserContext';
import DashGraphComponent from './DashGraphComponent';
import dbTime from '../assets/constants/dbTime';
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
    const [tenanciesToShow, setTenanciesToShow] = useState("");
    // const [selectedTime, setSelectedTime] = useState();

    const currentMonth = new Date().toISOString().slice(0, 7);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    const handleChange = (e) => {
        const label = e.target.value;
        const sqlValue = dbTime[label];
        setSelectedTime(sqlValue);
    };

    const scrollToSection = () => {
        if (sectionRef.current) {
            const offsetTop = sectionRef.current.offsetTop;
            window.scrollTo({
                top: offsetTop - 85, // 50px acima
                behavior: 'smooth'
            });
        }
    };
    // console.log(currentMonth);
    useEffect(() => {
        if (!user) return;
        if(allTenancies){
            getAllData();
        }
    }, []);
    // console.log(allTenanciesInfo?.cost_history[0]);

    const getAllData = async () => {
        try {
            const response = await apiServiceOCI.getDash(user.token, selectedMonth);
            // alert(`busquei mais dados ${selectedMonth}`);
            if (response.status === 200) {
                setAllTenanciesInfo(response.data);
                setCompiledTenanciesInfo(null);
                setTenanciesToShow("all");
                setOrpahnList(response.data.orphan?.filter(item => item.is_orfao === "Y"));
                setTenancySelections({ tenancy1: null, tenancy2: null, tenancy3: null });
            }
        } catch (error) {
            console.log(error);
            alert("Ocorreu um erro", error);
        }
    };

    const getJoinData = async () => {
        try {
            const response = await apiServiceOCI.getJoinDash(tenancySelections, user.token, selectedMonth);
            if (response.status === 200) {
                setCompiledTenanciesInfo(response.data);
                setTenanciesToShow("compiled");
                setOrpahnList(response.data.orphan?.filter(item => item.is_orfao === "Y"));
            }
        } catch (error) {
            console.log(error);
            alert("Ocorreu um erro", error);
        }
    };
    
    const handleTenancyChange = (e) => {
        const selectedValue = e.target.value;
        setTenancySelections({
                tenancy1: selectedValue,
                tenancy2: null,
                tenancy3: null
            });
            console.log(selectedValue);
        if (selectedValue === 'all') {
            setAllTenancies(true);
        } else {
            // Atualiza tenancy1 com o valor selecionado
            setAllTenancies(false);
        }
    };

    const handleLoadData = async () => {

        if (allTenancies){
            await getAllData();
        } else if (tenancySelections.tenancy1 === null) {
            alert("É necessário selecionar uma tenancy");
        } else {
            await getJoinData();
        }
    };
    const enabled = (!tenancySelections.tenancy2 && !tenancySelections.tenancy3) || allTenancies;
    console.log(tenancySelections);
    return (
        <ComponentContainer>
            {allTenanciesInfo?.tenancies &&
                <TenancySelectionContainer>
                    <Compiladas>
                        <h3>Selecione uma Tenancy</h3>
                        <div>
                            <select value={enabled? tenancySelections.tenancy1 : "-"} onChange={handleTenancyChange}>
                                <option key={'all'} value={'all'}>Todas as Tenancies</option>
                                {allTenanciesInfo?.tenancies.map((tenancy) => (
                                    <option key={tenancy} value={tenancy}>{tenancy}</option>
                                ))}
                            </select>
                            <button disabled={!enabled} onClick={handleLoadData}>Carregar Dados</button>
                        </div>
                        
                        {/* <div>
                        <label>Selecione o intervalo de tempo:</label>
                        <select onChange={handleChange} defaultValue="">
                            <option value="" disabled>Escolha...</option>
                            {Object.keys(dbTime).map((label) => (
                                <option key={label} value={label}>
                                    {label}
                                </option>
                            ))}
                        </select>

                        <p>Valor SQL selecionado: {selectedTime}</p>
                    </div> */}
                        {/* <h3>Selecione um mês</h3>
                    <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} /> */}

                    </Compiladas>
                    <Compiladas>
                        <h3>Tenancies Compiladas</h3>
                        <div>
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
                getJoinData={getJoinData}
            />
            {tenanciesToShow === "all" && <DashGraphComponent tenancyInfo={allTenanciesInfo} scrollToSection={scrollToSection}/>}
            {tenanciesToShow === "compiled" && <DashGraphComponent tenancyInfo={compiledTenanciesInfo} scrollToSection={scrollToSection}/>}
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
    gap: 50px;
    button{
        font-size: 15px;
        width: 100px;
    }
`

const Compiladas = styled.div`
    padding-top: 5px;
    flex-direction: column;
    justify-content: space-between;
    flex-direction: column;
    select {
        width: 400px;
    }
    div{
        
        align-items: center;
        justify-content: space-between;
        width: 90%;
        div{
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
        }
    }
`