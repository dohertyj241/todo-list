const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

let tasks = [
    {id: 1, title: 'Task 1', completed: false},
    {id: 2, title: 'Task 2', completed: true},
    {id: 3, title: 'Task 3', completed: false},
];

app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/add', (req, res) => {
    const newTaskTitle = req.body.title.trim();
    if(newTaskTitle) {
        const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
        tasks.push({id: newId, title: newTaskTitle, completed: false});

    }
    res.redirect('/');
});

app.post('/toggle/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    tasks = tasks.map((task) => 
        task.id === taskId 
            ? { ...task, completed: !task.completed } 
            : task
    );
res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    tasks = tasks.filter((task) => task.id !== taskId);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});