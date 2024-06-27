import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { useContext } from 'react';
import { UserContext } from "../contexts/UserContext";
import apiService from '../services/apiService';

export default function Logout() {

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
            Logout
            <GoArrowRight size={24} />
        </ReturnButton>
    );
}

const ReturnButton = styled.button`
    width: 150px;
    margin: 20px;
    position: absolute;
    right: 3%;
    top: 5%;
`