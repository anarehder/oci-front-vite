import styled from "styled-components";
import Chart from "react-apexcharts";

const ProjectsGraphsComponent = ({ projetos }) => {

    const STATUS_COLORS = {
        Desenho: "#d8b771", // amarelo
        Implementação: "#63778C", // azul
        Concluído: "#7b967b", // verde
    };
    const dadosBarra = projetos.map((projeto) => {
        let percentual = 0;
        if (projeto.status === "Desenho") percentual = 33;
        else if (projeto.status === "Implementação") percentual = 66;
        else if (projeto.status === "Concluído") percentual = 100;

        return {
            nome: projeto.idProjeto,
            percentual,
            status: projeto.status,
        };
    });

    const seriesBarra = [
    {
      name: "Conclusão",
      data: dadosBarra.map((p) => p.percentual),
    },
  ];

  const optionsBarra = {
    chart: { type: "bar" },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
      },
    },
    xaxis: {
      categories: dadosBarra.map((p) => p.nome),
      max: 100,
      labels: { formatter: (val) => `${val}%` },
    },
    colors: dadosBarra.map((p) => STATUS_COLORS[p.status]),
    tooltip: {
      y: { formatter: (val) => `${val}%` },
    },
    dataLabels: {
            enabled: true,
            formatter: (val) => `${val.toFixed(1)}%`,
        },
    legend: {
      show: false,
    },
  };

  const statusContagem = projetos.reduce(
    (acc, projeto) => {
      acc[projeto.status] += 1;
      return acc;
    },
    { Desenho: 0, Implementação: 0, Concluído: 0 }
  );

  const dadosPizza = Object.entries(statusContagem).map(([status, value]) => ({
    name: status,
    value,
  }));

  const seriesPizza = dadosPizza.map((item) => item.value);
  const optionsPizza = {
    labels: dadosPizza.map((item) => item.name),
    colors: dadosPizza.map((item) => STATUS_COLORS[item.name]),
    legend: {
      position: "bottom",
      fontSize: '14px',
      markers: {
        size: 7,
        shape: 'line',
        strokeWidth: 1
      },
      itemMargin: {
        horizontal:100,
        vertical: 0
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${((val / projetos.length) *100).toFixed(0)}%`,
      },
    },
  };

  return (
    <Container>
      <ChartWrapper>
        <Title>Progresso por Projeto</Title>
        <Chart options={optionsBarra} series={seriesBarra} type="bar" height={400} />
      </ChartWrapper>
      <ChartWrapper>
        <Title>Distribuição de Status</Title>
        <Chart options={optionsPizza} series={seriesPizza} type="pie" height={400} />
      </ChartWrapper>
    </Container>
  );
};

export default ProjectsGraphsComponent;

const Container = styled.div`
  display: grid;
  width: 90%;
  gap: 2rem;
  padding: 1rem;
  .apexcharts-tooltip {
            border-radius: 5px;
            display: flex;
            flex-wrap: wrap;
            width: 150px;
            margin-top: -40px;
            padding: 10px 10px;
            background-color: #f9f9f9;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
            word-wrap: break-word;
            white-space: normal;
        }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ChartWrapper = styled.div`
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;