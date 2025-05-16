import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import apiServiceOCI from '../services/apiServiceOCI';
import { UserContext } from '../contexts/UserContext';
import RadialBarComponent from '../components/graphsComponents/RadialBarComponent';
import FixedMenuComponent from '../components/fixedComponents/FixedMenuComponent';
import HeaderComponent from '../components/fixedComponents/HeaderComponent';

function CpuMemPage() {
    const [memory, setMemory] = useState([]);
    const [cpu, setCpu] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [user] = useContext(UserContext);
    console.log(cpu[0]);
    useEffect(() => {
        if (!user?.token) return;

        async function fetchData() {
            try {
                setCarregando(true);
                const response = await apiServiceOCI.getLatestValues(user.token);
                if (response.status === 200) {
                    setCpu(response.data.cpu);
                    setMemory(response.data.memory);
                    setCarregando(false);
                }
            } catch (error) {
                console.error(error.response);
                setCarregando(false);
            }
        }
        fetchData();
        // Intervalo de 5 minutos
        const interval = setInterval(fetchData, 5 * 60 * 1000); // 5 minutos

        // Cleanup para evitar memory leak
        return () => clearInterval(interval);
    }, [user]);
    // console.log(tenancyInfo.creditsOCI);

    return (
        <Container>
            <FixedMenuComponent />
            <HeaderComponent title={"CPU E MEMÓRIA - AGORA"} />
            <GraphsContainer>
                <div>
                    <h2>
                        {carregando && cpu.length === 0 && "Carregando dados..."}
                    </h2>
                </div>
                {cpu.length > 0 && memory.length > 0 &&
                <>
                <h2>USO CPU</h2>
                        <GraphBlock>
                            {cpu
                                .slice(0, 8)
                                .map((c) => (
                                    < PieBlock key={c.resourceDisplayName}>
                                        <RadialBarComponent value={c.cpu_usage} />
                                        <p>{c.resourceDisplayName}</p>
                                        <p>{c.profile_name}</p>
                                        <button> Detalhes </button>
                                    </PieBlock>
                                ))}
                        </GraphBlock>
                        <h2>USO MEMÓRIA</h2>
                        <GraphBlock>
                            {memory
                                .slice(0, 8)
                                .map((c) => (
                                    <PieBlock key={c.resourceDisplayName}>
                                        <RadialBarComponent value={c.memory_usage} />
                                        <p>{c.resourceDisplayName}</p>
                                        <p>{c.profile_name}</p>
                                        <button> Detalhes </button>
                                    </PieBlock>
                                ))}
                        </GraphBlock>
                    </>}
            </GraphsContainer>
        </Container>
    );
}
export default CpuMemPage;

const Container = styled.div`
    gap: 10px;
    flex-direction: column;
    position: absolute;
`

const GraphsContainer = styled.div`
    width: calc(100vw - 220px);
    margin: 80px 0;
    margin-left: 200px;
    position: relative;

    flex-direction: column;
    justify-content: flex-start;

    color: #021121;
    overflow-y: hidden;
    overflow-x: hidden;
    h2{
        margin-bottom: 20px;
    }
`

const GraphBlock = styled.div`
    width: 95%;
    gap: 10px;
    flex-wrap: wrap;
    margin: 20px;
    margin-bottom: 40px;
    
    div{
        width: 10%;
        flex-direction: column;
        height: 250px;
        justify-content: flex-start;
    }

`

const PieBlock = styled.div`
    border: 1px solid #555;
    flex-direction: column;
    height: 300px;
    justify-content: flex-start;
    z-index: 3;
    gap: 7px;
    button {
        font-size: 15px;
    }
`