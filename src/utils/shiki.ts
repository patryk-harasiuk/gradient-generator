import { createHighlighter } from "shiki";

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

export async function getHighlighterSingleton() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["vitesse-dark"],
      langs: ["css"],
    });
  }

  return highlighter;
}
