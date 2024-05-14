import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import apiService from '../services/apiService';
import { Link } from 'react-router-dom';
import { UserContext } from "../contexts/UserContext";
import Logout from '../components/LogoutComponent';
import { TenancyContext } from '../contexts/TenancyContext';

function Contracts() {
    const [user] = useContext(UserContext);
    const [, setTenancy] = useContext(TenancyContext);
    const [contracts, setContracts] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userLocal = localStorage.getItem("user");
                if (!userLocal) {
                    return navigate("/");
                }
                const response = await apiService.getContracts(user.token);
                    if (response.status === 200) {
                        setContracts(response.data);
                    }
            } catch (error) {
                console.log(error);
                alert("ocorreu um erro");
            }
        };
        fetchData();
    }, []);

    return (
        <PageContainer>
            <Header>
                <h1>
                    Relatórios Contratos - {user.client}    
                </h1>
                <Logout />
            </Header>
            <ContractsTable>
                <ClientInfo>
                    <h2>
                        TENANCY
                    </h2>
                    <h2>
                        INÍCIO DO CONTRATO
                    </h2>
                    <h2>
                        TÉRMINO DO CONTRATO
                    </h2>
                    <h2>
                        VALOR DO CONTRATO
                    </h2>
                    <h2>
                        CLIQUE PARA VER MÁQUINAS
                    </h2>
                </ClientInfo>
                {contracts && contracts.length > 0 && 
                    contracts.map((contract, index) => (
                        <ClientInfo key={index}>
                            <h3>
                                {contract.Tenancy}
                            </h3>
                            <h3>
                                {contract.InicioContrato}
                            </h3>
                            <h3>
                                {contract.VencimentoContrato}
                            </h3>
                            <h3>
                                R$ {new Intl.NumberFormat('pt-BR').format(contract.Valor)}
                            </h3>
                            <Link to="/client" onClick={()=>setTenancy(contract.Tenancy)}>
                                <button>
                                    Ver detalhes    
                                </button> 
                            </Link>             
                        </ClientInfo>
                    ))
                }
            </ContractsTable>
        </PageContainer>
    )
}

export default Contracts;

const PageContainer = styled.div`
    width: 100vw;
    min-height: 100vh;
    color: #021121;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    h1{
        padding-top:30px;
    }
`

const Header = styled.div`
    height: 130px;
    width: 70%;
    border-bottom: 2px solid #E6E6E6;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    h1{
        font-size: 50px;
        font-weigth: 400;
    }
`

const ContractsTable = styled.div`
    flex-direction: column;
    align-items: center;
    gap: 10px;
    h2 { 
        width: 160px;
    }
    h3 { 
        width: 160px;
    }
    button {
        margin-left: 20px;
    }
    :nth-child(1){
        border: none !important;
    }
`

const ClientInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    line-height: 25px;
    border-radius: 10px;
    width: 1100px;
    gap: 40px;
    border: 2.5px solid #021121;
    h3{
        font-size: 23px;
    }
`