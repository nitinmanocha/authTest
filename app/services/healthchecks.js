'use strict';

const request = require('request');

const config = require('../configs/config');
const status = require('../configs/status');

const healthchecksModel = require('../models/healthchecks');
const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'


const init = () => {
  if (env === 'development') {
    return;
  }

  setInterval(() => {
    request({ url: config.HEALTHCHECKS.DEPLOY_BASE_URL + '/healthchecks', method: 'GET' }, (err, response, body) => {
      if (response.statusCode === 200 && body === JSON.stringify(status.getStatus('success'))) {
        request({ url: config.HEALTHCHECKS.URL, method: 'GET' }, (err, response, body) => {
          // Do nothing
        });
      }
    });
  }, 30000);
};

const healthchecks = (params, callback) => {
  let healthchecksParams = {};

  healthchecksModel.check(healthchecksParams, (err, result) => {
    if (err) {
      return callback(err);
    }

    if (!result) {
      return callback(null, null);
    }

    return callback(null, status.getStatus('success'));
  });
};

module.exports = {
  init: init,
  healthchecks: healthchecks
};
