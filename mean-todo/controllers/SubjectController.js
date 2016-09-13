var SubjectModel = require('../models/SubjectModel.js');

/**
 * SubjectController.js
 *
 * @description :: Server-side logic for managing Subjects.
 */
module.exports = {

    /**
     * SubjectController.list()
     */
    list: function (req, res) {
        SubjectModel.find(function (err, Subjects) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Subject.',
                    error: err
                });
            }
            return res.json(Subjects);
        });
    },

    /**
     * SubjectController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        SubjectModel.findOne({_id: id}, function (err, Subject) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Subject.',
                    error: err
                });
            }
            if (!Subject) {
                return res.status(404).json({
                    message: 'No such Subject'
                });
            }
            return res.json(Subject);
        });
    },

    /**
     * SubjectController.create()
     */
    create: function (req, res) {
        var Subject = new SubjectModel({			subject_name : req.body.subject_name,			description : req.body.description
        });

        Subject.save(function (err, Subject) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Subject',
                    error: err
                });
            }
            return res.status(201).json(Subject);
        });
    },

    /**
     * SubjectController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        SubjectModel.findOne({_id: id}, function (err, Subject) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Subject',
                    error: err
                });
            }
            if (!Subject) {
                return res.status(404).json({
                    message: 'No such Subject'
                });
            }

            Subject.subject_name = req.body.subject_name ? req.body.subject_name : Subject.subject_name;			
            Subject.description = req.body.description ? req.body.description : Subject.description;			
            Subject.save(function (err, Subject) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Subject.',
                        error: err
                    });
                }

                return res.json(Subject);
            });
        });
    },

    /**
     * SubjectController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        SubjectModel.findByIdAndRemove(id, function (err, Subject) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Subject.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
