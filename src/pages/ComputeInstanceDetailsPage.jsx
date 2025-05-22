import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import FixedMenuComponent from "../components/fixedComponents/FixedMenuComponent";
import apiServiceOCI from "../services/apiServiceOCI";
import HeaderComponent from '../components/fixedComponents/HeaderComponent';
import { useParams } from 'react-router-dom';
import { GrCloudComputer } from "react-icons/gr";
import LineGraphComponent from '../components/graphsComponents/LineGraphComponent';


function ComputeInstanceDetailsPage() {
    const { displayName } = useParams();
    const decodedDisplayName = decodeURIComponent(displayName);
    const [user] = useContext(UserContext);
    const [computeInstanceInfo , setComputeInstanceInfo ] = useState([]);
    const [cpuDetails, setCpuDetails]= useState([]);
    const [memDetails, setMemDetails] = useState([]);
    const [interval, setInterval] = useState("2 HOUR");
    console.log(cpuDetails);
    useEffect(() => {
            if(!user) return;
            const body = {displayName: decodedDisplayName, interval: interval};
            const fetchData = async () => {
                try {
                    // const body = {displayName: decodedDisplayName, interval: interval};
                    const response = await apiServiceOCI.getComputeDetails(user.token, body);
                    if (response.status === 200) {
                        setComputeInstanceInfo(response.data.details);
                        setCpuDetails(response.data.cpu);
                        setMemDetails(response.data.memory);
                    }
                } catch (error) {
                    console.log(error);
                    alert("Ocorreu um erro", error);
                }
            };
            fetchData();
        }, []);
    
    return (
        <PageContainer>
            <FixedMenuComponent />
            <HeaderComponent title={"COMPUTE INSTANCE DETAILS"} />
            <DetailsContainer>
                <h2><GrCloudComputer size={30} /> {decodedDisplayName}</h2>

                <h2>intervalo de coleta: {interval}</h2>
                {
                    computeInstanceInfo?.id &&
                    <>
                        <h2>Resultado recebido - objeto - id maquina {computeInstanceInfo?.id}</h2>
                        <div> <h2>fault_domain</h2>{computeInstanceInfo.fault_domain}</div>
                        <div> <h2>availability_domain</h2>{computeInstanceInfo.availability_domain.slice(5)}</div>
                        <div> <h2>lifecycle_state</h2>{computeInstanceInfo.lifecycle_state}</div>
                        <div> <h2>memory_in_gbs</h2>{computeInstanceInfo.fault_memory_in_gbsdomain}</div>
                        <div> <h2>monthly_cost</h2>{computeInstanceInfo.monthly_cost}</div>
                        <div> <h2>ocpus</h2>{computeInstanceInfo.ocpus}</div>
                        <div> <h2>processor_description</h2>{computeInstanceInfo.processor_description}</div>
                        <div> <h2>region</h2>{computeInstanceInfo.region}</div>
                        <div> <h2>shape</h2>{computeInstanceInfo.shape}</div>         
                        <div> <h2>time_created</h2>{computeInstanceInfo.time_created}</div>
                        <div> <h2>tenancy_name</h2>{computeInstanceInfo.tenancy_name}</div>           
                    </>
                }
                {
                    cpuDetails.length > 0 &&
                    <>
                    <h2>Resultado recebido - array de tamanho {cpuDetails.length}  </h2>
                    <LineGraphComponent  data={cpuDetails.map(entry => ({item: entry.metric_timestamp, value: entry.cpu_usage}))} nome={"Cpu"}/>
                    </>
                    
                    // <ComputeInstancesComponent computeInstancesInfo={computeInstancesInfo} />
                }
             {
                memDetails.length >0 &&
                    
                    <>
                    <h2>Resultado recebido - array de tamanho {memDetails.length} </h2>
                    <LineGraphComponent  data={memDetails.map(entry => ({item: entry.metric_timestamp, value: entry.mem_usage}))} nome={"Memoria"}/>
                    </>
                // <ComputeInstancesComponent computeInstancesInfo={computeInstancesInfo} />
            }
            </DetailsContainer>
        </PageContainer>
    )
}

// function LineGraphComponent({ , nome }) {
//   const categorias = data.map((d) => d.item);
//   const valores = data.map((d) => d.valor);

export default ComputeInstanceDetailsPage;

const PageContainer = styled.div`
    width: 100%;
    // height: 100vh;
    flex-direction: column;
`

const DetailsContainer = styled.div`
    width: calc(100vw - 220px);
    margin: 80px 0;
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
    div {
        width: 50%;
    }
`