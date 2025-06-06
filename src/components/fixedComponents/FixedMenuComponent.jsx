import styled from 'styled-components';
import Logo from '../../assets/LOGO-BRANCA.png';
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft  } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import { useContext, useEffect, useState } from 'react'
import { useTenancy } from '../../contexts/TenancyContext';
import { UserContext } from '../../contexts/UserContext';
import { useFilter } from '../../contexts/FilterContext';
import { useMenu } from '../../contexts/MenuContext';


function FixedMenuComponent() {
    const { tenancy, setTenancy, allTenanciesInfo, selectedMonth } = useTenancy();
    const { setSearchTerm } = useFilter();
    const [user] = useContext(UserContext);
    const { show, setShow } = useMenu();
    const [open, setOpen] = useState("");
    const items = [
        {
            title: "Block Volumes", options: [
                { label: "Backup", path: "/blockvolume" },                
                { label: "Órfãos", path: "/blockvolume" },
                { label: "Volumes", path: "/blockvolume" },               
            ]
        },
        // {
        //     title: "Compartments", options: [
        //         { label: "Opção 1", path: "/" }
        //     ]
        // },
        {
            title: "Compute", options: [
                { label: "Compute Instances", path: "/computeinstances" },
                { label: "CPU e Memória", path: "/latest/cpumem" }
            ]
        },
        // {
        //     title: "Cost", options: [
        //         { label: "Opção 1", path: "/" },
        //         { label: "Opção 2", path: "/" }
        //     ]
        // },
        // {
        //     title: "Object Storage", options: [
        //         { label: "Opção 1", path: "/" },
        //         { label: "Opção 2", path: "/" }
        //     ]
        // },
        // {
        //     title: "Users", options: [
        //         { label: "Opção 1", path: "/" }
        //     ]
        // },
        {
            title: "Eventos", options: [
                { label: "Compute Instances", path: "/eventos/compute" },
                { label: "Identity", path: "/eventos/identity" },
                { label: "Network", path: "/eventos/network" }
            ]
        }
    ];

    useEffect(() => {
        if (!allTenanciesInfo) {
            return
        }
    }, []);

    const handleTenancyChange = async (e) => {
        const selectedValue = e.target.value;
        setTenancy(selectedValue);
    }

    return (
        <ComponentContainer >
            <ShowContainer $show={show ? "exibir" : "ocultar"}>
            
            <Hidden onClick={()=>setShow(!show)}> <img src={Logo} alt={"accerte"} /> <MdKeyboardDoubleArrowLeft  size={24}/> </Hidden>
            <br />
            {
                allTenanciesInfo?.tenancies &&
                <TenancySelection>
                    {/* <h3>Tenancy:</h3> */}
                    <select value={tenancy} onChange={handleTenancyChange}>
                        <option value={'all'}>Todas as Tenancies</option>
                        {allTenanciesInfo?.tenancies.map((tenancy) => (
                            <option key={tenancy} value={tenancy}>{tenancy}</option>
                        ))}
                    </select>
                </TenancySelection>
            }
            <br />
            {
                user?.client === 'Accerte Tecnologia' &&
                <MenuItem>
                    <Link to="/projetos" onClick={() => setSearchTerm("")}> Projetos </Link>
                </MenuItem>
            }
            <br />
            <MenuItem><Link to="/" onClick={() => setSearchTerm("")}>Dashboard</Link></MenuItem>
            <ItemsContainer>
                {items.map((item, index) => (
                    <MenuItem key={index}>
                        {open !== item.title ? (
                            <div onClick={() => setOpen(item.title)}>
                                {item.title} <MdOutlineKeyboardArrowRight size={24} />
                            </div>
                        ) : (
                            <>
                                <div onClick={() => setOpen("")}>
                                    {item.title} <MdOutlineKeyboardDoubleArrowDown size={24} />
                                </div>
                                    {item.options.map((option, i) => (
                                        <div key={i}>
                                            <Link to={option.path} onClick={() => setSearchTerm("")}>{option.label}</Link>
                                        </div>
                                    ))}
                            </>
                        )}
                    </MenuItem>
                ))}
            </ItemsContainer>
            </ShowContainer>
            <HiddenContainer $show={show ? "exibir" : "ocultar"}>
                <Hidden onClick={()=>setShow(!show)}> <img src={Logo} alt={"accerte"} /> <MdKeyboardDoubleArrowRight  size={24}/> </Hidden>
            </HiddenContainer>
        </ComponentContainer>
    );
}
export default FixedMenuComponent;

const ComponentContainer = styled.div`
    width: ${({ $show }) => ($show === 'exibir' ? '210px' : '40px')};
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
    background-color: #021121;
    color: white;
    z-index: 999;
`;

const ShowContainer = styled.div`
    display: ${({ $show }) => ($show === "exibir" ? "flex" : "none")};
    width: 200px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
    background-color: #021121;
    color: white;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
    overflow-x: hidden;
    /* Esconde a barra de rolagem no Firefox */
    scrollbar-width: none;

    /* Esconde a barra de rolagem no IE e Edge antigos */
    -ms-overflow-style: none;

    /* Esconde a barra de rolagem no Chrome, Safari e Opera */
    &::-webkit-scrollbar {
        display: none;
    }
    z-index: 999;
    img{
        width: 140px;
        margin: 15px 0;
        margin-right: 15px;
    }
`

const HiddenContainer = styled.div`
    max-width: 24px;
    height: 70px;
    display: ${({ $show }) => ($show === "exibir" ? "none" : "flex")};
    img{
        display: none;
    }
`
const Hidden = styled.div`
    justify-content: flex-end;
    margin-right: 15px;
`
const ItemsContainer = styled.div`
    flex-direction: column;
    margin-bottom: 20px;
`

const TenancySelection = styled.div`
    flex-direction: column;
    text-indent: 10px;
    select{
        width: 90%;
        margin-left: 10px;
        margin: 10px 0;
    }
`

const MenuItem = styled.div`
    min-height: 70px;

    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    padding: 5px 25px;
    text-indent: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    border-radius: 5px;
    box-shadow: inset 0 -2px 3px rgba(255, 255, 255, 0.2);
    div{
        height: 30px;
    }
`;
