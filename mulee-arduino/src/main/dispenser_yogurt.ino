const int YOGURT_SERVO_OPEN = 45;
const int YOGURT_SERVO_CLOSED = 135;
const int YOGURT_SERVO_DELAY = 500;
const int YOGURT_PPUMP_DELAY = 3000;
bool yogurt_servo_isopen = false;

void initializeYogurtDispenser() {
  // Initialize component
  yogurt_servo.attach(yogurt_servo_pin);
  pinMode(yogurt_motor_pump, OUTPUT);
  pinMode(yogurt_motor_ppump, OUTPUT);

  // Set initial state
  digitalWrite(yogurt_motor_pump, LOW);
  digitalWrite(yogurt_motor_ppump, LOW);
  yogurt_servo.write(YOGURT_SERVO_CLOSED);

  delay(YOGURT_SERVO_DELAY);
}

void dispenseYogurt(int time) {
  toggleYogurtServo();
  delay(YOGURT_SERVO_DELAY);
  digitalWrite(yogurt_motor_pump, HIGH);
  delay(time);
  digitalWrite(yogurt_motor_pump, LOW);
  digitalWrite(yogurt_motor_ppump, HIGH);
  delay(YOGURT_PPUMP_DELAY);
  digitalWrite(yogurt_motor_ppump, LOW);
  toggleYogurtServo();
  delay(YOGURT_SERVO_DELAY);
}

void toggleYogurtServo() {
  if (yogurt_servo_isopen) {
    yogurt_servo.write(YOGURT_SERVO_CLOSED);
    yogurt_servo_isopen = false;

  } else {
    yogurt_servo.write(YOGURT_SERVO_OPEN);
    yogurt_servo_isopen = true;
  }

  delay(YOGURT_SERVO_DELAY);
}