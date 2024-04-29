import styles from "./AngleSVG.module.css";

export const AngleSVG = () => (
  <svg className={styles.svg}>
    <line x1="0" y1="167" x2="334" y2="167" className={styles.line}></line>
    <line x1="167" y1="0" x2="167" y2="334" className={styles.line}></line>
    <circle
      cx="167"
      cy="167"
      r="133.6"
      fill="none"
      stroke="var(--color-gray-100)"
      stroke-width="2"
      stroke-dasharray="0, 6"
      stroke-linecap="round"
    ></circle>
    <circle
      cx="167"
      cy="167"
      r="100.2"
      fill="none"
      stroke="var(--color-gray-100)"
      stroke-width="2"
      stroke-dasharray="0, 6"
      stroke-linecap="round"
    ></circle>
    <circle
      cx="167"
      cy="167"
      r="66.8"
      fill="none"
      stroke="var(--color-gray-100)"
      stroke-width="2"
      stroke-dasharray="0, 6"
      stroke-linecap="round"
    ></circle>
    <circle
      cx="167"
      cy="167"
      r="33.4"
      fill="none"
      stroke="var(--color-gray-100)"
      stroke-width="2"
      stroke-dasharray="0, 6"
      stroke-linecap="round"
    ></circle>
  </svg>
);
