import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import FixedMenuComponent from "../components/fixedComponents/FixedMenuComponent";
import apiServiceOCI from "../services/apiServiceOCI";
import HeaderComponent from '../components/fixedComponents/HeaderComponent';
import BlockVolumeComponent from '../components/BlockVolumeComponent';
import { useTenancy } from '../contexts/TenancyContext';

function BlockVolumePage() {
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
            <HeaderComponent title={"BLOCK VOLUME"}/>
            {
                !carregando &&
                <BlockVolumeComponent blockVolumeInfo={blockVolumeInfo} />
            }
        </PageContainer>
    )
}

export default BlockVolumePage;

const PageContainer = styled.div`
    width: 100%;
    height: 100vh;
    flex-direction: column;
`
