import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components'
import HomePage from "./pages/HomePage";
import ClientPage from "./pages/ClientPage";
import PricesProvider from "./contexts/PricesContext";

function App() {

  return (
    <AppContainer>
      <PricesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/client" element={<ClientPage />} />
          </Routes>
        </BrowserRouter >
      </PricesProvider>
    </AppContainer >
  )
}

export default App

const AppContainer = styled.main`
  width: 100vw;
`