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
      name: data.tenancy,
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
        height={350}
      />
    </Container>
  );
};

export default BarGraphComponent;

const Container = styled.div`
  width: 30%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 16px;
  background-color: #f9f9f9;
  flex-direction: column;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;