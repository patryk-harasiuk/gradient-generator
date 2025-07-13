/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Color } from "../../types";
import style from "./ColorPickingSection.module.css";
import { MouseEvent, useRef, useState, useEffect, DragEvent } from "react";
import { ColorPickerButton } from "./ColorPickerButton";

type DragInfo = {
  index: number;
  initialX: number;
  elementX: number;
};

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
  //   const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);
  //   const colorsRef = useRef<HTMLLinkElement[]>([]);
  const [draggedId, setDraggedId] = useState<number | null>(null);

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

  //   const handleMouseDown = (index: number, event: MouseEvent) => {
  //     const elementX = colorsRef.current[index]?.offsetLeft;
  //     const initialX = event.clientX;

  //     setDragInfo({ index, elementX, initialX });
  //   };

  //   const handleMouseMove = (event: MouseEvent) => {
  //     if (!dragInfo) return;

  //     const deltaX = event.clientX - dragInfo.initialX;
  //     const currentElement = colorsRef.current[dragInfo.index];
  //     currentElement.style.transform = `translateX(${deltaX}px)`;
  //     currentElement.style.zIndex = "10";
  //   };

  //   const handleMouseUp = () => {
  //     if (!dragInfo) return;

  //     const currentElement = colorsRef.current[dragInfo.index];
  //     currentElement.style.transform = "translateX(0px)";
  //     currentElement.style.zIndex = "1";
  //     setDragInfo(null);
  //   };

  const handleDragOver = (
    event: DragEvent<HTMLLIElement>,
    isActive: boolean
  ) => {
    if (isActive) event.preventDefault();
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
              <ColorPickerButton
                setColor={handleColorChange(colorObj.id)}
                color={colorObj.color || "#000000"}
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
