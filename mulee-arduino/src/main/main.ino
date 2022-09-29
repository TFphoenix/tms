#include <Vector.h>

// CONSTANTS
const int COMMANDS_MAXSIZE = 10;
const char RECIPE_DELIMITER = ',';
const char SLOT_DELIMITER = ' ';

// TYPES
struct Command {
  char slot_type;
  int slot_index;
  int time_ms;
};

// VARIABLES
// ...

// You can test with:
// d 0 500,d 1 500,d 2 500,



void setup() {
  // Initialise the serial port
  Serial.begin(9600);
}

void loop() {

  // If there is incoming data
  if (Serial.available() > 0) {
    String recipe_string = Serial.readStringUntil('\n');
    Command commands[COMMANDS_MAXSIZE];
    int command_idx = 0;

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
      commands[command_idx++] = c;

      recipe_string = recipe_string.substring(recipe_delimiter_idx + 1, recipe_string.length());
    }

    for (int i = 0; i < command_idx; ++i) {
      Serial.print(commands[i].slot_type);
      Serial.print(commands[i].slot_index);
      Serial.print(commands[i].time_ms);
      Serial.println("\n---");
    }
  }
}