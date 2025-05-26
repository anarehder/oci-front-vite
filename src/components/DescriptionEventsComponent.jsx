import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { TbFilterEdit } from "react-icons/tb";
import PaginationComponent from "./fixedComponents/PaginationComponent";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from 'react-icons/md';

function DescriptionEventsComponent({eventsInfo, eventsDescription}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventsInfo);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentItems, setCurrentItems] = useState(eventsInfo.slice(0,10));
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const sortOptions = [null, 'asc', 'desc'];

  const getNextDirection = (currentDirection) => {
    const currentIndex = sortOptions.indexOf(currentDirection);
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    return sortOptions[nextIndex];
  };

  const handleSort = (key) => {
    const newDirection = sortConfig.key === key ? getNextDirection(sortConfig.direction) : 'asc';
    setSortConfig({ key, direction: newDirection });
    setCurrentPage(1); // opcional: resetar para a primeira página após sort
  };

    const renderSortIcon = (key) => {
      if (sortConfig.key !== key) return null;
      if (sortConfig.direction === 'asc') return <MdOutlineArrowDropUp size={22} color="white"/>;
      if (sortConfig.direction === 'desc') return <MdOutlineArrowDropDown size={22} color="white"/>;
      return null;
    };



      useEffect(() => {
        // Passo 1: filtrar
        const filtered = eventsInfo.filter((item) =>
          Object.values(item).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      
        setFilteredEvents(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setCurrentPage((prev) => Math.min(prev, Math.ceil(filtered.length / itemsPerPage))); // evita página inválida
      
        // Passo 2: sort
        let sorted = [...filtered];
        if (sortConfig.key && sortConfig.direction) {
          sorted.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
          });
        }
      
        // Passo 3: paginar
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentItems(sorted.slice(startIndex, endIndex));
      }, [eventsInfo, searchTerm, sortConfig, currentPage, itemsPerPage]);
    
  useEffect(() => {
    setFilteredEvents(eventsInfo);
    setTotalPages(Math.ceil(eventsInfo.length / itemsPerPage));
  }, [eventsInfo, itemsPerPage]);

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
          <Info onClick={() => handleSort('eventName')}><span>Evento</span>{renderSortIcon('eventName')}</Info>
          <Info><span>Descrição</span></Info>
          <Info><span>Ações</span></Info>
        </RowHeader>
      </ListHeader>
      <List>
        {currentItems.map((item, index) => (
          <Row key={index}>
            <Info>{item.eventName}</Info>
            <Info>{eventsDescription(item)}</Info>
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
    justify-content: flex-start;
    text-align: left;
    margin-left: 15px;
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
