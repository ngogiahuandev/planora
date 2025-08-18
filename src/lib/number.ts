export const toPositiveInt = (value: string | null, defaultValue = 0): number => {
  const num = parseInt(value ?? defaultValue.toString(), 10);
  if (Number.isNaN(num)) return defaultValue;
  if (num < 0) return defaultValue;
  return num;
};
