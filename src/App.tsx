import "./App.css";
import { useState } from "react";
import { range } from "./utils/range";
import { ColorPickerButton } from "./components/ColorPickerButton";
import { PrecisionInput } from "./components/PrecisionInput";
import { AnglePicker } from "./components/AnglePicker";

function App() {
  const [colors, setColors] = useState(["#000066", "FFEA00"]);

  const colorStops = colors.join(", ");
  const backgroundImage = `linear-gradient(${colorStops})`;

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
          {range(1, 5).map((_, index) => {
            return (
              <li key={index}>
                <ColorPickerButton />
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
          <div>
            <span>Angle:</span>

            <AnglePicker />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
