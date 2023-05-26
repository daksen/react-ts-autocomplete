import { useState } from "react";
import OptionsList from "./OptionsList";

const KEY_CODES: Record<string, string> = {
  DOWN: "ArrowDown",
  UP: "ArrowUp",
  ENTER: "Enter",
  ESC: "Escape",
}

interface AutocompleteProps<T> {
  inputValue: string
  debouncedValue?: string
  options: T[] | null
  loading?: boolean
  showLoading?: boolean
  placeholder?: string
  noOptionsLabel?: string
  onSelect: (option: T) => void
  onInputChange: (value: string) => void
  getOptionLabel: (option: T) => string
}

/**
 * This is a TypeScript React function that renders an input field with a dropdown/select menu of 
 * options list and handle user input selection.
 * @param {T[]} options - Array of options to be displayed in a dropdown/select menu.
 * @param {string} inputValue - The current value of the input field in a dropdown/select component.
 * @param {string} debouncedValue - Is an optional string parameter that represents
 * the debounced value of the user's input.
 * @param onSelect - A function that takes an option as its argument and is called when that option is
 * selected.
 * @param getOptionLabel - Is a function that takes an option of type `T` and returns
 * a string label for that option. This label is used to display the option in the dropdown list and to
 * match against the user's input.
 */
function Autocomplete<T>({ 
  options,
  inputValue,
  debouncedValue,
  loading,
  showLoading,
  placeholder,
  noOptionsLabel,
  onSelect,
  onInputChange,
  getOptionLabel,
}: AutocompleteProps<T>) {

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  // Scrolls the selected element into view with a smooth behavior.
  const handleScroll = () => {
    setTimeout(() => {
      const selected = window.document.querySelector(".selected");
      if (selected) {
        selected.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 50);
  }

  /* `onArrowUp` is a function that decrements the `selectedIndex` state variable by 1 if there
  are options available and the current index is not 0. This is used to navigate through the
  options list using the up arrow key. */
  const onArrowUp = () => {
    if (options && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      handleScroll();
    }
  }

  /* `onArrowDown` is a function that increments the selected index if there are options
  available and the current index is not the last one. This is used to navigate through the
  options list using the down arrow key. */
  const onArrowDown = () => {
    if (options && selectedIndex < options.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      handleScroll();
    }
  }

  /* `onEnter` is a function that is called when the Enter key is pressed while the Autocomplete
  component is in focus. It checks if there are options available and if the selected index is
  valid, and then calls the `onSelect` function with the selected option as its argument. It
  also resets the selected index to -1 and hides the options list. */
  const onEnter = () => {
    if (options && options[selectedIndex]) {
      onSelect(options[selectedIndex]);
      setSelectedIndex(-1);
      setShowOptions(false);
    }
  }

  const onEscape = () => {
    onInputChange('');
    setSelectedIndex(-1);
  }

  /**
   * This function handles input keyboard events and executes specific operations based on the key pressed.
   * @param event - The `event` parameter is a `React.KeyboardEvent` object that represents a keyboard
   * event, such as a key press or release. It contains information about the key that was pressed.
   */
  const handlInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {   
    const KEY_ACTIONS = {
      [KEY_CODES.UP]: onArrowUp,
      [KEY_CODES.DOWN]: onArrowDown,
      [KEY_CODES.ENTER]: onEnter,
      [KEY_CODES.ESC]: onEscape,
    }

    if (KEY_ACTIONS[event.key]) {
      KEY_ACTIONS[event.key]();
      event.preventDefault();
    }
  }

  /**
   * This function handles input change events in a TypeScript React component by updating state
   * variables.
   * @param event - React.ChangeEvent<HTMLInputElement> is a type definition for an event object that
   * is triggered when the value of an input element changes. The `event` parameter in the
   * `handleInputChange` function is an instance of this event object.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^\w ]/g, '');
    onInputChange(value);
    setSelectedIndex(-1);
    setShowOptions(true);
  }

  return (
    <div className="input-container">
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyDown={handlInputKeyDown}
      />
      {(showLoading === undefined || showLoading) && loading && (
        <div className="icon-container">
          <i className="loader" />
        </div>
      )}
      { showOptions && (
        <OptionsList<T>
          options={options}
          inputValue={inputValue}
          debouncedValue={debouncedValue}
          noOptionsLabel={noOptionsLabel}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setShowOptions={setShowOptions}
          onSelect={onSelect}
          getOptionLabel={getOptionLabel}
        />
      )}
    </div>
  );
}

export default Autocomplete;
