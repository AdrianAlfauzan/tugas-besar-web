// utils/ValidasiXss.js
export const ValidasiXss = (input: any) => {
  // A simple regex to detect potential XSS payloads (tags, scripts, etc.)
  const regex = /<.*?>/g; // Matches any HTML tags
  if (regex.test(input)) {
    return false; // XSS detected
  }
  return true; // No XSS detected
};
