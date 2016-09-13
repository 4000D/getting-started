/**
 * TODO: apply subejcts to [ObjectId]
 */
var TagModel = require('../models/TagModel.js');

/**
 * TagController.js
 *
 * @description :: Server-side logic for managing Tags.
 */
module.exports = {

    /**
     * TagController.list()
     */
    list: function (req, res) {
        TagModel.find(function (err, Tags) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Tag.',
                    error: err
                });
            }
            return res.json(Tags);
        });
    },

    /**
     * TagController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        TagModel.findOne({_id: id}, function (err, Tag) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Tag.',
                    error: err
                });
            }
            if (!Tag) {
                return res.status(404).json({
                    message: 'No such Tag'
                });
            }
            return res.json(Tag);
        });
    },

    /**
     * TagController.create()
     */
    create: function (req, res) {
        var Tag = new TagModel({			
          tag_name : req.body.tag_name,			
          subjects : req.body.subjects
        });

        Tag.save(function (err, Tag) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Tag',
                    error: err
                });
            }
            return res.status(201).json(Tag);
        });
    },

    /**
     * TagController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        TagModel.findOne({_id: id}, function (err, Tag) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Tag',
                    error: err
                });
            }
            if (!Tag) {
                return res.status(404).json({
                    message: 'No such Tag'
                });
            }

            Tag.tag_name = req.body.tag_name ? req.body.tag_name : Tag.tag_name;			
            Tag.subjects = req.body.subjects ? req.body.subjects : Tag.subjects;			
            Tag.save(function (err, Tag) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Tag.',
                        error: err
                    });
                }

                return res.json(Tag);
            });
        });
    },

    /**
     * TagController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        TagModel.findByIdAndRemove(id, function (err, Tag) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Tag.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
