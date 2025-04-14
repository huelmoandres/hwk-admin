export const replaceEmptyStringsWithNull = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(replaceEmptyStringsWithNull);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, replaceEmptyStringsWithNull(value)])
    );
  } else {
    return obj === '' ? null : obj;
  }
}