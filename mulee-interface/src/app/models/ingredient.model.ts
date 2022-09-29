export class IngredientValue {
  name?: string;
  grams: number = 0;
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
