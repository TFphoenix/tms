const int YOGURT_SERVO_OPEN = 45;
const int YOGURT_SERVO_CLOSED = 135;
const int YOGURT_SERVO_DELAY = 500;
bool yogurt_servo_isopen = false;

void initializeYogurtDispenser() {
  digitalWrite(yogurt_motor_pump, LOW);
  digitalWrite(yogurt_motor_ppump, LOW);
  yogurt_servo.write(YOGURT_SERVO_CLOSED);

  delay(YOGURT_SERVO_DELAY);
}

void dispenseYogurt(int time) {
  // digitalWrite(motor_yogurt_pump, HIGH);
  // servo.write(0);
  // delay(2000);
  toggleYogurtServo();
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