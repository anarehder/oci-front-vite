import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

function MonthCostsGraphComponent({ data, subscriptionDetails }) {

    const anosContrato = Math.round(Number(subscriptionDetails.total_dias_contrato) / 365);
    const mediaMensal = ((Number(subscriptionDetails.total_value) / anosContrato) / 12);

    const currentDate = new Date();
    const sixMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 7));
    sixMonthsAgo.setDate(1);
    
    // Função para formatar a data como abreviação do mês
    const getMonthAbbreviation = (date) => {
        const monthNames = [
            "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
        ];
        return monthNames[date.getMonth()];
    };

    const groupByTenancy = data.reduce((acc, curr) => {
        const name = curr.tenancy_name;
        const month = new Date(curr.mes); // 'mes' é no formato 'YYYY-MM'
        month.setDate(month.getDate() + 1);

        // Verifica se o mês é maior ou igual ao mês de 6 meses atrás
        if (month >= sixMonthsAgo) {
            if (!acc[name]) acc[name] = [];
            acc[name].push({
                x: getMonthAbbreviation(month), // Aqui estamos pegando a abreviação do mês
                y: parseFloat(curr.cost_mes.toFixed(2)),
                usage: parseFloat(curr.usage_mes.toFixed(0)),
            });
        }
        return acc;
    }, {});

    const series = Object.entries(groupByTenancy).map(([name, values]) => ({
        name,
        data: values.map(({ x, y }) => ({ x, y })),
    }));
    
    const allYValues = series.flatMap(serie => serie.data.map(point => point.y));
    const maxDataY = Math.max(...allYValues);
    const maxY = Math.max(maxDataY, mediaMensal);

    const colors = [
        "#4e73df", "#ff6f61", "#5f5f5f", "#f4b400", "#0c9f4d",
        "#ea7a57", "#9b59b6", "#f39c12", "#2ecc71", "#e74c3c",
        "#3498db", "#9b59b6", "#f39c12", "#16a085", "#f1c40f",
        "#e67e22", "#1abc9c", "#2c3e50", "#8e44ad", "#c0392b",
        "#2980b9", "#7f8c8d", "#e74c3c", "#d35400", "#16a085",
        "#8e44ad", "#e67e22", "#ecf0f1", "#95a5a6", "#34495e"
    ];

    const fullOptions = {
        chart: {
            type: "line",
            toolbar: { show: false },
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'category',
            categories: Object.values(groupByTenancy).flat().map((item) => item.x),
        },
        yaxis: {
            max: maxY,
            // title: { text: 'Custo (R$)' },
            labels: {
                formatter: (val) => `${(val / 1000).toFixed(0)}K`,
            },
        },
        markers: {
            size: 5,
            strokeWidth: 2,
        },
        tooltip: {
            enabled: false,
            // y: {
            //     formatter: (val) => new Intl.NumberFormat('pt-BR').format(val)
            // },
            offsetX: 50,
            offsetY: -50,
        },
        colors,
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        legend: {
            show: false,
            position: 'bottom',
            floating: true,
            containerMargin: {
                top: 0,
                right: 0,
                bottom: 10,
                left: 0,
            },
        },
    };

    const oneOption = {
    chart: {
        type: "line",
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
        type: 'category',
        categories: Object.values(groupByTenancy).flat().map((item) => item.x),
    },
    yaxis: {
        max: 1.1*maxY,
        labels: {
            formatter: (val) => `${(val / 1000).toFixed(0)}K`,
        },
    },
    markers: {
        size: 5,
        strokeWidth: 2,
    },
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
            y: {
                formatter: function (val) {
                    return val.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    }); // R$ no tooltip
                }
            }
        },
    // dataLabels: {
    //     enabled: true,
    //     offsetX: -8, 
    //     offsetY: -8,
    //     formatter: (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val),
    // },
    colors: ["#017BFF"],
    stroke: {
        curve: 'smooth',
        width: 3,
    },
    annotations: {
        yaxis: [
          {
            y: mediaMensal , // Valor fixo de 3500
                borderColor: "#FF0000", // Cor da linha de referência
                label: {
                    borderColor: '#DC3544',
                    style: {
                        color: '#fff',
                        background: '#DC3544',
                    },
                    text: `Média Mensal:  ${mediaMensal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"})}`,
                }
            },
        ],
      },
    }

    return (
        <Container>
            <Title>Histórico de Consumo (Mensal)</Title>
            {
                series?.length > 3 ?
                    <Chart options={fullOptions} series={series} type="line" height={320} />
                    :
                    <Chart options={oneOption} series={series} type="line" height={320}/>
            }
        </Container>
    );
};
export default MonthCostsGraphComponent;

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