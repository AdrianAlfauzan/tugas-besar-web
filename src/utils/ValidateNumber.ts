export const validateNumber = (nim: string): boolean => {
  // Periksa apakah nim hanya terdiri dari angka
  return /^\d+$/.test(nim);
};
