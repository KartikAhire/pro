const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./models/Task');
const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.render('index', { tasks });
});

app.post('/add', async (req, res) => {
  const newTask = new Task({ title: req.body.title });
  await newTask.save();
  res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
