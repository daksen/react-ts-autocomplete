import OptionItem from "./OptionItem";

interface OptionsListProps<T> {
  options: T[] | null
  inputValue: string
  debouncedValue?: string
  noOptionsLabel?: string
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
  onSelect: (option: T) => void
  getOptionLabel: (option: T) => string
}

/* The `OptionsList` function is a React component that takes in several props including an array of
options, an input value, a selected index, and several functions to handle state changes. It then
maps over the options array and renders an `OptionItem` component for each option. If there are no
options or the options array is not an array, it returns null. If there are no options and the
`debouncedValue` prop is undefined or truthy, it renders a "No options" message. */
/**
 * Component to handle state changes. It then maps over the options array and renders an `OptionItem` 
 * component for each option. If there are no options or the options array is not an array,
 * it returns null.
 * @param {T[]} options - Array of options to be displayed in a dropdown/select menu.
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
function OptionsList<T>({
  options,
  inputValue,
  debouncedValue,
  noOptionsLabel,
  selectedIndex, 
  setSelectedIndex, 
  setShowOptions,
  onSelect,
  getOptionLabel,
}: OptionsListProps<T>) {

  if (!options || !Array.isArray(options)) {
    return null;
  }
  
  return (
    <ul className="options-list" onMouseLeave={() => setSelectedIndex(-1)}>
      { options?.length > 0 && (
        options.map((option, index) => (
          <OptionItem<T>
            key={index}
            option={option}
            index={index}
            inputValue={inputValue}
            debouncedValue={debouncedValue}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            setShowOptions={setShowOptions}
            onSelect={onSelect}
            getOptionLabel={getOptionLabel}
          />
        ))
      )}
      {(debouncedValue === undefined || debouncedValue) && !options?.length && (
        <li className="no-options-label option-item">{noOptionsLabel || 'No options'}</li>
      )}
    </ul>
  );
}

export default OptionsList;
