import { useState } from 'react';
import styled from 'styled-components';
import LiquidFillGauge from 'react-liquid-gauge';
import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';

function LiquidFillChart({ value, size }) {
    //   const [value, setValue] = useState(50);
    const radius = 200;
    // const startColor = '#6495ed'; // cornflowerblue
    // const endColor = '#dc143c'; // crimson
    // const interpolate = interpolateRgb(startColor, endColor);
    // //   const fillColor = interpolate(value / 100);
    // const getFillColor = (value) => {
    //     if (value < 50) return '#4caf50'; // verde
    //     if (value <= 75) return '#ff9800'; // laranja
    //     return '#f44336'; // vermelho
    // };
    // const fillColor = getFillColor(value);

    const getGradientColors = (value) => {
        if (value < 50) return ['#66bb6a', '#2e7d32']; // verde claro -> escuro
        if (value <= 75) return ['#ffb74d', '#ef6c00']; // laranja claro -> escuro
        return ['#e31a1c', '#b71c1c']; // vermelho claro -> escuro
    };

    const [startColor, endColor] = getGradientColors(value);
    const interpolate = interpolateRgb(startColor, endColor);
    const fillColor = interpolate(value / 100);
    const gradientStops = [
        {
      key: '0%',
      stopColor: color(fillColor).darker(0.5).toString(),
      stopOpacity: 1,
      offset: '0%'
    },
    {
      key: '50%',
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: '50%'
    },
    {
      key: '100%',
      stopColor: color(fillColor).brighter(0.5).toString(),
      stopOpacity: 0.5,
      offset: '100%'
    }
  ];

  return (
    <Container>
      <GaugeWrapper>
        <LiquidFillGauge
          width={size}
          height={size}
          value={value}
          percent="%"
          textSize={1}
          textOffsetX={0}
          textOffsetY={0}
          textRenderer={(props) => {
            const val = Math.round(props.value);
            const r = Math.min(props.height / 2, props.width / 2);
            const textPixels = (props.textSize * r / 2);
            return (
              <tspan>
                <tspan className="value" style={{ fontSize: textPixels }}>{val}</tspan>
                <tspan style={{ fontSize: textPixels * 0.6 }}>{props.percent}</tspan>
              </tspan>
            );
          }}
          riseAnimation
          waveAnimation
          waveFrequency={2}
          waveAmplitude={3}
          gradient
          gradientStops={gradientStops}
          circleStyle={{ fill: fillColor }}
          waveStyle={{ fill: fillColor }}
          textStyle={{ fill: color('#444').toString(), fontFamily: 'Arial' }}
          waveTextStyle={{ fill: color('#fff').toString(), fontFamily: 'Arial' }}
          onClick={() => setValue(Math.random() * 100)}
        />
      </GaugeWrapper>
    </Container>
  );
};

export default LiquidFillChart;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GaugeWrapper = styled.div`
  margin: 0 auto;
`;

const RefreshButton = styled.button`
  margin-top: 20px;
  width: 120px;
  padding: 8px;
  font-size: 16px;
  background-color: #6495ed;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #4169e1;
  }
`;