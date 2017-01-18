/*
 * Return a string representing the number of days remaining until noon (EST) on
 * Inauguration Day, January 20, 2020.
 */

module.exports = () => {

  const today = new Date(Date.now());
  const inaugurationDate = new Date(Date.parse('Mon, Jan 20 2020 12:00:00 EST'));
  const diffMilliseconds = inaugurationDate.getTime() - today.getTime();
  const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
  const diffDays = Math.floor(diffMilliseconds / MILLISECONDS_PER_DAY);

  if (diffDays === 0) {
    return `This is the last day of the Trump administration!`;
  } else if (diffDays > 0) {
    const days = diffDays === 1 ? 'day' : 'days';
    return `There are only <strong>${diffDays}</strong> ${days} to go in the Trump administration.`;
  } else {
    // Administration is over. Whew.
    return ``;
  }

};
