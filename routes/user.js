var express = require('express');
var router = express.Router();
var userService = require('../services/userService');

router.get('/add', function(req, res, next){
  res.render('add');
})

router.post('/add', function(req, res, next){
  userService.add(req.body)
    .then(res.redirect('/'))
    .catch(err => {
      console.log(err);
      res.render('/', {error: err});
    });
});

router.delete('/delete/:id', async function(req, res, next){
  userService.delete(req.params.id)
    .then(res.redirect('/'))
    .catch(err => res.render('search', {error: err}));
});

router.post('/search', async function(req, res, next){
  userService.search(req.body.id)
    .then(user => res.render('details', {user: user}))
    .catch(err => res.render('search', {error: err}));
});

module.exports = router;