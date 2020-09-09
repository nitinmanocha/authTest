'use strict';

const healthchecksService = require('../services/healthchecks');
const e = require('express');

const healthchecks = (req, res, next) => {
  let healthchecksParams = {};

  healthchecksService.healthchecks(healthchecksParams, (err, result) => {
    if (err) {
      return next(err);
    }

    return res.json(result);
  });
};


const verifyAuth = ({ body }, res, next) => {

  try {
    if (body)
      res.status(200).json({ authenticated: true })
    else
      res.status(200).json({ authenticated: false })
  } catch (err) {
    res.status(500).json({
      error: true, messsage: err.messsage
    })
  }

};



module.exports = {
  healthchecks: healthchecks,
  verifyAuth: verifyAuth
};