import styles from "./ColorPickerButton.module.css";
import { RemoveSVG } from "./RemoveSVG";

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
  const shouldShowRemove = activeColorsCount > 1 && color;

  return (
    <div
      className={`${styles.colorInputWrapper} ${!color && styles.empty} ${disabled && styles.disabled}`}
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
        <button className={`${styles.removeButton}`} onClick={onRemove}>
          <RemoveSVG />
        </button>
      )}
    </div>
  );
};
