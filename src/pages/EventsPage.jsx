import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import FixedMenuComponent from "../components/FixedMenuComponent";
import apiServiceOCI from "../services/apiServiceOCI";
import HeaderComponent from '../components/HeaderComponent';

function EventsPage() {
    const [user] = useContext(UserContext);
    const [eventsInfo , setEventsInfo ] = useState([]);
    // console.log(eventsInfo);
    // console.log(user);
    useEffect(() => {
            if(!user) return;
            const fetchData = async () => {
                try {
                    console.log(user.token);
                    const response = await apiServiceOCI.getAudits(user.token);
                    console.log(response.status);
                    if (response.status === 200) {
                        setEventsInfo(response.data);
                    }
                } catch (error) {
                    console.log(error);
                    alert("Ocorreu um erro", error);
                }
            };
            fetchData();
        }, [user]);
    
    return (
        <PageContainer>
            <FixedMenuComponent />
            <HeaderComponent title={"EVENTOS"}/>
            {
                eventsInfo.length >0 && <div> Eventos OK {eventsInfo.length} </div>

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
