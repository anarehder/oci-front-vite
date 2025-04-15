import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

function PieGraphComponent({ data }){
  const labels = data.data.map((d) => d.item);
  const values = data.data.map((d) => d.valor);

  const chartOptions = {
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: '35%'
        },
      },
    },
    labels: labels,
    dataLabels: {
      enabled: true,
      textAnchor: 'middle',
      fontSize: '25px',
      offsetX: 20,
      formatter: function (val) {
        return `${val.toFixed(1)}%`;
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
      },
    },
    legend: {
      show: true, // Exibe a legenda
      position: "bottom", // Coloca a legenda embaixo
      fontSize: '14px',
      horizontalAlign: "center", // Centraliza os itens da legenda
      floating: false, // Não permite que a legenda flutue
      markers: {
        size: 7,
        shape: 'line',
        strokeWidth: 1
      },
      itemMargin: {
        horizontal: 20,
        vertical: 0
      },
    },
    tooltip: {
      style: {
        fontSize: '16px',
      },
      fixed: {
        enabled: true,
        position: 'topLeft',
        offsetX: 0,
        offsetY: 100,
      },
      y: {
        formatter: (val) => `R$ ${val.toLocaleString()}`,
      },
    },
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
  };

  return (
    <Container>
      <Title>{data.nome}</Title>
      <Chart options={chartOptions} series={values} type="donut" height={400} />
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