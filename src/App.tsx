import "./App.css";
import chroma from "chroma-js";
import { useEffect, useState } from "react";
import { ColorPickerButton } from "./components/ColorPickerButton";
import { PrecisionInput } from "./components/PrecisionInput";
import { AnglePicker } from "./components/AnglePicker";
import { Bezier } from "./components/EasingCurvePicker/EasingCurvePicker";
import { GradientBackground } from "./components/GradientBackground/GradientBackground.tsx";
import { Header } from "./components/Header/Header.tsx";

const DEFAULT_COLORS = [
  {
    id: 1,
    color: "#1f005c",
  },
  {
    id: 2,
    color: "#ffb56b",
  },
  // {
  //   id: 3,
  //   color: "",
  // },
  // {
  //   id: 4,
  //   color: "",
  // },
  // {
  //   id: 5,
  //   color: "",
  // },
];

function App() {
  const [colors, setColors] = useState(DEFAULT_COLORS);
  const [precision, setPrecision] = useState(1);
  const [angle, setAngle] = useState(0);

  const parsedColors = colors.flatMap((colorObj) =>
    colorObj.color ? [colorObj.color] : []
  );

  const colorsWithMidpoints = chroma
    .scale(parsedColors)
    .mode("lch")
    .colors(precision + colors.length)
    .map((color) => chroma(color).css());

  console.log(colorsWithMidpoints, "with midpoints");

  const backgroundImage = `linear-gradient(${angle}deg,${colorsWithMidpoints})`;

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
      <div className="colors-box">
        <span>Colors:</span>

        <ul>
          {colors.map((colorObj) => {
            return (
              <li key={colorObj.id}>
                <ColorPickerButton
                  setColor={() => handleColorChange(colorObj.id)}
                  value={colorObj.color}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <PrecisionInput value={precision} setPrecision={setPrecision} />

      <AnglePicker angle={angle} setAngle={setAngle} />

      <Bezier
        viewBoxWidth={230}
        viewBoxHeight={230}
        precision={precision + colors.length}
      />
    </div>
  );
}

export default App;
