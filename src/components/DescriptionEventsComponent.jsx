import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { TbFilterEdit } from "react-icons/tb";
import PaginationComponent from "./fixedComponents/PaginationComponent";

function DescriptionEventsComponent({eventsInfo}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventsInfo);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredEvents.slice(startIndex, endIndex);

  // console.log(filteredEvents.length, itemsPerPage, currentPage);
  useEffect(() => {
    setFilteredEvents(eventsInfo);
    setTotalPages(Math.ceil(eventsInfo.length / itemsPerPage));
  }, [eventsInfo, itemsPerPage, currentPage]);

  useEffect(() => {
    const filtered = eventsInfo.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredEvents(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [searchTerm]);

  
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
      <ListHeader>
        <RowHeader>
          <Info><span>Evento</span></Info>
          <Info><span>Descrição</span></Info>
          <Info><span>Ações</span></Info>
        </RowHeader>
      </ListHeader>
      <List>
        {currentItems.map((item, index) => (
          <Row key={index}>
            <Info>{item.eventName}</Info>
            <Info>{item.descricao_evento}</Info>
            <Info>
              <EditButton
                onClick={() =>
                  alert(`Editar ${item.eventName}, ${item.compartmentName}`)
                }
              >
                <FaEdit size={24} />
              </EditButton>
            </Info>
          </Row>
        ))}
      </List>
      <PaginationComponent total={filteredEvents.length} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} setTotalPages={setTotalPages}/>
    </ComponentContainer>
  );
}

export default DescriptionEventsComponent;


const ComponentContainer = styled.div`
    width: calc(100vw - 220px);
    height: 100vh;
    margin-left: 200px;
    margin-top: 90px;
    position: relative;

    flex-direction: column;
    justify-content: flex-start;

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

const ListHeader = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  gap: 5px;
  width: 95%;
  font-size: 20px;
`

const List = styled.div`
  display: flex;
  margin-top: 10px;
  max-height: 70%;
  flex-direction: column;
  gap: 10px;
  width: 95%;
  font-size: 20px;
  overflow-y: auto;
  scroll-y: auto;
  margin-top: 5px;
`;

const RowHeader = styled.div`
  background-color: #001F3F;
  display: flex;
  height: 45px;
  border-radius: 5px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  div:nth-of-type(3){
    margin-right: 15px;
  }
`;

const Row = styled.div`
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Info = styled.div`
    justify-content: center;
    text-align: center;
    word-break: break-word;
    font-size: 16px;
    line-height: 24px;
    span {
      font-weight: bold;
      color: white;
    }
    &:nth-of-type(1) {
        width: 16%;
    }
    &:nth-of-type(2) {
        width: 70%;
    }
    &:nth-of-type(3) {
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
