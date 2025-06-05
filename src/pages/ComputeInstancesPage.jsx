import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import FixedMenuComponent from "../components/fixedComponents/FixedMenuComponent";
import apiServiceOCI from "../services/apiServiceOCI";
import ComputeInstancesComponent from '../components/ComputeInstancesComponent';
import HeaderComponent from '../components/fixedComponents/HeaderComponent';
import { useTenancy } from '../contexts/TenancyContext';
import { useMenu } from '../contexts/MenuContext';

function ComputeInstancesPage() {
    const { show } = useMenu();
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
            <RightContainer>
                <MenuBackground $show={show ? "exibir" : "ocultar"}>
                    teste
                </MenuBackground>
                {
                    !carregando &&
                    <ComputeInstancesComponent computeInstancesInfo={computeInstancesInfo}/>
                }
            </RightContainer>
        </PageContainer>
    )
}

export default ComputeInstancesPage;


const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    flex-direction: column;
`

const RightContainer = styled.div`
    // width: 100%;
    width: ${({ $show }) => ($show === "exibir" ? "calc(100% - 221px)" : "calc(100% -30px)")};
    z-index: 1;
    display: flex;
    margin-top: 90px;
    justify-content: flex-start;
`

const MenuBackground = styled.div`
    width: ${({ $show }) => ($show === "exibir" ? "221px" : "30px")};
    height: 100%;
    z-index: 1500;
`