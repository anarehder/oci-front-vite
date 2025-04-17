import { FaRegBell } from "react-icons/fa";
import styled from 'styled-components';
import Logout from "./LogoutComponent";
import { useState } from "react";

function HeaderComponent({title}) {
    //obter as tips quando renderizar o header
    const [open, setOpen] = useState(false);
    const [ociTips, setOciTips] = useState([
        { tipo: "Alerta de Custo", titulo: "Uso acima do orçamento em Compute" },
        { tipo: "Segurança", titulo: "Bucket público detectado" },
        { tipo: "Rede", titulo: "Tráfego incomum na VCN-Prod" },
        { tipo: "Backup", titulo: "Backup automático falhou em VM2" },
        { tipo: "Performance", titulo: "Uso de CPU acima de 90% em VM5" }
    ]);

    return (
        <ComponentContainer>
            <Title>{title}</Title>
            <ButtonsContainer>
                <BellWrapper onClick={() => setOpen(!open)}>
                    <FaRegBell size={30} />
                    {ociTips.length > 0 && <RedDot />}
                    {open && (
                        <Dropdown>
                            {ociTips.map((tip, index) => (
                                <TipItem key={index}>
                                    <span>{tip.tipo}</span>
                                    <p>{tip.titulo}</p>
                                </TipItem>
                            ))}
                        </Dropdown>
                    )}
                </BellWrapper>
                <Logout />
            </ButtonsContainer> 
        </ComponentContainer>
    );
}
export default HeaderComponent;

const ComponentContainer = styled.div`
    width: calc(100vw - 220px);
    padding-top: 30px;
    
    position: fixed;
    top: 0;
    right: 0;

    background-color: #F0F5F9;
    color: #021121;
`;

const Title = styled.div `
    font-size: 30px;
    font-weight: 700;
    height: 70px;
    width: calc(100% - 200px);
    margin-left: 30px;
`

const ButtonsContainer = styled.div`
    width: 200px;
    height: 70px;
`

const BellWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const RedDot = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  border: 2px solid white;
`;

const Dropdown = styled.div`
  position: absolute;
  flex-direction: column;
  padding: 10px;
  top: 35px;
  right: 0;
  justify-content: flex-start;
  background-color: #fff;
  width: 250px;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  z-index: 100;
`;

const TipItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  width: 95%;

  &:last-child {
    border-bottom: none;
  }

  span {
    font-weight: 700;
    font-size: 16px;
    color: #021121;
    min-width: 95px;
  }

  p {
    margin: 4px 0 0;
    font-size: 15px;

  }
`;