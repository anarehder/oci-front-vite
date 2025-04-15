import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import FixedMenuComponent from "../components/FixedMenuComponent";

function HomePage() {
    const navigate = useNavigate();
    const [user] = useContext(UserContext);
    
    useEffect(() => {
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
            <div> TO NA HOME</div>
        </PageContainer>
    )
}

export default HomePage;

const PageContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    button {
        position: absolute;
        width: 12%; 
        top: 82%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        display: flex;
        padding: 10px 15px;
        justify-content: space-between;
    }
`