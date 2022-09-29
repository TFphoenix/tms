const int HARDCODE_SPEED = 500; 


struct dispenser_parameters {
  int speed;
  int cycling;
  int position;
}; //dispenser parameters  

struct dispenser_parameters dsp_prm[] = {{500, 500, 1700}, {500, 500, 2865}, {500, 500, 4030}, {500, 500, 5195}};



void dispense_solids(int motor_slot, int cycles) {
  moveTo(dsp_prm[motor_slot].position, HARDCODE_SPEED);

  for (int i = 0; i < cycles; i ++) {
    move(dispensers[motor_slot], i%2, dsp_prm[motor_slot].cycling, dsp_prm[motor_slot].speed); 
  }
  
}