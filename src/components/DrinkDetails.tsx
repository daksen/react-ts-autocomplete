import { useMemo } from "react";
import getDrinkRecipe from "../utils/getDrinkRecipe";
import { Drink } from "../interfaces/interfaces";

interface DrinkDetailsProps {
  drink: Drink
}

/**
 * This is a functional component that displays the details of a drink, including its image, title,
 * recipe, and instructions.
 * @param {DrinkDetailsProps}  - The code snippet is a functional component called `DrinkDetails` that
 * takes in a single prop called `drink` of type `DrinkDetailsProps`.
 * @returns This code is returning a React component that displays the details of a drink, including
 * the drink's image, title, recipe, and instructions. The recipe is generated using the
 * `getDrinkRecipe` function, which takes the `drink` object as an argument and returns an array of
 * recipe steps.
 */
function DrinkDetails({ drink }: DrinkDetailsProps) {
  
  const recipe = useMemo(() => getDrinkRecipe(drink), [drink]);

  return (
    <div className="drink-details">
      <img className="drink-img" src={drink.strDrinkThumb} alt={drink.strDrink} />
      <h1 className="drink-title">{drink.strDrink}</h1>
      <div className="drink-recipe">
        { recipe.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <p className="drink-instructions">{drink.strInstructions}</p>
    </div>
  );
}

export default DrinkDetails;
