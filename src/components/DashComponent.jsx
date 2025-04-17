import styled from 'styled-components';
import BarGraphComponent from './BarGraphComponent';
import LineGraphComponent from './LineGraphComponent';
import PieGraphComponent from './PieGraphComponent';
import { useContext, useEffect, useState } from 'react';
import apiServiceOCI from '../services/apiServiceOCI';
import { UserContext } from '../contexts/UserContext';

function DashComponent() {
    const [user] = useContext(UserContext);
    const [allTenanciesInfo, setAllTenanciesInfo] = useState(null);
    const [compiledTenanciesInfo, setCompiledTenanciesInfo] = useState('');
    const [oneTenancyInfo, setOneTenancyIndo] = useState('');
    // console.log(user);
    console.log(allTenanciesInfo);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiServiceOCI.getDash(user.token);
                if (response.status === 200) {
                    setAllTenanciesInfo(response.data);
                }
            } catch (error) {
                console.log(error);
                alert("Ocorreu um erro", error);
            }
        };
        fetchData();
    }, []);

    const dadosHistorico = {
        nome: "Histórico de Consumo (Custo Total)",
        data: [
            { item: "Nov", valor: 3120 },
            { item: "Dez", valor: 2870 },
            { item: "Jan", valor: 1980 },
            { item: "Fev", valor: 4010 },
            { item: "Mar", valor: 2660 },
            { item: "Abr", valor: 3590 }
        ]
    };
    const dadosTopMaquinas = {
        nome: "Top 5 Máquinas Mais Caras (Custo Diário)",
        data: [
          { display_name: "VM1", dailyCost: 275 },
          { display_name: "VM2", dailyCost: 130 },
          { display_name: "VM3", dailyCost: 90 },
          { display_name: "VM4", dailyCost: 300 },
          { display_name: "VM5", dailyCost: 210 }
        ]
    };

    const dadosServicosOCI = {
        nome: "Distribuição de Tipos de Serviço do OCI",
        data: [
          { item: "Compute", valor: 1200 },
          { item: "Storage", valor: 800 },
          { item: "Database", valor: 1700 },
          { item: "Networking", valor: 400 },
          { item: "Monitoring", valor: 600 }
        ]
    };
      
    return (
        <ComponentContainer>
                <BlocksContainer>
                    <Users>
                        <div>Usuarios da Conta: 10</div>
                        <div>Detalhes</div>
                    </Users>
                    <VMsOFF><div>VMs Desligadas: 7</div><div>Detalhes</div></VMsOFF>
                    <VMsON><div>VMs Ligadas: 25</div><div>Detalhes</div></VMsON>
                    <DiscosOrfaos><div>Discos Orfãos: 2</div><div>Detalhes</div></DiscosOrfaos>
                </BlocksContainer>
                <GraphsContainer>
                    <LineGraphComponent data={dadosHistorico} />
                <PieGraphComponent data={dadosServicosOCI} />
                {allTenanciesInfo?.top5_costVM &&
                    <BarGraphComponent data = {allTenanciesInfo.top5_costVM.map((d) => ({
                        categoria: d.display_name,
                        valor: parseFloat(d.dailyCost.toFixed(2)),
                        tenancy: d.tenancy_name
                      }))} nome={"Top 5 Máquinas Mais Caras (Custo Diário)"} />
                }
                {/* <BarGraphComponent categorias={allTenanciesInfo.top5_costVM.map((d) => d.display_name)} valores={allTenanciesInfo.top5_costVM.map((d) => d.dailyCost)} /> */}
            </GraphsContainer>
            </ComponentContainer>
        // {allTenanciesInfo ?
        //     <div> Info OK </div>
        //     :
        //     <div> Carregando ...</div>
        // }
    );
}
export default DashComponent;

const ComponentContainer = styled.div`
    width: calc(100vw - 220px);
    margin-left: 200px;
    margin-top: 150px;

    flex-direction: column;
    justify-content: flex-start;
    gap: 30px;

    color: #021121;
    overflow-y: auto;
    overflow-x: hidden;
`;



const BlocksContainer = styled.div `
    width: 100%;
    justify-content: space-between;
    div{
        border-radius: 15px;
        height: 100px;
        width: 22%;
        color: white;
        margin: 0 auto;
        flex-direction: column;
        justify-content: space-around;
        font-size: 20px;
        div { 
            width: 100%;
            box-shadow: inset 0 -2px 3px rgba(255, 255, 255, 0.2);
        }
    }
`

const Users = styled.div `
    background-color: #017BFF;
`
const VMsOFF = styled.div `
    background-color: #FFC207;
`
const VMsON = styled.div `
    background-color: #27A745;
`
const DiscosOrfaos = styled.div `
    background-color: #DC3544;
`
const GraphsContainer = styled.div `
    width: 95%;
`