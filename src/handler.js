const zipcodes = require('zipcodes');
const { framework, router } = require('@ewarren/serverless-routing');

const app = framework({ basePath: '/:stage-zip-to-gps' });

app.get('/:zip', ({ success, failed, params }) => {
  const [stage, zip] = params;

  if (! zip || zip.length !== 5) {
    return failed({ error: 'Invalid zip' }, 401);
  }

  const match = zipcodes.lookup(zip);

  if (! match) {
    return failed({ error: 'Invalid zip' }, 401);
  }

  return success({
    lat: match.latitude,
    lon: match.longitude,
  });
});

module.exports.router = router(app);
