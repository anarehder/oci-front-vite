import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components'
import HomePage from "./pages/HomePage";
import ClientPage from "./pages/ClientPage";
import PricesProvider from "./contexts/PricesContext";
import HomePage2 from "./pages/HomePage2";
import ClientPage2 from "./pages/ClientPage2";
import ClientPage3 from "./pages/ClientPage3";

function App() {

  return (
    <AppContainer>
      <PricesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/homepage2" element={<HomePage2 />} />
            <Route path="/client" element={<ClientPage />} />
            <Route path="/client2" element={<ClientPage2 />} />
            <Route path="/client3" element={<ClientPage3 />} />
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