import { Drink } from "../interfaces/interfaces";

export default function getDrinkRecipe(drink: Drink) {

  type T = keyof typeof drink;

  const recipe = [];

  for (let i = 0; i < 15; i++) {
    const measure = drink[`strMeasure${i + 1}` as T];
    const ingredient = drink[`strIngredient${i + 1}` as T];
  
    if (measure && ingredient) {
      recipe.push(measure + ingredient);
    } else {
      break;
    }
  }

  return recipe;
}