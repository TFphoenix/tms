void setup_steppers() {
  for (int i; i < 4; i++) {
    pinMode(dispensers[i].step_pin, OUTPUT);
    pinMode(dispensers[i].direction_pin, OUTPUT);
    pinMode(dispensers[i].enable_pin, OUTPUT);
  }

  // TEST:
  // 
}

void test_steppers() {
  Serial.println("Dispenser 0");
  move(dispensers[0], 1, 5000, 1000);
  Serial.println("Dispenser 1");
  move(dispensers[1], 1, 5000, 1000);
  Serial.println("Dispenser 2");
  move(dispensers[2], 1, 5000, 1000);
  Serial.println("Dispenser 3");
  move(dispensers[3], 1, 5000, 1000);
}


void pulse(byte pin, int delay, int count) {
  for (int i = 0; i < count; i++) {
    delayMicroseconds(delay);
    digitalWrite(pin, HIGH);
    delayMicroseconds(delay);
    digitalWrite(pin, LOW);
  }
}

void move(struct stepper s, bool direction, int pulses, int speed) {
  digitalWrite(s.direction_pin, direction);
  digitalWrite(s.enable_pin, 0);
  pulse(s.step_pin, speed, pulses);
  digitalWrite(s.enable_pin, HIGH);
}