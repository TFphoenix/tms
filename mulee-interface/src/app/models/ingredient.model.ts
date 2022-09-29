export class IngredientValue {
  //TODO: Use only Ingredient (add grams to it)
  name?: string;
  grams: number = 0;

  constructor(ingredient: Ingredient) {
    this.name = ingredient.name;
  }
}

export class Ingredient {
  name?: string;
  calories?: number; // per 100 g
  nutritionalValues: NutritionalValue[] = [];
}

export class NutritionalValue {
  name?: string;
  percentage?: number;
}
