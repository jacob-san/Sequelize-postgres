const TodoItem = require('../models').TodoItem;

module.exports = {
    create(req, res){
        return TodoItem.create({
            content: req.body.content,
            todoId: req.params.todoId
        })
        .then(todo=>res.status(200).send(todo))
        .catch(error=>res.status(400).send(error))
    },
    update(req, res){
        return TodoItem.find({
            where: {
                id: req.params.todoItemId,
                todoId: req.params.todoId
            }
        })
        .then(todoItem=>{
            if(!todoItem){
                return res.status(404).send({ message: "Item not found" })
            }
            return todoItem
                .update(req.body, { fields: Object.keys(req.body) })
                .then(updatedItem=>res.status(200).send(updatedItem))
                .catch(error=>res.status(400).send(error))
        })
        .catch(error=>res.status(400).send(error))
    },
    destroy(req, res){
        console.log(req.params)
        return TodoItem
            .find({
                where: {
                    id: req.params.todoItemId,
                    todoId: req.params.todoId
                }
            })
            .then(todo=>{
                if(!todo){
                    return res.status(404).send({
                        message: "Item not found"
                    })
                }
                return todo
                    .destroy()
                    .then(()=>res.status(200).send({ 
                        message: "item deleted"
                     }))
                     .catch(error=>res.status(400).send(error))
            })
            .catch(error=>res.status(400).send(error))
    }
}