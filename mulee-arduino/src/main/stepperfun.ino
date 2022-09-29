
void pulse(byte pin, int delay, int count) { 
  for(int i = 0; i < count; i ++) {
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

