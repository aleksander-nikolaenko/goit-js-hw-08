export const saveToClientStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('cannot save to storage');
  }
};

export const getFromClientStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return null;
  }
};
export const removeFromClientStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('cannot remove from storage');
  }
};