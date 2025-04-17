import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import apiServiceOCI from '../services/apiServiceOCI';
import { UserContext } from '../contexts/UserContext';
import DashGraphComponent from './DashGraphComponent';

function DashComponent() {
    const [user] = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const [allTenanciesInfo, setAllTenanciesInfo] = useState(null);
    const [tenancySelections, setTenancySelections] = useState({tenancy1: null, tenancy2: null, tenancy3:null});
    const [compiledTenanciesInfo, setCompiledTenanciesInfo] = useState(null);
    const [tenanciesToShow, setTenanciesToShow] = useState("");
    
    useEffect(() => {
        if(!user) return;
        getAllData();
    }, []);


    const getAllData = async () => {
        try {
            const response = await apiServiceOCI.getDash(user.token);
            if (response.status === 200) {
                setAllTenanciesInfo(response.data);
                setCompiledTenanciesInfo(null);
                setTenanciesToShow("all");
            }
        } catch (error) {
            console.log(error);
            alert("Ocorreu um erro", error);
        }
    };

    const getJoinData = async () => {
        try {
            const response = await apiServiceOCI.getJoinDash(tenancySelections, user.token);
            if (response.status === 200) {
                setCompiledTenanciesInfo(response.data);
                setTenanciesToShow("compiled");
            }
        } catch (error) {
            console.log(error);
            alert("Ocorreu um erro", error);
        }
    };
    
    const handleTenancyChange = (e) => {
        const selectedValue = e.target.value;

        // Atualiza tenancy1 com o valor selecionado
        setTenancySelections((prevState) => ({
            ...prevState,
            tenancy1: selectedValue
        }));
    };

    const handleLoadData = async () => {
        // Chamada de API com tenancy1 selecionado
        if (tenancySelections.tenancy1 === null) {
            alert("É necessário selecionar uma tenancy");
        }
        if (tenancySelections.tenancy1 === 'all') {
            // alert("Carregar dados para: todos");
            await getAllData();
        } else {
            // alert(`Carregar dados para: ${tenancySelections.tenancy1}`);
            await getJoinData();
        }
    };
    
    return (
        <ComponentContainer>
            {allTenanciesInfo?.tenancies &&
            <TenancySelectionContainer>
                <div>
                    <h3>Selecionar Tenancy</h3>
                    <select value={tenancySelections.tenancy1} onChange={handleTenancyChange}>
                        <option key={'all'} value={'all'}>Todas as Tenancies</option>
                        {allTenanciesInfo?.tenancies.map((tenancy) => (
                            <option key={tenancy} value={tenancy}>{tenancy}</option>
                        ))}
                    </select>
                    <button onClick={handleLoadData}>Carregar Dados</button>
                </div>
                <button onClick={()=>setShowModal(!showModal)}> 
                    Compilar Dados Tenancies {showModal ? "sim" : "nao"}
                </button>
            </TenancySelectionContainer>
            }
            {tenanciesToShow === "all" && <DashGraphComponent tenancyInfo={allTenanciesInfo} />}
            {tenanciesToShow === "compiled" && <DashGraphComponent tenancyInfo={compiledTenanciesInfo} />}
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
    height: 70px;
    div{
        justify-content: center;
        gap: 20px;
        
        select {
        width: 300px;
        }
    }
    button{
        font-size: 16px;
    }
`