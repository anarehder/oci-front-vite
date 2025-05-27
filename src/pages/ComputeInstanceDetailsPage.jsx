import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import FixedMenuComponent from "../components/fixedComponents/FixedMenuComponent";
import apiServiceOCI from "../services/apiServiceOCI";
import HeaderComponent from '../components/fixedComponents/HeaderComponent';
import { useParams } from 'react-router-dom';
import { GrCloudComputer } from "react-icons/gr";
import LineGraphComponent from '../components/graphsComponents/LineGraphComponent';
import { DBTimeArray } from '../utils/dbTime';

function ComputeInstanceDetailsPage() {
    const { displayName } = useParams();
    const decodedDisplayName = decodeURIComponent(displayName);
    const [user] = useContext(UserContext);
    const [computeInstanceInfo , setComputeInstanceInfo ] = useState([]);
    const [cpuDetails, setCpuDetails]= useState([]);
    const [memDetails, setMemDetails] = useState([]);
    const [interval, setInterval] = useState("2 HOUR");
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
            setCarregando(true);
            if(!user) return;
            const body = {displayName: decodedDisplayName, interval: interval};
            const fetchData = async () => {
                try {
                    const response = await apiServiceOCI.getComputeDetails(user.token, body);
                    if (response.status === 200) {
                        setComputeInstanceInfo(response.data.details);
                        setCpuDetails(response.data.cpu);
                        setMemDetails(response.data.memory);
                        setCarregando(false);
                    }
                } catch (error) {
                    console.log(error);
                    alert("Ocorreu um erro", error);
                    setCarregando(false);
                }
            };
            fetchData();
        }, [interval]);

        return (
        <PageContainer>
            <FixedMenuComponent />
            <HeaderComponent title={"COMPUTE INSTANCE DETAILS"} />
            <DetailsContainer>
                    <InfoContainer>
                        <h2><GrCloudComputer size={30} /> {decodedDisplayName}</h2>

                        {
                            computeInstanceInfo?.id &&
                            <InstanceDetails>
                                <div> <h2>fault_domain</h2>{computeInstanceInfo.fault_domain}</div>
                                <div> <h2>availability_domain</h2>{computeInstanceInfo.availability_domain.slice(5)}</div>
                                <div> <h2>lifecycle_state</h2>{computeInstanceInfo.lifecycle_state}</div>
                                <div> <h2>memory_in_gbs</h2>{computeInstanceInfo.memory_in_gbs}</div>
                                <div> <h2>monthly_cost</h2>{computeInstanceInfo.monthly_cost}</div>
                                <div> <h2>ocpus</h2>{computeInstanceInfo.ocpus}</div>
                                <div> <h2>processor_description</h2>{computeInstanceInfo.processor_description}</div>
                                <div> <h2>region</h2>{computeInstanceInfo.region}</div>
                                <div> <h2>shape</h2>{computeInstanceInfo.shape}</div>
                                <div> <h2>time_created</h2>{computeInstanceInfo.time_created}</div>
                                <div> <h2>tenancy_name</h2>{computeInstanceInfo.tenancy_name}</div>
                            </InstanceDetails>
                        }
                        <InputContainer>
                            <h2>Intervalo de coleta:</h2>
                            <select value={interval} onChange={(e) => setInterval(e.target.value)}>
                                {DBTimeArray.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}

                            </select>
                        </InputContainer>
                        {carregando ? <h2>Carregando dados...</h2> :
                            <GraphsContainer>
                                {
                                    cpuDetails.length > 0 &&
                                    <LineGraphComponent data={cpuDetails.map(entry => ({ item: entry.metric_timestamp, valor: entry.cpu_usage.toFixed(2) }))} nome={"Cpu"} />
                                }
                                {
                                    memDetails.length > 0 &&
                                    <LineGraphComponent data={memDetails.map(entry => ({ item: entry.metric_timestamp, valor: entry.memory_usage.toFixed(2) }))} nome={"Memoria"} />
                                }
                            </GraphsContainer>
                        }
                    </InfoContainer>
            </DetailsContainer>
        </PageContainer>
    )
}

export default ComputeInstanceDetailsPage;

const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    flex-direction: column;
`

const DetailsContainer = styled.div`
    width: calc(100vw - 250px);
    margin: 100px 0;
    margin-left: 200px;
    position: relative;

    flex-direction: column;
    justify-content: flex-start;

    color: #021121;
    overflow-y: hidden;
    overflow-x: hidden;
    h2{
        margin-bottom: 20px;
    }

`
const InstanceDetails = styled.div`
    flex-wrap: wrap;
    gap:  10px;
    div{
        width: 40%;
        text-aling: left;
        justify-content: flex-start;
        align-items: center;
        // background-color: red;
        gap: 15px;
        h2{
            margin-bottom: 0;
        }
    }
`

const InfoContainer = styled.div `
    width: 90%;
    flex-direction: column;
    gap: 20px;
`

const InputContainer = styled.div`
    width: 400px;
    align-items: center;
    justify-content: center;
    gap: 15px;
    height: 60px;
    // background-color: red;
    h2{
        margin: 0 auto;
    }
`

const GraphsContainer = styled.div`
    // width: 50%;
    gap: 15px;
    // background-color: red;
    justify-content: center;
`