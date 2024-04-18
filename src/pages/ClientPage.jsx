import styled from 'styled-components';
import { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import MachineInfo from '../components/MachineInfo';
import { Link } from 'react-router-dom';

function ClientPage() {
    const [machines, setMachines] = useState([]);
    const [selectedMachine, setSelectedMachine] = useState("");
    console.log(selectedMachine);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.getReshape();
                    console.log(response.data);
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
                <Link to="/">
                    <ReturnButton>
                        Voltar
                    </ReturnButton>
                </Link>
                <h1>
                TENANCY ACCERTE
                </h1>
            </Header>
            
            {(machines && machines.length > 0 && selectedMachine !== "" )&&
            <>
                <CloseGraphButton onClick={() => setSelectedMachine("")}>
                    Fechar Gráfico
                </CloseGraphButton>
                <MachineInfo machine={machines[selectedMachine]} />
            </>
            }
            <MachinesContainer>
                {machines && machines.length > 0 && 
                    machines.map((machine, index) => (
                        <MachineList key={index} color={machine.operation} background={selectedMachine === index && "ok"}>
                            <h2>
                                {machine.Name}
                            </h2>
                            <h3>
                                {machine.Status}
                            </h3>
                            <button onClick={() => setSelectedMachine(index)}>
                                {machine.operation !== "-" ? 'Reshape' : "-"}
                            </button>
                        </MachineList>
                    ))
                }
            </MachinesContainer>
        </PageContainer>
    );
}

export default ClientPage

const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: black;
    color: white;
    flex-direction: column;
    align-items: center;
    gap: 50px;
`

const Header = styled.div`
    justify-content: center;
    padding: 10px;
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
    border: 2px solid gray;
    border-radius: 50px;
    gap: 8px;
    border: ${(props) => (props.background === 'ok' && '5px solid green')}; 
    h2{
        width: 175px;
        word-break: break-all;
    }
    button{
        width: 100px;
        justify-content: center;
        background-color: ${(props) => (props.color !== '-' && 'green')}; 
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