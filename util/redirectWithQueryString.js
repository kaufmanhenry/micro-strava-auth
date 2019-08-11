const qs = require('qs');

const redirect = require('./redirect');

const redirectWithQueryString = (res, data) => {
  const location = `${process.env.STRAVA_REDIRECT}?${qs.stringify(data)}`;
  return redirect(res, 302, location);
};

module.exports = redirectWithQueryString;
