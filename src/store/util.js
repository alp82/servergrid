export const generateId = () => {
  return `_${Math.random().toString(36).substr(2, 9)}`;
};

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};