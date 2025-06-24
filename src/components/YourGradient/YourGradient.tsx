import { useEffect, useState } from "react";
import styles from "./YourGradient.module.css";
import { getHighlighterSingleton } from "../../utils/shiki";

type Props = {
  codeSnippet: string;
};

export const YourGradient = ({ codeSnippet }: Props) => {
  const [html, setHtml] = useState("Loading...");

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

  // #TODO: Add copying gradient snippet feature

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className={styles.shikiWrapper}
    />
  );
};
