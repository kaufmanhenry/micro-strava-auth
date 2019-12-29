const axios = require('axios');
const qs = require('qs');

const redirectWithQueryString = require('../util/redirectWithQueryString');

const stravaUrl = 'https://www.strava.com/oauth/';

module.exports = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return redirectWithQueryString(res, {
      error: 'A response code is required in order to authorize.',
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
    .then(response => {
      const data = qs.parse(response.data);

      return redirectWithQueryString(res, data);
    })
    .catch(err => {
      return redirectWithQueryString(res, err);
    });
};
