import ReactApexChart from 'react-apexcharts';

function RadialBarComponent({value}){
    // console.log(value);
    const chartData = {
        series: [value.toFixed(2)],
        options: {
        plotOptions: {
            radialBar: {
                startAngle: -120,
                endAngle: 120,
                hollow: {
                    margin: 0,
                    size: '75%',
                    image: undefined,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    position: 'front',
                    dropShadow: {
                        enabled: true,
                        top: 3,
                        left: 0,
                        blur: 4,
                        opacity: 0.24
                    }
                },
                track: {
                    background: '#fff',
                    strokeWidth: '67%',
                    margin: 0, // margin is in pixels
                    dropShadow: {
                        enabled: true,
                        top: -3,
                        left: 0,
                        blur: 4,
                        opacity: 0.35
                    }
                },
                dataLabels: {
                    show: true,
                    name: {
                    offsetY: -10,
                    show: false,
                    color: '#021121',
                    fontSize: '16px'
                    },
                    value: {
                    formatter: function(val) {
                        return val + "%";
                    },
                    color: '#021121',
                    fontSize: '18px',
                    show: true,
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#FF0000', '#ABE5A1'],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 85] // Stop em 75%
            }
        },
        stroke: {
            lineCap: 'round'
        },
        },
    
    
    };


    return (
        <>
        <ReactApexChart options={chartData.options} series={chartData.series} type="radialBar" width={150} height={180}/>
        </>
    )
}

export default RadialBarComponent;