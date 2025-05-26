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
import {getComputeEventsDescriptions, ComputeEventsNames} from '../utils/computeEventsDescriptions';
import {getIdentityEventsDescriptions, IdentityEventsNames} from '../utils/identityEventsDescriptions';

function EventsPage() {
    const [user] = useContext(UserContext);
    const [eventsInfo , setEventsInfo ] = useState([]);
    const { type } = useParams();

    useEffect(() => {
            if(!user) return;
            const fetchData = async () => {
                try {
                    const response = await apiServiceOCI.getEvents(type, user.token);
                    if (response.status === 200) {
                        setEventsInfo(response.data);
                    }
                } catch (error) {
                    console.log(error);
                    alert("Ocorreu um erro", error);
                }
            };
            fetchData();
        }, [user, type]);

    return (
        <PageContainer>
            <FixedMenuComponent />
            {
                user.isAdmin ? 
                <HeaderComponent title={`EVENTOS - ${type.toUpperCase()}`}/> :
                <HeaderComponent title={`EVENTOS - ${type.toUpperCase()} - ${user.client.toUpperCase()}`}/>
            }
            
            <h2> tenancy</h2>
            {
                type === 'compute' && eventsInfo.length > 0 &&
                <DescriptionEventsComponent eventsInfo={eventsInfo.filter(item => ComputeEventsNames.includes(item.eventName))} eventsDescription={getComputeEventsDescriptions}/>
            }
            {
                type === 'identity' && eventsInfo.length > 0 &&
                <DescriptionEventsComponent eventsInfo={eventsInfo.filter(item => IdentityEventsNames.includes(item.eventName))} eventsDescription={getIdentityEventsDescriptions}/>
            }
            {
                type === 'network' && eventsInfo.length > 0 &&
                <DescriptionEventsComponent eventsInfo={eventsInfo} eventsDescription={getIdentityEventsDescriptions}/>
            }
        </PageContainer>
    )
}

export default EventsPage;

const PageContainer = styled.div`
    width: 100%;
    height: 100vh;
    flex-direction: column;
`
