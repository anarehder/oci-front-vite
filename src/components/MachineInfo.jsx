import styled from 'styled-components';
import { useEffect, useState } from 'react';
import reshapeService from '../services/reshapeService';
import calculatePricesService from '../services/calculatePricesService';
import RadialBarComponent from './RadialBar';
import { IoMdOptions } from "react-icons/io";

function MachineInfo({machine}) {
    const bestShape = 'VM.Standard.E5.Flex';
    const [newMEM, setNewMEM] = useState(machine.MEMORY_GB);
    const [newOCPU, setNewOCPU] = useState(machine.OCPU);

    useEffect(()=>{
        if (machine.last30.reshape !== "-"){
            const new_Memory = reshapeService.estimateReshapeMEMValues(machine.last30.reshape, machine.MEMORY_GB, machine.last30.MaxMEM, machine.last30.MeanMEM);
            setNewMEM(new_Memory.newMEM);
            
            const new_OCPU = reshapeService.estimateReshapeCPUValues(machine.last30.reshape, machine.OCPU, machine.last30.MaxCPU, machine.last30.MeanCPU);
            setNewOCPU(new_OCPU.newOCPU);         
        }
    },[machine.last30.reshape, machine.MEMORY_GB, machine.last30.MaxMEM, machine.last30.MeanMEM, machine.OCPU, machine.last30.MaxCPU, machine.last30.MeanCPU])

    return (
        <>
        <CompartmentInfo>
            {(machine.Shape === bestShape)  &&
                <BotaoBestShape>
                    BEST SHAPE!
                </BotaoBestShape>
            }
            {(!machine.Shape?.includes('Flex') && machine.Custo_Atual_de_Maquina_24x7 !== "0.0") &&
                <BotaoRecreation>
                    RECREATE!
                </BotaoRecreation>
            }
            <h1>
                {machine.Name}
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
                    <h3> {machine.Armazenamento_GB} </h3>
                </div>
            </Info> 
            <OCPU_MEM>
                <h1>OCPU: {machine.OCPU}</h1>
                <h2>Sugestão: {newOCPU} {Number(newOCPU) !== Number(machine.OCPU) &&
                    <IoMdOptions  size={30} />}
                </h2>
                <div>
                    <RadialBarComponent value = {machine.last30.MeanCPU} name = {'MeanCPU'} />
                    <RadialBarComponent value = {machine.last30.MaxCPU} name = {'MaxCPU'} />
                </div>
            </OCPU_MEM>
            <OCPU_MEM>
                <h1>MEMORY: {machine.MEMORY_GB} GB</h1>
                <h2>Sugestão: {newMEM} GB {Number(newMEM) !== Number(machine.MEMORY_GB) &&
                    <IoMdOptions  size={30} />}
                </h2>
                <div>
                    <RadialBarComponent value = {machine.last30.MeanMEM} name = {'MeanMEM'} />
                    <RadialBarComponent value = {machine.last30.MaxMEM} name = {'MaxMEM'} />
                </div>
            </OCPU_MEM>
            <Prices>
                <ShapeInfo>
                    <h1>CUSTOS ATUAIS</h1>
                    <h2>Maquina(24x7): R$ {machine.Custo_Atual_de_Maquina_24x7}</h2>
                    <h2>OS(24x7): R$ {machine.Custo_Atual_de_OS_24x7}</h2>
                    <h2>Disco: R$ {machine.Custo_de_Disco}</h2>
                </ShapeInfo>
                <ShapeInfo>
                    <h1>OPERAÇÕES DISPONÍVEIS</h1>
                    {(machine.last30.reshape !== "-" && machine.Custo_Atual_de_Maquina_24x7 !== '0.0') ?
                    <>
                        <div>
                            <h2>Shape Atual ({machine.Shape}): {(((calculatePricesService.estimatePrice(machine.Shape, newMEM !== "-" ? newMEM : machine.MEMORY_GB, newOCPU !== "-" ? newOCPU :machine.OCPU) / machine.Custo_Atual_de_Maquina_24x7)-1)*100).toFixed(2) } %</h2>
                            {(Number(newMEM) !== Number(machine.MEMORY_GB) || Number(newOCPU) !== Number(machine.OCPU)) &&
                                <button>
                                    Resizing
                                </button>
                            }
                        </div>
                        
                        {machine.Shape !== bestShape &&
                        <div>
                            <h2>Alteração Shape (Shape E5.Flex): {(((calculatePricesService.estimatePrice(bestShape, newMEM !== "-" ? newMEM : machine.MEMORY_GB, newOCPU !== "-" ? newOCPU :machine.OCPU) / machine.Custo_Atual_de_Maquina_24x7)-1)*100).toFixed(2)} %</h2> 
                            <button>
                                Reshape
                            </button>
                        </div>}
                    </> : machine.Custo_Atual_de_Maquina_24x7 !== '0.0' ?
                    <div>
                        <h2>Alteração Shape (Shape E5.Flex): {(((calculatePricesService.estimatePrice(bestShape, newMEM !== "-" ? newMEM : machine.MEMORY_GB, newOCPU !== "-" ? newOCPU :machine.OCPU) / machine.Custo_Atual_de_Maquina_24x7)-1)*100).toFixed(2)} %</h2>
                        {(Number(newMEM) !== Number(machine.MEMORY_GB) || Number(newOCPU) !== Number(machine.OCPU)) &&
                            <button>
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
    height: 275px;
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
    max-width: 30%;
    gap: 10px;
    flex-wrap: wrap;
    height: 275px;
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
        font-size: 20px;
        margin-top: 10px;
    }
    div {
        max-width: 90%;
        margin: 2px 0;
        margin-right: 30px !important;
        justify-content: space-between;
    }
    button{
        heigth: 20px;
        padding: 5px !important;
        background-color: green;
    }
`
