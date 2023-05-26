import { useMemo } from "react";

interface HighlightedTextProps {
  text: string
  highlight: string
}

/**
 * The function returns a React component that highlights a specific string within a given text.
 * @param {string} text - The text that needs to be highlighted.
 * @param {string} highlight - Is a string that represents the text that needs to be highlighted 
 * in the `text` parameter.
 * @returns This code is returning a React component that takes in two parameters: `text` and
 * `highlight`. It splits the `text` into an array of substrings based on the `highlight` string using
 * a regular expression.
 */
function HighlightedText({ text, highlight }: HighlightedTextProps) {

  /* `const textMatchs` is using the `useMemo` hook to ensure that the function is only 
  recomputed when either of these parameters change. The resulting array of substrings based on 
  the `highlight` string using a regular expression is used to render the highlighted text. */
  const textMatchs = useMemo(() => {
    return text.split(new RegExp(`(${highlight})`, 'gi'));
  }, [text, highlight]);

  return (
    <span>
      {textMatchs.map((text, index) => (
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
