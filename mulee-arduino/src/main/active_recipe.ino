const int POSITION_START = 100;
const int POSITION_END = 10350;

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
  moveTo(POSITION_START, 400);
}

void prepareActiveRecipe() {
  for (int i = 0; i < active_recipe_idx; ++i) {
    char slot_type = active_recipe[i].slot_type;
    int slot_index = active_recipe[i].slot_index;
    int slot_time = active_recipe[i].time_ms;
    Serial.print("Dispensing: ");
    Serial.print(slot_type);
    Serial.print(' ');
    Serial.print(slot_index);
    Serial.println();

    if (slot_type == 'l') {  // MILK
      moveTo(9000, 400);
      dispenseMilk(slot_time, slot_index);

    } else if (slot_type == 'd') {  // SOLID
      // Hardcode
      int slot_duration;
      if (slot_index == 0) slot_duration = 10;
      else if (slot_index == 1) slot_duration = 1;
      else if (slot_index == 2) slot_duration = 1;
      else if (slot_index == 3) slot_duration = 3;
      else slot_duration = 3;

      dispense_solids(slot_index, slot_duration);

    } else if (slot_type == 'y') {  // YOGURT
      return;                       // TODO

    } else {
      Serial.println("Error: Unknown command type in active_recipe/prepareActionRecipe");
    }

    delay(2000);  // Delay between dispensing ingredients
  }

  // moveTo(POSITION_END, 400);
  delay(40000); // Delay at the end of the preparation
}