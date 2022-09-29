void initializeMilkDispenser() {
  // Initialize component
  pinMode(milk_motor_pump[0], OUTPUT);
  pinMode(milk_motor_pump[1], OUTPUT);

  // Set initial state
  digitalWrite(milk_motor_pump[0], LOW);
  digitalWrite(milk_motor_pump[1], LOW);
}

void dispenseMilk(int time, int pump) {
  digitalWrite(milk_motor_pump[pump], HIGH);
  delay(time);
  digitalWrite(milk_motor_pump[pump], LOW);
}