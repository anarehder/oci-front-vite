import styled from 'styled-components';
import RadialBarComponent from './RadialBar';
import { IoMdOptions } from "react-icons/io";

function MachineInfo({machine}) {
    const bestShape = 'VM.Standard.E5.Flex';
    const percentageBestShape = ((machine.last30.BestShapePrice/machine.MonthlyMachinePrice)-1)*100;
    const percentageResize = ((machine.last30.newPrice/machine.MonthlyMachinePrice)-1)*100;
    function handleOperation(name){
        alert(`Operação selecionada ${name}`);
    }
    console.log(machine.last30);
    return (
        <>
        <CompartmentInfo>
            {(machine.Shape === bestShape)  &&
                <BotaoBestShape>
                    BEST SHAPE!
                </BotaoBestShape>
            }
            {(!machine.Shape?.includes('Flex') && machine.MonthlyMachinePrice !== "0.0") &&
                <BotaoRecreation>
                    RECREATE!
                </BotaoRecreation>
            }
            <h1>
                {machine.VM_Name}  
                <h2>
                ({machine.last30?.DaysCount} dias analisados / último dia coletado {machine.Day.slice(-2)}/{machine.Day.slice(5,7)})
                </h2>
            </h1>
            <Info>
                <div>
                    <h2>Compartment</h2>
                    <h3> {machine.Compartment} </h3>
                </div>
                <div>
                    <h2>Shape</h2>
                    <h3> {machine.Shape} </h3>
                </div>
                <div>
                    <h2>Instance</h2>
                    <h3> {machine.AD} </h3>
                </div>
                <div>
                    <h2>OCID</h2>
                    <h3> {machine.OCID} </h3>
                </div>
                <div>
                    <h2>Status</h2>
                    <h3> {machine.Status} </h3>
                </div>
                <div>
                    <h2>OS</h2>
                    <h3> {machine.OS} </h3>
                </div>
                <div>
                    <h2>Armazenamento(GB)</h2>
                    <h3> {machine.Storage} </h3>
                </div>
            </Info> 
            <OCPU_MEM>
                <h1>OCPU: {machine.OCPU}</h1>
                <h2>Sugestão: {machine.last30.newOCPU} {Number(machine.last30.newOCPU) !== Number(machine.OCPU) &&
                    <IoMdOptions  size={30} />}
                </h2>
                <div>
                    <RadialBarComponent value = {machine.last30.MeanOCPU} name = {'MeanOCPU'} />
                    <RadialBarComponent value = {machine.last30.MaxOCPU} name = {'MaxOCPU'} />
                </div>
            </OCPU_MEM>
            <OCPU_MEM>
                <h1>MEMORY: {machine.Memory} GB</h1>
                <h2>Sugestão: {machine.last30.newMEM} GB {Number(machine.last30.newMEM) !== Number(machine.Memory) &&
                    <IoMdOptions  size={30} />}
                </h2>
                <div>
                    <RadialBarComponent value = {machine.last30.MeanMEM} name = {'MeanMEM'} />
                    <RadialBarComponent value = {machine.last30.MaxMEM} name = {'MaxMEM'} />
                </div>
            </OCPU_MEM>
            <Prices>
                <ShapeInfo>
                    <PricesTitle>CUSTOS ATUAIS - TABELA ORACLE</PricesTitle>
                    <h2>Maquina(24x7): R$ {machine.MonthlyMachinePrice}</h2>
                    {/* <h2>OS(24x7): R$ {machine.MonthlyOSPrice}</h2>
                    <h2>Disco: R$ {machine.MonthlyOSPrice}</h2> */}
                </ShapeInfo>
                <ShapeInfo>
                    <PricesTitle>OPERAÇÕES DISPONÍVEIS</PricesTitle>
                    {(machine.last30.reshape !== "-" && machine.MonthlyMachinePrice !== '0.0') ?
                    <>
                                <Operations>
                                    <div>
                                        <h2>Redimensionar</h2>
                                        <h2>({machine.Shape})</h2>
                                    </div>
                                    <div>
                                        <h2>{percentageResize.toFixed(2)} % </h2>
                                    </div>
                                        {(Number(machine.newMEM) !== Number(machine.Memory) || Number(machine.newOCPU) !== Number(machine.OCPU)) &&
                                            <button onClick={() => handleOperation("Resizing")}>
                                                Resizing
                                            </button>
                                        }
                                </Operations>
                                                
                        {machine.Shape !== bestShape &&
                        <Operations>
                            <div>
                            <h2>Alterar Shape </h2>
                            <h2>({bestShape})</h2>
                            </div>
                            <div>
                                <h2>
                                {percentageBestShape.toFixed(2)}%
                                </h2>
                            
                                </div>
                            <button onClick={()=>handleOperation("Reshape")}>
                                Reshape
                            </button>
                        </Operations>}
                        
                    </> 
                    : machine.MonthlyMachinePrice !== '0.0' ?
                    <div>
                        <h2>Alterar Shape ({bestShape}): R$ {machine.last30.BestShapePrice.toFixed(2)} / {percentageBestShape.toFixed(2)}%</h2>
                        {(Number(machine.newMEM) !== Number(machine.Memory) || Number(machine.newOCPU) !== Number(machine.OCPU)) &&
                            <button onClick={()=>handleOperation("Reshape")}>
                                Reshape
                            </button>
                        } 
                        
                    </div>
                    :
                    <div>
                        <h2>Custo Zerado</h2> 
                    </div> 
                    }                   
                </ShapeInfo>
            </Prices>
        </CompartmentInfo>
    </>
    )
}

