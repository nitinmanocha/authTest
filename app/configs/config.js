'use strict';

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'

const common = require('../configs/environments/common');
const environment = require(`../configs/environments/` + env);

const config = {
  ...common,
  ...environment
};

module.exports = config;
