import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { TbFilterEdit } from "react-icons/tb";

function EventsComponent({ eventsInfo }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);
  useEffect(() => {
    setFilteredItems(eventsInfo);
    setTotalPages(Math.ceil(eventsInfo.length / itemsPerPage));
  }, [eventsInfo]);

  useEffect(() => {
    const filtered = eventsInfo.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [searchTerm, eventsInfo]);

  function dateTimeBrazil(date){
        const dateUTC = new Date(date);

        const brTime = dateUTC.toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
        });
        return brTime;
    }

  return (
    <ComponentContainer>
      <SearchBar>
        <TbFilterEdit size={30} />
        <input
          type="text"
          placeholder="Filtrar por qualquer campo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>

      <List>
        <RowHeader>
          <Info><span>Compartment</span></Info>
          <Info><span>Evento</span></Info>
          <Info><span>Horário</span></Info>
          <Info><span>IP</span></Info>
          <Info><span>Ação</span></Info>
          <Info><span>Mensagem</span></Info>
          <Info><span>Realizado por</span></Info>
          <Info><span>Ações</span></Info>
        </RowHeader>

        {currentItems.map((item, index) => (
          <Row key={index}>
            
            <Info>{item.compartment_name}</Info>
            <Info>{item.event_name}</Info>
            <Info>{dateTimeBrazil(item.event_time)}</Info>
            <Info>{item.ip_address}</Info>
            <Info>{item.action}</Info>
            <Info>{item.message.replace(item.event_name, "").trim()}</Info>
            <Info>{item.principal_name}</Info>
            <Info>
              <EditButton
                onClick={() =>
                  alert(`Editar ${item.event_name}, ${item.compartment_name}`)
                }
              >
                <FaEdit size={24} />
              </EditButton>
            </Info>
          </Row>
        ))}
      </List>
      <Pagination>
        {currentPage > 2 && (
          <PageButton onClick={() => setCurrentPage(1)}>1</PageButton>
        )}

        {currentPage > 3 && <Ellipsis>...</Ellipsis>}

        {currentPage > 1 && (
          <PageButton onClick={() => setCurrentPage(currentPage - 1)}>
            {currentPage - 1}
          </PageButton>
        )}

        <PageButton active>{currentPage}</PageButton>

        {currentPage < totalPages && (
          <PageButton onClick={() => setCurrentPage(currentPage + 1)}>
            {currentPage + 1}
          </PageButton>
        )}

        {currentPage < totalPages - 2 && <Ellipsis>...</Ellipsis>}

        {currentPage < totalPages - 1 && (
          <PageButton onClick={() => setCurrentPage(totalPages)}>
            {totalPages}
          </PageButton>
        )}
      </Pagination>
    </ComponentContainer>
  );
}

export default EventsComponent;

// Styled Components

const ComponentContainer = styled.div`
    width: calc(100vw - 220px);
    margin-left: 200px;
    margin-top: 100px;

    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;

    color: #021121;
    overflow-y: hidden;
    overflow-x: hidden;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: absolute;
  right: 50px;
  width: 250px;
  align-items: flex-end;
  gap: 10px;

  input {
    padding: 6px 10px;
    font-size: 14px;
    width: 300px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`;

const List = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  gap: 5px;
  width: 95%;
  font-size: 20px;
`;

const RowHeader = styled.div`
  background-color: #001F3F;
  display: flex;
   height: 45px;
  border-radius: 5px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Row = styled.div`
  background: white;
  border-radius: 5px;
  display: flex;
  height: 45px;
  align-items: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Info = styled.div`
  width: 9%;
  height: 50px;
  justify-content: center;
  text-align: center;
  word-break: break-word;
  font-size: 16px;
  span {
    font-weight: bold;
    color: white;
  }

    &:nth-of-type(1) {
        width: 13%;
    }
    &:nth-of-type(2) {
        width: 16%;
    }
    &:nth-of-type(8) {
        width: 6%;
    }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #001F3F;
  font-size: 16px;
`;


const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 8px;
  scroll-x: auto;
`;

const PageButton = styled.button`
  justify-content: center;
  border: none;
  font-size: 15px;
  width: 10px;
  height: 10px;
  background-color: ${({ active }) => (active ? "#001F3F" : "#eee")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  border-radius: 50px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
`;

const Ellipsis = styled.span`
  padding: 4px 10px;
  color: #666;
`;