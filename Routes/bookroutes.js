const express = require('express');
const router = express.Router();
const book = require('../controller/books.controller');
const checkAuth = require('../middleware/checkAuth')

router.post('/', checkAuth, book.create);
router.get('/', book.getAll);
router.get('/:id', book.getOne);
router.put('/:id',checkAuth, book.update);
router.delete('/:id',checkAuth, book.delete);

module.exports = router;