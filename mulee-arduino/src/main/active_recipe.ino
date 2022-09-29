void printActiveRecipe() {
  Serial.print("Active recipe: ");
  for (int i = 0; i < active_recipe_idx; ++i) {
    Serial.print(active_recipe[i].slot_type);
    Serial.print(active_recipe[i].slot_index);
    Serial.print(active_recipe[i].time_ms);

    if (i != active_recipe_idx - 1)
      Serial.print(", ");
  }
  Serial.println();
}

void resetActiveRecipe() {
  active_recipe_idx = 0;
}

void prepareActiveRecipe() {
  for (int i = 0; i < active_recipe_idx; ++i) {
    char slot_type = active_recipe[i].slot_type;
    int slot_index = active_recipe[i].slot_index;
    Serial.print("Dispensing: ");
    Serial.print(slot_type);
    Serial.print(' ');
    Serial.print(slot_index);
    Serial.println();

    if (slot_type == 'l') {  // MILK
      moveTo(9000, 400);
      dispenseMilk(5000, slot_index);

    } else if (slot_type == 'd') {  // SOLID
      dispense_solids(slot_index, 5);

    } else if (slot_type == 'y') {  // YOGURT
      return;                       // TODO

    } else {
      Serial.println("Error: Unknown command type in active_recipe/prepareActionRecipe");
    }
  }
}