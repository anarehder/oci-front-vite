import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { TbFilterEdit } from "react-icons/tb";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from 'react-icons/md';
import { useTenancy } from "../contexts/TenancyContext";

function OrphanListComponent({ sectionRef }) {
  const { orphanList } = useTenancy();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentItems, setCurrentItems] = useState(orphanList);
  const sortOptions = [null, 'asc', 'desc'];
  const totalCusto = currentItems.reduce((soma, item) => {
    return soma + (item.custo_mes ?? 0);
  }, 0);
  const getNextDirection = (currentDirection) => {
    const currentIndex = sortOptions.indexOf(currentDirection);
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    return sortOptions[nextIndex];
  };

  const handleSort = (key) => {
    const newDirection = sortConfig.key === key ? getNextDirection(sortConfig.direction) : 'asc';
    setSortConfig({ key, direction: newDirection });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    if (sortConfig.direction === 'asc') return <MdOutlineArrowDropUp size={22} color="white"/>;
    if (sortConfig.direction === 'desc') return <MdOutlineArrowDropDown size={22} color="white"/>;
    return null;
  };

  useEffect(() => {
    const filtered = orphanList.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  
    setCurrentItems(filtered);  

    let sorted = [...filtered];
    if (sortConfig.key && sortConfig.direction) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
      setCurrentItems(sorted);
    }
  
  }, [orphanList, searchTerm, sortConfig]);

  return (
    <ComponentContainer ref={sectionRef}>
        <h2>ORFÃOS - {totalCusto.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })}</h2>
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
          <Info onClick={() => handleSort('display_name')}><span>Nome</span>{renderSortIcon('display_name')}</Info>
          <Info onClick={() => handleSort('tenancy_name')}><span>Tenancy</span>{renderSortIcon('tenancy_name')}</Info>
          <Info onClick={() => handleSort('is_boot_volume')}><span>BootVolume</span>{renderSortIcon('is_boot_volume')}</Info>
          <Info onClick={() => handleSort('is_orfao')}><span>Orfão</span>{renderSortIcon('is_orfao')}</Info>
          <Info onClick={() => handleSort('vpus_per_gb')}><span>VPUs<br/>[GB]</span>{renderSortIcon('vpus_per_gb')}</Info>
          <Info onClick={() => handleSort('size_in_gbs')}><span>Tamanho<br/>[GB]</span>{renderSortIcon('size_in_gbs')}</Info>
          <Info onClick={() => handleSort('lifecycle_state')}><span>Status</span>{renderSortIcon('lifecycle_state')}</Info>
          <Info onClick={() => handleSort('custo_mes')}><span>Custo/Mes </span>{renderSortIcon('custo_mes')}</Info>
          <Info><span>Ações</span></Info>
        </RowHeader>
        </ListHeader>
        <List>
        {currentItems.length === 0 ? 
        <h2>Sem informações para exibir...</h2> :
        currentItems.map((item, index) => (
          <Row key={index}>
            <Info>{item.display_name}</Info>
            <Info>{item.tenancy_name}</Info>
            <Info>{item.is_boot_volume === "N" ? "Não" : "Sim"}</Info>
            <Info>{item.is_orfao === "N" ? "Não" : "Sim"}</Info>
            <Info>{item.vpus_per_gb}</Info>
            <Info>{item.size_in_gbs}</Info>
            <Info>{item.lifecycle_state}</Info>
            <Info>R$ {(item.custo_mes ?? 0).toFixed(2).replace('.', ',')}</Info>
            <Info>
              <EditButton
                onClick={() =>
                  alert(`Editar ${item.display_name}, ${item.tenancy_name}`)
                }
              >
                <FaEdit size={24} />
              </EditButton>
            </Info>
          </Row>
        ))}
      </List>
    </ComponentContainer>
  );
}

export default OrphanListComponent;

const ComponentContainer = styled.div`
    width: 92%;
    margin-top: 30px;
    position: relative;
    flex-direction: column;
    justify-content: flex-start;

    color: #021121;
    overflow-y: hidden;
    overflow-x: hidden;
    h2 {
        height: 40px;
        display: flex;
        align-items: center;
    }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: absolute;
  right: 0;
  height: 40px;
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
  margin-top: 30px;
  flex-direction: column;
  gap: 5px;
  font-size: 20px;
`

const List = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-start;
  flex-direction: column;
  font-size: 20px;
  margin-bottom: 50px;
  h2 {
    line-height: 50px;
  }
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
  border-radius: 2px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #a0a1aa;
`;

const Info = styled.div`
    width: 7%;
    height: 50px;
    justify-content: center;
    text-align: center;
    word-break: break-word;
    font-size: 15px;
    align-items: center;

    span {
        font-weight: bold;
        color: white;
    }
    &:nth-of-type(1) {
        width: 18%;
    }
    &:nth-of-type(2) {
        width: 13%;
    }
    &:nth-of-type(3) {
        width: 9%;
    }
    &:nth-of-type(8) {
        width: 9%;
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