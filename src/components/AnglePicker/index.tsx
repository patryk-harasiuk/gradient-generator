import { CSSProperties, Dispatch, MouseEvent, useRef, useState } from "react";

import styles from "./AnglePicker.module.css";

import { AngleSVG } from "../AngleSVG";

type Props = {
  setAngle: Dispatch<React.SetStateAction<number>>;
  angle: number;
};

export const AnglePicker = ({ setAngle, angle }: Props) => {
  const rotationButtonRef = useRef<HTMLButtonElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    setIsDragging(true);
    handleMouseMove(event);
  };

  const handleMouseUp = () => {
    console.log("handle mouse up");
    setIsDragging(false);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;

    console.log(centerX, "centerX");
    const centerY = rect.top + rect.height / 2;
    console.log(centerY, "centerY");
    const clickedX = event.clientX - centerX;
    const clickedY = event.clientY - centerY;

    console.log(clickedX, "clickedX");
    console.log(clickedY, "clickedY");

    let newAngle = (Math.atan2(clickedY, clickedX) * 180) / Math.PI;

    newAngle += 90;

    // Adjust the angle range to be between 0 and 360 degrees
    newAngle = (newAngle + 360) % 360;

    // Round the angle to the nearest multiple of 5
    newAngle = Math.round(newAngle / 5) * 5;
    setAngle(newAngle < 0 ? newAngle + 360 : newAngle);

    console.log(newAngle < 0 ? newAngle + 360 : newAngle, "newAngle");
  };

  const handleMouseClick = (event: MouseEvent) => {
    if (!isDragging) {
      handleMouseMove(event);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.svgWrapper}>
          <AngleSVG />
        </div>

        <div className={styles.test}>
          <svg viewBox="0 0 200 200" className={styles.testSvg}>
            <circle></circle>
          </svg>
        </div>

        <div
          className={styles.rotationWrapper}
          onClick={handleMouseMove}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ "--rotation": `${angle}deg` } as CSSProperties}
        >
          <button
            className={styles.rotationButton}
            ref={rotationButtonRef}
            onMouseDown={handleMouseDown}
          />
        </div>

        <div className={styles.dot} />
      </div>
    </div>
  );
};
