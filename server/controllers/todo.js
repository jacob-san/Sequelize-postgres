const Todo = require("../models").Todo;
const TodoItems = require("../models").TodoItem;

module.exports = {
    create(req, res) {
        return Todo
            .create({
                title: req.body.title
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return Todo 
            .findAll({
               include: [{
                   model: TodoItems,
                   as: "todoItems"
               }]     
            })
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },

    retrieve(req, res){
        return Todo
            .findById(req.params.todoId, {
                include: [{
                  model: TodoItems,
                  as: "todoItems"  
                }]
            })
            .then(todo=>{
                if(!todo){
                    return res.status(404).send({
                        message: "Todo not found"
                    })
                }
                return res.status(200).send(todo);
            })
            .catch(error=>res.status(400).send(error))
    },
    update(req, res){
        return Todo 
            .findById(req.params.todoId, {
                include: [{
                    model: TodoItems,
                    as: "todoItems"
                }]
            })
            .then(todo=>{
                if(!todo){
                    return res.status(404).send({
                        message: "Item not found"
                    })
                }
                return todo
                    .update({
                        title: req.body.title || todo.title
                    })
                    .then(todo=>res.status(200).send(todo))
                    .catch(error=>res.status(400).send(error))
            })
            .catch(error=>res.status(400).send(error));
    },
    destroy(req, res){
        return Todo 
            .findById(req.params.todoId)
            .then(todo=>{
                if(!todo){
                    res.status(404).send({ message: "Todo not found" })
                }
                return todo
                    .destroy()
                    .then(todo=>res.status(200).send({
                        message: "Deleted item"
                    }))
                    .catch(error=>res.status(400).send(error))
            })
            .catch(error=>res.status(400).send(error))
    }
}