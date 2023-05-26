import { Drink } from "../interfaces/interfaces";

/**
 * This TypeScript function takes a Drink object and returns an array of its recipe ingredients and
 * measurements.
 * @param {Drink} drink - The `drink` parameter is of type `Drink`, which is likely an interface or
 * type defining the structure of a drink object.
 * @returns an array of strings that represent the recipe for a drink. The recipe is obtained from the
 * `drink` object passed as an argument to the function. The function loops through the object
 * properties using the `strMeasure` and `strIngredient` keys, and concatenates the values of each
 * property that is not null or undefined. The resulting strings are pushed into an array.
 */
export default function getDrinkRecipe(drink: Drink) {

  type T = keyof typeof drink;

  const recipe = [];

  for (let i = 0; i < 15; i++) {
    const ingredient = drink[`strIngredient${i + 1}` as T];
    const measure = drink[`strMeasure${i + 1}` as T];
  
    if (ingredient) {
      recipe.push(`${measure.trim()} ${ingredient.trim()}`.trim());
    } else {
      /* Once there are no more ingredients, the loop is no longer needed and `break` is used
      to exit the loop and return the recipe array. */
      break;
    }
  }

  return recipe;
}
