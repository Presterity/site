This is the source for the Presterity web site.

This is a very simple web server that retrieves pages from the Presterity
wiki and renders them in a page template.

At the moment, all pages are rendered on the server. There is, as yet, no
client-side JavaScript.

# To run locally

We prefer using [Yarn](https://yarnpkg.com/) for installs.

1. `yarn install` (preferred) or `npm install`
2. `node server/web`

This will display a localhost URL at which you can view the site.

# Deploy

Our deployed site is hosted at Heroku: https://dashboard.heroku.com/apps/presterity.
If you need to deploy, you'll need to be invited as a collaborator.

* In your local git clone of this repo, add a remote for "production":

    git remote add production https://git.heroku.com/presterity.git

* All deployments are done from the master branch, which by definition should
  always be in a deploy-able state.

* Deploy by pushing to that production remote:

    git push production
