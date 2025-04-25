import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import FixedMenuComponent from "../components/fixedComponents/FixedMenuComponent";
import apiServiceOCI from "../services/apiServiceOCI";
import ComputeInstancesComponent from '../components/ComputeInstancesComponent';
import HeaderComponent from '../components/fixedComponents/HeaderComponent';

function ComputeInstancesPage() {
    const [user] = useContext(UserContext);
    const [computeInstancesInfo , setComputeInstancesInfo ] = useState([]);
    // console.log(computeInstancesInfo);
    useEffect(() => {
            if(!user) return;
            const fetchData = async () => {
                try {
                    const response = await apiServiceOCI.getComputeInstances(user.token);
                    console.log(response.status);
                    if (response.status === 200) {
                        setComputeInstancesInfo(response.data);
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
            <HeaderComponent title={"COMPUTE INSTANCES"}/>
            {
                computeInstancesInfo.length >0 &&
                <ComputeInstancesComponent computeInstancesInfo={computeInstancesInfo} />
            }
        </PageContainer>
    )
}

export default ComputeInstancesPage;

const PageContainer = styled.div`
    width: 100%;
    height: 100vh;
    flex-direction: column;
`
