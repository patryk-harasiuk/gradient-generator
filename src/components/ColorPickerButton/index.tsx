import styles from "./ColorPickerButton.module.css";

type Props = {
  setColor: (value: string) => void;
  value: string;
};

export const ColorPickerButton = ({ setColor, value }: Props) => (
  <button className={styles.button} type="button">
    <input
      className={styles.colorBox}
      type="color"
      value={value}
      onChange={(e) => {
        console.log(e.target.value, "value");
        setColor(e.target.value);
      }}
    />
  </button>
);
