const express = require('express');
const router = express.Router();
const notes = require('../models/notes-memory');

/* GET home page. */
router.get('/', function (req, res, next) {
    notes.keylist()
        .then(keylist => {
            let keyPromise = [];
            for (let key of keylist) {
                keyPromise.push(
                    notes.read(key)
                        .then(note => {
                            return {key: note.key, title: note.title};
                        })
                );
            }
            return Promise.all(keyPromise);
        })
        .then(notelist => {
            res.render('index', {title: 'Notes', notelist});
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;
