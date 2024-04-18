import styled from 'styled-components';
import RadialBarComponent from './RadialBar';
import { useEffect, useState } from 'react';
import reshapeService from '../services/reshapeService';

function MachineInfo({machine}) {
    const [newMEM, setNewMEM] = useState("-");
    const [newOCPU, setNewOCPU] = useState("-");

    useEffect(()=>{
        if (machine.reshape !== "-"){
            const newMemory = reshapeService.estimateReshapeMEMValues(machine.reshape, machine.MEMORY_GB, machine.MaxMEM, machine.MeanMEM);
            setNewMEM(newMemory.newMEM)
        }
        if (machine.reshape !== "-"){
            const new_OCPU = reshapeService.estimateReshapeCPUValues(machine.reshape, machine.OCPU, machine.MaxCPU, machine.MeanCPU);
            setNewOCPU(new_OCPU.newOCPU)
        }
    },[machine.reshape, machine.MEMORY_GB, machine.MaxMEM, machine.MeanMEM, machine.OCPU, machine.MaxCPU, machine.MeanCPU])
    
    return (
        <>
        <CompartmentInfo>
            {(machine.reshape !== "-")  &&
            <BotaoReshape>
                RESHAPE!
            </BotaoReshape>
            }
            <h1>
                {machine.Name} {machine.reshape}
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
                <h2>Sugestão newOCPU: {newOCPU} </h2>
                <div>
                    <RadialBarComponent value = {machine.MeanCPU} name = {'MeanCPU'} />
                    <RadialBarComponent value = {machine.MaxCPU} name = {'MaxCPU'} />
                </div>
            </OCPU_MEM>
            <OCPU_MEM>
                <h1>MEMORY: {machine.MEMORY_GB} GB</h1>
                <h2>Sugestão newMEM: {newMEM !== "-" ? `${newMEM} GB` : newMEM} </h2>
                <div>
                    <RadialBarComponent value = {machine.MeanMEM} name = {'MeanMEM'} />
                    <RadialBarComponent value = {machine.MaxMEM} name = {'MaxMEM'} />
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
                    <h1>CUSTOS ESTIMADOS</h1>
                    <h2>Sem Alteração Shape: R$ XX.XX</h2>
                    <h2>Alteração Shape (Shape E5.Flex): R$ XX.XX</h2>
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
`

const BotaoReshape = styled.button`
    background-color: green;
    position: absolute;
    top: 40%;
    left: 88%;
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
        margin-top: 10px;
    }
`

const Prices = styled.div`
    flex-direction: column;
    max-width: 30%;
    gap: 10px;
    flex-wrap: wrap;
    height: 275px;
    border: 1px solid gray;
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
`

