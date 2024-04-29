import styles from "./AnglePicker.module.css";
import { AngleSVG } from "../AngleSVG";

export const AnglePicker = () => (
  <div className={styles.wrapper}>
    <div className={styles.innerWrapper}>
      <div className={styles.svgWrapper}>
        <AngleSVG />
      </div>

      <div className={styles.test}>
        <svg viewBox="0 0 200 200" className={styles.testSvg}>
          <circle></circle>
        </svg>
      </div>

      <div className={styles.rotationWrapper}>
        <button className={styles.rotationButton} />
      </div>

      <div className={styles.dot} />
    </div>
  </div>
);
