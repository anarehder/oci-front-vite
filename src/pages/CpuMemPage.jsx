import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import apiServiceOCI from '../services/apiServiceOCI';
import { UserContext } from '../contexts/UserContext';
import RadialBarComponent from '../components/graphsComponents/RadialBarComponent';
import FixedMenuComponent from '../components/fixedComponents/FixedMenuComponent';
import HeaderComponent from '../components/fixedComponents/HeaderComponent';
import { Link } from 'react-router-dom';
import LiquidFillChart from '../components/graphsComponents/LiquidFillChartComponent';

function CpuMemPage() {
    const [memory, setMemory] = useState([]);
    const [cpu, setCpu] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [user] = useContext(UserContext);
    // console.log(cpu[0]);
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
            <HeaderComponent title={"CPU E MEMÓRIA"} />
            <GraphsContainer>
                <GraphBlock>
                    <h2>
                        {carregando && cpu.length === 0 && "Carregando dados..."}
                    </h2>
                </GraphBlock>
                {cpu.length > 0 && memory.length > 0 &&
                <>
                <h2>TOP 8 - USO CPU</h2>
                        <GraphBlock>
                            {cpu
                                .slice(0, 8)
                                .map((c) => (
                                    < PieBlock key={c.resourceDisplayName}>
                                        <LiquidFillChart value={c.cpu_usage} size={120}/>
                                        {/* <RadialBarComponent value={c.cpu_usage} /> */}
                                        <p>{c.resourceDisplayName.length > 15
                                            ? `${c.resourceDisplayName.slice(0, 15)}...`
                                            : c.resourceDisplayName}</p>
                                        <p>{c.profile_name}</p>
                                        <button> <Link to={`/compute/details/${encodeURIComponent(c.resourceDisplayName)}`}>Detalhes </Link> </button>
                                    </PieBlock>
                                ))}
                    </GraphBlock>
                    <h2>TOP 8 - USO MEMÓRIA</h2>
                    <GraphBlock>
                        {memory
                            .slice(0, 8)
                            .map((c) => (
                                <PieBlock key={c.resourceDisplayName}>
                                    <LiquidFillChart value={c.memory_usage} size={120}/>
                                    {/* <RadialBarComponent value={c.memory_usage} /> */}
                                    <div>
                                        <p>{c.resourceDisplayName.length > 15
                                            ? `${c.resourceDisplayName.slice(0, 15)}...`
                                            : c.resourceDisplayName}</p>
                                        <p>{c.profile_name}</p>
                                        <button> <Link to={`/compute/details/${encodeURIComponent(c.resourceDisplayName)}`}>Detalhes </Link> </button>
                                    </div>

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
    margin-left: 200px;
    position: relative;

    flex-direction: column;
    justify-content: flex-start;

    color: #021121;
    overflow-y: hidden;
    overflow-x: hidden;
    h2{
        margin: 10px 0;
    }
`

const GraphBlock = styled.div`
    width: 95%;
    gap: 1%;
    flex-wrap: wrap;
    margin: 20px;
    margin-bottom: 40px;
    
    div{
        width: 11%;
        flex-direction: column;
    }

`

const PieBlock = styled.div`
    flex-direction: column;
    height: 200px;
    justify-content: space-between;
    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    z-index: 3;
    div{ 
        width: 100%;
        gap: 5px;
    }
    button {
        font-size: 15px;
        height: 15px;
        margin-bottom: 5px;
    }
    p{
        font-size: 14px;
    }
`