import React from "react";
import styled from "styled-components";

function TenancySelectionComponent({ show, setShowModal, onClose, tenancySelections, setTenancySelections, allTenancies, setAllTenancies, getJoinData }) {
  if (!show) return null;

  const handleChange = (e, tenancyKey) => {
    setTenancySelections((prev) => ({
      ...prev,
      [tenancyKey]: e.target.value,
    }));
  };

  const submitTenancies = async () =>{
    setAllTenancies(false);
    await getJoinData();
    setShowModal(false)
  }

  const enable = tenancySelections.tenancy1 && tenancySelections.tenancy2;

  return (
      <ModalOverlay onClick={onClose}>
          <button onClick={() => setShowModal(false)}>X</button>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
              <h2>Selecione até 3 Tenancies</h2>

              {[1, 2, 3].map((num) => (
                  <div key={`tenancy${num}`} style={{ marginBottom: "1rem" }}>
                      <label>Tenancy {num}</label>
                      <select
                          value={tenancySelections[`tenancy${num}`] || ''}
                          onChange={(e) => handleChange(e, `tenancy${num}`)}
                      >
                          <option value="">Selecionar...</option>
                          {allTenancies
                              ?.filter((tenancy) => {
                                  // evita que a mesma tenancy seja usada em mais de um campo
                                  return !Object.entries(tenancySelections)
                                      .filter(([key]) => key !== `tenancy${num}`)
                                      .some(([, val]) => val === tenancy);
                              })
                              .map((tenancy) => (
                                  <option key={tenancy} value={tenancy}>{tenancy}</option>
                              ))}
                      </select>
                  </div>
        ))}

        <button disabled={!enable} onClick={submitTenancies}>Carregar</button>
      </ModalContainer>
    </ModalOverlay>
  );
}
export default TenancySelectionComponent;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 50;
    h2{
        line-height: 40px;
    }
`;

const ModalContainer = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 12px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    select {
        width: 300px;
    }
`;