export const years = Array.from({ length: 50 }, (_, i) => {
  return (new Date().getFullYear() - i).toString();
});
