import { Color } from "../../App";
import style from "./ColorPickingSection.module.css";
import { useRef } from "react";
import { ColorPickerButton } from "./ColorPickerButton";

type ColorPickingSectionProps = {
  colors: Color[];
  handleColorChange: (id: number) => (color: string) => void;
};

export const ColorPickingSection = ({
  colors,
  handleColorChange,
}: ColorPickingSectionProps) => {
  const colorPickerRef = useRef(null);

  return (
    <div className={style.colorsBox}>
      <span>Colors:</span>

      <ul>
        {colors.map((colorObj) => {
          return (
            <li key={colorObj.id} ref={colorPickerRef}>
              <ColorPickerButton
                setColor={handleColorChange(colorObj.id)}
                color={colorObj.color || "#000000"}
                disabled={
                  !colors.find(({ id }) => id === colorObj.id - 1)?.color
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
