import styled from 'styled-components';
import BarGraphComponent from './graphsComponents/BarGraphComponent';
import PieGraphComponent from './graphsComponents/PieGraphComponent';
import CreditPredictionChartComponent from './graphsComponents/CreditPredictionChartComponent';
import PieGraphCommitComponent from './graphsComponents/PieGraphCommitComponent'
import MonthCostsGraphComponent from './graphsComponents/MonthCostsGraphComponent';
import { useFilter } from '../contexts/FilterContext';
import { Link } from 'react-router-dom';
import CreditPredictionSubsComponent from './graphsComponents/CreditPredictionSubsComponent';
import PieGraphSubsComponent from './graphsComponents/PieGraphSubsComponent';

function DashGraphComponent({tenancyInfo, scrollToSection, selectedMonth}) {
    console.log(tenancyInfo.subscriptionDetails);
    const { setSearchTerm } = useFilter();
    return (
        <Container>
            
            <BlocksContainer>
                <Users>
                    <div>Usuarios da Conta: X</div>
                    <div>Detalhes</div>
                </Users>
                {tenancyInfo?.computeInstances &&
                    <>
                        <VMsOFF><div>VMs Desligadas: {tenancyInfo?.computeInstances?.filter(item => item.lifecycle_state === "STOPPED").length}</div><div onClick={()=>setSearchTerm('STOPPED')}><Link to='/computeinstances'> Detalhes </Link></div></VMsOFF>
                        <VMsON><div>VMs Ligadas: {tenancyInfo?.computeInstances?.filter(item => item.lifecycle_state === "RUNNING").length}</div><div onClick={()=>setSearchTerm('RUNNING')}><Link to='/computeinstances'>Detalhes</Link></div></VMsON>
                    </>
                }
                <DiscosOrfaos>
                    <div>
                        Discos Orfãos: {tenancyInfo?.orphan?.filter(item => item.is_orfao === "Y").length}
                    </div>
                    <div onClick={scrollToSection}>
                        Detalhes
                    </div>
                    {/* <button ></button> */}
                </DiscosOrfaos>
            </BlocksContainer>
            <GraphsContainer>
                {tenancyInfo?.cost_SKU &&
                    <BarGraphComponent data={tenancyInfo.cost_SKU
                        .slice(0, 5)
                        .map((d) => ({
                            categoria: d.sku_name,
                            valor: parseFloat(d._sum?.cost_mes?.toFixed(2))
                        }))} nome={`Top 5 SKUs Mais Caros - ${selectedMonth.slice(5)}/${selectedMonth.slice(0, 4)}`} />
                }
                {tenancyInfo?.cost_services &&
                    <PieGraphComponent data={tenancyInfo.cost_services
                        .map((d) => ({
                            categoria: d.service,
                            valor: parseFloat(d._sum?.cost_mes?.toFixed(2)),
                        }))} nome={`Top 5 Gastos Por Tipo De Serviço OCI - ${selectedMonth.slice(5)}/${selectedMonth.slice(0, 4)}`} />
                }
                {tenancyInfo?.top5_costVM &&
                    <BarGraphComponent data={tenancyInfo.top5_costVM.map((d) => ({
                        categoria: d.display_name,
                        valor: parseFloat(d.monthly_cost?.toFixed(2)),
                        tenancy: d.tenancy_name
                    }))} nome={"Top 5 Máquinas Mais Caras (Custo Mensal)"} />
                }
                {tenancyInfo?.tenancies?.length === 1 && tenancyInfo.subscriptionDetails &&
                            <>
                                <CreditPredictionSubsComponent subsDetails={tenancyInfo.subscriptionDetails} />
                                <PieGraphSubsComponent subsDetails={tenancyInfo.subscriptionDetails} />
                                <MonthCostsGraphComponent data={tenancyInfo.cost_history.slice(-6)}
                        subscriptionDetails={tenancyInfo.subscriptionDetails[0]} />
                            </>
                    
                 }
                {tenancyInfo?.tenancies?.length === 1 && tenancyInfo.subscriptionDetails && tenancyInfo.commitDetails &&
                        <>
                            <CreditPredictionChartComponent subsDetails={tenancyInfo.subscriptionDetails} commitDetails={tenancyInfo.commitDetails} />
                            <PieGraphCommitComponent subsDetails={tenancyInfo.subscriptionDetails} commitDetails={tenancyInfo.commitDetails} />
                        </>
                }
            </GraphsContainer>
        </Container>
    );
}
export default DashGraphComponent;

const Container = styled.div`
    gap: 10px;
    flex-direction: column;
`
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
    :nth-child(2) {
        cursor: pointer;
    }
`
const VMsON = styled.div `
    background-color: #27A745;
    :nth-child(2) {
        cursor: pointer;
    }
`
const DiscosOrfaos = styled.div `
    background-color: #DC3544;
    :nth-child(2) {
        cursor: pointer;
    }
`
const GraphsContainer = styled.div `
    width: 95%;
    justify-content: space-between;
    flex-wrap: wrap;
`