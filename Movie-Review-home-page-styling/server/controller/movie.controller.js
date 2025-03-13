const mongoose = require('mongoose');
const User = require('../models/movie.models');

module.exports = {
    loginUser:  (req, res) => {
        User.loginUser(req.body)
        .then((err) => res.json(user))
        .catch((err) => {
            console.error("Create Error:", err);
            res.status(400).json(err);
        });
    },
    getUser: (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
            }
            User.getUser(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user with this id' });
                }
                res.json(user);
            })
            .catch((err) => {
                console.log("Get One Error:", err);
                res.status(400).json(err);
            });
    }
    ,
    getUserById: (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
            }
            User.getUserById(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user with this id' });
                }
                res.json(user);
            })
            .catch((err) => {
                console.log("Get One Error:", err);
                res.status(400).json(err);
            });
    }
    ,
    deleteUser: (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
            }
            User.deleteUser(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user with this id' });
                }
                res.json(user);
            })
            .catch((err) => {
                console.log("Get One Error:", err);
                res.status(400).json(err);
            });
    }
}