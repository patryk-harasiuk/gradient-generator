import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  MouseEvent,
  useRef,
  useState,
} from "react";

import styles from "./AnglePicker.module.css";

import { AngleSVG } from "../AngleSVG";

type Props = {
  setAngle: Dispatch<SetStateAction<number>>;
  angle: number;
};

export const AnglePicker = ({ setAngle, angle }: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const rotationButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleMouseDown = (event: MouseEvent): void => {
    event.preventDefault();
    setIsDragging(true);
    handleMouseClick(event);
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  const handleMouseClick = (event: MouseEvent): void => {
    const rect: DOMRect = event.currentTarget.getBoundingClientRect();

    const centerX: number = rect.left + rect.width / 2;

    const centerY: number = rect.top + rect.height / 2;
    const clickedX: number = event.clientX - centerX;
    const clickedY: number = event.clientY - centerY;

    let newAngle: number = (Math.atan2(clickedY, clickedX) * 180) / Math.PI;

    newAngle += 90;

    // Adjust the angle range to be between 0 and 360 degrees
    newAngle = (newAngle + 360) % 360;

    // Round the angle to the nearest multiple of 5
    newAngle = Math.round(newAngle / 5) * 5;

    newAngle = newAngle < 0 ? newAngle + 360 : newAngle;

    setAngle(newAngle);
  };

  const handleMouseMove = (event: MouseEvent): void => {
    if (!isDragging) return;

    handleMouseClick(event);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoWrapper}>
        <span className={styles.angle}>Angle:</span>

        <span className={styles.angleValue}>{angle}deg</span>
      </div>

      <div className={styles.wheelWrapper}>
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
