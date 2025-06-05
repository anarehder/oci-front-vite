import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import FixedMenuComponent from "../components/fixedComponents/FixedMenuComponent";
import apiServiceOCI from "../services/apiServiceOCI";
import HeaderComponent from '../components/fixedComponents/HeaderComponent';
import EventsComponent from '../components/EventsComponent';
import { useParams } from 'react-router-dom';
import ComputeEventsPage from './ComputeEventsPage';
import DescriptionEventsComponent from '../components/DescriptionEventsComponent';
import { getComputeEventsDescriptions, ComputeEventsNames } from '../utils/computeEventsDescriptions';
import { getIdentityEventsDescriptions, IdentityEventsNames } from '../utils/identityEventsDescriptions';
import { useTenancy } from '../contexts/TenancyContext';
import { useMenu } from '../contexts/MenuContext';

function EventsPage() {
    const { show } = useMenu();
    const [user] = useContext(UserContext);
    const { tenancy } = useTenancy();
    const { type } = useParams();
    const [eventsInfo, setEventsInfo] = useState([]);
    const [carregando, setCarregando] = useState(true);

;    useEffect(() => {
        if (!user) return;
        const fetchData = async () => {
            try {
                if (tenancy === 'all') {
                    const response = await apiServiceOCI.getEvents(type, user.token);
                    if (response.status === 200) {
                        setEventsInfo(response.data);
                        setCarregando(false);
                    }
                } else {
                    const tenancySelections = { tenancy1: tenancy, tenancy2: null, tenancy3: null };
                    const response = await apiServiceOCI.getJoinEvents(type, user.token, tenancySelections);
                    if (response.status === 200) {
                        setEventsInfo(response.data);
                        setCarregando(false);
                    }
                }
                } catch (error) {
                    console.log(error);
                    alert("Ocorreu um erro", error);
                }
            };
            fetchData();
        }, [user, type, tenancy]);

    return (
        <PageContainer>
            <FixedMenuComponent />
            {
                user.isAdmin ? 
                <HeaderComponent title={`EVENTOS - ${type.toUpperCase()}`}/> :
                <HeaderComponent title={`EVENTOS - ${type.toUpperCase()} - ${user.client.toUpperCase()}`}/>
            }
            <RightContainer>
                <MenuBackground $show={show ? "exibir" : "ocultar"}>
                    teste
                </MenuBackground>
            {
                type === 'compute' && !carregando &&
                <DescriptionEventsComponent eventsInfo={eventsInfo.filter(item => ComputeEventsNames.includes(item.eventName))} eventsDescription={getComputeEventsDescriptions}/>
            }
            {
                type === 'identity' && !carregando &&
                <DescriptionEventsComponent eventsInfo={eventsInfo.filter(item => IdentityEventsNames.includes(item.eventName))} eventsDescription={getIdentityEventsDescriptions}/>
            }
            {
                type === 'network' && !carregando &&
                <DescriptionEventsComponent eventsInfo={eventsInfo} eventsDescription={getIdentityEventsDescriptions}/>
            }
            </RightContainer>
        </PageContainer>
    )
}

export default EventsPage;



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