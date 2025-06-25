export const calculateEngineerLevel = (totalXp: number): number => {
  let level = 1;
  let requiredXp = 600;

  while (totalXp >= requiredXp) {
    totalXp -= requiredXp;
    level++;
    requiredXp += 50;
  }

  return level;
}
