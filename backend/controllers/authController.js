const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password, firstName, lastName, email, contactInfo, address } = req.body;
    try {
        const user = new User({ username, password, firstName, lastName, email, contactInfo, address });
        await user.save();
        res.status(201).json({ message: 'User created successfully', userId: user._id.toString() });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user._id.toString(), role: user.role }, 'secretkey', { expiresIn: '1h' });
        if (user.role === 'admin') {
            res.json({ token, userId: user._id.toString(), firstName: user.firstName, redirectUrl: '/admin' });
        } else {
            res.json({ token, userId: user._id.toString(), firstName: user.firstName, redirectUrl: '/' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
