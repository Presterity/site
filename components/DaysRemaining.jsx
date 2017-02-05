import { Component, h } from 'preact'; // jshint ignore:line


/**
 * Show a count of the days remaining in the administration.
 */
export default class DaysRemaining extends Component {

  render(props, state) {

    const today = new Date(Date.now());
    const inaugurationDate = new Date(Date.parse('Mon, Jan 20 2021 12:00:00 EST'));

    // From "a more correct solution" for date diff math:
    // http://stackoverflow.com/a/15289883/76472.
    const utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const utc2 = Date.UTC(inaugurationDate.getFullYear(), inaugurationDate.getMonth(), inaugurationDate.getDate());
    const diffMilliseconds = utc2 - utc1;
    const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
    const diffDays = Math.floor(diffMilliseconds / MILLISECONDS_PER_DAY);

    let message;
    if (diffDays === 0) {
      message = (
        <strong>This is the last day of the Trump administration!</strong>
      );
    } else if (diffDays > 0) {
      const days = diffDays === 1 ? 'day' : 'days';
      message = (
        <span>
          There are only
          <strong>{diffDays}</strong> {days} to go in the Trump administration.
        </span>
      );
    } else {
      // Administration is over. Whew.
      message = '';
    }

    return (
      <p id="daysRemainingMessage">
        {message}
      </p>
    );
  }

}
