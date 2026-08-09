import React from 'react';
import Svg, { Path, Text as SvgText } from 'react-native-svg';

const COLORS = ['#F4C24A', '#F49AC1', '#7EC4CF', '#A8E6A1', '#FFB4A2', '#C3AED6', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6B6B', '#B983FF', '#00C49A'];

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI)/180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

function describeSlice(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z `;
}

export default function WheelSvg({ numSlices, size = 250 }) {
  const radius = size / 2;
  const sliceAngle = 360 / numSlices;

  return (
    <Svg width = {size} height={size}>
      {Array.from({ length: numSlices }).map((_, i) => {
       const startAngle = i * sliceAngle;
        const endAngle = startAngle + sliceAngle;
        const path = describeSlice(radius, radius, radius, startAngle, endAngle);
        const labelPos = polarToCartesian(radius, radius, radius * 0.65, startAngle + sliceAngle / 2);

        return (
          <React.Fragment key={i}>
            <Path d={path} fill={COLORS[i % COLORS.length]} stroke="#1a1d21" strokeWidth={2} />
            <SvgText
              x={labelPos.x}
              y={labelPos.y}
              fontSize="16"
              fontWeight="bold"
              fill="#1a1d21"
              textAnchor="middle"
            >
              {i + 1}
            </SvgText>
          </React.Fragment>
        );
      })}
     </Svg>
  );
}

