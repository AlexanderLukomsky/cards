export const dateFormat = (date: Date): string => {
  const tenFirstTwoDigitNumber = 10;

  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  const twoDigitDay = day < tenFirstTwoDigitNumber ? `0${day}` : day;
  const twoDigitMonth = month < tenFirstTwoDigitNumber ? `0${month}` : month;

  return `${twoDigitDay}.${twoDigitMonth}.${year}`;
};
