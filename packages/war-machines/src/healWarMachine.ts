export const healWarMachine = (warMachine: { health: number; maxHealth: number; }, heal: number) => {
  warMachine.health += heal;
  warMachine.health = Math.min(warMachine.maxHealth, warMachine.health);
}
