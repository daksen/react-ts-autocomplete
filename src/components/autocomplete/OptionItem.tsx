import { useMemo } from "react";
import HighlightedText from "./HighlightedText";

interface OptionItemProps<T> {
  option: T
  index: number
  inputValue: string
  debouncedValue?: string
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
  onSelect: (option: T) => void
  getOptionLabel: (option: T) => string
}

/**
 * This is a TypeScript React function that renders an option item with highlighted text and handles
 * selection.
 * @param {T} option - The option to be rendered as a list item in the dropdown menu. It can be of any
 * type, as it is a generic type parameter.
 * @param {number} index - The index of the current option item being rendered in the list.
 * @param {string} inputValue - The current value of the input field in a dropdown/select component.
 * @param {string} debouncedValue - Is an optional string parameter that represents
 * the debounced value of the user's input.
 * @param {number} selectedIndex - Is a state variable that keeps track of the
 * currently selected index in a list of options. It is used to highlight the currently selected option
 * and to determine which option to select when the user presses the enter key.
 * @param setSelectedIndex - Is a React state setter function that takes a new value of type 
 * `React.SetStateAction<number>`and updates the state of the selected index.
 * @param setShowOptions - Is a React state setter function that is used to update the
 * state of whether or not the options list should be displayed. It is likely used in conjunction with
 * a boolean state variable to conditionally render the options list.
 * @param onSelect - A function that takes an option as its argument and is called when that option is
 * selected.
 * @param getOptionLabel - Is a function that takes an option of type `T` and returns
 * a string label for that option. This label is used to display the option in the dropdown list and to
 * match against the user's input.
 */
function OptionItem<T>({
  option,
  index,
  inputValue,
  debouncedValue,
  selectedIndex,
  setSelectedIndex,
  setShowOptions,
  onSelect,
  getOptionLabel,
}: OptionItemProps<T>) {

  // Handle the selection of an option.
  const handleSelect = () => {
    onSelect(option);
    setSelectedIndex(-1);
    setShowOptions(false);
  }

  /* Setting the `highlight` variable to either the `debouncedValue` or the `inputValue`, depending on 
  whether `debouncedValue` is defined or not. */
  const highlight = debouncedValue !== undefined ? debouncedValue : inputValue;

  /* `optionLabel` is a string label for the `option`. It is generated by calling the `getOptionLabel`
  function passed as a prop to the component. */
  const  optionLabel = useMemo(() => getOptionLabel(option), [option, getOptionLabel]);

  return (
    <li
      className={`option-item ${index === selectedIndex && 'selected'}`}
      onMouseEnter={() => setSelectedIndex(index)}
      onClick={handleSelect}
    >
      <HighlightedText
        text={optionLabel}
        highlight={highlight}
      />
    </li>
  );
}

export default OptionItem;
