import { useState } from "react";
import styled from "styled-components";
import NewVMComponent from "./NewVMComponent";
import NewDBComponent from "./NewDBComponent";

function InsertItemProjectComponent({ selectedProject, setSelectedProject }) {
    const [os, setOs] = useState('');
    const [shape, setShape] = useState('');
    const [ocpu, setOcpu] = useState('');
    const [memory, setMemory] = useState('');
    const [selectedType, setSelectedType] = useState("");

    return (
        <Container>
            <h2>Projeto: {selectedProject.idProjeto} {selectedProject.cliente}</h2>
            <h3> Selecione o tipo de recurso para provisionar:</h3>
            <ResourcesContainer>
                <ResourceButton onClick={()=>setSelectedType("VM")} $selected={selectedType==="VM" ? "sim" : "não"}>Máquina Virtual</ResourceButton>
                <ResourceButton onClick={()=>setSelectedType("DB")} $selected={selectedType==="DB" ? "sim" : "não"}>Database</ResourceButton>
            </ResourcesContainer>
            {selectedType === "VM" &&
                <NewVMComponent idProjeto={selectedProject.idProjeto}/>
            }
            {selectedType === "DB" &&
                <NewDBComponent idProjeto={selectedProject.idProjeto} />
            }
            <button onClick={() => setSelectedProject(null)}>Fechar</button>
        </Container>
    );
}
export default InsertItemProjectComponent;

const Container = styled.div`
    width: 95%;
    margin: 15px 0;
    flex-direction: column;
    gap: 10px;
    h2{
        line-height: 40px;
        text-align: center;
        justify-content: center;
        display:flex;
        width: 100%;
        margin: 10px 0;
    }
    h3{
        margin: 0;
    }
`;

const ResourcesContainer = styled.div`
    width: 90%;
    gap: 30px;
    justify-content: center;
    margin-bottom: 25px;
`

const ResourceButton = styled.button`
    background-color: white;
    color: #021121;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.4);
    border: ${(props) => props.$selected === "sim" ? "4px solid #021121" : "1px solid #ccc"};
`