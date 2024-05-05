import "./App.css";
import { useEffect, useState } from "react";
import { range } from "./utils/range";
import { ColorPickerButton } from "./components/ColorPickerButton";
import { PrecisionInput } from "./components/PrecisionInput";
import { AnglePicker } from "./components/AnglePicker";

const DEFAULT_COLORS = [
  {
    id: 1,
    color: "#1f005c",
  },
  {
    id: 2,
    color: "#ffb56b",
  },
  {
    id: 3,
    color: "",
  },
  {
    id: 4,
    color: "",
  },
  {
    id: 5,
    color: "",
  },
];

function App() {
  const [colors, setColors] = useState(DEFAULT_COLORS);
  const [angle, setAngle] = useState(0);

  const colorStops = colors.flatMap((colorObj) =>
    colorObj.color ? [colorObj.color] : []
  );

  const backgroundImage = `linear-gradient(${angle}deg,${colorStops})`;

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
        <span>Precision:</span>

        <PrecisionInput />
      </div>

      <div className="angle-box">
        <div>
          <span>Angle:</span>

          <AnglePicker angle={angle} setAngle={setAngle} />
        </div>
      </div>
    </div>
  );
}

export default App;
