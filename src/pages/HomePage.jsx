import { Link } from "react-router-dom";
import ImagemInicial from '../assets/imagem-pag1.jpg';
import styled from 'styled-components';

function HomePage() {

    return (
        <PageContainer>
            <Link to={'/login'} >
                <button>
                    <p>Acessar</p>
                </button>
            </Link>
        </PageContainer>
    )
}

export default HomePage;

const PageContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    background: url(${ImagemInicial}) center/cover no-repeat;
    button {
        position: absolute;
        width: 12%; 
        top: 82%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        display: flex;
        padding: 10px 15px;
        justify-content: center;
    }
`