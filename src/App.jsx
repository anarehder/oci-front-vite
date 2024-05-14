import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components'
import PricesProvider from "./contexts/PricesContext";
import Contracts from "./pages/ContractsPage";
import ContractsDark from "./pages/ContractsDark";
import ClientPage from "./pages/ClientPage";
import ClientPage2 from "./pages/ClientPage2";
import ClientPageDark from "./pages/ClientPageDark";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserProvider from "./contexts/UserContext";
import TenancyProvider from "./contexts/TenancyContext";

function App() {

  return (
    <AppContainer>
      <BrowserRouter>
        <UserProvider>
          <PricesProvider>
            <TenancyProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/contracts" element={<Contracts />} />
                <Route path="/contractsdark" element={<ContractsDark />} />
                <Route path="/client" element={<ClientPage />} />
                <Route path="/client2" element={<ClientPage2 />} />
                <Route path="/clientdark" element={<ClientPageDark />} />
              </Routes>
            </TenancyProvider>
          </PricesProvider>
        </UserProvider>
      </BrowserRouter >
    </AppContainer >
  )
}

export default App

const AppContainer = styled.main`
  width: 100vw;
  background-color: #F0F5F9;
`