# :running_man: micro-strava-auth

A microservice for OAuth with Strava. Similar to [micro-slack-auth](http://github.com/hcjk/micro-slack-auth) for auth with Slack.

## Getting Started

In order to run `micro-strava-auth`, you need to make sure you have your environment variables setup correctly. Make a copy of `.env.example`, name it `.env`, and update it with your Strava variables.

Here's an example:
```sh
# Your Strava application client ID
STRAVA_CLIENT_ID=1234
# Your Strava application client secret
STRAVA_CLIENT_SECRET=1234
# The URL to redirect a user to after they successfully connected their account
STRAVA_REDIRECT=https://google.com
```

The result from a successful authentication is provided in the query params of the redirect.

## Development

If you find an issue, feel free to [open an issue](https://github.com/hcjk/micro-strava-auth/issues). 

```shell
git clone git@github.com:hcjk/micro-strava-auth.git
npm run dev
```

## License

MIT © [Henry Kaufman](https://github.com/hcjk)