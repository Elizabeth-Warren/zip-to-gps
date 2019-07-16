const { assert } = require('chai');
const app = require('../src/handler');

describe('test api', function() {
  it('should not accept blank zip', function(callback) {
    app.router({
      httpMethod: 'get',
      path: '/prod-zip-to-gps/',
      requestContext: {
        identity: { sourceIp: '127.0.0.1', userAgent: 'test' },
      },
    }, {}, (err, response) => {
      assert.equal(response.statusCode, 404);

      callback();
    });
  });

  it('should not accept a < 5 digit string', function(callback) {
    app.router({
      httpMethod: 'get',
      path: '/prod-zip-to-gps/000',
      requestContext: {
        identity: { sourceIp: '127.0.0.1', userAgent: 'test' },
      },
    }, {}, (err, response) => {
      assert.equal(response.statusCode, 401);
      assert(JSON.parse(response.body).error);

      callback();
    });
  });

  it('should not accept a > 5 digit string', function(callback) {
    app.router({
      httpMethod: 'get',
      path: '/prod-zip-to-gps/000000',
      requestContext: {
        identity: { sourceIp: '127.0.0.1', userAgent: 'test' },
      },
    }, {}, (err, response) => {
      assert.equal(response.statusCode, 401);
      assert(JSON.parse(response.body).error);

      callback();
    });
  });

  it('should not accept an invalid zip', function(callback) {
    app.router({
      httpMethod: 'get',
      path: '/prod-zip-to-gps/99999',
      requestContext: {
        identity: { sourceIp: '127.0.0.1', userAgent: 'test' },
      },
    }, {}, (err, response) => {
      assert.equal(response.statusCode, 401);
      assert(JSON.parse(response.body).error);

      callback();
    });
  });

  it('should return a lat+lon for a proper zip', function(callback) {
    app.router({
      httpMethod: 'get',
      path: '/prod-zip-to-gps/02129',
      requestContext: {
        identity: { sourceIp: '127.0.0.1', userAgent: 'test' },
      },
    }, {}, (err, response) => {
      assert.equal(response.statusCode, 200);
      assert.equal(JSON.parse(response.body).lat, 42.3778);
      assert.equal(JSON.parse(response.body).lon, -71.0627);

      callback();
    });
  });
});
