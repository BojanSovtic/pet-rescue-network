export const convertObjectToArray = (obj: { [key: string]: any }): any[] => {
  return Object.keys(obj).map(key => ({
    id: key,
    ...obj[key]
  }));
}
