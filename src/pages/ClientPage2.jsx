import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import apiService from '../services/apiService';
import MachineInfo from '../components/MachineInfo';
import { Link } from 'react-router-dom';
import { PricesContext } from '../contexts/PricesContext';
import MachineInfo2 from '../components/MachineInfo2';

function ClientPage2() {
    const [machines, setMachines] = useState([]);
    const [selectedMachine, setSelectedMachine] = useState("");
    const prices = useContext(PricesContext);
    console.log(machines);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.getReshape();
                    if (response.status === 200) {
                        setMachines(response.data);
                    }
            } catch (error) {
                console.log(error);
                alert("ocorreu um erro");
            }
        };
        fetchData();
    }, []);
    return (
        <PageContainer>
            <Header>
                <Link to="/homepage2">
                    <ReturnButton>
                        Voltar
                    </ReturnButton>
                </Link>
                <h1>
                TENANCY ACCERTE
                </h1>
            </Header>
            
            {(machines && machines.length > 0 && selectedMachine !== "" )&&
                machines.map((machine, index) => (
                    selectedMachine === index && <MachineInfo2 key={index} machine={machine} />
                ))
            }
            {selectedMachine !== "" &&
                <CloseGraphButton onClick={() => setSelectedMachine("")}>
                    Fechar Gráfico
                </CloseGraphButton>
            }
            <MachinesContainer>
                {machines && machines.length > 0 && 
                    machines.map((machine, index) => (
                        <MachineList key={index} color={machine.operation} selected={selectedMachine === index ? "yes": "no"}>
                            <h2>
                                {machine.Name}
                            </h2>
                            <h3>
                                {machine.Status}
                            </h3>
                            { prices.length ===0 ?
                                <button> Loading... </button> :
                                <button disabled={prices.length ===0} onClick={() => setSelectedMachine(index) }>
                                    {machine.operation !== "-" ? 'Reshape' : "OK"}
                                </button>
                            }
                            
                        </MachineList>
                    ))
                }
            </MachinesContainer>
        </PageContainer>
    );
}

export default ClientPage2

const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #F0F5F9;
    color: #021121;
    flex-direction: column;
    align-items: center;
    gap: 50px;
`

const Header = styled.div`
    justify-content: center;
    padding-top: 20px;
`

const MachinesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
`

const MachineList = styled.div`
    width: 200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 10px;
    line-height: 25px;
    border-radius: 50px;
    gap: 8px;
    border: ${(props) => (props.selected === 'yes' ? '5px solid green': '2px solid #021121')}; 
    h2{
        width: 175px;
        word-break: break-all;
    }
    button{
        width: 100px;
        justify-content: center;
        background-color: ${(props) => (props.color !== '-' ? 'green': 'inherit')};
        color: ${(props) => (props.color !== '-' ? 'white': '#021121')};
    }
`

const ReturnButton = styled.button`
    position: absolute;
    left: 10%;
`

const CloseGraphButton = styled.button`
    position: absolute;
    left: 90%;
    top: 4%;
`