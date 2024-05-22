import * as XLSX from 'xlsx';
import styled from 'styled-components';
import { GoArrowRight } from "react-icons/go";
import { TenancyContext } from '../contexts/TenancyContext';
import { useContext } from 'react';

const ExportToExcelLists = ({ machines }) => {
    const [tenancy] = useContext(TenancyContext);
    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        const title = [tenancy];
        const headers = ["Tenancy", "Maquina", "OCID", "Compartment", "AD", "Status", "OS", "Shape", "OCPU", "MEM", "Storage", "Custo Disco", "Custo Atual", "MaxCPU(%)", "MeanCPU(%)", "MaxMEM(%)", "MeanMEM(%)", "Dias Analisados", "Ajuste", "NewOCPU", "NewMEM", "Custo Resizing", "% Resizing", "Custo Reshape", "% Reshape", "VM.Standard.E5.Flex ?"];

        const footer = [
            [" "]
        ];

        const dataRows = machines.map(m =>[
            m.Tenancy,
            m.Name,
            m.OCID,
            m.Compartment,
            m.AD,
            m.Status,
            m.OS,
            m.Shape,
            m.OCPU,
            m.MEMORY_GB,
            m.Armazenamento_GB,
            m.Custo_de_Disco,
            m.Custo_Atual_de_Maquina_24x7,
            m.last30.MaxCPU,
            m.last30.MeanCPU,
            m.last30.MaxMEM,
            m.last30.MeanMEM,
            m.last30.DaysCount,
            m.last30.reshape,
            m.last30.newCPU,
            m.last30.newMEM,
            m.last30.newPrice.toFixed(2),
            (((m.last30.newPrice/m.Custo_Atual_de_Maquina_24x7)-1)*100).toFixed(2),
            m.last30.BestShapePrice.toFixed(2),
            (((m.last30.BestShapePrice/m.Custo_Atual_de_Maquina_24x7)-1)*100).toFixed(2),
            m.Shape === 'VM.Standard.E5.Flex' ? "BEST Shape" : "Demais Shapes"
        ]);

        const wsData = [title, headers, ...dataRows, ...footer];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, tenancy);
        XLSX.writeFile(wb, `${tenancy}_report.xlsx`);
    }
    

    return (
        <ExcelButton onClick={exportToExcel}>
            Exportar Para Excel
            <GoArrowRight size={24} />
        </ExcelButton>
    );
};

export default ExportToExcelLists;



const ExcelButton = styled.button`
    width: 170px;
    margin: 20px;
    position: absolute;
    right: 3%;
    top: 4%;
`