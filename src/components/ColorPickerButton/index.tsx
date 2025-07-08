import styles from "./ColorPickerButton.module.css";

type Props = {
  setColor: (value: string) => void;
  value: string;
};

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

export const InactiveColorBox = () => (
  <div className={styles.inactiveButton}>
    <div className={styles.iconWrapper}></div>
  </div>
);
