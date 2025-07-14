import { useState } from "react";
import styles from "./ColorPickerButton.module.css";

type Props = {
  setColor: (value: string) => void;
  color: string;
  activeColorsCount: number;
  disabled?: boolean;
  onRemove?: () => void;
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
        <button className={styles.removeButton} onClick={onRemove}>
          x
        </button>
      )}
    </div>
  );
};
