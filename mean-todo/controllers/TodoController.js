var TodoModel = require('../models/TodoModel.js');

/**
 * TodoController.js
 *
 * @description :: Server-side logic for managing Todos.
 */
module.exports = {

    /**
     * TodoController.list()
     */
    list: function (req, res) {
        TodoModel.find(function (err, Todos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Todo.',
                    error: err
                });
            }
            return res.json(Todos);
        });
    },

    /**
     * TodoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        TodoModel.findOne({_id: id}, function (err, Todo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Todo.',
                    error: err
                });
            }
            if (!Todo) {
                return res.status(404).json({
                    message: 'No such Todo'
                });
            }
            return res.json(Todo);
        });
    },

    /**
     * TodoController.create()
     */
    create: function (req, res) {
        var Todo = new TodoModel({			
          title : req.body.title,			
          description : req.body.description,			
          due_data : req.body.due_data,
          level: req.body.level,
          tags: req.body.tags
        });

        Todo.save(function (err, Todo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Todo',
                    error: err
                });
            }
            return res.status(201).json(Todo);
        });
    },

    /**
     * TodoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        TodoModel.findOne({_id: id}, function (err, Todo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Todo',
                    error: err
                });
            }
            if (!Todo) {
                return res.status(404).json({
                    message: 'No such Todo'
                });
            }

            Todo.title = req.body.title ? req.body.title : Todo.title;			
            Todo.description = req.body.description ? req.body.description : Todo.description;			
            Todo.due_data = req.body.due_data ? req.body.due_data : Todo.due_data;			
            Todo.level = req.body.level ? req.body.level : Todo.level;
            Todo.tags = req.body.tags? req.body.tags : Todo.tags;
            Todo.save(function (err, Todo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Todo.',
                        error: err
                    });
                }

                return res.json(Todo);
            });
        });
    },

    /**
     * TodoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        TodoModel.findByIdAndRemove(id, function (err, Todo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Todo.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
