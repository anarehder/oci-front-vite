import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import FixedMenuComponent from "../components/fixedComponents/FixedMenuComponent";
import apiServiceOCI from "../services/apiServiceOCI";
import HeaderComponent from '../components/fixedComponents/HeaderComponent';
import BlockVolumeComponent from '../components/BlockVolumeComponent';
import { useTenancy } from '../contexts/TenancyContext';
import { useMenu } from '../contexts/MenuContext';

function BlockVolumePage() {
    const { show } = useMenu();
    const [user] = useContext(UserContext);
    const { tenancy } = useTenancy();
    const [blockVolumeInfo , setBlockVolumeInfo ] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
            if(!user) return;
            const fetchData = async () => {
                try {
                    if (tenancy === 'all') {
                    const response = await apiServiceOCI.getBlockVolumes(user.token);
                    if (response.status === 200) {
                        setBlockVolumeInfo(response.data);
                        setCarregando(false);
                    }
                } else {
                    const tenancySelections = {tenancy1: tenancy, tenancy2: null, tenancy3: null};
                    const response = await apiServiceOCI.getJoinBlockVolumes(user.token, tenancySelections);
                    if (response.status === 200) {
                        setBlockVolumeInfo(response.data);
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
                        <HeaderComponent title={"BLOCK VOLUME"} />
            <RightContainer>
                <MenuBackground $show={show ? "exibir" : "ocultar"}>
                    teste
                </MenuBackground>
                {
                    !carregando &&
                    <BlockVolumeComponent blockVolumeInfo={blockVolumeInfo} />
                }
            </RightContainer>
            
        </PageContainer>
    )
}

export default BlockVolumePage;


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