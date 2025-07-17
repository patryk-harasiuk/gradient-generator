import styles from "./ColorPickerInput.module.css";
import { RemoveSVG } from "./RemoveSVG";

type Props = {
  setColor: (value: string) => void;
  color: string;
  activeColorsCount: number;
  disabled?: boolean;
  onRemove?: () => void;
};

export const ColorPickerInput = ({
  setColor,
  color,
  activeColorsCount,
  disabled,
  onRemove,
}: Props) => {
  const shouldShowRemove = activeColorsCount > 1 && color;

  return (
    <div className={styles.colorPickerInputWrapper}>
      <div className={`${styles.inputWrapper} ${disabled && styles.disabled}`}>
        <input
          className={styles.input}
          type="color"
          value={color}
          disabled={disabled}
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
      </div>
      {shouldShowRemove && (
        <button className={`${styles.removeButton}`} onClick={onRemove}>
          <RemoveSVG />
        </button>
      )}
    </div>
  );
};
