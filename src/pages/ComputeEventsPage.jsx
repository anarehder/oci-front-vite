import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import FixedMenuComponent from "../components/fixedComponents/FixedMenuComponent";
import apiServiceOCI from "../services/apiServiceOCI";
import HeaderComponent from '../components/fixedComponents/HeaderComponent';
import DescriptionEventsComponent from '../components/DescriptionEventsComponent';

function ComputeEventsPage() {
    const [user] = useContext(UserContext);
    const [eventsInfo , setEventsInfo ] = useState([]);
    // console.log(eventsInfo);
    // console.log(user);
    useEffect(() => {
            if(!user) return;
            const fetchData = async () => {
                try {
                    const response = await apiServiceOCI.getComputeEvents(user.token);
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
            <HeaderComponent title={"EVENTOS - COMPUTE INSTANCES"}/>
            {
                eventsInfo.length >0 &&
                <DescriptionEventsComponent eventsInfo={eventsInfo} />
            }
        </PageContainer>
    )
}

export default ComputeEventsPage;

const PageContainer = styled.div`
    width: 100%;
    height: 100vh;
    flex-direction: column;
`
