import { GoArrowRight } from "react-icons/go";
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import apiService from "../services/apiService";

function CreateUserPage(){
    const navigate = useNavigate();
    const [user ,setUser] = useContext(UserContext);
    const [form, setForm] = useState({name:"", username: "", password: "" , checkPassword:""});
    const [clientsList, setClientsList] = useState([]);
    console.log(clientsList);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userLocal = localStorage.getItem("user");
                if (!userLocal) {
                    return navigate("/");
                }
                if ((JSON.parse(userLocal)).isAdmin !== 1) {
                    return navigate("/");
                }
                const response = await apiService.getClientsList(user.token);
                    if (response.status === 200) {
                        setClientsList(response.data);
                    }
            } catch (error) {
                console.log(error);
                alert("ocorreu um erro");
            }
        };
        fetchData();
    }, []);
    
    const handleForm = (e) => {
        e.preventDefault();     setForm((prevForm) => ({ ...prevForm, [e.target.id]: e.target.value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.username || !form.password || !form.name || !form.checkPassword) return alert("Todos os campos devem ser preenchidos");
        if (form.password !== form.checkPassword) return alert ("As senhas não coincidem");
        try {
            const body = {name: form.name, username: form.username, password: form.password};
            const response = await apiService.createUser(user.token, body);
            if (response.status === 200) {
                alert("Usuário criado com sucesso!");
            }
        } catch (error) {
            alert("Ocorreu um erro, tente novamente!");
        } finally {
            setForm({ name:"", username: "", password: "" , checkPassword:""});
        }
    };

    return(
        <PageContainer onSubmit={handleSubmit}>
            <Header>
                <h1>
                    Criar novo usuário
                </h1>
                <Link to="/contracts">
                    <ReturnButton>
                        Voltar
                        <GoArrowRight size={24} />
                    </ReturnButton>
                </Link>
            </Header>
            <FormContainer>
                <SearchBarForm>
                    <input
                        placeholder='Nome'
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={handleForm}
                    />
                </SearchBarForm>
                <SearchBarForm>
                    <input
                        placeholder='Usuário'
                        type="text"
                        id="username"
                        value={form.username}
                        onChange={handleForm}
                    />
                </SearchBarForm>
                <SearchBarForm>
                    <input
                        placeholder='Senha'
                        type="password"
                        id="password"
                        value={form.password}
                        onChange={handleForm}
                    />
                </SearchBarForm>
                <SearchBarForm>
                    <input
                        placeholder='Confirme a senha'
                        type="password"
                        id="checkPassword"
                        value={form.checkPassword}
                        onChange={handleForm}
                    />
                </SearchBarForm>
                <button type="submit">
                    <p>Criar usuário</p>
                    <GoArrowRight size={24} />
                </button>
            </FormContainer>
        </PageContainer>
    )
}

export default CreateUserPage;

const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    color: #021121;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    margin-bottom: 20px;
    h1{
        padding-top:30px;
    }
`

const Header = styled.div`
    height: 130px;
    width: 70%;
    border-bottom: 2px solid #E6E6E6;
    padding: 10px 25px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    h1{
        font-size: 50px;
        font-weigth: 400;
    }
    a {
        margin: 20px;
        position: absolute;
        left: 15%;
        top: 5%;
    }
`

const ReturnButton = styled.button`
    width: 150px;
`

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
    margin: 3% 15%;
    input {
        width: 100%;
    }
    button {
        padding: 10px 15px;
        justify-content: space-between;
        gap: 20px;
    }
`

const SearchBarForm = styled.div`
    justify-content: flex-start;    
    background-color: #F0F5F9;
    color:#021121;
    border: 0.5px solid #E6E6E6;
    border-radius: 16px;
    display: flex;
    align-items: center;
    padding: 10px;
    width: 725px;
    gap: 15px;
`