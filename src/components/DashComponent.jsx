import styled from 'styled-components';
import BarGraphComponent from './BarGraphComponent';
import LineGraphComponent from './LineGraphComponent';
import PieGraphComponent from './PieGraphComponent';

function DashComponent() {
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
          { item: "VM1", valor: 275 },
          { item: "VM2", valor: 130 },
          { item: "VM3", valor: 90 },
          { item: "VM4", valor: 300 },
          { item: "VM5", valor: 210 }
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
                <BarGraphComponent data={dadosTopMaquinas} />
            </GraphsContainer>
            
        </ComponentContainer>
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
    width: 95%;
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