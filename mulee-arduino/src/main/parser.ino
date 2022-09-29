void parseRecipe(String recipe_string) {
  // Write the data to the serial port
  Serial.println("I received: " + recipe_string);

  while (recipe_string.length()) {
    int recipe_delimiter_idx = recipe_string.indexOf(RECIPE_DELIMITER);
    String slot_substr = recipe_string.substring(0, recipe_delimiter_idx);

    Command c;
    c.slot_type = slot_substr.charAt(0);
    int slot_delimiter_idx = slot_substr.indexOf(SLOT_DELIMITER, 2);
    c.slot_index = slot_substr.substring(2, slot_delimiter_idx).toInt();
    c.time_ms = slot_substr.substring(slot_delimiter_idx + 1, slot_substr.length()).toInt();
    active_recipe[active_recipe_idx++] = c;

    recipe_string = recipe_string.substring(recipe_delimiter_idx + 1, recipe_string.length());
  }
}

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