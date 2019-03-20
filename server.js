const express = require('express');
const bodyParser = require('body-parser');
const Ctrl = require('./userCtrl');
const app = express();

app.use(bodyParser.json());

app.get(`/api/user`, Ctrl.getUsers);
app.get('/api/user/:userId', Ctrl.getById);
app.get('/api/admin', Ctrl.getAdmin);
app.get(`/api/nonadmin`, Ctrl.getNonAdmin);
app.get('/api/type/:userType', Ctrl.getUserType);
app.put('/api/user/:userId', Ctrl.editUser);
app.post('/api/user', Ctrl.postUser);
app.delete('/api/user/:userId', Ctrl.deleteUser);

app.listen(3000, () => {
  console.log(`server the server on the server port of`, 3000);
});
