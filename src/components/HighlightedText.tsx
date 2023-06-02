import { useMemo } from "react";

interface HighlightedTextProps {
  text: string
  highlight: string
}

/**
 * The HighlightedText function uses the useMemo hook to render text with highlighted substrings based
 * on a given highlight string.
 * @param {HighlightedTextProps} - The `HighlightedText` function takes in two props: `text` and
 * `highlight`.
 * @returns The `HighlightedText` component is returning a span element that contains one or more span
 * elements, each of which represents a substring of the `text` prop that matches the `highlight` prop.
 * The `textMatch` variable is an array of substrings obtained by splitting the `text` prop using a
 * regular expression that matches the `highlight` string.
 */
function HighlightedText({ text, highlight }: HighlightedTextProps) {

  const textMatch = useMemo(() => {
    return text.split(new RegExp(`(${highlight})`, 'gi'));
  }, [text, highlight]);

  return (
    <span>
      {textMatch.map((text, index) => (
        <span
          key={index}
          className={`${text.toLowerCase() === highlight.toLowerCase() && 'highlight'}`}
        >
          {text}
        </span>
      ))}
    </span>
  );
}

export default HighlightedText;
