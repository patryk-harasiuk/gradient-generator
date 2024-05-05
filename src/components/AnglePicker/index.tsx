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
    handleMouseClick(event);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseClick = (event: MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;

    const centerY = rect.top + rect.height / 2;
    const clickedX = event.clientX - centerX;
    const clickedY = event.clientY - centerY;

    console.log(centerY, "centerY");
    console.log(centerX, "centerX");
    console.log(clickedX, "clickedX");
    console.log(clickedY, "clickedY");

    let newAngle = (Math.atan2(clickedY, clickedX) * 180) / Math.PI;

    newAngle += 90;

    // Adjust the angle range to be between 0 and 360 degrees
    newAngle = (newAngle + 360) % 360;

    // Round the angle to the nearest multiple of 5
    newAngle = Math.round(newAngle / 5) * 5;

    newAngle = newAngle < 0 ? newAngle + 360 : newAngle;

    setAngle(newAngle);

    console.log(newAngle < 0 ? newAngle + 360 : newAngle, "newAngle");
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;

    handleMouseClick(event);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.svgWrapper}>
          <AngleSVG />
        </div>

        <div className={styles.svgCoverWrapper}>
          <svg viewBox="0 0 200 200" className={styles.svgCover}>
            <circle></circle>
          </svg>
        </div>

        <div
          className={styles.rotationWrapper}
          onClick={handleMouseClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
          style={{ "--rotation": `${angle}deg` } as CSSProperties}
        >
          <button className={styles.rotationButton} ref={rotationButtonRef} />
        </div>

        <div className={styles.dot} />
      </div>
    </div>
  );
};
