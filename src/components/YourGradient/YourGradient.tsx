import { useEffect, useState } from "react";

import styles from "./YourGradient.module.css";
import { getHighlighterSingleton } from "../../utils/shiki";

type Props = {
  codeSnippet: string;
};

export const YourGradient = ({ codeSnippet }: Props) => {
  const [html, setHtml] = useState("Loading...");
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function highlight() {
      const highlighter = await getHighlighterSingleton();

      const result = highlighter.codeToHtml(codeSnippet, {
        lang: "css",
        theme: "vitesse-dark",
      });
      if (isMounted) setHtml(result);
    }

    highlight();

    return () => {
      isMounted = false;
    };
  }, [codeSnippet]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 1000);
    } catch (error) {
      console.error("Error happened during copying", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.textWrapper}>
        <span className={styles.text}>Your Gradient: </span>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className={styles.shikiWrapper}
      />
      <button
        className={styles.copyButton}
        disabled={isCopying}
        onClick={handleCopy}
      >
        <span>
          <CodeIcon />
        </span>

        <div className={styles.buttonTextWrapper}>
          <span
            className={`${styles.buttonText} ${
              isCopying ? styles.hidden : styles.visible
            }`}
          >
            Copy CSS
          </span>

          <span
            className={`${styles.buttonText} ${styles.overlay} ${
              isCopying ? styles.visible : styles.hidden
            }`}
          >
            Copied!
          </span>
        </div>
      </button>
    </div>
  );
};

const CodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m16 18 6-6-6-6" />
    <path d="m8 6-6 6 6 6" />
  </svg>
);
