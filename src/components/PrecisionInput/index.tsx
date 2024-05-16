import styles from "./PrecisionInput.module.css";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type Props = {
  setPrecision: Dispatch<SetStateAction<number>>;
  value: number;
};

export const PrecisionInput = ({ setPrecision, value }: Props) => {
  const handlePrecisionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrecision(+event.target.value);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.input}
        value={value}
        onChange={handlePrecisionChange}
        type="range"
        min="1"
        max="20"
      />
    </div>
  );
};
