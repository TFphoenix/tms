const int HARDCODE_SPEED = 500;


struct dispenser_parameters {
  int speed;
  int cycling;
  int position;
};  //dispenser parameters

struct dispenser_parameters dsp_prm[] = { { 300, 300, 1800 }, { 500, 500, 2965 }, { 500, 500, 4155 }, { 500, 500, 5335 } };



void dispense_solids(int motor_slot, int cycles) {
  moveTo(dsp_prm[motor_slot].position, HARDCODE_SPEED);

  for (int i = 0; i < cycles; i++) {
    move(dispensers[motor_slot], i % 2, dsp_prm[motor_slot].cycling, dsp_prm[motor_slot].speed);
  }
}