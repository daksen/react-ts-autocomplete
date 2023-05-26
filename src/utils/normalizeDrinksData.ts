import { ResponseData } from "../interfaces/interfaces";

/**
 * This function normalizes drink data by mapping over the data and returning an array of objects with
 * specific properties.
 * @param {ResponseData | null} data - It is the data that is returned from an API call to retrieve 
 * information about the drinks.
 * @returns The function `normalizeDrinksData` returns an array of objects with normalized drink data,
 * or `null` if the input data is `null`. If the input data is not an array of drinks, an empty array
 * is returned.
 */
export default function normalizeDrinksData(data: ResponseData | null) {

  if (!data) {
    return null;
  }

  if (!data.drinks || !Array.isArray(data.drinks)) {
    return [];
  }

  return data.drinks.map((drink) => {
    return {
      idDrink: drink.idDrink,
      strAlcoholic: drink.strAlcoholic,
      strCategory: drink.strCategory,
      strDrink: drink.strDrink,
      strInstructions: drink.strInstructions,
      strDrinkThumb: drink.strDrinkThumb,
      strIngredient1: drink.strIngredient1 || '',
      strIngredient2: drink.strIngredient2 || '',
      strIngredient3: drink.strIngredient3 || '',
      strIngredient4: drink.strIngredient4 || '',
      strIngredient5: drink.strIngredient5 || '',
      strIngredient6: drink.strIngredient6 || '',
      strIngredient7: drink.strIngredient7 || '',
      strIngredient8: drink.strIngredient8 || '',
      strIngredient9: drink.strIngredient9 || '',
      strIngredient10: drink.strIngredient10 || '',
      strIngredient11: drink.strIngredient11 || '',
      strIngredient12: drink.strIngredient12 || '',
      strIngredient13: drink.strIngredient13 || '',
      strIngredient14: drink.strIngredient14 || '',
      strIngredient15: drink.strIngredient15 || '',
      strMeasure1: drink.strMeasure1 || '',
      strMeasure2: drink.strMeasure2 || '',
      strMeasure3: drink.strMeasure3 || '',
      strMeasure4: drink.strMeasure4 || '',
      strMeasure5: drink.strMeasure5 || '',
      strMeasure6: drink.strMeasure6 || '',
      strMeasure7: drink.strMeasure7 || '',
      strMeasure8: drink.strMeasure8 || '',
      strMeasure9: drink.strMeasure9 || '',
      strMeasure10: drink.strMeasure10 || '',
      strMeasure11: drink.strMeasure11 || '',
      strMeasure12: drink.strMeasure12 || '',
      strMeasure13: drink.strMeasure13 || '',
      strMeasure14: drink.strMeasure14 || '',
      strMeasure15: drink.strMeasure15 || '',
    }
  });
}
