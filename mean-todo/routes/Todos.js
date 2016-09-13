var express = require('express');
var router = express.Router();
var TodoController = require('../controllers/TodoController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    TodoController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    TodoController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    TodoController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    TodoController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    TodoController.remove(req, res);
});

module.exports = router;
