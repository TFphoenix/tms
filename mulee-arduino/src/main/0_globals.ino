#include <Servo.h>

const int X_Step = A0;
const int X_Dir = A1;
const int X_En = A2;

const int Y_Step = A6;
const int Y_Dir = A7;
const int Y_En = A8;

const int Z_Step = 46;
const int Z_Dir = 48;
const int Z_En = 62;

const int E0_Step = 26;
const int E0_Dir = 28;
const int E0_En = 24;

const int E1_Step = 36;
const int E1_Dir = 34;
const int E1_En = 30;

const int xmax = 2;
const int xmin = 3;

const int G_STEP_PIN = 46;
const int G_DIR_PIN = 48;
const int G_ENABLE_PIN = 62;  // Active LOW

struct stepper {
  int enable_pin;
  int direction_pin;
  int step_pin;
};

//PIN Definitions




//PIN Definitions
struct stepper stepperX = { X_En, X_Dir, X_Step };
struct stepper stepperY = { Y_En, Y_Dir, Y_Step };
struct stepper stepperZ = { Z_En, Z_Dir, Z_Step };
struct stepper stepperE0 = { E0_En, E0_Dir, E0_Step };
struct stepper stepperE1 = { E1_En, E1_Dir, E1_Step };


struct stepper dispensers[4] = { stepperX, stepperY, stepperE0, stepperE1 };


struct stepper g_stepper3 = { 62, 48, 46 };



//struct stepper stepper1 = {38, 55, 54};  //X
//struct stepper stepper2 = {56, 61, 60};  //



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

const int milk_motor_pump[2] = { 16, 17 };