export default MachineInfo;

const CompartmentInfo = styled.div`
    padding: 10px 0;
    max-width: 98%;
    gap: 15px;
    flex-wrap: wrap;
    border: 2px solid white;
    position: relative;
    z-index:0;
    justify-content: center;
    color: #021121;
    h2{
        margin-top: 4px;
    }
`
const BotaoBestShape = styled.button`
    background-color: green;
    position: absolute;
    top: 55%;
    left: 87%;
    z-index:2;
`
const BotaoRecreation = styled.button`
    background-color: red;
    position: absolute;
    top: 40%;
    left: 87%;
    z-index:2;
`
const Info = styled.div`
    gap:5px;
    margin-top: 5px;
    :nth-child(4){
        flex: 2;
    }
    div {
        margin: 0 5px;
        flex: 1;
        flex-direction: column;
        gap: 15px;
        h3{
            word-break: break-all;
        }
    }
    
`
const OCPU_MEM = styled.div`
    flex-direction: column;
    max-width: 30%;
    border: 1px solid gray;
    height: 300px;
    div {
        margin-top: 5px;
    }
    h2 {
        min-height: 40px;
        align-items: center;
        justify-content: center;
        display: flex;
        gap: 20px;
    }
`
const Prices = styled.div`
    flex-direction: column;
    max-width: 35%;
    gap: 30px;
    flex-wrap: wrap;
    height: 300px;
    border: 1px solid gray;
    padding-left: 10px;
`

const ShapeInfo = styled.div`
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    h1 {
        font-size: 25px;
        border-bottom: 1px solid gray;
    }
    h2 {
        margin-top: 10px;
        font-size: 20px;
    }
`
const Operations = styled.div`
    height: 75px;
    width: 500px;
    gap: 25px;
    justify-content: flex-start;
    div {
    background-color: red;}
    div:nth-child(1) {
        flex-direction: column;
        align-items: flex-start;
        width: 225px;
    }
    div:nth-child(2) {
        flex-direction: column;
        width: 100px;
    }
    button{
        margin: 0;
        padding: 0;
        height: 45px;
        width: 125px;
        background-color: green;
        justify-content: center;
    }    
`

const PricesTitle = styled.h1`
    font-size: 25px;
    border-bottom: 1px solid gray;
`