'use strict';
const bcrypt = require('bcrypt');


const middleware = async ({ body }, res, next) => {
  try {

    if (!body.email || !body.password)
      return res.status(400).json({ error: true, message: 'credentials are missing' })

    // mock data
    const userFound = {
      first_name: 'Nitin ',
      last_name: 'Manocha ',
      email: 'manochanitin99@gmail.com ',
      created_at: '2020-09-09 ',
      deleted_at: null,
      updated_at: '2020-09-09 ',
      password_hash: "$2b$09$j9fklGLSJKEFDr4IWSwAHeFL7aEsg9ghvl7VFBYCKyr7JTVF6TCXm", // qwerty
      active: true
    } // here we will fetch the user from db

    if (!userFound)
      return res.status(404).json({ error: true, message: 'User not found' })

    if (userFound.active === undefined || userFound.active === 'false' || userFound.active === false)
      return res.status(400).json({ error: true, message: 'Account is inactive' })


    const result = await bcrypt.compare(body.password, userFound.password_hash)

    if (result === true)
      next()
    else
      return res.status(401).json({ error: true, message: 'Unauthorized' })


  } catch (err) {
    res.status(500).json({
      error: true, messsage: err.messsage
    })
  }
};

module.exports = middleware;
