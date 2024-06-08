const { body, validationResult } = require('express-validator');
const authenticate = require("../middleware/authenticate");

const db = require('../db/db');

var express = require('express')
var router = express.Router();

/* Read all todos for the logged-in user */
router.get('/', authenticate, async (req, res, next) => {
    // Check if the user ID is available
    if (!req.user || !req.user.id) {
        return res.status(200).json({ message: 'NOAUTH' });
    }

    try {
        const todos = await db.models.todo.findAll({
            where: {
                userId: req.user.id
            }
        });

        // If no todos are found, send a friendly message encouraging the creation of the first todo
        if (!todos || todos.length === 0) {
            return res.status(200).json({ message: 'ADD' });
        }

        res.status(200).json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).send('Internal Server Error');
    }
});
/* Create todos */


router.post('/', authenticate,
    body('todoname').not().isEmpty().trim().escape(),
    async (req, res) => {
        const todoName = req.body.todoname;
        const userId = req.user.id;
        console.log("userId :",userId );
        try {
            const todo = await createTodoInDB(todoName, userId);
            console.log('Todo created:', todo);
            res.status(201).json(todo);
        } catch (error) {
            console.error('Error while creating todo:', error);
            res.status(500).send(error.message);
        }
    }
);

async function createTodoInDB(todoName, userId) {
    const Todo = db.models.todo; // Assuming you have a Sequelize model named 'todo'
    return await Todo.create({
        name: todoName,
        userId: userId
    });
}

// PUT /api/todos/:id/update-date
router.put('/:id/update-date', async (req, res) => {
    const { id } = req.params;
    const todo = await db.models.todo.findByPk(id);
    if (todo && !todo.done) {
        todo.creationDate = new Date().toISOString().slice(0, 10); // Set current date
        await todo.save();
        console.log("todo-> ",todo)
        res.send(todo);
    } else {
        res.status(404).send({ message: 'Todo not found or already completed' });
    }
});


/* Update todos with done */
router.put('/:id/done',authenticate,
    async (req, res, next) => {
        const pk = req.params.id;
        var todo = await db.models.todo.findByPk(pk);

        if (null == todo) {
            res.status(404);
            return;
        }

        todo = await todo.update({ done: true });

        res.status(200).json(todo);
});

/* Update todos with undone */
router.delete('/:id/done',authenticate,
    async (req, res, next) => {
        const pk = req.params.id;
        var todo = await db.models.todo.findByPk(pk);

        if (null == todo) {
            res.status(404);
            return;
        }

        todo = await todo.update({ done: false });

        res.status(200).json(todo);
});

module.exports = router;
