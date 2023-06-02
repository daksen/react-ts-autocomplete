import { useMemo, useState } from "react";
import useFetch from "./hooks/useFetch";
import useDebounce from "./hooks/useDebounce";
import normalizeDrinksData from "./utils/normalizeDrinksData";
import Autocomplete from "./components/autocomplete/Autocomplete";
import DrinkDetails from "./components/DrinkDetails";
import { Drink, ResponseData } from "./interfaces/interfaces";

/* `API_BASE_URL` is a constant that holds the base URL for the API endpoint that the application
is fetching data from. It is constructed using a template literal that includes the API key,
which is stored in an environment variable called `VITE_API_KEY`. The endpoint is used to
search for drinks based on the user's input. */
const API_BASE_URL = `https://www.thecocktaildb.com/api/json/v1/${import.meta.env.VITE_API_KEY}/search.php?s=`;
  
function App() {

  const [inputValue, setInputValue] = useState<string>("");
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  /* This helps to prevent unnecessary API requests and improves performance by delaying the API 
  request until the user has finished typing. */
  const debouncedValue = useDebounce<string>({
    value: inputValue,
    milliSeconds: 500,
  });

  /* Create a memoized URL string that is used to fetch data from the API endpoint. The `useMemo` hook
  is used to memoize the URL string so that it is only recomputed when the `debouncedValue` changes. */
  const url = useMemo(() => debouncedValue ? API_BASE_URL + debouncedValue : '', [debouncedValue]);

  /* Use the custom `useFetch` hook to fetch data from the API endpoint specified by the `url` variable. */
  const { data, loading } = useFetch<ResponseData>(url);

  /* Normalize the response data */
  const drinks = useMemo(() => normalizeDrinksData(data), [data]);

  const onSelect = (option: Drink) => {
    setShowLoading(false);
    setSelectedDrink(option);
    setInputValue(option.strDrink);
  }

  const onInputChange = (value: string) => {
    setShowLoading(true);
    setInputValue(value);
  }

  const getOptionLabel = (option: Drink) => {
    return option.strDrink;
  }

  return (
    <div className="container">
      <h1 className="title">Drinks</h1>
      <Autocomplete<Drink>
        options={drinks}
        inputValue={inputValue}
        debouncedValue={debouncedValue}
        loading={loading}
        showLoading={showLoading}
        placeholder="Search for a drink..."
        noOptionsLabel="No drinks"
        onSelect={onSelect}
        onInputChange={onInputChange}
        getOptionLabel={getOptionLabel}
      />
      { selectedDrink && (
        <DrinkDetails drink={selectedDrink} />
      )}
    </div>
  );
}

export default App;
