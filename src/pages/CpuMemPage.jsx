import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import apiServiceOCI from '../services/apiServiceOCI';
import { UserContext } from '../contexts/UserContext';
import RadialBarComponent from '../components/graphsComponents/RadialBarComponent';
import FixedMenuComponent from '../components/fixedComponents/FixedMenuComponent';
import HeaderComponent from '../components/fixedComponents/HeaderComponent';
import { Link } from 'react-router-dom';
import LiquidFillChart from '../components/graphsComponents/LiquidFillChartComponent';
import { useMenu } from '../contexts/MenuContext';

function CpuMemPage() {
    const { show } = useMenu();
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
                    setCpu(response.data.topCPU);
                    setMemory(response.data.topMEM);
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
            <RightContainer>
                <MenuBackground $show={show ? "exibir" : "ocultar"}>
                    teste
                </MenuBackground>
                <GraphsContainer>
                    <>
                        {carregando && cpu.length === 0 && <h2>"Carregando dados..."</h2>}
                        {!carregando && cpu.length !== 0 &&
                            <>
                                <h2>TOP 8 - USO CPU</h2>
                                <GraphBlock>
                                    {cpu
                                        .slice(0, 8)
                                        .map((c) => (
                                            <PieBlock key={c.displayName}>
                                                <div>CPU</div>
                                                <LiquidFillChart value={c.cpu} size={70} />
                                                <div>MEM</div>
                                                <LiquidFillChart value={c.mem} size={70} />
                                                <div>
                                                    <p>{c.displayName.length > 10
                                                        ? `${c.displayName.slice(0, 10)}...`
                                                        : c.displayName}</p>
                                                    <p>{c.profile_name}</p>
                                                    <button> <Link to={`/compute/details/${encodeURIComponent(c.displayName)}`}>Detalhes </Link> </button>
                                                </div>

                                            </PieBlock>
                                        ))}
                                </GraphBlock>
                            </>
                        }
                        {!carregando && memory.length !== 0 &&
                            <>
                                <h2>TOP 8 - USO MEMÓRIA</h2>
                                <GraphBlock>
                                    {memory
                                        .slice(0, 8)
                                        .map((c) => (
                                            <PieBlock key={c.displayName}>
                                                <div>CPU</div>
                                                <LiquidFillChart value={c.cpu} size={70} />
                                                <div>MEM</div>
                                                <LiquidFillChart value={c.mem} size={70} />
                                                <div>
                                                    <p>{c.displayName.length > 10
                                                        ? `${c.displayName.slice(0, 10)}...`
                                                        : c.displayName}</p>
                                                    <p>{c.profile_name}</p>
                                                    <button> <Link to={`/compute/details/${encodeURIComponent(c.displayName)}`}>Detalhes </Link> </button>
                                                </div>

                                            </PieBlock>
                                        ))}
                                </GraphBlock>
                            </>
                        }
                    </>
                </GraphsContainer>
            </RightContainer>

        </Container>
    );
}
export default CpuMemPage;

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    flex-direction: column;
`

const RightContainer = styled.div`
    // width: 100%;
    width: ${({ $show }) => ($show === "exibir" ? "calc(100% - 221px)" : "calc(100% -30px)")};
    z-index: 1;
    display: flex;
    margin-top: 90px;
    justify-content: flex-start;
`

const MenuBackground = styled.div`
    width: ${({ $show }) => ($show === "exibir" ? "221px" : "30px")};
    height: 100%;
    z-index: 1500;
`

const GraphsContainer = styled.div`
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    flex-wrap: wrap;

    color: #021121;
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
        width: 10%;
        flex-direction: column;
    }

`

const PieBlock = styled.div`
    height: 250px;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    z-index: 3;
    div{ 
        width: 100%;
        gap: 2px;
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