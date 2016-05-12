var express = require('express');
var bodyParse = require('body-parser');
var app = express();
var _ = require('underscore');
var PORT = process.env.PORT || 3000;

var todos = [];

var todoNextId = 1;

app.use(bodyParse.json());

// root
app.get('/', function(req, res) {
    res.send('Todo API root');
});

// GET /todos
app.get('/todos', function(req, res) {
    res.json(todos);
})

app.post('/todos', function(req, res) {
    var body = _.pick(req.body, 'description', 'complete');


    if (!_.isBoolean(body.complete) || _.isString(body.description) || body.description.trim().length === 0)

    {
        body.id = todoNextId;
        body.description = body.description.trim();

        todos.push(body);
        todoNextId++;

        res.json(todos);
    } else res.status(404).sned();
})

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id);

    var matchedTodo = _.findWhere(todos, { id: todoId });

    // var matchedTodo;
    // todos.forEach(function(todo) {
    //     if (todoId === todo.id) {
    //         matchedTodo = todo;
    //     }
    // });

    if (matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }

})

// DELETE /todos/:id

// GET /todos/:id
app.delete('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id);
    var matchedTodo = _.findWhere(todos, { id: todoId });

    if (!matchedTodo) {
        res.status(404).send('no todo data found with that id');

    } else {
        todos = _.without(todos, matchedTodo);
        res.json(todos);
    }

})

// PUT /todos/:id

app.put('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, { id: todoId });
    var body = _.pick(req.body, 'description', 'completed');
    var validAttributes = {};

    if (!matchedTodo) {
        return res.status(404).send();
    }

    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed')) {
        return res.status(400).send();
    }

    if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
        validAttributes.description = body.description;
    } else if (body.hasOwnProperty('description')) {
        return res.status(400).send();
    }

    _.extend(matchedTodo, validAttributes);
    res.json(matchedTodo);

})


app.listen(PORT, function() { console.log('Express listening on port 3000'); });
