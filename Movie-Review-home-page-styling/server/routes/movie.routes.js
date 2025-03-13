const UserController = require('../controller/movie.controller');

module.exports = (app) => {
    app.post('/api/user', UserController.loginUser);
    app.get('/api/user', UserController.getUser);
    app.get('/api/user/:id', UserController.getUserById);
    app.get('/api/user/:id', UserController.deleteUser);
}