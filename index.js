require('dotenv').config()
const qs = require('qs')
const axios = require('axios')
const { router, get } = require('microrouter')
const redirect = require('micro-redirect')
const uid = require('uid-promise')

const stravaUrl = 'https://www.strava.com/oauth/'

const states = []

const redirectWithQueryString = (res, data) => {
  const location = `${process.env.STRAVA_REDIRECT}?${qs.stringify(data)}`
  return redirect(res, 302, location)
}

const login = async (req, res) => {
  if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_CLIENT_SECRET || !process.env.STRAVA_REDIRECT) {
    return console.error('In order to request an access token from Strava, you must supply a STRAVA_CLIENT_ID, a STRAVA_CLIENT_SECRET, and a STRAVA_REDIRECT.')
  }

  const state = await uid(20)
  states.push(state)

  const qsParams = {
    client_id: process.env.STRAVA_CLIENT_ID,
    redirect_uri: 'http://localhost:3000/callback',
    response_type: 'code',
    state
  }
  const location = `${stravaUrl}authorize?${qs.stringify(qsParams)}`

  return redirect(res, 302, location)
}

const callback = async (req, res) => {
  const { code, state } = req.query

  if (!code || !state) {
    return redirectWithQueryString(res, {
      error: 'A response code and a state are required in order to authorize.'
    })
  }
  if (!states.includes(state)) {
    return redirectWithQueryString(res, {
      error: 'States must include the authorized state created in the login function.'
    })
  }

  const qsParams = {
    code,
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET
  }

  return axios({
    method: 'post',
    url: `${stravaUrl}token?${qs.stringify(qsParams)}`
  })
  .then((response) => {
    const data = qs.parse(response.data)

    return redirectWithQueryString(res, data)
  })
  .catch((err) => {
    console.error(err)
    return redirectWithQueryString(res, err)
  })
}

module.exports = router(
  get('/login', login),
  get('/callback', callback)
)
