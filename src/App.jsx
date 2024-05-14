import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components'
import PricesProvider from "./contexts/PricesContext";
import HomePage from "./pages/HomePage";
import HomePageDark from "./pages/HomePageDark";
import ClientPage from "./pages/ClientPage";
import ClientPage2 from "./pages/ClientPage2";
import ClientPageDark from "./pages/ClientPageDark";

function App() {

  return (
    <AppContainer>
      <PricesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/homepagedark" element={<HomePageDark />} />
            <Route path="/client" element={<ClientPage />} />
            <Route path="/client2" element={<ClientPage2 />} />
            <Route path="/clientdark" element={<ClientPageDark />} />
          </Routes>
        </BrowserRouter >
      </PricesProvider>
    </AppContainer >
  )
}

export default App

const AppContainer = styled.main`
  width: 100vw;
  padding-bottom: 50px;
  background-color: #F0F5F9;
`