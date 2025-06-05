import styled from "styled-components";
import Chart from "react-apexcharts";
import dayjs from "dayjs";

function PieGraphCommitComponent({ subsDetails, commitDetails }) {

  // const categorias = ["Crédito Utilizado", "Crédito Total"];
  const duracaoAnosSub1 = Math.round(subsDetails[0].total_dias_contrato / 365);
  let valorAnual = subsDetails[0].line_net_amount / duracaoAnosSub1;

  if (subsDetails.length > 1) {
    const fimCommit = dayjs(commitDetails[0].time_ended_commit);
    const inicioSubs = dayjs(subsDetails[1].time_start);
    //pego quantos meses de diferenca entre o inicio da outra subs e o fim do commit
    const diffMeses = fimCommit.diff(inicioSubs, 'month');
    const mesesContrato = Math.floor(subsDetails[1].total_dias_contrato / 30);
    const valorMensalSubs2 = (subsDetails[1].line_net_amount / mesesContrato);
    const addValor = diffMeses * valorMensalSubs2;
    valorAnual += addValor;
  }

  const valorUsado = commitDetails[0].total_used;
  const valorRestante = valorAnual - valorUsado;
  let categorias;
  let valores;

  if (valorRestante >= 0) {
    categorias = ["Crédito Utilizado", "Crédito Restante"];
    valores = [valorUsado, valorRestante];
  } else {
    categorias = ["Crédito Commit", "Valor Excedente"];
    valores = [valorAnual, Math.abs(valorRestante)];
  }
  // const valores = [valorUsado, valorRestante];
  
  const ultrapassouLimite = valorUsado > valorAnual;
  const colors = ultrapassouLimite ? ["#DC3544", "#FE2525"] : ["#DC3544", "#008FFB"];

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
    colors: colors

  };

  return (
    <Container>
      <Title>% Créditos Gastos - Commit Atual</Title>
      <Chart options={chartOptions} series={valores} type="donut" height='95%' />
    </Container>
  );
};

export default PieGraphCommitComponent;

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