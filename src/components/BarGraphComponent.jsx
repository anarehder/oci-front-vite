import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

function BarGraphComponent({ data }) {
    const categorias = data.data.map((d) => d.item);
    const valores = data.data.map((d) => d.valor);
  
    const chartOptions = {
      chart: {
        type: "bar",
        toolbar: { show: false }
      },
      xaxis: {
        categories: categorias,
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "45%",
        }
      },
      dataLabels: {
        enabled: true
      },
      colors: ["#4e73df"],
    };
  
    const chartSeries = [
      {
        name: data.nome,
        data: valores,
      }
    ];
  
    return (
      <Container>
        <Title>{data.nome}</Title>
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