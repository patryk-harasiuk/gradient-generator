import "./App.css";

function App() {
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
