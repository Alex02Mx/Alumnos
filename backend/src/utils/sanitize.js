export const sanitize = (data) => {
  if (data == null) return data;
  return structuredClone(data);
};