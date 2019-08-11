const qs = require('qs');

const redirect = require('../util/redirect');

const stravaUrl = 'https://www.strava.com/oauth/';

module.exports = async (req, res) => {
  if (
    !process.env.STRAVA_CLIENT_ID
    || !process.env.STRAVA_CLIENT_SECRET
    || !process.env.STRAVA_REDIRECT
  ) {
    throw new Error(
      'In order to request an access token from Strava, you must supply a STRAVA_CLIENT_ID, a STRAVA_CLIENT_SECRET, and a STRAVA_REDIRECT.',
    );
  }

  const qsParams = {
    client_id: process.env.STRAVA_CLIENT_ID,
    redirect_uri: `http://${req.headers.host}/callback`,
    response_type: 'code',
  };
  const location = `${stravaUrl}authorize?${qs.stringify(qsParams)}`;

  return redirect(res, 302, location);
};
