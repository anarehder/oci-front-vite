import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";
import dayjs from "dayjs";

const CreditPredictionChartComponent = ({ subsDetails, commitDetails }) => {
    //DO COMMIT
    const categorias = ["Valor Utilizado %", "Dias Decorridos %"];
    const duracaoAnosSub1 = Math.round(subsDetails[0].total_dias_contrato/365);
    let valorAnual = subsDetails[0].line_net_amount/duracaoAnosSub1;

    if (subsDetails.length > 1) {
        const fimCommit = dayjs(commitDetails[0].time_ended_commit);
        const inicioSubs = dayjs(subsDetails[1].time_start);
        //pego quantos meses de diferenca entre o inicio da outra subs e o fim do commit
        const diffMeses = fimCommit.diff(inicioSubs, 'month');
        const mesesContrato = Math.round(subsDetails[1].total_dias_contrato/30);
        const valorMensalSubs2 = (subsDetails[1].line_net_amount/mesesContrato);
        const addValor = diffMeses*valorMensalSubs2;
        valorAnual += addValor;
    }

    const porcentagemGasta = valorAnual !==0 ? (commitDetails[0].total_used/valorAnual)*100 : 0;
    const porcentagemDias = (commitDetails[0].dias_decorridos/365) * 100;
    const valores = [porcentagemGasta.toFixed(2), porcentagemDias.toFixed(2)];
    // console.log(valorAnual, commitDetails[0].total_used, "bar")
    // const predictedTotalDays = used_percentage > 0 ? (100 * dias_decorridos) / used_percentage : 0;
    // const predictedEndDate = dayjs().add(predictedTotalDays - dias_decorridos, "day").format("YYYY-MM-DD");
    // const [year, month, day] = predictedEndDate.split("-");
    // const formattedDate = `${month}-${day}-${year}`;
    // const willExceedBeforeTime = used_percentage > date_percentage;

    const chartOptions = {
        chart: {
            type: "bar",
            toolbar: { show: false }
        },
        xaxis: {
            categories: categorias,
        },
        yaxis: {
            labels: {
                decimalsInFloat: 0,
            },
        },
        tooltip: {
            theme: 'dark',
            x: {
                formatter: function (val) {
                    return `${val}`; // Aqui mostra o nome completo no tooltip
                }
            },
            y: {
                formatter: function (val) {
                    return `${val}%`; // Aqui mostra o nome completo no tooltip
                }
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 6,
                columnWidth: "45%",
            }
        },
        colors: [porcentagemGasta > porcentagemDias ? "#ff0000" : "#27A745"],
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val.toFixed(1)}%`,
        },
    };

    const series = [
        {
            name: [''],
            data: valores,
        },
    ];

    return (
    <Container>
    <Title>% Gastos Tenancy - Commit Atual</Title>
    <Chart options={chartOptions} series={series} type="bar" height={270}/>
    
    {/* {willExceedBeforeTime && predictedTotalDays - dias_decorridos < 10 && <Alert>Urgente</Alert>}  */}
    {porcentagemGasta > porcentagemDias ? 
    <Alert>Alerta: Consumo de crédito acelerado! </Alert> :
    <Alert>Controle de Custos OCI - OK</Alert>
    }
    {/* <Alert><div>Alerta: Consumo de crédito acelerado!</div>
    <div>Data prevista para 100% consumo: {formattedDate}</div></Alert>
    {! willExceedBeforeTime && <Alert>Controle de Custos OCI - OK</Alert>}  */}
    </Container>
  );
};

export default CreditPredictionChartComponent;

const Container = styled.div`
  width: 28%;
  height: 350px;
  margin: 20px auto;
  justify-content: flex-start;
  padding: 20px;
  border-radius: 16px;
  background-color: #f9f9f9;
  flex-direction: column;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  position: relative;
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
`;

const Title = styled.h2`
  text-align: center;
  font-size: 17px;
  color: #333;
`;

const Alert = styled.div`
    position: absolute;
    flex-direction: column;
    bottom: 20px;
    width: 100%;
    height: 40px;
    justify-content: center;
    div{
        align-items: center;
        justify-content: center;
        height: 20px;
    }

`