import { FaRegBell } from "react-icons/fa";
import styled from 'styled-components';
import Logout from "./LogoutComponent";
import { useContext, useState } from "react";
import { useTenancy } from "../../contexts/TenancyContext";
import { UserContext } from "../../contexts/UserContext";
import { useMenu } from "../../contexts/MenuContext";

function HeaderComponent({title}) {
    const [user] = useContext(UserContext);
    const { show } = useMenu();
    const { tenancy } = useTenancy();
    //obter as tips quando renderizar o header
    const [open, setOpen] = useState(false);
    const [ociTips, setOciTips] = useState([
        { tipo: "Alerta de Custo", titulo: "Uso acima do orçamento em Compute" },
        { tipo: "Segurança", titulo: "Bucket público detectado" },
        { tipo: "Rede", titulo: "Tráfego incomum na VCN-Prod" },
        { tipo: "Backup", titulo: "Backup automático falhou em VM2" },
        { tipo: "Performance", titulo: "Uso de CPU acima de 90% em VM5" }
    ]);
    console.log(show);
    return (
        <ComponentContainer $show={show ? "exibir" : "ocultar"}>
          <LimitContainer>
          <Title>{title} <h2>{tenancy=== 'all' ? ' - Todas as Tenancies' : ` - ${tenancy}`}</h2></Title>
            <ButtonsContainer>
              {user?.client && <UserBall> AT </UserBall>}
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
          </LimitContainer>
            
        </ComponentContainer>
    );
}
export default HeaderComponent;

const ComponentContainer = styled.div`
    width: ${({ $show }) => ($show === "exibir" ? "calc(100vw - 210px)" : "calc(100vw - 50px)")}; 
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    background-color: #021121;
    color: white;
    gap: 20px;
    z-index: 999;
`;

const LimitContainer = styled.div`
    width: 95%;
`

const Title = styled.div `
    font-size: 30px;
    font-weight: 700;
    height: 70px;
    justify-content: flex-start;
    gap: 7px;
`

const ButtonsContainer = styled.div`
    height: 70px;
    margin: 0 auto;
    gap: 20px;
    justify-content: space-between;
    width: 140px;
`

const UserBall = styled.div`
  background-color: white;
  width: 35px;
  justify-content: center;
  height: 35px;
  border-radius: 50px;
  font-weight: 600;
  color: blue;
`

const BellWrapper = styled.div`
  width: 30px;
  position: relative;
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