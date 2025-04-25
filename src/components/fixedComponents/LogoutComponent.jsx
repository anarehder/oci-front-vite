import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useContext } from 'react';
import { UserContext } from "../../contexts/UserContext";
import apiService from '../../services/apiService';

export default function LogoutComponent() {

    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    const removeUser = () => {
        (async () => {
            try {
                const response = await apiService.logout(user.token);
                if (response.status === 200) {
                    setUser({});
                    localStorage.removeItem("user");
                    navigate("/")
                }
            } catch (error) {
                alert("Ocorreu um erro, tente novamente");
            }
        })()
    };

    return (
        <ReturnButton onClick={() => removeUser()}>
            <MdLogout size={30} />
        </ReturnButton>
    );
}

const ReturnButton = styled.div`
    width: 40px;
    justify-content: center;
    margin: 0 auto;
`