import styled from 'styled-components';
import Logo from '../assets/LOGO-BRANCA.png'
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useState } from 'react';


function FixedMenuComponent() {
    const [open, setOpen] = useState("");
    const items = [
        { title: "Block Volumes", options: ["Opção 1", "Opção 2", "Opção 3"] },
        { title: "Compartments", options: ["Opção 1"] },
        { title: "Compute", options: ["Opção 1", "Opção 2"] },
        { title: "Cost", options: ["Opção 1", "Opção 2"] },
        { title: "Object Storage", options: ["Opção 1", "Opção 2"] },
        { title: "Users", options: ["Opção 1"] },
        { title: "Events", options: ["Opção 1"] }
      ];

    return (
        <ComponentContainer>
            <img src={Logo} alt={"accerte"}/>
            <MenuItem>Dashboard</MenuItem>
            <br />
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
                                        <div key={i}>{option}</div>
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
        margin: 45px 0;
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
