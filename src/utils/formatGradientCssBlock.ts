export function formatGradientCssBlock(input: string): string {
  const match = input.match(/linear-gradient\((.*)\)/);
  if (!match) {
    return `.gradient {\n  background-image: linear-gradient();\n}`;
  }

  const gradientContent = match[1];

  const parts: string[] = [];
  let current = "";
  let depth = 0;

  for (let i = 0; i < gradientContent.length; i++) {
    const char = gradientContent[i];

    if (char === "(") depth++;
    if (char === ")") depth--;

    if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  if (current.trim()) parts.push(current.trim());

  const formatted = parts
    .map((line, i) => `    ${line}${i < parts.length - 1 ? "," : ""}`)
    .join("\n");

  return [
    ".gradient {",
    "  background-image: linear-gradient(",
    formatted,
    "  );",
    "}",
  ].join("\n");
}
