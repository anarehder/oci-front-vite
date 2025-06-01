import styled from 'styled-components';
import Logo from '../../assets/LOGO-BRANCA.png';
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useContext, useEffect, useState } from 'react'
import { useTenancy } from '../../contexts/TenancyContext';
import { UserContext } from '../../contexts/UserContext';


function FixedMenuComponent() {
    const { tenancy, setTenancy, allTenanciesInfo, selectedMonth } = useTenancy();
    const [user] = useContext(UserContext);
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
    console.log(tenancy, allTenanciesInfo, selectedMonth);
    return (
        <ComponentContainer>
            <img src={Logo} alt={"accerte"} />
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
                    <Link to="/projetos"> Projetos </Link>
                </MenuItem>
            }
            <br />
            <MenuItem><Link to="/">Dashboard</Link></MenuItem>
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
                                            <Link to={option.path}>{option.label}</Link>
                                        </div>
                                    ))}
                            </>
                        )}
                    </MenuItem>
                ))}
            </ItemsContainer>
        </ComponentContainer>
    );
}
export default FixedMenuComponent;

const ComponentContainer = styled.div`
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
        width: 150px;
        margin: 15px 0;
    }
`;

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
