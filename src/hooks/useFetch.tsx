import { useState, useEffect } from "react";

/**
 * This is a custom React hook that uses the Fetch API to make HTTP requests and returns the response
 * data, error message, and loading status.
 * @param {string} url - Is a string representing the URL of the API endpoint to fetch the data.
 * @returns The `useFetch` function returns an object with three properties: `data`, `error`, and
 * `loading`. These properties are used to manage the state of the API request made by the `fetchData`
 * function.
 */
function useFetch<T>(url: string) {

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Create a new instance of the AbortController
    const abortController = new AbortController();

    const fetchData = async (url: string) => {
      try {
        setLoading(true);
        /* `const response = await fetch(url, { signal: abortController.signal })` is making a fetch
        request to the specified `url` and passing an `AbortSignal` object as an option to the
        `fetch` function. The `AbortSignal` is created by the `AbortController` instance and can be
        used to abort the fetch request if needed. */
        const response = await fetch(url, {
          signal: abortController.signal,
        });

        const responseData = await response.json();

        setData(responseData);
        setError(null);

      } catch(error) {
        if (error instanceof Error && error.name !== "AbortError") {
          // If the error is not from `abortController` set the error
          setError(error.message);
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }

    if (url) {
      // If `search` is truthy it calls the `fetchData` function.
      fetchData(url);
    } else {
      // If `utl` is falsy reset the `data` and `error` states to the initial values.
      setData(null);
      setError(null);
    }

    return () => {
      /* `abortController.abort()` is a method that aborts any ongoing fetch request associated with
      the `AbortController` instance. It is used in the cleanup function of the `useEffect` hook to
      cancel any ongoing API requests when the component unmounts. This helps to prevent memory leaks and
      unnecessary network requests. */
      abortController.abort();
    }
    /* Dependency array of the `useEffect` hook. It specifies that the effect should only be re-run 
    when the `url` variable changes.  */
  }, [url]);

  return { data, error, loading };
}

export default useFetch;
