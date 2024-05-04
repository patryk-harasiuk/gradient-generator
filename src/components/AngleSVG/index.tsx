import styles from "./AngleSVG.module.css";

export const AngleSVG = () => (
  <svg className={styles.svg}>
    <line x1="100%" y1="100%" x2="0" y2="0" className={styles.line}></line>
    <line x1="0" y1="100%" x2="100%" y2="0" className={styles.line}></line>
    <circle
      cx="50%"
      cy="50%"
      r="133.6"
      fill="none"
      stroke="var(--color-gray-100)"
      stroke-width="2"
      stroke-dasharray="0, 6"
      stroke-linecap="round"
    ></circle>

    <circle
      cx="50%"
      cy="50%"
      r="100.2"
      fill="none"
      stroke="var(--color-gray-100)"
      stroke-width="2"
      stroke-dasharray="0, 6"
      stroke-linecap="round"
    ></circle>
    <circle
      cx="50%"
      cy="50%"
      r="66.8"
      fill="none"
      stroke="var(--color-gray-100)"
      stroke-width="2"
      stroke-dasharray="0, 6"
      stroke-linecap="round"
    ></circle>
    <circle
      cx="50%"
      cy="50%"
      r="33.4"
      fill="none"
      stroke="var(--color-gray-100)"
      stroke-width="2"
      stroke-dasharray="0, 6"
      stroke-linecap="round"
    ></circle>
  </svg>
);
