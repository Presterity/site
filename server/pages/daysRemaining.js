/*
 * Return a string representing the number of days remaining until noon (EST) on
 * Inauguration Day, January 20, 2021.
 */

module.exports = () => {

  const today = new Date(Date.now());
  const inaugurationDate = new Date(Date.parse('Mon, Jan 20 2021 12:00:00 EST'));

  // From "a more correct solution" for date diff math:
  // http://stackoverflow.com/a/15289883/76472.
  const utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const utc2 = Date.UTC(inaugurationDate.getFullYear(), inaugurationDate.getMonth(), inaugurationDate.getDate());
  const diffMilliseconds = utc2 - utc1;
  const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
  const diffDays = Math.floor(diffMilliseconds / MILLISECONDS_PER_DAY);

  if (diffDays === 0) {
    return `<strong>This is the last day of the Trump administration!</strong>`;
  } else if (diffDays > 0) {
    const days = diffDays === 1 ? 'day' : 'days';
    return `There are only <strong>${diffDays}</strong> ${days} to go in the Trump administration.`;
  } else {
    // Administration is over. Whew.
    return ``;
  }

};
