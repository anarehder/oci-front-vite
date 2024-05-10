import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import apiService from '../services/apiService';
import { Link } from 'react-router-dom';
import { PricesContext } from '../contexts/PricesContext';
import MachineInfo from '../components/MachineInfo';

function ClientPage() {
    const [machines, setMachines] = useState([]);
    const [compartments, setCompartments] = useState([]);
    const [selectedMachine, setSelectedMachine] = useState("");
    const [form, setForm] = useState({ compartment: ""});
    const [filteredMachines, setFilteredMachines] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");
    const prices = useContext(PricesContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.getReshape();
                    if (response.status === 200) {
                        setMachines(response.data);
                        setFilteredMachines(response.data);
                        const compartments = response.data.map(objeto => objeto.Compartment);
                        const uniqueCompartments = Array.from(new Set(compartments));
                        setCompartments(uniqueCompartments);
                    }
            } catch (error) {
                console.log(error);
                alert("ocorreu um erro");
            }
        };
        fetchData();
    }, []);

    const handleForm = (e) => {
        e.preventDefault();
        setForm((prevForm) => ({ ...prevForm, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const compartments = machines.filter(m => m.Compartment === form.compartment);
        setSelectedMachine("");
        setFilteredMachines(compartments);
    }

    const handleClick = ({filterName}) => {
        if(selectedFilter === filterName){
            CleanFilter();
            setSelectedFilter("");
        } 
        else {
            setSelectedFilter(filterName);
            if(filterName === "OA"){
                OperationAvailableFilter();
            }
            if (filterName === "SM"){
                StoppedMachinesFilter();
            }
        }
    }

    function CleanFilter(){
        setSelectedMachine("");
        setForm({ compartment: ""});
        setFilteredMachines(machines);
    }

    function OperationAvailableFilter(){
        const filteredMachines = machines.filter(m => m.last30.reshape !== "-");
        setSelectedMachine("");
        setFilteredMachines(filteredMachines);
    }

    function StoppedMachinesFilter(){
        const stoppedMachines = machines.filter(m => m.Status === "STOPPED");
        setSelectedMachine("");
        setFilteredMachines(stoppedMachines);
    }

    return (
        <PageContainer onSubmit={handleSubmit}>
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
            <FilterOptions>
                <button disabled={selectedFilter !== "" && selectedFilter !== "OA"} onClick={() => handleClick({filterName: "OA"})}>
                    Máquinas com Alteração Disponível
                </button>
                <button disabled={selectedFilter !== "" && selectedFilter !== "SM"} onClick={() => handleClick({filterName: "SM"})}>
                    Máquinas Paradas
                </button>
                <button disabled={selectedFilter !== "" && selectedFilter !== "CF"} onClick={() => handleClick({filterName: "CF"})}>
                    Filtro de Compartment
                </button>
            </FilterOptions>
            {selectedFilter === "CF" && 
                <FormContainer>
                <MainForm>
                    <InputArea>
                        <h2>Selecione um Compartment:</h2>
                        <select onChange={handleForm} id="compartment" value={form.compartment}>
                            {!form.compartment && (<option value="" hidden>Nome do Compartment</option>)}
                            {compartments.map((c, index) => (
                                <option key={index} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </InputArea>
                    <button type="submit">
                        <p>Filtrar</p>
                    </button>
                </MainForm>
                <button onClick={CleanFilter}>
                    <p> Limpar Filtro </p>
                </button>
                </FormContainer>
            }
            {(filteredMachines && filteredMachines.length > 0 && selectedMachine !== "" )&&
                filteredMachines.map((machine, index) => (
                    selectedMachine === index && <MachineInfo key={index} machine={machine} />
                ))
            }
            {selectedMachine !== "" &&
                <CloseGraphButton onClick={() => setSelectedMachine("")}>
                    Fechar Gráfico
                </CloseGraphButton>
            }
            <MachinesContainer>
                {filteredMachines && filteredMachines.length > 0 && 
                    filteredMachines.map((machine, index) => (
                        <MachineList key={index} color={machine.operation} selected={selectedMachine === index ? "yes": "no"}>
                            <h2>
                                {machine.Name}
                            </h2>
                            <h3>
                                {machine.Status}
                            </h3>
                            <AvailableButton color={machine.last30.reshape}>
                                {machine.last30.reshape !== "-" ? 'DISPONÍVEL' : "OK"}
                            </AvailableButton>
                            { prices.length ===0 ?
                                <button> Loading... </button> :
                                <button disabled={prices.length ===0} onClick={() => setSelectedMachine(index) }>
                                    Detalhes
                                </button>
                            }
                            
                        </MachineList>
                    ))
                }
            </MachinesContainer>
        </PageContainer>
    );
}

export default ClientPage;

const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #F0F5F9;
    color: #021121;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    margin-bottom: 20px;
`

const Header = styled.div`
    justify-content: center;
    padding-top: 20px;
`

const FilterOptions = styled.div`
    justify-content: center;
    gap: 25px;
    button{
        width: 200px;
        font-size: 18px;
        justify-content: center;
    }
`

const FormContainer = styled.div`
    width: 45%;
    display: flex;
    align-items: center;
    gap: 20px;
    button{
        width: 160px !important;
        height: 50px !important;
        justify-content: center;
    }
`

const MainForm = styled.form`
    display: flex;
    align-items: center;
`

const InputArea = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    select {
        margin: 0 25px;
        font-size: 22px;
    }
`

const MachinesContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 5px;
`

const MachineList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    line-height: 25px;
    border-radius: 10px;
    width: 1000px;
    gap: 40px;
    border: ${(props) => (props.selected === 'yes' ? '4px solid green': '2px solid #021121')}; 
    h2{
        width: 400px;
        word-break: break-all;
    }
    h3{
        width: 200px;
        word-break: break-all;
    }
    button{
        width: 130px;
        font-size: 16px;
        justify-content: center;
    }
`

const AvailableButton = styled.button`
    background-color: ${(props) => (props.color !== '-' ? 'green': 'inherit')};
    color: ${(props) => (props.color !== '-' ? 'white': '#021121')};
`


const ReturnButton = styled.button`
    position: absolute;
    left: 10%;
`

const CloseGraphButton = styled.button`
    position: absolute;
    left: 90%;
    top: 13%;
`