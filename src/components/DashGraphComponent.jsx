import styled from 'styled-components';
import BarGraphComponent from './BarGraphComponent';
import LineGraphComponent from './LineGraphComponent';
import PieGraphComponent from './PieGraphComponent';
import CreditPredictionChartComponent from './CreditPredictionChartComponent';

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
          { categoria: "Compute", valor: 1200 },
          { categoria: "Storage", valor: 800 },
          { categoria: "Database", valor: 1700 },
          { categoria: "Networking", valor: 400 },
          { categoria: "Monitoring", valor: 600 }
        ]
    };
    
    console.log(tenancyInfo?.creditsOCI);
    return (
        <Container>
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
                <PieGraphComponent data={dadosServicosOCI.data} nome={"Porcentagem Gastos Por Tipo De Serviço OCI"}/>
                {tenancyInfo?.top5_costVM &&
                    <BarGraphComponent data={tenancyInfo.top5_costVM.map((d) => ({
                        categoria: d.display_name,
                        valor: parseFloat(d.dailyCost.toFixed(2)),
                        tenancy: d.tenancy_name
                    }))} nome={"Top 5 Máquinas Mais Caras (Custo Diário)"} />
                }
            </GraphsContainer>
            {tenancyInfo?.tenancies?.length === 1 &&
                <GraphsContainer>
                    <CreditPredictionChartComponent creditsOCI={tenancyInfo.creditsOCI} />
                    {tenancyInfo?.creditsOCI &&
                        <PieGraphComponent
                            data={tenancyInfo.creditsOCI.flatMap((d) => ([
                                
                                { categoria: "Crédito Utilizado", valor: d.used_amount },
                                { categoria: "Crédito Total", valor: d.available_amount }
                            ]))}
                            nome={"Porcentagem Créditos Gastos"}
                            type={"currency"}
                        />
                    }
                    {tenancyInfo?.top5_costVM &&
                        <BarGraphComponent data={tenancyInfo.top5_costVM.map((d) => ({
                            categoria: d.display_name,
                            valor: parseFloat(d.dailyCost.toFixed(2)),
                            tenancy: d.tenancy_name
                        }))} nome={"Top 5 Máquinas Mais Caras (Custo Diário)"} />
                    }
                </GraphsContainer>
            }
        </Container>
    );
}
export default DashGraphComponent;

const Container = styled.div`
    gap: 10px;
    flex-direction: column;
`
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