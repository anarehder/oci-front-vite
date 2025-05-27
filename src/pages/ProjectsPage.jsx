import { useState, useContext, useEffect } from "react";
import styled from 'styled-components';
import { GoArrowRight } from "react-icons/go";
import { LuUserCircle2 } from "react-icons/lu";
import { TbFilterEdit } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { TbLock } from "react-icons/tb";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from 'react-icons/md';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { PiBuildingOffice } from "react-icons/pi";
import { BsGeoAlt } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { LiaOrcid } from "react-icons/lia";
import { BsCalendarDate } from "react-icons/bs";
import { RiListSettingsLine } from "react-icons/ri";
import { UserContext } from "../contexts/UserContext";
import apiService from "../services/apiService";
import FixedMenuComponent from "../components/fixedComponents/FixedMenuComponent";
import HeaderComponent from "../components/fixedComponents/HeaderComponent";
import InsertItemProjectComponent from "../components/InsertItemProjectComponent";
import ProjectsGraphsComponent from "../components/graphsComponents/ProjectsGraphsComponent";

function ProjectsPage() {
    const [form, setForm] = useState({ idProjeto: "", tenancy: "", cliente: "", arquiteto: "", status: "", inicio: "", regiao: "" });
    const [user, setUser] = useContext(UserContext);
    const [item, setItem] = useState("Overview");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const sortOptions = [null, 'asc', 'desc'];
    const projetos = [
        {
            idProjeto: "OCI-001",
            tenancy: "empresa01-tenancy",
            cliente: "Grupo TechNova",
            arquiteto: "Joana Martins",
            status: "Implementação",
            inicio: "2024-11-10",
            regiao: "us-ashburn-1"
        },
        {
            idProjeto: "OCI-002",
            tenancy: "empresa02-tenancy",
            cliente: "Banco União",
            arquiteto: "Carlos Souza",
            status: "Desenho",
            inicio: "2025-01-15",
            regiao: "sa-saopaulo-1"
        },
        {
            idProjeto: "OCI-003",
            tenancy: "empresa03-tenancy",
            cliente: "Indústria Alfa",
            arquiteto: "Renata Lima",
            status: "Implementação",
            inicio: "2023-07-01",
            regiao: "uk-london-1"
        },
        {
            idProjeto: "OCI-004",
            tenancy: "empresa04-tenancy",
            cliente: "Startup Cloudify",
            arquiteto: "Eduardo Tavares",
            status: "Concluído",
            inicio: "2024-09-20",
            regiao: "us-phoenix-1"
        },
        {
            idProjeto: "OCI-005",
            tenancy: "empresa05-tenancy",
            cliente: "Rede VarejoMax",
            arquiteto: "Beatriz Nunes",
            status: "Desenho",
            inicio: "2025-03-05",
            regiao: "ap-hyderabad-1"
        }
    ];

    const [currentItems, setCurrentItems] = useState(projetos);

    const handleForm = (e) => {
        e.preventDefault(); setForm((prevForm) => ({ ...prevForm, [e.target.id]: e.target.value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        alert("enviado!");
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
        //         localStorage.setItem("user", JSON.stringify({ userId, username, isAdmin, client, token: `Bearer ${token}` }));
        //         setUser(userData);
        //         navigate("/homepage");
        //     }
        // } catch (error) {
        //     if (error.response.status === 401 || error.response.status === 400) alert("Dados incorretos, tente novamente");
        // } finally {
        //     setForm({ username: '', password: '' });
        // }
    };


    const getNextDirection = (currentDirection) => {
        const currentIndex = sortOptions.indexOf(currentDirection);
        const nextIndex = (currentIndex + 1) % sortOptions.length;
        return sortOptions[nextIndex];
    };

    const handleSort = (key) => {
        const newDirection = sortConfig.key === key ? getNextDirection(sortConfig.direction) : 'asc';
        setSortConfig({ key, direction: newDirection });
    };

    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        if (sortConfig.direction === 'asc') return <MdOutlineArrowDropUp size={22} color="white" />;
        if (sortConfig.direction === 'desc') return <MdOutlineArrowDropDown size={22} color="white" />;
        return null;
    };

    useEffect(() => {
        const filtered = projetos.filter((item) =>
            Object.values(item).some((val) =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        setCurrentItems(filtered);

        let sorted = [...filtered];
        if (sortConfig.key && sortConfig.direction) {
            sorted.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setCurrentItems(sorted);
        }

    }, [searchTerm, sortConfig]);

    return (
        <PageContainer onSubmit={handleSubmit}>
            <FixedMenuComponent />
            <HeaderComponent title={"PROJETOS"} />

            <ProjetosContainer>
                <UpperMenu>
                    <ItemMenu $selected={item==="Overview" ? "sim" : "não"} onClick={()=>setItem("Overview")}>Overview</ItemMenu> 
                    <ItemMenu $selected={item==="Projetos" ? "sim" : "não"} onClick={()=>setItem("Projetos")}>Projetos<div>{projetos?.length}</div></ItemMenu>
                    <ItemMenu $selected={item==="New" ? "sim" : "não"} onClick={()=>setItem("New")}>Criar Novo Projeto</ItemMenu>
                    <ItemMenu $selected={item==="Documentos" ? "sim" : "não"} onClick={()=>setItem("Documentos")}>Documentos</ItemMenu>
                </UpperMenu>
                {selectedProject &&
                    <InsertItemProjectComponent selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
                }
                {item === "Overview" && <ProjectsGraphsComponent projetos={projetos} />}
                {item === "Projetos" && 
                    <ListContainer>
                    <h2>Projetos Cadastrados</h2>
                    <SearchBar>
                        <TbFilterEdit size={30} />
                        <input
                            type="text"
                            placeholder="Filtrar por qualquer campo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </SearchBar>
                    <ListHeader>
                        <RowHeader>
                            <Info onClick={() => handleSort('idProjeto')}><span>Id Projeto</span>{renderSortIcon('idProjeto')}</Info>
                            <Info onClick={() => handleSort('tenancy')}><span>Tenancy</span>{renderSortIcon('tenancy')}</Info>
                            <Info onClick={() => handleSort('cliente')}><span>Cliente</span>{renderSortIcon('cliente')}</Info>
                            <Info onClick={() => handleSort('arquiteto')}><span>Arquiteto</span>{renderSortIcon('arquiteto')}</Info>
                            <Info onClick={() => handleSort('regiao')}><span>Região</span>{renderSortIcon('regiao')}</Info>
                            <Info onClick={() => handleSort('status')}><span>Status</span>{renderSortIcon('status')}</Info>
                            <Info onClick={() => handleSort('inicio')}><span>Início</span>{renderSortIcon('inicio')}</Info>
                            <Info ><span>Detalhes</span></Info>
                            <Info><span>Editar</span></Info>
                        </RowHeader>
                    </ListHeader>
                    <List>
                        {currentItems.length === 0 ?
                            <h2>Sem informações para exibir...</h2> :
                            currentItems.map((item, index) => (
                                <Row key={index}>
                                    <Info>{item.idProjeto}</Info>
                                    <Info>{item.tenancy}</Info>
                                    <Info>{item.cliente}</Info>
                                    <Info>{item.arquiteto}</Info>
                                    <Info>{item.regiao}</Info>
                                    <Info>{item.status}</Info>
                                    <Info>{item.inicio}</Info>
                                    <Info><RiListSettingsLine size={30} /></Info>
                                    <Info>{item.status === "Desenho" ?
                                        <EditButton onClick={() => setSelectedProject(item)}>
                                            <FaEdit size={24} />
                                        </EditButton> :
                                        <EditButton disabled={true}>
                                            <TbLock size={24} />
                                        </EditButton>
                                    }
                                    </Info>
                                </Row>
                            ))}
                    </List>
                    </ListContainer>
                }
                {item === "New" &&
                    <NewProjectContainer>
                            <FormContainer>
                                <div>
                                    <h2>Sobre o projeto:</h2>
                                    <ItemForm>
                                        <LuUserCircle2 size={30} />
                                        <h3>Arquiteto:</h3>
                                        <input
                                            type="text"
                                            id="arquieto"
                                            value='Sérgio Lopes'
                                            // value={form.idProjeto}
                                            disabled='true'
                                        />
                                    </ItemForm>
                                </div>
                                <div>
                                    <ItemForm>
                                        <LiaOrcid size={30} />
                                        <h3>ID Projeto:</h3>
                                        <input
                                            // placeholder='ID do Projeto'
                                            type="text"
                                            id="idProjeto"
                                            autoComplete="idProjeto"
                                            value={form.idProjeto}
                                            onChange={handleForm}
                                        />
                                    </ItemForm>
                                    <ItemForm>
                                        <BsCalendarDate size={29} />
                                        <h3>Início:</h3>
                                        <input
                                            placeholder='Data de Início'
                                            type="date"
                                            id="inicio"
                                            autoComplete="inicio"
                                            value={form.inicio}
                                            onChange={handleForm}
                                        />
                                    </ItemForm>
                                </div>
                                <div>
                                    <ItemForm>
                                        <AiOutlineCloudUpload size={30} />
                                        <h3>Tenancy:</h3>
                                        <input
                                            type="text"
                                            id="tenancy"
                                            autoComplete="tenancy"
                                            value={form.tenancy}
                                            onChange={handleForm}
                                        />
                                    </ItemForm>
                                    <ItemForm>
                                        <GoTasklist size={30} />
                                        <h3>Status:</h3>
                                        <input
                                            type="text"
                                            id="status"
                                            autoComplete="status"
                                            value={form.status}
                                            onChange={handleForm}
                                        />
                                    </ItemForm>
                                </div>
                                <div>
                                    <ItemForm>
                                        <PiBuildingOffice size={30} />
                                        <h3>Cliente:</h3>
                                        <input
                                            // placeholder='cliente'
                                            type="text"
                                            id="cliente"
                                            autoComplete="cliente"
                                            value={form.cliente}
                                            onChange={handleForm}
                                        />
                                    </ItemForm>
                                    <ItemForm>
                                        <BsGeoAlt size={30} />
                                        <h3>Região:</h3>
                                        <input
                                            // placeholder='cliente'
                                            type="text"
                                            id="regiao"
                                            autoComplete="regiao"
                                            value={form.regiao}
                                            onChange={handleForm}
                                        />
                                    </ItemForm>

                                    </div>
                                    <div>
                                        <button type="submit">
                                            <p>Criar Projeto</p>
                                            <GoArrowRight size={24} />
                                        </button>
                                    </div>

                                </FormContainer>
                    </NewProjectContainer>
                }
            </ProjetosContainer>

        </PageContainer>
    )
}

export default ProjectsPage;

const PageContainer = styled.div`
    gap: 10px;
    flex-direction: column;
    position: absolute;
    align-items: flex-end;
    min-height: 101vh;
`
const ProjetosContainer = styled.div`
    width: calc(100vw - 220px);
    margin-top: 80px;
    position: relative;

    flex-direction: column;
    align-items: center;
    
    color: #021121;
    overflow-y: hidden;
    overflow-x: hidden;
    h2{
        text-align: left;
        font-size: 25px;
        width: 95%;
    }
    button {
        padding: 10px;
        justify-content: center;
        gap: 10px;
        width: 180px;
        text-align: center;
    }
`

const UpperMenu = styled.div`
    width: 40%;
    // background-color: red;
    height: 70px;
    justify-content: space-between; 
`

const ItemMenu = styled.div`
    cursor: pointer;
    color: #555;
    font-size: 20px;
    display: flex;
    align-items: center;
    width: auto;
    font-weight: 500;
    gap: 4px;
    padding-bottom: 10px;
    border-bottom: ${(props) => props.$selected === "sim" ? "2px solid #444444" : "2px solid #FFFFFF"};
    div{
        background-color: #444444;
        color: white;
        border-radius:50px;
        height:20px;
        font-size: 15px;
        width:20px;
        align-items: center;
        justify-content: center;
    }
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: absolute;
  right: 50px;
  width: 250px;
  align-items: flex-end;
  gap: 10px;

  input {
    padding: 6px 10px;
    font-size: 14px;
    width: 300px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`;

const ListContainer = styled.div`
    flex-direction: column;
    margin-top: 30px;
`

const NewProjectContainer = styled.div`
    max-width: 1350px;
    flex-direction: column;
    margin-top: 30px;
    // background-color: red;
    button{
        margin-top: 30px;
    }
`

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 90%;
    
    h2{
        width: 500px;
        padding: 10px;
    }
    div{
        gap: 15px;
        flex-wrap: wrap;
    }
`

const ItemForm = styled.div`
    justify-content: flex-start !important;    
    color:#021121;
    
    display: flex;
    align-items: center;
    width: 550px;
    h3{
        width: 100px;
    }
    input{
        font-weight: 400;
        font-size: 20px;
        border: 1px solid #E6E6E6;
        border-radius: 16px;
        padding: 10px;
        width: 300px;
    }
    input::placeholder{
        font-weight: 400;
        font-size: 18px;
    }
    input:disabled {
        caret-color: transparent;
        pointer-events: none;
    }
`



const ListHeader = styled.div`
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  gap: 5px;
  width: 95%;
  font-size: 20px;
`

const List = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;
  width: 95%;
  font-size: 20px;
  margin-bottom: 50px;
  h2 {
    line-height: 50px;
    text-align: center;
    font-size: 22px;
  }
`;

const RowHeader = styled.div`
  background-color: #001F3F;
  display: flex;
  height: 45px;
  border-radius: 5px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Row = styled.div`
  background: white;
  border-radius: 5px;
  display: flex;
  height: 45px;
  align-items: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Info = styled.div`
    width: 9%;
    height: 50px;
    justify-content: center !important;
    text-align: center;
    // background-color: red;
    word-break: break-word;
    font-size: 16px;
    align-items: center !important;

    span {
        font-weight: bold;
        color: white;
    }
    &:nth-of-type(2) {
        width: 13%;
    }
    &:nth-of-type(3) {
        width: 13%;
    }
    &:nth-of-type(8) {
        width: 6%;
    }
    &:nth-of-type(9) {
        width: 6%;
    }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #001F3F;
  font-size: 16px;
  &:disabled{
    opacity: 0.6;
    cursor: none !important;
    background-color: transparent;
  }
`;
