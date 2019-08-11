const axios = require('axios');
const qs = require('qs');

const redirectWithQueryString = require('../util/redirectWithQueryString');

const stravaUrl = 'https://www.strava.com/oauth/';

module.exports = async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    return redirectWithQueryString(res, {
      error: 'A response code and a state are required in order to authorize.',
    });
  }

  const qsParams = {
    code,
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
  };

  return axios({
    method: 'post',
    url: `${stravaUrl}token?${qs.stringify(qsParams)}`,
  })
    .then((response) => {
      const data = qs.parse(response.data);

      return redirectWithQueryString(res, data);
    })
    .catch((err) => {
      console.error(err);
      return redirectWithQueryString(res, err);
    });
};
