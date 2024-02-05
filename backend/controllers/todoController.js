const { ObjectId } = require("mongodb");
const Todo = require("../Models/Todo");

module.exports.todo_post = async (req, res) => {
    const { list, day, month, year } = req.body;
    const user_id = req.user.id; 

    try {
        let todo = await Todo.findOne({ user: user_id, day, month, year });

        if (todo) {
            todo = await todo.updateOne({ list }, { new: true });
        } else {
            todo = await Todo.create({ user: user_id, list, day, month, year });
        }

        res.status(201).json({ "message": todo });
    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": "error" });
    }
};

module.exports.todo_get = async (req, res) => {
    const { day, month, year } = req.query;
    const user_id = req.user.id; 

    try {
        const todo = await Todo.findOne({ user: user_id, day, month, year });
        res.status(200).json({ todo });
    } catch (err) {
        console.log(err);
        res.status(500).json({ todo: null });
    }
};
