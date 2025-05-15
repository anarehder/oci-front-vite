import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

function PieGraphComponent({ data, nome, type }){
  const categorias = data.map((d) => d.categoria);
  const valores = data.map((d) => d.valor);

  const chartOptions = {
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: '35%'
        },
      },
    },
    labels: categorias,
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
      fontSize: '12px',
      horizontalAlign: "center", // Centraliza os itens da legenda
      floating: false, // Não permite que a legenda flutue
      markers: {
        size: 7,
        shape: 'line',
        strokeWidth: 1
      },
      itemMargin: {
        horizontal:15,
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
        formatter: function (val) {
          return val.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          }); // R$ no tooltip
        }
      }
    },
    colors: ["#DC3544", "#008FFB",  "#44aa66", "#efe302", "#f78325"],
  };
  const series = [
    {
        name: ['Valor'],
        data: valores,
    },
];
  return (
    <Container>
      <Title>{nome}</Title>
      <Chart options={chartOptions} series={valores} type="donut" height={350} />
    </Container>
  );
};

export default PieGraphComponent;

const Container = styled.div`
  width: 28%;
  height: 350px;
  flex-direction: column;
  margin: 20px auto;
  padding: 20px;
  border-radius: 16px;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  .apexcharts-tooltip {
            border-radius: 5px;
            display: flex;
            flex-wrap: wrap;
            width: 200px;
            padding: 10px 10px;
            background-color: #f9f9f9;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
            word-wrap: break-word;
            white-space: normal;
        }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 17px;
  margin-bottom: 10px;
  color: #333;
`;