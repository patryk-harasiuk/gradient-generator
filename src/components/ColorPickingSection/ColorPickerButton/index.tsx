import { useState } from "react";
import styles from "./ColorPickerButton.module.css";
import { useSpring, animated } from "@react-spring/web";
import { RemoveSVG } from "./RemoveSVG";

type Props = {
  setColor: (value: string) => void;
  color: string;
  activeColorsCount: number;
  onRemove: () => void;
  disabled?: boolean;
};

export const ColorPickerButton = ({
  setColor,
  color,
  activeColorsCount,
  disabled,
  onRemove,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const shouldShowRemove = activeColorsCount > 1 && color && isHovered;

  const deleteButtonStyles = useSpring({
    config: { tension: 220, friction: 20 },
    opacity: isHovered && shouldShowRemove ? 1 : 0,
    transform:
      isHovered && shouldShowRemove ? `translateY(0px)` : `translateY(10px)`,
  });

  return (
    <div
      className={`${styles.colorInputWrapper} ${!color && styles.empty} ${disabled && styles.disabled}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <input
        className={styles.colorInput}
        type="color"
        value={color}
        disabled={disabled}
        onChange={(event) => {
          setColor(event.target.value);
        }}
      />
      {shouldShowRemove && (
        <animated.button
          className={styles.removeButton}
          style={deleteButtonStyles}
          onClick={onRemove}
        >
          <RemoveSVG />
        </animated.button>
      )}
    </div>
  );
};
