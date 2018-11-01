const TodoItem = require('../models').TodoItem;

module.exports = {
    create(req, res){
        return TodoItem.create({
            content: req.body.content,
            todoId: req.params.todoId
        })
        .then(todo=>res.status(200).send(todo))
        .catch(error=>res.status(400).send(error))
    }
}