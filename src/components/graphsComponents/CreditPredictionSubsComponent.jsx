import styled from "styled-components";
import Chart from "react-apexcharts";

const CreditPredictionSubsComponent = ({ subsDetails }) => {
    const categorias = ["Valor Utilizado %", "Dias Decorridos %"];

    const porcentagemGasta = (subsDetails[0].used_amount/subsDetails[0].line_net_amount)*100;
    const porcentagemDias = (subsDetails[0].dias_decorridos/subsDetails[0].total_dias_contrato) * 100;
    const valores = [porcentagemGasta.toFixed(2), porcentagemDias.toFixed(2)];

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
    <Title>% Gastos Tenancy - Contrato em Uso</Title>
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

export default CreditPredictionSubsComponent;

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