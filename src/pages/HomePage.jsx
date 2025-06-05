import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import FixedMenuComponent from "../components/fixedComponents/FixedMenuComponent";
import DashComponent from "../components/DashComponent";
import HeaderComponent from "../components/fixedComponents/HeaderComponent";
import { useMenu } from "../contexts/MenuContext";

function HomePage() {
    const navigate = useNavigate();
    const { show } = useMenu();
    
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
            <RightContainer>
                <MenuBackground $show={show ? "exibir" : "ocultar"}>
                    teste
                </MenuBackground>
                <DashComponent />
            </RightContainer>
            
        </PageContainer>
    )
}

export default HomePage;

const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    flex-direction: column;
`

const RightContainer = styled.div`
    width: 100%;
    z-index: 1;
    display: flex;
    margin-top: 90px;
    justify-content: flex-start;
    // background-color: red;
`

const MenuBackground = styled.div`
    width: ${({ $show }) => ($show === "exibir" ? "221px" : "30px")};
    height: 100%;
    z-index: 1500;
`