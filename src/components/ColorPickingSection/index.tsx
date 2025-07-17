import type { Color } from "../../types";
import style from "./ColorPickingSection.module.css";
import { useState, DragEvent } from "react";
import { ColorPickerInput } from "./ColorPickerButton";

type ColorPickingSectionProps = {
  colors: Color[];
  setColors: React.Dispatch<React.SetStateAction<Color[]>>;
  handleColorChange: (id: number) => (color: string) => void;
};

export const ColorPickingSection = ({
  colors,
  setColors,
  handleColorChange,
}: ColorPickingSectionProps) => {
  const [draggedId, setDraggedId] = useState<number | null>(null);

  const activeColorsCount = colors.filter(({ color }) => !!color).length;

  const handleDragStart = (id: number, isActive: boolean) => {
    if (!isActive) return;
    setDraggedId(id);
  };

  const handleDrop = (targetId: number) => {
    if (draggedId === null || draggedId === targetId) return;

    const draggedIndex = colors.findIndex(({ id }) => id === draggedId);
    const targetIndex = colors.findIndex(({ id }) => id === targetId);

    const newColors = [...colors];
    const [moved] = newColors.splice(draggedIndex, 1);
    newColors.splice(targetIndex, 0, moved);

    setColors(newColors);
    setDraggedId(null);
  };

  const handleDragOver = (
    event: DragEvent<HTMLLIElement>,
    isActive: boolean
  ) => {
    if (isActive) event.preventDefault();
  };

  const handleRemoveColor = (idToRemove: number) => {
    const filteredColors = colors.filter(({ id }) => id !== idToRemove);

    const updatedColors = Array.from({ length: colors.length }, (_, index) => ({
      id: index + 1,
      color: filteredColors[index]?.color || "",
    }));

    setColors(updatedColors);
  };

  return (
    <div className={style.colorsBox}>
      <span>Colors:</span>

      <ul>
        {colors.map((colorObj) => {
          const isActive = !!colorObj.color;

          return (
            <li
              key={colorObj.id}
              draggable={isActive}
              onDragStart={() => handleDragStart(colorObj.id, isActive)}
              onDragOver={(event) => handleDragOver(event, isActive)}
              onDrop={isActive ? () => handleDrop(colorObj.id) : undefined}
              className={isActive ? style.active : ""}
            >
              <ColorPickerInput
                setColor={handleColorChange(colorObj.id)}
                color={colorObj.color}
                activeColorsCount={activeColorsCount}
                onRemove={() => handleRemoveColor(colorObj.id)}
                disabled={
                  colorObj.id > 1 &&
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
