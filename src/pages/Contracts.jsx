import styled from 'styled-components';
import { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import { Link } from 'react-router-dom';

function Contracts() {
    const [contracts, setContracts] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.getContracts();
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
            <h1>
                RELATÓRIOS CONTRATOS    
            </h1>
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
                            <Link to="/client">
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
    min-height: 100vh;
    color: #021121;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    h1{
        padding-top:30px;
    }
`

const ContractsTable = styled.div`
    flex-direction: column;
    h2 { 
        width: 160px;
    }
    h3 { 
        width: 160px;
    }
    button {
        margin-left: 20px;
    }
`

const ClientInfo = styled.div`
    line-height: 35px;
    align-items: center;
    justify-content: flex-start;
    padding-left: 50px;
    gap: 40px;
    border-bottom: 3px solid white;
`