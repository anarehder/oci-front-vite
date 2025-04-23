import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components'
import PricesProvider from "./contexts/PricesContext";
import LoginPage from "./pages/LoginPage";
import UserProvider from "./contexts/UserContext";
import TenancyProvider from "./contexts/TenancyContext";
import CreateUserPage from "./pages/CreateUserPage";
import AccessPage from "./pages/AccessPage";
import HomePage from "./pages/HomePage";
import ComputeInstancesPage from "./pages/ComputeInstancesPage";
import EventsPage from "./pages/EventsPage";

function App() {

  return (
    <AppContainer>
      <BrowserRouter>
        <UserProvider>
          <PricesProvider>
            <TenancyProvider>
              <Routes>
                <Route path="/" element={<AccessPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/homepage" element={<HomePage />}/>
                <Route path="/createuser" element={<CreateUserPage />} />
                <Route path="/computeinstances" element={<ComputeInstancesPage />} />
                <Route path="/eventos" element={<EventsPage />} />
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