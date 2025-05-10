import styles from "./Header.module.css";

export const Header = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.heading}>Gradient Generator</h1>
    <p className={styles.paragraph}>Beautiful, luscious gradients ✨</p>
  </div>
);
