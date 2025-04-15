import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

function LineGraphComponent({ data }) {
  const categorias = data.data.map((d) => d.item);
  const valores = data.data.map((d) => d.valor);

  const chartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 6,
      colors: ["#4e73df"],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: categorias,
    },
    colors: ["#4e73df"],
    annotations: {
      yaxis: [
        {
          y: 3500, // Valor fixo de 3500
          borderColor: "#FF0000", // Cor da linha de referência
        },
      ],
    },
  };

  const chartSeries = [
    {
      name: data.nome,
      data: valores,
    },
  ];

  return (
    <Container>
      <Title>{data.nome}</Title>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={350}
      />
    </Container>
  );
}
export default LineGraphComponent;

const Container = styled.div`
  width: 30%;
  flex-direction: column;
  margin: 20px auto;
  padding: 20px;
  border-radius: 16px;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;
