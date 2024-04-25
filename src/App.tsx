import "./App.css";
import { useState } from "react";

function App() {
  const [colors, setColors] = useState([
    "hsl(240deg 100% 20%)",
    "hsl(55deg 100% 50%)",
  ]);

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

        <ul></ul>
      </div>
    </div>
  );
}

export default App;
