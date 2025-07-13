import styles from "./ColorPickerButton.module.css";

type Props = {
  setColor: (value: string) => void;
  color: string;
  disabled?: boolean;
};

export const ColorPickerButton = ({ setColor, color, disabled }: Props) => {
  const hasNoColor = !color;

  return (
    <div
      className={`${styles.colorBoxWrapper} ${hasNoColor && styles.empty} ${disabled && styles.disabled}`}
    >
      <input
        className={styles.colorBox}
        type="color"
        value={color}
        disabled={disabled}
        onChange={(event) => {
          setColor(event.target.value);
        }}
      />
    </div>
  );
};
