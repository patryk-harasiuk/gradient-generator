import styles from "./PrecisionInput.module.css";

export const PrecisionInput = () => {
  return (
    <div className={styles.inputWrapper}>
      <input className={styles.input} type="range" min="1" max="20" />
    </div>
  );
};
