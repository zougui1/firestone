export const getCrewCount = (engineerLevel: number): number => {
  if (engineerLevel >= 60) {
    return 6;
  }

  if (engineerLevel >= 30) {
    return 5;
  }

  return 4;
}
