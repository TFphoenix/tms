#include <Servo.h>

// CONSTANTS                    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const int ACTIVE_RECIPE_SIZE = 10;
const char RECIPE_DELIMITER = ',';
const char SLOT_DELIMITER = ' ';

// TYPES                        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
struct Command {
  char slot_type;
  int slot_index;
  int time_ms;
};

// VARIABLES                    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
Command active_recipe[ACTIVE_RECIPE_SIZE];
int active_recipe_idx = 0;

// COMPONENTS                   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
Servo servo_yogurt;
const int servo_yogurt_pin = 7
const int motor_yogurt_pump = 9;
const int motor_yogurt_ppump = 10;

// You can test with:
// d 0 500,d 1 500,d 2 500,




// MAIN FUNCTIONS               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
void setup() {
  Serial.begin(9600);  // Initialise the serial port

  // Initialize components
  servo_yogurt.attach(servo_yogurt_pin);
  pinMode(motor_yogurt_pump, OUTPUT);
  pinMode(motor_yogurt_ppump, OUTPUT);
}

void loop() {
  // If there is incoming data
  if (Serial.available() > 0) {
    String recipe_string = Serial.readStringUntil('\n');
    parseRecipe(recipe_string);
    printActiveRecipe();
  }
}