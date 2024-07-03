import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import apiService from '../services/apiService';
import { Link } from 'react-router-dom';
import { PricesContext } from '../contexts/PricesContext';
import MachineInfo from '../components/MachineInfo';
import { TenancyContext } from '../contexts/TenancyContext';
import { UserContext } from '../contexts/UserContext';
import Logout from '../components/LogoutComponent';
import { GoArrowRight } from "react-icons/go";
import ExportToExcelLists from '../services/exportToExcel';

function ClientPage() {
    const [machines, setMachines] = useState([]);
    const [compartments, setCompartments] = useState([]);
    const [selectedMachine, setSelectedMachine] = useState("");
    const [form, setForm] = useState({ compartment: ""});
    const [filteredMachines, setFilteredMachines] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");
    const prices = useContext(PricesContext);
    const [user] = useContext(UserContext);
    const [tenancy] = useContext(TenancyContext);
    const [showDashboard, setShowDashboard] = useState(true);

    console.log(showDashboard);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userLocal = localStorage.getItem("user");
                if (!userLocal) {
                    return navigate("/");
                }
                const body = {"tenancy": tenancy};
                const response = await apiService.getReshape(body, user.token);
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
    

    function SelectMachine(index){
        setSelectedMachine(index);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                <Link to="/contracts">
                    <ReturnButton>
                        Voltar
                        <GoArrowRight size={24} />
                    </ReturnButton>
                </Link>
                <h1>
                TENANCY {tenancy}
                </h1>
                <Logout />
                {(filteredMachines.length !== 0) && <ExportToExcelLists machines={filteredMachines} />}
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
                <button onClick={() => setShowDashboard(!showDashboard)}>
                    {showDashboard === true ? "Exibir Lista" : "Exibir Dashboard"}
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
                {filteredMachines && filteredMachines.length > 0 && showDashboard === false && 
                    filteredMachines.map((machine, index) => (
                        <MachineList key={index} color={machine.operation} selected={selectedMachine === index ? "yes": "no"}>
                            <h2>
                                {machine.VM_Name}
                            </h2>
                            <h3>
                                {machine.Status}
                            </h3>
                            <AvailableButton color={machine.last30.reshape}>
                                {machine.last30.reshape !== "-" ? 'DISPONÍVEL' : "OK"}
                            </AvailableButton>
                            <button onClick={() => SelectMachine(index)}>
                                Detalhes
                            </button>
                        </MachineList>
                    ))
                }
                <MachineDashboard>
                {filteredMachines && filteredMachines.length > 0 && showDashboard === true && 
                    filteredMachines.map((machine, index) => (
                        <DashboardItem key={index} color={machine.operation} selected={selectedMachine === index ? "yes": "no"}>
                            <h2>
                                {machine.VM_Name}
                            </h2>
                            <h3>
                                {machine.Status}
                            </h3>
                            <AvailableButton color={machine.last30.reshape}>
                                {machine.last30.reshape !== "-" ? 'DISPONÍVEL' : "OK"}
                            </AvailableButton>
                            <button onClick={() => SelectMachine(index)}>
                                Detalhes
                            </button>
                        </DashboardItem>
                    ))
                }
                </MachineDashboard>
            </MachinesContainer>
            {machines.length === 0 && <h1> Loading...</h1>}
        </PageContainer>
    );
}

export default ClientPage;

const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    color: #021121;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    margin-bottom: 20px;
`

const Header = styled.div`
    height: 130px;
    width: 70%;
    border-bottom: 2px solid #E6E6E6;
    padding: 10px 25px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    h1{
        font-size: 50px;
        font-weigth: 400;
    }
    a {
        margin: 20px;
        position: absolute;
        left: 3%;
        top: 5%;
    }
`
const ReturnButton = styled.button`
    width: 150px;
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

const MachineDashboard = styled.div`
    gap: 7px;    
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const DashboardItem = styled.div`
    padding: 2px;
    width: 130px;
    heigth: 100px;
    display: flex;
    gap: 3px;
    flex-direction: column;
    border-radius: 15px;
    border: ${(props) => (props.selected === 'yes' ? '4px solid green': '2px solid #021121')}; 
    align-items: center;
    h2{
        text-overflow: ellipsis;
        overflow: hidden;
        max-height: 16px;
        font-size: 15px;
        word-break: break-all;
    }
    h3{
        font-size: 13px;
        word-break: break-all;
    }
    button{
        width: 100px;
        font-size: 11px;
        justify-content: center;
        padding: 3px;
    }
`

const AvailableButton = styled.button`
    background-color: ${(props) => (props.color !== '-' ? 'green': 'inherit')};
    color: ${(props) => (props.color !== '-' ? 'white': '#021121')};
    pointer-events: none;
`

const CloseGraphButton = styled.button`
    position: absolute;
    left: 90%;
    top: 25%;
`