import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

function BarGraphComponent({ data, nome }) {
  const categorias = data.map((d) => d.categoria);
  const valores = data.map((d) => d.valor);

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false }
    },
    xaxis: {
      categories: categorias,
    },
    yaxis:{
      labels: {
        decimalsInFloat: 0,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%",
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#4e73df"],
  };

  const chartSeries = [
    {
      name: ['Custo Mensal R$'],
      data: valores,
    }
  ];

  return (
    <Container>
      <Title>{nome}</Title>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={320}
      />
    </Container>
  );
};

export default BarGraphComponent;

const Container = styled.div`
  width: 28%;
  height: 350px;
  flex-direction: column;
  justify-content: flex-start;
  margin: 20px auto;
  padding: 20px;
  border-radius: 16px;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 17px;
  margin-bottom: 10px;
  color: #333;
`;