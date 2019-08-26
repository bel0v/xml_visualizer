export const randomFromMinusToPlus = (number) => {
  const sign = Math.random() < 0.5 ? -1 : 1;
  return Math.floor(Math.random() * (number + 1)) * sign
}