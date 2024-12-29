import styles from "./ColorPickerButton.module.css";

type Props = {
  setColor: (value: string) => void;
  value: string;
};

// const DEFAULT_COLOR_PICK = "#ff0000";

export const ColorPickerButton = ({ setColor, value }: Props) => {
  return (
    <div className={styles.colorBoxWrapper}>
      <input
        className={styles.colorBox}
        type="color"
        value={value}
        onChange={(e) => {
          setColor(e.target.value);
        }}
      />
    </div>
  );
};
