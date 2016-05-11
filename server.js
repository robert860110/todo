var express = require('express');
var bodyParse = require('body-parser');
var app = express();
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
    var body = req.body;
    var todo = body;
    todo.id = todoNextId;
    todos.push(todo);
    todoNextId++;

    res.json(todos);
})

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id);
    var matchedTodo;
    todos.forEach(function(todo) {
        if (todoId === todo.id) {
            matchedTodo = todo;
        }
    });

    if (matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }

})

app.listen(PORT, function() { console.log('Express listening on port 3000'); });
