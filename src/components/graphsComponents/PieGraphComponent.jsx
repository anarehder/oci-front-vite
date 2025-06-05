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
        customScale: 0.85,
        donut: {
          size: '35%'
        },
        offsetY: -15
      },
      
    },
    labels: categorias.slice(0,5),
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
      fontSize: '10px',
      horizontalAlign:"left", // Centraliza os itens da legenda
      floating: true, // Não permite que a legenda flutue
      height: 80,
      offsetY: 5,
      markers: {
        size: 1,
        shape: 'line',
        strokeWidth: 1
      },
      itemMargin: {
          horizontal: -5,
          vertical: -6
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
        offsetY: 50,
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

  return (
    <Container>
      <Title>{nome}</Title>
      <Chart options={chartOptions} series={valores.slice(0,5)} type="donut" height='95%'/>
    </Container>
  );
};

export default PieGraphComponent;

const Container = styled.div`
  width: 30%;
  height: 400px;
  flex-direction: column;
  justify-content: flex-start;
  margin: 10px auto;
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
  font-size: 14px;
  margin-top: 15px;
  color: #333;
`;
