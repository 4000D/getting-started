var express = require('express');
var router = express.Router();
var TagController = require('../controllers/TagController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    TagController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    TagController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    TagController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    TagController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    TagController.remove(req, res);
});

module.exports = router;
