const express = require('express');
const router = express.Router();

const model = require('../model/task')();

router.get('/', (req, res) => {
    model.find({}, (err, tasks) => {
      if (err) throw err;
      res.render('index', {
        title: 'mmgv',
        tasks: tasks
      });
    });
});

router.post('/add', (req, res) => {
  let body = req.body;
  body.status = false;

  model.create(body, (err, task) => {
    if (err) throw err;
    res.redirect('/');
  });

  console.log(body);
});

router.get('/turn/:id', (req,res) => {
  let id = req.params.id;
  model.findById(id, (err, task) => {
    if (err) throw err;
    task.status = !task.status;
    task.save()
      .then(() => res.redirect('/'))
  });
});

router.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  model.findByIdAndDelete(id, (err, task) => {
    if (err) throw err;

    task.delete()
      .then(() => res.redirect('/'))
  });
});

// router.get('/update/:id/:text', (req, res) => {
//   let id = req.params.id;
//   let text = req.params.text;
//
//   console.log(text);
// });

module.exports = router;
