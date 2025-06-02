import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import FixedMenuComponent from "../components/fixedComponents/FixedMenuComponent";
import apiServiceOCI from "../services/apiServiceOCI";
import ComputeInstancesComponent from '../components/ComputeInstancesComponent';
import HeaderComponent from '../components/fixedComponents/HeaderComponent';
import { useTenancy } from '../contexts/TenancyContext';

function ComputeInstancesPage() {
    const [user] = useContext(UserContext);
    const { tenancy } = useTenancy();
    const [computeInstancesInfo, setComputeInstancesInfo] = useState([]);
    const [carregando, setCarregando] = useState(true);
    useEffect(() => {
        if (!user) return;
        const fetchData = async () => {
            try {
                if (tenancy === 'all') {
                    const response = await apiServiceOCI.getComputeInstances(user.token);
                    if (response.status === 200) {
                        setComputeInstancesInfo(response.data);
                        setCarregando(false);
                    }
                } else {
                    const tenancySelections = { tenancy1: tenancy, tenancy2: null, tenancy3: null };
                    console.log(tenancySelections);
                    const response = await apiServiceOCI.getJoinComputeInstances(tenancySelections, user.token);
                    if (response.status === 200) {
                        setComputeInstancesInfo(response.data);
                        setCarregando(false);
                    }
                }
            } catch (error) {
                console.log(error);
                alert("Ocorreu um erro", error);
            }
        };
        fetchData();
    }, [tenancy]);
    
    return (
        <PageContainer>
            <FixedMenuComponent />
            <HeaderComponent title={"COMPUTE INSTANCES"}/>
            {
                !carregando &&
                <ComputeInstancesComponent computeInstancesInfo={computeInstancesInfo}/>
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
