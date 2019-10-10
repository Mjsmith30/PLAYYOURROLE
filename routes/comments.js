var express = require('express');
var router = express.Router();
var commentsCtrl = require('./controllers/comments');

router.get('/', commentsCtrl.index);
router.get('/:id', commentsCtrl.show);
router.get('/:id/edit', commentsCtrl.edit);
router.post('/', commentsCtrl.create);
router.delete('/:id', commentsCtrl.delete);
router.put('/:id', commentsCtrl.update);

module.exports = router;