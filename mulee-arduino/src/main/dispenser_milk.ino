void initializeMilkDispenser() {
  // Initialize component
  pinMode(milk_motor_pump, OUTPUT);

  // Set initial state
  digitalWrite(milk_motor_pump, LOW);
}

void dispenseMilk(int time) {
  digitalWrite(yogurt_motor_pump, HIGH);
  delay(time);
  digitalWrite(yogurt_motor_pump, LOW);
}