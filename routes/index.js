var express = require('express');
var router = express.Router();
var auth = require('../passport.js')
var db = require('../db/queries')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/account', auth.ensureAuthenticated, function(req, res) {
    res.json(req.body);
});

router.get('/login', function(req, res) {
    res.render('login', {
        user: req.user
    });
});

router.get('/auth/google', auth.passport.authenticate('google', {
    scope: [
        'profile', 'email',
        //'https://www.googleapis.com/auth/plus.profile.emails.read'
    ],
    accessType: 'offline',
    approvalPrompt: 'force'
}));

router.get('/auth/google/callback',
    auth.passport.authenticate('google', {
        successRedirect: '/account',
        failureRedirect: '/login'
      }
    )
);



module.exports = router;
