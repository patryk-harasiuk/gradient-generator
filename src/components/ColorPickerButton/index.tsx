import { useState } from "react";

import styles from "./ColorPickerButton.module.css";

export const ColorPickerButton = () => {
  const [color, setColor] = useState("#FF0000");

  return (
    <button className={styles.button} type="button">
      {/* <div className={styles.colorBox} /> */}

      <input
        className={styles.colorBox}
        type="color"
        value={color}
        onChange={(e) => {
          console.log(e.target.value, "value");
          setColor(e.target.value);
        }}
      />
    </button>
  );
};
