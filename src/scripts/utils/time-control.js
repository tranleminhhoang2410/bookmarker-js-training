/**
 * Converts a timestamp to a display time with given format.
 *
 * @param {number} timeStamp The timestamp to convert.
 * @returns {string} The formatted time string.
 */
export const timeFormat = (timeStamp) => {
  // Get time format value
  const timeFormatValue = new Date(parseInt(timeStamp, 10));

  // Get hours, minutes, year, month, and date values from time format value
  const hours = timeFormatValue.getHours();
  const minutes = timeFormatValue.getMinutes().toString().padStart(2, '0');
  const year = timeFormatValue.getFullYear();
  const month = (timeFormatValue.getMonth() + 1).toString().padStart(2, '0');
  const date = timeFormatValue.getDate().toString().padStart(2, '0');

  // Determine period of day from time format value
  const periodOfDay = hours >= 12 ? 'PM' : 'AM';

  // Get time display format value
  const timeDisplay = `${hours}:${minutes} ${periodOfDay}, ${date}/${month}/${year}`;

  return timeDisplay;
};

/**
 * Get the hours value from a timestamp string.
 *
 * @param {number} timeStamp The timestamp string.
 * @returns {string} The hours value.
 */
export const getHours = (timeStamp) => {
  // Get hours value from time format value
  const hoursDisplay = timeFormat(timeStamp).split(',')[0];

  return hoursDisplay;
};
