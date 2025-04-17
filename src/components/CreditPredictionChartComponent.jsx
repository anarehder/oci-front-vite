import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";
import dayjs from "dayjs";

const CreditPredictionChartComponent = ({ creditsOCI }) => {
    const {
        used_percentage,
        date_percentage,
        dias_decorridos,
    } = creditsOCI[0];

    const categorias = ["Valor Utilizado %", "Dias Decorridos %"];
    const valores = [parseFloat(used_percentage.toFixed(2)), parseFloat(date_percentage.toFixed(2))];

    const predictedTotalDays = used_percentage > 0 ? (100 * dias_decorridos) / used_percentage : 0;
    const predictedEndDate = dayjs().add(predictedTotalDays - dias_decorridos, "day").format("YYYY-MM-DD");
    const [year, month, day] = predictedEndDate.split("-");
    const formattedDate = `${month}-${day}-${year}`;
    const willExceedBeforeTime = used_percentage > date_percentage;

    const chartOptions = {
        chart: {
            type: "bar",
            toolbar: { show: false }
        },
        xaxis: {
            categories: categorias,
        },
        yaxis: {
            labels: {
                decimalsInFloat: 0,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 6,
                columnWidth: "45%",
            }
        },
        colors: [willExceedBeforeTime ? "#ff0000" : "#27A745"],
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val.toFixed(1)}%`,
        },
    };

    const series = [
        {
            name: ['Porcentagem'],
            data: valores,
        },
    ];

    return (
    <Container>
    <Title>Pedição Gastos Tenancy</Title>
    <Chart options={chartOptions} series={series} type="bar" height={300}/>
    
    {willExceedBeforeTime && predictedTotalDays - dias_decorridos < 10 && <Alert>Urgente</Alert>} 
    {willExceedBeforeTime && predictedTotalDays - dias_decorridos > 10 && 
    <Alert><div>Alerta: Consumo de crédito acelerado!</div>
    <div>Data prevista para 100% consumo: {formattedDate}</div></Alert>
    }
    {! willExceedBeforeTime && <Alert>Controle de Custos OCI - OK</Alert>} 
    </Container>
  );
};

export default CreditPredictionChartComponent;

const Container = styled.div`
  width: 30%;
  height: 400px;
  margin: 20px auto;
  justify-content: flex-start;
  padding: 20px;
  border-radius: 16px;
  background-color: #f9f9f9;
  flex-direction: column;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Alert = styled.div`
    position: absolute;
    flex-direction: column;
    bottom: 20px;
    width: 100%;
    height: 40px;
    justify-content: center;
    div{
        align-items: center;
        justify-content: center;
        height: 20px;
    }

`