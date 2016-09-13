var express = require('express');
var router = express.Router();
var SubjectController = require('../controllers/SubjectController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    SubjectController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    SubjectController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    SubjectController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    SubjectController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    SubjectController.remove(req, res);
});

module.exports = router;
