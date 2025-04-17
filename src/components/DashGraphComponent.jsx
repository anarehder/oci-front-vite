import styled from 'styled-components';
import BarGraphComponent from './BarGraphComponent';
import LineGraphComponent from './LineGraphComponent';
import PieGraphComponent from './PieGraphComponent';

function DashGraphComponent({tenancyInfo}) {
    console.log(tenancyInfo)
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
        <>
            <BlocksContainer>
                <Users>
                    <div>Usuarios da Conta: X</div>
                    <div>Detalhes</div>
                </Users>
                {tenancyInfo?.computeInstances &&
                    <>
                        <VMsOFF><div>VMs Desligadas: {tenancyInfo?.computeInstances?.filter(item => item.lifecycle_state === "STOPPED").length}</div><div>Detalhes</div></VMsOFF>
                        <VMsON><div>VMs Ligadas: {tenancyInfo?.computeInstances?.filter(item => item.lifecycle_state === "RUNNING").length}</div><div>Detalhes</div></VMsON>
                    </>
                }
                <DiscosOrfaos><div>Discos Orfãos: Y</div><div>Detalhes</div></DiscosOrfaos>
            </BlocksContainer>
            <GraphsContainer>
                <LineGraphComponent data={dadosHistorico} />
                <PieGraphComponent data={dadosServicosOCI} />
                {tenancyInfo?.top5_costVM &&
                    <BarGraphComponent data={tenancyInfo.top5_costVM.map((d) => ({
                        categoria: d.display_name,
                        valor: parseFloat(d.dailyCost.toFixed(2)),
                        tenancy: d.tenancy_name
                    }))} nome={"Top 5 Máquinas Mais Caras (Custo Diário)"} />
                }
            </GraphsContainer>
        </>
    );
}
export default DashGraphComponent;

const BlocksContainer = styled.div `
    width: 97%;
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