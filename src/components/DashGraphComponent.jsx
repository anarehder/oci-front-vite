import styled from 'styled-components';
import BarGraphComponent from './graphsComponents/BarGraphComponent';
import PieGraphComponent from './graphsComponents/PieGraphComponent';
import CreditPredictionChartComponent from './graphsComponents/CreditPredictionChartComponent';
import MonthCostsGraphComponent from './graphsComponents/MonthCostsGraphComponent';
import LineGraphComponent from './graphsComponents/LineGraphComponent';

function DashGraphComponent({tenancyInfo}) {
    console.log(tenancyInfo);

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
                <DiscosOrfaos><div>Discos Orfãos: {tenancyInfo?.orphan?.filter(item => item.is_orfao === "Y").length}</div><div>Detalhes</div></DiscosOrfaos>
            </BlocksContainer>
            <GraphsContainer>
                {tenancyInfo?.cost_SKU &&
                    <BarGraphComponent data={tenancyInfo.cost_SKU
                        .sort((a, b) => b.cost_mes - a.cost_mes)  // ordena do maior para o menor
                        .slice(0, 5)
                        .map((d) => ({
                            categoria: d.sku_name.slice(0,12),
                            valor: parseFloat(d.cost_mes.toFixed(2)),
                        tenancy: d.tenancy_name
                    }))} nome={"Top 5 SKUs Mais Caros"} />
                }
                <PieGraphComponent data={tenancyInfo.cost_services
                        .map((d) => ({
                            categoria: d.service,
                            valor: parseFloat(d.cost_mes.toFixed(2)),
                    }))} nome={"Porcentagem Gastos Por Tipo De Serviço OCI"}/>
                {tenancyInfo?.top5_costVM &&
                    <BarGraphComponent data={tenancyInfo.top5_costVM.map((d) => ({
                        categoria: d.display_name,
                        valor: parseFloat(d.monthly_cost.toFixed(2)),
                        tenancy: d.tenancy_name
                    }))} nome={"Top 5 Máquinas Mais Caras"} />
                }
            </GraphsContainer>
            {tenancyInfo?.tenancies?.length === 1 &&
                <GraphsContainer>
                    <CreditPredictionChartComponent creditsOCI={tenancyInfo.creditsOCI} />
                    {tenancyInfo?.creditsOCI &&
                        <PieGraphComponent
                            data={tenancyInfo.creditsOCI.flatMap((d) => ([

                                { categoria: "Crédito Utilizado", valor: parseFloat(d.used_amount.toFixed(2)) },
                                { categoria: "Crédito Total", valor: parseFloat(d.available_amount.toFixed(2)) }
                            ]))}
                            nome={"Porcentagem Créditos Gastos"}
                            type={"currency"}
                        />
                    }
                    <MonthCostsGraphComponent data={tenancyInfo.cost_history
                        .map((d) => ({
                            item: d.mes,
                            valor: parseFloat(d.cost_mes.toFixed(2)),
                            nome: d.tenancy_name
                    }))} nome={"Gastos Mensais"}/>
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