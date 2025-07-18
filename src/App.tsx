import "./App.css";
import chroma from "chroma-js";
import { useEffect, useMemo, useState } from "react";

import { PrecisionInput } from "./components/PrecisionInput";
import { AnglePicker } from "./components/AnglePicker";
import { Bezier } from "./components/EasingCurvePicker/EasingCurvePicker";
import { GradientBackground } from "./components/GradientBackground/GradientBackground.tsx";
import { Header } from "./components/Header/Header.tsx";
import type { Coordinates } from "./types.ts";
import { generateGradientStops } from "./utils/generateGradientStops.ts";
import { DEFAULT_COLORS, VIEWBOX_SIZE } from "./const.ts";
import { YourGradient } from "./components/YourGradient/YourGradient.tsx";
import { formatGradientCssBlock } from "./utils/formatGradientCssBlock.ts";
import { ColorPickingSection } from "./components/ColorPickingSection/index.tsx";

type Bezier = {
  startPoint: Coordinates;
  firstControlPoint: Coordinates;
  secondControlPoint: Coordinates;
  endPoint: Coordinates;
  draggingPointId: string | null;
};

const DEFAULT_START_POINT: Coordinates = { x: 0, y: VIEWBOX_SIZE };
const DEFAULT_END_POINT: Coordinates = { x: VIEWBOX_SIZE, y: 0 };
const DEFAULT_FIRST_CONTROL_POINT = { x: 76, y: 152 };
const DEFAULT_SECOND_CONTROL_POINT = { x: 152, y: 76 };

function App() {
  const [colors, setColors] = useState(DEFAULT_COLORS);
  const [precision, setPrecision] = useState(4);
  const [angle, setAngle] = useState(45);
  const [firstControlPoint, setFirstControlPoint] = useState<Coordinates>(
    DEFAULT_FIRST_CONTROL_POINT
  );
  const [secondControlPoint, setSecondControlPoint] = useState<Coordinates>(
    DEFAULT_SECOND_CONTROL_POINT
  );
  const [startPoint, setStartPoint] =
    useState<Coordinates>(DEFAULT_START_POINT);
  const [endPoint, setEndPoint] = useState<Coordinates>(DEFAULT_END_POINT);

  const parsedColors = useMemo(
    () => colors.filter(({ color }) => !!color).map(({ color }) => color),
    [colors]
  );

  const numberOfStops = parsedColors.length + precision - 1;

  const gradientStops = useMemo(() => {
    const stops = generateGradientStops(
      numberOfStops,
      startPoint,
      firstControlPoint,
      secondControlPoint,
      endPoint
    );

    return stops;
  }, [
    numberOfStops,
    startPoint,
    firstControlPoint,
    secondControlPoint,
    endPoint,
  ]);

  const colorsWithMidpoints = useMemo(() => {
    return chroma
      .scale(parsedColors)
      .mode("hcl")
      .colors(gradientStops.length)
      .map((color, index) => `${chroma(color).css()} ${gradientStops[index]}%`);
  }, [parsedColors, gradientStops]);

  const backgroundImage = `linear-gradient(${angle}deg,${colorsWithMidpoints})`;
  const codeSnippet = `.gradient {${backgroundImage}}`;

  useEffect(() => {
    document.documentElement.style.setProperty("--gradient", backgroundImage);
  }, [backgroundImage]);

  const handleColorChange = (id: number) => (color: string) => {
    const updatedColors = colors.map((colorObj) => {
      if (colorObj.id === id) {
        return { ...colorObj, color };
      } else {
        return colorObj;
      }
    });

    setColors(updatedColors);
  };

  return (
    <div className="wrapper">
      <Header />
      <GradientBackground />
      <ColorPickingSection
        colors={colors}
        setColors={setColors}
        handleColorChange={handleColorChange}
      />

      <PrecisionInput value={precision} setPrecision={setPrecision} />

      <div className="pickers">
        <AnglePicker angle={angle} setAngle={setAngle} />

        <Bezier
          startPoint={startPoint}
          endPoint={endPoint}
          onFirstControlPointChange={setFirstControlPoint}
          onEndPointChange={setEndPoint}
          onSecondControlPointChange={setSecondControlPoint}
          onStartPointChange={setStartPoint}
          firstControlPoint={firstControlPoint}
          secondControlPoint={secondControlPoint}
        />
      </div>

      <YourGradient codeSnippet={formatGradientCssBlock(codeSnippet)} />
    </div>
  );
}

export default App;
