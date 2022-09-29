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
Servo yogurt_servo;
const int yogurt_servo_pin = 7;
const int yogurt_motor_pump = 9;
const int yogurt_motor_ppump = 10;

// You can test with:
// d 0 500,d 1 500,d 2 500,




// MAIN FUNCTIONS               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
void setup() {
  // Initialise the serial port
  Serial.begin(9600);

  // Initialize components
  yogurt_servo.attach(yogurt_servo_pin);
  pinMode(yogurt_motor_pump, OUTPUT);
  pinMode(yogurt_motor_ppump, OUTPUT);

  // Initialize dispensers
  initializeYogurtDispenser();
}

void loop() {
  // If there is incoming data
  if (Serial.available() > 0) {
    String recipe_string = Serial.readStringUntil('\n');
    prepareRecipe(recipe_string);
  }
}

void prepareRecipe(String recipe_string) {
  parseRecipe(recipe_string);
  
  printActiveRecipe();
  dispenseYogurt(5000);
  
  active_recipe_idx = 0;
}