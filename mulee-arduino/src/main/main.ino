// You can test with:
// d 0 500,d 1 500,d 2 500,d 3 500,l 0 500,l 1 500,



// MAIN FUNCTIONS               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
void setup() {
  // Initialize the serial port
  Serial.begin(9600);

  // Initialize modules
  setup_steppers();
  initalize_gantry();
  initializeYogurtDispenser();
  initializeMilkDispenser();
}

void loop() {
  // If there is incoming data
  if (Serial.available() > 0) {
    String recipe_string = Serial.readStringUntil('\n');
    Serial.println(recipe_string);
    prepareRecipe(recipe_string);
  }
}

void prepareRecipe(String recipe_string) {
  parseRecipe(recipe_string);
  printActiveRecipe();

  prepareActiveRecipe();

  resetActiveRecipe();
}