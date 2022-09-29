



bool interrupt_triggered = 0; 
bool stepDirection = 0; 
bool limitNominal = 1; 

int fastMovedelay = 250; 
int gantrySteps = 0; 

int position = -1; 

void setup_gantry() {
  attachInterrupt(digitalPinToInterrupt(xmin), stopAll, CHANGE); 
  attachInterrupt(digitalPinToInterrupt(xmax), stopAll, CHANGE);
}

void moveTo(int pos, int speed) {

  if(pos < 0 || pos > gantrySteps - 10) {
    Serial.println("Move request outside valid range. Are you initialzed?");
  }

  int delta = position-pos; 

  if(delta == 0) return; 

  bool dir;

  if(delta > 0) dir = 0;
  else dir = 1; 

  move(stepperZ, dir, abs(delta), speed); 

  position = pos; 
}

void stopAll() {
  interrupt_triggered = true; 
  digitalWrite(G_ENABLE_PIN, HIGH);
  Serial.println("STAHP!");
}

void initalize_gantry() {
  pinMode(G_ENABLE_PIN, OUTPUT); 
  pinMode(G_DIR_PIN, OUTPUT); 
  pinMode(G_STEP_PIN, OUTPUT); 

  pinMode(xmax, INPUT);
  pinMode(xmin, INPUT); 

  noInterrupts(); 

  Serial.println("Starting Calibration");
  Serial.flush();

  digitalWrite(G_ENABLE_PIN, LOW);
  digitalWrite(G_DIR_PIN, LOW);  

  bool xminreading = digitalRead(xmin); 
  bool xmaxreading = digitalRead(xmax); 


  while(xminreading == limitNominal && xmaxreading == limitNominal) {
    delayMicroseconds(500); 
    digitalWrite(G_STEP_PIN, HIGH);
    delayMicroseconds(500); 
    digitalWrite(G_STEP_PIN, LOW); 

    xminreading = digitalRead(xmin); 
    xmaxreading = digitalRead(xmax); 
  }

  Serial.println("Found first limit");
  Serial.flush();

  if(xminreading == limitNominal && xmaxreading != limitNominal) {
    stepDirection = 0; 
  } else if(xminreading != limitNominal && xmaxreading == limitNominal) {
    stepDirection = 1;
  } else {
    stopAll();
    Serial.println("Something is wrong with the limit switches");
    
  }

  digitalWrite(G_DIR_PIN, !stepDirection); 

  pulse(G_STEP_PIN, 2000, 50); 

  Serial.print("Finding second limit, stepDir is ");
  Serial.println(stepDirection);
  Serial.flush();

  xminreading = digitalRead(xmin); 
  xmaxreading = digitalRead(xmax); 


  while(xminreading == limitNominal && xmaxreading == limitNominal) {
    delayMicroseconds(500); 
    digitalWrite(G_STEP_PIN, HIGH);
    delayMicroseconds(500); 
    digitalWrite(G_STEP_PIN, LOW); 

    xminreading = digitalRead(xmin); 
    xmaxreading = digitalRead(xmax);

    gantrySteps ++;  
  }

  interrupts();

  Serial.print("Found second stop, moving back. GantrySteps: ");
  Serial.println(gantrySteps);
  Serial.flush(); 
  
  digitalWrite(G_DIR_PIN, stepDirection); 
  pulse(G_STEP_PIN, fastMovedelay, gantrySteps-10); 

  Serial.print("Moved Back a little");
  Serial.flush(); 

  position = 0; 
}


void setupGantry() {
  pinMode(G_STEP_PIN, OUTPUT);
  pinMode(G_ENABLE_PIN, OUTPUT);
  pinMode(G_DIR_PIN, OUTPUT);

  pinMode(xmax, INPUT);
  pinMode(xmin, INPUT); 
}

