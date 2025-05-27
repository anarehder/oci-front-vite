import { useState } from "react";
import styled from "styled-components";

function NewDBComponent({idProjeto}) {
    const [iaaSForm, setIaaSForm] = useState({ idProjeto:idProjeto, vm: "", versao: "", edicao: "", tamanho: "", rman: "", retencao: "", ret_datapump: "", espaco: "gerado", espaco_datapump: "gerado"});
    const [paaSForm, setPaaSForm] = useState({ idProjeto:idProjeto, nome_db: "", shape: "", ocpu: 0, memoria: "gerado", storage_perf: 0, data_storage: 15, versao: "", tamanho:"", retencao: "", espaco:"gerado"});
    const [tipoInfra, setTipoInfra] = useState("");

    // const objectStorage= (Number(form.blockvolume)+(Number(form.blockvolume)*(Number(form.perfil)/100)*(Number(form.retencao)-1))).toFixed(1);


    const handleIaaSForm = (e) => {
        e.preventDefault();
        setIaaSForm((prevForm) => ({ ...prevForm, [e.target.id]: e.target.value }));
    };

    const handlePaaSForm = (e) => {
        e.preventDefault();
        setPaaSForm((prevForm) => ({ ...prevForm, [e.target.id]: e.target.value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        alert(`Inserir VM ${form.nome} no projeto ${form.idProjeto}`);
        // if (!form.username || !form.password) return alert("Todos os campos devem ser preenchidos");
        // try {
        //     const response = await apiService.login(form);
        //     if (response.status === 200) {
        //         const { userId, username, isAdmin, client, token } = response.data;
        //         const userData = {
        //             userId,
        //             username,
        //             isAdmin,
        //             client,
        //             token: `Bearer ${token}`
        //         };
        //         localStorage.setItem("user", JSON.stringify({userId, username, isAdmin, client, token: `Bearer ${token}`}));
        //         setUser(userData);
        //         navigate("/homepage");
        //     }
        // } catch (error) {
        //     if (error.response.status === 401 || error.response.status === 400 ) alert("Dados incorretos, tente novamente");
        // } finally {
        //     setForm({ username: '', password: '' });
        // }
    };

    return (
        <Container >
            <Info>
                <Item>
                    <InfraTitle>Em qual tipo de infraestrutura será provisionado:</InfraTitle>
                    <select id="shape" value={tipoInfra} onChange={(e) => setTipoInfra(e.target.value)}>
                        <option value="">Selecione</option>
                        <option value="IaaS">IaaS</option>
                        <option value="PaaS">PaaS</option>
                    </select>
                </Item>
                    {tipoInfra === "IaaS" && 
                    <FormContainer onSubmit={handleSubmit}>
                    <Item>
                        <h3>Selecione a VM:</h3>
                        <select id="vm" value={iaaSForm.vm} onChange={handleIaaSForm}>
                            <option value="">VM</option>
                            <option value="VM.Standard.E3.Flex">VM.Standard.E3.Flex</option>
                            <option value="VM.Standard.E4.Flex">VM.Standard.E4.Flex</option>
                            <option value="VM.Standard.E5.Flex">VM.Standard.E5.Flex</option>
                            <option value="VM.DenseIO.E4.Flex">VM.DenseIO.E4.Flex</option>
                            <option value="VM.DenseIO.E5.Flex">VM.DenseIO.E5.Flex</option>
                            <option value="VM.DenseIO.E6.Flex">VM.DenseIO.E6.Flex</option>
                        </select>
                    </Item>                
                    <Item>
                        <h3>Versão do Banco de Dados:</h3>
                        <select id="versao" value={iaaSForm.versao} onChange={handleIaaSForm}>
                            <option value="">Selecione</option>
                            <option value="Versão 1">Versao 1</option>
                            <option value="Versão 2">Versao 2</option>
                        </select>
                    </Item>    
                    <Item>
                        <h3>Edição do Banco de Dados:</h3>
                        <select id="edicao" value={iaaSForm.edicao} onChange={handleIaaSForm}>
                            <option value="">Selecione</option>
                            <option value="Edição 1">Edição 1</option>
                            <option value="Edição 2">Edição 2</option>
                        </select>
                    </Item>
                    <Item>
                        <h3>Tamanho do Banco:</h3>
                        <NumberInput
                            type="number"
                            id="tamanho"
                            autoComplete="tamanho"
                            value={iaaSForm.tamanho}
                            onChange={handleIaaSForm}
                            min={1}
                        />
                    </Item>
                    <Item>
                        <h3>Destino (RMAN):</h3>
                        <select id="rman" value={iaaSForm.rman} onChange={handleIaaSForm}>
                            <option value="">Selecione</option>
                            <option value=" 1"> 1</option>
                            <option value=" 2"> 2</option>
                        </select>
                    </Item>
                    <Item>
                        <h3>Tempo de Retenção:</h3>
                        <NumberSelect id="retencao" value={iaaSForm.retencao} onChange={handleIaaSForm}>
                            <option value="">Selecione</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="60">60</option>
                            <option value="90">90</option>
                        </NumberSelect>
                    </Item>
                    <Item>
                        {/* <AiOutlineCloudUpload size={30} /> */}
                        <h3>Espaço Necessário</h3>
                        <NumberInput
                            type="text"
                            value={iaaSForm.espaco}
                            disabled='true'
                        />
                    </Item>            
                    <Item>
                        <h3>Tempo de Retenção (DATAPUMP):</h3>
                        <NumberSelect id="ret_datapump" value={iaaSForm.ret_datapump} onChange={handleIaaSForm}>
                            <option value="">Selecione</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="60">60</option>
                            <option value="90">90</option>
                        </NumberSelect>
                    </Item> 
                    <Item>
                        {/* <AiOutlineCloudUpload size={30} /> */}
                        <h3>Espaço Necessário (DATAPUMP)</h3>
                        <NumberInput
                            type="text"
                            value={iaaSForm.espaco_datapump}
                            disabled='true'
                        />
                    </Item>
                    <button type="submit">Cadastrar no Projeto </button>
                </FormContainer>}
                    {tipoInfra === "PaaS" &&
                    <FormContainer onSubmit={handleSubmit}>
                    <Item>
                        <h3>Selecione a VM:</h3>
                        <select id="nome_db" value={paaSForm.nome_db} onChange={handlePaaSForm}>
                            <option value="">VM</option>
                            <option value="VM.Standard.E3.Flex">VM.Standard.E3.Flex</option>
                            <option value="VM.Standard.E4.Flex">VM.Standard.E4.Flex</option>
                            <option value="VM.Standard.E5.Flex">VM.Standard.E5.Flex</option>
                            <option value="VM.DenseIO.E4.Flex">VM.DenseIO.E4.Flex</option>
                            <option value="VM.DenseIO.E5.Flex">VM.DenseIO.E5.Flex</option>
                            <option value="VM.DenseIO.E6.Flex">VM.DenseIO.E6.Flex</option>
                        </select>
                    </Item>   
                    <Item>
                        <h3>Shape:</h3>
                        <select id="shape" value={paaSForm.shape} onChange={handlePaaSForm}>
                            <option value="">Selecione</option>
                            <option value="VM.Standard.E3.Flex">VM.Standard.E3.Flex</option>
                            <option value="VM.Standard.E4.Flex">VM.Standard.E4.Flex</option>
                            <option value="VM.Standard.E5.Flex">VM.Standard.E5.Flex</option>
                            <option value="VM.DenseIO.E4.Flex">VM.DenseIO.E4.Flex</option>
                            <option value="VM.DenseIO.E5.Flex">VM.DenseIO.E5.Flex</option>
                            <option value="VM.DenseIO.E6.Flex">VM.DenseIO.E6.Flex</option>
                        </select>
                    </Item> 
                    <Item>
                        <h3>OCPUs:</h3>
                        <NumberInput
                            type="number"
                            id="ocpu"
                            autoComplete="ocpu"
                            value={paaSForm.ocpu}
                            onChange={handlePaaSForm}
                            max={114}
                            min={1}
                        />
                    </Item>
                    <Item>
                        <h3>Memória [GB]:</h3>
                        <NumberInput
                            type="number"
                            id="memoria"
                            autoComplete="memoria"
                            value={paaSForm.memoria}
                            disabled='true'
                        />
                    </Item>       
                    <Item>
                        <h3>Storage Performance:</h3>
                        <select id="versao" value={paaSForm.storage_perf} onChange={handlePaaSForm}>
                            <option value="">Selecione</option>
                            <option value="Storage 1">Storage 1</option>
                            <option value="Storage 2">Storage 2</option>
                        </select>
                    </Item>         
                    <Item>
                        <h3>Data Storage [GB]:</h3>
                        <NumberInput
                            type="number"
                            id="data_storage"
                            autoComplete="data_storage"
                            value={paaSForm.data_storage}
                            onChange={handlePaaSForm}
                            min={1}
                        />
                    </Item> 
                    <Item>
                        <h3>Versão/Edição do Banco de Dados:</h3>
                        <select id="edicao" value={paaSForm.versao} onChange={handlePaaSForm}>
                            <option value="">Selecione</option>
                            <option value="Edição 1">Versão/Edição 1</option>
                            <option value="Edição 2">Versão/Edição 2</option>
                        </select>
                    </Item>
                    <Item>
                        <h3>Tamanho do Banco:</h3>
                        <NumberInput
                            type="number"
                            id="tamanho"
                            autoComplete="tamanho"
                            value={paaSForm.tamanho}
                            onChange={handlePaaSForm}
                            min={1}
                        />
                    </Item>
                    <Item>
                        <h3>Tempo de Retenção:</h3>
                        <NumberSelect id="retencao" value={paaSForm.retencao} onChange={handlePaaSForm}>
                            <option value="">Selecione</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="60">60</option>
                            <option value="90">90</option>
                        </NumberSelect>
                    </Item>
                    <Item>
                        {/* <AiOutlineCloudUpload size={30} /> */}
                        <h3>Espaço Necessário</h3>
                        <NumberInput
                            type="text"
                            value={paaSForm.espaco}
                            disabled='true'
                        />
                    </Item>            
                    <button type="submit">Cadastrar no Projeto </button>
                </FormContainer>
                }               
            </Info>
        </Container>
    );
}
export default NewDBComponent;

const Container = styled.div`
    margin: 15px 0;
    flex-direction: column;
    gap: 10px;
    h2{
        line-height: 40px;
        text-align: center;
        justify-content: center;
        width: 100%;
        margin: 10px 0;
    }
    h3{
        margin: 0;
    }
`;


const Item = styled.div`
margin: 20px 0;
    flex-direction: column;
    min-width: 120px;
    max-width: 300px;
    width: auto;
    gap: 15px;
    h3{
        width: 170px;
        }
`

const Details = styled.div`
    margin: 25px 0;
    flex-direction: column;
    width: 90%;
    gap: 15px;
    div{
        justify-content: center;
        align-items: flex-start;
        gap: 10px;
        div{
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            gap: 10px;
        }
    }
`

const InfraTitle = styled.div`
    width: 550px;
    justify-content: center;
    text-align: center;
    font-weight: 400;
    font-size: 20px;
`

const Info = styled.div`
    width: 95%;
    flex-direction: column;
    border: 3px solid #021121;
    border-radius: 15px;
    padding: 15px;
    button{
        margin-top: 30px;
    }
`

const FormContainer = styled.form`
    display: flex;
    justify-content: space-around;
    gap: 30px;
    flex-wrap: wrap;
    input{
        font-weight: 400;
        font-size: 20px;
        border: 1px solid #E6E6E6;
        border-radius: 16px;
        padding: 10px;
        width: 280px;
        background-color: #F0F5F9;
    }
    input::placeholder{
        font-weight: 400;
        font-size: 18px;
    }
    input:disabled {
        caret-color: transparent;
        pointer-events: none;
    }
    select{
        font-weight: 400;
        font-size: 20px;
        border: 1px solid #E6E6E6;
        border-radius: 16px;
        padding: 10px;
        width: 230px;
    }
`

const NumberInput = styled.input`
    max-width: 130px;
    text-align: center;
    font-size: 16px;
    padding: 6px;
`;


const NumberSelect = styled.select`
    max-width: 130px;
    // text-align: center;
    font-size: 16px;
    // padding: 6px;
`;
