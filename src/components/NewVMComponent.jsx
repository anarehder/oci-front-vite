import { useState } from "react";
import styled from "styled-components";

function NewVMComponent() {
    const [form, setForm] = useState({ nome: "", so: "", burst: 0, shape: "", ocpu: 1, memoria: 1, blockvolume: 0, retencao: 15, perfil: 5});

    const objectStorage= (Number(form.blockvolume)+(Number(form.blockvolume)*(Number(form.perfil)/100)*(Number(form.retencao)-1))).toFixed(1);


    const handleForm = (e) => {
        e.preventDefault();
        setForm((prevForm) => ({ ...prevForm, [e.target.id]: e.target.value }));
    };

    async function handleSubmitVM(e) {
        e.preventDefault();
        alert(`Inserir VM ${form.nome} no projeto`);
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
                <FormContainer onSubmit={handleSubmitVM}>
                    <Item>
                        <h3>Nome da Máquina:</h3>
                        <input
                            type="text"
                            id="nome"
                            autoComplete="nome"
                            value={form.nome}
                            onChange={handleForm}
                        />
                    </Item>                
                    <Item>
                        <h3>Shape:</h3>
                        <select id="shape" value={form.shape} onChange={handleForm}>
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
                        <h3>Sistema Operacional:</h3>
                        <select id="so" value={form.so} onChange={handleForm}>
                            <option value="">Selecione</option>
                            <option value="Autonomus Linux">Autonomus Linux</option>
                            <option value="Ubuntu">Ubuntu</option>
                            <option value="CentOS">CentOS</option>
                            <option value="Windows">Windows</option>
                            <option value="Windows BYOL">Windows BYOL</option>
                        </select>
                    </Item>
                    <Item>
                        <h3>Burst:</h3>
                        <NumberSelect id="burst" value={form.burst} onChange={handleForm}>
                            <option value="0">Não</option>
                            <option value="12.5">12.5%</option>
                            <option value="50">50%</option>
                        </NumberSelect>
                    </Item>
                    <Item>
                        <h3>OCPUs:</h3>
                        <NumberInput
                            type="number"
                            id="ocpu"
                            autoComplete="ocpu"
                            value={form.ocpu}
                            onChange={handleForm}
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
                            value={form.memoria}
                            onChange={handleForm}
                            max={1760}
                            min={1}
                        />
                    </Item>                    
                    <Item>
                        <h3>Block Volume [GB]:</h3>
                        <NumberInput
                            type="number"
                            id="blockvolume"
                            autoComplete="blockvolume"
                            value={form.blockvolume}
                            onChange={handleForm}
                            min={0}
                            max={32768}
                        />
                    </Item> 
                    <Item>
                        <h3>Retention Backup:</h3>
                        <NumberSelect id="retencao" value={form.retencao} onChange={handleForm}>
                            <option value="">Selecione</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="60">60</option>
                            <option value="90">90</option>
                        </NumberSelect>
                    </Item> 
                    <Item>
                        <h3>Perfil:</h3>
                        <NumberSelect id="perfil" value={form.perfil} onChange={handleForm}>
                            <option value="">Selecione</option>
                            <option value="5">Perfil 1</option>
                            <option value="10">Perfil 2</option>
                        </NumberSelect>
                    </Item>
                    <Item>
                        {/* <AiOutlineCloudUpload size={30} /> */}
                        <h3>Object Storage Backup</h3>
                        <NumberInput
                            type="text"
                            value={objectStorage}
                            disabled='true'
                        />
                    </Item>
                    <button type="submit">Cadastrar VM</button>
                </FormContainer>
                {/* <Details>
                    <h3>Valores Selecionados:</h3>
                    <div>
                        <div><strong>Sistema Operacional:</strong> {form.so}</div>
                        <div><strong>Shape:</strong> {form.shape}</div>
                        <div><strong>OCPUs:</strong> {form.ocpu}</div>
                        <div><strong>Memória:</strong> {form.memory}</div>
                        <div><strong>Block Volume:</strong>{form.blockvolume}</div>
                        <div><strong>Perfil:</strong>{form.perfil}</div>
                        <div><strong>Retencao:</strong>{form.retencao}</div>

                    </div>
                </Details> */}
                
            </Info>
        </Container>
    );
}
export default NewVMComponent;

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
    flex-direction: column;
    min-width: 120px;
    max-width: 300px;
    
    width: auto;
    gap: 15px;
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
        width: 280px;
    }
`

const NumberInput = styled.input`
    max-width: 100px;
    text-align: center;
    font-size: 16px;
    padding: 6px;
`;


const NumberSelect = styled.select`
    max-width: 100px;
    // text-align: center;
    font-size: 16px;
    // padding: 6px;
`;