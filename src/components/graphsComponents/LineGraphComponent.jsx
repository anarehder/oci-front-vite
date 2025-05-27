import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

function LineGraphComponent({ data, nome }) {

  function formatISODateWithoutTimezone(isoString) {
  const date = new Date(isoString);

  const pad = (num) => num.toString().padStart(2, '0');

  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1); // meses começam do 0
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

  const categorias = data.map((d) => formatISODateWithoutTimezone(d.item));
  const valores = data.map((d) => d.valor);

  const chartOptions = {
    chart: {
        type: "line",
    },
    dataLabels: {
      enabled: false
    },
    yaxis: {
        labels: {
            formatter: (val) => `${(val).toFixed(0)}%`,
        },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
      colors: ["#4e73df"],
      strokeColors: "#fff",
      strokeWidth: 3,
    },
    xaxis: {
      categories: categorias, // seu array de datas formatadas
      labels: {
        rotate: -45,
      },
    },
    colors: ["#4e73df"],
    tooltip: {
        shared: false,
        followCursor: false,
        intersect: false,
        onDatasetHover: {
            highlightDataSeries: false,
        },
        style: {
            fontSize: '12px',
            fontFamily: 'Arial',
            },
            theme: 'dark',
            x: {
                show: true,
            },
        },
  };

  const chartSeries = [
    {
      name: nome,
      data: valores,
    },
  ];

  return (
    <Container>
      <Title>{nome}</Title>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={500}
      />
    </Container>
  );
}
export default LineGraphComponent;

const Container = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 16px;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  .apexcharts-tooltip {
            border-radius: 5px;
            width: 200px;
            margin-top: -90px;
            padding: 10px 20px;
            background-color: #f9f9f9;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
            color: orange !important;
        }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 17px;
  margin-bottom: 10px;
  color: #333;
`;