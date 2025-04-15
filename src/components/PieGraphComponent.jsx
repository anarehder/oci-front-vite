import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

function PieGraphComponent({ data }){
  const labels = data.data.map((d) => d.item);
  const values = data.data.map((d) => d.valor);

  const chartOptions = {
    labels: labels,
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `${val.toFixed(1)}%`;
      },
    },
    legend: {
      show: true, // Exibe a legenda
      position: "bottom", // Coloca a legenda embaixo
      itemWidth: 30, // Ajusta o tamanho da legenda
      itemHeight: 15, // Ajusta a altura dos itens da legenda
      horizontalAlign: "center", // Centraliza os itens da legenda
      floating: false, // Não permite que a legenda flutue
    },
    tooltip: {
      y: {
        formatter: (val) => `R$ ${val.toLocaleString()}`,
      },
    },
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
  };

  return (
    <Container>
      <Title>{data.nome}</Title>
      <Chart options={chartOptions} series={values} type="pie" height={400} />
    </Container>
  );
};

export default PieGraphComponent;

const Container = styled.div`
  width: 28%;
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