export const checkAndVisit = (key: string): boolean => {
  const alreadyVisited = localStorage.getItem(key);
  if (!alreadyVisited) {
    localStorage.setItem(key, "true");
    return false;
  }
  return true;
};
