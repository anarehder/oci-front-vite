import styled from 'styled-components';
import Logo from '../../assets/LOGO-BRANCA.png';
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useState } from 'react'


function FixedMenuComponent() {
    const [open, setOpen] = useState("");
    const items = [
        { title: "Block Volumes", options: [
            { label: "Opção 1", path: "/" },
            { label: "Opção 2", path: "/" },
            { label: "Opção 3", path: "/" }
          ]
        },
        { title: "Compartments", options: [
            { label: "Opção 1", path: "/" }
          ]
        },
        { title: "Compute", options: [
            { label: "Compute Instances", path: "/computeinstances" },
            { label: "CPU e Memória", path: "/latest/cpumem" }
          ]
        },
        { title: "Cost", options: [
            { label: "Opção 1", path: "/" },
            { label: "Opção 2", path: "/" }
          ]
        },
        { title: "Object Storage", options: [
            { label: "Opção 1", path: "/" },
            { label: "Opção 2", path: "/" }
          ]
        },
        { title: "Users", options: [
            { label: "Opção 1", path: "/" }
          ]
        },
        { title: "Events", options: [
            { label: "Compute Instances", path: "/eventos/compute" },
            { label: "Identity", path: "/eventos/identity" },
            { label: "Network", path: "/eventos/network" }
          ]
        }
      ];
    
    return (
        <ComponentContainer>
            <img src={Logo} alt={"accerte"}/>
            <br />
            <Link to="/"><MenuItem>Dashboard</MenuItem></Link>
            <br />
            <br />
            <Link to="/projetos"><MenuItem>Projetos</MenuItem></Link> 
            <br />
            <br />
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

const MenuItem = styled.div`
    width: 160px;
    min-height: 50px;

    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    padding: 5px 25px;

    cursor: pointer;
    transition: all 0.3s ease;
    
    border-radius: 5px;
    box-shadow: inset 0 -2px 3px rgba(255, 255, 255, 0.2);
    div{
        height: 40px;
    }
`;
