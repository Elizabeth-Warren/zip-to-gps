# zip-to-gps

Convert a zipcode to its approximate lat/lon coordinates.

```js
// GET api.elizabethwarren.codes/prod-zip-to-gps/:zipcode

{
  lat: Float,
  lon: Float,
}
```

## Local Development

Requires Docker.

```sh
$ make tests
```

## Deployment

Use the [serverless toolbox](https://github.com/Elizabeth-Warren/serverless-toolbox),

```sh
# From the `serverless-toolbox` directory,
# Replace ~/dev/zip-to-gps with the path to the `stats-api`
# directory on your host machine.
$ SRC=~/dev/zip-to-gps make toolbox

$ sls deploy -f api --stage prod
$ sls logs -f api --stage prod
```
