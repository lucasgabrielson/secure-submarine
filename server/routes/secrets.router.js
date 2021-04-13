const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();
router.get('/', rejectUnauthenticated, (req, res) => {
  // what is the value of req.user????
  console.log('req.user:', req.user);
    pool
    .query(`SELECT * FROM "secret" WHERE secrecy_level < ${req.user.clearance_level};`)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    }); 
});

module.exports = router;
