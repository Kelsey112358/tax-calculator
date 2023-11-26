export const authenticated = () => {
    const data = readFromStorage();
  
    if (!('activeUserId' in data)) return false;
    if (!data['activeUserId']) return false;
    return true;
  };
  