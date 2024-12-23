export const validateString = (input: string): boolean => {
  const regex = /^[A-Za-z\s]+$/; // Hanya huruf dan spasi yang diperbolehkan
  return regex.test(input);
};
