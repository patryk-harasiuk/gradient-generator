import "./App.css";
import chroma from "chroma-js";
import { useEffect, useState } from "react";
import { ColorPickerButton } from "./components/ColorPickerButton";
import { PrecisionInput } from "./components/PrecisionInput";
import { AnglePicker } from "./components/AnglePicker";
import { Bezier } from "./components/EasingCurvePicker/EasingCurvePicker";

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

  // chroma.scale(['white', 'black']).colors(12);

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
      <div className="heading-wrapper">
        <h1 className="gradient-heading">Gradient Generator</h1>
        <p className="paragraph">Beautiful, luscious gradients ✨</p>
      </div>
      <div className="gradient-box-background">
        <div className="gradient-box-wrapper">
          <div className="gradient-box" />
        </div>
      </div>
      <div className="colors-box">
        <span>Colors:</span>

        <ul>
          {colors.map((colorObj) => {
            return (
              <li key={colorObj.id}>
                <ColorPickerButton
                  setColor={handleColorChange(colorObj.id)}
                  value={colorObj.color}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="precision-box">
        <div className="precision-box-information">
          <span>Precision:</span>
          <span>{precision}</span>
        </div>

        <PrecisionInput value={precision} setPrecision={setPrecision} />
      </div>

      <div className="angle-box">
        <div>
          <span>Angle:</span>

          <AnglePicker angle={angle} setAngle={setAngle} />
        </div>
      </div>

      <div className="easing-curve-box">
        <div style={{ width: "250px" }}>
          <span>Easing Curve:</span>

          {/* <div style={{width: '260px', height:'260px', display:'flex', justifyContent:'center', alignItems:'center', position:}}> */}
          <Bezier viewBoxWidth={250} viewBoxHeight={250} />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
