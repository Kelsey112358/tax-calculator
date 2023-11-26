const appKey = 'taxCalculatorApp';
export const writeToStorage = (key, value) => {
  const currentData = readFromStorage();
  const newData = {
    ...currentData,
    [key]: value
  };
  localStorage.setItem(appKey, JSON.stringify(newData));
};

export const readFromStorage = () => {
  const persistedData = localStorage.getItem(appKey) ?? '{}';
  return JSON.parse(persistedData);
};
