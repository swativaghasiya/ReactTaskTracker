const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
};

exports.getTaskById = async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Failed to load tasks.' });
    res.json(task);
};

exports.createTask = async (req, res) => {
    const { title, dueDate } = req.body;
    const task = new Task({ title, dueDate, userId: req.user.userId });
    await task.save();
    res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
    const { title, dueDate, completed } = req.body;

    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.userId },
        { title, dueDate, completed },
        { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Failed to load tasks or unauthorized' });

    res.json(task);
};

exports.deleteTask = async (req, res) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Failed to load tasks or unauthorized' });
    res.json({ message: 'Task deleted' });
};
