export const getDamageDealt = (damage: number, armor: number): number => {
  return Math.max(damage - armor, 0);
}
