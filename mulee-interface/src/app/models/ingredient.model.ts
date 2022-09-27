export class Ingredient {
  name?: string;
  calories?: number;
  nutritionalValues: NutritionalValue[] = [];
}

export class NutritionalValue {
  name?: string;
  quantity?: number;
  percentage?: number;
  mu?: string;
}
