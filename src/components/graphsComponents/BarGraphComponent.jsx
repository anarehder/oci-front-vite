import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

function BarGraphComponent({ data, nome }) {
  const categorias = data.map((d) => d.categoria);
  const valores = data.map((d) => d.valor);

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      // dataLabels: { show: false }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: categorias,
      labels: {
        formatter: function (value) {
          return value.length > 12 ? value.slice(0, 12) + "..." : value;
        }
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        formatter: function (val) {
          return val; // Aqui mostra o nome completo no tooltip
        }
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
    yaxis: {
      labels: {
        formatter: function (value) {
          return Math.round(value); // força a exibição como inteiro
        }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "50%",
      },
    },
    colors: ["#017BFF"],
  };

  const chartSeries = [
    {
      name: ['Custo'],
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
  .apexcharts-tooltip {
            border-radius: 5px;
            display: flex;
            flex-wrap: wrap;
            width: 170px;
            margin-top: 50px;
            padding: 10px 10px;
            background-color: #f9f9f9;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
            color: orange !important;
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