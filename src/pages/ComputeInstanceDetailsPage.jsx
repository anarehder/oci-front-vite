import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import FixedMenuComponent from "../components/fixedComponents/FixedMenuComponent";
import apiServiceOCI from "../services/apiServiceOCI";
import HeaderComponent from '../components/fixedComponents/HeaderComponent';
import { useParams } from 'react-router-dom';

function ComputeInstanceDetailsPage() {
    const { displayName } = useParams();
    const decodedDisplayName = decodeURIComponent(displayName);
    const [user] = useContext(UserContext);
    const [computeInstanceInfo , setComputeInstanceInfo ] = useState([]);
    const [cpuDetails, setCpuDetails]= useState([]);
    const [memDetails, setMemDetails] = useState([]);
    const [interval, setInterval] = useState("2 HOUR");
    // console.log(computeInstancesInfo);
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
            <HeaderComponent title={"COMPUTE INSTANCE DETAILS"}/>
            <DetailsContainer>
                <h2>{decodedDisplayName}</h2>
                <h2>intervalo de coleta: {interval}</h2>
                {
                computeInstanceInfo?.id &&
                    <h2>Resultado recebido - objeto - id maquina {computeInstanceInfo?.id}</h2>
                // <ComputeInstancesComponent computeInstancesInfo={computeInstancesInfo} />
            }
             {
                cpuDetails.length >0 &&
                    <h2>Resultado recebido - array de tamanho {cpuDetails.length}  </h2>
                // <ComputeInstancesComponent computeInstancesInfo={computeInstancesInfo} />
            }
             {
                memDetails.length >0 &&
                    <h2>Resultado recebido - array de tamanho {memDetails.length} </h2>
                // <ComputeInstancesComponent computeInstancesInfo={computeInstancesInfo} />
            }
            </DetailsContainer>
        </PageContainer>
    )
}

export default ComputeInstanceDetailsPage;

const PageContainer = styled.div`
    width: 100%;
    height: 100vh;
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
`