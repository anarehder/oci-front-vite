import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import FixedMenuComponent from "../components/fixedComponents/FixedMenuComponent";
import apiServiceOCI from "../services/apiServiceOCI";
import HeaderComponent from '../components/fixedComponents/HeaderComponent';
import BlockVolumeComponent from '../components/BlockVolumeComponent';

function BlockVolumePage() {
    const [user] = useContext(UserContext);
    const [blockVolumeInfo , setBlockVolumeInfo ] = useState([]);
    console.log(blockVolumeInfo[0]);
    useEffect(() => {
            if(!user) return;
            const fetchData = async () => {
                try {
                    const response = await apiServiceOCI.getBlockVolumes(user.token);
                    // console.log(response.status);
                    if (response.status === 200) {
                        setBlockVolumeInfo(response.data);
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
            <HeaderComponent title={"BLOCK VOLUME"}/>
            {
                blockVolumeInfo.length >0 &&
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
