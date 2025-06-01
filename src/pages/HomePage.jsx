import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import FixedMenuComponent from "../components/fixedComponents/FixedMenuComponent";
import DashComponent from "../components/DashComponent";
import HeaderComponent from "../components/fixedComponents/HeaderComponent";

function HomePage() {
    const navigate = useNavigate();
    const [user] = useContext(UserContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        // const storedUser = JSON.parse(localStorage.getItem('user'));
        // if (storedUser) {
        //     setUser(storedUser);
        //     navigate("/contracts")
        // }
        // buscar o usuario e ja filtrar os items que aparecem aqui
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    return (
        <PageContainer>
            <FixedMenuComponent />
            <HeaderComponent title={"DASHBOARD"} />
            <DashComponent />
        </PageContainer>
    )
}

export default HomePage;

const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    flex-direction: column;
`