# Presterity Web Site Source

This is the source for the [Presterity](https://presterity.org/) web site.

This is a static web server that retrieves pages from the
[Presterity wiki](https://presterity.atlassian.net/wiki/discover/all-updates)
and renders them on the server-side using React components.

At the moment, all pages are rendered nearly entirely on the server.

# To run locally

We prefer using [Yarn](https://yarnpkg.com/) for installs.

1. `yarn install` (preferred) or `npm install`
2. `yarn build` (or `yarn watch`, for watched builds)
3. `node server/app`

This will run the site at http://localhost:8000/.

# Deploy

Our deployed site is hosted at [Heroku](https://dashboard.heroku.com/apps/presterity).
If you need to deploy, you'll need to be invited as a collaborator.

* In your local Git clone of this repo, add a remote for `production`:

        git remote add production https://git.heroku.com/presterity.git

* All deployments are done from the `master` branch, which by definition should
  always be in a deploy-able state.

* Deploy by pushing to the `production` remote:

        git push production
