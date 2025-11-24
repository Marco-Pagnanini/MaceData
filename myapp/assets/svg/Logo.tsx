import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
const MacerataCrest = () => (
    <Svg width="80" height="80" viewBox="0 0 100 100">
        {/* Scudo */}
        <Path
            d="M50 10 L20 20 L20 60 Q20 80 50 95 Q80 80 80 60 L80 20 Z"
            fill="#DC2626"
            stroke="#7C2D12"
            strokeWidth="2"
        />

        {/* Divisioni dello scudo */}
        <Rect x="20" y="20" width="60" height="1.5" fill="#7C2D12" />
        <Rect x="49.25" y="20" width="1.5" height="75" fill="#7C2D12" />
        <Rect x="20" y="57.5" width="60" height="1.5" fill="#7C2D12" />

        {/* Croce superiore sinistra */}
        <Path
            d="M35 25 L35 35 L30 35 L30 40 L35 40 L35 50 L40 50 L40 40 L45 40 L45 35 L40 35 L40 25 Z"
            fill="#F8FAFC"
        />

        {/* Cerchio superiore destro */}
        <Circle cx="65" cy="37.5" r="10" fill="#F8FAFC" stroke="#DC2626" strokeWidth="3" />
        <Rect x="58" y="36.25" width="14" height="2.5" fill="#DC2626" />

        {/* Cerchio inferiore sinistro */}
        <Circle cx="35" cy="70" r="10" fill="#F8FAFC" stroke="#DC2626" strokeWidth="3" />
        <Rect x="28" y="68.75" width="14" height="2.5" fill="#DC2626" />

        {/* Croce inferiore destra */}
        <Path
            d="M65 60 L65 70 L60 70 L60 75 L65 75 L65 85 L70 85 L70 75 L75 75 L75 70 L70 70 L70 60 Z"
            fill="#F8FAFC"
        />
    </Svg>
);

export default MacerataCrest
